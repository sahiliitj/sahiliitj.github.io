// Shared nav HTML — injected by each page
function getNavHTML(prefix = '') {
  return `
  <div id="cursor"></div>
  <div id="cursor-ring"></div>

  <div class="neural-bg">
    <canvas id="neural-canvas"></canvas>
  </div>

  <nav>
    <a href="${prefix}index.html" class="nav-logo">
      <div class="nav-logo-mark">S</div>
      Sahil Sharma
    </a>
    <div class="nav-links">
      <a href="${prefix}index.html">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
        Home
      </a>
      <a href="${prefix}pages/about.html">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
        About
      </a>
      <a href="${prefix}pages/experience.html">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>
        Experience
      </a>
      <a href="${prefix}pages/research.html">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
        Research
      </a>
      <a href="${prefix}pages/achievements.html">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>
        Achievements
      </a>
      <a href="${prefix}pages/contact.html">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
        Contact
      </a>
      <span id="custom-nav-links" style="display:contents"></span>
      <button class="nav-add-btn" id="add-page-btn" data-tooltip="Add a new page">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        Add page
      </button>
    </div>
  </nav>
  `;
}

function getFooterHTML(prefix = '') {
  return `
  <footer>
    <div class="container">
      <div class="footer-grid">
        <div>
          <div class="footer-brand-name">Sahil Sharma</div>
          <div class="footer-brand-desc">
            Gen AI Developer & Quantum ML Researcher.<br>
            IIT Jodhpur · Axtria · DRDO · Google CSR.
          </div>
          <div class="footer-social">
            <a href="https://www.linkedin.com/in/sahil-sharma-2251b715b/" target="_blank" data-tooltip="LinkedIn">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
            <a href="mailto:sahilsharma@iitj.ac.in" data-tooltip="Email">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            </a>
            <a href="https://github.com/" target="_blank" data-tooltip="GitHub">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
            </a>
            <a href="https://scholar.google.com/" target="_blank" data-tooltip="Google Scholar">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
            </a>
            <a href="https://twitter.com/" target="_blank" data-tooltip="Twitter / X">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
          </div>
        </div>
        <div>
          <div class="footer-col-title">Navigation</div>
          <div class="footer-links">
            <a href="${prefix}index.html">Home</a>
            <a href="${prefix}pages/about.html">About</a>
            <a href="${prefix}pages/experience.html">Experience</a>
            <a href="${prefix}pages/research.html">Research</a>
          </div>
        </div>
        <div>
          <div class="footer-col-title">More</div>
          <div class="footer-links">
            <a href="${prefix}pages/achievements.html">Achievements</a>
            <a href="${prefix}pages/contact.html">Contact</a>
            <span id="custom-footer-links" style="display:contents"></span>
          </div>
        </div>
        <div>
          <div class="footer-col-title">Connect</div>
          <div class="footer-links">
            <a href="https://www.linkedin.com/in/sahil-sharma-2251b715b/" target="_blank">LinkedIn</a>
            <a href="mailto:sahilsharma@iitj.ac.in">Email me</a>
            <a href="${prefix}pages/contact.html">Hire me</a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <div class="footer-quote">
          "<span>Intelligence is not a destination — it is the direction.</span><br>
          Every model trained, every weight adjusted, brings us closer to understanding ourselves."
        </div>
        <div class="footer-copy">© 2025 Sahil Sharma · Built with ✦ & code</div>
      </div>
    </div>
  </footer>
  `;
}

function getAddPageModalHTML() {
  return `
  <div class="modal-overlay" id="add-page-modal">
    <div class="modal">
      <div class="modal-title">Add a new page</div>
      <div class="modal-sub">Create a new section to your portfolio — it will appear in the nav.</div>
      <form id="add-page-form">
        <div class="form-group">
          <label class="form-label" for="page-title-input">Page title</label>
          <input class="form-input" id="page-title-input" placeholder="e.g. Projects, Publications, Talks..." required>
        </div>
        <div class="form-group">
          <label class="form-label" for="page-section-input">Section heading</label>
          <input class="form-input" id="page-section-input" placeholder="e.g. My Open Source Projects">
        </div>
        <div class="form-group">
          <label class="form-label">Choose an icon</label>
          <div class="icon-grid">
            ${['🔬','💡','📊','🧬','🤖','🛰️','⚡','🧪','📡','🔭','🧠','💻','📝','🎯','🏆','🌐'].map(i => `<div class="icon-option">${i}</div>`).join('')}
          </div>
        </div>
        <div class="form-group">
          <label class="form-label" for="page-content-input">Content / description</label>
          <textarea class="form-textarea" id="page-content-input" placeholder="Describe what this page will contain..."></textarea>
        </div>
        <div class="modal-actions">
          <button type="button" class="btn btn-ghost" id="modal-close">Cancel</button>
          <button type="submit" class="btn btn-primary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Create page
          </button>
        </div>
      </form>
    </div>
  </div>
  `;
}
