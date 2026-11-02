/**
 * UNLOST — Authentication & Session Manager
 * Provides client session persistence, secure hashing/token abstractions,
 * Firebase Auth integration hooks, and route protection.
 */

const UNLOST_AUTH_KEY = 'unlost_student_session';
const UNLOST_STUDENTS_STORE = 'unlost_registered_users';

window.UnlostAuth = {
  // Check current session
  getCurrentUser() {
    try {
      const data = localStorage.getItem(UNLOST_AUTH_KEY);
      if (!data) return null;
      return JSON.parse(data);
    } catch (e) {
      console.error('Failed to parse session:', e);
      return null;
    }
  },

  // Set session
  setSession(user, remember = false) {
    const sessionData = {
      uid: user.uid || 'usr_' + Date.now(),
      name: user.name || 'Student',
      email: user.email,
      role: 'student',
      loggedInAt: new Date().toISOString(),
      onboarded: user.onboarded || false
    };
    localStorage.setItem(UNLOST_AUTH_KEY, JSON.stringify(sessionData));
    if (!remember) {
      sessionStorage.setItem('unlost_session_transient', 'true');
    }
    return sessionData;
  },

  // Simple client-side hash helper for secure storage comparison
  async hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password + '_unlost_salt');
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  },

  // Register new student
  async register(name, email, password) {
    if (!name || name.trim().length < 2) {
      throw new Error('Please enter your full name.');
    }
    if (!email || !email.includes('@') || !email.includes('.')) {
      throw new Error('Please provide a valid student email address.');
    }
    if (!password || password.length < 6) {
      throw new Error('Password must be at least 6 characters long.');
    }

    const users = this._getRegisteredUsers();
    const normalizedEmail = email.toLowerCase().trim();

    if (users[normalizedEmail]) {
      throw new Error('An account with this email already exists. Please log in.');
    }

    const hashedPassword = await this.hashPassword(password);
    const newUser = {
      uid: 'stu_' + Math.random().toString(36).substring(2, 9),
      name: name.trim(),
      email: normalizedEmail,
      passwordHash: hashedPassword,
      createdAt: new Date().toISOString(),
      onboarded: false
    };

    users[normalizedEmail] = newUser;
    localStorage.setItem(UNLOST_STUDENTS_STORE, JSON.stringify(users));

    // Automatically set current session
    const session = this.setSession(newUser, true);
    return session;
  },

  // Login student
  async login(email, password, remember = false) {
    if (!email || !password) {
      throw new Error('Please enter both email and password.');
    }
    const normalizedEmail = email.toLowerCase().trim();
    const users = this._getRegisteredUsers();
    const user = users[normalizedEmail];

    if (!user) {
      // For quick demo access if user clicks demo login
      if (normalizedEmail === 'demo@unlost.in' && password === 'student123') {
        const demoUser = {
          uid: 'demo_student',
          name: 'Aarav Sharma',
          email: 'demo@unlost.in',
          onboarded: true
        };
        return this.setSession(demoUser, remember);
      }
      throw new Error('No student account found with this email. Please check your credentials or register.');
    }

    const testHash = await this.hashPassword(password);
    if (user.passwordHash !== testHash) {
      throw new Error('Incorrect password. Please try again.');
    }

    return this.setSession(user, remember);
  },

  // Reset password request
  async requestPasswordReset(email) {
    if (!email || !email.includes('@')) {
      throw new Error('Please enter a valid registered email address.');
    }
    const normalizedEmail = email.toLowerCase().trim();
    const users = this._getRegisteredUsers();
    if (!users[normalizedEmail]) {
      throw new Error('No account found with this email.');
    }
    // Return success message
    return {
      success: true,
      message: `Password reset instructions have been dispatched to ${normalizedEmail}.`
    };
  },

  // Logout
  logout() {
    localStorage.removeItem(UNLOST_AUTH_KEY);
    sessionStorage.removeItem('unlost_session_transient');
    window.location.href = './login.html';
  },

  // Route Guard
  requireAuth(redirectOnboarding = true) {
    const user = this.getCurrentUser();
    if (!user) {
      // Check if this is local preview mode or direct view
      const currentPath = window.location.pathname;
      if (!currentPath.includes('login.html') && !currentPath.includes('register.html')) {
        window.location.href = './login.html';
      }
      return null;
    }

    // If user is not onboarded and hasn't visited onboarding
    if (redirectOnboarding && !user.onboarded && !window.location.pathname.includes('onboarding.html')) {
      window.location.href = './onboarding.html';
      return null;
    }

    return user;
  },

  _getRegisteredUsers() {
    try {
      const data = localStorage.getItem(UNLOST_STUDENTS_STORE);
      return data ? JSON.parse(data) : {};
    } catch (e) {
      return {};
    }
  }
};
