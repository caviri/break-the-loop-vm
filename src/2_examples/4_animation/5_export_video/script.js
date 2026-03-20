// Type@Cooper GDBT

function setup() {
  createCanvas(800, 400, WEBGL);
}

function draw() {
  background(0);
  normalMaterial();
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);
  rotateZ(frameCount * 0.01);
  torus(300, 100, 100, 10);
}
