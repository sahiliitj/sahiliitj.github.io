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
  if (!c || !r) { console.warn('Custom cursor elements not found'); return; }
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
  // Generate HTML content and provide download link
  const html = generateCustomPageHTML(page, '../');
  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  
  // Create and trigger download
  const a = document.createElement('a');
  a.href = url;
  a.download = `custom_${page.id}.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  
  showToast(`📥 Downloaded: custom_${page.id}.html — Save to pages/ folder`);
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

// ── Compress Image ──
function compressImage(file, maxWidth = 200, quality = 0.7, callback) {
  const reader = new FileReader();
  reader.onload = (e) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;
      if (width > height && width > maxWidth) {
        height = Math.round((height * maxWidth) / width);
        width = maxWidth;
      } else if (height > maxWidth) {
        width = Math.round((width * maxWidth) / height);
        height = maxWidth;
      }
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);
      callback(canvas.toDataURL('image/jpeg', quality));
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

// ── Profile Picture Upload (Enhanced) ──
function initProfilePicUpload() {
  const input   = document.getElementById('pfp-upload');
  const preview = document.getElementById('pfp-preview');
  const placeholder = document.getElementById('pfp-placeholder');
  const badge = document.querySelector('.pfp-upload-badge');
  if (!input || !preview) return;

  const saved = localStorage.getItem('sahil_pfp');
  if (saved) { 
    preview.src = saved; 
    preview.style.display = 'block'; 
    if(placeholder) placeholder.style.display = 'none';
    if(badge) badge.style.opacity = '0.7';
  }

  input.addEventListener('change', e => {
    const file = e.target.files[0];
    if (!file) return;
    
    showToast('Compressing image...');
    compressImage(file, 200, 0.75, (compressed) => {
      try {
        localStorage.setItem('sahil_pfp', compressed);
        preview.src = compressed;
        preview.style.display = 'block';
        if (placeholder) placeholder.style.display = 'none';
        if (badge) badge.classList.add('anim-pulse');
        showToast('✓ Profile photo updated!');
        setTimeout(() => { if(badge) badge.classList.remove('anim-pulse'); }, 2000);
      } catch (err) { 
        showToast('Storage error. Please clear some space.'); 
      }
    });
  });
}

// ── Generate Custom Page HTML ──
function generateCustomPageHTML(page, prefix = '') {
  const { id, title, section, content, icon } = page;
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} — Sahil Sharma</title>
  <link rel="stylesheet" href="${prefix}css/main.css">
</head>
<body>
  <script src="${prefix}js/components.js"><\/script>
  <script>document.write(getNavHTML('${prefix}'));<\/script>
  
  <div class="page-content">
    <section class="section" style="padding-top: 120px;">
      <div class="container">
        <div class="section-eyebrow" data-reveal>${icon} ${title}</div>
        <h1 class="section-title" data-reveal>${title}</h1>
        ${section ? `<h2 class="section-sub" data-reveal>${section}</h2>` : ''}
        <div data-reveal style="margin-top:32px; padding:20px; background:var(--surface); border-radius:12px; border:1px solid var(--border2);">
          <p style="color:var(--text2); line-height:1.8;">${content || 'Content goes here...'}</p>
        </div>
        <div style="margin-top:48px;">
          <a href="${prefix}index.html" class="btn btn-primary">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/><\/svg>
            Back to Home
          </a>
        </div>
      </div>
    </section>
  </div>

  <script>document.write(getFooterHTML('${prefix}'));<\/script>
  <script src="${prefix}js/main.js"><\/script>
</body>
</html>`;
}

// ── Typing Effect ──
function initTypingEffect(el, texts, speed = 80) {
  if (!el) return;
  let ti = 0, ci = 0, del = false, timeouts = [];
  function tick() {
    const txt = texts[ti];
    if (!del) {
      el.textContent = txt.slice(0, ++ci);
      if (ci === txt.length) { del = true; return timeouts.push(setTimeout(tick, 1800)); }
    } else {
      el.textContent = txt.slice(0, --ci);
      if (ci === 0) { del = false; ti = (ti+1) % texts.length; return timeouts.push(setTimeout(tick, 400)); }
    }
    timeouts.push(setTimeout(tick, del ? speed/2 : speed));
  }
  tick();
  // Cleanup on navigation
  return () => { timeouts.forEach(t => clearTimeout(t)); };
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
