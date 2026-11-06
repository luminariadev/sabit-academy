import cv2
import numpy as np

# Load individual stickers
left1 = cv2.imread('public/images/left1_sticker.png', cv2.IMREAD_UNCHANGED)
left2 = cv2.imread('public/images/left2_sticker.png', cv2.IMREAD_UNCHANGED)
right1 = cv2.imread('public/images/right1_sticker.png', cv2.IMREAD_UNCHANGED)

print("left1 shape:", left1.shape)
print("left2 shape:", left2.shape)
print("right1 shape:", right1.shape)

# Create Composite for FOOTER LEFT (width: 1000, height: 624 - 1.6:1 ratio)
W_left = 1000
H_left = 624
comp_left = np.zeros((H_left, W_left, 4), dtype=np.uint8)

# Resize left2 (speaker hijab student in background) to height ~520
scale2 = 520 / left2.shape[0]
l2_resized = cv2.resize(left2, (int(left2.shape[1] * scale2), 520), interpolation=cv2.INTER_AREA)

# Resize left1 (hijab student in foreground) to height ~580
scale1 = 580 / left1.shape[0]
l1_resized = cv2.resize(left1, (int(left1.shape[1] * scale1), 580), interpolation=cv2.INTER_AREA)

# Place left2 on far left (x = 20, y = bottom aligned)
y2 = H_left - l2_resized.shape[0]
x2 = 20
alpha2 = l2_resized[:, :, 3] / 255.0
for c in range(3):
    comp_left[y2:H_left, x2:x2+l2_resized.shape[1], c] = (
        alpha2 * l2_resized[:, :, c] + (1 - alpha2) * comp_left[y2:H_left, x2:x2+l2_resized.shape[1], c]
    )
comp_left[y2:H_left, x2:x2+l2_resized.shape[1], 3] = np.maximum(
    comp_left[y2:H_left, x2:x2+l2_resized.shape[1], 3], l2_resized[:, :, 3]
)

# Place left1 slightly to the right, overlapping (x = 350, y = bottom aligned)
y1 = H_left - l1_resized.shape[0]
x1 = 380
# Ensure bounds
w1 = min(l1_resized.shape[1], W_left - x1)
alpha1 = l1_resized[:, :w1, 3] / 255.0
for c in range(3):
    comp_left[y1:H_left, x1:x1+w1, c] = (
        alpha1 * l1_resized[:, :w1, c] + (1 - alpha1) * comp_left[y1:H_left, x1:x1+w1, c]
    )
comp_left[y1:H_left, x1:x1+w1, 3] = np.maximum(
    comp_left[y1:H_left, x1:x1+w1, 3], l1_resized[:, :w1, 3]
)

cv2.imwrite('public/images/footer_left_custom.png', comp_left)
print("footer_left_custom.png created!")

# Create Composite for FOOTER RIGHT (width: 1000, height: 530 - 1.88:1 ratio)
W_right = 1000
H_right = 530
comp_right = np.zeros((H_right, W_right, 4), dtype=np.uint8)

# Resize right1 to height ~500
scale_r = 500 / right1.shape[0]
r1_resized = cv2.resize(right1, (int(right1.shape[1] * scale_r), 500), interpolation=cv2.INTER_AREA)

# Place right1 on the right side
yr = H_right - r1_resized.shape[0]
xr = 100
wr = min(r1_resized.shape[1], W_right - xr)
alpha_r = r1_resized[:, :wr, 3] / 255.0
for c in range(3):
    comp_right[yr:H_right, xr:xr+wr, c] = (
        alpha_r * r1_resized[:, :wr, c] + (1 - alpha_r) * comp_right[yr:H_right, xr:xr+wr, c]
    )
comp_right[yr:H_right, xr:xr+wr, 3] = np.maximum(
    comp_right[yr:H_right, xr:xr+wr, 3], r1_resized[:, :wr, 3]
)

cv2.imwrite('public/images/footer_right_custom.png', comp_right)
print("footer_right_custom.png created!")
