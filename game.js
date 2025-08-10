document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('game-canvas');
    const ctx = canvas.getContext('2d');
    const gameContainer = document.getElementById('game-container');

    const scoreElement = document.getElementById('score');
    const highScoreElement = document.getElementById('high-score');
    const gameOverScreen = document.getElementById('game-over-screen');
    const restartBtn = document.getElementById('restart-btn');

    let canvasWidth, canvasHeight;
    let player, obstacles, score, highScore, gameOver, animationFrameId;

    // --- Player (Guitar Pick) ---
    const playerImage = new Image();
    playerImage.src = 'data:image/svg+xml;base64,' + btoa(`
        <svg width="50" height="60" viewBox="0 0 50 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M25 0L49.3827 22.5L38.75 59.5H11.25L0.617284 22.5L25 0Z" fill="#FFA500"/>
            <path d="M25 5C28.5 10.5 35.5 15 38 22.5" stroke="#000000" stroke-width="2"/>
        </svg>
    `);

    // --- Obstacles (Skulls) ---
    const obstacleImage = new Image();
    obstacleImage.src = 'data:image/svg+xml;base64,' + btoa(`
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 15C10 10 15 5 20 5C25 5 30 10 30 15V25C35 25 40 30 40 35H0C0 30 5 25 10 25V15Z" fill="#FFFFFF"/>
            <circle cx="15" cy="20" r="3" fill="black"/>
            <circle cx="25" cy="20" r="3" fill="black"/>
            <rect x="18" y="28" width="4" height="6" fill="black"/>
        </svg>
    `);

    function setCanvasDimensions() {
        canvasWidth = gameContainer.clientWidth;
        canvasHeight = gameContainer.clientHeight;
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
    }

    function init() {
        setCanvasDimensions();

        player = {
            x: canvasWidth / 2 - 25,
            y: canvasHeight - 80,
            width: 50,
            height: 60,
            speed: 15
        };

        obstacles = [];
        score = 0;
        highScore = localStorage.getItem('jors-game-highscore') || 0;
        highScoreElement.textContent = highScore;
        gameOver = false;
        gameOverScreen.style.display = 'none';

        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }
        gameLoop();
    }

    function spawnObstacle() {
        const size = 40;
        const x = Math.random() * (canvasWidth - size);
        const y = -size;
        const speed = 2 + Math.random() * 3 + (score / 500); // Speed increases with score

        obstacles.push({ x, y, size, speed });
    }

    function update() {
        if (gameOver) return;

        // Update obstacles
        for (let i = obstacles.length - 1; i >= 0; i--) {
            const obs = obstacles[i];
            obs.y += obs.speed;

            // Collision detection
            if (
                player.x < obs.x + obs.size &&
                player.x + player.width > obs.x &&
                player.y < obs.y + obs.size &&
                player.y + player.height > obs.y
            ) {
                endGame();
                return;
            }

            // Remove off-screen obstacles
            if (obs.y > canvasHeight) {
                obstacles.splice(i, 1);
            }
        }

        // Spawn new obstacles
        if (Math.random() < 0.03) { // Adjust spawn rate
            spawnObstacle();
        }

        // Update score
        score++;
        scoreElement.textContent = score;
        if (score > highScore) {
            highScore = score;
            highScoreElement.textContent = highScore;
            localStorage.setItem('jors-game-highscore', highScore);
        }
    }

    function draw() {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        // Draw player
        ctx.drawImage(playerImage, player.x, player.y, player.width, player.height);

        // Draw obstacles
        obstacles.forEach(obs => {
            ctx.drawImage(obstacleImage, obs.x, obs.y, obs.size, obs.size);
        });
    }

    function gameLoop() {
        update();
        draw();

        if (!gameOver) {
            animationFrameId = requestAnimationFrame(gameLoop);
        }
    }
    
    function endGame() {
        gameOver = true;
        cancelAnimationFrame(animationFrameId);
        gameOverScreen.style.display = 'flex';
    }

    // --- Event Listeners ---
    function handleMove(clientX) {
        if (gameOver) return;
        const rect = canvas.getBoundingClientRect();
        let targetX = clientX - rect.left - player.width / 2;
        
        // Clamp player position within canvas bounds
        player.x = Math.max(0, Math.min(canvasWidth - player.width, targetX));
    }

    // Desktop controls
    window.addEventListener('mousemove', (e) => handleMove(e.clientX));

    // Mobile controls
    window.addEventListener('touchmove', (e) => {
        e.preventDefault(); // Prevent scrolling
        handleMove(e.touches[0].clientX);
    }, { passive: false });

    restartBtn.addEventListener('click', init);
    window.addEventListener('resize', init);

    // Initial setup
    playerImage.onload = () => {
        obstacleImage.onload = () => {
            init();
        };
    };
});
