function makeCanvas() {
    var c_parent = document.getElementById('sketch-holder');
    var canvas = createCanvas(c_parent.offsetWidth, c_parent.offsetHeight);
    canvas.parent('sketch-holder'); // Placeholder has to be ID of a <div> in the htmlDoc
    //canvas.style('display', 'flex'); // Defines CSS Style
    
    return canvas;
}

function fitCanvas(canvas) {
    var c_parent = document.getElementById('sketch-holder');
    canvas = resizeCanvas(c_parent.offsetWidth, c_parent.offsetHeight);
    return canvas;
}