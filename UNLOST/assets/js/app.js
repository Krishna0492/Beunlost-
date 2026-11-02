/**
 * UNLOST — Global Application Utilities & Bookmark Store
 */

const BOOKMARKS_STORAGE_KEY = 'unlost_student_bookmarks';
const ONBOARDING_STORAGE_KEY = 'unlost_student_profile';

window.UnlostApp = {
  init() {
    this.initMobileNav();
    this.updateNavAuthState();
    this.initScrollAnimations();
  },

  // Scroll reveal animation observer
  initScrollAnimations() {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));
  },

  // Toggle mobile navigation menu
  initMobileNav() {
    const toggleBtn = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (toggleBtn && navLinks) {
      toggleBtn.addEventListener('click', () => {
        navLinks.classList.toggle('mobile-open');
      });
    }
  },

  // Update navbar based on login state
  updateNavAuthState() {
    const user = window.UnlostAuth ? window.UnlostAuth.getCurrentUser() : null;
    const authActions = document.querySelector('.nav-actions');
    if (!authActions) return;

    if (user) {
      authActions.innerHTML = `
        <a href="./dashboard.html" class="btn btn-outline btn-sm">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
          Dashboard
        </a>
        <button onclick="window.UnlostAuth.logout()" class="btn btn-ghost btn-sm" title="Log out">
          Sign Out
        </button>
      `;
    }
  },

  // Bookmark Management
  getBookmarks() {
    try {
      const data = localStorage.getItem(BOOKMARKS_STORAGE_KEY);
      return data ? JSON.parse(data) : {
        careers: ["software-engineer"],
        roadmaps: ["roadmap-software"],
        colleges: ["iit-bombay"],
        exams: ["jee-advanced"],
        skills: ["sk-programming"],
        scholarships: ["inspire-dst"]
      };
    } catch (e) {
      return { careers: [], roadmaps: [], colleges: [], exams: [], skills: [], scholarships: [] };
    }
  },

  saveBookmarks(bookmarks) {
    localStorage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify(bookmarks));
  },

  isSaved(type, id) {
    const b = this.getBookmarks();
    return b[type] && b[type].includes(id);
  },

  toggleBookmark(type, id, title = 'Item') {
    const b = this.getBookmarks();
    if (!b[type]) b[type] = [];

    const index = b[type].indexOf(id);
    let isNowSaved = false;
    if (index > -1) {
      b[type].splice(index, 1);
      isNowSaved = false;
      this.showToast(`Removed from Saved Items`);
    } else {
      b[type].push(id);
      isNowSaved = true;
      this.showToast(`Saved to your student workspace`);
    }
    this.saveBookmarks(b);
    return isNowSaved;
  },

  // Student Profile Onboarding Info
  getStudentProfile() {
    try {
      const data = localStorage.getItem(ONBOARDING_STORAGE_KEY);
      if (data) return JSON.parse(data);
    } catch (e) {}

    const auth = window.UnlostAuth ? window.UnlostAuth.getCurrentUser() : null;
    return {
      fullName: auth ? auth.name : 'Aarav Sharma',
      email: auth ? auth.email : 'student@unlost.in',
      educationLevel: 'High School (11th-12th)',
      currentClass: 'Class 12',
      country: 'India',
      state: 'Maharashtra',
      stream: 'Science (PCM)',
      subjects: 'Physics, Chemistry, Mathematics, Computer Science, English',
      board: 'CBSE',
      interests: ['Technology', 'Engineering', 'Design'],
      careerGoals: ['Software Architect', 'AI/ML Specialist'],
      preferredCourses: ['B.Tech Computer Science'],
      learningStyle: 'Hands-on Projects & Problem Solving',
      skillsGoal: 'Data Structures, Modern Web Architecture & Python',
      weeklyGoalHours: 12
    };
  },

  saveStudentProfile(profile) {
    localStorage.setItem(ONBOARDING_STORAGE_KEY, JSON.stringify(profile));
  },

  // Toast Notification
  showToast(message) {
    let toast = document.getElementById('unlost-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'unlost-toast';
      toast.style.position = 'fixed';
      toast.style.bottom = '24px';
      toast.style.right = '24px';
      toast.style.background = '#181922';
      toast.style.color = '#ffffff';
      toast.style.border = '1px solid rgba(192, 197, 206, 0.3)';
      toast.style.borderRadius = '8px';
      toast.style.padding = '12px 20px';
      toast.style.fontSize = '0.9rem';
      toast.style.zIndex = '9999';
      toast.style.boxShadow = '0 8px 24px rgba(0,0,0,0.5)';
      toast.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      toast.style.transform = 'translateY(10px)';
      toast.style.opacity = '0';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.style.transform = 'translateY(0)';
    toast.style.opacity = '1';

    clearTimeout(this._toastTimeout);
    this._toastTimeout = setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
    }, 2800);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  window.UnlostApp.init();
});
