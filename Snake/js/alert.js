/*
  Classe GameAlert - Gestion des messages d'alerte
  Création de l'élément d'alerte
  Affichage des messages
 */
export default class GameAlert {
    constructor() {
        this.createAlertElement();
    }
    // Crée l'élément HTML pour les alertes
    createAlertElement() {
        if (!document.getElementById('gameAlert')) {
            const alertElement = document.createElement('div');
            alertElement.id = 'gameAlert';
            alertElement.className = 'game-alert hidden';
            document.querySelector('.game-container').appendChild(alertElement);
        }
    }
    
    // Affiche un message d'alerte
    show(message, type = 'error') {
        const alertElement = document.getElementById('gameAlert');
        alertElement.textContent = message;
        alertElement.className = `game-alert ${type} fade-in`;

        // Masque l'alerte après 3 secondes
        setTimeout(() => {
            alertElement.className = 'game-alert hidden';
        }, 5000);
    }
}