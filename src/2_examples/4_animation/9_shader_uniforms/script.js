// Type@Cooper GDBT
// Basic shader example in p5.js

let myShader;

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

uniform float u_time;
uniform vec2 u_resolution;

void main() {
    // Normalize coordinates to 0.0 - 1.0
    vec2 st = gl_FragCoord.xy / u_resolution.xy;

    // Create a simple animated pattern
    // Mix colors based on position and time
    vec3 color1 = vec3(1.0, 0.3, 0.3); // Red
    vec3 color2 = vec3(0.3, 0.3, 1.0); // Blue
    vec3 color3 = vec3(0.3, 1.0, 0.3); // Green

    // Create waves using sin
    float wave1 = sin(st.x * 3.14159 * 2.0 + u_time) * 0.5 + 0.5;
    float wave2 = sin(st.y * 3.14159 * 2.0 + u_time * 0.7) * 0.5 + 0.5;

    // Mix colors based on waves
    vec3 color = mix(color1, color2, wave1);
    color = mix(color, color3, wave2 * 0.5);

    // Add a circular pattern
    vec2 center = vec2(0.5, 0.5);
    float dist = distance(st, center);
    float circle = sin(dist * 10.0 - u_time * 2.0) * 0.5 + 0.5;

    color *= circle * 0.7 + 0.3;

    gl_FragColor = vec4(color, 1.0);
}
`;

function preload() {
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
  // Use the shader
  shader(myShader);

  // Set shader uniforms
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
  text("Basic Shader Example", 10, 30);
  text("Fragment shader creating animated waves", 10, 50);
  text("Time: " + nf(millis() / 1000.0, 1, 2) + "s", 10, 70);
  pop();
}
