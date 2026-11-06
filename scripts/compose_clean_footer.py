import cv2
import numpy as np

# Load the 4 clean generated stickers
s1 = cv2.imread('public/images/sticker_s1.png', cv2.IMREAD_UNCHANGED) # Yellow hijab speaker
s2 = cv2.imread('public/images/sticker_s2.png', cv2.IMREAD_UNCHANGED) # Pink hijab student
s3 = cv2.imread('public/images/sticker_s3.png', cv2.IMREAD_UNCHANGED) # Orange male coder
s4 = cv2.imread('public/images/sticker_s4.png', cv2.IMREAD_UNCHANGED) # Yellow coder

print("s1 shape:", s1.shape)
print("s2 shape:", s2.shape)
print("s3 shape:", s3.shape)
print("s4 shape:", s4.shape)

# Helper function to overlay an RGBA sticker onto an RGBA canvas
def overlay_rgba(canvas, sticker, x_offset, y_offset):
    sh, sw = sticker.shape[:2]
    ch, cw = canvas.shape[:2]

    # Clip coordinates to canvas
    x1 = max(0, x_offset)
    y1 = max(0, y_offset)
    x2 = min(cw, x_offset + sw)
    y2 = min(ch, y_offset + sh)

    sx1 = max(0, -x_offset)
    sy1 = max(0, -y_offset)
    sx2 = sx1 + (x2 - x1)
    sy2 = sy1 + (y2 - y1)

    if x2 <= x1 or y2 <= y1:
        return

    sub_sticker = sticker[sy1:sy2, sx1:sx2]
    alpha_s = sub_sticker[:, :, 3] / 255.0
    alpha_c = canvas[y1:y2, x1:x2, 3] / 255.0

    # Alpha blending
    for c in range(3):
        canvas[y1:y2, x1:x2, c] = (
            alpha_s * sub_sticker[:, :, c] + (1 - alpha_s) * alpha_c * canvas[y1:y2, x1:x2, c]
        ) / np.maximum(1e-5, alpha_s + alpha_c * (1 - alpha_s))

    canvas[y1:y2, x1:x2, 3] = np.clip((alpha_s + alpha_c * (1 - alpha_s)) * 255, 0, 255).astype(np.uint8)

# === 1. COMPOSITE FOOTER LEFT (1765 x 1101) ===
H_L, W_L = 1101, 1765
canvas_left = np.zeros((H_L, W_L, 4), dtype=np.uint8)

# Resize s1 (Yellow border, far left) - height ~1020
scale1 = 1020 / s1.shape[0]
s1_r = cv2.resize(s1, (int(s1.shape[1] * scale1), 1020), interpolation=cv2.INTER_LANCZOS4)

# Resize s2 (Pink border, middle left) - height ~950
scale2 = 950 / s2.shape[0]
s2_r = cv2.resize(s2, (int(s2.shape[1] * scale2), 950), interpolation=cv2.INTER_LANCZOS4)

# Place s1 on far left, top near y=40
overlay_rgba(canvas_left, s1_r, x_offset=30, y_offset=40)

# Place s2 on middle left, slightly overlapping, top near y=120
overlay_rgba(canvas_left, s2_r, x_offset=750, y_offset=120)

cv2.imwrite('public/images/footer_left_custom.png', canvas_left)
print("footer_left_custom.png composed successfully!")

# === 2. COMPOSITE FOOTER RIGHT (1819 x 963) ===
H_R, W_R = 963, 1819
canvas_right = np.zeros((H_R, W_R, 4), dtype=np.uint8)

# Resize s3 (Orange border, middle right) - height ~920
scale3 = 920 / s3.shape[0]
s3_r = cv2.resize(s3, (int(s3.shape[1] * scale3), 920), interpolation=cv2.INTER_LANCZOS4)

# Resize s4 (Yellow border, far right) - height ~880
scale4 = 880 / s4.shape[0]
s4_r = cv2.resize(s4, (int(s4.shape[1] * scale4), 880), interpolation=cv2.INTER_LANCZOS4)

# Place s3 on middle right, top near y=30
overlay_rgba(canvas_right, s3_r, x_offset=120, y_offset=30)

# Place s4 on far right, top near y=70
overlay_rgba(canvas_right, s4_r, x_offset=950, y_offset=70)

cv2.imwrite('public/images/footer_right_custom.png', canvas_right)
print("footer_right_custom.png composed successfully!")
