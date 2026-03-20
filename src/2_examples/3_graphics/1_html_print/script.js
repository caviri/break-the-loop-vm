// Colors for the balls
const colors = ["#ff4200", "#0042ff", "#42ff00", "#ddd", "#000", "#bbb"];

// A3 dimensions
const posterWidth = 842;
const posterHeight = 1191;

function generateComposition() {
  // Clear existing balls
  const existingBalls = document.querySelectorAll(".ball");
  existingBalls.forEach((ball) => ball.remove());

  // Generate new balls
  const numBalls = Math.floor(Math.random() * 15) + 10; // 10-24 balls

  for (let i = 0; i < numBalls; i++) {
    createBall();
  }
}

function createBall() {
  const ball = document.createElement("div");
  ball.className = "ball";

  // Random properties
  const radius = Math.random() * 100 + 10; // 10-50px radius
  const x = Math.random() * (posterWidth - radius * 2) + radius;
  const y = Math.random() * (posterHeight - radius * 2) + radius;
  const color1 = colors[Math.floor(Math.random() * colors.length)];
  const color2 = colors[Math.floor(Math.random() * colors.length)];
  const color3 = colors[Math.floor(Math.random() * colors.length)];
  const color4 = colors[Math.floor(Math.random() * colors.length)];

  // Set ball properties
  ball.style.width = radius * 2 + "px";
  ball.style.height = radius * 2 + "px";
  ball.style.left = x + "px";
  ball.style.top = y + "px";
  ball.style.backgroundColor = color1;

  // Add random gradient effect using CSS
  const gradientX = Math.random() * 100; // 0-100%
  const gradientY = Math.random() * 100; // 0-100%
  const gradientSize = Math.random() * 50 + 50; // 50-100%

  ball.style.background = `radial-gradient(circle at ${gradientX}% ${gradientY}%, ${color1}, ${color2}, ${color3}, ${color4})`;

  // Add to poster
  document.getElementById("poster").appendChild(ball);
}

function lightenColor(color, factor) {
  const hex = color.replace("#", "");
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);

  const newR = Math.min(255, Math.floor(r + (255 - r) * factor));
  const newG = Math.min(255, Math.floor(g + (255 - g) * factor));
  const newB = Math.min(255, Math.floor(b + (255 - b) * factor));

  return `rgb(${newR}, ${newG}, ${newB})`;
}

function printPoster() {
  window.print();
}

// Initialize when page loads
document.addEventListener("DOMContentLoaded", function () {
  // Generate initial composition
  generateComposition();

  // Set up event listeners
  document
    .getElementById("regenerateBtn")
    .addEventListener("click", generateComposition);
  document.getElementById("printBtn").addEventListener("click", printPoster);
});
