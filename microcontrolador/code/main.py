from connection import Wifi
from mqtt import Broker
from modules import Neo6M_GPS, RGB
from sync import Timer
from constants import CODE_PET, DO_SYNC_FIELD, INTERVAL_SYNC_FIELD, LAT_FIELD, LON_FIELD

Wifi().connect()

gpsModule = Neo6M_GPS()
rgbModule = RGB()


def on_configs(payload):
    doSync = payload.get(DO_SYNC_FIELD)
    intervalSync = payload.get(INTERVAL_SYNC_FIELD)
    tim.update(doSync, intervalSync)
    rgbModule.blink_blue()


broker = Broker(on_configs)


def do_track(t):
    location = gpsModule.get_location()
    print("Registrando...", location)
    if location is not None:
        broker.sync_track(CODE_PET, location.get(LAT_FIELD), location.get(LON_FIELD))
        rgbModule.blink_green()
    else:
        rgbModule.blink_red()


tim = Timer(rgbModule.blink_blue)
tim.init(do_track)

broker.listen()
