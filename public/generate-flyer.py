from PIL import Image, ImageDraw, ImageFont, ImageFilter
import math
import os

FONTS = r"C:\Users\JB\AppData\Roaming\Claude\local-agent-mode-sessions\skills-plugin\b68ee69a-56c6-4223-b575-7336ab5ce6b6\6bbfdafa-0e1c-4f6d-aa44-d0ed964ef446\skills\canvas-design\canvas-fonts"

W, H = 1080, 1920
BG    = (6, 6, 8)
GOLD  = (212, 168, 83)
GOLDD = (160, 120, 50)
WHITE = (255, 255, 255)
GREY  = (140, 130, 115)
FAINT = (30, 28, 24)

img = Image.new("RGB", (W, H), BG)
draw = ImageDraw.Draw(img)

# ── FONTS ────────────────────────────────────────────────────────────────────
f_bold   = ImageFont.truetype(os.path.join(FONTS, "BigShoulders-Bold.ttf"),   72)
f_head   = ImageFont.truetype(os.path.join(FONTS, "BigShoulders-Bold.ttf"),   96)
f_logo   = ImageFont.truetype(os.path.join(FONTS, "BigShoulders-Bold.ttf"),  120)
f_med    = ImageFont.truetype(os.path.join(FONTS, "InstrumentSans-Bold.ttf"),  44)
f_small  = ImageFont.truetype(os.path.join(FONTS, "InstrumentSans-Regular.ttf"), 32)
f_tiny   = ImageFont.truetype(os.path.join(FONTS, "InstrumentSans-Regular.ttf"), 24)
f_url    = ImageFont.truetype(os.path.join(FONTS, "BigShoulders-Bold.ttf"),   68)
f_sub    = ImageFont.truetype(os.path.join(FONTS, "Outfit-Regular.ttf"),      30)

# ── AMBIENT GLOW (simule eclairage dramatique) ───────────────────────────────
glow = Image.new("RGB", (W, H), (0, 0, 0))
gd   = ImageDraw.Draw(glow)

# Glow central doré simulant l'écran laptop
for r in range(500, 0, -8):
    alpha = int(28 * (1 - r / 500))
    c = (
        min(255, BG[0] + int((GOLD[0] - BG[0]) * alpha / 28)),
        min(255, BG[1] + int((GOLD[1] - BG[1]) * alpha / 28)),
        min(255, BG[2] + int((GOLD[2] - BG[2]) * alpha / 28)),
    )
    gd.ellipse([W//2 - r, 650 - r//2, W//2 + r, 650 + r//2], fill=c)

# Glow latéral gauche (source lumineuse)
for r in range(320, 0, -6):
    alpha = int(20 * (1 - r / 320))
    c = (
        min(255, BG[0] + int((200 - BG[0]) * alpha / 20)),
        min(255, BG[1] + int((150 - BG[1]) * alpha / 20)),
        min(255, BG[2] + int((60  - BG[2]) * alpha / 20)),
    )
    gd.ellipse([80 - r, 680 - r, 80 + r, 680 + r], fill=c)

img = Image.blend(img, glow, 0.85)
draw = ImageDraw.Draw(img)

# ── LAPTOP ILLUSTRATION ──────────────────────────────────────────────────────
# Base laptop (trapézoïde)
base_pts = [(260, 1060), (820, 1060), (870, 1110), (210, 1110)]
draw.polygon(base_pts, fill=(18, 16, 14))
draw.polygon(base_pts, outline=(40, 35, 25), width=1)

# Charnière
draw.rectangle([490, 1055, 590, 1065], fill=(25, 22, 18))

# Écran - fond
screen_margin = 60
sx1, sy1, sx2, sy2 = 210, 270, 870, 1055
draw.rounded_rectangle([sx1, sy1, sx2, sy2], radius=18, fill=(10, 8, 6))
draw.rounded_rectangle([sx1, sy1, sx2, sy2], radius=18, outline=(35, 30, 20), width=2)

# Écran - intérieur (site web simulé)
px1, py1, px2, py2 = sx1+16, sy1+16, sx2-16, sy2-16
draw.rounded_rectangle([px1, py1, px2, py2], radius=8, fill=(8, 6, 5))

# Barre nav simulée
draw.rectangle([px1, py1, px2, py1+36], fill=(14, 12, 10))
for i, cx in enumerate([px1+18, px1+34, px1+50]):
    colors = [(180,70,60),(200,160,50),(70,160,70)]
    draw.ellipse([cx-5, py1+13, cx+5, py1+23], fill=colors[i])

# Hero section du site simulé
draw.rectangle([px1, py1+36, px2, py1+280], fill=(12, 9, 6))

# Lueur dorée dans le hero
hero_glow = Image.new("RGB", (px2-px1, 244), (12,9,6))
hg_d = ImageDraw.Draw(hero_glow)
for r in range(120,0,-4):
    a = int(60 * (1-r/120))
    hc = (min(255, 12+int((GOLD[0]-12)*a/60)), min(255,9+int((GOLD[1]-9)*a/60)), min(255,6+int((GOLD[2]-6)*a/60)))
    hg_d.ellipse([(px2-px1)//2-r, 122-r//2, (px2-px1)//2+r, 122+r//2], fill=hc)
img.paste(hero_glow, (px1, py1+36))
draw = ImageDraw.Draw(img)

# Headline simulée dans le site
def draw_text_centered(d, text, font, y, color, x_center=None):
    xc = x_center or W // 2
    bb = d.textbbox((0,0), text, font=font)
    tw = bb[2] - bb[0]
    d.text((xc - tw//2, y), text, font=font, fill=color)

# Texte dans le hero du site
f_site_title = ImageFont.truetype(os.path.join(FONTS, "BigShoulders-Bold.ttf"), 28)
f_site_sub   = ImageFont.truetype(os.path.join(FONTS, "InstrumentSans-Regular.ttf"), 14)
f_site_tiny  = ImageFont.truetype(os.path.join(FONTS, "InstrumentSans-Regular.ttf"), 11)
site_cx = (px1 + px2) // 2

draw_text_centered(draw, "VOTRE SITE",     f_site_title, py1+80,  (*GOLD, 255), site_cx)
draw_text_centered(draw, "sur mesure.",    f_site_title, py1+112, (255,255,255,255), site_cx)
draw_text_centered(draw, "Design · Rapidité · Résultats", f_site_sub, py1+150, (*GREY, 255), site_cx)

# Bouton CTA dans le site
btn_w, btn_h = 140, 26
btn_x = site_cx - btn_w//2
draw.rounded_rectangle([btn_x, py1+175, btn_x+btn_w, py1+175+btn_h], radius=4, fill=GOLD)
draw_text_centered(draw, "Découvrir →", f_site_tiny, py1+181, BG, site_cx)

# Sections simulées sous le hero
for i, (lbl, w_pct) in enumerate([("Services", 0.9), ("Projets", 0.7), ("Contact", 0.5)]):
    sec_y = py1 + 300 + i * 100
    sec_w = int((px2-px1-32) * w_pct)
    draw.rectangle([px1+16, sec_y, px1+16+sec_w, sec_y+8], fill=FAINT)
    draw.rectangle([px1+16, sec_y+18, px1+16+int(sec_w*0.6), sec_y+24], fill=FAINT)
    draw.rectangle([px1+16, sec_y+32, px1+16+int(sec_w*0.4), sec_y+38], fill=FAINT)
    # accent doré
    draw.rectangle([px1+8, sec_y, px1+12, sec_y+38], fill=(*GOLD, 180))

# Caméra laptop
draw.ellipse([W//2-5, sy1+8, W//2+5, sy1+18], fill=(20,18,14))
draw.ellipse([W//2-2, sy1+11, W//2+2, sy1+15], fill=(40,35,28))

# ── VIGNETTE ────────────────────────────────────────────────────────────────
vig = Image.new("RGBA", (W, H), (0,0,0,0))
vd  = ImageDraw.Draw(vig)
for r in range(min(W,H)//2, 0, -4):
    a = int(160 * (1 - r / (min(W,H)//2)) ** 1.5)
    vd.ellipse([W//2-r, H//2-r, W//2+r, H//2+r], fill=(0,0,0, max(0,min(255,a))))
img_rgba = img.convert("RGBA")
img_rgba = Image.alpha_composite(img_rgba, vig)
img = img_rgba.convert("RGB")
draw = ImageDraw.Draw(img)

# ── BOTTOM PANEL ─────────────────────────────────────────────────────────────
panel_y = 1130
panel = Image.new("RGBA", (W, H - panel_y), (6, 6, 8, 218))
panel_d = ImageDraw.Draw(panel)
# Coins supérieurs arrondis
panel_d.rounded_rectangle([0, 0, W, H - panel_y], radius=32, fill=(6, 6, 8, 218))
img_rgba2 = img.convert("RGBA")
img_rgba2.paste(panel, (0, panel_y), panel)
img = img_rgba2.convert("RGB")
draw = ImageDraw.Draw(img)

# ── GOLD LINES ───────────────────────────────────────────────────────────────
line_w = int(W * 0.7)
lx1, lx2 = (W - line_w) // 2, (W + line_w) // 2
# Top line
draw.rectangle([lx1, 72, lx2, 74], fill=GOLD)
# Bottom line
draw.rectangle([lx1, H - 72, lx2, H - 70], fill=GOLD)
# Separator in panel
draw.rectangle([lx1, 1310, lx2, 1311], fill=(*GOLD, 140))

# ── LOGO TOP ──────────────────────────────────────────────────────────────────
draw_text_centered(draw, "CC", f_logo, 90, GOLD)

f_creation_lbl = ImageFont.truetype(os.path.join(FONTS, "InstrumentSans-Regular.ttf"), 22)
def draw_tracked(d, text, font, x, y, color, tracking=8):
    cx = x
    for ch in text:
        bb = d.textbbox((0,0), ch, font=font)
        d.text((cx, y), ch, font=font, fill=color)
        cx += bb[2] - bb[0] + tracking

def get_tracked_width(d, text, font, tracking=8):
    w = 0
    for i, ch in enumerate(text):
        bb = d.textbbox((0,0), ch, font=font)
        w += bb[2] - bb[0]
        if i < len(text)-1:
            w += tracking
    return w

creation_txt = "C R É A T I O N"
tw = get_tracked_width(draw, creation_txt, f_creation_lbl, tracking=6)
draw_tracked(draw, creation_txt, f_creation_lbl, (W - tw)//2, 218, WHITE, tracking=6)

# ── PANEL TEXT ───────────────────────────────────────────────────────────────
# Main headline
f_headline = ImageFont.truetype(os.path.join(FONTS, "BigShoulders-Bold.ttf"), 76)
f_headline2 = ImageFont.truetype(os.path.join(FONTS, "BigShoulders-Bold.ttf"), 76)

draw_text_centered(draw, "Votre business mérite", f_headline, 1155, WHITE)
draw_text_centered(draw, "un site à la hauteur.", f_headline2, 1240, GOLD)

# Tagline
f_tag = ImageFont.truetype(os.path.join(FONTS, "InstrumentSans-Regular.ttf"), 26)
tag_txt = "DESIGN  ·  PERFORMANCE  ·  RÉSULTATS"
tw2 = get_tracked_width(draw, tag_txt, f_tag, tracking=2)
draw_tracked(draw, tag_txt, f_tag, (W - tw2)//2, 1342, GREY, tracking=2)

# CTA text
f_cta = ImageFont.truetype(os.path.join(FONTS, "InstrumentSans-Regular.ttf"), 34)
draw_text_centered(draw, "Découvrez ce qu'on a créé", f_cta, 1400, WHITE)

# URL
f_url2 = ImageFont.truetype(os.path.join(FONTS, "BigShoulders-Bold.ttf"), 72)
draw_text_centered(draw, "creationconcept.fr", f_url2, 1460, GOLD)

# Gold underline under URL
url_bb = draw.textbbox((0,0), "creationconcept.fr", font=f_url2)
url_w  = url_bb[2] - url_bb[0]
url_x1 = (W - url_w) // 2
draw.rectangle([url_x1, 1540, url_x1 + url_w, 1542], fill=(*GOLD, 180))

# Share line
f_share = ImageFont.truetype(os.path.join(FONTS, "InstrumentSans-Regular.ttf"), 26)
draw_text_centered(draw, "Partage à quelqu'un qui en a besoin  👇", f_share, 1600, (*GREY, 200))

# ── SMALL DOTS DECORATION ────────────────────────────────────────────────────
for i in range(5):
    dx = lx1 + i * (line_w // 4)
    draw.ellipse([dx-2, 71, dx+2, 75], fill=(*GOLD, 255))
    draw.ellipse([dx-2, H-73, dx+2, H-69], fill=(*GOLD, 255))

# ── FINAL BLUR REFINEMENT ─────────────────────────────────────────────────────
# Légère amélioration du rendu global
img_out = img.filter(ImageFilter.SMOOTH)

out_path = r"C:\Users\JB\Documents\Concept.Chagnat\public\snap-flyer-cc.png"
img_out.save(out_path, "PNG", dpi=(300,300))
print("Flyer saved: " + out_path)
print("Size: {}x{}px".format(W, H))
