// in this sketch we're going to send a time variable to the shader
// https://p5js.org/reference/#/p5.Shader/setUniform

// a shader variable

let uniformsShader;
let pg;
let font;
let fontSize = 160;
let txtRows = 12;

// fliock stuff
// bin-lattice spatial subdivision
var boids = [];
let img;

function preload() {
  // load the shader
  img = loadImage("flower.png");
  uniformsShader = loadShader("uniform.vert", "uniform.frag");
  font = loadFont("Helvetica.ttf");
}

function setup() {
  // shaders require WEBGL mode to work
  // createCanvas(1794, 2481);
  createCanvas(1080, 1080);

  noStroke();
  pg = createGraphics(width, height, WEBGL);
  pg.background(255, 0, 0);
  pg.fill(0);
  pg.rect(0, 0, width, height);

  // fontSize = height / txtRows;

  textAlign(CENTER, CENTER);
  textSize(fontSize);
  textLeading(fontSize * 0.85);
  fill(0);
}

function draw() {
  // shader() sets the active shader with our shader

  clear();
  background(200);

  fontSize = 160;
  textFont(font);
  text("Hello World", width / 2, height / 2);

  // fontSize = 300;
  // textSize(fontSize);
  // textLeading(fontSize * 0.85);
  // textFont(font1);
  // text("NEW      \n \n BABY- \n    LON", width / 2, height / 2);
  // textFont(font2);
  // text("\n    NEW \n \n  ", width / 2, height / 2);

  // textFont(font3, 40);
  // text("visions for a new tomorrow", width / 2, height - 30);
  // tint(200, 220);
  // image(img, 0, 0, width, height);
  // noTint();

  pg.shader(uniformsShader);
  uniformsShader.setUniform("time", frameCount);
  pg.rect(0, 0, width, height);
  image(pg, 0, 0);

  resetMatrix();
}

function viewGrid() {
  //stroke(255)
  strokeWeight(0.1);
  for (let i = 0; i < txtRows; i++) {
    line(0, i * fontSize, width, i * fontSize);
  }
  noStroke();
}

function mousePressed() {
  saveCanvas("poster.jpg");
}

function windowResized() {
  //resizeCanvas(windowWidth, windowHeight);
}

function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}
