let isBackgroundOn = false;

function setup() {
  createCanvas(500, 500);

  if( !isBackgroundOn) {
    background(0);
  } else {
    background(255, 0, 0);
  }


  let pos = [
     [50, 61],
     [83, 69],
     [71, 50],
     [29, 31],
     [500, 500]
  ]
  for(let i = 0; i < pos.length; i++) {
    ellipse(pos[i][0], pos[i][1], 30, 30)
  }

  for(let x = 0; x < 10; x++) {
    for(let y = 0; y < 10; y++) {
      let xPos = 100+x*30
      let yPos = 100+y*30

      // If Upper left corner
      if(xPos < width/2 || yPos < height/2) {
        fill(240, 50, 0)
      } else {
        fill(0, 0, 255)
      }
      ellipse(xPos, yPos, 25, 25);

    }
  }
}
