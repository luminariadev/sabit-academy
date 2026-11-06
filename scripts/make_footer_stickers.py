import cv2
import numpy as np
import os

def create_sticker_cutout(img_path, border_color_bgr, pad=40, dilate_inner=22, stroke_width=6, shadow_offset=(12, 12)):
    img = cv2.imread(img_path)
    if img is None:
        raise ValueError(f"Cannot load image {img_path}")
    
    h, w = img.shape[:2]
    
    # Run GrabCut segmentation
    mask = np.zeros((h, w), np.uint8)
    bgdModel = np.zeros((1, 65), np.float64)
    fgdModel = np.zeros((1, 65), np.float64)
    
    # Rect covering the person (margin on edges)
    rect = (int(w * 0.08), int(h * 0.05), int(w * 0.84), int(h * 0.95))
    cv2.grabCut(img, mask, rect, bgdModel, fgdModel, 6, cv2.GC_INIT_WITH_RECT)
    
    # Binary foreground mask: 1 for foreground, 0 for background
    fg_mask = np.where((mask == 2) | (mask == 0), 0, 1).astype('uint8')
    
    # Smooth the mask to remove jagged pixel artifacts
    kernel_smooth = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (7, 7))
    fg_mask = cv2.morphologyEx(fg_mask, cv2.MORPH_CLOSE, kernel_smooth)
    fg_mask = cv2.GaussianBlur(fg_mask * 255, (5, 5), 0)
    fg_mask = np.where(fg_mask > 120, 255, 0).astype('uint8')
    
    # Create kernel for colorful border dilation
    kernel_border = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (dilate_inner * 2 + 1, dilate_inner * 2 + 1))
    colored_border_mask = cv2.dilate(fg_mask, kernel_border)
    
    # Create kernel for outer black stroke
    kernel_stroke = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, ((dilate_inner + stroke_width) * 2 + 1, (dilate_inner + stroke_width) * 2 + 1))
    black_stroke_mask = cv2.dilate(fg_mask, kernel_stroke)
    
    # Canvas size with padding and shadow offset
    canvas_h = h + pad * 2 + abs(shadow_offset[1])
    canvas_w = w + pad * 2 + abs(shadow_offset[0])
    
    # Output RGBA image
    result = np.zeros((canvas_h, canvas_w, 4), dtype=np.uint8)
    
    ox = pad
    oy = pad
    
    # 1. Draw Hard Black Drop Shadow (offset)
    sx = ox + shadow_offset[0]
    sy = oy + shadow_offset[1]
    shadow_area = black_stroke_mask > 0
    result[sy:sy+h, sx:sx+w][shadow_area] = [18, 18, 18, 255] # Black #121212
    
    # 2. Draw Outer Black Stroke
    stroke_area = black_stroke_mask > 0
    result[oy:oy+h, ox:ox+w][stroke_area] = [18, 18, 18, 255]
    
    # 3. Draw Colorful Inner Border (Yellow / Pink / Orange)
    color_area = colored_border_mask > 0
    result[oy:oy+h, ox:ox+w][color_area] = [border_color_bgr[0], border_color_bgr[1], border_color_bgr[2], 255]
    
    # 4. Draw Person Foreground
    person_area = fg_mask > 0
    person_bgr = img[person_area]
    person_rgba = np.column_stack((person_bgr, np.full((person_bgr.shape[0], 1), 255, dtype=np.uint8)))
    result[oy:oy+h, ox:ox+w][person_area] = person_rgba
    
    return result

print("Defining footer composition...")

# Colors matching Flowfest Neo-brutalist theme:
# Mango / Yellow: #F4B840 -> BGR: (64, 184, 244)
# Pink: #F3729C -> BGR: (156, 114, 243)
# Orange: #F26522 -> BGR: (34, 101, 242)

# Create Sticker for Left Person 1: Hijab student (Yellow outline)
left1 = create_sticker_cutout('public/images/student_female_hijab.jpg', border_color_bgr=(64, 184, 244))
cv2.imwrite('public/images/left1_sticker.png', left1)
print("left1_sticker.png done")

# Create Sticker for Left Person 2: Hijab Speaker student (Pink outline)
left2 = create_sticker_cutout('public/images/student_speaker_hijab.jpg', border_color_bgr=(156, 114, 243))
cv2.imwrite('public/images/left2_sticker.png', left2)
print("left2_sticker.png done")

# Create Sticker for Right Person: Male coder student (Orange outline)
right1 = create_sticker_cutout('public/images/student_male_coder.jpg', border_color_bgr=(34, 101, 242))
cv2.imwrite('public/images/right1_sticker.png', right1)
print("right1_sticker.png done")

print("All individual stickers created successfully!")
