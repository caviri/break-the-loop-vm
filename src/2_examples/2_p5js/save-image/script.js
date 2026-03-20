function setup() {
  createCanvas(1080, 1920);
  background(0, 0, 255);
}

function draw() {
  background(0, 0, 255, 5);
  ellipse(mouseX, mouseY, 150, 150);
}

function keyPressed() {
  if (key == "s" || key == "S") {
    save("poster.png");
  }
}
