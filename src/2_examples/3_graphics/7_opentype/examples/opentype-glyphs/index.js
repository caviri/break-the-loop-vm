let font;
let snapPath;

const baseLine = 150;
const fontSize = 80;

let x = 0;
let y = 0;

async function setup() {
  createCanvas(900, 600);
  font = await opentype.load("../../fonts/Roboto-Black.ttf");
}

function draw() {
  background(255);
  if (!font) return;

  amount = font.glyphs.length;

  x = 50;
  y = 120;

  for (i = 10; i < 20; i++) {
    glyph = font.glyphs.get(i);
    glyph.draw(drawingContext, x, y, fontSize);
    glyph.drawPoints(drawingContext, x, y, fontSize);
    glyph.drawMetrics(drawingContext, x, y, fontSize);
    x += fontSize;
  }
}
