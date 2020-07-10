"""
THE GAME OF LIFE - pdemicheli
1. Any live cell with fewer than two live neighbours dies, as if by underpopulation.
2. Any live cell with two or three live neighbours lives on to the next generation.
3. Any live cell with more than three live neighbours dies, as if by overpopulation.
4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

Left click - change cell state
Spacebar - toggle play

Change fr, size or cells
"""

import pygame
import time
pygame.init()

def rollover():
    mouseX,mouseY = pygame.mouse.get_pos()
    pygame.draw.rect(screen,(255,0,0),(mouseX//w*w,mouseY//h*h,w,h),3)
    pygame.draw.rect(screen,(255,192,203),(mouseX//w*w,mouseY//h*h,w,h))
    # Border (255,0,0)
    # Fill with (255, 192, 203,100)

def liveNeighbours(row,col):
    live = 0

    live += board[(row-1+cells)%cells][(col-1+cells)%cells]
    live += board[(row-1+cells)%cells][col]
    live += board[(row-1+cells)%cells][(col+1+cells)%cells]

    live += board[row][(col-1+cells)%cells]
    live += board[row][(col+1+cells)%cells]

    live += board[(row+1+cells)%cells][(col-1+cells)%cells]
    live += board[(row+1+cells)%cells][col]
    live += board[(row+1+cells)%cells][(col+1+cells)%cells]

    return live

fr = 40 # Frame rate (FPS)
size = width,height = 600,600 # Dimensions
cells = 20 # Cells per side

board = [[0 for i in range(cells)] for j in range(cells)]
screen = pygame.display.set_mode(size)
w = width//cells
h = height//cells
nxt = []
play = False


while True:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            exit()
        elif event.type == pygame.MOUSEBUTTONDOWN:
            if play == False:
                mouseX,mouseY = pygame.mouse.get_pos()
                row = mouseY//h
                col = mouseX//w

                if board[row][col] == 0: board[row][col] = 1
                else: board[row][col] = 0
        elif event.type == pygame.KEYDOWN:
            if event.key == pygame.K_SPACE:
                play = not play


    screen.fill((255,255,255))
    for row in range(len(board)):
        for col in range(len(board)):
            if board[row][col] == 1:
                pygame.draw.rect(screen,(0,0,0),(col*w,row*h,w,h))
                # Fill with (0,0,0)
                # No border


    if play == False:
        rollover()
    else:
        nxt = [a.copy() for a in board]
        for row in range(len(board)):
            for col in range(len(board)):
                live = liveNeighbours(row,col)
                if board[row][col] == 1:
                    if live < 2: nxt[row][col] = 0
                    elif live > 3: nxt[row][col] = 0
                else:
                    if live == 3: nxt[row][col] = 1
        board = [a.copy() for a in nxt]
        time.sleep(1/fr)

    pygame.display.flip()

    
