// Mobile Menu Toggle
const menuBtn = document.querySelector(".mobile-menu-btn");
const navbar = document.querySelector(".navbar");

menuBtn.addEventListener("click", () => {
  navbar.classList.toggle("active");
});

document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navbar.classList.remove("active");
  });
});

// ── Scroll Reveal — data-reveal system ──────────────────────────────────────
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px" }
);

document.querySelectorAll("[data-reveal]").forEach((el) => {
  revealObserver.observe(el);
});

// ── Offer Grid — slide-in from left (staggered) ──────────────────────────────
const offerGridObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll(".offer-card").forEach((card) =>
          card.classList.add("visible")
        );
        offerGridObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

const offerCards = document.querySelectorAll(".offer-card");
offerCards.forEach((el, index) => {
  el.classList.add("scroll-hidden-left");
  const reverseIndex = offerCards.length - 1 - index;
  el.style.transitionDelay = `${reverseIndex * 0.15}s`;
});

const offerGrid = document.querySelector(".offer-grid");
if (offerGrid) offerGridObserver.observe(offerGrid);

// ── Contact Form Handling (Formspree) ────────────────────────────────────────
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

// ── Smooth Scroll for Anchors ─────────────────────────────────────────────────
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

// ── Rotating scroll badge ─────────────────────────────────────────────────────
const scrollBadge = document.getElementById('scrollBadge');
if (scrollBadge) {
  window.addEventListener('scroll', () => {
    const deg = window.scrollY * 0.15;
    scrollBadge.style.transform = `rotate(${deg}deg)`;
  }, { passive: true });
}
