const card = document.querySelector('.interactive-card');
const changeColorBtn = document.getElementById('changeColor');
const toggleEffectBtn = document.getElementById('toggleEffect');
const buttons = document.querySelectorAll('button');

let effectEnabled = true;
let hue = 0;
let allowTrail = true;

// Mouse movement effect (now tilts in the correct direction)
document.addEventListener('mousemove', (e) => {
    if (effectEnabled) {
        let xAxis = (e.pageX - window.innerWidth / 2) / 25; // Move in the correct direction
        let yAxis = (window.innerHeight / 2 - e.pageY) / 25; // Move in the correct direction
        card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    }

    if (allowTrail) {
        createRainbowTrail(e.pageX, e.pageY);
    }
});

// Function to create a rainbow trail following the cursor
function createRainbowTrail(x, y) {
    const trail = document.createElement('div');
    trail.classList.add('trail');
    document.body.appendChild(trail);

    hue = (hue + 10) % 360;
    trail.style.backgroundColor = `hsl(${hue}, 100%, 50%)`;
    trail.style.left = `${x}px`;
    trail.style.top = `${y}px`;

    setTimeout(() => {
        trail.remove();
    }, 500);
}

// Prevent rainbow trail from appearing over the card
card.addEventListener('mouseenter', () => {
    allowTrail = false;
});
card.addEventListener('mouseleave', () => {
    allowTrail = true;
});

// Change background color but keep text white
changeColorBtn.addEventListener('click', () => {
    const h = Math.random() * 360;
    const s = 80;
    const l = Math.random() * 30 + 10;
    const randomColor = `hsl(${h}, ${s}%, ${l}%)`;

    card.style.background = randomColor;
});

// Toggle the interactive effect
toggleEffectBtn.addEventListener('click', () => {
    effectEnabled = !effectEnabled;
    if (!effectEnabled) {
        card.style.transform = 'none';
    }
});