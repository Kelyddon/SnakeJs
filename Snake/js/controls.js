/*
  Classe Controls - Gestion des contrôles du jeu
  Configuration des contrôles clavier
  Configuration des boutons tactiles
  Gestion des changements de direction
 */
export default class Controls {
    constructor(game) {
        this.game = game;
        this.setupKeyboardControls();
        this.setupButtonControls();
    }
    
    // Configuration des contrôles clavier
    setupKeyboardControls() {
        document.addEventListener('keydown', (event) => {
            const keyDirections = {
                'ArrowUp': 'UP',
                'ArrowDown': 'DOWN',
                'ArrowLeft': 'LEFT',
                'ArrowRight': 'RIGHT'
            };

            const newDirection = keyDirections[event.key];
            if (newDirection) {
                this.changeDirection(newDirection);
            }
        });
    }
    
    // Configuration des boutons tactiles
    setupButtonControls() {
        document.getElementById('upBtn').addEventListener('click', () => this.changeDirection('UP'));
        document.getElementById('downBtn').addEventListener('click', () => this.changeDirection('DOWN'));
        document.getElementById('leftBtn').addEventListener('click', () => this.changeDirection('LEFT'));
        document.getElementById('rightBtn').addEventListener('click', () => this.changeDirection('RIGHT'));
        
        document.getElementById('restartBtn').addEventListener('click', () => {
            this.game.restart();
        });
    }
    
    // Changement de direction avec vérification des opposés
    changeDirection(newDirection) {
        const opposites = {
            'UP': 'DOWN',
            'DOWN': 'UP',
            'LEFT': 'RIGHT',
            'RIGHT': 'LEFT'
        };

        if (opposites[newDirection] !== this.game.snake.direction) {
            this.game.snake.direction = newDirection;
        }
    }
}