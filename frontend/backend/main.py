from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import sys
import os
from Adafruit_IO import MQTTClient, Client
import time
import random
import threading
from contextlib import asynccontextmanager


# Initialize FastAPI app
app = FastAPI()

# Middleware for CORS
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Adafruit IO Credentials
AIO_FEED_IDS = ["color change", "fan", "humid", "light", "switch", "temp", "text"]
# AIO_USERNAME = "tarominhhieu1534"
# AIO_KEY = "aio_tlZn50xs0OUPnRO7NVdAB90x4qMu"
AIO_USERNAME = "CheemsPoGgErs"
AIO_KEY = "aio_BNfP53iMTWSttQD5OeKgifDwv3K0"

# Create Adafruit IO REST API Client
aio = Client(AIO_USERNAME, AIO_KEY)

# Create Adafruit IO MQTT Client
mqtt_client = MQTTClient(AIO_USERNAME, AIO_KEY)

#### API section
latest_temp = None

@app.get("/")
async def root():
    """
    Root endpoint to check API status.
    """
    return { "Hello World" }

# Include the employee router
# app.include_router(employee.router)
# app.include_router(patient.router)

# Route to get the latest temperature data
@app.get("/temp/latest")
async def get_latest_temp():
    try:
        latest_value = aio.receive(AIO_FEED_IDS[5])  # Fetch latest value
        return {
            "value": latest_value.value,
            "timestamp": latest_value.created_at
        }
    except Exception as e:
        return {"error": str(e)}

# Route to get historical temperature data - all records
@app.get("/temp/history")
async def get_temp_history():
    try:
        history = aio.data(AIO_FEED_IDS[5]) 
        return [
            {"value": entry.value, "timestamp": entry.created_at} for entry in history
        ]
    except Exception as e:
        return {"error": str(e)}

# Route to get historical light data - all records  
@app.get("/light/history")
async def get_temp_history():
    try:
        history = aio.data(AIO_FEED_IDS[3])  # Get last 5 entries
        return [
            {"value": entry.value, "timestamp": entry.created_at} for entry in history
        ]
    except Exception as e:
        return {"error": str(e)}


#### Ada Fruit Connection Section
def connected(client):
    print("Connected to Adafruit IO!")
    for feed in AIO_FEED_IDS:
        client.subscribe(feed)  # Subscribe to all feeds

def disconnected(client):
    print("Disconnected from Adafruit IO!")
    sys.exit(1)

def message(client, feed_id, payload):
    global latest_temp
    print(f"Received: {feed_id} = {payload}")
    if feed_id == AIO_FEED_IDS[5]:
        latest_temp = payload  # Store latest temperature

def publish_random_data(client, id):
    value = random.randint(0, 100)  # Generate a random value
    print(f"Publishing {value:.2f} to {AIO_FEED_IDS[id]}")
    client.publish( AIO_FEED_IDS[id] , value)

# Event to signal threads to stop
stop_event = threading.Event()
mqtt_ready_event = threading.Event() 

def random_loop(client):
    mqtt_ready_event.wait()  # Wait for MQTT signal
    while not stop_event.is_set():
        value = random.randint(0, 6)
        publish_random_data(client, 1)
        time.sleep(5)
    print("Random loop stopped.")


# ✅ Start MQTT Client in a separate thread
def start_mqtt():
    mqtt_client.on_message = message
    mqtt_client.on_connect = connected
    mqtt_client.on_disconnect = disconnected
    mqtt_client.connect()
    mqtt_client.loop_background()  # ✅ Runs MQTT in the background

    # ✅ Polling loop to check if MQTT is really connected
    while not mqtt_client.is_connected():
        time.sleep(0.5)  # Check every 500ms

    # ✅ Signal that MQTT is ready
    mqtt_ready_event.set()
    while not stop_event.is_set():  # ✅ Keep checking stop_event
        time.sleep(1)
    print("MQTT client stopped.")




# ✅ Start FastAPI in main thread and MQTT in a background thread
if __name__ == "__main__":
    # import uvicorn
    # uvicorn.run(app, host="0.0.0.0", port=8000)
    try:
        # Start MQTT listener thread
        # Thread này dùng đề listen feedback từ Adafruit
        mqtt_thread = threading.Thread(target=start_mqtt, daemon=True)
        mqtt_thread.start()
        
        # Start random_loop thread
        # Thread này dùng để push random data lên Ada feed
        random_thread = threading.Thread(target=random_loop, args=(mqtt_client,), daemon=True)
        random_thread.start()

        # Start FastAPI with Uvicorn
        # Main thread sẽ đc dùng để host API server, nơi frontend get data từ backend
        import uvicorn
        uvicorn.run(app, host="0.0.0.0", port=8000, reload=False)

    except KeyboardInterrupt:
        print("Shutting down...")

    finally:
        # Signal threads to stop
        stop_event.set()
        mqtt_thread.join()
        random_thread.join()
        print("All threads stopped. Exiting.")
