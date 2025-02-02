// Setup Canvas
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 400;

// Player and Shadow Properties
let player = { x: 100, y: 300, width: 40, height: 40, speed: 5 };
let shadow = { x: 600, y: 300, width: 40, height: 40, speed: -5 };
let swapping = false;
let gravity = 2;
let jumpPower = -15;
let playerDy = 0;
let shadowDy = 0;
let onGround = true;

// Obstacle
let obstacle = { x: 400, y: 320, width: 40, height: 40 };

// Key Presses
let keys = {};

// Listen for Key Events
document.addEventListener("keydown", (e) => {
    keys[e.code] = true;
});

document.addEventListener("keyup", (e) => {
    keys[e.code] = false;
});

// Game Loop
function update() {
    // Movement
    if (keys["ArrowRight"]) {
        player.x += player.speed;
        shadow.x -= player.speed;
    }
    if (keys["ArrowLeft"]) {
        player.x -= player.speed;
        shadow.x += player.speed;
    }

    // Jumping
    if (keys["Space"] && onGround) {
        playerDy = jumpPower;
        shadowDy = jumpPower;
        onGround = false;
    }

    // Apply Gravity
    player.y += playerDy;
    shadow.y += shadowDy;
    playerDy += gravity;
    shadowDy += gravity;

    // Ground Collision
    if (player.y >= 300) {
        player.y = 300;
        playerDy = 0;
        onGround = true;
    }
    if (shadow.y >= 300) {
        shadow.y = 300;
        shadowDy = 0;
    }

    // Swap Mechanic
    if (keys["KeyS"] && !swapping) {
        let temp = { x: player.x, y: player.y };
        player.x = shadow.x;
        player.y = shadow.y;
        shadow.x = temp.x;
        shadow.y = temp.y;
        swapping = true;
        setTimeout(() => (swapping = false), 300);
    }

    // Check Collision with Obstacle
    if (
        player.x < obstacle.x + obstacle.width &&
        player.x + player.width > obstacle.x &&
        player.y < obstacle.y + obstacle.height &&
        player.y + player.height > obstacle.y
    ) {
        alert("Game Over! Refresh to restart.");
        player.x = 100;
        shadow.x = 600;
    }
}

// Draw Game Elements
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw Player
    ctx.fillStyle = "blue";
    ctx.fillRect(player.x, player.y, player.width, player.height);

    // Draw Shadow
    ctx.fillStyle = "black";
    ctx.fillRect(shadow.x, shadow.y, shadow.width, shadow.height);

    // Draw Obstacle
    ctx.fillStyle = "red";
    ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
}

// Game Loop
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();
