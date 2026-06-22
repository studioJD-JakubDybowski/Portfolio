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
  ".section-title, .about-text p, .stat-card, .project-card, .offer-grid, .process-step, .pricing-card, .testimonial-card, .contact-method",
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

// Background Particles Animation (Restored)
const bgCanvas = document.getElementById("bg-particles");
const bgCtx = bgCanvas.getContext("2d");

let bgWidth, bgHeight;
let particles = [];
// Reuse global mouse tracking if possible or just use local
// We already have mouseX/Y for Three.js, but the particles used pixel coordinates.
// Let's reuse the logic but scope it properly.

let particleMouse = { x: null, y: null, radius: 150 };

function resizeBg() {
  const container = document.querySelector(".hero-visual");
  bgWidth = bgCanvas.width = container.offsetWidth;
  bgHeight = bgCanvas.height = container.offsetHeight;
}

// Check if resize listener needs to be shared.
// The Three.js one uses window resize.
// We can add another listener or combine. adding another is safer for now.
window.addEventListener("resize", resizeBg);

// We need to track mouse in pixel coords relative to canvas again for particles
document.addEventListener("mousemove", (e) => {
  const rect = bgCanvas.getBoundingClientRect();
  particleMouse.x = e.clientX - rect.left;
  particleMouse.y = e.clientY - rect.top;
});

document.addEventListener("mouseleave", () => {
  particleMouse.x = null;
  particleMouse.y = null;
});

// Initial resize
// Wait for load or just run
// Since script is at bottom of body, elements exist.
resizeBg();

class Particle {
  constructor() {
    this.x = Math.random() * bgWidth;
    this.y = Math.random() * bgHeight;
    this.vx = (Math.random() - 0.5) * 1;
    this.vy = (Math.random() - 0.5) * 1;
    this.size = Math.random() * 2 + 1;
    this.baseX = this.x;
    this.baseY = this.y;
    this.density = Math.random() * 30 + 1;
    this.color = `rgba(138, 43, 226, ${Math.random() * 0.5 + 0.1})`;
  }

  update() {
    if (particleMouse.x != null) {
      let dx = particleMouse.x - this.x;
      let dy = particleMouse.y - this.y;
      let distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < particleMouse.radius) {
        const forceDirectionX = dx / distance;
        const forceDirectionY = dy / distance;
        const maxDistance = particleMouse.radius;
        const force = (maxDistance - distance) / maxDistance;
        const directionX = forceDirectionX * force * this.density;
        const directionY = forceDirectionY * force * this.density;

        this.x -= directionX;
        this.y -= directionY;
      }
    }

    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0 || this.x > bgWidth) this.vx *= -1;
    if (this.y < 0 || this.y > bgHeight) this.vy *= -1;
  }

  draw() {
    bgCtx.fillStyle = this.color;
    bgCtx.beginPath();
    bgCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    bgCtx.fill();
  }
}

function initParticles() {
  particles = [];
  for (let i = 0; i < 60; i++) {
    // Slightly reduced count since we have 3D now too
    particles.push(new Particle());
  }
}

function animateParticles() {
  bgCtx.clearRect(0, 0, bgWidth, bgHeight);

  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 100) {
        bgCtx.strokeStyle = `rgba(138, 43, 226, ${0.1 - distance / 1000})`;
        bgCtx.lineWidth = 1;
        bgCtx.beginPath();
        bgCtx.moveTo(particles[i].x, particles[i].y);
        bgCtx.lineTo(particles[j].x, particles[j].y);
        bgCtx.stroke();
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

// Hero Canvas Animation (Three.js 3D Abstract Shape)
const canvasContainer = document.querySelector(".hero-visual");
const canvas = document.getElementById("hero-canvas");

// Scene Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  canvasContainer.offsetWidth / canvasContainer.offsetHeight,
  0.1,
  1000,
);
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
  antialias: true,
});

renderer.setSize(canvasContainer.offsetWidth, canvasContainer.offsetHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Abstract Shape (Icosahedron for network look)
const geometry = new THREE.IcosahedronGeometry(1.8, 1); // Radius 1.8, Detail 1
const material = new THREE.MeshPhongMaterial({
  color: 0x8a2be2, // Purple
  emissive: 0x2a004a, // Dark purple glow
  wireframe: true,
  transparent: true,
  opacity: 0.8,
  side: THREE.DoubleSide,
});

const sphere = new THREE.Mesh(geometry, material);

// Add a secondary inner sphere for depth
const innerGeometry = new THREE.IcosahedronGeometry(1.2, 0);
const innerMaterial = new THREE.MeshPhongMaterial({
  color: 0xaa55ff,
  wireframe: false, // Solid
  transparent: true,
  opacity: 0.2, // Semi-transparent
});
const innerSphere = new THREE.Mesh(innerGeometry, innerMaterial);

// Group them
const shapeGroup = new THREE.Group();
shapeGroup.add(sphere);
shapeGroup.add(innerSphere);
scene.add(shapeGroup);

// Lights
const ambientLight = new THREE.AmbientLight(0x404040); // Soft white light
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1, 100);
pointLight.position.set(10, 10, 10);
scene.add(pointLight);

const rectLight = new THREE.PointLight(0x8a2be2, 2, 50);
rectLight.position.set(-5, -5, 5);
scene.add(rectLight);

camera.position.z = 5;

// Mouse Interaction variables
let mouseX = 0;
let mouseY = 0;
let targetRotationX = 0;
let targetRotationY = 0;

// Window Resize Handling
window.addEventListener("resize", () => {
  const width = canvasContainer.offsetWidth;
  const height = canvasContainer.offsetHeight;

  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});

// Mouse Move Handling
document.addEventListener("mousemove", (event) => {
  const windowHalfX = window.innerWidth / 2;
  const windowHalfY = window.innerHeight / 2;

  mouseX = (event.clientX - windowHalfX) / 100;
  mouseY = (event.clientY - windowHalfY) / 100;
});

// Animation Loop
function animate() {
  requestAnimationFrame(animate);

  // Smooth rotation
  targetRotationX = mouseY * 0.5;
  targetRotationY = mouseX * 0.5;

  // Easing
  shapeGroup.rotation.x += 0.05 * (targetRotationX - shapeGroup.rotation.x);
  shapeGroup.rotation.y += 0.05 * (targetRotationY - shapeGroup.rotation.y);

  // Constant slow rotation
  shapeGroup.rotation.y += 0.002;
  sphere.rotation.z -= 0.001; // Inner rotation slightly different

  renderer.render(scene, camera);
}

animate();

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
