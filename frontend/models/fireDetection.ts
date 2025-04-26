const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
const WS_BASE_URL = API_BASE_URL.replace('http', 'ws');

export interface Detection {
    bbox: [number, number, number, number];
    class: string;
    confidence: number;
}

export const detectFireInImage = async (file: File): Promise<Detection[]> => {
    console.log('Sending image for fire detection:', file.name);
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_BASE_URL}/api/fire-detection/detect-fire/image`, {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        console.error('Fire detection failed:', response.status, response.statusText);
        throw new Error('Failed to detect fire in image');
    }

    const data = await response.json();
    console.log('Fire detection response:', data);
    return data.detections;
};

export class FireDetectionStream {
    private ws: WebSocket | null = null;
    private videoElement: HTMLVideoElement;
    private canvasElement: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private frameCount: number = 0;

    constructor(videoElement: HTMLVideoElement) {
        this.videoElement = videoElement;
        this.canvasElement = document.createElement('canvas');
        const ctx = this.canvasElement.getContext('2d');
        if (!ctx) throw new Error('Failed to get canvas context');
        this.context = ctx;
    }

    async start() {
        console.log('Starting fire detection stream...');
        // Connect to WebSocket
        this.ws = new WebSocket(`${WS_BASE_URL}/api/fire-detection/ws/fire-detection`);

        // Set up canvas dimensions
        this.canvasElement.width = 320;
        this.canvasElement.height = 256;

        // Start sending frames when connection is established
        this.ws.onopen = () => {
            console.log('WebSocket connection established');
            this.sendFrame();
        };

        // Handle incoming detections
        this.ws.onmessage = (event) => {
            const detections: Detection[] = JSON.parse(event.data);
            this.frameCount++;
            if (this.frameCount % 30 === 0) { // Log every 30th frame to avoid console spam
                console.log('Received detections:', detections);
            }
            this.drawDetections(detections);
            // Send next frame
            this.sendFrame();
        };

        this.ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        this.ws.onclose = (event) => {
            console.log('WebSocket connection closed:', event.code, event.reason);
        };
    }

    private sendFrame() {
        if (!this.ws || this.ws.readyState !== WebSocket.OPEN) return;

        // Draw current video frame to canvas
        this.context.drawImage(this.videoElement, 0, 0, 320, 256);

        // Convert canvas to base64 and send
        const base64Image = this.canvasElement.toDataURL('image/jpeg', 0.75);
        if (this.ws) {
            this.ws.send(base64Image);
        }
    }

    private drawDetections(detections: Detection[]) {
        const ctx = this.videoElement.parentElement?.querySelector('canvas')?.getContext('2d');
        if (!ctx) return;

        // Clear previous drawings
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        // Draw new detections
        detections.forEach(det => {
            const [x1, y1, x2, y2] = det.bbox;

            // Draw bounding box
            ctx.strokeStyle = '#FF0000';
            ctx.lineWidth = 2;
            ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);

            // Draw label
            ctx.fillStyle = '#FF0000';
            ctx.font = '16px Arial';
            ctx.fillText(`${det.class} ${(det.confidence * 100).toFixed(1)}%`, x1, y1 - 5);
        });
    }

    stop() {
        if (this.ws) {
            this.ws.close();
            this.ws = null;
        }
    }
} 