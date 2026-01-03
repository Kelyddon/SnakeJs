export class Paddle {
    constructor(game) {
        this.game = game;
        this.width = 100;
        this.height = 20;
        this.x = (game.canvas.width - this.width) / 2;
        this.y = game.canvas.height - this.height - 10;
        this.speed = 8;
        this.moveLeft = false;
        this.moveRight = false;
    }

    move() {
        if (this.moveLeft) {
            this.x = Math.max(0, this.x - this.speed);
        }
        if (this.moveRight) {
            this.x = Math.min(this.game.canvas.width - this.width, this.x + this.speed);
        }
    }

    draw() {
        this.game.ctx.fillStyle = '#fff';
        this.game.ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}