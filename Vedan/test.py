import requests
import base64

# Define the API endpoint
API_URL = "http://localhost:8000/infer/binary"

# Path to the image file you want to upload
IMAGE_PATH = "z5381705001417_aba6aa050eab2b2474b74bf68c344e57.jpg"

# Read the image file as binary data
with open(IMAGE_PATH, "rb") as image_file:
    image_data = image_file.read()

# Send the POST request to the API
response = requests.post(API_URL, files=image_data)

# Check if the request was successful
if response.status_code == 200:
    # Print the response content
    print(response.json())
else:
    # Print error message
    print("Error:", response.status_code)
