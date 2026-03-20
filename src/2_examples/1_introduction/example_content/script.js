let dog;

function preload() {
  dog = loadImage("dog.webp");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255, 0, 0);
  imageMode(CENTER);

  dog.resize(400, 0);
}

function draw() {
  image(dog, mouseX, mouseY);
}
