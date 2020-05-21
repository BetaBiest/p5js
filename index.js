function sketchchanger() {
    var choice = document.getElementById('sketch-selector').value;
    console.log(choice);
    var fill = document.getElementById('import');
    console.log(fill);
    document.getElementById('import').setAttribute('src', 'sketches/gol.js');
    noCanvas();
    setup();
}