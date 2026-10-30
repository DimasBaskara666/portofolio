import os
from PIL import Image, ImageDraw, ImageFont

def generate_og():
    width, height = 1200, 630
    img = Image.new('RGB', (width, height), color='#09090b')
    draw = ImageDraw.Draw(img)

    # Subtle grid lines
    for x in range(0, width, 60):
        draw.line([(x, 0), (x, height)], fill='#121215', width=1)
    for y in range(0, height, 60):
        draw.line([(0, y), (width, y)], fill='#121215', width=1)

    # Fonts
    font_mono_small = ImageFont.truetype('C:/Windows/Fonts/consola.ttf', 16)
    font_mono_med = ImageFont.truetype('C:/Windows/Fonts/consola.ttf', 22)
    font_title = ImageFont.truetype('C:/Windows/Fonts/segoeuib.ttf', 54)
    font_sub = ImageFont.truetype('C:/Windows/Fonts/segoeui.ttf', 24)

    # Outer border
    draw.rounded_rectangle([(40, 40), (width - 40, height - 40)], radius=16, outline='#27272a', width=2)

    # Header bar inside box
    # Operator mark
    draw.text((width - 240, 78), "// dimas.sys", font=font_mono_med, fill="#38bdf8")

    # Main title
    draw.text((70, 180), "Systems Engineering Portfolio", font=font_title, fill="#f4f4f5")
    draw.text((70, 260), "Informatics Graduate · Data Pipelines · Backend Systems · Applied ML", font=font_sub, fill="#a1a1aa")

    # Three pillars
    pillars = [
        ("01 // DATA", "Data Engineering"),
        ("02 // SOFTWARE", "Software Engineering"),
        ("03 // AI & NLP", "AI / ML / NLP Systems")
    ]
    card_w = 320
    for idx, (tag, name) in enumerate(pillars):
        cx = 70 + idx * (card_w + 40)
        cy = 350
        draw.rounded_rectangle([(cx, cy), (cx + card_w, cy + 120)], radius=10, fill='#111114', outline='#27272a', width=1)
        draw.text((cx + 20, cy + 20), tag, font=font_mono_small, fill="#38bdf8")
        draw.text((cx + 20, cy + 60), name, font=ImageFont.truetype('C:/Windows/Fonts/segoeuib.ttf', 22), fill="#f4f4f5")

    # Footer note
    draw.text((70, 545), "JAKARTA, ID [WIB / UTC+7] · VERIFIED ENGINEERING SPECIFICATION", font=font_mono_small, fill="#71717a")

    output_path = os.path.join(os.path.dirname(__file__), '..', 'public', 'og-image.png')
    img.save(output_path, format='PNG')
    print(f"Generated {output_path} successfully ({os.path.getsize(output_path)} bytes)")

if __name__ == '__main__':
    generate_og()
