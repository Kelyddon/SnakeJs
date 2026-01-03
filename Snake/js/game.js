import {GRID_SIZE, CELL_SIZE} from "../script.js"
import Snake from "./snake.js"
import Food from "./food.js"
import HighScores from "./score.js"
import GameAlert from "./alert.js"
import Difficulty from "./difficulty.js"
/*
  Classe Game - Contrôleur principal du jeu
  Initialisation du jeu
  Gestion de la boucle de jeu
  Mise à jour de l'état du jeu
  Gestion des collisions et du score
 */
export default class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        
        this.canvas.width = GRID_SIZE * CELL_SIZE;
        this.canvas.height = GRID_SIZE * CELL_SIZE;
        
        this.initializeGame();//Element du jeu
        this.initializeGameElements();// Evenement du jeu
    }
    
    // Initialise les éléments interactifs du jeu (événements liés aux boutons, etc.)
    initializeGame() {
        this.difficulty = new Difficulty();
        this.snake = new Snake(this.difficulty);//Modification du snake selon la difficulté
        this.food = new Food(this.snake);
        this.score = 0;
        this.isGameOver = false;
        this.isPaused = false;
        this.waitingForDifficulty = true;//Attend le choix de la difficulté
        
        this.scoreElement = document.getElementById('score');
        this.restartBtn = document.getElementById('restartBtn');
        
        this.highScores = new HighScores();
        this.alert = new GameAlert();
    }

    initializeGameElements() {
        this.restartBtn.addEventListener('click', () => this.restart());

        window.addEventListener('difficultyChange', () => {
            this.waitingForDifficulty = false;
        });
    }
    
    // Fonction appelée à chaque mise à jour du jeu (à chaque frame)
    update() {
        //Terminer, en pause ou en attente de la difficulté, rien ne se produit
        if (this.isGameOver || this.isPaused || this.waitingForDifficulty) return;

        if (this.snake.checkCollision()) {
            this.gameOver();
            return;
        }

        this.snake.move();

        const head = this.snake.body[0];
        // Vérifie si la tête du serpent est sur la même case que la nourriture
        if (head.x === this.food.position.x && head.y === this.food.position.y) {
            this.snake.grow();
            this.food = new Food(this.snake);
            this.score += 10;
            this.scoreElement.textContent = `Score: ${this.score}`;
        }
    }
    
     // Fonction appelée pour dessiner l'état actuel du jeu
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.snake.draw(this.ctx);
        this.food.draw(this.ctx);
    }
    
    // Fonction qui est appelée quand le jeu est terminé
    gameOver() {
        this.isGameOver = true;
        this.waitingForDifficulty = true;
        this.restartBtn.classList.remove('hidden');
        this.highScores.addScore(this.score);
        this.alert.show(`Game Over! Score final : ${this.score}`);
    }
    
    // Fonction qui redémarre le jeu
    restart() {
        this.restartBtn.classList.add('hidden');
        this.difficulty.reset();
        this.snake = new Snake(this.difficulty);
        this.food = new Food(this.snake);
        this.score = 0;
        this.isGameOver = false;
        this.waitingForDifficulty = true;
        this.scoreElement.textContent = 'Score: 0';
    }
    
    //Met le jeu en pause
    pause() {
        this.isPaused = true;
    }
    
    // Fonction pour reprendre le jeu après une pause
    resume() {
        this.isPaused = false;
    }
}