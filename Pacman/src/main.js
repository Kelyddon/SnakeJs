import Game from './Game.js';

// Start the game when the page loads
window.addEventListener('DOMContentLoaded', () => {
    const game = new Game();
    game.start();
});