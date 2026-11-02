/**
 * UNLOST — Student Profile & Settings Controller
 */

window.UnlostProfile = {
  initProfilePage() {
    if (window.UnlostAuth) {
      const user = window.UnlostAuth.requireAuth();
      if (!user) return;
    }
    const profile = window.UnlostApp.getStudentProfile();
    this.populateProfileForm(profile);
    this.setupProfileListeners();
  },

  populateProfileForm(p) {
    const setVal = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.value = val || '';
    };

    setVal('prof-name', p.fullName);
    setVal('prof-email', p.email);
    setVal('prof-level', p.educationLevel);
    setVal('prof-class', p.currentClass);
    setVal('prof-country', p.country);
    setVal('prof-state', p.state);
    setVal('prof-stream', p.stream);
    setVal('prof-subjects', p.subjects);
    setVal('prof-board', p.board);
    setVal('prof-style', p.learningStyle);
    setVal('prof-hours', p.weeklyGoalHours);

    // Profile header tags
    const nameDisplay = document.getElementById('display-profile-name');
    if (nameDisplay) nameDisplay.textContent = p.fullName || 'Student';

    const streamDisplay = document.getElementById('display-profile-stream');
    if (streamDisplay) streamDisplay.textContent = `${p.educationLevel} • ${p.stream}`;
  },

  setupProfileListeners() {
    const form = document.getElementById('profile-edit-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const p = window.UnlostApp.getStudentProfile();
        p.fullName = document.getElementById('prof-name').value;
        p.educationLevel = document.getElementById('prof-level').value;
        p.currentClass = document.getElementById('prof-class').value;
        p.state = document.getElementById('prof-state').value;
        p.stream = document.getElementById('prof-stream').value;
        p.subjects = document.getElementById('prof-subjects').value;
        p.board = document.getElementById('prof-board').value;
        p.learningStyle = document.getElementById('prof-style').value;
        p.weeklyGoalHours = Number(document.getElementById('prof-hours').value) || 10;

        window.UnlostApp.saveStudentProfile(p);
        window.UnlostApp.showToast('Student profile updated successfully');
        this.populateProfileForm(p);
      });
    }
  },

  initSettingsPage() {
    if (window.UnlostAuth) {
      const user = window.UnlostAuth.requireAuth();
      if (!user) return;
    }
    const exportBtn = document.getElementById('export-data-btn');
    if (exportBtn) {
      exportBtn.addEventListener('click', () => {
        const fullData = {
          profile: window.UnlostApp.getStudentProfile(),
          bookmarks: window.UnlostApp.getBookmarks(),
          milestones: JSON.parse(localStorage.getItem('unlost_completed_milestones') || '[]'),
          skills: JSON.parse(localStorage.getItem('unlost_completed_skills') || '[]'),
          goals: JSON.parse(localStorage.getItem('unlost_weekly_goals') || '[]'),
          exportedAt: new Date().toISOString()
        };
        const blob = new Blob([JSON.stringify(fullData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `UNLOST-Student-Data-${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);
        window.UnlostApp.showToast('Student data exported');
      });
    }

    const clearBtn = document.getElementById('clear-data-btn');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to reset your local student workspace?')) {
          localStorage.removeItem('unlost_student_bookmarks');
          localStorage.removeItem('unlost_completed_milestones');
          localStorage.removeItem('unlost_completed_skills');
          localStorage.removeItem('unlost_weekly_goals');
          window.UnlostApp.showToast('Workspace reset to defaults');
          setTimeout(() => window.location.reload(), 1000);
        }
      });
    }

    const deletionBtn = document.getElementById('request-deletion-btn');
    if (deletionBtn) {
      deletionBtn.addEventListener('click', async () => {
        const reason = prompt('Please specify your reason for requesting complete account and data erasure (e.g. Completed admissions / No longer need platform):');
        if (reason === null) return;
        
        try {
          if (window.UnlostFirebase && typeof window.UnlostFirebase.submitDeletionRequest === 'function') {
            await window.UnlostFirebase.submitDeletionRequest(reason);
          }
          window.UnlostApp.showToast('Data erasure request submitted to administrator.');
          alert('Your request for data erasure has been logged. Under UNLOST privacy policy, your account records and survey responses will be processed for erasure.');
        } catch (err) {
          alert('Could not submit deletion request: ' + (err.message || 'Please ensure you are signed in.'));
        }
      });
    }
  }
};
