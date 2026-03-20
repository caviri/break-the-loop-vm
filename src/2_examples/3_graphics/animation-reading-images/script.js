let cat;
let cols = 20;
let rows = 20;
let w, h;

function preload() {
  cat = loadImage("cat.png");
}

function setup() {
  createCanvas(1080, 1920);
  // image(cat, 0, 0);
  cat.resize(width, 0);
  noStroke();
}

function draw() {
  background(255);
  //https://p5js.org/reference/p5/map/
  cols = map(mouseX, 0, width, 10, 50);
  rows = int(mouseY / 20);

  w = width / cols;
  h = height / rows;

  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      // https://p5js.org/reference/p5/get/
      let c = cat.get(x * w, y * h);
      fill(c);
      if (brightness(c) < 70) {
        ellipse(x * w + w / 2, y * h + h / 2, w, h);
      } else {
        rect(x * w, y * h, w, h);
      }
    }
  }
}
