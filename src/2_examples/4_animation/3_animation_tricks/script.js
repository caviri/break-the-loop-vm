// Type@Cooper GDBT

// LERP (Linear Interpolation) variables
let lerpStart = 0;
let lerpEnd = 0;
let lerpCurrent = 0;
let lerpTarget = 0;

// MAP variables
let mapValue = 0;
let mapTime = 0;

// CONSTRAIN variables
let constrainX = 0;
let constrainY = 0;
let constrainSpeedX = 2;
let constrainSpeedY = 1.5;

// PUSH & POP rotation
let rotationAngle = 0;

function setup() {
  createCanvas(800, 600);

  // Initialize LERP
  lerpStart = 100;
  lerpEnd = width - 100;
  lerpCurrent = lerpStart;
  lerpTarget = lerpEnd;

  // Initialize CONSTRAIN position
  constrainX = width / 2;
  constrainY = height / 2;
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

  // ============================================
  // LERP (Linear Interpolation)
  // ============================================
  // Smoothly interpolate between current and target
  // lerp(current, target, amount) where amount is 0-1
  // Lower amount = slower, higher amount = faster
  lerpCurrent = lerp(lerpCurrent, lerpTarget, 0.05);

  // Switch direction when reaching target
  if (abs(lerpCurrent - lerpTarget) < 1) {
    if (lerpTarget == lerpEnd) {
      lerpTarget = lerpStart;
    } else {
      lerpTarget = lerpEnd;
    }
  }

  fill(255, 0, 0);
  noStroke();
  circle(lerpCurrent, 100, 30);

  // Label and explanation
  fill(255, 0, 0);
  textAlign(CENTER);
  textSize(12);
  text("LERP", lerpCurrent, 85);

  fill(255, 100, 100);
  textAlign(LEFT);
  textSize(10);
  text("lerp(current, target, 0.05) - smooth interpolation", 10, 120);

  // ============================================
  // MAP
  // ============================================
  // Convert a value from one range to another
  // map(value, start1, stop1, start2, stop2)
  mapTime += 0.02;
  let sineValue = sin(mapTime);
  // Map from -1 to 1 (sine range) to 100 to width-100 (screen range)
  mapValue = map(sineValue, -1, 1, 100, width - 100);

  fill(0, 255, 0);
  noStroke();
  circle(mapValue, 200, 30);

  // Label and explanation
  fill(0, 255, 0);
  textAlign(CENTER);
  textSize(12);
  text("MAP", mapValue, 185);

  fill(100, 255, 100);
  textAlign(LEFT);
  textSize(10);
  text("map(sin(t), -1, 1, 100, width-100) - range conversion", 10, 220);

  // ============================================
  // CONSTRAIN
  // ============================================
  // Limit a value to stay within a range
  // constrain(value, min, max)
  constrainX += constrainSpeedX;
  constrainY += constrainSpeedY;

  // Constrain to stay within bounds (with padding)
  constrainX = constrain(constrainX, 50, width - 50);
  constrainY = constrain(constrainY, 50, height - 50);

  // Bounce off edges by reversing speed
  if (constrainX <= 50 || constrainX >= width - 50) {
    constrainSpeedX *= -1;
  }
  if (constrainY <= 50 || constrainY >= height - 50) {
    constrainSpeedY *= -1;
  }

  fill(0, 0, 255);
  noStroke();
  circle(constrainX, constrainY, 30);

  // Label and explanation
  fill(0, 0, 255);
  textAlign(CENTER);
  textSize(12);
  text("CONSTRAIN", constrainX, constrainY - 20);

  fill(100, 100, 255);
  textAlign(LEFT);
  textSize(10);
  text("constrain(x, 50, width-50) - keep within bounds", 10, 320);

  // ============================================
  // PUSH & POP
  // ============================================
  // Save and restore transformation state
  // push() saves current state, pop() restores it
  rotationAngle += 0.02;

  // First shape - affected by push/pop
  push();
  translate(200, 450);
  rotate(rotationAngle);
  fill(255, 255, 0);
  noStroke();
  rectMode(CENTER);
  rect(0, 0, 60, 60);
  pop();

  // Label for first shape
  fill(255, 255, 0);
  textAlign(CENTER);
  textSize(12);
  text("PUSH & POP", 200, 440);

  // Second shape - NOT using push/pop (shows the difference)
  push();
  translate(600, 450);
  rotate(rotationAngle);
  fill(255, 0, 255);
  noStroke();
  rectMode(CENTER);
  rect(0, 0, 60, 60);
  pop();

  // Label for second shape
  fill(255, 0, 255);
  textAlign(CENTER);
  textSize(12);
  text("PUSH & POP", 600, 440);

  // Explanation
  fill(255, 200, 255);
  textAlign(LEFT);
  textSize(10);
  text(
    "push() saves transform, pop() restores - prevents affecting other shapes",
    10,
    520
  );
}
