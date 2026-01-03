/*
  Classe Difficulty - Gestion des niveaux de difficulté
 */
export default class Difficulty {
    constructor() {
        // Définition des différents niveaux de difficulté et de leurs propriétés associées
        this.difficulties = {
            easy: {
                name: 'Facile',
                speed: 200,
                growthRate: 1,
                color: '#48bb78',
                multi:1
                
            },
            normal: {
                name: 'Normal',
                speed: 120,
                growthRate: 2,
                color: '#4299e1',
                multi:2
            },
            hard: {
                name: 'Difficile',
                speed: 70,
                growthRate: 3,
                color: '#f56565',
                multi:3
            }
        };
        this.currentDifficulty = null;
        this.selector = document.querySelector('.difficulty-selector');
        this.initializeButtons();
    }
    
    // Initialisation des boutons de sélection des différents niveaux de difficulté
    initializeButtons() {
        const buttons = this.selector.querySelectorAll('.difficulty-button');
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                buttons.forEach(btn => btn.classList.remove('selected'));
                button.classList.add('selected');
                this.setDifficulty(button.dataset.difficulty);
            });
        });
    }
    
    // Définit la difficulté actuelle et déclenche un événement pour mettre à jour la configuration du jeu
    setDifficulty(difficulty) {
        this.currentDifficulty = difficulty;
        this.hideSelector();
        
        window.dispatchEvent(new CustomEvent('difficultyChange', {
            detail: this.difficulties[difficulty]
        }));
    }
    
    // Récupère la configuration de la difficulté actuelle
    getCurrentConfig() {
        return this.difficulties[this.currentDifficulty] || this.difficulties.normal;
    }
    
    // Cache le sélecteur de difficulté
    hideSelector() {
        if (this.selector) {
            this.selector.style.display = 'none';
        }
    }
    
    // Affiche le sélecteur de difficulté et réinitialise les boutons de sélection
    showSelector() {
        if (this.selector) {
            this.selector.style.display = 'block';
            const buttons = this.selector.querySelectorAll('.difficulty-button');
            buttons.forEach(button => button.classList.remove('selected'));
        }
    }

    reset() {
        this.currentDifficulty = null;
        this.showSelector();
    }
}