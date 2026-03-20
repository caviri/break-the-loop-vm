// in this example we use a time uniform to drive an animation with a few of glsl's built in math functions
// you can find more info for GLSL functions online
// i like this page http://www.shaderific.com/glsl-functions/

precision mediump float;

// lets grab texcoords just for fun
varying vec2 vTexCoord;

// our time uniform variable coming from p5
uniform float time;

float rand(vec2 n) {
	return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}

float noise(vec2 p){
	vec2 ip = floor(p);
	vec2 u = fract(p);
	u = u*u*(3.0-2.0*u);

	float res = mix(
		mix(rand(ip),rand(ip+vec2(1.0,0.0)),u.x),
		mix(rand(ip+vec2(0.0,1.0)),rand(ip+vec2(1.0,1.0)),u.x),u.y);
	return res*res;
}

// Function to floor a number if it falls under a certain value
float conditionalFloor(float value, float threshold) {
    return value < threshold ? floor(value) : value;
}


float inc = 0.0;


void main() {

	vec2 uv = vTexCoord;

	float speed = 0.01;
	float slowTime = time * speed;

	// Convert from UV space to polar coordinates (center at (0.5, 0.5))
	vec2 p = uv - 0.5;
	float angle = atan(p.y, p.x); // Angle in polar coordinates
	float radius = length( cos(uv*3. - 1.5) * 1.0 ) ; // Distance from center

	// Apply a smooth function to create the shape of the flower
	float circle = smoothstep(0.1, 1.9, radius ) + slowTime*0.25;
	float offset = sin(circle * 15.0 );

	float gridPattern = mod( offset, 1.0);
	float alpha = gridPattern*2.5;
	if(alpha > 1.0) {
		alpha = 1.0;
	}


	vec4 color = vec4( gridPattern*0.77, 0.26+gridPattern*0.11, 0.16+gridPattern*0.64, gridPattern*1.5 );//+noiseBlue*0.5

	gl_FragColor = color;

}
