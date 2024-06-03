import base64

def image_to_base64(image_path):
    # Đọc ảnh dưới dạng nhị phân
    with open(image_path, "rb") as image_file:
        binary_image_data = image_file.read()
    
    # Mã hóa ảnh sang Base64
    base64_encoded_data = base64.b64encode(binary_image_data)
    
    # Chuyển đổi Base64 byte sang chuỗi
    base64_string = base64_encoded_data.decode('utf-8')
    
    return base64_string

# Đường dẫn tới ảnh
image_path = "input.jpg"
base64_string_ = image_to_base64(image_path)

#print(len(base64_string_))
