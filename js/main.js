// ── Neural Network Canvas Background ──
function initNeuralBg(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, nodes = [], raf;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function initNodes(count = 55) {
    nodes = [];
    for (let i = 0; i < count; i++) {
      nodes.push({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 2.5 + 1,
        pulse: Math.random() * Math.PI * 2
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    const t = Date.now() * 0.001;
    nodes.forEach(n => {
      n.x += n.vx; n.y += n.vy;
      if (n.x < 0 || n.x > W) n.vx *= -1;
      if (n.y < 0 || n.y > H) n.vy *= -1;
      n.pulse += 0.02;
    });
    // Edges
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 160) {
          const alpha = (1 - dist/160) * 0.4;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = `rgba(99,102,241,${alpha})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }
    // Nodes
    nodes.forEach(n => {
      const pulse = Math.sin(n.pulse) * 0.5 + 0.5;
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r + pulse * 1.2, 0, Math.PI*2);
      ctx.fillStyle = `rgba(129,140,248,${0.4 + pulse * 0.4})`;
      ctx.fill();
    });
    raf = requestAnimationFrame(draw);
  }

  window.addEventListener('resize', () => { resize(); initNodes(); });
  resize(); initNodes(); draw();
}

// ── Custom Cursor ──
function initCursor() {
  const c = document.getElementById('cursor');
  const r = document.getElementById('cursor-ring');
  if (!c || !r) return;
  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
  (function loop() {
    rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12;
    c.style.left = mx + 'px'; c.style.top = my + 'px';
    r.style.left = rx + 'px'; r.style.top  = ry + 'px';
    requestAnimationFrame(loop);
  })();
}

// ── Active Nav Link ──
function setActiveNav() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href && (href === path || href.endsWith(path))) {
      a.classList.add('active');
    }
  });
}

// ── Scroll Reveal ──
function initScrollReveal() {
  const els = document.querySelectorAll('[data-reveal]');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.animation = `fadeUp 0.7s ${e.target.dataset.delay || '0s'} ease both`;
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  els.forEach(el => {
    el.style.opacity = '0';
    obs.observe(el);
  });
}

// ── Page Manager (localStorage) ──
const PAGE_KEY = 'sahil_custom_pages';

function getCustomPages() {
  try { return JSON.parse(localStorage.getItem(PAGE_KEY)) || []; } catch { return []; }
}

function saveCustomPages(pages) {
  localStorage.setItem(PAGE_KEY, JSON.stringify(pages));
}

function renderCustomNavLinks() {
  const pages = getCustomPages();
  const container = document.getElementById('custom-nav-links');
  if (!container) return;
  container.innerHTML = '';
  pages.forEach(p => {
    const a = document.createElement('a');
    a.href = `pages/custom_${p.id}.html`;
    a.innerHTML = `${p.icon} ${p.title}`;
    container.appendChild(a);
  });
}

function renderCustomFooterLinks() {
  const pages = getCustomPages();
  const container = document.getElementById('custom-footer-links');
  if (!container) return;
  container.innerHTML = '';
  pages.forEach(p => {
    const a = document.createElement('a');
    a.href = `pages/custom_${p.id}.html`;
    a.textContent = `${p.icon} ${p.title}`;
    container.appendChild(a);
  });
}

// ── Add Page Modal ──
function initAddPageModal() {
  const btn   = document.getElementById('add-page-btn');
  const overlay = document.getElementById('add-page-modal');
  const closeBtn = document.getElementById('modal-close');
  const form  = document.getElementById('add-page-form');
  if (!btn || !overlay) return;

  btn.addEventListener('click', () => overlay.classList.add('open'));
  closeBtn?.addEventListener('click', () => overlay.classList.remove('open'));
  overlay.addEventListener('click', e => { if (e.target === overlay) overlay.classList.remove('open'); });

  // Icon picker
  let selectedIcon = '📄';
  document.querySelectorAll('.icon-option').forEach(opt => {
    opt.addEventListener('click', () => {
      document.querySelectorAll('.icon-option').forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
      selectedIcon = opt.textContent.trim();
    });
  });

  form?.addEventListener('submit', e => {
    e.preventDefault();
    const title   = document.getElementById('page-title-input').value.trim();
    const section = document.getElementById('page-section-input').value.trim();
    const content = document.getElementById('page-content-input').value.trim();
    if (!title) return;

    const id = Date.now();
    const pages = getCustomPages();
    pages.push({ id, title, section, content, icon: selectedIcon });
    saveCustomPages(pages);

    // Generate the page HTML and inform user
    const pageData = { id, title, section, content, icon: selectedIcon };
    generateCustomPageNotice(pageData);

    overlay.classList.remove('open');
    renderCustomNavLinks();
    renderCustomFooterLinks();
    form.reset();
    showToast(`Page "${title}" saved! Download the generated file to add to your site.`);
  });
}

function generateCustomPageNotice(page) {
  console.log('Custom page data:', page);
}

// ── Toast Notification ──
function showToast(msg, type = 'success') {
  const t = document.createElement('div');
  t.className = 'toast';
  t.textContent = msg;
  t.style.cssText = `
    position:fixed; bottom:32px; right:32px; z-index:9000;
    background:var(--surface2); border:1px solid var(--border);
    color:var(--text); font-family:var(--font-mono); font-size:13px;
    padding:14px 20px; border-radius:12px;
    animation:fadeUp 0.4s ease both;
    max-width:360px; line-height:1.5;
  `;
  document.body.appendChild(t);
  setTimeout(() => { t.style.opacity = '0'; t.style.transition = 'opacity 0.4s'; setTimeout(() => t.remove(), 400); }, 3500);
}

// ── Profile Picture Upload ──
function initProfilePicUpload() {
  const input   = document.getElementById('pfp-upload');
  const preview = document.getElementById('pfp-preview');
  const placeholder = document.getElementById('pfp-placeholder');
  if (!input || !preview) return;

  const saved = localStorage.getItem('sahil_pfp');
  if (saved) { preview.src = saved; preview.style.display = 'block'; if(placeholder) placeholder.style.display = 'none'; }

  input.addEventListener('change', e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      const data = ev.target.result;
      localStorage.setItem('sahil_pfp', data);
      preview.src = data;
      preview.style.display = 'block';
      if (placeholder) placeholder.style.display = 'none';
      showToast('Profile photo updated!');
    };
    reader.readAsDataURL(file);
  });
}

// ── Typing Effect ──
function initTypingEffect(el, texts, speed = 80) {
  if (!el) return;
  let ti = 0, ci = 0, del = false;
  function tick() {
    const txt = texts[ti];
    if (!del) {
      el.textContent = txt.slice(0, ++ci);
      if (ci === txt.length) { del = true; return setTimeout(tick, 1800); }
    } else {
      el.textContent = txt.slice(0, --ci);
      if (ci === 0) { del = false; ti = (ti+1) % texts.length; return setTimeout(tick, 400); }
    }
    setTimeout(tick, del ? speed/2 : speed);
  }
  tick();
}

// ── Particle Click Effect ──
function initParticleClicks() {
  document.addEventListener('click', e => {
    for (let i = 0; i < 8; i++) {
      const p = document.createElement('div');
      const angle = (i / 8) * Math.PI * 2;
      const dist  = 40 + Math.random() * 30;
      p.style.cssText = `
        position:fixed; width:4px; height:4px; border-radius:50%;
        background:var(--accent2); pointer-events:none; z-index:9999;
        left:${e.clientX}px; top:${e.clientY}px;
        transition:transform 0.5s ease-out, opacity 0.5s ease-out;
      `;
      document.body.appendChild(p);
      requestAnimationFrame(() => {
        p.style.transform = `translate(${Math.cos(angle)*dist}px, ${Math.sin(angle)*dist}px)`;
        p.style.opacity = '0';
      });
      setTimeout(() => p.remove(), 600);
    }
  });
}

// ── Init All ──
document.addEventListener('DOMContentLoaded', () => {
  initNeuralBg('neural-canvas');
  initCursor();
  setActiveNav();
  initScrollReveal();
  renderCustomNavLinks();
  renderCustomFooterLinks();
  initAddPageModal();
  initProfilePicUpload();
  initParticleClicks();
  initTypingEffect(
    document.getElementById('typing-text'),
    ['Gen AI Developer', 'Quantum ML Researcher', 'IIT Jodhpur Alumni', 'Data Science Enthusiast', 'GATE Qualifier']
  );
});
