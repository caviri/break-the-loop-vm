// Type@Cooper GDBT
// Shader using image input and mapping brightness to colorful gradient

let myShader;
let img;

// Default vertex shader (required for p5.js)
const vertDefault = `
attribute vec3 aPosition;
attribute vec2 aTexCoord;

varying vec2 vTexCoord;

void main() {
  vTexCoord = aTexCoord;
  vec4 positionVec4 = vec4(aPosition, 1.0);
  positionVec4.xy = positionVec4.xy * 2.0 - 1.0;
  gl_Position = positionVec4;
}
`;

// Fragment shader code
const fragmentShader = `
#ifdef GL_ES
precision mediump float;
#endif

varying vec2 vTexCoord;

uniform sampler2D u_texture;
uniform float u_time;
uniform vec2 u_resolution;

// Function to map brightness to a colorful gradient
vec3 brightnessToGradient(float brightness) {
  // Create a rainbow-like gradient based on brightness
  // Map brightness (0.0 - 1.0) to a color spectrum

  // Clamp brightness to 0-1
  brightness = clamp(brightness, 0.0, 1.0);

  vec3 color;

  // Create gradient through colors: purple -> blue -> cyan -> green -> yellow -> red
  if (brightness < 0.166) {
    // Purple to blue
    float t = brightness / 0.166;
    color = mix(vec3(0.5, 0.0, 0.8), vec3(0.0, 0.2, 1.0), t);
  } else if (brightness < 0.333) {
    // Blue to cyan
    float t = (brightness - 0.166) / 0.166;
    color = mix(vec3(0.0, 0.2, 1.0), vec3(0.0, 1.0, 1.0), t);
  } else if (brightness < 0.5) {
    // Cyan to green
    float t = (brightness - 0.333) / 0.166;
    color = mix(vec3(0.0, 1.0, 1.0), vec3(0.0, 1.0, 0.5), t);
  } else if (brightness < 0.666) {
    // Green to yellow
    float t = (brightness - 0.5) / 0.166;
    color = mix(vec3(0.0, 1.0, 0.5), vec3(1.0, 1.0, 0.0), t);
  } else if (brightness < 0.833) {
    // Yellow to orange
    float t = (brightness - 0.666) / 0.166;
    color = mix(vec3(1.0, 1.0, 0.0), vec3(1.0, 0.5, 0.0), t);
  } else {
    // Orange to red
    float t = (brightness - 0.833) / 0.166;
    color = mix(vec3(1.0, 0.5, 0.0), vec3(1.0, 0.0, 0.0), t);
  }

  return color;
}

void main() {
    // Get UV coordinates (flip Y for p5.js)
    vec2 uv = vTexCoord;
    uv.y = 1.0 - uv.y;

    // Sample the texture
    vec4 texColor = texture2D(u_texture, uv);

    // Calculate brightness using luminance formula
    // Standard luminance weights: R*0.299 + G*0.587 + B*0.114
    float brightness = dot(texColor.rgb, vec3(0.299, 0.587, 0.114));

    // Map brightness to colorful gradient
    vec3 color = brightnessToGradient(brightness);

    // Optional: Add some animation to the gradient
    // color = mix(color, brightnessToGradient(brightness + sin(u_time * 0.5) * 0.1), 0.3);

    gl_FragColor = vec4(color, 1.0);
}
`;

function preload() {
  // Load the image
  img = loadImage("flower.png");

  // Create shader from code
  myShader = createShader(vertDefault, fragmentShader);
}

function setup() {
  // Use WEBGL mode for shaders
  createCanvas(800, 600, WEBGL);

  // Disable default stroke
  noStroke();
}

function draw() {
  background(0);

  // Use the shader
  shader(myShader);

  // Set shader uniforms
  myShader.setUniform("u_texture", img);
  myShader.setUniform("u_time", millis() / 1000.0);
  myShader.setUniform("u_resolution", [width, height]);

  // Draw a rectangle that covers the entire canvas
  // The shader will be applied to this rectangle
  rect(0, 0, width, height);

  // Draw info text (using 2D overlay)
  push();
  // Reset to 2D mode for text
  resetMatrix();
  camera();

  fill(255);
  textAlign(LEFT);
  textSize(14);
  text("Shader Image Example", 10, 30);
  text("Brightness mapped to colorful gradient", 10, 50);
  text("Time: " + nf(millis() / 1000.0, 1, 2) + "s", 10, 70);
  pop();
}
