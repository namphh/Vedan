from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import numpy as np
from PIL import Image
import io
from ultralytics  import YOLO
import base64
from fastapi_cors import CORS

app = FastAPI()
CORS(app)

model = YOLO('best.pt')         

app = FastAPI()

class ImageInput(BaseModel):
    image: str

def decode_base64_image(base64_str: str) -> Image.Image:
    image_data = base64.b64decode(base64_str)
    image = Image.open(io.BytesIO(image_data))
    return image

def encode_image_to_base64(image: Image.Image) -> str:
    buffered = io.BytesIO()
    image.save(buffered, format="JPEG")
    img_str = base64.b64encode(buffered.getvalue()).decode("utf-8")
    return img_str

@app.post("/infer/binary")
async def infer_binary(input: ImageInput):
    # Decode the base64 input image
    image = decode_base64_image(input.image)
    
    # Make prediction
    prediction = model(image)
    number_bags = len(prediction[0].boxes) 
    score = round(float(np.mean(prediction[0].boxes.cpu().numpy().conf)), 3)
    
    # Encode the original image back to base64
    encoded_image = encode_image_to_base64(image)
    
    # Create response
    response = {
        "data": {
            "base64": encoded_image,
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
