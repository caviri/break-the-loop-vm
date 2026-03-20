// Type@Cooper GDBT

let linearX = 0;
let exponentialX = 1;
let sinusoidalX = 0;
let time = 0;

function setup() {
  createCanvas(800, 400);
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

  // LINEAR MOVEMENT
  // Constant speed: position = start + velocity * time
  linearX = (linearX + 2) % width;

  fill(255, 0, 0);
  noStroke();
  circle(linearX, 100, 30);

  // Label
  fill(255, 0, 0);
  textAlign(CENTER);
  textSize(12);
  text("Linear", linearX, 85);

  // EXPONENTIAL MOVEMENT
  // Accelerating: uses exponential growth
  // We'll use a multiplier that increases over time
  exponentialX = exponentialX * 1.02;
  if (exponentialX > width) {
    exponentialX = 1; // Reset to 1 to avoid starting at 0
  }

  fill(0, 255, 0);
  noStroke();
  circle(exponentialX, 200, 30);

  // Label
  fill(0, 255, 0);
  textAlign(CENTER);
  textSize(12);
  text("Exponential", exponentialX, 185);

  // SINUSOIDAL MOVEMENT
  // Oscillating: uses sine wave
  // position = center + amplitude * sin(frequency * time)
  time += 0.05;
  sinusoidalX = width / 2 + (width / 2 - 50) * sin(time);

  fill(0, 0, 255);
  noStroke();
  circle(sinusoidalX, 300, 30);

  // Label
  fill(0, 0, 255);
  textAlign(CENTER);
  textSize(12);
  text("Sinusoidal", sinusoidalX, 285);

  // Draw center line for sinusoidal movement
  stroke(0, 0, 255, 50);
  strokeWeight(1);
  line(width / 2, 285, width / 2, 315);
}
