const rInput = document.getElementById('rInput');
rInput.addEventListener('input', rInputGetter);

function rInputGetter() {
  const rInputRaw = rInput.value;
  const rotheArray = stringToPermutation(rInputRaw)
  // draw the boxes for the Rothe diagram
  drawDiagram(rotheArray);
}

function stringToPermutation(string) {
  const mapping = {
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    a: 11,
    b: 12,
    c: 13,
    d: 14,
    f: 15,
    g: 16,
    h: 17,
    i: 18,
    j: 19,
    k: 20,
    l: 21,
    m: 22,
    n: 23,
    o: 24,
    p: 25,
    q: 26,
    r: 27,
    s: 28,
    t: 29,
    u: 30,
    v: 31,
    w: 32,
    x: 33,
    y: 34,
    z: 35,
  }

  // given a string
  // return a permutation 
  let permutation = '';
  const memo = {};
  for (let i = 0; i < string.length; i++) {
    const char = string[i];
    if (memo[char] === undefined && 
     mapping[char] !== undefined) {
      memo[char] = true;
      permutation += char;
    }
  }
  // display the spermutation being diagrammed
  setPermutationDisplay(permutation);

  const arr = [];
  //
  for (let i = 0; i < permutation.length; i++) {
    const char = permutation[i];
    if (mapping[char] !== undefined) {
      arr.push(mapping[char]);
    }
  }
  return arr;
}

function setPermutationDisplay(string) {
  document.getElementById('permutationDisplay').innerText = string;
}

function drawDiagram(array) {
  const grid = fillGrid(array);
  console.log(grid);
  makeHTMLofGrid(grid)
  // make HTML representation of the grid
  document.getElementById('diagram').innerHTML = makeHTMLofGrid(grid)
}

// make an n x n array of arrays
function makeGrid(n) {
  const array = [];
  for (let i = 0; i < n; i++) {
    const row = [];
    for (let j = 0; j < n; j++) {
      row.push(0);
    }
    array.push(row);
  }
  return array;
}

// given an array, make a roth diagram
function fillGrid(array) {
  const size = Math.max(...array);
  // have the size of the array to diagram
  const grid = makeGrid(size);
  // fill the array to make a Rothe diagram with the array
  // as here: http://www.mathe2.uni-bayreuth.de/frib/KERBER/h00/node29.html
  for (let i = 0; i < size; i++) {
    const row = grid[i];
    for (let j = 0; j < size; j++) {
      const box = row[j];
      const compareTo = array[j];
      // superimpose Lehr diagram
      if (i < compareTo - 1 && array[i] <= compareTo + 1) {
        grid[i][j] = 1;
      } 
      else if (i === compareTo - 1) {
        grid[i][j] = 2;
      }
    }
  }
  return grid;
}

function makeHTMLofGrid(grid) {
  let boxes = '';
  grid.forEach(row => {
    const boxRow = row.map(value => makeBox(value)).join('');
    boxes += `<div class=flexRow> ${boxRow} </div>`
  })
  return `<div class="flexColumn"> ${boxes} </div>`;
}

function makeBox(value) {
  let color = "grey";
  if (value === 2) {
    color = "black";
  }
  if (value === 1) {
    color = "red";
  }
  return `<div class="${color} box"></div>`
}