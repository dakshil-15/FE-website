"""Render First Economy Growth System hero asset to match homepage mockup."""
from PIL import Image, ImageDraw, ImageFont
import math
import os

SIZE = 2200  # extra room so side labels never clip
img = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
draw = ImageDraw.Draw(img)
cx = cy = SIZE // 2

INK = (10, 10, 10, 255)
RED = (224, 19, 42, 255)
RING = (205, 203, 197, 255)
TICK = (212, 210, 204, 255)
PAPER = (255, 255, 255, 255)
MIST = (243, 242, 239)  # --color-mist

candidates = [
    r"C:\Windows\Fonts\arialbd.ttf",
    r"C:\Windows\Fonts\segoeuib.ttf",
    r"C:\Windows\Fonts\arial.ttf",
]
font_path = next((p for p in candidates if os.path.exists(p)), None)
font_hub = ImageFont.truetype(font_path, 52) if font_path else ImageFont.load_default()
font_label = ImageFont.truetype(font_path, 38) if font_path else ImageFont.load_default()

HUB_R = 160
DIAL_R = 700
TICK_INNER = HUB_R + 16
TICK_OUTER = DIAL_R - 6
SPOKE_INNER = HUB_R
SPOKE_OUTER = DIAL_R - 16
DOT_R = 14

for i in range(1, 20):
    r = int(HUB_R + 24 + i * ((DIAL_R - HUB_R - 24) / 19))
    draw.ellipse([cx - r, cy - r, cx + r, cy + r], outline=RING, width=1)

draw.ellipse([cx - DIAL_R, cy - DIAL_R, cx + DIAL_R, cy + DIAL_R], outline=RING, width=2)

tick_count = 144
for i in range(tick_count):
    deg = (360 / tick_count) * i - 90
    near_axis = False
    for axis in (0, 90, 180, 270):
        d = abs(((deg + 90) % 360) - axis)
        d = min(d, 360 - d)
        if d < 1.8:
            near_axis = True
            break
    if near_axis:
        continue
    rad = math.radians(deg)
    outer = TICK_OUTER if i % 3 else TICK_OUTER - 32
    x1 = cx + TICK_INNER * math.cos(rad)
    y1 = cy + TICK_INNER * math.sin(rad)
    x2 = cx + outer * math.cos(rad)
    y2 = cy + outer * math.sin(rad)
    draw.line([(x1, y1), (x2, y2)], fill=TICK, width=1)

nodes = [
    ("MEDIA", -90, "middle", 0, -42),
    ("TECHNOLOGY", 0, "start", 22, 0),
    ("AI", 90, "middle", 0, 42),
    ("CREATIVE", 180, "end", -22, 0),
]

for label, angle, anchor, ox, oy in nodes:
    rad = math.radians(angle)
    x1 = cx + SPOKE_INNER * math.cos(rad)
    y1 = cy + SPOKE_INNER * math.sin(rad)
    x2 = cx + SPOKE_OUTER * math.cos(rad)
    y2 = cy + SPOKE_OUTER * math.sin(rad)
    draw.line([(x1, y1), (x2, y2)], fill=INK, width=3)
    draw.ellipse([x2 - DOT_R, y2 - DOT_R, x2 + DOT_R, y2 + DOT_R], fill=RED)

draw.ellipse([cx - HUB_R, cy - HUB_R, cx + HUB_R, cy + HUB_R], fill=INK)


def draw_centered(text, y, font, fill):
    bbox = draw.textbbox((0, 0), text, font=font)
    w = bbox[2] - bbox[0]
    draw.text((cx - w / 2, y), text, font=font, fill=fill)


draw_centered("GROWTH", cy - 50, font_hub, PAPER)
draw_centered("SYSTEM", cy + 8, font_hub, PAPER)

for label, angle, anchor, ox, oy in nodes:
    rad = math.radians(angle)
    lx = cx + (SPOKE_OUTER + 4) * math.cos(rad) + ox
    ly = cy + (SPOKE_OUTER + 4) * math.sin(rad) + oy
    bbox = draw.textbbox((0, 0), label, font=font_label)
    w = bbox[2] - bbox[0]
    h = bbox[3] - bbox[1]
    if anchor == "middle":
        x = lx - w / 2
    elif anchor == "end":
        x = lx - w
    else:
        x = lx
    draw.text((x, ly - h / 2), label, font=font_label, fill=INK)

# Fixed square canvas centered on dial — generous padding so side labels fit
pad = 160
left = cx - DIAL_R - pad
top = cy - DIAL_R - pad
right = cx + DIAL_R + pad
bottom = cy + DIAL_R + pad
# Expand if labels extend further
content = img.getbbox()
left = min(left, content[0] - 24)
top = min(top, content[1] - 24)
right = max(right, content[2] + 24)
bottom = max(bottom, content[3] + 24)
side = max(right - left, bottom - top)
cxb = (left + right) / 2
cyb = (top + bottom) / 2
left = int(cxb - side / 2)
top = int(cyb - side / 2)
right = int(left + side)
bottom = int(top + side)
img = img.crop((max(0, left), max(0, top), min(SIZE, right), min(SIZE, bottom)))

final = Image.new("RGB", img.size, MIST)
final.paste(img, mask=img.split()[-1])
final = final.resize((1600, 1600), Image.Resampling.LANCZOS)

out = r"F:\Next Js Project\FE-website\public\images\hero\growth-system.png"
os.makedirs(os.path.dirname(out), exist_ok=True)
final.save(out, "PNG", optimize=True)
print("saved", out, final.size)
