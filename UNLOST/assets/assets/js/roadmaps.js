/**
 * UNLOST — Career Roadmap Builder & Milestone Tracker
 */

window.UnlostRoadmaps = {
  getData() {
    return (window.UNLOST_DATA && window.UNLOST_DATA.roadmaps) ? window.UNLOST_DATA.roadmaps : [];
  },

  initExplorer() {
    this.roadmaps = this.getData();
    if (!this.roadmaps.length) {
      setTimeout(() => {
        this.roadmaps = this.getData();
        this.renderRoadmapGrid();
      }, 150);
      return;
    }
    this.renderRoadmapGrid();
  },

  renderRoadmapGrid() {
    const grid = document.getElementById('roadmaps-grid');
    if (!grid) return;

    if (!this.roadmaps || !this.roadmaps.length) {
      this.roadmaps = this.getData();
    }

    const completedMilestones = JSON.parse(localStorage.getItem('unlost_completed_milestones') || '["sw-m1"]');

    grid.innerHTML = this.roadmaps.map(rm => {
      const total = rm.milestones ? rm.milestones.length : 1;
      const completed = rm.milestones ? rm.milestones.filter(m => completedMilestones.includes(m.id)).length : 0;
      const percent = Math.round((completed / total) * 100);
      const isSaved = (window.UnlostApp && typeof window.UnlostApp.isSaved === 'function') ? window.UnlostApp.isSaved('roadmaps', rm.id) : false;

      return `
        <div class="charcoal-card" style="display:flex; flex-direction:column; justify-content:space-between;">
          <div>
            <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:0.75rem;">
              <span class="tag tag-silver">${rm.milestones ? rm.milestones.length : 0} Sequential Milestones</span>
              <button onclick="window.UnlostRoadmaps.toggleSave('${rm.id}', this)" class="btn btn-ghost btn-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="${isSaved ? 'white' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
              </button>
            </div>
            <h3 class="card-title">${rm.title}</h3>
            <p class="card-desc">${rm.overview}</p>

            <div class="progress-bar-wrapper">
              <div class="progress-bar-info">
                <span>Personal Progress</span>
                <span>${percent}%</span>
              </div>
              <div class="progress-track">
                <div class="progress-fill" style="width: ${percent}%;"></div>
              </div>
            </div>
          </div>

          <div style="margin-top:1.5rem; display:flex; gap:0.5rem;">
            <a href="./roadmap-details.html?id=${rm.id}" class="btn btn-primary btn-sm" style="flex:1;">Open Roadmap Steps</a>
            <a href="./career-details.html?id=${rm.careerId}" class="btn btn-outline btn-sm">Career Overview</a>
          </div>
        </div>
      `;
    }).join('');
  },

  toggleSave(id, btn) {
    const isNowSaved = (window.UnlostApp && typeof window.UnlostApp.toggleBookmark === 'function') ? window.UnlostApp.toggleBookmark('roadmaps', id) : false;
    const svg = btn ? btn.querySelector('svg') : null;
    if (svg) svg.setAttribute('fill', isNowSaved ? 'white' : 'none');
  },

  // Roadmap Details Controller
  initDetails() {
    const data = window.UNLOST_DATA;
    if (!data || !data.roadmaps) {
      setTimeout(() => this.initDetails(), 150);
      return;
    }
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id') || 'roadmap-software';
    const rm = data.roadmaps.find(r => r.id === id) || data.roadmaps[0];
    if (!rm) return;

    document.title = `${rm.title} — UNLOST Milestones`;
    const container = document.getElementById('roadmap-details-content');
    if (!container) return;

    this.currentRoadmap = rm;
    this.renderRoadmapDetailsView();
  },

  renderRoadmapDetailsView() {
    const container = document.getElementById('roadmap-details-content');
    const rm = this.currentRoadmap;
    const completed = JSON.parse(localStorage.getItem('unlost_completed_milestones') || '["sw-m1"]');
    const total = rm.milestones.length;
    const doneCount = rm.milestones.filter(m => completed.includes(m.id)).length;
    const percent = Math.round((doneCount / total) * 100);
    const isSaved = window.UnlostApp.isSaved('roadmaps', rm.id);

    container.innerHTML = `
      <div style="margin-bottom: 2.5rem;">
        <a href="./roadmaps.html" style="color:var(--text-muted); font-size:0.85rem; display:inline-flex; align-items:center; gap:0.4rem; margin-bottom:1rem;">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
          Back to All Roadmaps
        </a>
        <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:1.5rem;">
          <div>
            <span class="tag tag-silver" style="margin-bottom:0.5rem;">Official Pathway</span>
            <h1 class="section-title" style="margin-bottom:0.5rem;">${rm.title}</h1>
            <p class="section-subtitle">${rm.overview}</p>
          </div>
          <div style="display:flex; gap:0.75rem;">
            <button onclick="window.UnlostRoadmaps.toggleSave('${rm.id}', this)" class="btn btn-outline">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="${isSaved ? 'white' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
              ${isSaved ? 'Saved to Workspace' : 'Save Roadmap'}
            </button>
            <a href="./career-details.html?id=${rm.careerId}" class="btn btn-primary">Career Details</a>
          </div>
        </div>

        <!-- Progress Overview -->
        <div class="charcoal-card" style="margin-top:2rem; padding:1.25rem 1.75rem;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.5rem;">
            <span style="font-weight:600; color:#fff;">Milestones Progress: ${doneCount} of ${total} Completed</span>
            <span class="tag tag-silver" style="font-size:0.85rem; font-weight:700;">${percent}%</span>
          </div>
          <div class="progress-track" style="height:10px;">
            <div class="progress-fill" style="width: ${percent}%;"></div>
          </div>
        </div>
      </div>

      <!-- Chronological Milestones Sequence -->
      <div style="display:flex; flex-direction:column; gap:1.75rem;">
        ${rm.milestones.map((m, idx) => {
          const isDone = completed.includes(m.id);
          return `
            <div class="charcoal-card" style="border-left: 4px solid ${isDone ? 'var(--accent-green)' : 'var(--silver-metallic)'};">
              <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:1rem;">
                <div>
                  <div style="display:flex; align-items:center; gap:0.75rem; margin-bottom:0.35rem;">
                    <span class="tag tag-silver">Step ${idx + 1}</span>
                    <span style="font-size:0.8rem; color:var(--text-muted); text-transform:uppercase; letter-spacing:0.06em;">${m.phase}</span>
                  </div>
                  <h3 style="color:#ffffff; font-size:1.2rem; font-weight:700; margin-bottom:0.5rem;">${m.title}</h3>
                </div>
                <div style="display:flex; align-items:center; gap:0.75rem;">
                  <span class="tag" style="color:var(--silver-metallic);">${m.duration}</span>
                  <label style="display:flex; align-items:center; gap:0.5rem; cursor:pointer; background:var(--bg-pitch); padding:0.4rem 0.8rem; border-radius:var(--radius-md); border:1px solid var(--border-subtle);">
                    <input type="checkbox" class="milestone-toggle" data-id="${m.id}" ${isDone ? 'checked' : ''} style="accent-color:var(--accent-green); width:16px; height:16px;">
                    <span style="font-size:0.825rem; font-weight:600; color:${isDone ? 'var(--accent-green)' : '#fff'};">${isDone ? 'Completed' : 'Mark Complete'}</span>
                  </label>
                </div>
              </div>

              <div style="margin-top:1.25rem;">
                <div style="font-size:0.82rem; font-weight:700; text-transform:uppercase; color:var(--silver-metallic); letter-spacing:0.06em; margin-bottom:0.6rem;">Key Milestones & Practical Actions</div>
                <ul style="list-style:none; display:flex; flex-direction:column; gap:0.5rem;">
                  ${m.keyActions.map(action => `
                    <li style="display:flex; align-items:flex-start; gap:0.65rem; color:var(--text-primary); font-size:0.92rem;">
                      <span style="color:var(--silver-metallic); margin-top:2px;">•</span>
                      <span>${action}</span>
                    </li>
                  `).join('')}
                </ul>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;

    // Hook up checkboxes
    container.querySelectorAll('.milestone-toggle').forEach(chk => {
      chk.addEventListener('change', (e) => {
        const mid = e.target.getAttribute('data-id');
        let currentCompleted = JSON.parse(localStorage.getItem('unlost_completed_milestones') || '["sw-m1"]');
        if (e.target.checked) {
          if (!currentCompleted.includes(mid)) currentCompleted.push(mid);
          window.UnlostApp.showToast('Milestone marked complete!');
        } else {
          currentCompleted = currentCompleted.filter(id => id !== mid);
          window.UnlostApp.showToast('Milestone updated');
        }
        localStorage.setItem('unlost_completed_milestones', JSON.stringify(currentCompleted));
        this.renderRoadmapDetailsView();
      });
    });
  }
};
