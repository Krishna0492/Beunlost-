/**
 * UNLOST — Student Dashboard Controller
 * Powers the 10 workspace cards, progress calculations, and interactive state.
 */

window.UnlostDashboard = {
  init() {
    this.student = window.UnlostApp.getStudentProfile();
    this.bookmarks = window.UnlostApp.getBookmarks();
    this.renderHeader();
    this.renderCards();
    this.setupEventListeners();
  },

  renderHeader() {
    const greetingEl = document.getElementById('dashboard-greeting');
    if (greetingEl) {
      greetingEl.textContent = `WELCOME BACK, ${(this.student.fullName || 'STUDENT').toUpperCase()}.`;
    }

    const avatarNameEl = document.getElementById('sidebar-student-name');
    if (avatarNameEl) {
      avatarNameEl.textContent = this.student.fullName || 'Student';
    }

    const avatarSubEl = document.getElementById('sidebar-student-stream');
    if (avatarSubEl) {
      avatarSubEl.textContent = this.student.stream || 'Secondary Education';
    }
  },

  renderCards() {
    this.renderCareerDirection();
    this.renderRoadmap();
    this.renderSkills();
    this.renderCollegeShortlist();
    this.renderExamTracker();
    this.renderScholarshipTracker();
    this.renderLearningGoals();
    this.renderRecentActivity();
    this.renderRecommendedSteps();
  },

  // CARD 1: My Career Direction
  renderCareerDirection() {
    const container = document.getElementById('card-career-direction');
    if (!container) return;

    const careers = this.student.careerGoals || ['Software Architect'];
    container.innerHTML = `
      <div style="margin-bottom: 1rem;">
        <span class="tag tag-silver">Active Focus</span>
        <h4 style="color:#ffffff; font-size:1.15rem; margin-top:0.4rem; font-weight:700;">${careers.join(' & ')}</h4>
        <p style="color:var(--text-muted); font-size:0.85rem; margin-top:0.25rem;">
          Aligned with your selected stream: <strong style="color:#ffffff;">${this.student.stream}</strong>
        </p>
      </div>
      <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
        ${(this.student.interests || []).map(i => `<span class="tag">${i}</span>`).join('')}
      </div>
      <div style="margin-top: 1.25rem;">
        <a href="./career-explorer.html" class="btn btn-outline btn-sm">Explore Careers</a>
        <a href="./profile.html" class="btn btn-ghost btn-sm">Edit Direction</a>
      </div>
    `;
  },

  // CARD 2: My Roadmap
  renderRoadmap() {
    const container = document.getElementById('card-roadmap');
    if (!container) return;

    const activeRoadmap = window.UNLOST_DATA.roadmaps[0];
    const completedMilestones = JSON.parse(localStorage.getItem('unlost_completed_milestones') || '["sw-m1"]');
    const total = activeRoadmap.milestones.length;
    const completed = activeRoadmap.milestones.filter(m => completedMilestones.includes(m.id)).length;
    const percent = Math.round((completed / total) * 100);

    container.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <div>
          <h4 style="color:#fff; font-size:1rem; font-weight:600;">${activeRoadmap.title}</h4>
          <span style="color:var(--text-muted); font-size:0.8rem;">Current: ${activeRoadmap.milestones[completed < total ? completed : total - 1].title}</span>
        </div>
        <span class="tag tag-silver">${percent}% Complete</span>
      </div>
      <div class="progress-bar-wrapper">
        <div class="progress-track">
          <div class="progress-fill" style="width: ${percent}%;"></div>
        </div>
      </div>
      <ul class="interactive-list" style="margin-top: 0.75rem;">
        ${activeRoadmap.milestones.slice(0, 3).map(m => {
          const isDone = completedMilestones.includes(m.id);
          return `
            <li class="interactive-item">
              <div class="item-left">
                <input type="checkbox" class="item-checkbox" data-mid="${m.id}" ${isDone ? 'checked' : ''}>
                <span style="color:${isDone ? 'var(--text-muted)' : '#ffffff'}; text-decoration:${isDone ? 'line-through' : 'none'};">
                  ${m.title}
                </span>
              </div>
              <span class="tag" style="font-size:0.7rem;">${m.duration}</span>
            </li>
          `;
        }).join('')}
      </ul>
      <div style="margin-top: 1rem;">
        <a href="./roadmap-details.html?id=${activeRoadmap.id}" class="btn btn-outline btn-sm">View Full Roadmap</a>
      </div>
    `;
  },

  // CARD 3: Skill Development
  renderSkills() {
    const container = document.getElementById('card-skills');
    if (!container) return;

    const completedSkills = JSON.parse(localStorage.getItem('unlost_completed_skills') || '["sk-problem-solving"]');
    const skills = window.UNLOST_DATA.skills;

    container.innerHTML = `
      <ul class="interactive-list">
        ${skills.slice(0, 4).map(s => {
          const isDone = completedSkills.includes(s.id);
          return `
            <li class="interactive-item">
              <div class="item-left">
                <input type="checkbox" class="skill-checkbox" data-sid="${s.id}" ${isDone ? 'checked' : ''}>
                <div>
                  <div style="color:${isDone ? 'var(--text-muted)' : '#ffffff'}; font-weight:600; text-decoration:${isDone ? 'line-through' : 'none'};">${s.title}</div>
                  <div style="font-size:0.75rem; color:var(--text-muted);">${s.category} • ${s.level}</div>
                </div>
              </div>
              <span class="tag ${isDone ? 'tag-success' : 'tag-silver'}">${isDone ? 'Mastered' : 'In Progress'}</span>
            </li>
          `;
        }).join('')}
      </ul>
      <div style="margin-top: 1rem;">
        <a href="./skill-development.html" class="btn btn-outline btn-sm">Manage All Skills</a>
      </div>
    `;
  },

  // CARD 4: College Shortlist
  renderCollegeShortlist() {
    const container = document.getElementById('card-colleges');
    if (!container) return;

    const savedIds = this.bookmarks.colleges || ['iit-bombay'];
    const colleges = window.UNLOST_DATA.colleges.filter(c => savedIds.includes(c.id));

    if (colleges.length === 0) {
      container.innerHTML = `
        <p style="color:var(--text-muted); font-size:0.9rem;">No colleges shortlisted yet.</p>
        <a href="./colleges.html" class="btn btn-outline btn-sm" style="margin-top:0.75rem;">Discover Colleges</a>
      `;
      return;
    }

    container.innerHTML = `
      <ul class="interactive-list">
        ${colleges.map(c => `
          <li class="interactive-item">
            <div>
              <div style="color:#ffffff; font-weight:600;">${c.name}</div>
              <div style="color:var(--text-muted); font-size:0.75rem;">${c.location}</div>
            </div>
            <a href="./college-details.html?id=${c.id}" class="btn btn-ghost btn-sm" style="padding:0.25rem 0.5rem;">Details</a>
          </li>
        `).join('')}
      </ul>
      <div style="margin-top: 1rem;">
        <a href="./colleges.html" class="btn btn-outline btn-sm">Find More Colleges</a>
      </div>
    `;
  },

  // CARD 5: Entrance Exam Tracker
  renderExamTracker() {
    const container = document.getElementById('card-exams');
    if (!container) return;

    const savedIds = this.bookmarks.exams || ['jee-advanced'];
    const exams = window.UNLOST_DATA.entranceExams.filter(e => savedIds.includes(e.id));

    container.innerHTML = `
      <ul class="interactive-list">
        ${exams.map(e => `
          <li class="interactive-item">
            <div>
              <div style="color:#ffffff; font-weight:600;">${e.name}</div>
              <div style="color:var(--text-muted); font-size:0.75rem;">${e.datesNote}</div>
            </div>
            <a href="./exam-details.html?id=${e.id}" class="btn btn-ghost btn-sm" style="padding:0.25rem 0.5rem;">Syllabus</a>
          </li>
        `).join('')}
      </ul>
      <div style="margin-top: 1rem;">
        <a href="./entrance-exams.html" class="btn btn-outline btn-sm">Browse Exams</a>
      </div>
    `;
  },

  // CARD 6: Scholarship Tracker
  renderScholarshipTracker() {
    const container = document.getElementById('card-scholarships');
    if (!container) return;

    const savedIds = this.bookmarks.scholarships || ['inspire-dst'];
    const scholarships = window.UNLOST_DATA.scholarships.filter(s => savedIds.includes(s.id));

    container.innerHTML = `
      <ul class="interactive-list">
        ${scholarships.map(s => `
          <li class="interactive-item">
            <div>
              <div style="color:#ffffff; font-weight:600;">${s.name}</div>
              <div style="color:var(--text-muted); font-size:0.75rem;">${s.amount}</div>
            </div>
            <span class="tag tag-silver">Saved</span>
          </li>
        `).join('')}
      </ul>
      <div style="margin-top: 1rem;">
        <a href="./scholarships.html" class="btn btn-outline btn-sm">Explore Scholarships</a>
      </div>
    `;
  },

  // CARD 7: My Learning Goals
  renderLearningGoals() {
    const container = document.getElementById('card-goals');
    if (!container) return;

    const goals = JSON.parse(localStorage.getItem('unlost_weekly_goals') || JSON.stringify([
      { id: 'g1', text: 'Solve 10 algorithm problems (Arrays & Maps)', done: true },
      { id: 'g2', text: 'Review Class 12 Calculus & Vector Algebra', done: false },
      { id: 'g3', text: 'Read 2 research articles on AI alignment', done: false }
    ]));

    container.innerHTML = `
      <ul class="interactive-list">
        ${goals.map(g => `
          <li class="interactive-item">
            <div class="item-left">
              <input type="checkbox" class="goal-checkbox" data-gid="${g.id}" ${g.done ? 'checked' : ''}>
              <span style="color:${g.done ? 'var(--text-muted)' : '#ffffff'}; text-decoration:${g.done ? 'line-through' : 'none'};">
                ${g.text}
              </span>
            </div>
          </li>
        `).join('')}
      </ul>
      <div style="margin-top: 1rem; display:flex; gap:0.5rem;">
        <input type="text" id="new-goal-input" placeholder="Add a target milestone..." class="form-input" style="padding:0.4rem 0.75rem; font-size:0.85rem;">
        <button id="add-goal-btn" class="btn btn-primary btn-sm">Add</button>
      </div>
    `;
  },

  // CARD 8: Recent Activity
  renderRecentActivity() {
    const container = document.getElementById('card-activity');
    if (!container) return;

    container.innerHTML = `
      <div style="display:flex; flex-direction:column; gap:0.85rem; font-size:0.85rem;">
        <div style="display:flex; gap:0.75rem; align-items:flex-start;">
          <div style="width:8px; height:8px; border-radius:50%; background:var(--silver-metallic); margin-top:6px;"></div>
          <div>
            <div style="color:#ffffff;">Explored <a href="./career-details.html?id=software-engineer" style="text-decoration:underline;">Software Engineer & Systems</a></div>
            <div style="color:var(--text-dim); font-size:0.75rem;">Today</div>
          </div>
        </div>
        <div style="display:flex; gap:0.75rem; align-items:flex-start;">
          <div style="width:8px; height:8px; border-radius:50%; background:var(--accent-green); margin-top:6px;"></div>
          <div>
            <div style="color:#ffffff;">Saved <a href="./colleges.html" style="text-decoration:underline;">IIT Bombay</a> to your college shortlist</div>
            <div style="color:var(--text-dim); font-size:0.75rem;">Yesterday</div>
          </div>
        </div>
        <div style="display:flex; gap:0.75rem; align-items:flex-start;">
          <div style="width:8px; height:8px; border-radius:50%; background:var(--silver-metallic); margin-top:6px;"></div>
          <div>
            <div style="color:#ffffff;">Completed student orientation and onboarding</div>
            <div style="color:var(--text-dim); font-size:0.75rem;">2 days ago</div>
          </div>
        </div>
      </div>
    `;
  },

  // CARD 9: Recommended Next Steps
  renderRecommendedSteps() {
    const container = document.getElementById('card-recommendations');
    if (!container) return;

    container.innerHTML = `
      <div style="background:rgba(255,255,255,0.02); border:1px solid var(--border-subtle); border-radius:var(--radius-md); padding:1rem; margin-bottom:0.75rem;">
        <div style="font-weight:600; color:#ffffff; font-size:0.9rem;">1. Take the Aptitude Discovery Quiz</div>
        <div style="color:var(--text-muted); font-size:0.8rem; margin:0.25rem 0 0.5rem;">Confirm whether your analytical traits lean more toward core systems engineering or artificial intelligence.</div>
        <a href="./aptitude-test.html" class="btn btn-metallic btn-sm">Start 5-Min Test</a>
      </div>
      <div style="background:rgba(255,255,255,0.02); border:1px solid var(--border-subtle); border-radius:var(--radius-md); padding:1rem;">
        <div style="font-weight:600; color:#ffffff; font-size:0.9rem;">2. Review JEE Advanced Syllabus</div>
        <div style="color:var(--text-muted); font-size:0.8rem; margin:0.25rem 0 0.5rem;">Benchmark your Class 12 mathematics & physics preparation against verified requirements.</div>
        <a href="./exam-details.html?id=jee-advanced" class="btn btn-outline btn-sm">Review Exam Details</a>
      </div>
    `;
  },

  setupEventListeners() {
    // Milestone toggling
    document.addEventListener('change', (e) => {
      if (e.target.classList.contains('item-checkbox')) {
        const mid = e.target.getAttribute('data-mid');
        let completed = JSON.parse(localStorage.getItem('unlost_completed_milestones') || '["sw-m1"]');
        if (e.target.checked) {
          if (!completed.includes(mid)) completed.push(mid);
        } else {
          completed = completed.filter(id => id !== mid);
        }
        localStorage.setItem('unlost_completed_milestones', JSON.stringify(completed));
        this.renderRoadmap();
      }

      // Skill toggling
      if (e.target.classList.contains('skill-checkbox')) {
        const sid = e.target.getAttribute('data-sid');
        let completed = JSON.parse(localStorage.getItem('unlost_completed_skills') || '["sk-problem-solving"]');
        if (e.target.checked) {
          if (!completed.includes(sid)) completed.push(sid);
        } else {
          completed = completed.filter(id => id !== sid);
        }
        localStorage.setItem('unlost_completed_skills', JSON.stringify(completed));
        this.renderSkills();
      }

      // Goal toggling
      if (e.target.classList.contains('goal-checkbox')) {
        const gid = e.target.getAttribute('data-gid');
        let goals = JSON.parse(localStorage.getItem('unlost_weekly_goals') || '[]');
        goals = goals.map(g => g.id === gid ? { ...g, done: e.target.checked } : g);
        localStorage.setItem('unlost_weekly_goals', JSON.stringify(goals));
        this.renderLearningGoals();
      }
    });

    // Add Goal button
    const addGoalBtn = document.getElementById('add-goal-btn');
    const newGoalInput = document.getElementById('new-goal-input');
    if (addGoalBtn && newGoalInput) {
      addGoalBtn.addEventListener('click', () => {
        const text = newGoalInput.value.trim();
        if (!text) return;
        let goals = JSON.parse(localStorage.getItem('unlost_weekly_goals') || '[]');
        goals.push({ id: 'g_' + Date.now(), text, done: false });
        localStorage.setItem('unlost_weekly_goals', JSON.stringify(goals));
        newGoalInput.value = '';
        this.renderLearningGoals();
        window.UnlostApp.showToast('Learning goal added');
      });
    }

    // Sidebar Mobile Toggle
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebar = document.querySelector('.dashboard-sidebar');
    const backdrop = document.querySelector('.sidebar-backdrop');
    if (sidebarToggle && sidebar && backdrop) {
      sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('open');
        backdrop.classList.toggle('active');
      });
      backdrop.addEventListener('click', () => {
        sidebar.classList.remove('open');
        backdrop.classList.remove('active');
      });
    }

    // PDF Report Generator Download Triggers
    const triggerReportDownload = () => {
      let surveyData = null;
      try {
        const raw = localStorage.getItem('unlost_survey_result');
        if (raw) surveyData = JSON.parse(raw);
      } catch (e) {}

      if (!surveyData) {
        // Build fallback survey data from student profile
        const activeCareer = (this.student.careerGoals && this.student.careerGoals[0]) || 'Software Architect';
        surveyData = {
          answers: {
            fullName: this.student.fullName || 'Student',
            currentClass: this.student.stream || '12th Standard',
            stream: this.student.stream || 'Science (PCM)',
            primaryMotivation: 'Mastering core technologies, technical depth, and solving complex problems.',
            workEnvironment: 'Hybrid / Deep focus studio',
            dailyStudyHours: '4-6 Hours'
          },
          recommendedCareers: [
            {
              id: 'software-engineer',
              title: activeCareer,
              fitScore: 94,
              matchReason: 'Direct alignment with your analytical problem solving and quantitative aptitude.',
              primarySkills: ['Systems Design', 'Algorithms', 'Full-stack Architecture', 'Data Structures'],
              roadmapStages: [
                'Phase 1: Foundations & Core Mathematics',
                'Phase 2: Data Structures & Project Portfolio',
                'Phase 3: Real-World Systems & Distributed Apps',
                'Phase 4: Industry Leadership & System Architecture'
              ]
            },
            {
              id: 'ai-researcher',
              title: 'AI / Machine Learning Engineer',
              fitScore: 91,
              matchReason: 'Exceptional mathematical interest and curiosity for automated intelligence models.',
              primarySkills: ['Linear Algebra', 'PyTorch', 'Vector Embeddings', 'Model Fine-tuning'],
              roadmapStages: ['Math Foundations', 'Core ML Algorithms', 'Deep Learning & Transformers', 'Production Deployment']
            },
            {
              id: 'data-scientist',
              title: 'Data & Quantitative Analyst',
              fitScore: 87,
              matchReason: 'High affinity for pattern recognition, statistical reasoning, and data analysis.',
              primarySkills: ['Python', 'SQL', 'Statistical Modeling', 'Visualization'],
              roadmapStages: ['Statistics Fundamentals', 'Data Wrangling', 'Predictive Modeling', 'Strategic Impact']
            }
          ]
        };
      }

      if (window.UnlostReportGenerator) {
        window.UnlostApp.showToast('Generating your personalized 6-page PDF report...');
        if (typeof window.UnlostReportGenerator.generate6PageReport === 'function') {
          window.UnlostReportGenerator.generate6PageReport(surveyData, surveyData.analysis);
        } else if (typeof window.UnlostReportGenerator.downloadReportPDF === 'function') {
          window.UnlostReportGenerator.downloadReportPDF(surveyData, surveyData.analysis);
        }
      } else {
        window.location.href = './survey.html';
      }
    };

    const topbarPdfBtn = document.getElementById('topbar-download-pdf-btn');
    if (topbarPdfBtn) {
      topbarPdfBtn.addEventListener('click', triggerReportDownload);
    }
    const heroPdfBtn = document.getElementById('hero-download-pdf-btn');
    if (heroPdfBtn) {
      heroPdfBtn.addEventListener('click', triggerReportDownload);
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  if (document.body.classList.contains('dashboard-page')) {
    window.UnlostDashboard.init();
  }
});
