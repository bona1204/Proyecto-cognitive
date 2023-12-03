#include <WiFi.h>
#include <PubSubClient.h>
WiFiClient espClient;
PubSubClient client(espClient);
#include <WiFiClientSecure.h>
#include <AzureIoTUtility.h>
#include <AzureIoTProtocol_MQTT.h>
#include <AzureIoTHub.h>

#include <LiquidCrystal_I2C.h>
LiquidCrystal_I2C lcd (0x27,16,2);

#include <DHT.h>

#include <DHT_U.h>
//#define DHTPIN 0

DHT dht(0, DHT11); //PinDHT, DHT11-DHT22

//VARIABLES WiFi
const char* ssid = "SECHIN2"; // Wifi user 
const char* password = "casma2000"; 
const char* mqtt_server = "test.mosquitto.org";// mosquitto server url
const char* SCOPE_ID = "0ne00B6D702";
const char* DEVICE_ID = "sensorderiego";
const char* DEVICE_KEY = "SOyha46ejEl/v04DrIezYoWAhTZ1dbxw4Ay5pFvKOI8=";


unsigned long lastMsg=0; //49 días
float tempWF = 0;
float humWF = 0;
float presWF = 0;
int hmTrAWF=0, hmTrBWF=0, hmTrCWF=0; 
int boyaWF=0;

//VARIABLES Generales
float temp, hum; //Variabe para la lectura del DHT
byte BLU=5, MB=15, val1=27, val2=26, val3=25; //Motobomba & Variables de Lectura
byte pinBY=4, pinPRES=33, pinS1=32, pinS2=35, pinS3=34; //Pines de Lectura
int SEN1, SEN2, SEN3, PRES; //Lecturas Analógicas de SENSORES
bool v1, v2, v3, boya; //Variables Internas de apoyo & Boya (Lectura)
byte i, j, k; //Variables para Limpiar LCD una sola vez
float prcntHumM1,prcntHumM2,prcntHumM3;

//VARIABLES PARA BOYA
float BY;


//VARIABLES de FILTRADO - EMA
float EMA_ALPHA = 0.3;  //varia de 0-1, mientras más cerca a cero, más fino, y más tradado, caso contrario si el valor se acerca a 1
int EMA_LP = 0;
float filPRES;

//VARIABLES del Sensor de Presión
float kPa;

  
                                         //FUNCIONES de apoyo

void maintest(){
  boya=digitalRead(pinBY);
  //Extras para WF boya
  BY=boya; 
  
  PRES=analogRead(pinPRES);
  filPRES=EMALowPassFilter(PRES);

  kPa=filPRES*0.0887+16.929;  //Formula que se obtiene de acuerdo a las mediciones del Sensor de Presión respecto del valor analogico que se obtiene del voltaje del AD620
                               //34mV (Sensor Presión) --> 250 (ana) "34 mv es poco para el ADC del ESP32, por ende el valor analogico que figura es del Opam AD620, 
                               //70mV (Sensor Presión) --> 715 (ana)  que tiene como ganancia maxima de 10db, con lo cual se trabajo"
                               //88mV (Sensor Presión) --> 950 (ana)
  temp=dht.readTemperature();
  hum=dht.readHumidity();
}

void sentest(){
  SEN1=analogRead(pinS1);
  SEN2=analogRead(pinS2);
  SEN3=analogRead(pinS3);
  
  prcntHumM1=map(SEN1,700,4095,100,0);
  prcntHumM2=map(SEN2,700,4095,100,0);
  prcntHumM3=map(SEN3,700,4095,100,0);

  if(prcntHumM1<0){
    prcntHumM1=0; 
  }
  if(prcntHumM2<0){
    prcntHumM2=0;
  }
  if(prcntHumM3<0){
    prcntHumM3=0;
  }

  if(prcntHumM1>100){
    prcntHumM1=100;
  }
  if(prcntHumM2>100){
    prcntHumM2=100;
  }
  if(prcntHumM3>100){
    prcntHumM3=100;
  }    
}

int EMALowPassFilter(int value){
  EMA_LP = EMA_ALPHA * value + (1 - EMA_ALPHA) * EMA_LP;
  return EMA_LP;
}

                                   //Zona WiFi
void setup_wifi(){ 
  delay(10);
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.mode(WIFI_STA); 
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED){ 
    delay(500);
    Serial.print(".");
  }

  randomSeed(micros());

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}

void callback(char* topic, byte* payload, unsigned int length) { 
  Serial.print("Message arrived [");
  Serial.print(topic);
  Serial.print("] ");
  for (int i = 0; i < length; i++) { 
    Serial.print((char)payload[i]);
  }
}

void reconnect() { 
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    String clientId = "ESP32Client-";
    clientId += String(random(0xffff), HEX);
    if (client.connect(clientId.c_str())) {
      Serial.println("Connected");
      client.publish("Regadío/Publish", "Welcome");
      client.subscribe("Regadío/Subscribe"); 
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      delay(5000);
    }
  }
}


                                                //PROGRAMA
void setup(){
Serial.begin(115200);

lcd.init();
lcd.backlight();
lcd.clear();

dht.begin();

setup_wifi(); 
client.setServer(mqtt_server, 1883);
client.setCallback(callback);

pinMode(MB,OUTPUT);
pinMode(val1,OUTPUT);
pinMode(val2,OUTPUT);
pinMode(val3,OUTPUT);
pinMode(BLU,OUTPUT);
pinMode(pinBY,INPUT);

digitalWrite(BLU,LOW);

analogReadResolution(12);

}

void loop() {
  maintest(); 
  sentest();
  
  if (!client.connected()) { //Sí el cliente se desconecta, ingresa a reconnect
      reconnect();
  }
  
  client.loop();
  
  unsigned long now = millis();
  
  if(now - lastMsg > 999){ 
    lastMsg = now;
      
    String tempWF = String(temp, 1);
    client.publish("Regadío/temp", tempWF.c_str()); 
    String humWF = String(hum, 1); 
    client.publish("Regadío/hum", humWF.c_str());   
    String presWF = String(kPa, 1); 
    client.publish("Regadío/pres", presWF.c_str());   
    String hmTrAWF = String(prcntHumM1,0);
    client.publish("Regadío/gndHum1", hmTrAWF.c_str());
    String hmTrBWF = String(prcntHumM2,0);
    client.publish("Regadío/gndHum2", hmTrBWF.c_str());
    String hmTrCWF = String(prcntHumM3,0);
    client.publish("Regadío/gndHum3", hmTrCWF.c_str());
    
    String boyaWF = String(BY,0);
    client.publish("Regadío/boya", boyaWF.c_str());
    
    Serial.print("Temperatura WF: ");
    Serial.print(tempWF);
    Serial.print(" - Humedad WF: ");
    Serial.print(humWF);
    Serial.print(" -  Presión WF: ");
    Serial.print(presWF);
    
    Serial.print(" -  Hum Trr 1 WF: ");
    Serial.print(hmTrAWF);
    Serial.print(" -  Hum Trr 2 WF: ");
    Serial.print(hmTrBWF);
    Serial.print(" -  Hum Trr 3 WF: ");
    Serial.println(hmTrCWF); 
  }
 
  if(boya){
    if(k==0){              //LCD clear
      for(i=0;i<1;i++){
      lcd.clear();
      }
    k=i;
    }
    j=0;
    
    sentest();

    if(prcntHumM1>90){
      digitalWrite(val1,LOW);
      v1=0;
    } else if(prcntHumM1<75){ //Tierra Seca
        digitalWrite(val1,HIGH);
        v1=1;
    }  

    if(prcntHumM2>90){
      digitalWrite(val2,LOW);
      v2=0;
    } else if(prcntHumM2<75){ //Tierra Seca
        digitalWrite(val2,HIGH);
        v2=1;
    }

    if(prcntHumM3>90){
      digitalWrite(val3,LOW);
      v3=0;
    } else if(prcntHumM3<75){ //Tierra Seca
        digitalWrite(val3,HIGH);
        v3=1;
    }

    
    /*    
    if(SEN1<1280){ //Tierra Humeda
      digitalWrite(val1,LOW);
      v1=0;
    } else if(SEN1>1480){ //Tierra Seca
        digitalWrite(val1,HIGH);
        v1=1;
    }
     
    if(SEN2<1280){ //Tierra Humeda
      digitalWrite(val2,LOW);
      v2=0;
    } else if(SEN2>1480){ //Tierra Seca
        digitalWrite(val2,HIGH);
        v2=1;
    }
       
    if(SEN3<1280){              //Tierra Humeda
      digitalWrite(val3,LOW);
      v3=0;
    } else if(SEN3>1480){       //Tierra Seca
        digitalWrite(val3,HIGH);
        v3=1;
    }*/

/*    if((!v1 && !v2 && !v3) || kPa>101){
      digitalWrite(MB,LOW);  
    } else if(kPa<=98){
        digitalWrite(MB,HIGH);
    }   */
 
                                                //ENCENDIDO y APAGADO de MOTOBOMBA
    if((v1 || v2 || v3) && kPa<67){
      digitalWrite(MB,HIGH);  
    } else if(kPa>70 || (!v1 && !v2 && !v3)){
        digitalWrite(MB,LOW);
    }

 
                                          //LCD
    lcd.setCursor(2,0);
    lcd.print("La Presion del agua es ");
    lcd.setCursor(25,0);
    lcd.print(kPa);
  
    if (kPa<10){
      lcd.setCursor(26,0);
      lcd.print("kPa    ");
    }
    if (kPa>=10 && kPa<100){
      lcd.setCursor(27,0);
      lcd.print("kPa   ");
    }
    if (kPa>=100){
      lcd.setCursor(28,0);
      lcd.print("kPa  ");
    }
 
    lcd.setCursor(2,1);
    lcd.print("Temperatura: ");
    lcd.setCursor(15,1);
    lcd.print(temp);
    lcd.setCursor(19,1);
    lcd.print((char)223);
    lcd.setCursor(20,1);
    lcd.print("C - Humedad: ");
    lcd.setCursor(33,1);
    lcd.print(hum);
    lcd.setCursor(37,1);
    lcd.print("%");
     
    lcd.scrollDisplayLeft();
  
      
                                            //Serial
    Serial.print(prcntHumM1,0);
    Serial.print("% - ");
    Serial.print(prcntHumM2,0);
    Serial.print("% - ");
    Serial.print(prcntHumM3,0);
    Serial.print("% - TEMP: ");
    Serial.print(temp);
    Serial.print("°C - HUM: ");
    Serial.print(hum); 
    Serial.print("% - Presion: ");
    Serial.print(kPa,1);
    Serial.println("kPa");
      
    delay(400);
  }
   
  if(!boya){                    

    if(j==0){
      for(i=0;i<1;i++){
      lcd.clear();
      }
    j=i;
    }
    k=0;
    
    digitalWrite(MB,LOW);    // Apagamos la Motobomba
    digitalWrite(val1,LOW);
    digitalWrite(val2,LOW);
    digitalWrite(val3,LOW);
     
    digitalWrite(BLU,HIGH);
    delay(150);
    digitalWrite(BLU,LOW); 
    delay(150);
  
                                 //LCD
    lcd.setCursor(2,0);
    lcd.print("Agua agotada - Presion: "); 
    lcd.setCursor(26,0);
    lcd.print(kPa);
  
    if (kPa<10){
      lcd.setCursor(27,0);
      lcd.print("kPa    ");
    }
    if (kPa>=10 && kPa<100){
      lcd.setCursor(28,0);
      lcd.print("kPa   ");
    }
    if (kPa>=100){
      lcd.setCursor(29,0);
      lcd.print("kPa  ");
    }
    
    lcd.setCursor(2,1);
    lcd.print("Temperatura: ");
    lcd.setCursor(15,1);
    lcd.print(temp);
    lcd.setCursor(19,1);
    lcd.print((char)223);
    lcd.setCursor(20,1);
    lcd.print("C - Humedad: ");
    lcd.setCursor(33,1);
    lcd.print(hum);
    lcd.setCursor(37,1);
    lcd.print("%");
  
    lcd.scrollDisplayLeft();
    
    Serial.print("NO hay agua - TEMP: ");
    Serial.print(temp);
    Serial.print("°C - HUM: ");
    Serial.print(hum);
    Serial.print("% - Presión: ");
    Serial.print(kPa);
    Serial.println("kPa");
    
    delay(130);
  }
}
