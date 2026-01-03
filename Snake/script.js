import Controls from "./js/controls.js"
import Food from "./js/food.js"
import Game from "./js/game.js"
import Snake from "./js/snake.js"
import HighScores from "./js/score.js"

export const GRID_SIZE = 20;
export const CELL_SIZE = 20;
export const INITIAL_SNAKE_LENGTH = 3;
export const GAME_SPEED = 150;

document.addEventListener('DOMContentLoaded', () => {
    const game = new Game();
    new Controls(game);

    let lastUpdate = 0;
    
    function gameLoop(timestamp) {
        if (!game.waitingForDifficulty) {
            const deltaTime = timestamp - lastUpdate;
            const currentSpeed = game.difficulty.getCurrentConfig().speed;
            
            if (deltaTime >= currentSpeed) {
                game.update();
                game.draw();
                lastUpdate = timestamp;
            }
        }
        
        requestAnimationFrame(gameLoop);
    }

    requestAnimationFrame(gameLoop);
});