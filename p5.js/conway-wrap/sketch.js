/*
THE GAME OF LIFE - pdemicheli
1. Any live cell with fewer than two live neighbours dies, as if by underpopulation.
2. Any live cell with two or three live neighbours lives on to the next generation.
3. Any live cell with more than three live neighbours dies, as if by overpopulation.
4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

Left click - change cell state
Spacebar - toggle play

Change fr, canvas dimensions & size
*/

let w;
let h;
let next;
let board = [];
let size = 20;
let play = false;
let fr; // FPS

function setup() {
  createCanvas(500, 500);
  frameRate(30);
  w = width / size;
  h = height / size;
  fr = createSlider(1,40,4,0.1);
  fr.style('width', str(width)+'px');

  for (let row = 0; row < size; row++) {
    let temp = []
    for (let col = 0; col < size; col++) {
      temp.push(0);
    }
    board.push(temp);
  }
}

function rollover() {
  stroke(255, 0, 0);
  fill(255, 192, 203, 100);
  rect(floor(mouseX / w) * w, floor(mouseY / h) * h, w, h);
}

function mousePressed() {
  if (play == false) {
    let row = floor(mouseY / h);
    let col = floor(mouseX / w);

    if (board[row][col] == 0) {
      board[row][col] = 1;
    } else {
      board[row][col] = 0;
    }
  }
}

function keyPressed() {
  if (keyCode === 32) {
    if (play == false) {
      play = true;
    } else {
      play = false
      frameRate(30);
    }
  }
}

function liveNeighbours(row, col) {
  let live = 0;

  live += board[(row - 1 + size) % size][(col - 1 + size) % size];
  live += board[(row - 1 + size) % size][col];
  live += board[(row - 1 + size) % size][(col + 1 + size) % size];

  live += board[row][(col - 1 + size) % size];
  live += board[row][(col + 1 + size) % size];

  live += board[(row + 1 + size) % size][(col - 1 + size) % size];
  live += board[(row + 1 + size) % size][col];
  live += board[(row + 1 + size) % size][(col + 1 + size) % size];

  return live;
}

function draw() {
  background(255);
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (board[row][col] == 1) {
        noStroke();
        fill(0);
        rect(col * w, row * h, w, h);
      }
    }
  }
  if (play == false) {
    rollover();
  } else {
    frameRate(fr.value());
    next = [];
    for (let i = 0; i < size; i++) {
      next.push(board[i].slice())
    }
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        let live = liveNeighbours(row, col);
        if (board[row][col] == 1) {
          // Alive
          if (live < 2) {
            next[row][col] = 0
          } else if (live > 3) {
            next[row][col] = 0
          }
        } else {
          // Dead
          if (live == 3) {
            next[row][col] = 1
          }
        }
      }
    }

    board = [];
    for (let i = 0; i < size; i++) {
      board.push(next[i].slice())
    }
  }
}
