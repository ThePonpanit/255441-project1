const startButton = document.getElementById('start-button');
const retryButton = document.getElementById('retry-button');
const canvas = document.getElementById('snake-game');
const ctx = canvas.getContext('2d');

const tileSize = 20;
let direction = 'right';
let snake;
let apple;
let score;
let startTime;
let timeInterval = 130;
let lastSpeedIncrease = 0;
let gameInterval;

startButton.addEventListener('click', prepareGame);
retryButton.addEventListener('click', restartGame);

function prepareGame() {
    startButton.style.display = 'none';
    retryButton.style.display = 'none';
    canvas.style.display = 'block';

    let countdown = 3;
    let countdownTimer = setInterval(() => {
        clearCanvas();
        countdown--;

        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.font = '40px Arial';
        ctx.fillText(countdown, canvas.width / 2, canvas.height / 2);

        if (countdown <= 0) {
            clearInterval(countdownTimer);
            startGame();
        }
    }, 1000);
}

function startGame() {
    snake = [{ x: 5, y: 5 }, { x: 4, y: 5 }, { x: 3, y: 5 }];
    apple = { x: 10, y: 10 };
    score = 0;
    startTime = Date.now();

    ctx.font = '20px Arial';
    document.addEventListener('keydown', changeDirection);

    gameInterval = setInterval(gameLoop, timeInterval);
    gameLoop();
}

function changeDirection(event) {
    const directionMap = { ArrowUp: 'up', ArrowDown: 'down', ArrowLeft: 'left', ArrowRight: 'right' };
    if (event.key in directionMap && directionMap[event.key] !== oppositeDirection()) {
        direction = directionMap[event.key];
    }
}

function oppositeDirection() {
    return { up: 'down', down: 'up', left: 'right', right: 'left' }[direction];
}

function gameLoop() {
    let head = { ...snake[0] };

    moveHead(head);

    if (head.x === apple.x && head.y === apple.y) {
        score++;
        placeApple();
    } else {
        snake.pop(); // remove the tail
    }

    if (checkCollision(head, snake)) {
        gameOver();
        return;
    }

    snake.unshift(head); // add new head to snake
    clearCanvas();

    // Draw the snake
    ctx.fillStyle = '#006400';
    ctx.fillRect(head.x * tileSize, head.y * tileSize, tileSize, tileSize);

    ctx.fillStyle = 'green';
    snake.slice(1).forEach(part => ctx.fillRect(part.x * tileSize, part.y * tileSize, tileSize, tileSize));

    // Draw the apple
    ctx.fillStyle = 'red';
    ctx.fillRect(apple.x * tileSize, apple.y * tileSize, tileSize, tileSize);

    // Display score and time
    let elapsedTime = Math.floor((Date.now() - startTime) / 1000);
    ctx.fillStyle = 'white';
    ctx.fillText(`Time: ${elapsedTime}s`, 50, 20);
    ctx.fillText(`Score: ${score}`, canvas.width - 105, 20);

    // Speed up the game every 10 seconds
    speedUpGame(elapsedTime);
}

function moveHead(head) {
    switch (direction) {
        case 'right':
            head.x = (head.x + 1) % (canvas.width / tileSize);
            break;
        case 'left':
            head.x = (head.x - 1 + canvas.width / tileSize) % (canvas.width / tileSize);
            break;
        case 'up':
            head.y = (head.y - 1 + canvas.height / tileSize) % (canvas.height / tileSize);
            break;
        case 'down':
            head.y = (head.y + 1) % (canvas.height / tileSize);
            break;
    }
}

function placeApple() {
    do {
        apple = { x: randomPosition(), y: randomPosition() };
    } while (checkCollision(apple, snake));
}

function checkCollision(head, array) {
    return array.some(part => part.x === head.x && part.y === head.y);
}

function speedUpGame(elapsedTime) {
    if (elapsedTime % 10 === 0 && elapsedTime > lastSpeedIncrease) {
        lastSpeedIncrease = elapsedTime;
        clearInterval(gameInterval);
        timeInterval *= 0.9; // Reduce timeInterval by 10%
        gameInterval = setInterval(gameLoop, timeInterval);
    }
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function gameOver() {
    clearInterval(gameInterval);

    // Remove the keydown event listener when game is over
    document.removeEventListener('keydown', changeDirection);

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width / 2, canvas.height);

    ctx.fillStyle = 'red';
    ctx.textAlign = 'center';
    ctx.font = '40px Arial';
    ctx.fillText('Game Over', canvas.width / 2, canvas.height / 2 - 20);

    ctx.fillStyle = 'white';
    ctx.fillText(`Score: ${score}`, canvas.width / 2, canvas.height / 2 + 20);

    retryButton.style.display = 'none';

    setTimeout(() => {
        restartGame();
    }, 3000);
}

function restartGame() {
    clearInterval(gameInterval);
    direction = 'right';
    lastSpeedIncrease = 0;
    timeInterval = 130;
    retryButton.style.display = 'none';
    startGame();
}

function randomPosition() {
    return Math.floor(Math.random() * (canvas.width / tileSize));
}
