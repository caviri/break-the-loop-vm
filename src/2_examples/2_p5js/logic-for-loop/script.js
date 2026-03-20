let cells = 40;
let cellW;
function setup() {
  createCanvas(1080, 1920);
  background(200);
  noStroke();

  // Calculate the width of the cells
  cellW = width / cells;

  // For loop
  for (let i = 0; i < cells; i++) {
    // Map fill color
    let c = map(i, 0, cells, 0, 255);
    fill(c, 0, 255 - c);

    // draw a rectangle
    ellipse(i * cellW + cellW / 2, 100, cellW, i * 3 + cellW);
  }

  // x position
  for (let x = 0; x < cells; x++) {
    // y position
    for (let y = 0; y < cells; y++) {
      let r = map(x, 0, cells, 0, 255);
      let g = map(y, 0, cells, 0, 255);
      fill(r, g, 255 - r - g);

      // draw an ellipse
      ellipse(x * cellW + cellW / 2, y * cellW + 200, cellW, cellW);
    }
  }
}
