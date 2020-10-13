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
    0: 0,
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
  // make HTML representation of the grid
  document.getElementById('diagram').innerHTML = makeHTMLofGrid(grid, array)
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
  const size = array.length;
  // have the size of the array to diagram
  const grid = makeGrid(size);

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      // inversion
      if (array[j] > array[i] && j < i) {
        grid[i][j] = 1;
      }
      if (i === j) {
        grid[i][j] = 2;
      }
    }
  }
  return grid;
}

function makeHTMLofGrid(grid, array) {
  let boxes = '';
  grid.forEach((row, i) => {
    const boxRow = row.map(value => makeBox(value)).join('');
    boxes += `<div class="flexRow"> <div class="rowName box"> ${array[i]}</div>${boxRow} </div>`
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