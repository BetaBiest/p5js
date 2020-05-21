var grid;
let size = {"cols": 0, "rows": 0};
let scl = 10; //Boxsize in pixel
let range = 1;


function make2DArray(cols, rows) {
    let arr = new Array(cols);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows);
    }
    return arr;
}   

function calcNumOfCnR(size, scl) {
    size.cols = floor(width / scl);
    size.rows = floor(height / scl);
    return size;
}

function countNeighbours(grid, x, y, cntRange = 1) {
    let sum = 0;

    for (let xOffset = -cntRange; xOffset <= cntRange; xOffset++) {
        for (let yOffset = -cntRange; yOffset <= cntRange; yOffset++) {
            let xcount = x+xOffset;
            let ycount = y+yOffset;
            // for left border-crossing change x to...
            if (xcount < 0)                  {xcount = grid.length + (x+xOffset)}
            // for right border-crossing change x to...
            if (xcount > grid.length-1)      {xcount = (x+xOffset) - (grid.length)}
            // for top border-crossing change y to...
            if (ycount < 0)                  {ycount = grid[x].length + (y+yOffset)}
            // for lower border-crossing change y to...
            if (ycount > grid[x].length-1)   {ycount = (y+yOffset) - (grid[x].length)}

            sum += grid[xcount][ycount];
        }
    }    

    sum -= grid[x][y];
    return sum;
}



function setup() {
    var canvas = makeCanvas();

    background(100, 140, 210);

    size = calcNumOfCnR(size, scl);
    
    grid = make2DArray(size.cols, size.rows);

    for (let x = 0; x < size.cols; x++){
        for (let y = 0; y < size.rows; y++) {
            grid[x][y] = floor(random(2));
        }
    }
    
}

function windowResized() {
    fitCanvas(canvas);
    background(100, 140, 210);
    calcNumOfCnR(size, scl);
    grid = make2DArray(size.cols, size.rows);
    for (let x in grid){
        for (let y = 0; y < size.rows; y++) {
            grid[x][y] = floor(random(2));
        }
    }
}

function draw() {
    background(100, 140, 210);

    for (let x = 0; x < size.cols; x++) {
        for (let y = 0; y < size.rows; y++) {
            let xpos = x*scl;
            let ypos = y*scl;
            if (grid[x][y] == 1) {
                fill(255);noStroke();
                rect(xpos, ypos, scl - 1, scl - 1);
            } 
        }
    }

    let next = make2DArray(size.cols, size.rows);

    // Compute next Gen
    for (let x = 0; x < size.cols; x++) {
        for (let y = 0; y < size.rows; y++) {

            // Count neighbours in predefined range (1 == 3x3 field)
            let neighbours = countNeighbours(grid, x, y, range);

            // Ruleset for GoL
            let state = grid[x][y];
            if (state == 0 && neighbours == 3) next[x][y] = 1;
            else if (state == 1 && (neighbours < 2 || neighbours > 3)) next[x][y] = 0;
            else next[x][y] = state;
        }
    }


    grid = next;
}