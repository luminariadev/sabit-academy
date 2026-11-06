import cv2
import numpy as np

def process_footer_left():
    print("Processing footer left...")
    orig = cv2.imread('public/images/footer-left-original.png', cv2.IMREAD_UNCHANGED)
    H, W = orig.shape[:2]
    hsv = cv2.cvtColor(orig[:, :, :3], cv2.COLOR_BGR2HSV)
    alpha = orig[:, :, 3]

    # Detect the colored borders
    yellow_border = (cv2.inRange(hsv, (15, 100, 140), (35, 255, 255)) > 0) & (alpha > 100)
    pink_border = (cv2.inRange(hsv, (135, 60, 140), (180, 255, 255)) > 0) & (alpha > 100)
    
    # Outer black stroke / shadow: very dark pixels in original
    gray = cv2.cvtColor(orig[:, :, :3], cv2.COLOR_BGR2GRAY)
    black_border = (gray < 30) & (alpha > 100)
    
    # Entire sticker mask
    sticker_mask = alpha > 50

    # Load new student photos
    # Student 1: Hijab speaker with mic
    s1 = cv2.imread('public/images/student_speaker_hijab.jpg')
    # Student 2: Female hijab student on campus
    s2 = cv2.imread('public/images/student_female_hijab.jpg')

    # Create empty RGBA canvas matching original dimensions
    canvas = np.zeros((H, W, 4), dtype=np.uint8)

    # 1. Place Student 1 in Left cluster (bounding box x: 0 to 750, y: 0 to H)
    # Target box for student 1: x from 20 to 650, y from 100 to H
    box1_w = 680
    box1_h = H - 50
    s1_resized = cv2.resize(s1, (box1_w, box1_h), interpolation=cv2.INTER_LANCZOS4)
    # Mask of Left person: sticker_mask on left side, except pink
    mask_left = sticker_mask & (np.arange(W) < 780) & ~pink_border
    
    # Fill canvas with student 1 in left area
    y_start1 = H - box1_h
    x_start1 = 10
    for y in range(H):
        for x in range(min(W, 780)):
            if mask_left[y, x]:
                sy = y - y_start1
                sx = x - x_start1
                if 0 <= sy < box1_h and 0 <= sx < box1_w:
                    canvas[y, x, :3] = s1_resized[sy, sx]
                    canvas[y, x, 3] = 255

    # 2. Place Student 2 in Middle/Right cluster of footer-left (x from 650 to W)
    box2_w = W - 650
    box2_h = H - 80
    s2_resized = cv2.resize(s2, (box2_w, box2_h), interpolation=cv2.INTER_LANCZOS4)
    mask_right = sticker_mask & (np.arange(W) >= 700) & ~yellow_border

    y_start2 = H - box2_h
    x_start2 = 650
    for y in range(H):
        for x in range(700, W):
            if mask_right[y, x]:
                sy = y - y_start2
                sx = x - x_start2
                if 0 <= sy < box2_h and 0 <= sx < box2_w:
                    canvas[y, x, :3] = s2_resized[sy, sx]
                    canvas[y, x, 3] = 255

    # 3. Superimpose the crisp original Yellow, Pink, and Black outline frames on top!
    # Any pixel that was yellow, pink, or black in the original will be preserved exactly!
    border_pixels = yellow_border | pink_border | black_border
    canvas[border_pixels] = orig[border_pixels]
    
    # Ensure outer transparency matches original alpha exactly
    canvas[:, :, 3] = np.minimum(canvas[:, :, 3], orig[:, :, 3])

    cv2.imwrite('public/images/footer_left_custom.png', canvas)
    print("footer_left_custom.png created successfully!")

def process_footer_right():
    print("Processing footer right...")
    orig = cv2.imread('public/images/footer-right-original.png', cv2.IMREAD_UNCHANGED)
    H, W = orig.shape[:2]
    hsv = cv2.cvtColor(orig[:, :, :3], cv2.COLOR_BGR2HSV)
    alpha = orig[:, :, 3]

    # Detect borders:
    # Orange border
    orange_border = (cv2.inRange(hsv, (5, 120, 150), (18, 255, 255)) > 0) & (alpha > 100)
    # Yellow border
    yellow_border = (cv2.inRange(hsv, (18, 120, 150), (35, 255, 255)) > 0) & (alpha > 100)
    
    # Outer black stroke / shadow
    gray = cv2.cvtColor(orig[:, :, :3], cv2.COLOR_BGR2GRAY)
    black_border = (gray < 30) & (alpha > 100)

    sticker_mask = alpha > 50

    # Load new student photos
    # Student 3: Male coder in hoodie & glasses
    s3 = cv2.imread('public/images/student_male_coder.jpg')
    # Student 4: Student collaborative group / coder
    s4 = cv2.imread('public/images/student_coder.jpg')

    canvas = np.zeros((H, W, 4), dtype=np.uint8)

    # 1. Place Student 3 (Male coder) in Orange frame area (x from 0 to 1100)
    box3_w = 1100
    box3_h = H - 40
    s3_resized = cv2.resize(s3, (box3_w, box3_h), interpolation=cv2.INTER_LANCZOS4)
    mask_left = sticker_mask & (np.arange(W) < 1120) & ~yellow_border

    y_start3 = H - box3_h
    x_start3 = 50
    for y in range(H):
        for x in range(min(W, 1120)):
            if mask_left[y, x]:
                sy = y - y_start3
                sx = x - x_start3
                if 0 <= sy < box3_h and 0 <= sx < box3_w:
                    canvas[y, x, :3] = s3_resized[sy, sx]
                    canvas[y, x, 3] = 255

    # 2. Place Student 4 in Yellow frame area on far right (x from 1050 to W)
    box4_w = W - 1050
    box4_h = H - 60
    s4_resized = cv2.resize(s4, (box4_w, box4_h), interpolation=cv2.INTER_LANCZOS4)
    mask_right = sticker_mask & (np.arange(W) >= 1050) & ~orange_border

    y_start4 = H - box4_h
    x_start4 = 1050
    for y in range(H):
        for x in range(1050, W):
            if mask_right[y, x]:
                sy = y - y_start4
                sx = x - x_start4
                if 0 <= sy < box4_h and 0 <= sx < box4_w:
                    canvas[y, x, :3] = s4_resized[sy, sx]
                    canvas[y, x, 3] = 255

    # 3. Superimpose Orange, Yellow, and Black outline frames on top!
    border_pixels = orange_border | yellow_border | black_border
    canvas[border_pixels] = orig[border_pixels]
    
    canvas[:, :, 3] = np.minimum(canvas[:, :, 3], orig[:, :, 3])

    cv2.imwrite('public/images/footer_right_custom.png', canvas)
    print("footer_right_custom.png created successfully!")

process_footer_left()
process_footer_right()
print("ALL FOOTER STICKER COMPOSITES CREATED WITH INDONESIAN STUDENTS!")
