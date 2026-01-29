const canvas = document.getElementById('gardenCanvas');
const ctx = canvas.getContext('2d');
const playBtn = document.getElementById('playBtn');
const bgm = document.getElementById('bgm');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// These are the flowers that will appear
const flowerTypes = ['🌸', '🌹', '💮', '🌷', '🪷', '🌺', '💐', '🤍'];

// Music Toggle
playBtn.addEventListener('click', () => {
    if (bgm.paused) {
        bgm.play();
        playBtn.innerText = "⏸ Pause Music";
    } else {
        bgm.pause();
        playBtn.innerText = "🎻 Play Music";
    }
});

class Flower {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 0;
        this.maxSize = Math.random() * 50 + 20;
        this.emoji = flowerTypes[Math.floor(Math.random() * flowerTypes.length)];
        this.opacity = 0;
        this.angle = Math.random() * 360; // Random rotation
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle * Math.PI / 180);
        ctx.font = `${this.size}px serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(this.emoji, 0, 0);
        ctx.restore();
        
        if (this.size < this.maxSize) {
            this.size += 1.2; // Growing speed
            this.opacity = Math.min(1, this.opacity + 0.05);
        }
    }
}

const garden = [];

// Create flower on click or touch
window.addEventListener('mousedown', (e) => {
    garden.push(new Flower(e.clientX, e.clientY));
});

// Animation Loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    garden.forEach(flower => flower.draw());
    requestAnimationFrame(animate);
}

animate();

// Make sure it works on mobile/resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
