// ArmyNet SpA — script.js v3 — 2026

// Navbar scroll effect
const nav = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

// Hamburger menu
const ham      = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
if (ham) ham.addEventListener('click', () => navLinks.classList.toggle('open'));
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Active nav link por página actual
const currentPage = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a:not(.nav-cta)').forEach(a => {
  const href = a.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    a.classList.add('active');
  }
});

// Fade-up on scroll (IntersectionObserver)
const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); fadeObserver.unobserve(e.target); } });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-up').forEach(el => fadeObserver.observe(el));

// Animated counters
function animateCount(el) {
  const target = parseInt(el.dataset.count);
  const suffix = el.dataset.suffix || '';
  let current  = 0;
  const step   = Math.max(1, Math.ceil(target / 40));
  const timer  = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = current + suffix;
    if (current >= target) clearInterval(timer);
  }, 40);
}
const statsObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('[data-count]').forEach(animateCount);
      statsObserver.unobserve(e.target);
    }
  });
});
document.querySelectorAll('.hero-stats').forEach(el => statsObserver.observe(el));

// Contact form (Web3Forms — reemplazar access_key en el HTML)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  const status    = document.getElementById('formStatus');
  const submitBtn = contactForm.querySelector('button[type="submit"]');
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    status.className  = 'form-status';
    status.textContent = '';
    const originalHtml = submitBtn.innerHTML;
    submitBtn.disabled  = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body:   new FormData(contactForm)
      });
      const data = await response.json();
      if (data.success) {
        status.className  = 'form-status success';
        status.textContent = 'Solicitud enviada. Te respondemos en menos de 24h hábiles.';
        contactForm.reset();
      } else {
        throw new Error(data.message || 'Error en el envío');
      }
    } catch (err) {
      status.className  = 'form-status error';
      status.textContent = 'Error al enviar. Escríbenos directamente a contacto@armynet.cl o por WhatsApp.';
    } finally {
      submitBtn.disabled  = false;
      submitBtn.innerHTML = originalHtml;
    }
  });
}
