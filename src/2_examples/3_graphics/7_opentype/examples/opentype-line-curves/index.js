let font;
var path;
var prevPath = [];
var fontSize = 250;

var fontRegular;

var originalPath;

function preload() {
  fontRegular = loadFont("../../fonts/Roboto-Black.ttf");
}

async function setup() {
  createCanvas(600, 600);
  font = await opentype.load("../../fonts/Roboto-Black.ttf");

  textFont(fontRegular);
  textSize(fontSize);

  path = font.getPath("R", 200, 300, fontSize);
  originalPath = font.getPath("R", 200, 300, fontSize);
}

var textX = 0;
var textY = 300;

var step = 10;

let test = 0;

function draw() {
  if (!font) return;

  // background(255);

  var commands = path.commands;
  var numberOfPoints = commands.length;

  var middleOfScreenX = width / 2;

  for (var i = 0; i < numberOfPoints; i++) {
    var x = commands[i].x;
    var y = commands[i].y;

    if (x > middleOfScreenX) {
      // it is on right side

      line(width, 0, x, y);
    } else {
      line(0, 0, x, y);
      // otherwise it is on left
    }

    commands[i].x = x + random(-1, 1);
    commands[i].y = y + random(-1, 1);

    prevPath[i] = commands[i];
  }
}
