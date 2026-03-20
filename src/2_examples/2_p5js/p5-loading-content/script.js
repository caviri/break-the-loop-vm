let cat;

// Terminal
// cd (drop in folder for path)
// python -m http.server

function preload() {
  cat = loadImage("cat.png");
}

function setup() {
  createCanvas(1080, 1920);
  background(0, 0, 255);
  imageMode(CENTER);
  cat.resize(300, 0);
}

function draw() {
  background(0, 0, 255, 5);
  image(cat, mouseX, mouseY);
}

// Save
function keyPressed() {
  if(key == 's' || key == 'S') {
    save( "poster-" + year() + "." + month() + "." + day() + "-" + hour() + "." + minute() + ".png")
  }
}
