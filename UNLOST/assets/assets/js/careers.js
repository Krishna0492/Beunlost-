/**
 * UNLOST — Career Explorer & Details Controller
 */

window.UnlostCareers = {
  getData() {
    return (window.UNLOST_DATA && window.UNLOST_DATA.careers) ? window.UNLOST_DATA.careers : [];
  },

  initExplorer() {
    this.careers = this.getData();
    if (!this.careers.length) {
      setTimeout(() => {
        this.careers = this.getData();
        this.renderCareerGrid(this.careers);
        this.setupFilters();
      }, 150);
      return;
    }
    this.renderCareerGrid(this.careers);
    this.setupFilters();
  },

  renderCareerGrid(items) {
    const grid = document.getElementById('careers-grid');
    if (!grid) return;

    if (items.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem;">
          <p style="color: var(--text-muted); font-size: 1.1rem;">No matching careers found.</p>
          <button onclick="window.UnlostCareers.resetFilters()" class="btn btn-outline btn-sm" style="margin-top: 1rem;">Reset Filters</button>
        </div>
      `;
      return;
    }

    grid.innerHTML = items.map(c => {
      const isSaved = (window.UnlostApp && typeof window.UnlostApp.isSaved === 'function') ? window.UnlostApp.isSaved('careers', c.id) : false;
      return `
        <div class="charcoal-card" style="display:flex; flex-direction:column; justify-content:space-between;">
          <div>
            <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:0.75rem;">
              <span class="tag tag-silver">${c.category}</span>
              <button onclick="window.UnlostCareers.toggleSave('${c.id}', this)" class="btn btn-ghost btn-icon" title="Save career">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="${isSaved ? 'white' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
              </button>
            </div>
            <h3 class="card-title">${c.title}</h3>
            <p class="card-desc">${c.overview}</p>
            <div style="margin-bottom:1.25rem;">
              <div style="font-size:0.78rem; text-transform:uppercase; letter-spacing:0.06em; color:var(--text-dim); margin-bottom:0.4rem;">Essential Skills</div>
              <div style="display:flex; flex-wrap:wrap; gap:0.35rem;">
                ${c.importantSkills.slice(0, 3).map(s => `<span class="tag">${s}</span>`).join('')}
              </div>
            </div>
          </div>
          <div style="display:flex; gap:0.5rem; border-top:1px solid var(--border-subtle); padding-top:1rem; margin-top:0.5rem;">
            <button onclick="window.UnlostCareers.handleViewProfile('${c.id}')" class="btn btn-primary btn-sm" style="flex:1;">View Career Profile</button>
            <a href="./roadmaps.html?career=${c.id}" class="btn btn-outline btn-sm" title="View Roadmap">Roadmap</a>
          </div>
        </div>
      `;
    }).join('');
  },

  handleViewProfile(careerId) {
    const targetUrl = `./career-details.html?id=${encodeURIComponent(careerId)}`;
    window.location.href = targetUrl;
  },

  setupFilters() {
    const searchInput = document.getElementById('career-search');
    const categorySelect = document.getElementById('category-filter');
    const educationSelect = document.getElementById('education-filter');

    const apply = () => {
      const q = (searchInput?.value || '').toLowerCase().trim();
      const cat = categorySelect?.value || 'all';
      const edu = educationSelect?.value || 'all';

      const filtered = this.careers.filter(c => {
        const matchesQuery = !q || c.title.toLowerCase().includes(q) || c.overview.toLowerCase().includes(q) || c.importantSkills.some(s => s.toLowerCase().includes(q));
        const matchesCat = cat === 'all' || c.category.toLowerCase() === cat.toLowerCase();
        const matchesEdu = edu === 'all' || c.educationLevel.toLowerCase().includes(edu.toLowerCase());
        return matchesQuery && matchesCat && matchesEdu;
      });

      this.renderCareerGrid(filtered);
    };

    if (searchInput) searchInput.addEventListener('input', apply);
    if (categorySelect) categorySelect.addEventListener('change', apply);
    if (educationSelect) educationSelect.addEventListener('change', apply);
  },

  resetFilters() {
    const s = document.getElementById('career-search');
    const c = document.getElementById('category-filter');
    const e = document.getElementById('education-filter');
    if (s) s.value = '';
    if (c) c.value = 'all';
    if (e) e.value = 'all';
    this.renderCareerGrid(this.careers);
  },

  toggleSave(id, btn) {
    const isNowSaved = (window.UnlostApp && typeof window.UnlostApp.toggleBookmark === 'function') ? window.UnlostApp.toggleBookmark('careers', id) : false;
    const svg = btn ? btn.querySelector('svg') : null;
    if (svg) {
      svg.setAttribute('fill', isNowSaved ? 'white' : 'none');
    }
    const saveBtnText = document.getElementById('save-career-btn');
    if (saveBtnText) {
      saveBtnText.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="${isNowSaved ? 'white' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
        ${isNowSaved ? 'Saved' : 'Save Career'}
      `;
    }
  },

  // Detail Page Controller
  initDetails() {
    const data = window.UNLOST_DATA;
    if (!data || !data.careers) {
      setTimeout(() => this.initDetails(), 150);
      return;
    }
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id') || 'software-engineer';
    const career = data.careers.find(c => c.id === id) || data.careers[0];
    if (!career) return;

    document.title = `${career.title} — UNLOST Career Discovery`;
    const container = document.getElementById('career-details-content');
    if (!container) return;

    const isSaved = (window.UnlostApp && typeof window.UnlostApp.isSaved === 'function') ? window.UnlostApp.isSaved('careers', career.id) : false;
    const related = data.careers.filter(c => (career.relatedCareerIds || []).includes(c.id));

    const user = (window.UnlostAuth && typeof window.UnlostAuth.getCurrentUser === 'function') ? window.UnlostAuth.getCurrentUser() : null;
    const currentUrl = window.location.href;
    const signInUrl = `./login.html?redirect=${encodeURIComponent(currentUrl)}`;
    const registerUrl = `./register.html?redirect=${encodeURIComponent(currentUrl)}`;

    container.innerHTML = `
      <div style="margin-bottom: 2rem;">
        <a href="./career-explorer.html" style="color:var(--text-muted); font-size:0.85rem; display:inline-flex; align-items:center; gap:0.4rem; margin-bottom:1rem;">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
          Back to Career Explorer
        </a>
        <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:1rem;">
          <div>
            <div style="display:flex; gap:0.5rem; margin-bottom:0.75rem;">
              <span class="tag tag-silver">${career.category}</span>
              <span class="tag">${career.industry}</span>
              ${!user ? `<span class="tag" style="background:rgba(255,255,255,0.08); color:var(--silver-metallic); border:1px solid rgba(255,255,255,0.2);">Public Preview</span>` : `<span class="tag" style="background:rgba(16,185,129,0.15); color:#6ee7b7; border:1px solid rgba(16,185,129,0.3);">Full Profile Unlocked</span>`}
            </div>
            <h1 class="section-title" style="margin-bottom:0.5rem;">${career.title}</h1>
            <p class="section-subtitle">${career.overview}</p>
          </div>
          <div style="display:flex; gap:0.75rem; flex-wrap:wrap;">
            <button onclick="window.UnlostCareers.toggleSave('${career.id}', this)" class="btn btn-outline" id="save-career-btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="${isSaved ? 'white' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
              ${isSaved ? 'Saved' : 'Save Career'}
            </button>
            <a href="./roadmaps.html?career=${career.id}" class="btn btn-primary">
              View Career Roadmap
            </a>
          </div>
        </div>
      </div>

      ${!user ? `
        <!-- Unauthenticated Gating Banner -->
        <div class="charcoal-card" style="margin-bottom:2rem; padding:1.75rem; border:1px solid rgba(255,255,255,0.2); background:linear-gradient(135deg, rgba(20,20,20,0.95), rgba(10,10,10,0.98)); box-shadow:0 12px 30px rgba(0,0,0,0.7);">
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1.25rem;">
            <div>
              <div style="display:flex; align-items:center; gap:0.5rem; margin-bottom:0.4rem;">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color:var(--silver-metallic);"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                <span style="font-weight:700; color:#ffffff; font-size:1.1rem; text-transform:uppercase; letter-spacing:0.04em;">Sign In to Unlock Full Career Intelligence</span>
              </div>
              <p style="color:var(--text-muted); font-size:0.9rem; max-width:650px; line-height:1.5;">
                You are viewing the introductory public preview. Sign in to access full institutional requirements, entrance examination breakdowns, salary progression, verified learning resources, and sync with your personalized dashboard.
              </p>
            </div>
            <div style="display:flex; gap:0.75rem;">
              <a href="${signInUrl}" class="btn btn-primary btn-sm" style="font-weight:700; padding:0.65rem 1.25rem;">Sign In</a>
              <a href="${registerUrl}" class="btn btn-outline btn-sm" style="font-weight:700; padding:0.65rem 1.25rem;">Create Free Account</a>
            </div>
          </div>
        </div>
      ` : ''}

      <div style="display:grid; grid-template-columns: 2fr 1fr; gap:2rem;">
        <div style="display:flex; flex-direction:column; gap:2rem;">
          <!-- What they do (Always Visible in Preview) -->
          <div class="charcoal-card">
            <h3 class="card-title">What Professionals In This Field Do</h3>
            <ul style="list-style:none; display:flex; flex-direction:column; gap:0.75rem; margin-top:1rem;">
              ${career.whatTheyDo.map(item => `
                <li style="display:flex; align-items:flex-start; gap:0.75rem; color:var(--text-primary); font-size:0.95rem;">
                  <span style="color:var(--silver-metallic); font-weight:bold;">•</span>
                  <span>${item}</span>
                </li>
              `).join('')}
            </ul>
          </div>

          <!-- Education & Courses -->
          <div class="charcoal-card" style="${!user ? 'position:relative; overflow:hidden;' : ''}">
            <h3 class="card-title">Required Education & Recommended Courses</h3>
            <div style="margin-top:1rem;">
              <h4 style="font-size:0.85rem; text-transform:uppercase; color:var(--silver-metallic); letter-spacing:0.08em; margin-bottom:0.5rem;">Educational Pathways</h4>
              <ul style="list-style:none; display:flex; flex-direction:column; gap:0.5rem; margin-bottom:1.5rem;">
                ${career.requiredEducation.map(e => `
                  <li style="color:var(--text-muted); font-size:0.9rem; display:flex; gap:0.5rem;">
                    <span>✓</span> <span>${e}</span>
                  </li>
                `).join('')}
              </ul>
              <h4 style="font-size:0.85rem; text-transform:uppercase; color:var(--silver-metallic); letter-spacing:0.08em; margin-bottom:0.5rem;">Relevant University Curricula</h4>
              <div style="display:flex; flex-wrap:wrap; gap:0.4rem;">
                ${career.relevantCourses.map(c => `<span class="tag">${c}</span>`).join('')}
              </div>
            </div>
          </div>

          <!-- Career Pathways -->
          <div class="charcoal-card">
            <h3 class="card-title">Typical Career Trajectory</h3>
            <div style="margin-top:1rem;">
              ${career.careerPathways.map(p => `
                <div style="padding:0.75rem; background:var(--bg-pitch); border:1px solid var(--border-subtle); border-radius:var(--radius-md); font-size:0.9rem; color:#ffffff; margin-bottom:0.5rem;">
                  ${p}
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <div style="display:flex; flex-direction:column; gap:2rem;">
          <!-- Skills (Always Visible in Preview) -->
          <div class="charcoal-card">
            <h3 class="card-title">Critical Skills</h3>
            <div style="display:flex; flex-direction:column; gap:0.5rem; margin-top:1rem;">
              ${career.importantSkills.map(s => `
                <div style="padding:0.6rem 0.85rem; background:var(--bg-pitch); border-radius:var(--radius-md); font-size:0.88rem; color:#ffffff; display:flex; justify-content:space-between;">
                  <span>${s}</span>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Entrance Exams -->
          <div class="charcoal-card">
            <h3 class="card-title">Relevant Entrance Exams</h3>
            <div style="display:flex; flex-direction:column; gap:0.5rem; margin-top:1rem;">
              ${career.entranceExams.map(ex => `
                <div style="padding:0.6rem 0.85rem; background:var(--bg-pitch); border-radius:var(--radius-md); font-size:0.88rem; color:#ffffff;">
                  ${ex}
                </div>
              `).join('')}
            </div>
            <a href="./entrance-exams.html" class="btn btn-outline btn-sm" style="margin-top:1rem; width:100%;">View Exam Dates & Pattern</a>
          </div>

          <!-- Learning Resources -->
          <div class="charcoal-card">
            <h3 class="card-title">Verified Learning Resources</h3>
            <ul style="list-style:none; display:flex; flex-direction:column; gap:0.75rem; margin-top:1rem;">
              ${career.learningResources.map(r => `
                <li style="font-size:0.85rem;">
                  <span class="tag tag-silver" style="font-size:0.7rem; margin-bottom:0.25rem;">${r.type}</span>
                  <div style="color:#ffffff; font-weight:500;">${r.title}</div>
                </li>
              `).join('')}
            </ul>
          </div>

          <!-- Related Careers -->
          ${related.length > 0 ? `
            <div class="charcoal-card">
              <h3 class="card-title">Related Fields</h3>
              <div style="display:flex; flex-direction:column; gap:0.5rem; margin-top:1rem;">
                ${related.map(rc => `
                  <a href="./career-details.html?id=${rc.id}" style="padding:0.6rem; border-radius:var(--radius-md); border:1px solid var(--border-subtle); display:block;">
                    <div style="font-size:0.88rem; color:#ffffff; font-weight:600;">${rc.title}</div>
                    <div style="font-size:0.75rem; color:var(--text-muted);">${rc.category}</div>
                  </a>
                `).join('')}
              </div>
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }
};
