let diameter = 100;
let speedX = 15;
let x = 100;
let speedY = 3;
let y = 200;
let fillColor = 255;

function setup() {
  createCanvas(1080, 1920);
}

function draw() {
  background(0);
  if (mouseX < width / 2 && mouseY < height / 2) {
    background(255);
  }

  // bouncing ball
  if (x > width - diameter / 2 || x < 0 + diameter / 2) {
    speedX = speedX * -1;
    fillColor = color(
      round(random(2)) * 125,
      round(random(2)) * 125,
      round(random(2)) * 125
    );
  }

  if (y > height - diameter / 2 || y < 0 + diameter / 2) {
    speedY = speedY * -1;
    fillColor = color(
      round(random(2)) * 125,
      round(random(2)) * 125,
      round(random(2)) * 125
    );
  }

  fill(fillColor);

  ellipse(x, y, diameter, diameter);

  x += speedX;
  y += speedY;
}
