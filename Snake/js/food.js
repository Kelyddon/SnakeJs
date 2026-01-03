import { GRID_SIZE, CELL_SIZE } from "../script.js";
 
 /*
 Contrôle la position des fruits vis à vis du Snake
 */
export default class Food {
    constructor(snake) {
        this.position = this.generatePosition(snake); // Appelle la fonction generatePosition pour générer la position initiale de la nourriture
        this.image = new Image();
        this.image.src = this.getRandomImage();// Définit la source de l'image de la nourriture en sélectionnant une image aléatoire parmi celles disponibles
    }
    
    // Retourne une image aléatoire parmi les options prédéfinies
    getRandomImage() {
        const images = [
            'img/apple.png',
            'img/banana-removebg-preview.png',
            'img/piment.png',
            'img/Pixel-Art-Watermelon-removebg-preview.png',
            'img/blue-grapes-pixelated-fruit-graphic-vector-removebg-preview.png'
        ];
        const randomIndex = Math.floor(Math.random() * images.length);
        return images[randomIndex];
    }
    
    // Génère une position aléatoire sur la grille qui n'est pas occupée par le serpent
    generatePosition(snake) {
        // Tableau pour stocker les positions disponibles pour la nourriture
        const availablePositions = [];
        for (let x = 0; x < GRID_SIZE; x++) {
            for (let y = 0; y < GRID_SIZE; y++) {
                const isSnakePosition = snake.body.some(
                    segment => segment.x === x && segment.y === y
                );
                if (!isSnakePosition) {
                    availablePositions.push({ x, y });
                }
            }
        }
 
        const randomIndex = Math.floor(Math.random() * availablePositions.length);
        return availablePositions[randomIndex];
    }
    // Dessine la nourriture sur le canvas en fonction de sa position et de l'image
    draw(ctx) {
        ctx.drawImage(
            this.image,
            this.position.x * CELL_SIZE,
            this.position.y * CELL_SIZE,
            CELL_SIZE * 1.1,
            CELL_SIZE * 1.1
        );
    }
}