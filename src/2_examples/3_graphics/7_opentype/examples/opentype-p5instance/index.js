let font;
let path;

const baseLine = 150;
const x = 0;
const fontSize = 300;

var startX = 200;
var startY = 350;

var densityVolume = 0.1;
var textToShow = "R";

var minSizeOfCircle = 0;
var maxSizeOfCircle = 30;

var points = [];

function preload() {
  font = loadFont("../../fonts/Roboto-Black.ttf");
}

function setup() {
  createCanvas(900, 600);
  points = font.textToPoints(textToShow, startX, startY, fontSize, {
    sampleFactor: densityVolume,
  });

  //const bounds = font.textBounds(text, x, y, fontSize);
}

function draw() {
  background(255);

  frameRate(10);

  for (var i = 0; i < points.length; i++) {
    var x = points[i].x;
    var y = points[i].y;

    // var size = random(minSizeOfCircle, maxSizeOfCircle)
    circle(x, y, 1);
    // line(mouseX, mouseY, x, y);

    for (var j = 0; j < points.length; j++) {
      var otherX = points[j].x;
      var otherY = points[j].y;

      stroke(
        `rgba(${random(0, 100)}%,0%,${random(0, 100)}%,${random(0, 0.01)})`
      );

      strokeWeight(random(0, 5));

      line(x, y, otherX, otherY);
    }
  }
}
