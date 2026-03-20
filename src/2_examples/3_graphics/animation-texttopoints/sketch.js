// grab 'p5_textToPoints.js' for temp usage of separate paths/glyphs in type
// discussion: https://github.com/processing/p5.js/issues/4086

let font, pointsInPaths, pointsInGlyphs;
let txt = "Hello!";
let fSize = 300;

function preload() {
  font = loadFont("RobotoMono-Regular.ttf");
}

function setup() {
  createCanvas(1080, 1350);
  stroke(0);
  strokeWeight(0.5);

  // get points in glyphs in paths
  pointsInGlyphs = font.textToPoints(txt, 0, 0, fSize, {
    sampleFactor: 0.5,
    simplifyThreshold: 0.0,
    separateGlyphs: true, // new option
  });
  console.log(pointsInGlyphs);

  noFill();
  stroke(0);
  angleMode(DEGREES);
}

function draw() {
  background(0, 255, 0);
  fill(0);

  // separateGlyphs:true w/ [glyphs][paths][points]
  push();
  translate(0, fSize * 3);
  for (let i = 0; i < pointsInGlyphs.length; i++) {
    beginShape();

    for (let j = 0; j < pointsInGlyphs[i].length; j++) {
      if (j > 0) {
        beginContour();
      }
      strokeWeight(map(j, 0, pointsInGlyphs[i].length - 1, 3, 1));
      for (let k = 0; k < pointsInGlyphs[i][j].length; k++) {
        let p = pointsInGlyphs[i][j][k];
        vertex(p.x + random(-15, 15), p.y + random(-15, 15));
      }
      if (j > 0) {
        endContour();
      }
    }
    endShape(CLOSE);
  }
  pop();
}
