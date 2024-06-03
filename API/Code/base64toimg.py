import base64
import cv2
import numpy as np

def base64_to_image(base64_string):
    # Convert string Base64 to binary
    image_data = base64.b64decode(base64_string)
    # Convert binary to NumPy array
    np_arr = np.frombuffer(image_data, np.uint8)
    # Convert NumPy array to image
    img = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)
    
    return img

# Input base64 string image
base64_string = '"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD..."'

img = base64_to_image(base64_string)

cv2.imread('img.jpg',img)