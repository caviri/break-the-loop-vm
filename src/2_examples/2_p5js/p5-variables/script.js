let name = "Vera"
let day = 6
let yPositions = [50, 100, 150, 200, 250]

// Letter A
let positions = [
  [100, 700],
  [250, 400],
  [400, 100],
  [550, 400],
  [700, 700],
  [400, 400]
]

function setup() {
  createCanvas(800, 800)



}

function draw() {

  background(0)

  // Simple array
  for(let i = 0; i < 25; i++) {
    let ellipseColor = i/25*255
    fill(ellipseColor, 0, 255 )
    ellipse( 50, 50 + i * 30, 30, 30)
  }

  // Loop through array
  fill(0, 255, 0)
  for(let i = 0; i < yPositions.length; i++) {
    let yPos = yPositions[i]
    ellipse(random(width), yPos, 50, 50)
  }

  // Letter A
  fill(220)
  rectMode(CENTER)
  for(let i = 0; i < positions.length; i++) {
    let x = positions[i][0]
    let y = positions[i][1]
    rect(x, y, 150, 150, 50)
  }


  // If else
  if(mouseX < width / 2 && mouseY < height/2){
      // orange
      fill(255, 150, 0)
  } else {
      // purple
      fill(125, 0, 255)
  }

  // Grid
  for(let x = 0; x < 20; x++) {
    for(let y = 0; y < 20; y++) {
      let w = noise(x/5 + frameCount/50, y/5 - frameCount/50, frameCount/60) * 50
      ellipse(20 + x*40, 20 + y*40, w, w)
    }
  }

}


function mousePressed() {
  addExcitement()
}


function addExcitement() {
  name += "!"
  day++
  console.log(name, day)
}
