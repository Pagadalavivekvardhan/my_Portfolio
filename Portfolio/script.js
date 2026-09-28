/* ===== Mobile Nav Toggle ===== */
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

// Close menu when a link is clicked
navLinks.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  }
});

/* ===== Active Nav Link on Scroll ===== */
const sections = document.querySelectorAll('header[id], section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

function highlightNav() {
  const scrollPos = window.scrollY + 100;
  let current = '';

  sections.forEach((section) => {
    if (scrollPos >= section.offsetTop) {
      current = section.getAttribute('id');
    }
  });

  navAnchors.forEach((a) => {
    a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
  });
}

window.addEventListener('scroll', highlightNav);
highlightNav();

/* ===== Scroll Reveal Animations ===== */
const revealEls = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  revealEls.forEach((el) => observer.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add('visible'));
}

/* ===== Contact Form =====
   Default: opens the visitor's email client (mailto) with the message
   prefilled to vickypagadala.28@gmail.com — works with no backend.
   To use a real backend instead, sign up at https://formspree.io,
   replace FORMSPREE_ENDPOINT below, and submit via fetch(). */
const CONTACT_EMAIL = 'vickypagadala.28@gmail.com';
const FORMSPREE_ENDPOINT = ''; // e.g. 'https://formspree.io/f/xxxxxxx'

const form = document.getElementById('contact-form');
const status = form.querySelector('.form-status');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();

  if (FORMSPREE_ENDPOINT) {
    status.textContent = 'Sending...';
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form),
      });
      if (res.ok) {
        status.textContent = '✅ Message sent! I will get back to you soon.';
        form.reset();
      } else {
        status.textContent = '❌ Something went wrong. Please email me directly.';
      }
    } catch {
      status.textContent = '❌ Network error. Please email me directly.';
    }
    return;
  }

  // Fallback: open the visitor's mail client with a prefilled email
  const subject = encodeURIComponent(`Portfolio contact from ${name}`);
  const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`);
  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  status.textContent = 'Opening your email app...';
  form.reset();
});
