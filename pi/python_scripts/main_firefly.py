#!/usr/bin/python

import serial
import time
import request

ser = serial.Serial(

        port = '/dev/ttyACM1',
        baudrate = 9600,
        parity = serial.PARITY_NONE,
        stopbits = serial.STOPBITS_ONE,
        bytesize = serial.EIGHTBITS,
        timeout = 1
    )

while (ser.inWaiting()):
        print("waiting for data ...")
        print("")
        x = ser.readline().strip()
        if(x):
                print("collecting data ...")
                print("")
                
    
