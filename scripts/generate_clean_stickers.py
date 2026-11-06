import cv2
import numpy as np

def create_smooth_sticker(img_path, border_color_bgr, pad=50, dilate_px=25, stroke_px=7, shadow_offset=(14, 14)):
    img = cv2.imread(img_path)
    if img is None:
        raise ValueError(f"Could not open {img_path}")
    h, w = img.shape[:2]

    # GrabCut
    mask = np.zeros((h, w), np.uint8)
    bgdModel = np.zeros((1, 65), np.float64)
    fgdModel = np.zeros((1, 65), np.float64)

    # Tight rect around student
    rect = (int(w * 0.12), int(h * 0.08), int(w * 0.76), int(h * 0.90))
    cv2.grabCut(img, mask, rect, bgdModel, fgdModel, 6, cv2.GC_INIT_WITH_RECT)

    # Binary foreground mask
    raw_fg = np.where((mask == 2) | (mask == 0), 0, 255).astype('uint8')

    # Keep only the largest connected component (the person)
    num_labels, labels, stats, centroids = cv2.connectedComponentsWithStats(raw_fg)
    if num_labels > 1:
        largest_label = 1 + np.argmax(stats[1:, cv2.CC_STAT_AREA])
        fg_mask = np.where(labels == largest_label, 255, 0).astype('uint8')
    else:
        fg_mask = raw_fg

    # Smooth the contour to remove any pixel noise
    k_close = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (15, 15))
    fg_mask = cv2.morphologyEx(fg_mask, cv2.MORPH_CLOSE, k_close)
    fg_mask = cv2.GaussianBlur(fg_mask, (9, 9), 0)
    fg_mask = np.where(fg_mask > 128, 255, 0).astype('uint8')

    # Colorful border dilation
    k_border = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (dilate_px * 2 + 1, dilate_px * 2 + 1))
    border_mask = cv2.dilate(fg_mask, k_border)

    # Black stroke dilation
    k_stroke = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, ((dilate_px + stroke_px) * 2 + 1, (dilate_px + stroke_px) * 2 + 1))
    stroke_mask = cv2.dilate(fg_mask, k_stroke)

    # Output canvas with padding and shadow offset
    out_h = h + pad * 2 + abs(shadow_offset[1])
    out_w = w + pad * 2 + abs(shadow_offset[0])
    result = np.zeros((out_h, out_w, 4), dtype=np.uint8)

    oy = pad
    ox = pad

    # 1. Hard Drop Shadow (Black #121212)
    sy = oy + shadow_offset[1]
    sx = ox + shadow_offset[0]
    shadow_area = stroke_mask > 0
    result[sy:sy+h, sx:sx+w][shadow_area] = [18, 18, 18, 255]

    # 2. Outer Black Stroke (#121212)
    stroke_area = stroke_mask > 0
    result[oy:oy+h, ox:ox+w][stroke_area] = [18, 18, 18, 255]

    # 3. Colorful Inner Border
    color_area = border_mask > 0
    result[oy:oy+h, ox:ox+w][color_area] = [border_color_bgr[0], border_color_bgr[1], border_color_bgr[2], 255]

    # 4. Clean Student Photo inside fg_mask (NO old image artifacts!)
    person_area = fg_mask > 0
    person_bgr = img[person_area]
    person_rgba = np.column_stack((person_bgr, np.full((person_bgr.shape[0], 1), 255, dtype=np.uint8)))
    result[oy:oy+h, ox:ox+w][person_area] = person_rgba

    return result

print("Generating clean stickers from AI student photos...")

# BGR Colors:
# Yellow Mango: #F4B840 -> BGR (64, 184, 244)
# Pink: #F489A3 -> BGR (163, 137, 244)
# Orange: #F26522 -> BGR (34, 101, 242)

# Sticker 1: Hijab student speaker (Yellow outline)
s1 = create_smooth_sticker('public/images/student_speaker_hijab.jpg', (64, 184, 244))
cv2.imwrite('public/images/sticker_s1.png', s1)
print("Sticker 1 created!")

# Sticker 2: Hijab female student (Pink outline)
s2 = create_smooth_sticker('public/images/student_female_hijab.jpg', (163, 137, 244))
cv2.imwrite('public/images/sticker_s2.png', s2)
print("Sticker 2 created!")

# Sticker 3: Male coder student (Orange outline)
s3 = create_smooth_sticker('public/images/student_male_coder.jpg', (34, 101, 242))
cv2.imwrite('public/images/sticker_s3.png', s3)
print("Sticker 3 created!")

# Sticker 4: Student coder (Yellow outline)
s4 = create_smooth_sticker('public/images/student_coder.jpg', (64, 184, 244))
cv2.imwrite('public/images/sticker_s4.png', s4)
print("Sticker 4 created!")

print("All 4 clean stickers generated successfully!")
