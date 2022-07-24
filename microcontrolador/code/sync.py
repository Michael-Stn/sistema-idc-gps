from machine import Timer as TimerMachine
from constants import (
    TIMER_N,
    TIMER_CONFIGS_URL,
    DATA_FIELD,
    DO_SYNC_FIELD,
    INTERVAL_SYNC_FIELD,
)
from urequests import get
from ujson import loads as decode_json


class Timer(TimerMachine):
    def __init__(self, cb):
        super().__init__(TIMER_N)
        self.__init_configs(cb)

    def __init_configs(self, cb):
        response = get(url=TIMER_CONFIGS_URL)
        configs = decode_json(response.text).get(DATA_FIELD)
        self.__doSync = configs.get(DO_SYNC_FIELD)
        self.__intervalSync = configs.get(INTERVAL_SYNC_FIELD)
        print("Init Configs: get <<", end=" ")
        print(f"{DO_SYNC_FIELD}: {self.__doSync}", end=", ")
        print(f"{INTERVAL_SYNC_FIELD}: {self.__intervalSync}")
        cb()

    def __reset(self):
        self.deinit()
        if self.__doSync:
            ms = int(self.__intervalSync * 60 * 1000)
            super().init(period=ms, callback=self.__cb)

    def init(self, cb):
        self.__cb = cb
        self.__reset()

    def update(self, doSync, intervalSync):
        if doSync is not None:
            self.__doSync = doSync
        if intervalSync is not None:
            self.__intervalSync = intervalSync
        self.__reset()
