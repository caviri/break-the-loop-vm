let font;

function preload() {
  font = loadFont("Arial Narrow.ttf")
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont(font, 100)
  noStroke();
}

function draw() {
  background(220, 10)
  // fill(0, 0, 255)
  // ellipse(mouseX, mouseY, 50, 50)
  console.log( int(frameRate()))
  fill(255, 0, 0)
  text("HELLO", mouseX, mouseY)
}

function windowResized() {
 resizeCanvas(windowWidth, windowHeight);
}
