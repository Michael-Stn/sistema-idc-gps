from machine import UART, Pin, Timer
from constants import (
    GPS_UART_N,
    GPS_UART_BAUDRATE,
    LAT_FIELD,
    LON_FIELD,
    PIN_LED_RED,
    PIN_LED_GREEN,
    PIN_LED_BLUE,
    TIMER_N_RED,
    TIMER_N_GREEN,
    TIMER_N_BLUE,
    BLINK_TIME_MS,
)


class Neo6M_GPS(UART):
    def __init__(self):
        super().__init__(GPS_UART_N, GPS_UART_BAUDRATE)

    def get_location(self):
        try:
            dataEncoded = self.read()
            location = self.__extract_nmea(dataEncoded)
        except Exception:
            return None
        else:
            return location

    def __extract_nmea(self, encoded):
        assert encoded is not None
        decoded = encoded.decode()

        # Obtener línea $GPGGA
        lines = decoded.split("\n")
        gpsLineFiltered = list(filter(lambda l: l.startswith("$GPGGA"), lines))
        assert gpsLineFiltered
        gpsLine = gpsLineFiltered[0]

        # Separar valores del $GPGGA
        parts = gpsLine.split(",")
        assert len(parts) == 15
        assert parts[2] and parts[3] and parts[4] and parts[5]

        # Convertir en grados (cordenadas)
        latitude = self.__convert_to_degree(parts[2])
        if parts[3] == "S":
            latitude = -latitude
        longitude = self.__convert_to_degree(parts[4])
        if parts[5] == "W":
            longitude = -longitude

        return {LAT_FIELD: latitude, LON_FIELD: longitude}

    def __convert_to_degree(self, raw_degrees):
        raw_as_float = float(raw_degrees)
        first_digits = int(raw_as_float / 100)
        next_two_digits = raw_as_float - float(first_digits * 100)

        converted = float(first_digits + next_two_digits / 60.0)
        converted = "{0:.6f}".format(converted)
        return float(converted)


class RGB:
    def __init__(self):
        self.__led_red = Pin(PIN_LED_RED, Pin.OUT)
        self.__led_green = Pin(PIN_LED_GREEN, Pin.OUT)
        self.__led_blue = Pin(PIN_LED_BLUE, Pin.OUT)
        self.__reset()

    def __reset(self):
        self.__led_red.off()
        self.__led_green.off()
        self.__led_blue.off()

    def blink_red(self):
        self.__led_red.on()

        def turn_off(t):
            self.__led_red.off()

        Timer(TIMER_N_RED).init(
            period=BLINK_TIME_MS, mode=Timer.ONE_SHOT, callback=turn_off
        )

    def blink_green(self):
        self.__led_green.on()

        def turn_off(t):
            self.__led_green.off()

        Timer(TIMER_N_GREEN).init(
            period=BLINK_TIME_MS, mode=Timer.ONE_SHOT, callback=turn_off
        )

    def blink_blue(self):
        self.__led_blue.on()

        def turn_off(t):
            self.__led_blue.off()

        Timer(TIMER_N_BLUE).init(
            period=BLINK_TIME_MS, mode=Timer.ONE_SHOT, callback=turn_off
        )
