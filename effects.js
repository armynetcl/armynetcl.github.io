/* ArmyNet — capa de efectos visuales. Todo aqui es decorativo: si falla,
   el sitio sigue siendo perfectamente usable. Respeta prefers-reduced-motion. */
(() => {
  'use strict';
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* --- 1. Barra de progreso de lectura --------------------------------- */
  const bar = document.createElement('div');
  bar.id = 'read-progress';
  document.body.appendChild(bar);
  const onScrollProgress = () => {
    const h = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + '%';
  };
  addEventListener('scroll', onScrollProgress, { passive: true });
  onScrollProgress();

  /* --- 2. Halo que sigue al cursor en las tarjetas ---------------------- */
  if (!reduce && matchMedia('(hover:hover)').matches) {
    const sel = '.service-card,.social-card,.post-card,.project-card,.why-item';
    document.addEventListener('pointermove', (e) => {
      const card = e.target.closest(sel);
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', ((e.clientX - r.left) / r.width) * 100 + '%');
      card.style.setProperty('--my', ((e.clientY - r.top) / r.height) * 100 + '%');
    }, { passive: true });
  }

  /* --- 3. Escalonado del revelado en grillas ---------------------------- */
  document.querySelectorAll('.grid-3, .why-grid').forEach((grid) => {
    [...grid.children].forEach((child, i) => child.style.setProperty('--i', i));
  });

  /* --- 4. Marquesina: duplicar el contenido para que el bucle sea continuo */
  const marquee = document.querySelector('.trust-bar-inner');
  if (marquee && !reduce) {
    marquee.append(...[...marquee.children].map((n) => n.cloneNode(true)));
  }

  /* --- 5. Constelacion del hero (guino a "redes") ----------------------- */
  const hero = document.querySelector('.hero');
  if (hero && !reduce) {
    const canvas = document.createElement('canvas');
    canvas.id = 'hero-canvas';
    canvas.setAttribute('aria-hidden', 'true');
    hero.prepend(canvas);
    const ctx = canvas.getContext('2d');

    let w = 0, h = 0, nodes = [], raf = null;
    const pointer = { x: -9999, y: -9999 };
    const DENSITY = 13000;   // 1 nodo por cada N px^2
    const MAX_NODES = 90;
    const LINK = 148;        // distancia maxima de enlace
    const PULL = 170;        // radio de influencia del cursor

    function build() {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      const r = hero.getBoundingClientRect();
      w = r.width; h = r.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const n = Math.min(MAX_NODES, Math.round((w * h) / DENSITY));
      nodes = Array.from({ length: n }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - .5) * .28,
        vy: (Math.random() - .5) * .28,
        r: Math.random() * 1.5 + .7,
      }));
    }

    function frame() {
      ctx.clearRect(0, 0, w, h);

      for (const p of nodes) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        // atraccion suave hacia el cursor
        const dx = pointer.x - p.x, dy = pointer.y - p.y;
        const d = Math.hypot(dx, dy);
        if (d < PULL && d > 0) {
          const f = (1 - d / PULL) * .5;
          p.x += (dx / d) * f; p.y += (dy / d) * f;
        }
      }

      // enlaces
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d > LINK) continue;
          ctx.strokeStyle = `rgba(12,241,249,${(1 - d / LINK) * .26})`;
          ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
      }

      // nodos
      for (const p of nodes) {
        const near = Math.hypot(pointer.x - p.x, pointer.y - p.y) < PULL;
        ctx.fillStyle = near ? 'rgba(110,247,251,.95)' : 'rgba(12,241,249,.62)';
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      }

      raf = requestAnimationFrame(frame);
    }

    function start() { if (!raf) raf = requestAnimationFrame(frame); }
    function stop()  { if (raf) { cancelAnimationFrame(raf); raf = null; } }

    hero.addEventListener('pointermove', (e) => {
      const r = hero.getBoundingClientRect();
      pointer.x = e.clientX - r.left; pointer.y = e.clientY - r.top;
    }, { passive: true });
    hero.addEventListener('pointerleave', () => { pointer.x = pointer.y = -9999; });

    let rt;
    addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(build, 180); }, { passive: true });

    // No quemar CPU cuando el hero no se ve o la pestana esta oculta
    new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()), { threshold: 0 }).observe(hero);
    document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));

    build(); start();
  }
})();
