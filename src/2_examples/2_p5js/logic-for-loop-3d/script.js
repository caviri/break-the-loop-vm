let cells = 10;
let cellW;
let inc = 0;
let n = 0;
let sineColor = 0;

function setup() {
  // for 3D we use a renderer https://p5js.org/reference/p5/WEBGL/
  createCanvas(1080, 1920, WEBGL);
  noStroke();
  cellW = width / cells;
}

function draw() {
  background(0);
  orbitControl();
  n = noise(inc, frameCount * 0.01) * 255;
  inc += 0.05;

  sineColor = sin(inc) * 127.5 + 127.5;
  translate(-width / 2, -width / 2, -height / 2);
  // x position
  for (let x = 0; x < cells; x++) {
    // y position
    for (let y = 0; y < cells; y++) {
      // z position
      for (let z = 0; z < cells; z++) {
        // draw an ellipse
        push();
        translate(x * cellW, y * cellW, z * cellW);
        fill(x * 30, y * 30 - sineColor, z * 30);
        sphere(cellW / 4);
        pop();
      }
    }
  }
}
