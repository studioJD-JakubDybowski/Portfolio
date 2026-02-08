// Typewriter Effect
const roleElement = document.querySelector(".role");
const roles = [
  "Tworzę nowoczesne rozwiązania webowe.",
  "Dbam o efektywność i wydajność.",
  "Projektuję interfejsy użytkownika.",
];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeDelay = 100;

function type() {
  const currentRole = roles[roleIndex];

  if (isDeleting) {
    roleElement.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
    typeDelay = 50;
  } else {
    roleElement.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
    typeDelay = 100;
  }

  if (!isDeleting && charIndex === currentRole.length) {
    isDeleting = true;
    typeDelay = 2000; // Pause at end
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    typeDelay = 500; // Pause before new word
  }

  setTimeout(type, typeDelay);
}

document.addEventListener("DOMContentLoaded", type);

// Mobile Menu Toggle
const menuBtn = document.querySelector(".mobile-menu-btn");
const navbar = document.querySelector(".navbar");

menuBtn.addEventListener("click", () => {
  navbar.classList.toggle("active");
  // Animate hamburger to X (optional enhancement)
});

// Close mobile menu when a link is clicked
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navbar.classList.remove("active");
  });
});

// Scroll Reveal Animation (Intersection Observer)
// Scroll Reveal Animation (Intersection Observer)
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px",
};

// Generic Observer for standard elements (Fade Up)
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target); // Trigger once
    }
  });
}, observerOptions);

// Offer Grid Observer (Triggers children with staggered delay)
const observerContainer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      if (entry.target.classList.contains("offer-grid")) {
        const cards = entry.target.querySelectorAll(".offer-card");
        cards.forEach((card) => card.classList.add("visible"));
        observerContainer.unobserve(entry.target);
      }
    }
  });
}, observerOptions);

// Select elements to animate
const scrollElements = document.querySelectorAll(
  ".section-title, .about-text p, .stat-card, .project-card, .offer-grid",
);

// Pre-calculate delays for offer cards (Reverse order: Right first, then Left)
const offerCards = document.querySelectorAll(".offer-card");
offerCards.forEach((el, index) => {
  // Start state: hidden off-screen
  el.classList.add("scroll-hidden-left");

  // Reverse delay logic
  const reverseIndex = offerCards.length - 1 - index;
  el.style.transitionDelay = `${reverseIndex * 0.4}s`; // 0.4s stagger
});

scrollElements.forEach((el) => {
  // Skip animation for Offer section title
  if (el.classList.contains("section-title") && el.closest("#offer")) {
    return;
  }

  // If it's the Offer Grid, use the Container Observer
  if (el.classList.contains("offer-grid")) {
    observerContainer.observe(el);
  } else {
    // Otherwise use the Generic Observer
    el.classList.add("scroll-hidden");
    observer.observe(el);
  }
});

// Add CSS class for hidden state dynamically to keep HTML clean
const style = document.createElement("style");
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
const canvas = document.getElementById("hero-canvas");
const ctx = canvas.getContext("2d");

let width, height;
let particles = [];
let mouse = { x: null, y: null, radius: 150 };

function resize() {
  width = canvas.width = window.innerWidth > 600 ? 500 : window.innerWidth;
  height = canvas.height = window.innerWidth > 600 ? 500 : 300;
}

window.addEventListener("resize", resize);
window.addEventListener("mousemove", (e) => {
  // Calculate mouse position relative to canvas
  const rect = canvas.getBoundingClientRect();
  mouse.x = e.clientX - rect.left;
  mouse.y = e.clientY - rect.top;
});

window.addEventListener("mouseleave", () => {
  mouse.x = null;
  mouse.y = null;
});

resize();

class Particle {
  constructor() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.vx = (Math.random() - 0.5) * 1; // Velocity X
    this.vy = (Math.random() - 0.5) * 1; // Velocity Y
    this.size = Math.random() * 2 + 1;
    this.baseX = this.x;
    this.baseY = this.y;
    this.density = Math.random() * 30 + 1;
    this.color = `rgba(138, 43, 226, ${Math.random() * 0.5 + 0.1})`; // Accent color with transparency
  }

  update() {
    // Mouse interaction
    if (mouse.x != null) {
      let dx = mouse.x - this.x;
      let dy = mouse.y - this.y;
      let distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < mouse.radius) {
        const forceDirectionX = dx / distance;
        const forceDirectionY = dy / distance;
        const maxDistance = mouse.radius;
        const force = (maxDistance - distance) / maxDistance;
        const directionX = forceDirectionX * force * this.density;
        const directionY = forceDirectionY * force * this.density;

        // Move away from mouse
        this.x -= directionX;
        this.y -= directionY;
      }
    }

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
  for (let i = 0; i < 80; i++) {
    // Increased particle count slightly
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
        ctx.strokeStyle = `rgba(138, 43, 226, ${0.1 - distance / 1000})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }

  particles.forEach((p) => {
    p.update();
    p.draw();
  });

  requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

// Contact Form Handling (Formspree)
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = new FormData(contactForm);

    try {
      const response = await fetch(contactForm.action, {
        method: contactForm.method,
        body: data,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        formStatus.textContent = "Wiadomość została wysłana! Dziękuję.";
        formStatus.className = "success-message";
        contactForm.reset();
      } else {
        const errorData = await response.json();
        if (Object.hasOwn(errorData, "errors")) {
          formStatus.textContent = errorData["errors"]
            .map((error) => error["message"])
            .join(", ");
        } else {
          formStatus.textContent =
            "Ups! Coś poszło nie tak przy wysyłaniu formularza.";
        }
        formStatus.className = "error-message";
      }
    } catch (error) {
      formStatus.textContent = "Wystąpił błąd sieci. Spróbuj ponownie później.";
      formStatus.className = "error-message";
    }
  });
}

// Smooth Scroll for Anchors (Polyfill-like behavior if needed, but CSS scroll-behavior usually handles it)
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    const targetElem = document.querySelector(targetId);

    if (targetElem) {
      targetElem.scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});
