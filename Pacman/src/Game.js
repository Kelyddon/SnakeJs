import Board from './Board.js';
import Pacman from './entities/Pacman.js';
import Ghost from './entities/Ghost.js';
import { GHOST_CONFIGS } from './constants.js';

export default class Game {
    constructor() {
        this.board = new Board('gameCanvas');
        this.pacman = new Pacman(this.board);
        this.ghosts = GHOST_CONFIGS.map(config => 
            new Ghost(config.name, config.color, config.position, this.board)
        );
        this.score = 0;
        this.isRunning = false;
        this.setupEventListeners();
    }

    start() {
        this.isRunning = true;
        this.board.drawBoard();
        this.pacman.draw();
        this.pacman.startMoving();
        this.ghosts.forEach(ghost => {
            ghost.draw();
            ghost.startMoving(this.pacman.position);
        });
        this.gameLoop();
    }

    setupEventListeners() {
        document.getElementById('restart').addEventListener('click', () => this.restart());
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));
    }

    handleKeyPress(e) {
        if (!this.isRunning) return;
        
        switch(e.key) {
            case 'ArrowUp':
                this.pacman.setDirection({ x: 0, y: -1 });
                break;
            case 'ArrowDown':
                this.pacman.setDirection({ x: 0, y: 1 });
                break;
            case 'ArrowLeft':
                this.pacman.setDirection({ x: -1, y: 0 });
                break;
            case 'ArrowRight':
                this.pacman.setDirection({ x: 1, y: 0 });
                break;
        }
    }

    gameLoop() {
        if (!this.isRunning) return;

        this.checkCollisions();
        this.updateScore();
        requestAnimationFrame(() => this.gameLoop());
    }

    checkCollisions() {
        // Check ghost collisions
        for (const ghost of this.ghosts) {
            if (this.pacman.position.i === ghost.position.i && 
                this.pacman.position.j === ghost.position.j) {
                this.gameOver(false);
                return;
            }
        }

        // Check if all dots are collected
        if (this.board.isLevelComplete()) {
            this.gameOver(true);
        }
    }

    updateScore() {
        document.getElementById('score').textContent = `Score: ${this.pacman.score}`;
    }

    gameOver(victory) {
        this.isRunning = false;
        if (this.pacman.moveInterval) {
            clearInterval(this.pacman.moveInterval);
        }
        const message = victory ? 'You Win!' : 'Game Over';
        document.getElementById('message').textContent = message;
    }

    restart() {
        this.isRunning = false;
        this.pacman.reset();
        this.ghosts.forEach(ghost => ghost.reset());
        this.board.reset();
        document.getElementById('message').textContent = '';
        this.start();
    }
}