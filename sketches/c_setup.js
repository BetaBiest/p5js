function makeCanvas() {
    //var c_parent = document.getElementById('sketch-holder');
    var canvas = createCanvas(window.innerWidth, window.innerHeight);
    canvas.parent('sketch-holder'); // Placeholder has to be ID of a <div> in the htmlDoc
    //canvas.style('display', 'flex'); // Defines CSS Style
    
    return canvas;
}

function fitCanvas(canvas) {
    //var c_parent = document.getElementById('sketch-holder');
    canvas = resizeCanvas(window.innerWidth, window.innerHeight);
    return canvas;
}