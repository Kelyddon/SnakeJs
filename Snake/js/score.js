/*
  Classe scores - Gestion des meilleurs scores
  Sauvegarde des scores dans le localStorage
  Chargement des scores depuis le localStorage
  Mise à jour du tableau des scores
  Gestion de l'entrée du nom du joueur
 */
export default class HighScores {
    constructor() {
        this.scores = this.loadScores();
        this.tableBody = document.querySelector('#highscores tbody');
        this.updateTable();
    }
    
    // Charge les scores depuis le localStorage
    loadScores() {
        const savedScores = localStorage.getItem('snakeHighScores');
        return savedScores ? JSON.parse(savedScores) : [];
    }
    
    // Sauvegarde les scores dans le localStorage
    saveScores() {
        localStorage.setItem('snakeHighScores', JSON.stringify(this.scores));
    }
    
    // Fonction ajoute un nouveau score
    async addScore(score) {
        const playerName = await this.askPlayerName();
        if (playerName) {
            this.scores.push({ score, playerName });
            this.scores.sort((a, b) => b.score - a.score);
            this.scores = this.scores.slice(0, 5); // Garde uniquement les 5 meilleurs scores
            this.saveScores();
            this.updateTable();
        }
    }
    
    // Demande le nom du joueur
    askPlayerName() {
        return new Promise((resolve) => {
            const name = prompt("Entrez votre prénom pour sauvegarder votre score :");
            resolve(name ? name.trim() : "Anonyme"); // Si un nom est donné, il est renvoyé après suppression des espaces inutiles. Si aucun nom n'est donné, 'Anonyme' est utilisé par défaut.
        });
    }
    
    // Met à jour l'affichage du tableau des scores
    updateTable() {
        this.tableBody.innerHTML = '';
        
        this.scores.forEach((score, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="rank">${index + 1}</td>
                <td class="score">${score.score}</td>
                <td class="player-name">${score.playerName}</td>
            `;
            this.tableBody.appendChild(row);
        });

        // Remplir les rangs restants si nécessaire
        for (let i = this.scores.length; i < 5; i++) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="rank">${i + 1}</td>
                <td class="score">-</td>
                <td class="player-name">-</td>
            `;
            this.tableBody.appendChild(row);
        }
    }
}