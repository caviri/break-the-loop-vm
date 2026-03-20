function setup() {
  createCanvas(1080, 1920, WEBGL);
  frameRate(30);
  pixelDensity(1); // Sets the density of pixels used in the display window
}

function draw() {
  background(0);
  normalMaterial();
  rotateX(frameCount * 0.02);
  rotateY(frameCount * 0.03);
  torus(width * 0.2, width * 0.1, 64, 64);
}
