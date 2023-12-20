## About Nodejs and NodeMCU ESP8266

This project for your testing connection between NodeMCU ESP8266 to Nodejs as server. Focus point in this project is how to make connection between NodeMCU ESP8266 to Nodejs as server therefore in this project just make a switch for turnon / turnoff led. this project made using JQuery for AJAX to server, MySQL for database and Bootstrap for UI. lets install this project before you run.

## Initialitation

1. Open `Ardunio` app.

## Code Program from Arduino Uno

- declare define led as `led` for your Pin LED
- declare variabel `*ssid` and `*password` your Wifi Connection

```

#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <map>

#define led D0

const char *ssid = "Wifi Name";
const char *password = "Wifi Pass";
String api = "webiot.up.railway.app";
String BASE_URL = "https://" + String(api) + "/api";
WiFiClient client;
HTTPClient http;

void setup() {
  pinMode(led, OUTPUT);
  Serial.begin(115200);
  WiFi.begin(ssid, password);

  Serial.print("Connecting to WiFi");
  while (WiFi.waitForConnectResult() != WL_CONNECTED) {
    Serial.println("Wifi Gagal Terhubung Dengan Arduino");
  }

  Serial.println();
  Serial.println("Connected to WiFi");
}

void loop() {
  sendRequest();
}

void sendRequest() {
  String url = BASE_URL + "/led";
  http.begin(client, url);
  http.setTimeout(5000);

  int httpCode = http.GET();

  if (httpCode > 0) {
    if (httpCode == HTTP_CODE_OK) {
      String response = http.getString();
      Serial.println("Response from server: " + response.stateLed);

      std::map<String, int> responseMap = {{"1", HIGH}, {"0", LOW}};

      if (responseMap.find(response.stateLed) != responseMap.end()) {
        digitalWrite(led, responseMap[response.stateLed]);
      } else {
        Serial.println("Invalid response from server");
      }

    } else {
      Serial.println("HTTP request failed with error code: " + String(httpCode));
    }
  } else {
    Serial.println("Connection failed");
  }

  http.end();

  delay(2000);
}

```
