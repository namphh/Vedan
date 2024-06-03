from ultralytics  import YOLO
import argparse
import cv2

# Run detection
if __name__ == "__main__":
    # Parse command line arguments
    parser = argparse.ArgumentParser(description='Image prediction')
    parser.add_argument('-p', '--path', type=str, help='Path to the image file', required=True)
    args = parser.parse_args()

    model = YOLO('best.pt')
    results = model(source = args.path, conf = 0.5, iou = 0.5)

    # Visualize output
    xyxys = []
    confidences = []
    class_ids = []
    img = cv2.imread(args.path)
    for result in results:
        boxes = result.boxes.cpu().numpy()
        xyxy = boxes.xyxy
        for x in xyxy:
            cv2.rectangle(img, (int(x[0]), int(x[1])), (int(x[2]), int(x[3])), (0,255,0))

    cv2.imwrite('result.jpg',img)
