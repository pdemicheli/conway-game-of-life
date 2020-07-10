# README

Conway's Game of Life is a system in which four main rules are followed:
1. Any live cell with fewer than two live neighbours dies, as if by underpopulation.
2. Any live cell with two or three live neighbours lives on to the next generation.
3. Any live cell with more than three live neighbours dies, as if by overpopulation.
4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

The user selects which cells are alive and which are dead at the start, then the game will being once play is toggled. In all versions of the program, the below keyboard controls are used:
1. Left click - change cell state
2. Spacebar - toggle play

More detailed explanation - https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life

I wrote the code to this program in two languages: **JavaScript** (using the **p5.js** framework) and **Python 3** (using the **Pygame** library).
The JS directory has 2 different versions of the game: *conway-limited* (all border cells are permanently dead) and *conway-wrap* (cells wrap around to the other side of the board).
The Py3 directory has only 1 version, equivalent to the *conway-wrap* in the JS directory.
At the top of each file 3 variables are listed that can be changed in order to affect the size, speed and dimensions of the program.
