document.getElementById('start-button').addEventListener('click', prepareGame);

function prepareGame() {
    document.getElementById('start-button').style.display = 'none';
    document.getElementById('snake-game').style.display = 'block';

    var canvas = document.getElementById('snake-game');
    var ctx = canvas.getContext('2d');
    var countdown = 3;

    var countdownInterval = setInterval(function() {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.font = '40px Arial';
        ctx.fillText(countdown, canvas.width / 2, canvas.height / 2);

        countdown--;

        if (countdown < 0) {
            clearInterval(countdownInterval);
            startGame();
        }
    }, 1000);
}

function startGame() {
    var canvas = document.getElementById('snake-game');
    var ctx = canvas.getContext('2d');
    var tileSize = 20;
    var direction = 'right';
    var snake = [
        { x: 5, y: 5 },
        { x: 4, y: 5 },
        { x: 3, y: 5 }
    ];
    var apple = { x: 10, y: 10 };
    var score = 0;
    var startTime = Date.now();
    var timeInterval = 100;
    var lastSpeedIncrease = 0;

    ctx.font = '20px Arial';

    document.addEventListener('keydown', function (event) {
        var newDirection = direction;
        if (event.key === 'ArrowUp' && direction !== 'down') newDirection = 'up';
        if (event.key === 'ArrowDown' && direction !== 'up') newDirection = 'down';
        if (event.key === 'ArrowLeft' && direction !== 'right') newDirection = 'left';
        if (event.key === 'ArrowRight' && direction !== 'left') newDirection = 'right';
        direction = newDirection;
    });

    var gameInterval = setInterval(gameLoop, timeInterval);
    
function gameLoop() {
    var head = Object.assign({}, snake[0]);

    switch (direction) {
        case 'right':
            head.x++;
            break;
        case 'left':
            head.x--;
            break;
        case 'up':
            head.y--;
            break;
        case 'down':
            head.y++;
            break;
    }

    var elapsedTime = Math.floor((Date.now() - startTime) / 1000);
    if (elapsedTime % 10 === 0 && elapsedTime > lastSpeedIncrease) {
        lastSpeedIncrease = elapsedTime;
        clearInterval(gameInterval);
        timeInterval *= 0.9; // Reduce timeInterval by 10%
        gameInterval = setInterval(gameLoop, timeInterval);
    }

    if (head.x === apple.x && head.y === apple.y) {
        var tail = {};
        score++;
        placeApple();
    } else {
        var tail = snake.pop();
    }

    snake.unshift(head);

    if (head.x < 0 || head.x >= canvas.width / tileSize || head.y < 0 || head.y >= canvas.height / tileSize || checkCollision(head, snake.slice(1))) {
        gameOver();
        return;
    }

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Make the head darker
    ctx.fillStyle = '#006400';
    ctx.fillRect(head.x * tileSize, head.y * tileSize, tileSize, tileSize);

    // Draw the rest of the snake
    ctx.fillStyle = 'green';
    for (var i = 1; i < snake.length; i++) {
        ctx.fillRect(snake[i].x * tileSize, snake[i].y * tileSize, tileSize, tileSize);
    }

    ctx.fillStyle = 'red';
    ctx.fillRect(apple.x * tileSize, apple.y * tileSize, tileSize, tileSize);

    ctx.fillStyle = 'white';
    ctx.fillText('Time: ' + elapsedTime + 's', 50, 20);
    ctx.fillText('Score: ' + score, canvas.width - 105, 20);
}


    function randomPosition() {
        return Math.floor(Math.random() * canvas.width / tileSize);
    }

    function placeApple() {
        apple = { x: randomPosition(), y: randomPosition() };
    }

    function checkCollision(head, array) {
        for (var i = 0; i < array.length; i++) {
            if (head.x === array[i].x && head.y === array[i].y) {
                return true;
            }
        }
        return false;
    }

    function gameOver() {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = 'red';
        ctx.textAlign = 'center';
        ctx.font = '40px Arial';
        ctx.fillText('Game Over', canvas.width / 2, canvas.height / 2 - 20);
        ctx.fillStyle = 'white';
        ctx.fillText('Score: ' + score, canvas.width / 2, canvas.height / 2 + 20);

        document.getElementById('retry-button').style.display = 'block';
        document.getElementById('retry-button').addEventListener('click', function () {
            location.reload();
        });
    }

    gameLoop();
}
