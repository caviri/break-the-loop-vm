const POSTER_W = 1080;
const POSTER_H = 1440;

function setup() {
  createCanvas(POSTER_W, POSTER_H);
  background(255);
}

function draw() {
  // Your poster code here
}

function keyPressed() {
  if (key === "s" || key === "S") {
    save("poster.png");
  }
}
