let font;
function preload() {
  font = loadFont("Arial Narrow.ttf");
}

function setup() {
  createCanvas(1080, 1440);
  textFont(font, 50);
}

function draw() {
  background(255, 20);
  let textColor = map(mouseX, 0, width, 0, 255);
  fill(0, 255, 0);
  ellipse(mouseX, mouseY, 50, 50);

  push();
  fill(textColor, 0, 255 - textColor);
  translate(mouseX, mouseY);
  rotate(mouseX / 10);
  text("hello!", 0, 0);
  pop();

  text("world", 50, 50);
}

function keyPressed() {
  if (key == "s" || key == "S") {
    save("image.png");
  }
}

function helloWorld() {
  console.log("hello");
}

helloWorld();
