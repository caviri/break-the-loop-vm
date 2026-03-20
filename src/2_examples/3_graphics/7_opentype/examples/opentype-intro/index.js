let font;
let path;
const baseLine = 230;
const x = 250;
const fontSize = 172;

async function setup() {
  createCanvas(900, 600);

  font = await opentype.load("../../fonts/Roboto-Black.ttf");
  console.log(font);

  path = font.getPath("H", x, baseLine, fontSize);
  console.log(path);
}

function draw() {
  if (!path) return;

  background(255);

  var box = path.getBoundingBox();

  var w = box.x2 - box.x1;
  var h = box.y2 - box.y1;

  path.draw(drawingContext);

  noFill();
  stroke(255, 0, 0);
  rect(box.x1, box.y1, w, h);
}
