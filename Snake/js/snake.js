import {INITIAL_SNAKE_LENGTH, GRID_SIZE, CELL_SIZE} from "../script.js"
import Difficulty from "./difficulty.js"
/*
  Classe Snake - Gère le serpent et ses comportements
  - Mouvement du serpent
  - Croissance du serpent
  - Détection des collisions
  - Dessin du serpent sur le canvas
 */
 
export default class Snake {
    // Le constructeur initialise le serpent et prend en compte la difficulté
    constructor(difficulty) {
         this.difficulty = difficulty;
        this.reset(); 
    }
    
    // Réinitialise le serpent à sa position et taille de départ
    reset() {
        this.body = Array.from({ length: INITIAL_SNAKE_LENGTH }, (_, i) => ({
            x: Math.floor(GRID_SIZE / 2),// Position x initiale au centre du plateau
            y: Math.floor(GRID_SIZE / 2) + i // Position y initiale décalée vers le bas
        }));
        this.direction = 'UP';
    }
    
    // Déplace le serpent dans la direction actuelle
    move() {
        const head = { ...this.body[0] };

        switch (this.direction) {
            case 'UP': head.y--; break;
            case 'DOWN': head.y++; break;
            case 'LEFT': head.x--; break;
            case 'RIGHT': head.x++; break;
        }

        this.body.unshift(head);
        return this.body.pop();
    }
    
    // Fait grandir le serpent en ajoutant un segment
    grow() {
        const growthRate = this.difficulty.getCurrentConfig().growthRate;
        const tail = this.body[this.body.length - 1];
        
        // Ajoute plusieurs segments selon le taux de croissance
        for (let i = 0; i < growthRate; i++) {
            this.body.push({ ...tail });
        }
    }
    
    // Vérifie les collisions avec les murs et le corps du serpent
    checkCollision() {
        const head = this.body[0];
        
        // Collision avec les murs
        if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
            return true;
        }

        // Collision avec soi-même
        return this.body.slice(1).some(segment => 
            segment.x === head.x && segment.y === head.y
        );
    }
    
    // Dessine le serpent sur le canvas
    draw(ctx) {
        ctx.fillStyle = '#48bb78';
        this.body.forEach(segment => {
            ctx.fillRect(
                segment.x * CELL_SIZE,
                segment.y * CELL_SIZE,
                CELL_SIZE - 1,
                CELL_SIZE - 1
            );
        });
    }
}