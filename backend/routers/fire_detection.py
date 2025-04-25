from fastapi import APIRouter, UploadFile, WebSocket
from fastapi.responses import JSONResponse
import logging
import cv2
import numpy as np
import asyncio
from typing import List, Dict, Any
import json
import base64
from PIL import Image
import io
import websockets

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

router = APIRouter()

# Configuration for the Oracle cloud model
ORACLE_IP = "129.150.38.89"
ORACLE_WS_URI = f"ws://{ORACLE_IP}:5000/ws"

def process_detections(detections: List[Dict], original_shape: tuple, resized_shape: tuple) -> List[Dict]:
    """Scale detections back to original image size"""
    h0, w0 = original_shape[:2]
    h1, w1 = resized_shape[:2]
    fx = w0 / w1
    fy = h0 / h1

    scaled_detections = []
    for det in detections:
        x1, y1, x2, y2 = det["bbox"]
        scaled_det = det.copy()
        scaled_det["bbox"] = [
            int(x1 * fx), int(y1 * fy),
            int(x2 * fx), int(y2 * fy)
        ]
        scaled_detections.append(scaled_det)
    
    return scaled_detections

@router.post("/detect-fire/image")
async def detect_fire_in_image(file: UploadFile):
    try:
        logger.info(f"Received image for fire detection: {file.filename}")
        
        # Read image file
        contents = await file.read()
        nparr = np.frombuffer(contents, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        
        if img is None:
            logger.error("Failed to decode image")
            return JSONResponse(
                status_code=400,
                content={"error": "Invalid image file"}
            )

        # Resize image to match the model's expected input
        original_shape = img.shape
        resized = cv2.resize(img, (720, 512))
        
        # Encode the resized image to JPEG
        _, img_encoded = cv2.imencode('.jpg', resized, [cv2.IMWRITE_JPEG_QUALITY, 75])
        
        try:
            # Connect to Oracle cloud model
            async with websockets.connect(ORACLE_WS_URI, max_size=2**22) as ws:
                # Send the image
                await ws.send(img_encoded.tobytes())
                
                # Receive detections
                detections = json.loads(await ws.recv())
                
                # Scale detections back to original image size
                scaled_detections = process_detections(detections, original_shape, resized.shape)
                
                logger.info(f"Fire detection completed. Found {len(scaled_detections)} detections")
                return {"detections": scaled_detections}
                
        except Exception as ws_error:
            logger.error(f"Oracle model connection error: {str(ws_error)}")
            return JSONResponse(
                status_code=503,
                content={"error": "Failed to connect to fire detection model"}
            )
        
    except Exception as e:
        logger.error(f"Error processing image: {str(e)}", exc_info=True)
        return JSONResponse(
            status_code=500,
            content={"error": f"Failed to process image: {str(e)}"}
        )

@router.websocket("/ws/fire-detection")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    logger.info("New WebSocket connection established for fire detection stream")
    
    try:
        # Connect to Oracle model
        async with websockets.connect(ORACLE_WS_URI, max_size=2**22) as oracle_ws:
            while True:
                try:
                    # Receive frame from client
                    data = await websocket.receive_bytes()
                    
                    # Forward to Oracle model
                    await oracle_ws.send(data)
                    
                    # Get detections from Oracle model and forward to client
                    detections = await oracle_ws.recv()
                    await websocket.send_text(detections)  # Already JSON string
                    
                except Exception as frame_error:
                    logger.error(f"Error processing frame: {str(frame_error)}", exc_info=True)
                    await websocket.send_text(json.dumps({"error": str(frame_error)}))
                
    except Exception as ws_error:
        logger.error(f"WebSocket connection error: {str(ws_error)}", exc_info=True)
    finally:
        logger.info("WebSocket connection closed") 