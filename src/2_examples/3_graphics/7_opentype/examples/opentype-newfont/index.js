var font;

function setup() {
  createCanvas(300, 400);
  // background(255);

  var notdefPath = new opentype.Path();
  notdefPath.moveTo(100, 0);
  var notdefGlyph = new opentype.Glyph({
    name: ".notdef",
    unicode: 0,
    advanceWidth: 650,
    path: notdefPath,
  });

  // create Path
  var bPath = new opentype.Path();

  // set the path shape
  bPath.moveTo(0, 0);
  bPath.lineTo(200, 0);
  bPath.lineTo(200, 200);
  bPath.lineTo(0, 200);

  // create a glyph
  var bGlyph = new opentype.Glyph({
    name: "B",
    unicode: "B".charCodeAt(0),
    advanceWidth: 500,
    path: bPath,
  });

  // create a list of glyphs and add your glyph to it
  var glyphs = [notdefGlyph, bGlyph];

  // create a new font
  font = new opentype.Font({
    familyName: "yourCoolFont-2",
    styleName: "Medium",
    unitsPerEm: 1000,
    ascender: 800,
    descender: -200,
    glyphs: glyphs,
  });

  var aPath = new opentype.Path();
  aPath.moveTo(100, 0);
  aPath.lineTo(100, 700);
  aPath.lineTo(600, 700);
  aPath.lineTo(600, 0);
  aPath.lineTo(500, 0);
  aPath.lineTo(500, 300);
  aPath.lineTo(200, 300);
  aPath.lineTo(200, 0);
  aPath.close();
  aPath.moveTo(200, 400);
  aPath.lineTo(500, 400);
  aPath.lineTo(500, 600);
  aPath.lineTo(200, 600);
  aPath.close();

  var aGlyph = new opentype.Glyph({
    name: "A",
    unicode: "A".charCodeAt(0),
    advanceWidth: 300,
    path: aPath,
  });

  var lPath = new opentype.Path();

  lPath.moveTo(0, 0);
  lPath.lineTo(200, 0);
  lPath.lineTo(200, 100);
  lPath.lineTo(100, 100);
  lPath.lineTo(100, 500);
  lPath.lineTo(0, 500);
  lPath.close();

  var lGlyph = new opentype.Glyph({
    name: "L",
    unicode: "L".charCodeAt(0),
    advanceWidth: 400,
    path: lPath,
  });

  var oPath = new opentype.Path();

  oPath.moveTo(0, 0);
  oPath.lineTo(400, 0);
  oPath.lineTo(400, 400);
  oPath.lineTo(0, 400);
  oPath.moveTo(100, 100);
  oPath.lineTo(100, 200);
  oPath.lineTo(200, 200);
  oPath.lineTo(200, 100);

  var oGlyph = new opentype.Glyph({
    name: "O",
    unicode: "O".charCodeAt(0),
    advanceWidth: 400,
    path: oPath,
  });

  var glyphs = [notdefGlyph, bGlyph, aGlyph, lGlyph, oGlyph];

  font = new opentype.Font({
    familyName: "yourCoolFont-2",
    styleName: "Medium",
    unitsPerEm: 1000,
    ascender: 800,
    descender: -200,
    glyphs: glyphs,
  });

  // font.download();

  createLoop({
    duration: 3,
    gif: true,
    framesPerSecond: 10,
  });
}

function getMaxY(path) {
  return Math.max(...path.commands.filter((c) => c.y).map((c) => c.y));
}

function getMinY(path) {
  return Math.min(...path.commands.filter((c) => c.y).map((c) => c.y));
}

function getMaxX(path) {
  return Math.max(...path.commands.filter((c) => c.x).map((c) => c.x));
}

function getMinX(path) {
  return Math.min(...path.commands.filter((c) => c.x).map((c) => c.x));
}

function drawPath(path) {
  // start drawing path
  drawingContext.beginPath();

  var maxY = getMaxY(path);
  var minY = getMinY(path);

  var maxX = getMaxX(path);
  var minX = getMinX(path);

  // loop through all the commands (points) of the glyph path
  for (var i = 0; i < path.commands.length; i += 1) {
    // grab the comands and store in a var
    var cmd = path.commands[i];

    var x = cmd.x;
    var y = cmd.y;

    // point is at top edge
    if (y === minY) {
      y = 0;
    }

    // point is on bottom edge
    if (y === maxY) {
      y = mouseY;
    }

    // point is on left edge
    if (x === minX) {
      // x =  x + random(-20, 20);
      // x = 0;
    }

    // point is on right edge
    if (x === maxX) {
      // x = width;
    }

    // check the type and draw
    if (cmd.type === "M") {
      drawingContext.moveTo(x, y);
    } else if (cmd.type === "L") {
      drawingContext.lineTo(x, y);
    } else if (cmd.type === "C") {
      drawingContext.bezierCurveTo(cmd.x1, cmd.y1, cmd.x2, cmd.y2, x, y);
    } else if (cmd.type === "Q") {
      drawingContext.quadraticCurveTo(cmd.x1, cmd.y1, x, y);
    } else if (cmd.type === "Z") {
      drawingContext.closePath();
    }
  }

  // styling
  // make the shape fill blank
  // noFill();
  // fill(random(0, 255), random(0, 255), random(0, 255));

  fill(0);

  // give stroke to the shape
  stroke(255);
  strokeWeight(10);

  // do not touch this
  drawingContext.fill();
  drawingContext.stroke();
  drawingContext.closePath();
}

function draw() {
  blendMode(BLEND);
  background(255);
  frameRate(30);

  // background(255)

  var options = {
    // xScale: 0.1,
    // yScale: 0.15
  };

  var startX = 75;
  var startY = 100;
  var fontSize = 75;

  var aGlyph = font.glyphs.get(2);
  var aPath = aGlyph.getPath(startX, startY, fontSize, options);

  var lGlyph = font.glyphs.get(3);
  var lPath = lGlyph.getPath(startX, startY, fontSize, options);

  drawPath(aPath);
  blendMode(DIFFERENCE);

  drawPath(lPath);
}
