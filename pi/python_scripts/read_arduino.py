#!/usr/bin/python

import serial
import time


ser = serial.Serial(

        port = '/dev/ttyACM1',
        baudrate = 9600,
        parity = serial.PARITY_NONE,
        stopbits = serial.STOPBITS_ONE,
        bytesize = serial.EIGHTBITS
    )

while 1:
    ser.flush()
    line = ser.readline().decode().strip()
    gas, fire = line.split(",")
    print("gas-level: ", gas)
    print("fire-level: ", fire)
    time.sleep(1)
    
