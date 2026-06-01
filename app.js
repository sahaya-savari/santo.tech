/* ============================================
   SANTO TECH — JavaScript Interactions
   ============================================ */

// ---- Hamburger / Mobile Nav ----
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

hamburger?.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  if (navLinks.classList.contains('open')) {
    spans[0].style.transform = 'translateY(7px) rotate(45deg)';
    spans[1].style.opacity   = '0';
    spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});

// Close nav when clicking outside
document.addEventListener('click', (e) => {
  if (!hamburger?.contains(e.target) && !navLinks?.contains(e.target)) {
    navLinks?.classList.remove('open');
    hamburger?.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});

// ---- Navbar shadow on scroll ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    navbar.style.boxShadow = '0 4px 24px rgba(13,92,92,0.12)';
  } else {
    navbar.style.boxShadow = '0 2px 16px rgba(13,92,92,0.06)';
  }
}, { passive: true });

// ---- Scroll-reveal animation ----
const revealTargets = document.querySelectorAll(
  '.service-card, .case-card, .visual-card, .company-text, .contact-inner'
);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity   = '1';
      entry.target.style.transform = 'translateY(0)';
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealTargets.forEach((el, i) => {
  el.style.opacity   = '0';
  el.style.transform = 'translateY(28px)';
  el.style.transition = `opacity 0.55s ease ${i * 0.07}s, transform 0.55s ease ${i * 0.07}s`;
  revealObserver.observe(el);
});

// ---- Contact Form ----
const contactForm = document.getElementById('contact-form');
contactForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = document.getElementById('submit-btn');
  const original = btn.innerHTML;
  btn.innerHTML = '✓ Message Sent!';
  btn.style.background = '#16a34a';
  btn.disabled = true;
  setTimeout(() => {
    btn.innerHTML = original;
    btn.style.background = '';
    btn.disabled = false;
    contactForm.reset();
  }, 3000);
});

// ---- Smooth active link highlighting ----
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-item[href^="#"]');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navItems.forEach(item => {
        item.style.color = '';
        item.style.background = '';
      });
      const active = document.querySelector(`.nav-item[href="#${entry.target.id}"]`);
      if (active) {
        active.style.color = 'var(--teal-dark)';
        active.style.background = 'var(--teal-light)';
      }
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

// ---- Subtle hex parallax on mouse move ----
const hexItems = document.querySelectorAll('.hex-item');
document.addEventListener('mousemove', (e) => {
  const xRatio = (e.clientX / window.innerWidth  - 0.5) * 2;
  const yRatio = (e.clientY / window.innerHeight - 0.5) * 2;
  hexItems.forEach((hex, i) => {
    const depth = (i % 3 + 1) * 4;
    hex.style.transform = `translate(${xRatio * depth}px, ${yRatio * depth}px)`;
  });
}, { passive: true });
