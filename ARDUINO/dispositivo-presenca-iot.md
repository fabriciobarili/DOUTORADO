# Dispositivo IoT — Captura de Presença Humana com Armazenamento em SD

## Visão Geral

Dispositivo de baixo custo para detectar e registrar presença humana em arquivos no cartão MicroSD, com requisitos críticos de confiabilidade.

---

## Componentes

| Componente | Modelo | Função |
|---|---|---|
| Microcontrolador | ESP32 DevKit | Processamento e controle |
| Sensor de presença | RCWL-0516 (microondas) | Detecção de presença humana |
| Armazenamento | Módulo MicroSD | Registro dos eventos |
| Alimentação | Suporte bateria 9V + buck step-down 5V | Fonte de energia portátil |

---

## Arquitetura de Tensões

Todos os componentes operam em **3.3V**, compatíveis nativamente com o ESP32. Nenhum adaptador de nível lógico (level shifter) é necessário.

| Componente | Tensão de operação | Sinal I/O |
|---|---|---|
| ESP32 DevKit | 3.3V (lógica) / aceita 5V no VIN | 3.3V |
| RCWL-0516 | 4–28V (VCC) / saída 3.3V | 3.3V |
| Módulo MicroSD | 3.3–5V (com regulador a bordo) | 3.3V (SPI) |
| Buck step-down | Entrada 9V → Saída 5V | — |

---

## Circuito de Alimentação

A bateria 9V **não deve ser conectada diretamente ao VIN do ESP32** sem regulação.  
O regulador linear AMS1117 do DevKit dissipa 5.7V de queda com carga, gerando calor excessivo (~570mW) e autonomia muito reduzida.

**Solução:** Inserir um módulo buck step-down (ex: MP1584 ou LM2596) entre a bateria e o VIN.

```
Bateria 9V → Buck step-down 5V → VIN (ESP32) → AMS1117 → 3.3V interno
```

| Etapa | Eficiência |
|---|---|
| Sem buck (linear direto) | ~37% |
| Com buck step-down | ~85–90% |

---

## Alimentação por USB Veicular (5V)

Uma alternativa à bateria é alimentar o dispositivo pela **porta USB do veículo (5V)**. Nesse caso a autonomia deixa de ser limitada por carga — o dispositivo opera enquanto houver energia na porta.

**Vantagem:** os 5V da USB entram direto no VIN do ESP32, sem necessidade de buck step-down. O próprio AMS1117 do DevKit faz a regulação para 3.3V.

```
USB veicular 5V ──► VIN (ESP32) ──► AMS1117 ──► 3.3V interno
```

### Cuidados específicos de veículo

1. **Porta "com ignição" vs "sempre ligada".** Muitas tomadas USB só fornecem energia com o carro ligado (modo acessório) — o dispositivo desligaria junto. Para registrar presença com o carro estacionado e desligado, é preciso uma porta **always-on** (ligada direto à bateria do veículo). Verificar no manual.
2. **Dreno da bateria do carro.** Se a porta for always-on, o dispositivo (~60–150mA em 5V ≈ 0,3–0,75W) puxa da bateria continuamente. Desprezível por alguns dias, mas o carro parado por semanas pode acumular descarga.
3. **Qualidade do adaptador.** A rede automotiva é ruidosa (picos ao ligar o motor). A porta USB já regula para 5V, mais limpa que puxar 12V direto — o capacitor de 470µF (ver Confiabilidade) absorve os picos residuais.

### Esquema híbrido recomendado

Para máxima confiabilidade (requisito crítico deste projeto — sem lacunas no log):

```
USB veicular 5V ─┬─► VIN (ESP32)        [fonte principal]
                 │
Bateria ─────────┘                       [backup quando a porta não fornece energia]
```

- **USB veicular** como fonte principal (autonomia ilimitada com o carro em uso).
- **Bateria** como backup para os períodos sem energia na porta (carro desligado, se a porta for de ignição), evitando lacunas no registro.

---

## Pinagem

| Componente | Pino ESP32 | Observação |
|---|---|---|
| RCWL-0516 VCC | 3.3V | Alimentação direta |
| RCWL-0516 OUT | GPIO4 | Leitura de presença |
| RCWL-0516 GND | GND | — |
| SD VCC | 3.3V | Alimentação direta |
| SD CS | GPIO5 | SPI Chip Select |
| SD MOSI | GPIO23 | SPI dados saída |
| SD MISO | GPIO19 | SPI dados entrada |
| SD SCK | GPIO18 | SPI clock |
| SD GND | GND | — |

---

## Diagrama de Conexão

```
Bateria 9V ──► Buck 5V ──► VIN (ESP32)
                                │
                               GND ──────────────────────────┐
                                │                              │
                              3.3V ──► VCC (RCWL) + VCC (SD) │
                                │                              │
                            GPIO4 ◄── OUT (RCWL-0516)         │
                            GPIO5 ──► CS  (SD)                │
                           GPIO23 ──► MOSI (SD)               │
                           GPIO19 ◄── MISO (SD)               │
                           GPIO18 ──► SCK  (SD)               │
```

---

## Firmware (Arduino IDE / ESP32)

```cpp
#include <SPI.h>
#include <SD.h>

#define PIN_SENSOR 4
#define PIN_CS     5

void setup() {
  Serial.begin(115200);
  pinMode(PIN_SENSOR, INPUT);

  if (!SD.begin(PIN_CS)) {
    Serial.println("Erro ao inicializar SD");
    while (true); // trava e aguarda watchdog reiniciar
  }

  // Watchdog timer: reinicia automaticamente após 30s travado
  esp_task_wdt_init(30, true);
  esp_task_wdt_add(NULL);
}

void loop() {
  esp_task_wdt_reset(); // alimenta o watchdog

  if (digitalRead(PIN_SENSOR) == HIGH) {
    File log = SD.open("/log.txt", FILE_APPEND);
    if (log) {
      log.println(millis()); // substituir por RTC DS3231 para timestamp real
      log.flush();           // garante escrita antes de fechar
      log.close();
    }
    delay(2000); // debounce: evita múltiplos registros por evento
  }
}
```

---

## Confiabilidade — Pontos Críticos

### 1. Alimentação estável
- Usar capacitor eletrolítico **470µF/16V** no barramento 3.3V para absorver picos durante escrita no SD.

### 2. Integridade dos dados no SD
- Sempre usar `log.flush()` antes de `log.close()`.
- Evitar desligar o dispositivo durante escrita.

### 3. Watchdog timer
- Habilitado no firmware para reiniciar automaticamente em caso de travamento.

### 4. Falsos positivos do RCWL-0516
- O sensor de microondas pode detectar objetos não-humanos (animais, ventilação, vibrações).
- Para maior precisão, considerar validação dupla com sensor PIR **HC-SR501** (registrar apenas quando ambos detectarem simultaneamente).

### 5. Timestamp real (opcional mas recomendado)
- Módulo RTC **DS3231** (~R$15) mantém horário mesmo sem energia no ESP32.
- Conectar via I2C: SDA → GPIO21, SCL → GPIO22.

---

## Lista de Compras

| Item | Status | Custo estimado |
|---|---|---|
| ESP32 DevKit | Necessário | ~R$40 |
| RCWL-0516 | Necessário | — |
| Módulo MicroSD | Necessário | — |
| Suporte bateria 9V | Necessário | — |
| Buck step-down 5V (MP1584/LM2596) | **Necessário** | ~R$8 |
| Capacitor 470µF/16V | Recomendado | ~R$2 |
| PIR HC-SR501 | Opcional (validação dupla) | ~R$15 |
| RTC DS3231 | Opcional (timestamp real) | ~R$15 |

---

## Autonomia Estimada

Consumo médio do sistema em operação contínua (loop sempre ativo): **~60mA** equivalente na fonte.

| Configuração | Consumo médio | Autonomia |
|---|---|---|
| Bateria 9V bloco, sem buck (linear) | ~150mA equivalente | ~2–3h |
| Bateria 9V bloco, com buck step-down | ~60mA equivalente | ~6–8h |
| Pack 6× AA NiMH recarregável (~2000mAh) + buck | ~60mA equivalente | ~33h (~1,4 dias) |
| Pack 6× AA alcalina (~2500mAh) + buck | ~60mA equivalente | ~42h (~1,7 dias) |
| Pack 18650 (2500mAh) + buck | ~60mA equivalente | ~40h |
| **USB veicular (5V, sem buck)** | — | **ilimitada enquanto houver energia na porta** |

### Notas

- O pack de **6× AA em série** entrega os mesmos 9V da bateria bloco, mas com ~5× mais capacidade — ganho direto de autonomia sem mudar o circuito. Para uso prolongado, as NiMH recarregáveis compensam no longo prazo.
- Os valores assumem operação **sempre ativa**. Habilitar *deep sleep* no ESP32 entre detecções pode elevar a autonomia por bateria para **semanas**.
- Para o requisito crítico de **não ter lacunas no log**, ver o esquema híbrido (USB veicular + bateria de backup) na seção "Alimentação por USB Veicular".
