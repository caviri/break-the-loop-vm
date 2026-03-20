var font;

async function setup() {
  // var notdefPath = new opentype.Path();
  // notdefPath.moveTo(100, 0);
  // var notdefGlyph = new opentype.Glyph({
  //     name: '.notdef',
  //     unicode: 0,
  //     advanceWidth: 650,
  //     path: notdefPath
  // });

  var hPath = new opentype.Path();

  hPath.moveTo(0, 0);
  hPath.lineTo(500, 0);
  hPath.lineTo(500, 800);
  hPath.lineTo(400, 800);
  hPath.lineTo(400, 500);
  hPath.lineTo(100, 500);
  hPath.lineTo(100, 800);
  hPath.lineTo(0, 800);

  hPath.moveTo(100, 100);
  hPath.lineTo(400, 100);
  hPath.lineTo(400, 300);
  hPath.lineTo(100, 300);

  var hGlyph = new opentype.Glyph({
    name: "whatever",
    unicode: 0,
    advanceWidth: 500,
    path: hPath,
  });

  var font = new opentype.Font({
    familyName: "",
    styleName: "Medium",
    unitsPerEm: 1000,
    ascender: 800,
    descender: -200,
    glyphs: glyphs,
  });

  font.download();
}

function draw() {}
