#include <DHT.h>

#define DHT_PIN 2
#define DHT_TYPE DHT11

#define ACS_PIN A0
#define VOLTAGE_PIN A1
#define RELAY_PIN 8

DHT dht(DHT_PIN, DHT_TYPE);

bool focoEncendido = false;
const float ACS_SENSITIVITY = 0.185;
const float VOLTAGE_RATIO = 3.0;


void setup() {

  Serial.begin(9600);
  dht.begin();
  pinMode(RELAY_PIN, OUTPUT);
  digitalWrite(RELAY_PIN, HIGH);
  Serial.println("ARDUINO_DOMOTICA_LISTO");
}

void loop() {

  recibirComando();

  float temperatura = dht.readTemperature();
  float humedad = dht.readHumidity();

  float corriente = leerCorriente();
  float voltaje = leerVoltaje();

  if (isnan(temperatura) || isnan(humedad)) {

    Serial.println("ERROR_DHT11");

  } else {

    Serial.print("{\"temperatura\":");
    Serial.print(temperatura, 1);

    Serial.print(",\"humedad\":");
    Serial.print(humedad, 1);

    Serial.print(",\"voltaje\":");
    Serial.print(voltaje, 2);

    Serial.print(",\"amperaje\":");
    Serial.print(corriente, 2);

    Serial.print(",\"estadoFoco\":");
    Serial.print(focoEncendido ? "true" : "false");

    Serial.println("}");
  }

  delay(3000);
}


void recibirComando() {

  if (Serial.available() > 0) {

    String comando = Serial.readStringUntil('\n');

    comando.trim();

    if (comando == "LIGHT_ON") {

      digitalWrite(RELAY_PIN, LOW);

      focoEncendido = true;

      Serial.println("FOCO_ENCENDIDO");
    }

    else if (comando == "LIGHT_OFF") {

      digitalWrite(RELAY_PIN, HIGH);

      focoEncendido = false;

      Serial.println("FOCO_APAGADO");
    }
  }
}


float leerCorriente() {

  int lectura = analogRead(ACS_PIN);

  float voltajeSensor = lectura * (5.0 / 1023.0);

  float corriente =
      (voltajeSensor - 2.5) / ACS_SENSITIVITY;
  if (corriente < 0) {
    corriente = 0;
  }

  return corriente;
}

float leerVoltaje() {

  int lectura = analogRead(VOLTAGE_PIN);

  float voltajeArduino =
      lectura * (5.0 / 1023.0);

  float voltajeEntrada =
      voltajeArduino * VOLTAGE_RATIO;

  return voltajeEntrada;
}
