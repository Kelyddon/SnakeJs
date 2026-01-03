export class Brick {
    constructor(x, y, width, height, color, hits = 1) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.hits = hits;
        this.isActive = true;
    }

    draw(ctx) {
        if (!this.isActive) return;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.strokeStyle = '#fff';
        ctx.strokeRect(this.x, this.y, this.width, this.height);
    }

    handleCollision() {
        this.hits--;
        if (this.hits <= 0) {
            this.isActive = false;
            return 100; // Score for breaking a brick
        }
        return 10; // Score for hitting a brick
    }
}

export class BrickGrid {
    constructor(game) {
        this.game = game;
        this.rows = 5;
        this.cols = 8;
        this.bricks = [];
        this.init();
    }

    init() {
        const colors = ['#ff0000', '#ff7f00', '#ffff00', '#00ff00', '#0000ff'];
        const brickWidth = (this.game.canvas.width - 80) / this.cols;
        const brickHeight = 30;

        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                const x = 40 + col * brickWidth;
                const y = 50 + row * (brickHeight + 10);
                this.bricks.push(new Brick(x, y, brickWidth - 4, brickHeight, colors[row]));
            }
        }
    }

    checkCollision(ball) {
        for (const brick of this.bricks) {
            if (!brick.isActive) continue;

            if (ball.x + ball.radius > brick.x &&
                ball.x - ball.radius < brick.x + brick.width &&
                ball.y + ball.radius > brick.y &&
                ball.y - ball.radius < brick.y + brick.height) {
                
                ball.dy = -ball.dy;
                this.game.score += brick.handleCollision();

                if (this.bricks.every(b => !b.isActive)) {
                    this.game.victory();
                }
                return true;
            }
        }
        return false;
    }

    draw() {
        this.bricks.forEach(brick => brick.draw(this.game.ctx));
    }
}