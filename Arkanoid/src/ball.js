export class Ball {
    constructor(game, paddle) {
        this.game = game;
        this.paddle = paddle;
        this.radius = 8;
        this.speed = 6;
        this.reset();
        this.isLaunched = false;
    }

    reset() {
        this.x = this.paddle.x + this.paddle.width / 2;
        this.y = this.paddle.y - this.radius;
        this.dx = 0;
        this.dy = 0;
        this.isLaunched = false;
    }

    launch() {
        if (!this.isLaunched) {
            this.isLaunched = true;
            this.dx = this.speed * (Math.random() * 0.5 + 0.5) * (Math.random() > 0.5 ? 1 : -1);
            this.dy = -this.speed;
        }
    }

    move() {
        if (!this.isLaunched) {
            // Ball follows paddle before launch
            this.x = this.paddle.x + this.paddle.width / 2;
            return;
        }

        this.x += this.dx;
        this.y += this.dy;

        // Wall collisions
        if (this.x - this.radius <= 0) {
            this.x = this.radius;
            this.dx = Math.abs(this.dx);
        }
        if (this.x + this.radius >= this.game.canvas.width) {
            this.x = this.game.canvas.width - this.radius;
            this.dx = -Math.abs(this.dx);
        }
        if (this.y - this.radius <= 0) {
            this.y = this.radius;
            this.dy = Math.abs(this.dy);
        }

        // Paddle collision
        if (this.y + this.radius >= this.paddle.y &&
            this.y - this.radius <= this.paddle.y + this.paddle.height &&
            this.x >= this.paddle.x &&
            this.x <= this.paddle.x + this.paddle.width) {
            
            // Calculate hit position on paddle (0-1)
            const hitPos = (this.x - this.paddle.x) / this.paddle.width;
            
            // Bounce angle based on hit position (-60 to 60 degrees)
            const angle = (hitPos - 0.5) * Math.PI / 1.5;
            
            this.y = this.paddle.y - this.radius; // Prevent sticking
            this.dx = this.speed * Math.sin(angle);
            this.dy = -this.speed * Math.cos(angle);
        }

        // Bottom collision (game over)
        if (this.y + this.radius > this.game.canvas.height) {
            this.game.gameOver();
            this.reset();
        }
    }

    draw() {
        this.game.ctx.beginPath();
        this.game.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        this.game.ctx.fillStyle = '#fff';
        this.game.ctx.fill();
        this.game.ctx.closePath();
    }
}