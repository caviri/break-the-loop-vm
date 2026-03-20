const POSTER_W = 1080;
const POSTER_H = 1440;

function setup() {
  const cnv = createCanvas(POSTER_W, POSTER_H);
  cnv.parent("canvas-wrapper");
  background(255);
  Panels.init();
}

function draw() {
  // Your poster code here

  _syncPanels();
}

function _syncPanels() {
  const px = constrain(mouseX, 0, width - 1);
  const py = constrain(mouseY, 0, height - 1);
  const c = get(px, py);
  const r = red(c), g = green(c), b = blue(c);

  Panels.update({
    canvasW: width,
    canvasH: height,
    mouseX: mouseX,
    mouseY: mouseY,
    pixelX: px,
    pixelY: py,
    r: r,
    g: g,
    b: b,
    a: alpha(c),
    hex: "#" + hex(r, 2) + hex(g, 2) + hex(b, 2),
    frame: frameCount,
    fps: nf(frameRate(), 1, 1),
    density: pixelDensity(),
  });
}

function keyPressed() {
  if (key === "s" || key === "S") save("poster.png");
  if (key === "h" || key === "H") Panels.toggleHelp();
  if (key === "i" || key === "I") Panels.toggleInfo();
  if (key === "c" || key === "C") background(255);
  if (key === "b" || key === "B") background(0);
  if (key === "r" || key === "R") background(random(255), random(255), random(255));
}
