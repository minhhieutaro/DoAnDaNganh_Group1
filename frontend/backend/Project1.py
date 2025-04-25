
import sys
from Adafruit_IO import MQTTClient
import time
import random
from Adafruit_IO import Client

# Define multiple feed IDs
# List of device:
    # "color change" = 0, -- Change light color
    # "fan" = 1,        -- Change fan speed
    # "humid" = 2,      -- Track humidity
    # "light" = 3,      -- Track light level
    # "switch" = 4,     -- Turn light on/off
    # "temp" = 5,       -- track temperature
    # "text" = 6        -- Display message on adafruit
AIO_FEED_IDS = ["color change", "fan", "humid", "light", "switch", "temp", "text"]
AIO_USERNAME = "tarominhhieu1534"
AIO_KEY = "aio_FxwF25uEzlH2XJLJ58MqDqv2rMkE"



def connected(client):
    print("Connected to Adafruit IO!")
    for feed in AIO_FEED_IDS:
        client.subscribe(feed)  # Subscribe to all feeds

def disconnected(client):
    print("Disconnected from Adafruit IO!")
    sys.exit(1)

def message(client, feed_id, payload):
    print(f"Received data on {feed_id}: {payload}")

def publish_random_data(client, id):
    value = random.uniform(0, 100)  # Generate a random value
    print(f"Publishing {value:.2f} to {AIO_FEED_IDS[id]}")
    client.publish( AIO_FEED_IDS[id] , value)

def random_loop(client):
    while True:
        value = random.randint(0, 6)
        publish_random_data(client, value)
        time.sleep(5)

client = MQTTClient(AIO_USERNAME, AIO_KEY)
client.on_connect = connected
client.on_disconnect = disconnected
client.on_message = message

aio = Client("tarominhhieu1534", "aio_FxwF25uEzlH2XJLJ58MqDqv2rMkE")
all_data = aio.data("temp")

for data in all_data:
    print(f"Value: {data.value}, Timestamp: {data.created_at}")

# try:
#     client.connect()
#     client.loop_background()
#     random_loop(client)
# except KeyboardInterrupt:
#     print("Exiting...")
#     client.disconnect()