// Type@Cooper GDBT
// Easing functions from https://easings.net/

let time = 0;
let animationDuration = 2; // seconds per cycle
let startX = 50;
let endX = 750;
let spacing = 50;

// Easing functions from easings.net
function easeInSine(x) {
  return 1 - cos((x * PI) / 2);
}

function easeOutSine(x) {
  return sin((x * PI) / 2);
}

function easeInOutSine(x) {
  return -(cos(PI * x) - 1) / 2;
}

function easeInQuad(x) {
  return x * x;
}

function easeOutQuad(x) {
  return 1 - (1 - x) * (1 - x);
}

function easeInOutQuad(x) {
  return x < 0.5 ? 2 * x * x : 1 - pow(-2 * x + 2, 2) / 2;
}

function easeInCubic(x) {
  return x * x * x;
}

function easeOutCubic(x) {
  return 1 - pow(1 - x, 3);
}

function easeInOutCubic(x) {
  return x < 0.5 ? 4 * x * x * x : 1 - pow(-2 * x + 2, 3) / 2;
}

function easeInExpo(x) {
  return x === 0 ? 0 : pow(2, 10 * (x - 1));
}

function easeOutExpo(x) {
  return x === 1 ? 1 : 1 - pow(2, -10 * x);
}

function easeInOutExpo(x) {
  return x === 0
    ? 0
    : x === 1
    ? 1
    : x < 0.5
    ? pow(2, 20 * x - 10) / 2
    : (2 - pow(2, -20 * x + 10)) / 2;
}

function easeInBack(x) {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return c3 * x * x * x - c1 * x * x;
}

function easeOutBack(x) {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * pow(x - 1, 3) + c1 * pow(x - 1, 2);
}

function easeInOutBack(x) {
  const c1 = 1.70158;
  const c2 = c1 * 1.525;
  return x < 0.5
    ? (pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2)) / 2
    : (pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2;
}

function easeInBounce(x) {
  return 1 - easeOutBounce(1 - x);
}

function easeOutBounce(x) {
  const n1 = 7.5625;
  const d1 = 2.75;
  if (x < 1 / d1) {
    return n1 * x * x;
  } else if (x < 2 / d1) {
    return n1 * (x -= 1.5 / d1) * x + 0.75;
  } else if (x < 2.5 / d1) {
    return n1 * (x -= 2.25 / d1) * x + 0.9375;
  } else {
    return n1 * (x -= 2.625 / d1) * x + 0.984375;
  }
}

function easeInOutBounce(x) {
  return x < 0.5
    ? (1 - easeOutBounce(1 - 2 * x)) / 2
    : (1 + easeOutBounce(2 * x - 1)) / 2;
}

// Array of easing functions to display
const easings = [
  { name: "easeInSine", func: easeInSine, color: [255, 100, 100] },
  { name: "easeOutSine", func: easeOutSine, color: [100, 255, 100] },
  { name: "easeInOutSine", func: easeInOutSine, color: [100, 100, 255] },
  { name: "easeInQuad", func: easeInQuad, color: [255, 255, 100] },
  { name: "easeOutQuad", func: easeOutQuad, color: [255, 100, 255] },
  { name: "easeInOutQuad", func: easeInOutQuad, color: [100, 255, 255] },
  { name: "easeInCubic", func: easeInCubic, color: [255, 150, 100] },
  { name: "easeOutCubic", func: easeOutCubic, color: [150, 255, 100] },
  { name: "easeInOutCubic", func: easeInOutCubic, color: [150, 100, 255] },
  { name: "easeInExpo", func: easeInExpo, color: [255, 200, 100] },
  { name: "easeOutExpo", func: easeOutExpo, color: [200, 255, 100] },
  { name: "easeInOutExpo", func: easeInOutExpo, color: [200, 100, 255] },
  { name: "easeInBack", func: easeInBack, color: [255, 100, 150] },
  { name: "easeOutBack", func: easeOutBack, color: [100, 255, 150] },
  { name: "easeInOutBack", func: easeInOutBack, color: [100, 150, 255] },
  { name: "easeInBounce", func: easeInBounce, color: [255, 150, 150] },
  { name: "easeOutBounce", func: easeOutBounce, color: [150, 255, 150] },
  { name: "easeInOutBounce", func: easeInOutBounce, color: [150, 150, 255] },
];

function setup() {
  createCanvas(800, 1000);
}

function draw() {
  background(0);

  // Calculate normalized time (0 to 1)
  time = (millis() / 1000) % animationDuration;
  let t = time / animationDuration;

  // Draw grid lines for reference
  stroke(50);
  strokeWeight(1);
  for (let i = 0; i <= width; i += 50) {
    line(i, 0, i, height);
  }

  // Draw start and end markers
  stroke(100);
  strokeWeight(2);
  line(startX, 0, startX, height);
  line(endX, 0, endX, height);

  // Draw each easing function
  for (let i = 0; i < easings.length; i++) {
    let easing = easings[i];
    let y = 30 + i * spacing;

    // Apply easing function to t
    let eased = easing.func(t);

    // Calculate position
    let x = lerp(startX, endX, eased);

    // Draw circle
    fill(easing.color[0], easing.color[1], easing.color[2]);
    noStroke();
    circle(x, y, 20);

    // Draw label
    fill(easing.color[0], easing.color[1], easing.color[2]);
    textAlign(LEFT);
    textSize(10);
    text(easing.name, 10, y + 5);

    // Draw trail/curve visualization
    stroke(easing.color[0] * 0.3, easing.color[1] * 0.3, easing.color[2] * 0.3);
    strokeWeight(1);
    noFill();
    beginShape();
    for (let j = 0; j <= 100; j++) {
      let t2 = j / 100;
      let eased2 = easing.func(t2);
      let x2 = lerp(startX, endX, eased2);
      vertex(x2, y - 15 + eased2 * 10);
    }
    endShape();
  }

  // Draw info text
  fill(255);
  textAlign(LEFT);
  textSize(12);
  text("Easing Functions from easings.net", 10, height - 20);
  text("Time: " + nf(t, 1, 2), width - 150, height - 20);
}
