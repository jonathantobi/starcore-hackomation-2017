int i = 0;

void setup(){
  Serial.begin(9600);  
}

void loop(){
  if(i > 4){
    i = 0;
  }
  
  if(i = 2){
    Serial.print(200);Serial.print(",");
    Serial.println(40);
  }
  
  
  delay(10000);
  i++;
}
