from umqtt.simple import MQTTClient
from constants import (
    MQTT_CLIENT_ID,
    MQTT_BROKER,
    MQTT_USER,
    MQTT_PASSWORD,
    MQTT_TOPIC_CONFIGS,
    MQTT_TOPIC_TRACK,
    CODE_PET_FIELD,
    LAT_FIELD,
    LON_FIELD,
)
from ujson import loads as decode_json, dumps as encode_json


class Broker(MQTTClient):
    def __init__(self, configs_cb):
        super().__init__(
            MQTT_CLIENT_ID, MQTT_BROKER, user=MQTT_USER, password=MQTT_PASSWORD
        )
        self.__configs_cb = configs_cb
        self.set_callback(self.__on_sub)
        self.connect()
        self.subscribe(MQTT_TOPIC_CONFIGS)

    def listen(self):
        while True:
            print("Escuchando suscripciones...")
            self.wait_msg()

    def __on_sub(self, topic, msg):
        topic = topic.decode()
        message = msg.decode()
        if topic == MQTT_TOPIC_CONFIGS:
            # Llegaron nuevas configuraciones
            print(f"Sub << Topic: {topic}, Msg: {message}")
            payload = decode_json(message)
            # Invoca callback
            self.__configs_cb(payload)

    def sync_track(self, code_pet, latitude, longitude):
        payload = {CODE_PET_FIELD: code_pet, LAT_FIELD: latitude, LON_FIELD: longitude}
        encoded = encode_json(payload)
        self.publish(MQTT_TOPIC_TRACK, encoded)
        print(f"Pub >> Topic: {MQTT_TOPIC_TRACK}, Msg: {encoded}")
