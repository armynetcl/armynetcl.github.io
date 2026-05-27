// Navbar scroll effect
const nav = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

// Hamburger menu
const ham = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
if (ham) ham.addEventListener('click', () => navLinks.classList.toggle('open'));

// Close menu on link click
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Active nav link
const currentPage = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(a => {
  const href = a.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) a.classList.add('active');
});

// Fade-up on scroll
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// Animated counters (hero stats)
function animateCount(el) {
  const target = parseInt(el.dataset.count);
  const suffix = el.dataset.suffix || '';
  let current = 0;
  const step = Math.max(1, Math.ceil(target / 40));
  const timer = setInterval(() => {
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

// Contact form (Web3Forms)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  const status = document.getElementById('formStatus');
  const submitBtn = contactForm.querySelector('button[type="submit"]');
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    status.className = 'form-status';
    status.textContent = '';
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    try {
      const formData = new FormData(contactForm);
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      if (data.success) {
        status.className = 'form-status success';
        status.textContent = '¡Mensaje enviado! Te responderemos en menos de 24h hábiles.';
        contactForm.reset();
      } else {
        throw new Error(data.message || 'Error al enviar');
      }
    } catch (err) {
      status.className = 'form-status error';
      status.textContent = 'Hubo un problema al enviar. Por favor escríbenos por WhatsApp o intenta nuevamente.';
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    }
  });
}
