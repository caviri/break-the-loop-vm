let font;
let snapPath, snapPath2;

const baseLine = 300;
const fontSize = 300;
const textToRender = "MT";


const texts = ["MOVING"]
const paths = [];


var kerning = true;
var snapStrength = 100;
var snapDistance = 40;

var snapX = 0;
var snapY = 0;

let posX, posY;
let radiusX = 350;
let radiusY = 350;
let inc = 0.01;
let theta = 0.1;

const options = {
    kerning: true,
    hinting: false
};

// Calculate and Round a value to the nearest "step".
function snap(value, distance, strength) {
    return (value * (1.0 - strength)) + (strength * Math.round(value / distance) * distance);
}

function relate(value, distance, strength) {
    return (value * (1.0 - strength)) + ( distance * strength*2);
}

function doSnap(path) {
    var i;
    var strength = snapStrength / 100.0;
    for (i = 0; i < path.commands.length; i++) {
        var cmd = path.commands[i];
        if (cmd.type !== 'Z') {
            cmd.x = snap(cmd.x + snapX, snapDistance, strength) - snapX;
            cmd.y = snap(cmd.y + snapY, snapDistance, strength) - snapY;
        }
        if (cmd.type === 'Q' || cmd.type === 'C') {
            cmd.x1 = snap(cmd.x1 + snapX, snapDistance, strength) - snapX;
            cmd.y1 = snap(cmd.y1 + snapY, snapDistance, strength) - snapY;
        }
        if (cmd.type === 'C') {
            cmd.x2 = snap(cmd.x2 + snapX, snapDistance, strength) - snapX;
            cmd.y2 = snap(cmd.y2 + snapY, snapDistance, strength) - snapY;
        }
    }
}

async function setup() {
	createCanvas(1080,1080);
	font = await opentype.load('../../fonts/GapSansBold.ttf');
    frameRate(30);


    let x = 0;
    let y = 0;
    for(let i = 0; i < texts.length; i++ ) {
        paths[i] = font.getPath( texts[i], x*baseLine + x*60 + 30, baseLine+y*baseLine+y*60+ 30, fontSize, options);
        x++
        if( x%2 == 0 ) {
            y++
            x = 0
        }
    }
    background(50,0,255)
     // createLoop({duration:10, framesPerSecond:25, gif:true})

}


function draw() {

    fill( 50, 0, 255)
    noStroke();
    rect( 0, 0, width, height);

    drawCircle();

       if( frameCount > 10 ) {
        let x = 0;
        let y = 0;
       for(let i = 0; i < paths.length; i++ ) {

            paths[i] = font.getPath( texts[i], 0, -50, fontSize, options);
            x++
            if( x%2 == 0 ) {
                y++
                x = 0
            }

           paths[i].fillStyle = 'white';
           paths[i].fill = 'white';
           // doSnap(paths[i]);
           push();
           scale(1, 4)
           translate(x, baseLine)
           paths[i].draw(drawingContext);
           pop();

       }

       // snapStrength = map(posX, width/2-radius, width/2+radius, 1, 10)
       // snapDistance = map(posY, height/2-radius, height/2+radius, 10, 20)

       for( let i = 15; i < width - 15; i+=snapDistance) {
            for( let j = 15; j < height - 15; j+=snapDistance) {
                noFill()
                stroke(255)
                strokeWeight(0.1)
                rect(i, j, 150, 150)
            }
       }
   }




	if(!font) return;



}

function drawCircle() {
    posX =  width/2 + cos(radians(theta))*(radiusX);
    posY =  height/2 + sin(radians(theta))*(radiusY);
    fill(255)
    noStroke();
    // circle(posX, posY, 20)
    theta += 4;

}
