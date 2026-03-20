let x = 1;
let y = 1;
let easing = 0.05;

function setup() {
  createCanvas(1080, 1920);
}

function draw() {
  background(0, 0, 255, 5);
  let targetX = mouseX;
  let dX = targetX - x;
  x += dX * easing;

  let targetY = mouseY;
  let dY = targetY - y;
  y += dY * easing;

  ellipse(x, y, 150, 150);
}
