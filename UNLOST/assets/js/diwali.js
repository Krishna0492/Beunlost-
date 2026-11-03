/**
 * UNLOST — Premium Diwali Festive Controller 🪔
 * High performance, zero external dependencies, accessible, and responsive.
 */

window.UnlostDiwali = {
  isDismissed() {
    try {
      return sessionStorage.getItem('unlost_diwali_dismissed') === 'true';
    } catch (e) {
      return false;
    }
  },

  setDismissed() {
    try {
      sessionStorage.setItem('unlost_diwali_dismissed', 'true');
    } catch (e) {}
  },

  getDiyaSvg(size = 48) {
    const scale = size / 64;
    return `
      <svg class="diwali-diya" width="${size}" height="${size}" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle class="diwali-halo" cx="32" cy="22" r="18" fill="url(#diwali-halo-${size})" opacity="0.6"/>
        <path class="diwali-flame" d="M32 4C32 4 23 16 23 24C23 28.97 27.03 33 32 33C36.97 33 41 28.97 41 24C41 16 32 4 32 4Z" fill="url(#diwali-flame-${size})"/>
        <path class="diwali-flame" d="M32 12C32 12 27 19 27 24C27 26.76 29.24 29 32 29C34.76 29 37 26.76 37 24C37 19 32 12 32 12Z" fill="#FFFBEB"/>
        <path d="M12 34C12 34 16 52 32 52C48 52 52 34 52 34C52 34 40 37 32 37C24 37 12 34 12 34Z" fill="url(#diwali-base-${size})" stroke="#F59E0B" stroke-width="1.5"/>
        <path d="M26 52H38V56C38 57.1 37.1 58 36 58H28C26.9 58 26 57.1 26 56V52Z" fill="#B45309"/>
        <defs>
          <radialGradient id="diwali-halo-${size}" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#FBBF24" stop-opacity="0.8"/>
            <stop offset="100%" stop-color="#F59E0B" stop-opacity="0"/>
          </radialGradient>
          <linearGradient id="diwali-flame-${size}" x1="32" y1="4" x2="32" y2="33" gradientUnits="userSpaceOnUse">
            <stop stop-color="#FEF08A"/>
            <stop offset="0.45" stop-color="#F59E0B"/>
            <stop offset="1" stop-color="#EA580C"/>
          </linearGradient>
          <linearGradient id="diwali-base-${size}" x1="12" y1="34" x2="52" y2="52" gradientUnits="userSpaceOnUse">
            <stop stop-color="#D97706"/>
            <stop offset="1" stop-color="#78350F"/>
          </linearGradient>
        </defs>
      </svg>
    `;
  },

  // Initialize Canvas Sparkles
  initSparkles() {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    if (document.getElementById('diwali-sparkles-canvas')) return;

    const canvas = document.createElement('canvas');
    canvas.id = 'diwali-sparkles-canvas';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const maxParticles = window.innerWidth < 768 ? 20 : 36;

    for (let i = 0; i < maxParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2.2 + 0.8,
        speedY: Math.random() * 0.45 + 0.15,
        speedX: (Math.random() - 0.5) * 0.25,
        opacity: Math.random() * 0.7 + 0.2,
        color: Math.random() > 0.4 ? '#fbbf24' : '#f59e0b',
        pulse: Math.random() * Math.PI
      });
    }

    let isRunning = true;
    const animate = () => {
      if (!isRunning) return;
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y -= p.speedY;
        p.x += p.speedX;
        p.pulse += 0.03;
        const currentOpacity = Math.max(0.1, Math.sin(p.pulse) * p.opacity);

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = currentOpacity;
        ctx.shadowBlur = 6;
        ctx.shadowColor = '#fbbf24';
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  },

  // Show Ribbon on Homepage
  renderRibbon() {
    const isHome = window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/');
    if (!isHome) return;

    const nav = document.querySelector('header.site-nav, header.navbar');
    if (!nav) return;

    const ribbon = document.createElement('div');
    ribbon.className = 'diwali-ribbon';
    ribbon.id = 'diwali-header-ribbon';
    ribbon.innerHTML = `
      <div class="diwali-ribbon-content">
        <span class="diwali-ribbon-badge">
          ${this.getDiyaSvg(18)} Shubh Deepavali
        </span>
        <span>
          May the festival of lights illuminate your path from confusion to clarity.
        </span>
        <button type="button" class="diwali-ribbon-btn" id="open-diwali-modal-btn">
          Read Festive Greeting 🪔
        </button>
      </div>
      <button type="button" class="diwali-ribbon-close" id="close-diwali-ribbon-btn" aria-label="Dismiss Announcement">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </button>
    `;

    nav.parentNode.insertBefore(ribbon, nav);

    document.getElementById('close-diwali-ribbon-btn')?.addEventListener('click', () => {
      ribbon.style.display = 'none';
      this.setDismissed();
    });

    document.getElementById('open-diwali-modal-btn')?.addEventListener('click', () => {
      this.showGreetingModal(true);
    });
  },

  // Show Festive Greeting Modal
  showGreetingModal(force = false) {
    if (!force && this.isDismissed()) return;

    // Only auto-open on homepage
    const isHome = window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/');
    if (!force && !isHome) return;

    if (document.getElementById('diwali-greeting-modal')) return;

    const modal = document.createElement('div');
    modal.id = 'diwali-greeting-modal';
    modal.className = 'diwali-modal-backdrop';
    modal.innerHTML = `
      <div class="diwali-modal-card" role="dialog" aria-modal="true" aria-labelledby="diwali-title">
        <button class="diwali-modal-close" id="diwali-close-btn" aria-label="Close Greeting">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>

        <div style="margin: 0 auto; display: flex; justify-content: center;">
          ${this.getDiyaSvg(68)}
        </div>

        <h3 id="diwali-title" class="diwali-greeting-title">
          शुभ दीपावली • Happy Diwali
        </h3>

        <div style="font-size: 0.85rem; color: #fbbf24; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 0.75rem;">
          Festival of Knowledge, Light & Courage
        </div>

        <p class="diwali-greeting-body">
          In every student's journey, the hardest step is stepping out of the dark unknown. Every verified milestone you reach is a gentle lamp dispelling uncertainty. May this season bring wisdom, quiet focus, and unshakeable direction to your academic dreams.
        </p>

        <div style="display: flex; gap: 0.75rem; justify-content: center; flex-wrap: wrap;">
          <button type="button" class="btn btn-primary" id="diwali-enter-btn" style="background: linear-gradient(135deg, #f59e0b, #d97706); border: none; color: #ffffff; font-weight: 700; padding: 0.75rem 1.5rem;">
            Enter UNLOST 🪔
          </button>
          <a href="./survey.html" class="btn btn-outline" style="border-color: rgba(251, 191, 36, 0.4); color: #fde68a;">
            Find My Direction →
          </a>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    const closeModal = () => {
      modal.remove();
      this.setDismissed();
    };

    document.getElementById('diwali-close-btn')?.addEventListener('click', closeModal);
    document.getElementById('diwali-enter-btn')?.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', function escHandler(e) {
      if (e.key === 'Escape') {
        closeModal();
        document.removeEventListener('keydown', escHandler);
      }
    });
  },

  // Add Subtle Diya Badge to Login Page
  enhanceLoginPage() {
    const isLogin = window.location.pathname.includes('login.html');
    if (!isLogin) return;

    const loginCard = document.querySelector('.charcoal-card');
    if (!loginCard) return;

    if (document.getElementById('login-diwali-badge')) return;

    const badge = document.createElement('div');
    badge.id = 'login-diwali-badge';
    badge.className = 'login-diwali-badge';
    badge.innerHTML = `
      ${this.getDiyaSvg(20)}
      <span>Wishing you clarity & bright milestones this Diwali</span>
    `;

    // Insert above form heading
    const firstChild = loginCard.firstChild;
    loginCard.insertBefore(badge, firstChild);
  },

  init() {
    this.initSparkles();
    this.renderRibbon();
    this.enhanceLoginPage();

    // Auto-open greeting modal on first homepage visit
    const isHome = window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/');
    if (isHome && !this.isDismissed()) {
      setTimeout(() => this.showGreetingModal(false), 900);
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  window.UnlostDiwali.init();
});
