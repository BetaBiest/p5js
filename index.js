function sketchchanger() {
    var choice = document.getElementById('sketch-selector').value;
    var link = 'sketches/' + choice;
    document.getElementById('sketch-holder').setAttribute('src', link);
}