
let img
function preload() {
  img = loadImage("cat.png")
}
function setup() {
    createCanvas(windowWidth, windowHeight)
    img.resize(width, height)

    let c = new Riso('blue')
    let m = new Riso('red')
    let y = new Riso('fluorescentyellow')
    let k = new Riso('black')

    //extract cyan from img
    let cyan = extractCMYKChannel(img, "cyan");
    let magenta = extractCMYKChannel(img, "magenta");
    let yellow = extractCMYKChannel(img, "yellow");
    let black = extractCMYKChannel(img, "black");

    c.image(cyan, 0, 0)
    m.image(magenta, 0, 0)
    y.image(yellow, 0, 0)
    k.image(black, 0, 0)

    drawRiso();
}


function mousePressed() {
  exportRiso()
}
