let t_data;
var total = 0;
var entries;
var y_max = 0;
let data_m, data_w;
var y_lengh;
var y_spacing;
var x_lengh;
var x_spacing;

function preload() {
    console.log('load Table');
    t_data = loadTable('data/dt_selbstmorde_nachAlter2.csv', 'ssv', 'header');
    console.log('load complete');
}

function setup() {
    cavas = makeCanvas();
    console.log('START');
    //count the columns
    console.log(t_data.getRowCount() + ' total rows in table');
    console.log(t_data.getColumnCount() + ' total columns in table');

    //print(t_data.getColumn('name'));
    //["Goat", "Leopard", "Zebra"]

    //cycle through the table
    // for (let r = 0; r < t_data.getRowCount(); r++)
    //     for (let c = 0; c < t_data.getColumnCount(); c++) {
    //     print(t_data.getString(r, c));
    // }
    console.log('END');

    // Stats
    entries = t_data.getRowCount('w');
    data_m = t_data.getColumn('m');
    for (let i = 0; i < entries; i++) {
        if (int(data_m[i]) > y_max) y_max = int(data_m[i]);
        total += int(data_m[i]);
    }
    data_w = t_data.getColumn('w');
    for (let i = 0; i < entries; i++) {
        if (int(data_w[i]) > y_max) y_max = int(data_w[i]);
        total += int(data_w[i]);
    }
    y_max = (floor(y_max/100) + 1) * 100;
    y_lengh = height - 100;
    y_spacing = 100;
    x_lengh = width - 100;
    x_spacing = floor(x_lengh/entries);

    // Translate
    push();
    translate(50, height - 50);
    scale (1, -1);
    line(0, 0, width - 100, 0); // X-Achse
    for (let i = 0; i < x_lengh; i+=x_spacing) {
        line(i, -4, i, +4);
    }
    // TODO Achsenbeschriftungen
    line(0, 0, 0, height - 100); // Y-Achse
    for (let i = 0; i <= y_max; i+=y_spacing) {
        let y = map(i, 0, y_max, 0, y_lengh);
        line(-4, y, +4, y);
    }

    pop();
}

function draw() {

}