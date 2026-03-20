//—————————————————————————————————————————————————————//
// Change a font with Opentype
//—————————————————————————————————————————————————————//

let font
let path
let prevPath = []
let fontSize
let fontRegular
let index = 1
let numberOfPoints
let commands
let command

function preload() {
  fontRegular = loadFont('Arial Narrow.ttf')
}

async function setup() {
  createCanvas(displayHeight/1.41, displayHeight)
  font = await opentype.load('Arial Narrow.ttf')
  fontSize = width
  textFont(fontRegular)
  textSize(fontSize)
  path = font.getPath("R", fontSize*0.25, fontSize, fontSize)
  console.log(path)
}

function draw() {
  if(!font) return
  background(255)
  commands = path.commands
  numberOfPoints = commands.length
  command = commands[index]
  path.draw(drawingContext)
  strokeWeight(5)
  stroke(0,0,255)
  ellipse(command.x, command.y, 5, 5)

}

// Drag to move anchor point
function mouseDragged() {
  commands[index].x = mouseX
  commands[index].y = mouseY
  prevPath[index] = commands[index]
}


// Press left or right to switch point
function keyPressed() {
  if( keyCode == RIGHT_ARROW) {
    if( index < numberOfPoints-1 ) {
      index++
    } else {
      index = 0
    }
    command = path.commands[index]

  } else if ( keyCode == LEFT_ARROW ) {
    if( index > 0 ) {
      index--
    } else {
      index = numberOfPoints-1
    }
    command = path.commands[index]

  }
}
