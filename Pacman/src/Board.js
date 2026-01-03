import { BOARD_LAYOUT, CELL_SIZE } from './constants.js';

export default class Board {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.layout = JSON.parse(JSON.stringify(BOARD_LAYOUT));
        this.cellSize = CELL_SIZE;
    }

    drawBoard() {
        this.layout.forEach((row, i) => {
            row.forEach((cell, j) => {
                if (cell === 1) {
                    this.drawWall(j, i);
                } else if (cell === 2) {
                    this.drawDot(j, i);
                }
            });
        });
    }

    drawWall(x, y) {
        this.ctx.fillStyle = 'blue';
        this.ctx.fillRect(
            x * this.cellSize,
            y * this.cellSize,
            this.cellSize,
            this.cellSize
        );
    }

    drawDot(x, y) {
        this.ctx.fillStyle = 'white';
        const dotSize = 4;
        this.ctx.beginPath();
        this.ctx.arc(
            x * this.cellSize + this.cellSize / 2,
            y * this.cellSize + this.cellSize / 2,
            dotSize,
            0,
            Math.PI * 2
        );
        this.ctx.fill();
    }

    clearCell(x, y) {
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(
            x * this.cellSize,
            y * this.cellSize,
            this.cellSize,
            this.cellSize
        );
    }

    isWall(i, j) {
        return this.layout[i]?.[j] === 1; 
    }

    isDot(i, j) {
        return this.layout[i]?.[j] === 2;
    }

    removeDot(i, j) {
        if (this.isDot(i, j)) {
            this.layout[i][j] = 0;
            this.clearCell(j, i);
        }
    }

    isLevelComplete() {
        return !this.layout.some(row => row.includes(2));
    }

    reset() {
        this.layout = JSON.parse(JSON.stringify(BOARD_LAYOUT));
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawBoard();
    }
}