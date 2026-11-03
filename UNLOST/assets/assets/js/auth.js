/**
 * UNLOST — Unified Authentication & Session Manager
 * Powered Authoritatively by Firebase Authentication & Firestore.
 * Zero insecure local storage of credentials or password hashes.
 */

const UNLOST_AUTH_KEY = 'unlost_student_session';
const PRIMARY_ADMIN_EMAIL = 'k7286113@gmail.com';

window.UnlostAuth = {
  // Check current session and synchronize live Firebase verification state
  getCurrentUser() {
    try {
      // 1. Authoritative check from live Firebase Auth if available
      if (window.UnlostFirebase && window.UnlostFirebase.auth && window.UnlostFirebase.auth.currentUser) {
        const fbUser = window.UnlostFirebase.auth.currentUser;
        const isPrimaryAdmin = fbUser.email && fbUser.email.toLowerCase() === PRIMARY_ADMIN_EMAIL && Boolean(fbUser.emailVerified);
        return {
          uid: fbUser.uid,
          name: fbUser.displayName || (fbUser.email ? fbUser.email.split('@')[0] : 'Student'),
          email: fbUser.email ? fbUser.email.toLowerCase().trim() : '',
          role: isPrimaryAdmin ? 'admin' : 'student',
          emailVerified: Boolean(fbUser.emailVerified),
          onboarded: true
        };
      }

      // 2. Fallback to cached session
      const data = localStorage.getItem(UNLOST_AUTH_KEY);
      if (!data) return null;
      const user = JSON.parse(data);
      return user;
    } catch (e) {
      console.error('Failed to parse session:', e);
      return null;
    }
  },

  // Set session - never grants admin role via client manipulation
  setSession(user, remember = true) {
    const isPrimaryAdmin = user.email && user.email.toLowerCase() === PRIMARY_ADMIN_EMAIL && Boolean(user.emailVerified);
    const sessionData = {
      uid: user.uid || 'usr_' + Date.now(),
      name: user.name || user.fullName || user.displayName || (user.email ? user.email.split('@')[0] : 'Student'),
      email: user.email ? user.email.toLowerCase().trim() : '',
      role: isPrimaryAdmin ? 'admin' : 'student', // Client can NEVER self-elevate
      emailVerified: Boolean(user.emailVerified),
      loggedInAt: new Date().toISOString(),
      onboarded: user.onboarded !== undefined ? user.onboarded : true
    };
    localStorage.setItem(UNLOST_AUTH_KEY, JSON.stringify(sessionData));
    if (!remember) {
      sessionStorage.setItem('unlost_session_transient', 'true');
    }
    return sessionData;
  },

  // Check if current user is an authorized, verified administrator
  async isAdmin() {
    if (window.UnlostFirebase && typeof window.UnlostFirebase.waitForAuth === 'function') {
      await window.UnlostFirebase.waitForAuth();
    }

    if (window.UnlostFirebase && window.UnlostFirebase.auth && window.UnlostFirebase.auth.currentUser) {
      const fbUser = window.UnlostFirebase.auth.currentUser;
      if (!fbUser.emailVerified) return false;

      // 1. Check primary bootstrap admin
      if (fbUser.email && fbUser.email.toLowerCase() === PRIMARY_ADMIN_EMAIL) {
        return true;
      }

      // 2. Check custom claim on ID token
      try {
        const tokenResult = await fbUser.getIdTokenResult();
        if (tokenResult.claims && tokenResult.claims.admin === true) {
          return true;
        }
      } catch (e) {
        console.debug('Admin claim check note:', e);
      }

      return false;
    }

    const cached = this.getCurrentUser();
    return Boolean(cached && cached.email === PRIMARY_ADMIN_EMAIL && cached.emailVerified);
  },

  // Wait for window.UnlostFirebase module to bootstrap
  async waitForFirebaseModule(timeoutMs = 6000) {
    const start = Date.now();
    while (!window.UnlostFirebase && (Date.now() - start < timeoutMs)) {
      await new Promise(r => setTimeout(r, 50));
    }
    if (window.UnlostFirebase && typeof window.UnlostFirebase.waitForAuth === 'function') {
      await window.UnlostFirebase.waitForAuth();
    }
    if (!window.UnlostFirebase) {
      throw new Error('Authentication service failed to load. Please verify your internet connection or refresh the page.');
    }
    return window.UnlostFirebase;
  },

  // Wait for Firebase auth readiness
  async waitForAuth() {
    await this.waitForFirebaseModule();
    if (window.UnlostFirebase && typeof window.UnlostFirebase.waitForAuth === 'function') {
      return await window.UnlostFirebase.waitForAuth();
    }
    return null;
  },

  // Initiate Student Registration with Firebase Email Verification Link
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
    await this.waitForFirebaseModule();

    try {
      const { user, verificationSent, message } = await window.UnlostFirebase.signUpWithEmail(name.trim(), normalizedEmail, password);
      
      const session = this.setSession({
        uid: user.uid,
        name: name.trim(),
        email: normalizedEmail,
        emailVerified: false,
        role: 'student',
        onboarded: false
      }, true);

      return {
        success: true,
        isFirebase: true,
        email: normalizedEmail,
        verificationSent,
        message,
        session
      };
    } catch (fbErr) {
      throw new Error(fbErr.message || 'Registration failed. Please check your details and try again.');
    }
  },

  // Resend Email Verification Link via Firebase
  async resendVerificationEmail() {
    await this.waitForFirebaseModule();

    try {
      await window.UnlostFirebase.sendVerificationLink();
      return { success: true, message: 'Verification email has been sent to your inbox. Please check Spam or Promotions folders.' };
    } catch (e) {
      console.warn('Firebase resend error:', e);
      throw new Error(e.message || 'Failed to dispatch verification email.');
    }
  },

  // Check verification status from live Firebase Auth (Reloads user token & claims)
  async checkVerificationStatus() {
    await this.waitForFirebaseModule();
    if (window.UnlostFirebase && typeof window.UnlostFirebase.checkVerificationStatus === 'function') {
      const isVerified = await window.UnlostFirebase.checkVerificationStatus();
      const fbUser = window.UnlostFirebase.auth.currentUser;
      
      if (fbUser) {
        this.setSession({
          uid: fbUser.uid,
          name: fbUser.displayName || fbUser.email?.split('@')[0] || 'Student',
          email: fbUser.email,
          emailVerified: isVerified,
          role: isVerified && fbUser.email === PRIMARY_ADMIN_EMAIL ? 'admin' : 'student'
        }, true);
      }
      return isVerified;
    }
    return false;
  },

  // Apply Verification Link Out-Of-Band Code directly
  async applyVerificationCode(oobCode) {
    await this.waitForFirebaseModule();
    if (window.UnlostFirebase && typeof window.UnlostFirebase.applyEmailVerificationCode === 'function') {
      const res = await window.UnlostFirebase.applyEmailVerificationCode(oobCode);
      const user = window.UnlostFirebase.auth.currentUser;
      if (user) {
        this.setSession({
          uid: user.uid,
          name: user.displayName || user.email?.split('@')[0] || 'Student',
          email: user.email,
          emailVerified: true,
          role: user.email === PRIMARY_ADMIN_EMAIL ? 'admin' : 'student'
        }, true);
      }
      return res;
    }
    return false;
  },

  // Direct login with email and password via Firebase Auth
  async login(email, password, remember = true) {
    if (!email || !password) {
      throw new Error('Please enter both email and password.');
    }
    const normalizedEmail = email.toLowerCase().trim();
    await this.waitForFirebaseModule();

    try {
      const user = await window.UnlostFirebase.loginWithEmail(normalizedEmail, password);
      
      const isVerified = Boolean(user.emailVerified);
      const isPrimaryAdmin = normalizedEmail === PRIMARY_ADMIN_EMAIL && isVerified;

      return this.setSession({
        uid: user.uid,
        name: user.displayName || normalizedEmail.split('@')[0],
        email: user.email,
        emailVerified: isVerified,
        role: isPrimaryAdmin ? 'admin' : 'student'
      }, remember);
    } catch (fbErr) {
      throw new Error(fbErr.message || 'Login failed. Please check your credentials.');
    }
  },

  // Google Sign-In
  async loginWithGoogle() {
    await this.waitForFirebaseModule();
    if (window.UnlostFirebase && typeof window.UnlostFirebase.loginWithGoogle === 'function') {
      const user = await window.UnlostFirebase.loginWithGoogle();
      const isVerified = Boolean(user.emailVerified);
      const isPrimaryAdmin = user.email?.toLowerCase() === PRIMARY_ADMIN_EMAIL && isVerified;

      return this.setSession({
        uid: user.uid,
        name: user.displayName || user.email?.split('@')[0] || 'Student',
        email: user.email,
        emailVerified: isVerified,
        role: isPrimaryAdmin ? 'admin' : 'student'
      }, true);
    }
    throw new Error('Google Sign-In is initializing. Please try again in a moment.');
  },

  // Request Password Reset Link via Firebase
  async requestPasswordReset(email) {
    if (!email || !email.includes('@')) {
      throw new Error('Please enter a valid registered email address.');
    }
    const normalizedEmail = email.toLowerCase().trim();
    await this.waitForFirebaseModule();

    if (window.UnlostFirebase && typeof window.UnlostFirebase.resetPassword === 'function') {
      try {
        await window.UnlostFirebase.resetPassword(normalizedEmail);
        return {
          success: true,
          email: normalizedEmail,
          message: `A secure password reset link has been dispatched to ${normalizedEmail}. Please check your inbox and Spam folder.`
        };
      } catch (fbErr) {
        console.warn('Firebase reset password note:', fbErr);
        throw new Error(fbErr.message || 'Failed to send password reset email.');
      }
    }
    throw new Error('Password reset service is not available. Please refresh the page.');
  },

  // Logout - Clears Firebase Auth state and local session
  async logout() {
    try {
      if (window.UnlostFirebase && typeof window.UnlostFirebase.logout === 'function') {
        await window.UnlostFirebase.logout();
      }
    } catch (e) {
      console.warn('Firebase logout note:', e);
    }
    localStorage.removeItem(UNLOST_AUTH_KEY);
    sessionStorage.removeItem('unlost_session_transient');
    window.location.href = './login.html';
  },

  // Route Guard for authenticated student pages
  // Asynchronously verifies live Firebase state to prevent race conditions
  requireAuth(redirectOnboarding = true) {
    const currentFile = window.location.pathname.split('/').pop() || 'index.html';
    const user = this.getCurrentUser();

    // Perform live async verification in background
    if (window.UnlostFirebase && typeof window.UnlostFirebase.waitForAuth === 'function') {
      window.UnlostFirebase.waitForAuth().then(async (fbUser) => {
        if (!fbUser) {
          // Unauthenticated -> redirect
          localStorage.removeItem(UNLOST_AUTH_KEY);
          const search = window.location.search || '';
          const redirectParam = encodeURIComponent(currentFile + search);
          window.location.href = `./login.html?redirect=${redirectParam}`;
          return;
        }

        // Live check emailVerified
        if (!fbUser.emailVerified && !currentFile.includes('verify-email.html')) {
          window.location.href = `./verify-email.html?email=${encodeURIComponent(fbUser.email || '')}`;
          return;
        }
      });
    }

    // 1. Unauthenticated -> redirect to login
    if (!user) {
      const search = window.location.search || '';
      const redirectParam = encodeURIComponent(currentFile + search);
      window.location.href = `./login.html?redirect=${redirectParam}`;
      return null;
    }

    // 2. Authenticated but unverified -> redirect to verify-email.html
    if (!user.emailVerified) {
      if (!currentFile.includes('verify-email.html')) {
        window.location.href = `./verify-email.html?email=${encodeURIComponent(user.email || '')}`;
        return null;
      }
    }

    // 3. Verified but not completed onboarding
    if (redirectOnboarding && !user.onboarded && !currentFile.includes('onboarding.html') && !currentFile.includes('verify-email.html')) {
      window.location.href = './onboarding.html';
      return null;
    }

    return user;
  },

  // Route Guard for Admin Dashboard
  async requireAdmin() {
    if (window.UnlostFirebase && typeof window.UnlostFirebase.waitForAuth === 'function') {
      await window.UnlostFirebase.waitForAuth();
    }
    const user = this.getCurrentUser();
    if (!user) {
      window.location.href = `./login.html?redirect=admin.html`;
      return null;
    }
    const isAdm = await this.isAdmin();
    if (!isAdm) {
      // Not an authorized admin
      window.location.href = './dashboard.html';
      return false;
    }
    return user;
  }
};
