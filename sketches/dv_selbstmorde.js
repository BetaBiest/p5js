/* Todesursachen:
Die ausgewählten Todesursachen ermöglichen einen zeitlichen
Vergleich nach der Umstellung der ICD-Systematik(1980-1997
ICD9, ab 1998 ICD-10).
"Insgesamt" enthält die Angaben zu allen Gestorbenen eines
Berichtsjahres.
Die enthaltenen Daten betrachten nur einen Ausschnitt der oben genannten */

let t_data;
var total = 0;
var entries;
var y_max = 0;
let data_m, data_w, x_lables;
var y_length;
var y_spacing;
var x_length;
var x_spacing;

function preload() {
    // console.log('load Table');
    t_data = loadTable('data/dt_selbstmorde_nachAlter2.csv', 'ssv', 'header');
    // console.log('load complete');
}

function readdata() {
    entries = t_data.getRowCount('w');
    data_m = t_data.getColumn('m');
    data_w = t_data.getColumn('w');
    x_lables = t_data.getColumn('Age');

    // Find maximal value for Y
    y_max = 0;
        // Male entries
    for (let i = 0; i < entries; i++) {
        if (int(data_m[i]) > y_max) y_max = int(data_m[i]);
        total += int(data_m[i]);
    }
        // Female entries
    for (let i = 0; i < entries; i++) {
        if (int(data_w[i]) > y_max) y_max = int(data_w[i]);
        total += int(data_w[i]);
    }
    
    y_max = (floor(y_max/100) + 1) * 100;
}

function drawGraph() {
    background(255);
    y_length = window.innerHeight - 100;
    y_spacing = 100;
    x_length = window.innerWidth - 100;
    x_spacing = floor(x_length/entries+1);

    // Translate
    push();
    translate(50, window.innerHeight - 50);
    scale (1, -1);

    // X-Achse
    for (let x = 0, l = 0; x < x_length; x+=x_spacing, l++) {
        stroke(0);
        line(x, -4, x, +4);
        stroke('rgba(0,0,0,0.15)');
        line(x, 0, x, y_length);
        noStroke();
        scale (1, -1); // Scale is needed so the text isn´t upside down
        textAlign(CENTER, TOP);
        text(x_lables[l], x, 10);
        scale (1, -1);
    }
    fill(0);
    stroke(0);
    line(0, 0, window.innerWidth - 100, 0);
    triangle(x_length, -4, x_length, 4, x_length + 6, 0);
    
    // Y-Achse
    for (let i = 0; i <= y_max; i+=y_spacing) {
        let y = map(i, 0, y_max, 0, y_length);
        stroke(0);
        line(-4, y, +4, y);
        stroke('rgba(0,0,0,0.25)');
        line(0, y, x_length, y);
        noStroke();
        scale (1, -1);
        textAlign(RIGHT, CENTER);
        let y_invert = map(y, 0, y_length, 0, -y_length);
        text(i, -10, y_invert); // Y needs to be inverted because of scale
        scale (1, -1);
    }
    fill(0);
    stroke(0);
    line(0, 0, 0, height - 100);
    triangle(-4, y_length, 4, y_length, 0, y_length + 6);

    // Description
    scale (1, -1);

        // Title
    let text_x = x_length/2;
    let text_y = map(y_length+25, 0, y_length, 0, -y_length);
    noStroke();
    textSize(14);
    textAlign(CENTER, CENTER);
    text('Germany 2018: Suicide by Age and Gender', text_x, text_y);

        // Source
    text_x = x_length + 45;
    text_y = map(-45, 0, y_length, 0, -y_length);
    noStroke();
    textSize(11);
    textAlign(RIGHT, BOTTOM);
    text('© Statistisches Bundesamt (Destatis), 2020', text_x, text_y);

        // Axes
    text_x = x_length + 10;
    textAlign(LEFT, TOP);
    text('Age', text_x, 0);
    text_y = -y_length - 10;
    textAlign(RIGHT, BOTTOM);
    text('Suicides', 0, text_y);

        // Graph
    text_x = x_length - x_spacing;
    text_y = -(map(data_m[entries-1], 0, y_max, 0, y_length));
    textAlign(LEFT, BOTTOM);
    fill(0,0,255);
    text('Men', text_x, text_y);

    text_x = x_length - x_spacing;
    text_y = -(map(data_w[entries-1], 0, y_max, 0, y_length));
    textAlign(LEFT, BOTTOM);
    fill(255,0,0);
    text('Women', text_x, text_y);

    fill(0,0,0)
    scale (1, -1);

    // Insert data
    for (let i = 1, x_pos = x_spacing; i < entries; i++, x_pos+=x_spacing) {
        // Male: blue line
        stroke(0,0,255);
        line(x_pos - x_spacing, map(data_m[i - 1], 0, y_max, 0, y_length),
            x_pos, map(data_m[i], 0, y_max, 0, y_length));
        // Female: red line
        stroke(255,0,0);
        line(x_pos - x_spacing, map(data_w[i - 1], 0, y_max, 0, y_length),
            x_pos, map(data_w[i], 0, y_max, 0, y_length));
    }
    pop();
}

function windowResized() {
    resizeCanvas(window.innerWidth, window.innerHeight);
    drawGraph();
}

function setup() {
    cavas = makeCanvas();

    readdata();
    drawGraph();
}