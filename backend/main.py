from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from routers import fan, light, sensor, login, activitylog, fire_detection
from contextlib import asynccontextmanager
from adafruitConnection import run_mqtt_thread
import os
from supabase import create_client, Client


@asynccontextmanager
async def lifespan(app: FastAPI):
    run_mqtt_thread()
    url: str = "https://uptilkatqzrxvsqzcemx.supabase.co"
    key: str = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVwdGlsa2F0cXpyeHZzcXpjZW14Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU1NjkyOTMsImV4cCI6MjA2MTE0NTI5M30.XrdLClY2uTnKp9htHIU1dae2WdOXVbLVD5GwP0lW7mA"

    supabase: Client = create_client(url, key)
    app.state.db = supabase
    print("Finish set up connection with Supabase DB.")

    yield  # Yield to let FastAPI start the app

    # No clean up needed
    print("No clean up needed with Supabase DB.")

    

# Initialize FastAPI app
app = FastAPI(lifespan= lifespan)

# Middleware for CORS
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://192.168.56.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    # allow_origins=origins,
    allow_origins = ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(fan.router)
app.include_router(light.router)
app.include_router(sensor.router)
app.include_router(login.router)
app.include_router(activitylog.router)
app.include_router(fire_detection.router, prefix="/api/fire-detection", tags=["fire-detection"])

@app.get("/")
async def root():
    """
    Root endpoint to check API status.
    """
    return { "Hello World" }
    

# ✅ Start FastAPI
if __name__ == "__main__":
    # Start FastAPI with Uvicorn
    # Main thread sẽ đc dùng để host API server, nơi frontend get data từ backend
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=False)