class Coordinate {
    constructor(x = 0., y = 0.) {
        this.x = x;
        this.y = y;
    }
    get() {
        return this.x, this.y;
    }
    set(x, y) {
        this.x = x;
        this.y = y;
    }
}

let i_sc = new Coordinate(); // screencoordinates
let f_wc = new Coordinate(); // worldcoordinates

var f_offset = new p5.Vector(); // screenoffset
var f_offset_mouse = new p5.Vector; // mouse offset

var f_scaleX = 1.;
var f_scaleY = 1.;

function wTs(f_wc, i_sc) { // World to Screenspace

    i_sc.x = int((f_wc.x - f_offset.x) * f_scaleX);
    i_sc.y = int((f_wc.y - f_offset.y) * f_scaleY);

    return i_sc;
}

function sTw(i_sc, f_wc) { // Screen- to Worldspace

    f_wc.x = (i_sc.x / f_scaleX + f_offset.x);
    f_wc.y = (i_sc.y / f_scaleY + f_offset.y);

    return f_wc;
}

function mousePressed() {
    f_offset_mouse.x = mouseX;
    f_offset_mouse.y = mouseY;
}

function mouseDragged() { // Panning
    f_offset.x -= (mouseX - f_offset_mouse.x) / f_scaleX;
    f_offset.y -= (mouseY - f_offset_mouse.y) / f_scaleY;

    f_offset_mouse.x = mouseX;
    f_offset_mouse.y = mouseY;
}

function mouseWheel() { // Zooming
    let mouse_beforezoommed = new Coordinate(mouseX, mouseY);
    mouse_beforezoommed = sTw(mouse_beforezoommed, mouse_beforezoommed);

    if (event.delta < 0) {
        f_scaleX *= 1.02;
        f_scaleY *= 1.02;
    }
    else {
        f_scaleX *= 0.98;
        f_scaleY *= 0.98;
    }

    let mouse_afterzoommed = new Coordinate(mouseX, mouseY);
    mouse_afterzoommed = sTw(mouse_afterzoommed, mouse_afterzoommed);

    f_offset.x += (mouse_beforezoommed.x - mouse_afterzoommed.x);
    f_offset.y += (mouse_beforezoommed.y - mouse_afterzoommed.y);

}



function setup() {
    
	//Window.innerSize is relative to the space allocated by the CSS Sheet
	var canvas = createCanvas(window.innerWidth, window.innerHeight);
	canvas.style('display', 'flex'); //Defines CSS Style
	canvas.parent('sketch-holder'); //Placeholder has to be ID of a <div> in the htmlDoc

    background(100, 140, 210);
    
    stroke(255);
    
    // Places world (0, 0) into screen middle
    f_offset.x = -width/2;
    f_offset.y = -height/2;
}

function draw() {

    background(100, 140, 210);

    // Draw 10 hrz lines
    for (let y = 0.; y <= 100.; y+=10) {
        let s = new Coordinate(0., y);
        let e = new Coordinate(100., y);

        let pixel_s = new Coordinate(0, 0);
        let pixel_e = new Coordinate(0, 0);

        pixel_s = wTs(s, pixel_s);
        pixel_e = wTs(e, pixel_e);

        line(pixel_s.x, pixel_s.y, pixel_e.x, pixel_e.y);
    }

    // Draw 10 vtk lines
    for (let x = 0.; x <= 100.; x+=10) {
        let s = new Coordinate(x, 0.);
        let e = new Coordinate(x, 100.);

        let pixel_s = new Coordinate(0, 0);
        let pixel_e = new Coordinate(0, 0);

        pixel_s = wTs(s, pixel_s);
        pixel_e = wTs(e, pixel_e);

        line(pixel_s.x, pixel_s.y, pixel_e.x, pixel_e.y);
    }

}