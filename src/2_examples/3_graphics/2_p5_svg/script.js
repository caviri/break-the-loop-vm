// Variables for random ellipse
let ellipseX, ellipseY;
let ellipseWidth, ellipseHeight;
let ellipseRotation;
let ellipseColor;

function setup() {
  createCanvas(800, 800, SVG);

  // Generate random ellipse properties
  ellipseX = random(100, 700);
  ellipseY = random(100, 700);
  ellipseWidth = random(50, 200);
  ellipseHeight = random(50, 200);
  ellipseRotation = random(0, TWO_PI);
  ellipseColor = color(random(255), random(255), random(255));

  noLoop();
  displayStar();
}

function draw() {}

function keyPressed() {
  if (key === "s") {
    save("image" + ".svg");
  }
  if (key === "p") {
    save("image" + ".png");
  }
  if (key === "r") {
    window.location.reload();
  }
}

function displayStar() {
  // Set fill color and no stroke for the ellipse
  fill(ellipseColor);
  noStroke();

  // Save the current transformation matrix
  push();

  // Translate to the ellipse center
  translate(ellipseX, ellipseY);

  // Rotate by the random rotation angle
  rotate(ellipseRotation);

  // Draw the ellipse centered at origin
  ellipse(0, 0, ellipseWidth, ellipseHeight);

  // Restore the transformation matrix
  pop();
}
