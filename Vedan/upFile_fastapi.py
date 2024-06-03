from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import numpy as np
from PIL import Image
import io
import cv2
from ultralytics import YOLO
import base64
from fastapi.middleware.cors import CORSMiddleware

model = YOLO('best_1.pt')

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this as needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def read_imagefile(file) -> Image.Image:
    image = Image.open(io.BytesIO(file))
    return image

def encode_image_to_base64(image: Image.Image) -> str:
    buffered = io.BytesIO()
    image.save(buffered, format="JPEG")
    img_str = base64.b64encode(buffered.getvalue()).decode("utf-8")
    return img_str

def pil_to_cv2(image: Image.Image) -> np.ndarray:
    return cv2.cvtColor(np.array(image), cv2.COLOR_RGB2BGR)

def cv2_to_pil(image: np.ndarray) -> Image.Image:
    return Image.fromarray(cv2.cvtColor(image, cv2.COLOR_BGR2RGB))

@app.post("/infer/binary")
async def infer_binary(image: UploadFile = File(...)):
    image_data = await image.read()
    image = read_imagefile(image_data)
    
    # Perform prediction
    prediction = model(source = image, conf = 0.5, iou = 0.5)
    number_bags = len(prediction[0].boxes)
    score = round(float(np.mean([box.conf for box in prediction[0].boxes])) * 100, 2)
    
    # Convert PIL to OpenCV format
    img_cv2 = pil_to_cv2(image)
    
    # Draw bounding boxes on the image
    for result in prediction:
    	boxes = result.boxes.cpu().numpy()
    	xyxy = boxes.xyxy
    	for box in xyxy:
        	center_x = int((box[0] + box[2]) / 2)
        	center_y = int((box[1] + box[3]) / 2)
        	cv2.circle(img_cv2, (center_x, center_y), radius=2, color=(0, 255, 0), thickness=18)
    cv2.putText(img_cv2, 'Count:'+str(len(xyxy)), (100,120), cv2.FONT_HERSHEY_SIMPLEX, 3, (0, 0, 255), 5)

    cv2.imwrite('result.jpg',img_cv2)
    # Convert OpenCV back to PIL format
    img_pil_with_boxes = cv2_to_pil(img_cv2)
    
    # Encode images to base64
    encoded_image = encode_image_to_base64(image)
    encoded_image_results = encode_image_to_base64(img_pil_with_boxes)
    
    response = {
        "data": {
            "base64": encoded_image,
            "base64_r": encoded_image_results,
            "result": {
                "number_bags": number_bags,
                "score": score
            }
        },
        "msg": "success",
        "code": 200
    }
    return JSONResponse(content=response)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

