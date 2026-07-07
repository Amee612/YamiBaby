// Floating Elements Generator
const floatingElementsContainer = document.getElementById('particles-container');
const elements = ['✨', '💖', '🦋', '🎈', '🌸', '⭐', '🧸'];

function createFloatingElement() {
    const el = document.createElement('div');
    el.classList.add('floating-element');
    el.innerText = elements[Math.floor(Math.random() * elements.length)];
    
    // Randomize position, size, and animation duration
    const startPos = Math.random() * 100;
    const size = Math.random() * 25 + 15;
    const duration = Math.random() * 15 + 10; // 10 to 25 seconds
    const delay = Math.random() * 5;

    el.style.left = `${startPos}vw`;
    el.style.fontSize = `${size}px`;
    el.style.animationDuration = `${duration}s`;
    el.style.animationDelay = `${delay}s`;

    floatingElementsContainer.appendChild(el);

    // Remove element after animation completes to keep DOM clean
    setTimeout(() => {
        el.remove();
    }, (duration + delay) * 1000);
}

// Generate an element every 600ms for richer effect
setInterval(createFloatingElement, 600);

// Generate initial batch of elements so page isn't empty
for(let i=0; i<25; i++) {
    createFloatingElement();
}

// Music Controller
const musicBtn = document.getElementById('music-btn');
const bgMusic = document.getElementById('bg-music');
let isPlaying = false;

// Set lower volume for lullaby
bgMusic.volume = 0.4;

musicBtn.addEventListener('click', () => {
    if (isPlaying) {
        bgMusic.pause();
        musicBtn.innerHTML = '<span class="icon">🎵</span><span class="text">Play Magic</span>';
    } else {
        bgMusic.play().catch(e => console.log("Audio play failed:", e));
        musicBtn.innerHTML = '<span class="icon">⏸️</span><span class="text">Pause Magic</span>';
    }
    isPlaying = !isPlaying;
});

// Confetti Button Logic
const confettiBtn = document.getElementById('confetti-btn');
confettiBtn.addEventListener('click', () => {
    var duration = 4 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    var interval = setInterval(function() {
        var timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        var particleCount = 50 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, { particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
        }));
        confetti(Object.assign({}, defaults, { particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
        }));
    }, 250);
});

// Dynamic Image Uploader Logic for Gallery
const imageUploader = document.getElementById('image-uploader');
const polaroidGallery = document.getElementById('polaroid-gallery');

const cuteCaptions = [
    "Precious Moment", "Sweet Angel", "Little Princess", 
    "So Cute!", "Beautiful Smile", "Our World 💖"
];

if (imageUploader && polaroidGallery) {
    imageUploader.addEventListener('change', function(event) {
        const files = event.target.files;
        
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            
            if (!file.type.startsWith('image/')) continue;
            
            const reader = new FileReader();
            
            reader.onload = function(e) {
                const polaroid = document.createElement('div');
                polaroid.className = 'polaroid';
                
                const img = document.createElement('img');
                img.src = e.target.result;
                img.alt = 'Uploaded Memory';
                
                const caption = document.createElement('div');
                caption.className = 'caption';
                caption.innerText = cuteCaptions[Math.floor(Math.random() * cuteCaptions.length)];
                
                polaroid.appendChild(img);
                polaroid.appendChild(caption);
                
                polaroidGallery.insertBefore(polaroid, polaroidGallery.firstChild);
            };
            
            reader.readAsDataURL(file);
        }
    });
}
