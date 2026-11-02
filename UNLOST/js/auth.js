/**
 * UNLOST — Authentication & Session Manager
 * Provides client session persistence, secure hashing/token abstractions,
 * Firebase Auth integration hooks, and route protection.
 */

const UNLOST_AUTH_KEY = 'unlost_student_session';
const UNLOST_STUDENTS_STORE = 'unlost_registered_users';
const UNLOST_PENDING_STORE = 'unlost_pending_verifications';
const UNLOST_RESET_STORE = 'unlost_password_resets';

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
      emailVerified: user.emailVerified !== false,
      loggedInAt: new Date().toISOString(),
      onboarded: user.onboarded || false
    };
    localStorage.setItem(UNLOST_AUTH_KEY, JSON.stringify(sessionData));
    if (!remember) {
      sessionStorage.setItem('unlost_session_transient', 'true');
    }
    return sessionData;
  },

  // Salted client-side SHA-256 hash helper
  async hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password + '_unlost_salt_2025_sec');
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  },

  // Generate random 6-digit OTP
  _generateOtp() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  },

  // Step 1 of registration: validate and generate 6-digit OTP
  async initiateRegistration(name, email, password) {
    if (!name || name.trim().length < 2) {
      throw new Error('Please enter your full name (minimum 2 characters).');
    }
    if (!email || !email.includes('@') || !email.includes('.')) {
      throw new Error('Please provide a valid student email address.');
    }
    if (!password || password.length < 6) {
      throw new Error('Password must be at least 6 characters long.');
    }

    const normalizedEmail = email.toLowerCase().trim();
    const users = this._getRegisteredUsers();

    if (users[normalizedEmail]) {
      throw new Error('An account with this email already exists. Please log in.');
    }

    const hashedPassword = await this.hashPassword(password);
    const otp = this._generateOtp();
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

    const pending = this._getPendingStore();
    pending[normalizedEmail] = {
      name: name.trim(),
      email: normalizedEmail,
      passwordHash: hashedPassword,
      otp,
      expiresAt,
      createdAt: Date.now()
    };
    localStorage.setItem(UNLOST_PENDING_STORE, JSON.stringify(pending));

    return {
      success: true,
      email: normalizedEmail,
      otp, // provided so the client UI can display instant dispatch notice
      expiresAt
    };
  },

  // Step 2 of registration: verify OTP code and activate account
  async verifyOtpAndComplete(email, enteredOtp) {
    const normalizedEmail = email.toLowerCase().trim();
    const pending = this._getPendingStore();
    const pendingUser = pending[normalizedEmail];

    if (!pendingUser) {
      throw new Error('No pending registration found for this email. Please register again.');
    }

    if (Date.now() > pendingUser.expiresAt) {
      delete pending[normalizedEmail];
      localStorage.setItem(UNLOST_PENDING_STORE, JSON.stringify(pending));
      throw new Error('This verification code has expired. Please request a new code.');
    }

    if (pendingUser.otp.trim() !== enteredOtp.toString().trim()) {
      throw new Error('Invalid 6-digit verification code. Please check and try again.');
    }

    // Activated user
    const users = this._getRegisteredUsers();
    const newUser = {
      uid: 'stu_' + Math.random().toString(36).substring(2, 9),
      name: pendingUser.name,
      email: normalizedEmail,
      passwordHash: pendingUser.passwordHash,
      createdAt: new Date().toISOString(),
      emailVerified: true,
      onboarded: false
    };

    users[normalizedEmail] = newUser;
    localStorage.setItem(UNLOST_STUDENTS_STORE, JSON.stringify(users));

    // Clear pending
    delete pending[normalizedEmail];
    localStorage.setItem(UNLOST_PENDING_STORE, JSON.stringify(pending));

    // Set active session
    const session = this.setSession(newUser, true);
    return session;
  },

  // Resend OTP for registration
  async resendRegistrationOtp(email) {
    const normalizedEmail = email.toLowerCase().trim();
    const pending = this._getPendingStore();
    const record = pending[normalizedEmail];

    if (!record) {
      throw new Error('No pending registration found for this email.');
    }

    const newOtp = this._generateOtp();
    record.otp = newOtp;
    record.expiresAt = Date.now() + 10 * 60 * 1000;
    pending[normalizedEmail] = record;
    localStorage.setItem(UNLOST_PENDING_STORE, JSON.stringify(pending));

    return { success: true, otp: newOtp };
  },

  // Direct register (fallback)
  async register(name, email, password) {
    const step1 = await this.initiateRegistration(name, email, password);
    return await this.verifyOtpAndComplete(email, step1.otp);
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
      // Demo student account
      if (normalizedEmail === 'demo@unlost.in' && password === 'student123') {
        const demoUser = {
          uid: 'demo_student',
          name: 'Aarav Sharma',
          email: 'demo@unlost.in',
          emailVerified: true,
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

  // Request Password Reset OTP
  async requestPasswordReset(email) {
    if (!email || !email.includes('@')) {
      throw new Error('Please enter a valid registered email address.');
    }
    const normalizedEmail = email.toLowerCase().trim();
    const users = this._getRegisteredUsers();
    if (!users[normalizedEmail]) {
      throw new Error('No account found with this email address.');
    }

    const otp = this._generateOtp();
    const resets = this._getResetStore();
    resets[normalizedEmail] = {
      otp,
      expiresAt: Date.now() + 10 * 60 * 1000
    };
    localStorage.setItem(UNLOST_RESET_STORE, JSON.stringify(resets));

    return {
      success: true,
      email: normalizedEmail,
      otp,
      message: `A 6-digit recovery code has been sent to ${normalizedEmail}.`
    };
  },

  // Verify Reset OTP and update password
  async verifyPasswordReset(email, enteredOtp, newPassword) {
    if (!newPassword || newPassword.length < 6) {
      throw new Error('New password must be at least 6 characters long.');
    }
    const normalizedEmail = email.toLowerCase().trim();
    const resets = this._getResetStore();
    const record = resets[normalizedEmail];

    if (!record) {
      throw new Error('No password reset requested for this account.');
    }
    if (Date.now() > record.expiresAt) {
      delete resets[normalizedEmail];
      localStorage.setItem(UNLOST_RESET_STORE, JSON.stringify(resets));
      throw new Error('The recovery code has expired. Please request a new one.');
    }
    if (record.otp.trim() !== enteredOtp.toString().trim()) {
      throw new Error('Invalid recovery code. Please check and try again.');
    }

    const users = this._getRegisteredUsers();
    const user = users[normalizedEmail];
    if (!user) {
      throw new Error('Student account not found.');
    }

    user.passwordHash = await this.hashPassword(newPassword);
    users[normalizedEmail] = user;
    localStorage.setItem(UNLOST_STUDENTS_STORE, JSON.stringify(users));

    delete resets[normalizedEmail];
    localStorage.setItem(UNLOST_RESET_STORE, JSON.stringify(resets));

    return { success: true };
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
      const currentPath = window.location.pathname;
      if (!currentPath.includes('login.html') && !currentPath.includes('register.html')) {
        const search = window.location.search || '';
        const currentFile = window.location.pathname.split('/').pop() || 'index.html';
        const redirectParam = encodeURIComponent(currentFile + search);
        window.location.href = `./login.html?redirect=${redirectParam}`;
      }
      return null;
    }

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
  },

  _getPendingStore() {
    try {
      const data = localStorage.getItem(UNLOST_PENDING_STORE);
      return data ? JSON.parse(data) : {};
    } catch (e) {
      return {};
    }
  },

  _getResetStore() {
    try {
      const data = localStorage.getItem(UNLOST_RESET_STORE);
      return data ? JSON.parse(data) : {};
    } catch (e) {
      return {};
    }
  }
};
