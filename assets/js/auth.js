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
      const data = localStorage.getItem(UNLOST_AUTH_KEY);
      if (!data) return null;
      const user = JSON.parse(data);
      
      // Synchronize live Firebase auth currentUser emailVerified if available
      if (window.UnlostFirebase && window.UnlostFirebase.auth && window.UnlostFirebase.auth.currentUser) {
        user.emailVerified = Boolean(window.UnlostFirebase.auth.currentUser.emailVerified);
      }
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
  isAdmin() {
    const user = this.getCurrentUser();
    if (!user || !user.email) return false;
    
    // Strict admin condition: must match authorized email AND be email_verified
    const isPrimaryEmail = user.email.toLowerCase() === PRIMARY_ADMIN_EMAIL;
    const isVerified = Boolean(user.emailVerified);
    
    if (window.UnlostFirebase && window.UnlostFirebase.auth && window.UnlostFirebase.auth.currentUser) {
      const fbUser = window.UnlostFirebase.auth.currentUser;
      return fbUser.email && fbUser.email.toLowerCase() === PRIMARY_ADMIN_EMAIL && fbUser.emailVerified === true;
    }

    return isPrimaryEmail && isVerified;
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

    if (!window.UnlostFirebase || typeof window.UnlostFirebase.signUpWithEmail !== 'function') {
      throw new Error('Authentication service is initializing. Please refresh and try again.');
    }

    try {
      const { user, verificationSent } = await window.UnlostFirebase.signUpWithEmail(name.trim(), normalizedEmail, password);
      
      // Store transient session with emailVerified: false
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
        session
      };
    } catch (fbErr) {
      const code = fbErr.code || '';
      if (code === 'auth/email-already-in-use') {
        throw new Error('An account with this email address already exists. Please log in.');
      } else if (code === 'auth/weak-password') {
        throw new Error('Please choose a stronger password (at least 6 characters).');
      } else if (code === 'auth/invalid-email') {
        throw new Error('The email address provided is invalid.');
      }
      throw new Error(fbErr.message || 'Registration failed. Please check your details and try again.');
    }
  },

  // Resend Email Verification Link via Firebase
  async resendVerificationEmail() {
    if (!window.UnlostFirebase || typeof window.UnlostFirebase.sendVerificationLink !== 'function') {
      throw new Error('Firebase Authentication is not available. Please refresh the page.');
    }

    try {
      await window.UnlostFirebase.sendVerificationLink();
      return { success: true, message: 'Verification email has been sent to your inbox.' };
    } catch (e) {
      console.warn('Firebase resend error:', e);
      if (e.code === 'auth/too-many-requests') {
        throw new Error('Too many requests. Please wait a minute before requesting another verification email.');
      }
      throw new Error(e.message || 'Failed to dispatch verification email.');
    }
  },

  // Check verification status from live Firebase Auth (Reloads user token)
  async checkVerificationStatus() {
    if (window.UnlostFirebase && window.UnlostFirebase.auth && window.UnlostFirebase.auth.currentUser) {
      await window.UnlostFirebase.auth.currentUser.reload();
      const isVerified = Boolean(window.UnlostFirebase.auth.currentUser.emailVerified);
      
      const user = this.getCurrentUser();
      if (user) {
        user.emailVerified = isVerified;
        if (isVerified && user.email === PRIMARY_ADMIN_EMAIL) {
          user.role = 'admin';
        }
        localStorage.setItem(UNLOST_AUTH_KEY, JSON.stringify(user));
      }
      return isVerified;
    }
    return false;
  },

  // Direct login with email and password via Firebase Auth
  async login(email, password, remember = true) {
    if (!email || !password) {
      throw new Error('Please enter both email and password.');
    }
    const normalizedEmail = email.toLowerCase().trim();

    if (!window.UnlostFirebase || typeof window.UnlostFirebase.loginWithEmail !== 'function') {
      throw new Error('Authentication service is initializing. Please wait a moment and try again.');
    }

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
      const code = fbErr.code || '';
      if (code === 'auth/wrong-password' || code === 'auth/invalid-credential') {
        throw new Error('Incorrect password. Please verify and try again.');
      } else if (code === 'auth/user-not-found') {
        throw new Error('No registered account found with this email. Please check your spelling or register.');
      }
      throw new Error(fbErr.message || 'Login failed. Please check your credentials.');
    }
  },

  // Google Sign-In
  async loginWithGoogle() {
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
    throw new Error('Google Sign-In is initializing. Please try again.');
  },

  // Request Password Reset Link via Firebase
  async requestPasswordReset(email) {
    if (!email || !email.includes('@')) {
      throw new Error('Please enter a valid registered email address.');
    }
    const normalizedEmail = email.toLowerCase().trim();

    if (window.UnlostFirebase && typeof window.UnlostFirebase.resetPassword === 'function') {
      try {
        await window.UnlostFirebase.resetPassword(normalizedEmail);
        return {
          success: true,
          email: normalizedEmail,
          message: `A secure password reset link has been dispatched to ${normalizedEmail}. Check your inbox.`
        };
      } catch (fbErr) {
        console.warn('Firebase reset password note:', fbErr);
        throw new Error(fbErr.message || 'Failed to send password reset email.');
      }
    }

    throw new Error('Password reset service is unavailable. Please try again later.');
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
  // Strictly blocks unauthenticated users AND unverified users
  requireAuth(redirectOnboarding = true) {
    const user = this.getCurrentUser();
    const currentFile = window.location.pathname.split('/').pop() || 'index.html';

    // 1. Unauthenticated -> redirect to login
    if (!user) {
      const search = window.location.search || '';
      const redirectParam = encodeURIComponent(currentFile + search);
      window.location.href = `./login.html?redirect=${redirectParam}`;
      return null;
    }

    // 2. Authenticated but unverified -> redirect to verify-email.html
    // Protected pages: dashboard.html, profile.html, progress.html, saved-items.html, settings.html, survey.html, etc.
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
  // Enforces both verified status and authorized admin identity
  requireAdmin() {
    const user = this.getCurrentUser();
    if (!user) {
      window.location.href = `./login.html?redirect=admin.html`;
      return null;
    }
    if (!this.isAdmin()) {
      // Not an authorized admin
      window.location.href = './dashboard.html';
      return false;
    }
    return user;
  }
};
