// Type@Cooper GDBT

let randomX = 0;
let randomY = 0;
let perlinX = 0;
let perlinY = 0;
let perlinOffset = 0;

function setup() {
  createCanvas(800, 400);

  // Initialize random position
  randomX = width / 2;
  randomY = height / 2;

  // Initialize Perlin noise position
  perlinX = width / 2;
  perlinY = height / 2;
}

function draw() {
  background(0);

  // Draw grid lines for reference
  stroke(50);
  strokeWeight(1);
  for (let i = 0; i <= width; i += 50) {
    line(i, 0, i, height);
  }
  for (let i = 0; i <= height; i += 50) {
    line(0, i, width, i);
  }

  // RANDOM MOVEMENT
  // Jumps to completely random positions each frame
  // This creates erratic, unpredictable movement
  randomX = random(0, width);
  randomY = random(0, height);

  fill(255, 0, 0);
  noStroke();
  circle(randomX, randomY, 30);

  // Label
  fill(255, 0, 0);
  textAlign(CENTER);
  textSize(12);
  text("Random", randomX, randomY - 20);

  // PERLIN NOISE MOVEMENT
  // Smooth, organic movement using noise()
  // noise() returns values between 0 and 1 that change smoothly
  // We increment the offset to move through the noise space
  perlinOffset += 0.01;

  // Map noise values to screen coordinates
  // Using different offsets for X and Y creates independent movement
  perlinX = map(noise(perlinOffset), 0, 1, 0, width);
  perlinY = map(noise(perlinOffset + 1000), 0, 1, 0, height);

  fill(0, 0, 255);
  noStroke();
  circle(perlinX, perlinY, 30);

  // Label
  fill(0, 0, 255);
  textAlign(CENTER);
  textSize(12);
  text("Perlin Noise", perlinX, perlinY - 20);
}
