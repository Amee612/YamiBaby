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

// Dynamic Image Carousel Engine
const polaroidCarousel = document.getElementById('polaroid-carousel');
const carouselIndicators = document.getElementById('carousel-indicators');
const btnPrev = document.getElementById('carousel-prev');
const btnNext = document.getElementById('carousel-next');
const imageUploader = document.getElementById('image-uploader');

// Captions for uploaded photos
const cuteCaptions = [
    "Precious Moment", "Sweet Angel", "Little Princess", 
    "So Cute!", "Beautiful Smile", "Our World 💖", "My Joy ✨", "Pure Happiness"
];

// Pre-defined array of Yami's pictures from the assets folder
const yamiImages = [
    { src: "assets/Yami/WhatsApp Image 2026-07-08 at 1.14.30 AM.jpeg", caption: "Sweet Angel 💖" },
    { src: "assets/Yami/8 month.JPG.jpeg", caption: "8 Months Old 🧸" },
    { src: "assets/Yami/10 MONTH.JPG.jpeg", caption: "10 Months Old 🌸" },
    { src: "assets/Yami/ABC_2068.JPG.jpeg", caption: "So Much Joy ✨" },
    { src: "assets/Yami/ABC_2134.JPG.jpeg", caption: "Giggly Princess 👑" },
    { src: "assets/Yami/ABC_2871.JPG.jpeg", caption: "Charming Eyes ⭐" },
    { src: "assets/Yami/ABC_2914.JPG.jpeg", caption: "Sweetest Gaze 🦋" },
    { src: "assets/Yami/ABC_2959.JPG.jpeg", caption: "Bright Smiles 😊" },
    { src: "assets/Yami/ABC_4435.JPG.jpeg", caption: "Playtime Fun 🎈" },
    { src: "assets/Yami/ABC_8067.JPG.jpeg", caption: "Little Explorer 🌟" },
    { src: "assets/Yami/ABC_8112.JPG.jpeg", caption: "Lovely Moments 💕" },
    { src: "assets/Yami/ABC_8148.JPG.jpeg", caption: "Our Little Treasure 💎" },
    { src: "assets/Yami/ABC_8172.JPG.jpeg", caption: "Tiny Miracle 🕊️" },
    { src: "assets/Yami/ABC_8174.JPG.jpeg", caption: "Happy Heart ❤️" },
    { src: "assets/Yami/ABC_8890.JPG.jpeg", caption: "Cuddly & Cute 🧸" },
    { src: "assets/Yami/ABC_8960.JPG.jpeg", caption: "Cheeky Smile 😜" },
    { src: "assets/Yami/ABC_8991.JPG.jpeg", caption: "Beautiful Angel 😇" },
    { src: "assets/Yami/IMG_0762.JPG.jpeg", caption: "Pure Magic ✨" },
    { src: "assets/Yami/IMG_0791.JPG.jpeg", caption: "Sunshine Girl ☀️" },
    { src: "assets/Yami/IMG_0803.JPG.jpeg", caption: "Sweet Dreams 🌙" },
    { src: "assets/Yami/IMG_0815.JPG.jpeg", caption: "Masi's Princess 💖" }
];

let currentIndex = 0;
let autoPlayInterval;

function renderCarousel() {
    if (!polaroidCarousel || !carouselIndicators) return;
    
    polaroidCarousel.innerHTML = '';
    carouselIndicators.innerHTML = '';
    
    yamiImages.forEach((imgData, index) => {
        // Create slide container
        const slide = document.createElement('div');
        slide.className = 'carousel-slide';
        
        // Add click listener so clicking side cards moves to them
        slide.addEventListener('click', () => {
            if (slide.classList.contains('prev-card')) {
                prevSlide();
                resetAutoPlay();
            } else if (slide.classList.contains('next-card')) {
                nextSlide();
                resetAutoPlay();
            }
        });
        
        // Create polaroid card
        const polaroid = document.createElement('div');
        polaroid.className = 'polaroid';
        
        // Image element
        const img = document.createElement('img');
        img.src = imgData.src;
        img.alt = imgData.caption;
        img.onerror = function() {
            // High quality child/baby portrait default if image fails to load
            this.src = 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=400&q=80';
        };
        
        // Caption element
        const caption = document.createElement('div');
        caption.className = 'caption';
        caption.innerText = imgData.caption;
        
        polaroid.appendChild(img);
        polaroid.appendChild(caption);
        slide.appendChild(polaroid);
        polaroidCarousel.appendChild(slide);
        
        // Create indicator dot
        const dot = document.createElement('div');
        dot.className = 'indicator-dot';
        dot.addEventListener('click', () => {
            goToSlide(index);
            resetAutoPlay();
        });
        carouselIndicators.appendChild(dot);
    });
    
    updateCarouselPosition();
}

function updateCarouselPosition() {
    if (!polaroidCarousel) return;
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.indicator-dot');
    const len = yamiImages.length;
    
    slides.forEach((slide, index) => {
        // Clear all state classes
        slide.classList.remove('active-card', 'prev-card', 'next-card');
        
        // Set new state classes for 3D layout
        if (index === currentIndex) {
            slide.classList.add('active-card');
        } else if (index === (currentIndex - 1 + len) % len) {
            slide.classList.add('prev-card');
        } else if (index === (currentIndex + 1) % len) {
            slide.classList.add('next-card');
        }
    });
    
    dots.forEach((dot, index) => {
        if (index === currentIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

function nextSlide() {
    if (yamiImages.length === 0) return;
    currentIndex = (currentIndex + 1) % yamiImages.length;
    updateCarouselPosition();
}

function prevSlide() {
    if (yamiImages.length === 0) return;
    currentIndex = (currentIndex - 1 + yamiImages.length) % yamiImages.length;
    updateCarouselPosition();
}

function goToSlide(index) {
    currentIndex = index;
    updateCarouselPosition();
}

function startAutoPlay() {
    autoPlayInterval = setInterval(nextSlide, 4500); // cycle every 4.5s
}

function resetAutoPlay() {
    clearInterval(autoPlayInterval);
    startAutoPlay();
}

// Add event listeners to control buttons
if (btnPrev) {
    btnPrev.addEventListener('click', () => {
        prevSlide();
        resetAutoPlay();
    });
}

if (btnNext) {
    btnNext.addEventListener('click', () => {
        nextSlide();
        resetAutoPlay();
    });
}

// Pause autoplay on mouse enter, resume on mouse leave
const carouselContainer = document.querySelector('.carousel-container');
if (carouselContainer) {
    carouselContainer.addEventListener('mouseenter', () => {
        clearInterval(autoPlayInterval);
    });
    carouselContainer.addEventListener('mouseleave', () => {
        startAutoPlay();
    });
}

// Mobile touch swipe gestures
let touchStartX = 0;
let touchEndX = 0;
const viewport = document.querySelector('.carousel-viewport');

if (viewport) {
    viewport.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    viewport.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
}

function handleSwipe() {
    const threshold = 50; // minimum distance in px
    if (touchStartX - touchEndX > threshold) {
        nextSlide();
        resetAutoPlay();
    } else if (touchEndX - touchStartX > threshold) {
        prevSlide();
        resetAutoPlay();
    }
}

// Image Upload Integration with Carousel
if (imageUploader) {
    imageUploader.addEventListener('change', function(event) {
        const files = event.target.files;
        let addedAny = false;
        
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            if (!file.type.startsWith('image/')) continue;
            
            const reader = new FileReader();
            reader.onload = function(e) {
                const newImg = {
                    src: e.target.result,
                    caption: cuteCaptions[Math.floor(Math.random() * cuteCaptions.length)] + " 💖"
                };
                
                // Add new photos at the beginning
                yamiImages.unshift(newImg);
                addedAny = true;
                
                // Once loaded, re-render carousel and go to the first slide (which is the newly uploaded image)
                currentIndex = 0;
                renderCarousel();
                resetAutoPlay();
            };
            reader.readAsDataURL(file);
        }
    });
}

// Initialize the carousel on page load
document.addEventListener('DOMContentLoaded', () => {
    renderCarousel();
    startAutoPlay();
});
