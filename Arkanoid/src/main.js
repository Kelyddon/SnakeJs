import { Game } from './game.js';
import { Paddle } from './paddle.js';
import { Ball } from './ball.js';
import { BrickGrid } from './brick.js';
import { CANVAS_WIDTH, CANVAS_HEIGHT } from './constants.js';

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gameCanvas');
    if (!canvas) {
        console.error('Canvas element not found!');
        return;
    }

    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;

    let game = new Game(canvas);
    let paddle = new Paddle(game);
    let ball = new Ball(game, paddle);
    let bricks = new BrickGrid(game);

    function gameLoop() {
        if (!game.isRunning) {
            return;
        }

        if (!game.isPaused) {
            // Clear canvas
            game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);

            // Update game objects
            paddle.move();
            ball.move();
            bricks.checkCollision(ball);

            // Draw everything
            bricks.draw();
            paddle.draw();
            ball.draw();

            // Draw score and instructions
            game.ctx.fillStyle = '#fff';
            game.ctx.font = '20px Arial';
            game.ctx.textAlign = 'left';
            game.ctx.fillText(`Score: ${game.score}`, 10, 30);
            
            if (!ball.isLaunched) {
                game.ctx.textAlign = 'center';
                game.ctx.fillText('Press SPACE to launch the ball', game.canvas.width / 2, game.canvas.height - 50);
            }
        }

        requestAnimationFrame(gameLoop);
    }

    // Event listeners
    document.addEventListener('keydown', (e) => {
        switch (e.key) {
            case 'ArrowLeft':
                paddle.moveLeft = true;
                break;
            case 'ArrowRight':
                paddle.moveRight = true;
                break;
            case ' ':
                if (!game.isRunning) {
                    game.init();
                    paddle = new Paddle(game);
                    ball = new Ball(game, paddle);
                    bricks = new BrickGrid(game);
                    gameLoop();
                } else if (!game.isPaused) {
                    ball.launch();
                } else {
                    game.togglePause();
                }
                break;
        }
    });

    document.addEventListener('keyup', (e) => {
        switch (e.key) {
            case 'ArrowLeft':
                paddle.moveLeft = false;
                break;
            case 'ArrowRight':
                paddle.moveRight = false;
                break;
        }
    });

    // Start the game
    game.init();
    gameLoop();
});