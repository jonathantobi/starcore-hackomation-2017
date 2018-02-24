const int gasSensorPin= 0;
const int flameSensorPin= 1;
const int buzzerPin= 12;
int smoke_level;
int flame_level;

void setup() {
Serial.begin(115200); //sets the baud rate for data transfer in bits/second
pinMode(gasSensorPin, INPUT);//the smoke sensor will be an input to the arduino
pinMode(flameSensorPin, INPUT);
pinMode(buzzerPin, OUTPUT);//the buzzer serves an output in the circuit
}

void loop() {
smoke_level= analogRead(gasSensorPin); //arduino reads the value from the smoke sensor
flame_level= analogRead(flameSensorPin);
Serial.print("smoke level: ");
Serial.println(smoke_level);//prints just for debugging purposes, to see what values the sensor is picking up

Serial.print("flame level: ");
Serial.println(flame_level);

if(smoke_level > 800){ //if smoke level is greater than 200, the buzzer will go off
digitalWrite(buzzerPin, HIGH);
}

else{
digitalWrite(buzzerPin, LOW);
}
}
