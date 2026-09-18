// ==UserScript==
// @name         Instagram Audio Transcriber
// @namespace    https://github.com/fabriciobarili
// @version      3.3.0
// @description  Transcreve áudio de vídeos do Instagram com monitoramento automático de URL
// @author       Fabricio Barili
// @match        https://www.instagram.com/*
// @match        https://instagram.com/*
// @run-at       document-end
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_xmlhttpRequest
// @connect      api.openai.com
// ==/UserScript==

/* globals GM_setValue, GM_getValue, GM_xmlhttpRequest */
(function () {
  'use strict';

  console.log('[IAT v3.3] Script carregado.');

  /* ── Constantes ─────────────────────────────────────────── */
  const CHUNK_MS   = 60000;   // duração de cada chunk de gravação
  const UTC_OFFSET = 3;
  const TZ_LABEL   = 'UTC +3';

  /* ── Estado ─────────────────────────────────────────────── */
  const S = {
    recording  : false,
    stream     : null,
    recorder   : null,   // gravador ATUAL (o mais recente)
    session    : null,
    pendingUrl : null,
    profile    : '',
    inFlight   : 0,      // transcrições em andamento
  };

  /* ── Utilitários ─────────────────────────────────────────── */
  const pad = n => String(n).padStart(2, '0');

  function fmtDate(date, offsetH) {
    const d = new Date(date.getTime() + offsetH * 3600000);
    return pad(d.getUTCDate()) + '/' + pad(d.getUTCMonth()+1) + '/' + d.getUTCFullYear()
         + ' ' + pad(d.getUTCHours()) + ':' + pad(d.getUTCMinutes()) + ':' + pad(d.getUTCSeconds());
  }

  function fmtVidTime(sec) {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = Math.floor(sec % 60);
    return h ? pad(h)+':'+pad(m)+':'+pad(s) : pad(m)+':'+pad(s);
  }

  function tsFilename() {
    const d = new Date(Date.now() + UTC_OFFSET * 3600000);
    return d.getUTCFullYear()+''+pad(d.getUTCMonth()+1)+''+pad(d.getUTCDate())
         +'_'+pad(d.getUTCHours())+''+pad(d.getUTCMinutes())+''+pad(d.getUTCSeconds());
  }

  function videoId(url) {
    try {
      const p = new URL(url).pathname;
      const m = p.match(/\/(reel|reels|p|tv|stories\/[^/]+)\/([^/]+)/);
      return m ? m[2] : p.replace(/\//g, '_').replace(/^_|_$/g, '') || 'video';
    } catch(e) { return 'video'; }
  }

  function shortPath(url) {
    try { return new URL(url).pathname.replace(/\/$/, ''); } catch(e) { return url; }
  }

  function isMeaningfulChange(a, b) {
    return videoId(a) !== videoId(b);
  }

  function getVideoTime() {
    var v = document.querySelector('video');
    return v ? (v.currentTime || 0) : 0;
  }

  function autoDetectProfile() {
    var m = location.pathname.match(/\/stories\/([^/]+)/);
    return m ? m[1] : '';
  }

  /* ── CSS reset do painel (injetado no head) ─────────────── */
  function injectStyles() {
    var style = document.createElement('style');
    style.id  = 'iat-styles';
    style.textContent = [
      '#iat-panel { all: initial !important; display: block !important; position: fixed !important;',
      '  top: 20px !important; right: 20px !important; z-index: 2147483647 !important;',
      '  width: 330px !important; font-family: monospace !important; font-size: 13px !important;',
      '  background: #1a1a2e !important; color: #eee !important; border-radius: 12px !important;',
      '  box-shadow: 0 4px 24px rgba(0,0,0,.75) !important; border: 1px solid #3a3a5c !important;',
      '  overflow: visible !important; user-select: none !important; box-sizing: border-box !important; }',
      '#iat-panel * { font-family: monospace !important; box-sizing: border-box !important;',
      '  visibility: visible !important; opacity: 1 !important; }',
      '#iat-panel div { display: block !important; }',
      '#iat-panel span { display: inline !important; }',
      '#iat-panel button { display: inline-block !important; cursor: pointer !important;',
      '  border: none !important; border-radius: 6px !important; color: #fff !important;',
      '  font-size: 12px !important; font-family: monospace !important; }',
      '#iat-panel input { display: inline-block !important; color: #eee !important;',
      '  background: #0d0d1a !important; border: 1px solid #3a3a5c !important;',
      '  border-radius: 6px !important; padding: 5px 8px !important; font-size: 12px !important; }',
    ].join('\n');
    document.head.appendChild(style);
    console.log('[IAT v3.3] Estilos injetados.');
  }

  /* ── Captura de áudio ───────────────────────────────────── */
  function requestTabAudio() {
    return navigator.mediaDevices.getDisplayMedia({
      video: { displaySurface: 'browser' },
      audio: { suppressLocalAudioPlayback: false, echoCancellation: false,
               noiseSuppression: false, autoGainControl: false },
      preferCurrentTab: true,
      selfBrowserSurface: 'include',
    }).then(function(ms) {
      var audioTracks = ms.getAudioTracks();
      if (audioTracks.length === 0) {
        ms.getTracks().forEach(function(t) { t.stop(); });
        return Promise.reject(new Error('Nenhum áudio capturado. Ative "Compartilhar áudio da aba".'));
      }
      ms.getVideoTracks().forEach(function(t) { t.stop(); });
      return new MediaStream(audioTracks);
    });
  }

  /* ── Monitoramento de URL ───────────────────────────────── */
  function initUrlWatcher() {
    var lastUrl = location.href;

    function check() {
      var cur = location.href;
      if (cur !== lastUrl && isMeaningfulChange(lastUrl, cur)) onUrlChange(lastUrl, cur);
      lastUrl = cur;
    }

    ['pushState', 'replaceState'].forEach(function(method) {
      var orig = history[method].bind(history);
      history[method] = function() { orig.apply(history, arguments); check(); };
    });

    window.addEventListener('popstate', check);
    console.log('[IAT v3.3] URL watcher ativo.');
  }

  function onUrlChange(prevUrl, newUrl) {
    if (!S.recording) return;
    addLog('⚡ URL mudou → ' + shortPath(newUrl));
    S.pendingUrl = newUrl;
    if (S.recorder && S.recorder.state === 'recording') S.recorder.stop();
  }

  /* ── Gravação paralela ───────────────────────────────────── *
   *  Fluxo: ao parar o gravador, o PRÓXIMO chunk começa        *
   *  imediatamente. A transcrição do chunk atual corre em      *
   *  background (S.inFlight controla quando tudo terminou).    *
   * ─────────────────────────────────────────────────────────── */
  function scheduleChunk() {
    if (!S.recording) return;

    var mime = MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
      ? 'audio/webm;codecs=opus' : 'audio/webm';

    // Capturar referências locais do chunk corrente
    var localChunks  = [];
    var localOffset  = getVideoTime();
    var localSession = S.session;

    var rec = new MediaRecorder(S.stream, { mimeType: mime });
    S.recorder = rec;

    rec.ondataavailable = function(e) {
      if (e.data && e.data.size > 0) localChunks.push(e.data);
    };

    rec.onstop = function() {
      var capturedPendingUrl = S.pendingUrl;

      if (capturedPendingUrl) {
        /* ── Troca de sessão por mudança de URL ── */
        S.pendingUrl = null;
        var oldSession = localSession;
        oldSession.tEnd = new Date();
        startSession(capturedPendingUrl);   // S.session aponta para a nova
        scheduleChunk();                    // nova trilha começa IMEDIATAMENTE

        // Transcreve o último chunk da sessão antiga em background
        dispatchTranscription(localChunks, mime, localOffset, oldSession, function() {
          finishSession(oldSession);
        });

      } else if (S.recording) {
        /* ── Ciclo normal: próximo chunk começa ANTES da transcrição ── */
        scheduleChunk();                    // começa sem esperar Whisper
        dispatchTranscription(localChunks, mime, localOffset, localSession, null);

      } else {
        /* ── Usuário parou: transcreve e verifica se acabou tudo ── */
        dispatchTranscription(localChunks, mime, localOffset, localSession, checkFinished);
      }
    };

    rec.start();
    setTimeout(function() {
      if (rec.state === 'recording') rec.stop();
    }, CHUNK_MS);
  }

  // Envia um chunk para o Whisper e chama cb() ao terminar.
  function dispatchTranscription(chunks, mime, offset, session, cb) {
    if (!chunks.length) { if (cb) cb(); return; }
    S.inFlight++;
    transcribeBlob(new Blob(chunks, { type: mime }), offset, session)
      .then(function() {
        S.inFlight--;
        if (cb) cb();
      });
  }

  // Chamado após cada transcrição concluída quando o usuário já parou.
  function checkFinished() {
    if (!S.recording && S.inFlight === 0 && S.session) {
      finishSession(S.session);
      S.session = null;
      onRecordingFinished();
    }
  }

  /* ── Sessões ─────────────────────────────────────────────── */
  function startSession(url) {
    S.session = { url: url, profile: S.profile, segments: [], tStart: new Date(), tEnd: null };
    updateRecordingInfo();
    addLog('▶ Sessão: ' + shortPath(url));
  }

  function finishSession(sess) {
    if (!sess) return;
    if (!sess.tEnd) sess.tEnd = new Date();
    // Ordena segmentos por timestamp do vídeo antes de salvar
    sess.segments.sort(function(a, b) { return a.t - b.t; });
    if (sess.segments.length > 0) {
      saveTranscription(sess);
    } else {
      addLog('⚠️ Nenhum segmento — arquivo não salvo.');
    }
  }

  /* ── Iniciar / Parar ─────────────────────────────────────── */
  function startRecording() {
    setStatus('🔐 Aguardando permissão…');
    requestTabAudio().then(function(stream) {
      S.stream = stream;
      S.stream.getAudioTracks()[0].addEventListener('ended', function() {
        if (S.recording) { addLog('⚠️ Captura encerrada pelo Chrome.'); stopRecording(); }
      });
      S.recording = true;
      S.inFlight  = 0;
      showRecordingPanel();
      startSession(location.href);
      scheduleChunk();
    }).catch(function(e) { setStatus('❌ ' + e.message); });
  }

  function stopRecording() {
    S.recording = false;
    setStatus('⏹ Finalizando últimos chunks…');
    disableStopBtn();
    if (S.recorder && S.recorder.state === 'recording') S.recorder.stop();
    // checkFinished será chamado quando S.inFlight chegar a 0
  }

  /* ── API Whisper ─────────────────────────────────────────── */
  function transcribeBlob(blob, videoOffset, session) {
    var key = GM_getValue('openai_key', '');
    if (!key) {
      addLog('⚠️ Chave OpenAI não configurada — abra ⚙️');
      return Promise.resolve();
    }

    setStatus('🔄 Transcrevendo [' + fmtVidTime(videoOffset) + '…]  (' + S.inFlight + ' em fila)');

    var fd = new FormData();
    fd.append('file', blob, 'audio.webm');
    fd.append('model', 'whisper-1');
    fd.append('response_format', 'verbose_json');
    fd.append('timestamp_granularities[]', 'segment');
    fd.append('language', 'pt');

    return new Promise(function(resolve) {
      GM_xmlhttpRequest({
        method  : 'POST',
        url     : 'https://api.openai.com/v1/audio/transcriptions',
        headers : { 'Authorization': 'Bearer ' + key },
        data    : fd,
        onload  : function(r) {
          if (r.status === 200) {
            try {
              var res  = JSON.parse(r.responseText);
              var segs = res.segments || (res.text ? [{ start: 0, text: res.text }] : []);
              segs.forEach(function(seg) {
                var text = seg.text ? seg.text.trim() : '';
                if (text && session) {
                  session.segments.push({ t: videoOffset + (seg.start || 0), text: text });
                }
              });
              refreshPreview();
              if (S.recording) setStatus('🔴 Gravando…');
            } catch(ex) { addLog('❌ Erro ao parsear resposta Whisper.'); }
          } else {
            addLog('❌ Whisper API: HTTP ' + r.status);
          }
          resolve();
        },
        onerror : function() { addLog('❌ Erro de rede.'); resolve(); },
      });
    });
  }

  /* ── Exportar TXT ───────────────────────────────────────── */
  function saveTranscription(sess) {
    var profile  = sess.profile || 'unknown';
    var filename = 'instagram_' + profile + '_' + videoId(sess.url) + '_' + tsFilename() + '.txt';
    var lines    = [
      '==== EXTRAÇÃO DO ÁUDIO DA URL: ' + sess.url + ' ====',
      '==== INÍCIO DA TRANSCRIÇÃO ' + fmtDate(sess.tStart, UTC_OFFSET) + ' ' + TZ_LABEL + ' ====',
      '',
    ].concat(sess.segments.map(function(s) { return '[' + fmtVidTime(s.t) + '] ' + s.text; }))
     .concat(['', '==== FIM DA TRANSCRIÇÃO ' + fmtDate(sess.tEnd, UTC_OFFSET) + ' ' + TZ_LABEL + ' ====']);

    var blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' });
    var bUrl = URL.createObjectURL(blob);
    var a    = document.createElement('a');
    a.href = bUrl; a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(function() { a.remove(); URL.revokeObjectURL(bUrl); }, 500);
    addLog('✅ Salvo: ' + filename);
  }

  /* ── UI ─────────────────────────────────────────────────── */
  var panel, elBody, elStatus, elRecInfo, elLog, elPreview, elStopBtn;
  var dragging = false, dragOX = 0, dragOY = 0;

  function css(el, styles) {
    Object.keys(styles).forEach(function(k) { el.style[k] = styles[k]; });
    return el;
  }

  function div(styles) { return css(document.createElement('div'), styles || {}); }
  function span()      { return document.createElement('span'); }

  function btn(label, bg, onClick) {
    var b = document.createElement('button');
    b.textContent = label;
    css(b, { background: bg, padding: '10px 12px', flex: '1', fontSize: '12px' });
    b.addEventListener('click', onClick);
    return b;
  }

  function buildPanel() {
    injectStyles();

    panel = document.createElement('div');
    panel.id = 'iat-panel';

    // Header
    var hdr = div({ background: '#16213e', padding: '9px 12px', cursor: 'move',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    borderBottom: '1px solid #3a3a5c', borderRadius: '12px 12px 0 0' });

    var hdrLabel  = span(); hdrLabel.textContent  = '🎙️ Instagram Transcriber';
    var hdrToggle = span(); hdrToggle.textContent = '▼';
    hdrToggle.style.cursor = 'pointer';
    hdr.append(hdrLabel, hdrToggle);

    var collapsed = false;
    hdrToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      collapsed = !collapsed;
      elBody.style.setProperty('display', collapsed ? 'none' : 'block', 'important');
      hdrToggle.textContent = collapsed ? '▶' : '▼';
    });

    // Drag
    hdr.addEventListener('mousedown', function(e) {
      if (e.target === hdrToggle) return;
      e.preventDefault();
      dragging = true;
      var r = panel.getBoundingClientRect();
      dragOX = e.clientX - r.left;
      dragOY = e.clientY - r.top;
    });

    // Body
    elBody = div({ padding: '12px' });

    panel.append(hdr, elBody);
    document.body.appendChild(panel);

    console.log('[IAT v3.3] Painel criado. Conectado:', panel.isConnected);

    showSetupPanel();
  }

  /* ── Painel Setup ────────────────────────────────────────── */
  function showSetupPanel() {
    elBody.innerHTML = '';

    elStatus = div({ color: '#7ec8e3', fontSize: '12px', minHeight: '18px', marginBottom: '10px' });
    elStatus.textContent = '⏸ Configure e inicie a transcrição.';

    var lbProf = div({ color: '#888', fontSize: '11px', marginBottom: '4px' });
    lbProf.textContent = 'Perfil do criador do vídeo:';

    var rowProf = div({ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '12px' });
    var atSign  = span(); atSign.textContent = '@';
    atSign.style.color = '#7ec8e3';

    var inpProf = document.createElement('input');
    css(inpProf, { flex: '1' });
    inpProf.type = 'text'; inpProf.placeholder = 'nome_do_perfil';
    inpProf.value = autoDetectProfile() || S.profile;
    rowProf.append(atSign, inpProf);

    var noteBox = div({ background: '#1e1e0a', border: '1px solid #555520', borderRadius: '6px',
                        padding: '7px 10px', fontSize: '11px', color: '#ffd',
                        marginBottom: '12px', lineHeight: '1.5' });
    noteBox.innerHTML = '⚠️ Na janela do Chrome:<br>&nbsp;&nbsp;1. Selecione <b>esta aba</b><br>&nbsp;&nbsp;2. Ative <b>"Compartilhar áudio da aba"</b>';

    var rowBtns  = div({ display: 'flex', gap: '8px', marginBottom: '10px' });
    var btnStart = btn('▶ Iniciar Escuta', '#27ae60', function() {
      var prof = inpProf.value.trim().replace(/^@/, '');
      if (!prof) { elStatus.textContent = '⚠️ Digite o nome do perfil.'; return; }
      S.profile = prof;
      startRecording();
    });
    css(btnStart, { fontSize: '13px' });

    var cfgPanel = buildConfigPanel();
    var btnCfg   = btn('⚙️', '#3a3a5c', function() {
      cfgPanel.style.display = cfgPanel.style.display === 'none' ? 'block' : 'none';
    });
    css(btnCfg, { flex: '0 0 auto' });
    rowBtns.append(btnStart, btnCfg);

    elBody.append(elStatus, lbProf, rowProf, noteBox, rowBtns, cfgPanel);
  }

  /* ── Painel Gravação ─────────────────────────────────────── */
  function showRecordingPanel() {
    elBody.innerHTML = '';

    elStatus = div({ color: '#7ec8e3', fontSize: '12px', minHeight: '18px', marginBottom: '6px' });
    elStatus.textContent = '🔴 Gravando…';

    elRecInfo = div({ background: '#0d0d1a', border: '1px solid #3a3a5c', borderRadius: '6px',
                      padding: '6px 10px', fontSize: '11px', color: '#888', marginBottom: '6px' });

    var lbLog = div({ color: '#888', fontSize: '10px', marginBottom: '3px' });
    lbLog.textContent = 'Eventos:';

    elLog = div({ maxHeight: '65px', overflowY: 'auto', fontSize: '10px', color: '#aaa',
                  background: '#0d0d1a', padding: '5px 8px', borderRadius: '6px',
                  marginBottom: '8px', lineHeight: '1.5' });

    var lbPrev = div({ color: '#888', fontSize: '10px', marginBottom: '3px' });
    lbPrev.textContent = 'Transcrição atual:';

    elPreview = div({ maxHeight: '120px', overflowY: 'auto', fontSize: '11px', color: '#ccc',
                      background: '#0d0d1a', padding: '7px 9px', borderRadius: '6px',
                      whiteSpace: 'pre-wrap', wordBreak: 'break-word', marginBottom: '10px' });
    elPreview.textContent = '(aguardando primeiro chunk…)';

    var rowBtns   = div({ display: 'flex', gap: '8px' });
    var btnInd    = btn('🔴 Gravando…', '#8e44ad', function() {});
    btnInd.disabled = true;
    elStopBtn = btn('⏹ Parar', '#e74c3c', stopRecording);

    var cfgPanel = buildConfigPanel();
    css(cfgPanel, { marginTop: '8px' });
    var btnCfg   = btn('⚙️', '#3a3a5c', function() {
      cfgPanel.style.display = cfgPanel.style.display === 'none' ? 'block' : 'none';
    });
    css(btnCfg, { flex: '0 0 auto' });
    rowBtns.append(btnInd, elStopBtn, btnCfg);

    elBody.append(elStatus, elRecInfo, lbLog, elLog, lbPrev, elPreview, rowBtns, cfgPanel);
    updateRecordingInfo();
  }

  function onRecordingFinished() {
    setStatus('✅ Concluído. Arquivos salvos.');
    disableStopBtn();
    var btnNew = btn('↩ Nova transcrição', '#27ae60', showSetupPanel);
    css(btnNew, { width: '100%', marginTop: '10px', fontSize: '13px' });
    elBody.appendChild(btnNew);
  }

  function disableStopBtn() {
    if (elStopBtn) { elStopBtn.disabled = true; elStopBtn.style.opacity = '0.4'; }
  }

  /* ── Painel Config ───────────────────────────────────────── */
  function buildConfigPanel() {
    var p = div({ display: 'none', background: '#0d0d1a', border: '1px solid #3a3a5c',
                  borderRadius: '6px', padding: '10px' });

    var lbKey = div({ color: '#888', fontSize: '11px', marginBottom: '4px' });
    lbKey.textContent = 'Chave OpenAI (Whisper-1):';

    var inpKey = document.createElement('input');
    css(inpKey, { width: '100%' });
    inpKey.type = 'password'; inpKey.placeholder = 'sk-…';
    inpKey.value = GM_getValue('openai_key', '');
    inpKey.addEventListener('change', function() { GM_setValue('openai_key', inpKey.value.trim()); });

    p.append(lbKey, inpKey);
    return p;
  }

  /* ── Atualização de UI ───────────────────────────────────── */
  function setStatus(msg) { if (elStatus) elStatus.textContent = msg; }

  function updateRecordingInfo() {
    if (!elRecInfo || !S.session) return;
    var n = S.session.segments.length;
    elRecInfo.textContent = '@' + S.session.profile + '  |  ' + shortPath(S.session.url) + '  |  ' + n + ' seg.';
  }

  function addLog(msg) {
    console.log('[IAT]', msg);
    if (!elLog) return;
    var ts   = new Date().toLocaleTimeString('pt-BR', { hour12: false });
    var line = div({ lineHeight: '1.4' });
    line.textContent = '[' + ts + '] ' + msg;
    if (msg.indexOf('⚡') >= 0) line.style.color = '#e67e22';
    else if (msg.indexOf('✅') === 0) line.style.color = '#7dff7d';
    else if (msg.indexOf('❌') === 0) line.style.color = '#e74c3c';
    elLog.appendChild(line);
    elLog.scrollTop = elLog.scrollHeight;
  }

  function refreshPreview() {
    if (!elPreview || !S.session) return;
    var sorted = S.session.segments.slice().sort(function(a, b) { return a.t - b.t; });
    var lines  = sorted.slice(-25).map(function(s) { return '[' + fmtVidTime(s.t) + '] ' + s.text; });
    elPreview.textContent = lines.length ? lines.join('\n') : '(aguardando…)';
    elPreview.scrollTop   = elPreview.scrollHeight;
    updateRecordingInfo();
  }

  /* ── Drag (window-level) ─────────────────────────────────── */
  window.addEventListener('mousemove', function(e) {
    if (!dragging) return;
    panel.style.right  = 'auto';
    panel.style.bottom = 'auto';
    panel.style.left   = (e.clientX - dragOX) + 'px';
    panel.style.top    = (e.clientY - dragOY) + 'px';
  });

  window.addEventListener('mouseup', function() { dragging = false; });

  /* ── Init ─────────────────────────────────────────────────── */
  initUrlWatcher();
  buildPanel();

  console.log('[IAT v3.3] Inicialização concluída.');

})();
