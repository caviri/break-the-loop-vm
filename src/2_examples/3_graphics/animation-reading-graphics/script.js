let cols = 70;
let rows = 70;
let w, h;
let pg;

function setup() {
  createCanvas(1080, 1350);
  noStroke();

  w = width / cols;
  h = height / rows;

  // https://p5js.org/reference/p5/createGraphics/
  pg = createGraphics(1080, 1350);
  pg.textAlign(CENTER, CENTER);
  pg.textSize(300);
}

function draw() {
  background(0, 125, 0);

  pg.background(255);
  pg.push();
  pg.translate(pg.width / 2, pg.height / 2);
  pg.shearY(frameCount * 0.01);
  pg.text("bonjour", 0, 0);
  pg.pop();

  // image(pg, 0, 0, 200, 200);
  // https://p5js.org/reference/p5/map/
  // cols = map(mouseX, 0, width, 10, 50);
  // rows = int(mouseY / 20);

  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      // https://p5js.org/reference/p5/get/
      let c = pg.get(x * w, y * h);
      fill(255, 170, 255);
      if (brightness(c) < 30) {
        ellipse(x * w + w / 2, y * h + h / 2, w, h);
      }
    }
  }
}
