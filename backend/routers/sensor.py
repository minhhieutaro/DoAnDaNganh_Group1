from fastapi import APIRouter
from adafruitConnection import get_aio, get_mqtt, AIO_FEED_IDS
import requests

router = APIRouter(prefix="/sensor", tags=["Sensor"])

@router.get("/")
def get_sensor_status():
    return {"status": "sensor is working"}

# Route to get the latest temperature data
@router.get("/temp/latest")
async def get_latest_temp():
    try:
        aio = get_aio()
        latest_value = aio.receive(AIO_FEED_IDS[5])  # Fetch latest value
        return {
            "value": latest_value.value,
            "timestamp": latest_value.created_at
        }
    except Exception as e:
        return {"error": str(e)}

# Route to get historical temperature data - limit 1000 records
@router.get("/temp/history1000")
async def get_temp_history():
    try:
        aio = get_aio()
        history = aio.data(AIO_FEED_IDS[5], max_results=1000) 
        return [
            {"value": entry.value, "timestamp": entry.created_at} for entry in history
        ]
    except Exception as e:
        return {"error": str(e)}
    
# Route to get the latest light data
@router.get("/light/latest")
async def get_latest_light():
    try:
        aio = get_aio()
        latest_value = aio.receive(AIO_FEED_IDS[3])  # Fetch latest value
        return {
            "value": latest_value.value,
            "timestamp": latest_value.created_at
        }
    except Exception as e:
        return {"error": str(e)}

# Route to get historical light data - limit 1000 records  
@router.get("/light/history1000")
async def get_light_history():
    try:
        aio = get_aio()
        history = aio.data(AIO_FEED_IDS[3], max_results=1000)  # Get last 5 entries
        return [
            {"value": entry.value, "timestamp": entry.created_at} for entry in history
        ]
    except Exception as e:
        return {"error": str(e)}
    
# Route to get the latest humid data
@router.get("/humid/latest")
async def get_latest_humid():
    try:
        aio = get_aio()
        latest_value = aio.receive(AIO_FEED_IDS[2])  # Fetch latest value
        return {
            "value": latest_value.value,
            "timestamp": latest_value.created_at
        }
    except Exception as e:
        return {"error": str(e)}

# Route to get historical humid data - limit 1000 records  
@router.get("/humid/history1000")
async def get_humid_history():
    try:
        aio = get_aio()
        history = aio.data(AIO_FEED_IDS[2], max_results=1000)  # Get last 5 entries
        return [
            {"value": entry.value, "timestamp": entry.created_at} for entry in history
        ]
    except Exception as e:
        return {"error": str(e)}

@router.get("/air-quality")
async def get_air_quality():
    try:
        response = requests.get('https://api.openaq.org/v3/latest?city=Ho%20Chi%20Minh&limit=1')
        data = response.json()
        
        if data.get('results') and len(data['results']) > 0:
            measurements = data['results'][0]['measurements']
            # Find PM2.5 measurement if available, otherwise use PM10
            pm25 = next((m for m in measurements if m['parameter'] == 'pm25'), None)
            pm10 = next((m for m in measurements if m['parameter'] == 'pm10'), None)
            
            # Convert PM2.5 or PM10 to AQI (Air Quality Index)
            value = pm25['value'] if pm25 else (pm10['value'] if pm10 else 75)
            # Normalize to 0-100 scale for our UI
            normalized_value = min(100, max(0, (value / 50) * 100))
            return {"value": normalized_value}
        return {"value": 75}  # Default value if no data available
    except Exception as e:
        return {"value": 75, "error": str(e)}  # Default value on error