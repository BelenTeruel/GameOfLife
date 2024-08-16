
// Empty 2D array 
function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

let grid;
let rows;
let cols;
let resolution = 4;

function setup() {
  createCanvas(700, 700);
  select('#canvas-container').child(canvas);
  
  cols = width / resolution;
  rows = height / resolution;

  resetGrid();
}

function resetGrid() {
  grid = make2DArray(cols, rows);
  
  // fill the initial array with 0 or 1
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = floor(random(2));
    }
  }
}

function draw() {
  background(0); // 0 is black

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
  
      let x = i * resolution;
      let y = j * resolution;

      // fill the cell with white color
      if (grid[i][j] == 1) {
        fill(255);
        stroke(0);
        rect( x, y, resolution-1, resolution-1 );
      }
    }
  }

  let next = make2DArray(cols, rows);
  // Compute next based on grid
  
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let state = grid[i][j];
  
      // Count Live neighbors
      let countN = countNeighbors(grid, i, j);
      
      // Rules
      if (state == 0 && countN == 3) {
        next[i][j] = 1;
      }
      else if (state == 1 && (countN < 2 || countN > 3)) {
        next[i][j] = 0;
      }
      else {
        next[i][j] = state;
      }
    }
  }
  grid = next;
}

function countNeighbors(grid, x, y) {
  let count = 0;
  for (let j = x - 1; j <= x + 1; j++) {
    for (let i = y - 1; i <= y + 1; i++) {
      if (i >= 0 && i < cols && j >= 0 && j < rows && !(i === y && j === x)) {
        count += grid[j][i];
      }
    }
  }
  
  return count;
}


