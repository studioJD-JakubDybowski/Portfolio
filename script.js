

// Mobile Menu Toggle
const menuBtn = document.querySelector('.mobile-menu-btn');
const navbar = document.querySelector('.navbar');

menuBtn.addEventListener('click', () => {
    navbar.classList.toggle('active');
    // Animate hamburger to X (optional enhancement)
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navbar.classList.remove('active');
    });
});

// Scroll Reveal Animation (Intersection Observer)
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            if (entry.target.classList.contains('progress')) {
                // Trigger progress bar animation restart if needed
                entry.target.style.animation = 'none';
                entry.target.offsetHeight; /* trigger reflow */
                entry.target.style.animation = 'progressLoad 1.5s ease-out forwards';
            }
        }
    });
}, observerOptions);

// Select elements to animate
const scrollElements = document.querySelectorAll('.section-title, .about-text p, .stat-card, .project-card');
scrollElements.forEach(el => {
    el.classList.add('scroll-hidden'); // Add initial hidden utility class
    observer.observe(el);
});

// Add CSS class for hidden state dynamically to keep HTML clean
const style = document.createElement('style');
style.innerHTML = `
    .scroll-hidden {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s ease-out;
    }
    .visible {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);


// Hero Canvas Animation (Particles)
const canvas = document.getElementById('hero-canvas');
const ctx = canvas.getContext('2d');

let width, height;
let particles = [];

function resize() {
    width = canvas.width = window.innerWidth > 600 ? 500 : window.innerWidth;
    height = canvas.height = window.innerWidth > 600 ? 500 : 300;
}

window.addEventListener('resize', resize);
resize();

class Particle {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 1; // Velocity X
        this.vy = (Math.random() - 0.5) * 1; // Velocity Y
        this.size = Math.random() * 2 + 1;
        this.color = `rgba(138, 43, 226, ${Math.random() * 0.5 + 0.1})`; // Accent color with transparency
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off walls
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    particles = [];
    for (let i = 0; i < 50; i++) {
        particles.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, width, height);
    
    // Draw connections
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
                ctx.strokeStyle = `rgba(138, 43, 226, ${0.1 - distance/1000})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }

    particles.forEach(p => {
        p.update();
        p.draw();
    });

    requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

// Smooth Scroll for Anchors (Polyfill-like behavior if needed, but CSS scroll-behavior usually handles it)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElem = document.querySelector(targetId);
        
        if (targetElem) {
            targetElem.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});
