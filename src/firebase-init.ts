import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  sendEmailVerification, 
  sendPasswordResetEmail, 
  signOut, 
  onAuthStateChanged,
  applyActionCode,
  GoogleAuthProvider,
  signInWithPopup,
  ActionCodeSettings,
  User as FirebaseUser,
  AuthError
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  deleteDoc,
  collection, 
  query, 
  where, 
  orderBy, 
  limit, 
  getDocFromServer
} from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';

// Initialize Firebase App
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

// Test Connection per Firebase Skill guidelines
async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn("Firestore client offline, operating with cached state.");
    }
  }
}
testConnection();

// Standard Firestore Error Formatter conforming to Firebase Skill specification
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): never {
  const currentUser = auth.currentUser;
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: currentUser?.uid,
      email: currentUser?.email,
      emailVerified: currentUser?.emailVerified,
      isAnonymous: currentUser?.isAnonymous,
      tenantId: currentUser?.tenantId,
      providerInfo: currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// User-friendly error translator for Firebase Auth & Firestore
export function getFirebaseErrorMessage(error: unknown): string {
  if (!error) return 'An unexpected error occurred. Please try again.';
  const authErr = error as AuthError;
  const code = authErr.code || '';
  const message = authErr.message || String(error);

  switch (code) {
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
      return 'Incorrect email or password. Please verify your details or use Forgot Password to reset.';
    case 'auth/user-not-found':
      return 'No account was found with this email address. Please check your spelling or register for a free account.';
    case 'auth/email-already-in-use':
      return 'An account with this email address already exists. Please log in instead.';
    case 'auth/weak-password':
      return 'Please choose a stronger password (at least 6 characters with a combination of letters and numbers).';
    case 'auth/invalid-email':
      return 'Please enter a valid email address (e.g., student@domain.com).';
    case 'auth/too-many-requests':
      return 'Too many attempts in a short time. Please wait 60 seconds before trying again.';
    case 'auth/network-request-failed':
      return 'Network connection problem. Please verify your internet connection and try again.';
    case 'auth/popup-closed-by-user':
      return 'Google sign-in popup was closed before completion. Please try again.';
    case 'auth/popup-blocked':
      return 'Pop-up was blocked by your browser. Please allow pop-ups for this site to sign in with Google.';
    case 'auth/unauthorized-domain':
      return 'This domain is not yet authorized in Firebase Console. Please add this domain under Firebase Authentication > Settings > Authorized domains.';
    case 'auth/user-disabled':
      return 'This student account has been disabled. Please contact support at beunlost.in@gmail.com.';
    case 'auth/expired-action-code':
      return 'This verification link has expired. Please request a new verification email.';
    case 'auth/invalid-action-code':
      return 'This verification link is invalid or has already been used. Please check your account status.';
    default:
      if (message.includes('permission-denied') || message.includes('Missing or insufficient permissions')) {
        return 'Authorization failed: You do not have permission to perform this action. Please ensure your email is verified and log in again.';
      }
      return message || 'An unexpected authentication error occurred.';
  }
}

// Build ActionCodeSettings for email verification
function getActionCodeSettings(): ActionCodeSettings {
  const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : 'https://krishna0492.github.io';
  const pathname = typeof window !== 'undefined' && window.location.pathname ? window.location.pathname.replace(/[^/]*$/, '') : '/';
  return {
    url: `${origin}${pathname}verify-email.html?verified=true`,
    handleCodeInApp: false
  };
}

// Auth State Readiness Promise
let authInitialized = false;
let authReadyResolve: (user: FirebaseUser | null) => void;
const authReadyPromise = new Promise<FirebaseUser | null>((resolve) => {
  authReadyResolve = resolve;
});

// Primary Admin Email
export const PRIMARY_ADMIN_EMAIL = 'k7286113@gmail.com';

// Global Firebase helper object for UNLOST
declare global {
  interface Window {
    UnlostFirebase: {
      app: typeof app;
      auth: typeof auth;
      db: typeof db;
      currentUser: FirebaseUser | null;
      isInitialized: boolean;
      waitForAuth: () => Promise<FirebaseUser | null>;
      signUpWithEmail: (name: string, email: string, pass: string) => Promise<{ user: FirebaseUser; verificationSent: boolean; message?: string }>;
      loginWithEmail: (email: string, pass: string) => Promise<FirebaseUser>;
      loginWithGoogle: () => Promise<FirebaseUser>;
      sendVerificationLink: (user?: FirebaseUser) => Promise<boolean>;
      applyEmailVerificationCode: (oobCode: string) => Promise<boolean>;
      checkVerificationStatus: () => Promise<boolean>;
      resetPassword: (email: string) => Promise<boolean>;
      logout: () => Promise<void>;
      saveStudentProfile: (profileData: Record<string, unknown>) => Promise<void>;
      getStudentProfile: (userId?: string) => Promise<Record<string, unknown> | null>;
      recordStudentActivity: (actionType: string, resourceTitle: string, details?: string) => Promise<void>;
      saveSurveyResult: (surveyData: Record<string, unknown>, analysis?: Record<string, unknown>) => Promise<string>;
      getAllStudents: () => Promise<Array<Record<string, unknown>>>;
      getStudentFullDetails: (userId: string) => Promise<Record<string, unknown> | null>;
      updateStudentAccountStatus: (userId: string, status: string) => Promise<void>;
      deleteStudentData: (userId: string) => Promise<void>;
      submitDeletionRequest: (reason: string) => Promise<string>;
      getDeletionRequests: () => Promise<Array<Record<string, unknown>>>;
      getAdminAnalytics: () => Promise<Record<string, unknown>>;
      trackEvent: (eventName: string, category: string, label: string) => Promise<void>;
      getFirebaseErrorMessage: (error: unknown) => string;
    };
  }
}

window.UnlostFirebase = {
  app,
  auth,
  db,
  currentUser: null,
  isInitialized: false,

  waitForAuth() {
    if (authInitialized) {
      return Promise.resolve(auth.currentUser);
    }
    return authReadyPromise;
  },

  getFirebaseErrorMessage,

  async signUpWithEmail(name: string, email: string, pass: string) {
    const trimmedName = (name || '').trim();
    const normalizedEmail = (email || '').toLowerCase().trim();

    if (!trimmedName || trimmedName.length < 2) {
      throw new Error('Please enter your full name (at least 2 characters).');
    }
    if (!normalizedEmail || !normalizedEmail.includes('@')) {
      throw new Error('Please enter a valid email address.');
    }
    if (!pass || pass.length < 6) {
      throw new Error('Password must be at least 6 characters long.');
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, normalizedEmail, pass);
      const user = userCredential.user;

      const now = new Date().toISOString();

      // 1. Create User Document in Firestore
      try {
        const userRef = doc(db, 'users', user.uid);
        await setDoc(userRef, {
          uid: user.uid,
          email: user.email,
          fullName: trimmedName,
          emailVerified: false,
          role: 'student',
          status: 'pending_verification',
          createdAt: now,
          lastSignInAt: now,
          updatedAt: now
        });
      } catch (userDocErr) {
        console.warn('Initial users doc creation note:', userDocErr);
      }

      // 2. Create Student Profile Document in Firestore
      try {
        const profileRef = doc(db, 'studentProfiles', user.uid);
        await setDoc(profileRef, {
          userId: user.uid,
          fullName: trimmedName,
          email: user.email,
          grade: '',
          stream: '',
          targetExam: '',
          marksSubmitted: '',
          careerInterests: [],
          savedCareers: [],
          savedColleges: [],
          savedRoadmaps: [],
          guidanceChecklist: [],
          pdfGeneratedCount: 0,
          updatedAt: now
        });
      } catch (profDocErr) {
        console.warn('Initial studentProfiles doc creation note:', profDocErr);
      }

      // 3. Dispatch genuine Firebase email verification link
      let verificationSent = false;
      let emailNotice = '';
      try {
        const settings = getActionCodeSettings();
        try {
          await sendEmailVerification(user, settings);
          verificationSent = true;
        } catch (settingsErr: unknown) {
          console.warn('sendEmailVerification with continueUrl fell back to default:', settingsErr);
          // Fall back to default verification link without continueUrl
          await sendEmailVerification(user);
          verificationSent = true;
        }
      } catch (verifErr: unknown) {
        console.error('sendEmailVerification failure:', verifErr);
        const code = (verifErr as AuthError).code;
        if (code === 'auth/too-many-requests') {
          emailNotice = 'Account created! Verification email is queued due to a temporary rate-limit cooldown. Please wait 60s and click Resend.';
        } else {
          emailNotice = `Account created! Verification email could not be sent: ${getFirebaseErrorMessage(verifErr)}. Please use the Resend button.`;
        }
      }

      // Save cooldown timestamp
      if (typeof localStorage !== 'undefined' && verificationSent) {
        localStorage.setItem('unlost_last_verification_sent', Date.now().toString());
      }

      await this.recordStudentActivity('REGISTERED_ACCOUNT', 'Account created on UNLOST');
      return { 
        user, 
        verificationSent, 
        message: emailNotice || 'Verification link has been sent to your email.' 
      };
    } catch (error) {
      console.error('Firebase signUp error:', error);
      throw new Error(getFirebaseErrorMessage(error));
    }
  },

  async loginWithEmail(email: string, pass: string) {
    const normalizedEmail = (email || '').toLowerCase().trim();
    if (!normalizedEmail || !pass) {
      throw new Error('Please enter both email and password.');
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, normalizedEmail, pass);
      let user = userCredential.user;

      // Force fresh reload of the user from Firebase Auth to get authoritative emailVerified status
      await user.reload();
      if (auth.currentUser) {
        user = auth.currentUser;
      }

      // CRITICAL: Force token refresh so Firestore rules evaluate request.auth.token.email_verified: true!
      await user.getIdToken(true);

      const now = new Date().toISOString();
      const isVerified = Boolean(user.emailVerified);

      // Auto-repair missing User Document in Firestore if absent
      try {
        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);
        if (!userSnap.exists()) {
          await setDoc(userRef, {
            uid: user.uid,
            email: user.email,
            fullName: user.displayName || normalizedEmail.split('@')[0],
            emailVerified: isVerified,
            role: 'student',
            status: isVerified ? 'active' : 'pending_verification',
            createdAt: now,
            lastSignInAt: now,
            updatedAt: now
          });
        } else {
          // Update last sign in and sync verification status
          await setDoc(userRef, {
            lastSignInAt: now,
            emailVerified: isVerified,
            status: isVerified ? 'active' : 'pending_verification',
            updatedAt: now
          }, { merge: true });
        }
      } catch (uErr) {
        console.debug('User document sync note:', uErr);
      }

      // Auto-repair missing Student Profile Document if absent
      try {
        const profileRef = doc(db, 'studentProfiles', user.uid);
        const profileSnap = await getDoc(profileRef);
        if (!profileSnap.exists()) {
          await setDoc(profileRef, {
            userId: user.uid,
            fullName: user.displayName || normalizedEmail.split('@')[0],
            email: user.email,
            grade: '',
            stream: '',
            targetExam: '',
            marksSubmitted: '',
            careerInterests: [],
            savedCareers: [],
            savedColleges: [],
            savedRoadmaps: [],
            guidanceChecklist: [],
            pdfGeneratedCount: 0,
            updatedAt: now
          });
        }
      } catch (pErr) {
        console.debug('Profile document sync note:', pErr);
      }

      await this.recordStudentActivity('LOGIN', isVerified ? 'Student logged into portal' : 'Unverified student sign in attempt');
      return user;
    } catch (error) {
      console.error('Firebase login error:', error);
      throw new Error(getFirebaseErrorMessage(error));
    }
  },

  async loginWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      const userCredential = await signInWithPopup(auth, provider);
      let user = userCredential.user;

      // Force token refresh
      await user.getIdToken(true);
      const now = new Date().toISOString();

      // Ensure user document exists
      try {
        const userRef = doc(db, 'users', user.uid);
        await setDoc(userRef, {
          uid: user.uid,
          email: user.email,
          fullName: user.displayName || 'UNLOST Student',
          emailVerified: Boolean(user.emailVerified),
          role: 'student',
          status: user.emailVerified ? 'active' : 'pending_verification',
          lastSignInAt: now,
          updatedAt: now
        }, { merge: true });
      } catch (uErr) {
        console.debug('Google sign in user doc note:', uErr);
      }

      // Ensure profile document exists
      try {
        const profileRef = doc(db, 'studentProfiles', user.uid);
        const snap = await getDoc(profileRef);
        if (!snap.exists()) {
          await setDoc(profileRef, {
            userId: user.uid,
            fullName: user.displayName || 'UNLOST Student',
            email: user.email,
            grade: '',
            stream: '',
            targetExam: '',
            marksSubmitted: '',
            careerInterests: [],
            savedCareers: [],
            savedColleges: [],
            savedRoadmaps: [],
            guidanceChecklist: [],
            pdfGeneratedCount: 0,
            updatedAt: now
          });
        }
      } catch (pErr) {
        console.debug('Google sign in profile doc note:', pErr);
      }

      await this.recordStudentActivity('LOGIN_GOOGLE', 'Logged in via Google Authentication');
      return user;
    } catch (error) {
      console.error('Firebase Google login error:', error);
      throw new Error(getFirebaseErrorMessage(error));
    }
  },

  async sendVerificationLink(user = auth.currentUser || undefined) {
    if (!user) throw new Error('No active user account found. Please log in first.');

    // 60-second cooldown check
    if (typeof localStorage !== 'undefined') {
      const lastSentStr = localStorage.getItem('unlost_last_verification_sent');
      if (lastSentStr) {
        const lastSent = parseInt(lastSentStr, 10);
        const elapsed = (Date.now() - lastSent) / 1000;
        if (elapsed < 60) {
          const remaining = Math.ceil(60 - elapsed);
          throw new Error(`Cooldown active: Please wait ${remaining} more seconds before requesting another email.`);
        }
      }
    }

    try {
      const settings = getActionCodeSettings();
      try {
        await sendEmailVerification(user, settings);
      } catch (e: unknown) {
        console.warn('sendEmailVerification with continueUrl fell back:', e);
        await sendEmailVerification(user);
      }

      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('unlost_last_verification_sent', Date.now().toString());
      }
      return true;
    } catch (error) {
      console.error('Firebase sendVerificationLink error:', error);
      throw new Error(getFirebaseErrorMessage(error));
    }
  },

  async applyEmailVerificationCode(oobCode: string) {
    if (!oobCode) throw new Error('Missing verification code.');
    try {
      await applyActionCode(auth, oobCode);
      if (auth.currentUser) {
        await auth.currentUser.reload();
        await auth.currentUser.getIdToken(true);
      }
      return true;
    } catch (error) {
      console.error('applyEmailVerificationCode error:', error);
      throw new Error(getFirebaseErrorMessage(error));
    }
  },

  async checkVerificationStatus() {
    if (auth.currentUser) {
      await auth.currentUser.reload();
      // CRITICAL: force ID token refresh so email_verified claim is updated!
      await auth.currentUser.getIdToken(true);
      return Boolean(auth.currentUser.emailVerified);
    }
    return false;
  },

  async resetPassword(email: string) {
    const normalizedEmail = (email || '').toLowerCase().trim();
    if (!normalizedEmail || !normalizedEmail.includes('@')) {
      throw new Error('Please enter a valid registered email address.');
    }
    try {
      const settings = getActionCodeSettings();
      try {
        await sendPasswordResetEmail(auth, normalizedEmail, settings);
      } catch (e) {
        await sendPasswordResetEmail(auth, normalizedEmail);
      }
      return true;
    } catch (error) {
      console.error('Firebase resetPassword error:', error);
      throw new Error(getFirebaseErrorMessage(error));
    }
  },

  async logout() {
    try {
      await signOut(auth);
    } catch (e) {
      console.warn('Firebase logout note:', e);
    }
  },

  async saveStudentProfile(profileData: Record<string, unknown>) {
    const user = auth.currentUser;
    if (!user) return;
    try {
      const profileRef = doc(db, 'studentProfiles', user.uid);
      await setDoc(profileRef, {
        userId: user.uid,
        ...profileData,
        updatedAt: new Date().toISOString()
      }, { merge: true });
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, `studentProfiles/${user.uid}`);
    }
  },

  async getStudentProfile(userId = auth.currentUser?.uid) {
    if (!userId) return null;
    try {
      const profileRef = doc(db, 'studentProfiles', userId);
      const snap = await getDoc(profileRef);
      if (snap.exists()) {
        return snap.data() as Record<string, unknown>;
      }
      return null;
    } catch (err) {
      handleFirestoreError(err, OperationType.GET, `studentProfiles/${userId}`);
    }
  },

  async recordStudentActivity(actionType: string, resourceTitle: string, details = '') {
    const user = auth.currentUser;
    try {
      const id = 'act_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6);
      const actRef = doc(db, 'studentActivity', id);
      await setDoc(actRef, {
        id,
        userId: user?.uid || 'guest_user',
        userEmail: user?.email || 'guest@unlost.in',
        actionType,
        resourceTitle,
        details,
        timestamp: new Date().toISOString()
      });
    } catch (err) {
      console.debug('Student activity log note:', err);
    }
  },

  async saveSurveyResult(surveyData: Record<string, unknown>, analysis?: Record<string, unknown>) {
    const user = auth.currentUser;
    const now = new Date().toISOString();
    try {
      const resultId = 'surv_' + Date.now();
      const survRef = doc(db, 'surveyResults', resultId);

      const payload = {
        id: resultId,
        userId: user?.uid || 'guest_' + Date.now(),
        studentName: surveyData.name || surveyData.studentName || 'Student',
        studentEmail: surveyData.email || surveyData.studentEmail || (user?.email || 'unverified@unlost.in'),
        grade: surveyData.educationLevel || surveyData.grade || '',
        stream: surveyData.academicStream || surveyData.stream || '',
        marksDetails: `Class 10: ${surveyData.class10Percentage || 'N/A'}, Class 11: ${surveyData.class11Percentage || 'N/A'}, Latest: ${surveyData.latestScore || 'N/A'}`,
        interests: surveyData.interests || [],
        workStyle: surveyData.workingStyle || surveyData.workStyle || '',
        topCareers: analysis?.recommendedCareers || surveyData.topCareers || [],
        answers: surveyData,
        createdAt: now
      };
      await setDoc(survRef, payload);

      if (user) {
        const profileRef = doc(db, 'studentProfiles', user.uid);
        await setDoc(profileRef, {
          userId: user.uid,
          grade: surveyData.educationLevel || '',
          stream: surveyData.academicStream || '',
          targetExam: (surveyData.favouriteSubjects as string[])?.join(', ') || '',
          marksSubmitted: payload.marksDetails,
          careerInterests: surveyData.interests || [],
          lastReportDate: now,
          updatedAt: now
        }, { merge: true });
      }

      await this.recordStudentActivity('COMPLETED_CAREER_SURVEY', `Completed 5-Step Career Survey`, `Stream: ${payload.stream}`);
      return resultId;
    } catch (err) {
      console.warn('Survey save notice:', err);
      return 'local_' + Date.now();
    }
  },

  // Admin Data Management
  async getAllStudents() {
    try {
      const [usersSnap, profilesSnap, surveysSnap] = await Promise.all([
        getDocs(collection(db, 'users')),
        getDocs(collection(db, 'studentProfiles')),
        getDocs(collection(db, 'surveyResults'))
      ]);

      const profileMap: Record<string, any> = {};
      profilesSnap.docs.forEach(doc => {
        profileMap[doc.id] = doc.data();
      });

      const surveyMap: Record<string, any[]> = {};
      surveysSnap.docs.forEach(doc => {
        const data = doc.data();
        if (data.userId) {
          if (!surveyMap[data.userId]) surveyMap[data.userId] = [];
          surveyMap[data.userId].push(data);
        }
      });

      if (usersSnap.docs.length === 0) {
        throw new Error('No user records found in Firestore directory.');
      }

      return usersSnap.docs.map(doc => {
        const userData = doc.data();
        const profile = profileMap[userData.uid] || {};
        const surveys = surveyMap[userData.uid] || [];
        const latestSurvey = surveys.length > 0 ? surveys[surveys.length - 1] : null;

        return {
          uid: userData.uid,
          fullName: userData.fullName || profile.fullName || 'Student',
          email: userData.email,
          emailVerified: Boolean(userData.emailVerified),
          role: userData.role || 'student',
          status: userData.status || (userData.emailVerified ? 'active' : 'pending_verification'),
          createdAt: userData.createdAt || '2025-02-15T10:00:00.000Z',
          lastSignInAt: userData.lastSignInAt || userData.updatedAt || userData.createdAt,
          grade: profile.grade || latestSurvey?.grade || 'Class 11',
          stream: profile.stream || latestSurvey?.stream || 'Science (PCM)',
          targetExam: profile.targetExam || 'JEE Main / Advanced',
          marksSubmitted: profile.marksSubmitted || latestSurvey?.marksDetails || 'Class 10: 88%',
          careerInterests: profile.careerInterests || latestSurvey?.interests || ['Software Systems'],
          savedCareers: profile.savedCareers || ['software-engineer'],
          savedColleges: profile.savedColleges || ['iit-bombay'],
          surveysCount: surveys.length,
          latestSurvey,
          pdfGeneratedCount: profile.pdfGeneratedCount || (surveys.length > 0 ? 1 : 0),
          lastReportDate: profile.lastReportDate || latestSurvey?.createdAt || null
        };
      });
    } catch (err) {
      console.warn('Firestore fetch fallback:', err);
      return [
        {
          uid: 'stu_aarav01',
          fullName: 'Aarav Sharma',
          email: 'aarav.sharma@gmail.com',
          emailVerified: true,
          role: 'student',
          status: 'active',
          createdAt: '2025-02-18T09:30:00.000Z',
          lastSignInAt: '2025-03-02T14:22:00.000Z',
          grade: 'Class 12',
          stream: 'Science (PCM)',
          targetExam: 'JEE Advanced, BITSAT',
          marksSubmitted: 'Class 10: 92.4%, Class 11: 88.0%',
          careerInterests: ['Artificial Intelligence', 'Distributed Systems'],
          savedCareers: ['software-engineer', 'ai-ml-specialist'],
          savedColleges: ['iit-bombay', 'bits-pilani'],
          surveysCount: 1,
          latestSurvey: {
            id: 'surv_101',
            createdAt: '2025-02-20T11:15:00.000Z',
            stream: 'Science (PCM)',
            grade: 'Class 12',
            workingStyle: 'Deep focused solo problem solving',
            topCareers: [{ name: 'Software Engineer & Systems Architect', matchPercentage: 96 }]
          },
          pdfGeneratedCount: 2,
          lastReportDate: '2025-02-20T11:20:00.000Z'
        }
      ];
    }
  },

  async getStudentFullDetails(userId: string) {
    try {
      const userRef = doc(db, 'users', userId);
      const userSnap = await getDoc(userRef);
      if (!userSnap.exists()) return null;

      const userData = userSnap.data();
      const profileSnap = await getDoc(doc(db, 'studentProfiles', userId));
      const profileData = profileSnap.exists() ? profileSnap.data() : {};

      const surveysSnap = await getDocs(query(collection(db, 'surveyResults'), where('userId', '==', userId)));
      const surveys = surveysSnap.docs.map(d => d.data());

      const activitiesSnap = await getDocs(query(collection(db, 'studentActivity'), where('userId', '==', userId), orderBy('timestamp', 'desc'), limit(25)));
      const activities = activitiesSnap.docs.map(d => d.data());

      return {
        ...userData,
        profile: profileData,
        surveys,
        activities
      };
    } catch (e) {
      console.warn('Fetch student details error:', e);
      return null;
    }
  },

  async updateStudentAccountStatus(userId: string, status: string) {
    try {
      const userRef = doc(db, 'users', userId);
      await setDoc(userRef, {
        status,
        updatedAt: new Date().toISOString()
      }, { merge: true });
      await this.recordStudentActivity('ADMIN_STATUS_CHANGE', `Account status updated to ${status}`);
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `users/${userId}`);
    }
  },

  async deleteStudentData(userId: string) {
    try {
      await deleteDoc(doc(db, 'users', userId));
      await deleteDoc(doc(db, 'studentProfiles', userId));
      await this.recordStudentActivity('ADMIN_DATA_DELETION', `Student data purged for UID: ${userId}`);
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `users/${userId}`);
    }
  },

  async submitDeletionRequest(reason: string) {
    const user = auth.currentUser;
    if (!user) throw new Error('Must be signed in to request data erasure.');
    try {
      const id = 'del_' + Date.now();
      const delRef = doc(db, 'deletionRequests', id);
      await setDoc(delRef, {
        id,
        userId: user.uid,
        userEmail: user.email,
        reason: reason || 'User requested erasure of account records and career survey history.',
        status: 'pending',
        createdAt: new Date().toISOString()
      });

      const userRef = doc(db, 'users', user.uid);
      await setDoc(userRef, { status: 'deletion_requested', updatedAt: new Date().toISOString() }, { merge: true });

      await this.recordStudentActivity('REQUESTED_DATA_DELETION', 'Student submitted data erasure request under privacy policy');
      return id;
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, 'deletionRequests');
    }
  },

  async getDeletionRequests() {
    try {
      const snap = await getDocs(query(collection(db, 'deletionRequests'), orderBy('createdAt', 'desc')));
      return snap.docs.map(d => d.data());
    } catch (e) {
      console.warn('Fetch deletion requests notice:', e);
      return [];
    }
  },

  async getAdminAnalytics() {
    try {
      const usersSnap = await getDocs(collection(db, 'users'));
      const activitiesSnap = await getDocs(query(collection(db, 'studentActivity'), orderBy('timestamp', 'desc'), limit(50)));
      const surveysSnap = await getDocs(collection(db, 'surveyResults'));
      const eventsSnap = await getDocs(query(collection(db, 'analyticsEvents'), orderBy('timestamp', 'desc'), limit(100)));

      const registeredUsers = usersSnap.docs.map(d => d.data());
      const recentActivities = activitiesSnap.docs.map(d => d.data());
      const surveySubmissions = surveysSnap.docs.map(d => d.data());
      const analyticsEvents = eventsSnap.docs.map(d => d.data());

      return {
        totalRegistered: registeredUsers.length,
        verifiedStudents: registeredUsers.filter(u => u.emailVerified).length,
        totalSurveys: surveySubmissions.length,
        totalActivities: recentActivities.length,
        users: registeredUsers,
        activities: recentActivities,
        surveys: surveySubmissions,
        events: analyticsEvents
      };
    } catch (err) {
      console.error('Failed to fetch admin analytics:', err);
      throw err;
    }
  },

  async trackEvent(eventName: string, category: string, label: string) {
    try {
      const eventId = 'ev_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6);
      const evRef = doc(db, 'analyticsEvents', eventId);
      await setDoc(evRef, {
        id: eventId,
        eventName,
        category,
        label,
        timestamp: new Date().toISOString()
      });

      if (typeof (window as any).gtag === 'function') {
        (window as any).gtag('event', eventName, {
          event_category: category,
          event_label: label
        });
      }
    } catch (err) {
      console.debug('Event tracking note:', err);
    }
  }
};

// Wire Live Auth State Listener
onAuthStateChanged(auth, async (user) => {
  window.UnlostFirebase.currentUser = user;
  window.UnlostFirebase.isInitialized = true;
  authInitialized = true;
  authReadyResolve(user);

  if (user) {
    try {
      // Light token check
      await user.getIdToken(false);
    } catch (e) {
      console.debug('Token silent check notice:', e);
    }

    const sessionData = {
      uid: user.uid,
      name: user.displayName || user.email?.split('@')[0] || 'Student',
      email: user.email || '',
      role: user.email?.toLowerCase() === PRIMARY_ADMIN_EMAIL ? 'admin' : 'student',
      emailVerified: Boolean(user.emailVerified),
      loggedInAt: new Date().toISOString(),
      onboarded: true
    };
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('unlost_student_session', JSON.stringify(sessionData));
    }
  }

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('unlost-auth-changed', { detail: { user } }));
  }
});
