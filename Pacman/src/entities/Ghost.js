export default class Ghost {
    constructor(name, color, startPosition, board) {
        this.name = name;
        this.color = color;
        this.position = { ...startPosition };
        this.startPosition = { ...startPosition };
        this.board = board;
        this.moveInterval = null;
        this.moveSpeed = 200; // Un peu plus lent que Pacman
        this.mode = 'chase'; // chase ou scatter
    }

    draw() {
        const x = this.position.j * this.board.cellSize + this.board.cellSize / 2;
        const y = this.position.i * this.board.cellSize + this.board.cellSize / 2;
        
        this.board.clearCell(this.position.j, this.position.i);
        
        // Corps du fantôme
        this.board.ctx.beginPath();
        this.board.ctx.arc(x, y, this.board.cellSize / 2 - 2, 0, Math.PI * 2);
        this.board.ctx.fillStyle = this.color;
        this.board.ctx.fill();
        
        // Yeux
        this.board.ctx.fillStyle = 'white';
        this.board.ctx.beginPath();
        this.board.ctx.arc(x - 5, y - 5, 3, 0, Math.PI * 2);
        this.board.ctx.arc(x + 5, y - 5, 3, 0, Math.PI * 2);
        this.board.ctx.fill();
        
        // Pupilles
        this.board.ctx.fillStyle = 'black';
        this.board.ctx.beginPath();
        this.board.ctx.arc(x - 5, y - 5, 1.5, 0, Math.PI * 2);
        this.board.ctx.arc(x + 5, y - 5, 1.5, 0, Math.PI * 2);
        this.board.ctx.fill();
    }

    startMoving(pacmanPos) {
        if (this.moveInterval) {
            clearInterval(this.moveInterval);
        }

        this.moveInterval = setInterval(() => {
            this.move(pacmanPos);
        }, this.moveSpeed);
    }

    move(pacmanPos) {
        const possibleMoves = this.getPossibleMoves();
        let bestMove;

        if (this.mode === 'chase') {
            bestMove = this.findBestMoveTowardsPacman(possibleMoves, pacmanPos);
        } else {
            bestMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
        }

        if (bestMove) {
            this.board.clearCell(this.position.j, this.position.i);
            this.position = bestMove;
            this.draw();
        }
    }

    getPossibleMoves() {
        const directions = [
            { i: -1, j: 0 }, // haut
            { i: 1, j: 0 },  // bas
            { i: 0, j: -1 }, // gauche
            { i: 0, j: 1 }   // droite
        ];

        return directions
            .map(dir => ({
                i: this.position.i + dir.i,
                j: this.position.j + dir.j
            }))
            .filter(pos => !this.board.isWall(pos.i, pos.j));
    }

    findBestMoveTowardsPacman(possibleMoves, pacmanPos) {
        return possibleMoves.reduce((best, move) => {
            const currentDistance = this.getDistance(move, pacmanPos);
            const bestDistance = best ? this.getDistance(best, pacmanPos) : Infinity;
            
            return currentDistance < bestDistance ? move : best;
        }, null);
    }

    getDistance(pos1, pos2) {
        return Math.abs(pos1.i - pos2.i) + Math.abs(pos1.j - pos2.j);
    }

    reset() {
        if (this.moveInterval) {
            clearInterval(this.moveInterval);
        }
        this.position = { ...this.startPosition };
        this.mode = 'chase';
        this.draw();
    }
}