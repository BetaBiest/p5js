let t_data;

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
    var total;
    var max;

    // Translate
    push();
    translate(50, height - 50);
    scale (1, -1);
    line(0, 0, width - 100, 0); // X-Achse
    line(0, 0, 0, height - 100); // Y-Achse
    pop();
}

function draw() {

}