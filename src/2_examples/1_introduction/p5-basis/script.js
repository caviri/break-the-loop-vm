let myName = "Vera";

function setup() {
  createCanvas(1080, 1920);
  background(0, 0, 255);
  textSize(30);
  textAlign(CENTER, CENTER);
}

function draw() {
  background(0, 0, 255, 5);
  ellipse(mouseX, mouseY, 150, 150);
  text(myName, mouseX, mouseY);
}

function keyPressed() {
  addExclamation();
  background(random(255), random(255), random(255));
}

function addExclamation() {
  myName = myName + "!";
}
