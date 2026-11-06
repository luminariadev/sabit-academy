import cv2
import numpy as np

def make_clean_sticker(crop_path, mask_path, border_bgr, pad=45, dilate_px=22, stroke_px=6, shadow_offset=(12, 12)):
    img = cv2.imread(crop_path)
    mask = cv2.imread(mask_path, cv2.IMREAD_GRAYSCALE)
    h, w = img.shape[:2]

    # Smooth the mask
    k_smooth = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (11, 11))
    mask = cv2.morphologyEx(mask, cv2.MORPH_CLOSE, k_smooth)
    mask = cv2.GaussianBlur(mask, (7, 7), 0)
    mask = np.where(mask > 120, 255, 0).astype('uint8')

    # Keep only the largest connected component
    n, labels, stats, _ = cv2.connectedComponentsWithStats(mask)
    if n > 1:
        largest = 1 + np.argmax(stats[1:, cv2.CC_STAT_AREA])
        mask = np.where(labels == largest, 255, 0).astype('uint8')

    # 1. Border mask
    k_border = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (dilate_px * 2 + 1, dilate_px * 2 + 1))
    border_mask = cv2.dilate(mask, k_border)

    # 2. Black stroke mask
    k_stroke = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, ((dilate_px + stroke_px) * 2 + 1, (dilate_px + stroke_px) * 2 + 1))
    stroke_mask = cv2.dilate(mask, k_stroke)

    out_h = h + pad * 2 + abs(shadow_offset[1])
    out_w = w + pad * 2 + abs(shadow_offset[0])
    sticker = np.zeros((out_h, out_w, 4), dtype=np.uint8)

    oy = pad
    ox = pad

    # Hard drop shadow
    sy = oy + shadow_offset[1]
    sx = ox + shadow_offset[0]
    shadow_area = stroke_mask > 0
    sticker[sy:sy+h, sx:sx+w][shadow_area] = [18, 18, 18, 255]

    # Outer black stroke
    stroke_area = stroke_mask > 0
    sticker[oy:oy+h, ox:ox+w][stroke_area] = [18, 18, 18, 255]

    # Colorful border
    color_area = border_mask > 0
    sticker[oy:oy+h, ox:ox+w][color_area] = [border_bgr[0], border_bgr[1], border_bgr[2], 255]

    # Clean student photo inside mask
    person_area = mask > 0
    person_bgr = img[person_area]
    person_rgba = np.column_stack((person_bgr, np.full((person_bgr.shape[0], 1), 255, dtype=np.uint8)))
    sticker[oy:oy+h, ox:ox+w][person_area] = person_rgba

    return sticker

# Helper to overlay an RGBA sticker onto an RGBA canvas
def overlay(canvas, sticker, x, y):
    sh, sw = sticker.shape[:2]
    ch, cw = canvas.shape[:2]

    x1 = max(0, x)
    y1 = max(0, y)
    x2 = min(cw, x + sw)
    y2 = min(ch, y + sh)

    sx1 = max(0, -x)
    sy1 = max(0, -y)
    sx2 = sx1 + (x2 - x1)
    sy2 = sy1 + (y2 - y1)

    if x2 <= x1 or y2 <= y1:
        return

    sub = sticker[sy1:sy2, sx1:sx2]
    a_s = sub[:, :, 3] / 255.0
    a_c = canvas[y1:y2, x1:x2, 3] / 255.0

    for c in range(3):
        canvas[y1:y2, x1:x2, c] = (
            a_s * sub[:, :, c] + (1 - a_s) * a_c * canvas[y1:y2, x1:x2, c]
        ) / np.maximum(1e-5, a_s + a_c * (1 - a_s))

    canvas[y1:y2, x1:x2, 3] = np.clip((a_s + a_c * (1 - a_s)) * 255, 0, 255).astype(np.uint8)

print("1. Creating individual clean stickers...")
# BGR Colors:
# Yellow Mango: #F4B840 -> (64, 184, 244)
# Pink Pastel: #F489A3 -> (163, 137, 244)
# Orange Vibrant: #F26522 -> (34, 101, 242)

stk_spk_yellow = make_clean_sticker('public/images/test_crop_spk.jpg', 'public/images/mask_spk.png', (64, 184, 244))
stk_fem_pink = make_clean_sticker('public/images/test_crop_fem.jpg', 'public/images/mask_fem.png', (163, 137, 244))
stk_male_orange = make_clean_sticker('public/images/test_crop_male.jpg', 'public/images/mask_male.png', (34, 101, 242))
stk_spk_pink = make_clean_sticker('public/images/test_crop_spk.jpg', 'public/images/mask_spk.png', (163, 137, 244))

print("2. Composing FOOTER LEFT (1765 x 1101)...")
W_L, H_L = 1765, 1101
footer_left = np.zeros((H_L, W_L, 4), dtype=np.uint8)

# Student 1: Speaker with mic (Yellow outline), on the far left
# Target height ~1020px
scale_l1 = 1020 / stk_spk_yellow.shape[0]
s_l1 = cv2.resize(stk_spk_yellow, (int(stk_spk_yellow.shape[1] * scale_l1), 1020), interpolation=cv2.INTER_LANCZOS4)
overlay(footer_left, s_l1, x=20, y=50)

# Student 2: Female hijab student (Pink outline), hugging the right edge beside the sun!
# Target height ~980px, width scaled to reach x=1750
scale_l2 = 980 / stk_fem_pink.shape[0]
s_l2 = cv2.resize(stk_fem_pink, (int(stk_fem_pink.shape[1] * scale_l2), 980), interpolation=cv2.INTER_LANCZOS4)
# Position so its right edge reaches ~1750
pos_x_l2 = W_L - s_l2.shape[1] - 10
overlay(footer_left, s_l2, x=pos_x_l2, y=100)

cv2.imwrite('public/images/footer_left_custom.png', footer_left)
print("footer_left_custom.png written!")

print("3. Composing FOOTER RIGHT (1819 x 963)...")
W_R, H_R = 1819, 963
footer_right = np.zeros((H_R, W_R, 4), dtype=np.uint8)

# Student 3: Male coder (Orange outline), hugging the left edge beside the sun!
# Target height ~920px
scale_r1 = 920 / stk_male_orange.shape[0]
s_r1 = cv2.resize(stk_male_orange, (int(stk_male_orange.shape[1] * scale_r1), 920), interpolation=cv2.INTER_LANCZOS4)
# Position starting right at x=10 beside the sun
overlay(footer_right, s_r1, x=10, y=30)

# Student 4: Female student speaker (Pink/Yellow outline), on the far right
# Target height ~880px
scale_r2 = 880 / stk_spk_pink.shape[0]
s_r2 = cv2.resize(stk_spk_pink, (int(stk_spk_pink.shape[1] * scale_r2), 880), interpolation=cv2.INTER_LANCZOS4)
pos_x_r2 = W_R - s_r2.shape[1] - 20
overlay(footer_right, s_r2, x=pos_x_r2, y=60)

cv2.imwrite('public/images/footer_right_custom.png', footer_right)
print("footer_right_custom.png written!")
print("ALL DONE PERFECTLY!")
