export default class Pacman {
    constructor(board) {
        this.board = board;
        this.position = { i: 1, j: 1 };
        this.score = 0;
        this.currentDirection = { x: 0, y: 0 };
        this.moveInterval = null;
        this.moveSpeed = 150; // Vitesse de déplacement en millisecondes
    }

    draw() {
        const x = this.position.j * this.board.cellSize + this.board.cellSize / 2;
        const y = this.position.i * this.board.cellSize + this.board.cellSize / 2;
        
        this.board.clearCell(this.position.j, this.position.i);
        
        this.board.ctx.beginPath();
        this.board.ctx.arc(x, y, this.board.cellSize / 2 - 2, 0, Math.PI * 2);
        this.board.ctx.fillStyle = 'yellow';
        this.board.ctx.fill();
        this.board.ctx.closePath();
    }

    startMoving() {
        if (this.moveInterval) {
            clearInterval(this.moveInterval);
        }
        
        this.moveInterval = setInterval(() => {
            this.continuousMove();
        }, this.moveSpeed);
    }

    continuousMove() {
        if (this.currentDirection.x === 0 && this.currentDirection.y === 0) return;

        const newPos = {
            i: this.position.i + this.currentDirection.y,
            j: this.position.j + this.currentDirection.x
        };

        if (!this.board.isWall(newPos.i, newPos.j)) {
            this.board.clearCell(this.position.j, this.position.i);
            
            if (this.board.isDot(newPos.i, newPos.j)) {
                this.score += 10;
                this.board.removeDot(newPos.i, newPos.j);
            }
            
            this.position = newPos;
            this.draw();
        }
    }

    setDirection(direction) {
        this.currentDirection = direction;
    }

    reset() {
        if (this.moveInterval) {
            clearInterval(this.moveInterval);
        }
        this.position = { i: 1, j: 1 };
        this.score = 0;
        this.currentDirection = { x: 0, y: 0 };
        this.draw();
        this.startMoving();
    }
}