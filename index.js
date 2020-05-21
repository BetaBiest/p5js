function sketchchanger() {
    var choice = document.getElementById('sketch-selector').value;
    console.log(choice);
    var link = 'sketches/' + choice;
    console.log(link);
    document.getElementById('sketch-holder').setAttribute('src', link);
}