# Vedan
## Installation
```
pip install -r requirements.txt
```

## Validation
[`best.pt`](https://github.com/namphh/Vedan/blob/main/best.pt) 
https://drive.google.com/file/d/1tt1fIfoHfyUOsB0gSBluMRrYIPNp1oEy/view?usp=sharing
```
model = YOLO('best.pt')
```

## Prediction
```
python Code/main.py -p PATH-TO-IMAGE
```

## Run API
```
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

## Output
```
xyxys = []
confidences = []
class_ids = []
#img = cv2.imread(img)
for result in results:
  boxes = result.boxes.cpu().numpy()
  xyxy = boxes.xyxy
  for x in xyxy:
    cv2.rectangle(img, (int(x[0]), int(x[1])), (int(x[2]), int(x[3])), (0,255,0))

output = image_to_base64(img)
```

## Result
<p align="center">
  <img src="https://github.com/namphh/Vedan/blob/master/API/result.jpg">
