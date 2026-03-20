function setup() {
	createCanvas(windowWidth, windowHeight)
	background(120, 30, 30)
}

function draw() {
	background(0, 0, 255, 5)

	ellipse(mouseX, mouseY, 100, 100)
	text("hi", random(width), random(height))
}

function mousePressed() {
	fill(random(255), random(255), random(255))
}
