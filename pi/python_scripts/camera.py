from picamera import PiCamera, Color
from time import sleep

camera = PiCamera()

camera.resolution = (1920, 1080)
#camera.framerate = 24

camera.start_preview()

camera.image_effect = 'solarize'

#camera.annotate_background = Color('black')
#camera.annotate_foreground = Color('white')

#camera.annotate_text = "Hi There!"

#camera.annotate_text_size = 150
#valid 6 - 160

#camera.brightness = 70
#valid 0 -100

#camera.contrast = 70
#valid 0 -100

sleep(5)
camera.capture('/home/pi/Desktop/solarize.jpg')
camera.stop_preview()

#camera.start_preview()
#for i in range(5):
#    sleep(5)
#    camera.capture('/home/pi/Desktop/image%s.jpg' % i)
#camera.stop_preview()

#camera.start_preview()
#camera.start_recording('/home/pi/video.h264')
#sleep(10)
#camera.stop_recording()
#camera.stop_preview()
