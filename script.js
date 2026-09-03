// Navbar scroll effect
const nav = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

// Hamburger menu
const ham = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
if (ham) ham.addEventListener('click', () => {
  const abierto = navLinks.classList.toggle('open');
  ham.classList.toggle('open', abierto);
  ham.setAttribute('aria-expanded', abierto);
  document.body.style.overflow = abierto ? 'hidden' : '';
});

// Close menu on link click
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    if (ham) { ham.classList.remove('open'); ham.setAttribute('aria-expanded', 'false'); }
    document.body.style.overflow = '';
  });
});

// Active nav link
const currentPage = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a:not(.nav-cta)').forEach(a => {
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
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    el.textContent = target + suffix;
    return;
  }
  const DUR = 1400;
  const t0 = performance.now();
  // easeOutExpo: arranca rapido y frena al final; se lee mejor que el paso lineal
  const ease = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));
  function tick(now) {
    const t = Math.min((now - t0) / DUR, 1);
    el.textContent = Math.round(target * ease(t)) + suffix;
    if (t < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
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


// WhatsApp floating tooltip: aparece una vez tras 3s, se oculta sola a los 6s
const waFloat = document.getElementById('wa-float');
if (waFloat) {
  const shownKey = 'armynet_wa_tooltip_shown';
  setTimeout(() => {
    if (!sessionStorage.getItem(shownKey)) {
      waFloat.classList.add('show-tooltip');
      sessionStorage.setItem(shownKey, '1');
      setTimeout(() => waFloat.classList.remove('show-tooltip'), 6000);
    }
  }, 3000);
}

// Render de artículos del blog a partir de posts.js (window.ARMYNET_POSTS)
if (typeof window.ARMYNET_POSTS !== 'undefined') {
  const blogList = document.getElementById('blogList');
  if (blogList) {
    blogList.innerHTML = window.ARMYNET_POSTS.map(post => `
      <article class="blog-card" id="${post.id}">
        <div class="blog-card-icon"><i class="fas ${post.icon}"></i></div>
        <div class="blog-meta"><span class="ptag">${post.tag}</span><span class="blog-date">Guía práctica</span></div>
        <h2>${post.title}</h2>
        ${post.paragraphs.map(p => `<p>${p}</p>`).join('')}
        <a href="${post.ctaHref}" class="btn btn-primary btn-sm">${post.ctaText} <i class="fas fa-arrow-right"></i></a>
      </article>
    `).join('');
  }

  const blogTeasers = document.getElementById('blogTeasers');
  if (blogTeasers) {
    blogTeasers.innerHTML = window.ARMYNET_POSTS.slice(0, 3).map(post => `
      <a href="blog.html#${post.id}" class="blog-teaser-card">
        <i class="fas ${post.icon}"></i>
        <h4>${post.title}</h4>
        <span>Leer más <i class="fas fa-arrow-right"></i></span>
      </a>
    `).join('');
  }
}