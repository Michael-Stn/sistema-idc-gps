from network import WLAN, STA_IF
from constants import WIFI_NETWORK, WIFI_PASSWORD


class Wifi:
    def __init__(self):
        self.__wlan = WLAN(STA_IF)
        self.__network = WIFI_NETWORK
        self.__password = WIFI_PASSWORD

    def connect(self):
        self.__wlan.active(True)
        if not self.__wlan.isconnected():
            print("Conectando a la red...")
            self.__wlan.connect(self.__network, self.__password)
            while not self.__wlan.isconnected():
                pass
        print("-" * 30)
        print("Conectado a la red:", self.__network)
        print("Configuraciones:", self.__wlan.ifconfig())
        print("Estado:", self.__wlan.status())
        print("-" * 30)
