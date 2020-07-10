/*
THE GAME OF LIFE
1. Any live cell with fewer than two live neighbours dies, as if by underpopulation.
2. Any live cell with two or three live neighbours lives on to the next generation.
3. Any live cell with more than three live neighbours dies, as if by overpopulation.
4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
*/

let w;
let h;
let next;
let play = false;

function setup() {
  createCanvas(400, 400);
  frameRate(30);
  w = width / 20;
  h = height / 20;
}

function rollover() {
  stroke(255, 0, 0);
  fill(255, 192, 203,100);
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
      frameRate(4);
    } else {
      play = false
      frameRate(30);
    }
  }
}

function liveNeighbours(row, col) {
  let live = 0;
  
  if (row != 0) {
    if (col != 0) {live += board[row-1][col-1]}
    live += board[row-1][col];
    if (col != 19) {live += board[row-1][col+1]}
  }
  
  if (col != 0) {live += board[row][col-1]}
  if (col != 19) {live += board[row][col+1]}
  
  if (row != 19) {
    if (col != 0) {live += board[row+1][col-1]}
    live += board[row+1][col];
    if (col != 19) {live += board[row+1][col+1]}
  }
  
  return live;
}

function draw() {
  background(255);
  for (let row = 0; row < 20; row++) {
    for (let col = 0; col < 20; col++) {
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
    next = [];
    for (let i = 0; i < 20; i++) {next.push(board[i].slice())}
    for (let row = 0; row < 20; row++) {
      for (let col = 0; col < 20; col++) {
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
    for (let i = 0; i < 20; i++) {board.push(next[i].slice())}
  }
}