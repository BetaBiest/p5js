function setup() {
	var canvas = makeCanvas();
	background(100, 140, 210);
}

function draw() {
	drawGrid(10)
	drawGrid(100, 2);
	noStroke();
	fill(255);
	ellipse(mouseX, mouseY, 10, 10);
}

function cleanup() {
	background(80, 140, 210);
	drawGrid();
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
	cleanup();
}

function drawGrid(scale = 100, weight = 1) {
	let scl = scale;
	let hrzlines  = floor(height/scl);
	let vertlines = floor(width/scl);
	let sr = floor(width/height);
	let point = 400;
	
	push();
	translate(window.innerWidth/2, window.innerHeight/2);
	stroke(0, 0, 0, 5);
	strokeWeight(weight);
	// cross for debugging
	//line(-width/2, -height/2, width/2, height/2);
	//line(-width/2, height/2, width/2, -height/2);
	for (let x = -(ceil(vertlines/2)*scl); x < (width/2); x += scl) {
		line(x, (height/2), x, -(height/2));
	}
	for (let y = ceil(hrzlines/2)*scl; y > -(height/2); y -= scl) {
		line(-(width/2), y, (width/2), y);
	}
	pop();	
}