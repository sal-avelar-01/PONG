// Pong Game in JavaScript

// Constants
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const ballRadius = 10;
const paddleHeight = 75;
const paddleWidth = 10;
const rightPaddleY = (canvas.height - paddleHeight) / 2;
const leftPaddleY = (canvas.height - paddleHeight) / 2;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 2;
let ballSpeedY = 2;
let playerScore = 0;
let aiScore = 0;

// Paddle positions
let leftPaddleY = (canvas.height - paddleHeight) / 2;
let rightPaddleY = (canvas.height - paddleHeight) / 2;
const playerPaddleSpeed = 4;

// Game Loop
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddles();
    checkCollisions();
    drawScore();
    moveBall();
    requestAnimationFrame(draw);
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.closePath();
}

function drawPaddles() {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, leftPaddleY, paddleWidth, paddleHeight); // Left paddle
    ctx.fillRect(canvas.width - paddleWidth, rightPaddleY, paddleWidth, paddleHeight); // Right paddle
}

function moveBall() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;
    if (ballY + ballRadius > canvas.height || ballY - ballRadius < 0) {
        ballSpeedY = -ballSpeedY;
    }
    if (ballX + ballRadius > canvas.width) {
        playerScore += 1;
        resetBall();
    } else if (ballX - ballRadius < 0) {
        aiScore += 1;
        resetBall();
    }
}

function resetBall() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = -ballSpeedX;
}

function checkCollisions() {
    if (ballX - ballRadius < paddleWidth && ballY > leftPaddleY && ballY < leftPaddleY + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    } else if (ballX + ballRadius > canvas.width - paddleWidth && ballY > rightPaddleY && ballY < rightPaddleY + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    }
    moveAIPaddle();
}

function moveAIPaddle() {
    const aiSpeed = 2;
    if (ballY < rightPaddleY + paddleHeight / 2) {
        rightPaddleY -= aiSpeed;
    } else {
        rightPaddleY += aiSpeed;
    }
    rightPaddleY = Math.max(0, Math.min(canvas.height - paddleHeight, rightPaddleY));
}

function drawScore() {
    ctx.font = '16px Arial';
    ctx.fillStyle = 'white';
    ctx.fillText('Player: ' + playerScore, 8, 20);
    ctx.fillText('AI: ' + aiScore, canvas.width - 70, 20);
}

// Event listener for paddle movement
window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp' && leftPaddleY > 0) {
        leftPaddleY -= playerPaddleSpeed;
    } else if (e.key === 'ArrowDown' && leftPaddleY < canvas.height - paddleHeight) {
        leftPaddleY += playerPaddleSpeed;
    }
});

// Start game
requestAnimationFrame(draw);