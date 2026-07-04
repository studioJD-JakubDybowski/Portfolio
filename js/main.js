'use strict';

/* ════════════════════════════════════════════
   PAGE LOADER
════════════════════════════════════════════ */
(function () {
  const loader = document.getElementById('pageLoader');
  if (!loader) return;

  if (sessionStorage.getItem('jd_visited') || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    loader.remove();
    return;
  }

  document.body.style.overflow = 'hidden';

  setTimeout(() => {
    loader.classList.add('is-done');
    document.body.style.overflow = '';
    sessionStorage.setItem('jd_visited', '1');
    setTimeout(() => loader.remove(), 550);
  }, 1500);
})();

/* ════════════════════════════════════════════
   SCROLL PROGRESS BAR
════════════════════════════════════════════ */
const progressBar = document.getElementById('scrollProgress');
if (progressBar) {
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const total = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.width = total > 0 ? `${(scrolled / total) * 100}%` : '0%';
  }, { passive: true });
}

/* ════════════════════════════════════════════
   MANIFESTO — BROWSER MOCK ANIMATION
════════════════════════════════════════════ */
(function () {
  const screens  = document.querySelectorAll('.mock-screen');
  const dots     = document.querySelectorAll('.mock-dot');
  const cursor   = document.getElementById('mockCursor');
  if (!screens.length || !cursor) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) return;

  // [left%, top%] per screen — where cursor moves in sequence
  const moves = [
    [[55, 72], [30, 72]],
    [[50, 52], [82, 52]],
    [[50, 88], [50, 88]],
  ];

  let current = 0;

  function show(idx) {
    screens.forEach((s, i) => s.classList.toggle('mock-screen--active', i === idx));
    dots.forEach((d, i) => d.classList.toggle('mock-dot--active', i === idx));
  }

  function animCursor(idx) {
    const steps = moves[idx] || [];
    let step = 0;
    cursor.style.opacity = '1';
    function next() {
      if (step >= steps.length) { cursor.style.opacity = '0'; return; }
      const [l, t] = steps[step++];
      cursor.style.left = l + '%';
      cursor.style.top  = t + '%';
      setTimeout(next, 950);
    }
    cursor.style.left = steps[0]?.[0] + '%';
    cursor.style.top  = steps[0]?.[1] + '%';
    setTimeout(next, 300);
  }

  animCursor(0);

  setInterval(() => {
    current = (current + 1) % screens.length;
    show(current);
    animCursor(current);
  }, 3600);
})();

/* ════════════════════════════════════════════
   SERVICES — TAB SELECTOR
════════════════════════════════════════════ */
(function () {
  const tabs   = document.querySelectorAll('.svc-tab');
  const panels = document.querySelectorAll('.svc-panel');
  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const idx = tab.dataset.svc;

      tabs.forEach(t => { t.classList.remove('is-active'); t.setAttribute('aria-selected', 'false'); });
      panels.forEach(p => p.classList.remove('is-active'));

      tab.classList.add('is-active');
      tab.setAttribute('aria-selected', 'true');
      document.querySelector(`.svc-panel[data-panel="${idx}"]`)?.classList.add('is-active');

      // Mobile: scroll tab into view
      tab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    });
  });
})();

/* ════════════════════════════════════════════
   FAQ ACCORDION
════════════════════════════════════════════ */
document.querySelectorAll('.faq-item__q').forEach(btn => {
  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    const answer = document.getElementById(btn.getAttribute('aria-controls'));

    // Close all others
    document.querySelectorAll('.faq-item__q').forEach(other => {
      other.setAttribute('aria-expanded', 'false');
      const otherAns = document.getElementById(other.getAttribute('aria-controls'));
      if (otherAns) otherAns.style.height = '0';
    });

    // Toggle clicked
    if (!expanded) {
      btn.setAttribute('aria-expanded', 'true');
      if (answer) answer.style.height = answer.scrollHeight + 'px';
    }
  });
});

/* ════════════════════════════════════════════
   NAVIGATION
════════════════════════════════════════════ */
const header    = document.getElementById('siteHeader');
const navToggle = document.getElementById('navToggle');
const navMenu   = document.getElementById('navMenu');
let lastScrollY = 0;

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  header.classList.toggle('is-scrolled', y > 40);
  header.classList.toggle('is-hidden', y > 200 && y > lastScrollY);
  lastScrollY = y;
}, { passive: true });

navToggle?.addEventListener('click', () => {
  const open = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!open));
  navMenu.classList.toggle('is-open', !open);
  document.body.style.overflow = !open ? 'hidden' : '';
});

navMenu?.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navToggle.setAttribute('aria-expanded', 'false');
    navMenu.classList.remove('is-open');
    document.body.style.overflow = '';
  });
});

/* ════════════════════════════════════════════
   SMOOTH SCROLL
════════════════════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = (header?.offsetHeight ?? 80) + 16;
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
  });
});

/* ════════════════════════════════════════════
   SCROLL REVEAL — Intersection Observer
════════════════════════════════════════════ */

// Stagger delays for grouped children
['.services__list', '.process__steps', '.testimonials__grid', '.portfolio__grid'].forEach(sel => {
  document.querySelector(sel)?.querySelectorAll(':scope > *').forEach((el, i) => {
    el.style.transitionDelay = `${i * 90}ms`;
  });
});

const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('is-visible');
    revealObs.unobserve(e.target);
  });
}, { threshold: 0.08, rootMargin: '0px 0px -56px 0px' });

document.querySelectorAll('.reveal-up, .reveal-clip').forEach(el => revealObs.observe(el));

/* Quiz entrance — dedykowany observer z większym efektem */
const quizEl = document.getElementById('contactQuiz');
if (quizEl) {
  new IntersectionObserver(([e], obs) => {
    if (!e.isIntersecting) return;
    quizEl.classList.add('is-visible');
    obs.disconnect();
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }).observe(quizEl);
}

/* ════════════════════════════════════════════
   COUNTER ANIMATION
════════════════════════════════════════════ */
function countUp(el, target, duration = 1400) {
  const start = performance.now();
  const tick = now => {
    const p = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(ease * target);
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

const counterObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    countUp(e.target, parseInt(e.target.dataset.count, 10));
    counterObs.unobserve(e.target);
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-count]').forEach(el => counterObs.observe(el));

/* ════════════════════════════════════════════
   FORM VALIDATION HELPERS
════════════════════════════════════════════ */
function showError(input, msg) {
  input.classList.add('is-error');
  const errEl = input.closest('.form-group')?.querySelector('.form-error');
  if (errEl) errEl.textContent = msg;
}
function clearError(input) {
  input.classList.remove('is-error');
  const errEl = input.closest('.form-group')?.querySelector('.form-error');
  if (errEl) errEl.textContent = '';
}
function validate(input) {
  clearError(input);
  const val = input.value.trim();
  if (input.type === 'checkbox') {
    if (input.required && !input.checked) { showError(input, 'Zgoda jest wymagana do wysłania zapytania.'); return false; }
    return true;
  }
  if (input.required && !val) { showError(input, 'To pole jest wymagane.'); return false; }
  if (input.type === 'email' && val && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(val)) { showError(input, 'Podaj prawidłowy adres e-mail.'); return false; }
  if (input.type === 'tel' && val && !/^[\d\s+\-().]{7,20}$/.test(val)) { showError(input, 'Podaj prawidłowy numer telefonu.'); return false; }
  return true;
}

/* ════════════════════════════════════════════
   QUIZ — kwalifikacja leadów
════════════════════════════════════════════ */
(function () {
  const quiz    = document.getElementById('contactQuiz');
  if (!quiz) return;

  const fill    = document.getElementById('quizFill');
  const label   = document.getElementById('quizLabel');
  const backBtn = document.getElementById('quizBack');
  const summary = document.getElementById('quizSummary');
  const form    = document.getElementById('contactForm');

  const TOTAL = 4;
  let current = 1;
  const answers = {};

  const steps = [
    document.getElementById('qStep1'),
    document.getElementById('qStep2'),
    document.getElementById('qStep3'),
    document.getElementById('qStep4'),
  ];

  function goTo(idx) {
    const prev = steps[current - 1];
    const next = steps[idx - 1];
    if (!prev || !next || idx === current) return;

    prev.classList.add('is-leaving');
    setTimeout(() => {
      prev.classList.remove('is-active', 'is-leaving');
      next.classList.add('is-active');
      current = idx;
      fill.style.width = `${((idx - 1) / (TOTAL - 1)) * 100}%`;
      label.textContent = `Krok ${idx} z ${TOTAL}`;
      backBtn.classList.toggle('is-visible', idx > 1);
      quiz.setAttribute('aria-valuenow', ((idx - 1) / (TOTAL - 1)) * 100);
      if (idx === TOTAL) buildSummary();
    }, 230);
  }

  function buildSummary() {
    const keys = ['Projekt', 'Budżet', 'Start'];
    summary.innerHTML = keys
      .filter(k => answers[k])
      .map(k => `<div class="quiz__sum-item"><span>${k}</span><strong>${answers[k]}</strong></div>`)
      .join('');
    keys.forEach(k => {
      let inp = form.querySelector(`[name="${k}"]`);
      if (!inp) {
        inp = Object.assign(document.createElement('input'), { type: 'hidden', name: k });
        form.prepend(inp);
      }
      inp.value = answers[k] || '';
    });
  }

  quiz.querySelectorAll('.quiz__opts').forEach(opts => {
    opts.querySelectorAll('.quiz__opt').forEach(btn => {
      btn.addEventListener('click', () => {
        answers[opts.dataset.key] = btn.dataset.value;
        opts.querySelectorAll('.quiz__opt').forEach(b => b.classList.remove('is-selected'));
        btn.classList.add('is-selected');
        setTimeout(() => goTo(current + 1), 200);
      });
    });
  });

  backBtn?.addEventListener('click', () => goTo(current - 1));

  form?.querySelectorAll('input:not([type="checkbox"]):not([type="hidden"]):not([tabindex="-1"])').forEach(inp => {
    inp.addEventListener('blur', () => validate(inp));
    inp.addEventListener('input', () => { if (inp.classList.contains('is-error')) clearError(inp); });
  });

  form?.addEventListener('submit', async e => {
    e.preventDefault();
    if (form.querySelector('#hp_website')?.value) return;

    let ok = true;
    form.querySelectorAll('input[required]').forEach(f => { if (!validate(f)) ok = false; });
    if (!ok) { form.querySelector('.is-error')?.focus(); return; }

    const btn = document.getElementById('submitBtn');
    btn.classList.add('is-loading');
    btn.disabled = true;

    try {
      const res = await fetch('https://formspree.io/f/FORMSPREE_ID', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(form),
      });
      if (!res.ok) throw new Error();
      quiz.innerHTML = `<div class="form-success" role="alert">
        <svg width="52" height="52" viewBox="0 0 52 52" fill="none" aria-hidden="true">
          <circle cx="26" cy="26" r="24" stroke="#C8FF00" stroke-width="1.5"/>
          <path d="M16 26l8 8 12-14" stroke="#C8FF00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <h3>Wiadomość wysłana!</h3>
        <p>Odezwę się w ciągu 24 godzin. Do zobaczenia.</p>
      </div>`;
    } catch {
      btn.classList.remove('is-loading');
      btn.disabled = false;
      const errBox = Object.assign(document.createElement('p'), {
        textContent: 'Coś poszło nie tak. Napisz bezpośrednio na kontakt@studiojd.pl.',
      });
      errBox.style.cssText = 'color:#FF7070;font-size:0.875rem;margin-top:0.5rem;';
      btn.after(errBox);
    }
  });
})();

/* ════════════════════════════════════════════
   COOKIE BANNER
════════════════════════════════════════════ */
const banner = document.getElementById('cookieBanner');

if (localStorage.getItem('cookie-consent')) {
  banner?.classList.add('is-hidden');
}

document.getElementById('cookieAccept')?.addEventListener('click', () => {
  localStorage.setItem('cookie-consent', 'accepted');
  banner.classList.add('is-hidden');
  // TODO: zainicjuj Google Analytics / inne narzędzia analityczne
});

document.getElementById('cookieReject')?.addEventListener('click', () => {
  localStorage.setItem('cookie-consent', 'rejected');
  banner.classList.add('is-hidden');
});

/* ════════════════════════════════════════════
   FLOATING CTA
════════════════════════════════════════════ */
(function () {
  const floatCta = document.getElementById('floatCta');
  const contact  = document.getElementById('kontakt');
  if (!floatCta || !contact) return;

  window.addEventListener('scroll', () => {
    const y           = window.scrollY;
    const contactTop  = contact.getBoundingClientRect().top + y;
    const show        = y > 500 && y < contactTop - window.innerHeight * 0.5;
    floatCta.classList.toggle('is-visible', show);
    floatCta.setAttribute('aria-hidden', String(!show));
  }, { passive: true });
})();
