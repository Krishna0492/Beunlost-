import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  sendEmailVerification, 
  sendPasswordResetEmail, 
  signOut, 
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  User as FirebaseUser
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  collection, 
  query, 
  where, 
  orderBy, 
  limit, 
  addDoc,
  serverTimestamp,
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

// Global Firebase helper object for UNLOST
declare global {
  interface Window {
    UnlostFirebase: {
      app: typeof app;
      auth: typeof auth;
      db: typeof db;
      currentUser: FirebaseUser | null;
      isInitialized: boolean;
      signUpWithEmail: (name: string, email: string, pass: string) => Promise<{ user: FirebaseUser; verificationSent: boolean }>;
      loginWithEmail: (email: string, pass: string) => Promise<FirebaseUser>;
      loginWithGoogle: () => Promise<FirebaseUser>;
      sendVerificationLink: (user?: FirebaseUser) => Promise<boolean>;
      resetPassword: (email: string) => Promise<boolean>;
      logout: () => Promise<void>;
      saveStudentProfile: (profileData: Record<string, unknown>) => Promise<void>;
      getStudentProfile: (userId?: string) => Promise<Record<string, unknown> | null>;
      recordStudentActivity: (actionType: string, resourceTitle: string) => Promise<void>;
      saveSurveyResult: (surveyData: Record<string, unknown>) => Promise<string>;
      getAdminAnalytics: () => Promise<Record<string, unknown>>;
      trackEvent: (eventName: string, category: string, label: string) => Promise<void>;
    };
  }
}

// Primary Admin Email
const PRIMARY_ADMIN_EMAIL = 'k7286113@gmail.com';

window.UnlostFirebase = {
  app,
  auth,
  db,
  currentUser: null,
  isInitialized: false,

  async signUpWithEmail(name: string, email: string, pass: string) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
      const user = userCredential.user;

      // Send genuine Firebase email verification link
      let verificationSent = false;
      try {
        await sendEmailVerification(user);
        verificationSent = true;
      } catch (verifErr) {
        console.warn('Verification link dispatch deferred:', verifErr);
      }

      // Record user in Firestore users collection
      const userRef = doc(db, 'users', user.uid);
      await setDoc(userRef, {
        uid: user.uid,
        email: user.email,
        fullName: name,
        emailVerified: user.emailVerified,
        role: email.toLowerCase() === PRIMARY_ADMIN_EMAIL ? 'admin' : 'student',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });

      // Also create initial studentProfile
      const profileRef = doc(db, 'studentProfiles', user.uid);
      await setDoc(profileRef, {
        userId: user.uid,
        fullName: name,
        email: user.email,
        grade: '',
        stream: '',
        targetExam: '',
        savedCareers: [],
        savedColleges: [],
        savedRoadmaps: [],
        guidanceChecklist: [],
        updatedAt: new Date().toISOString()
      });

      // Record Activity
      await this.recordStudentActivity('REGISTERED_ACCOUNT', 'Account created with email verification link');

      return { user, verificationSent };
    } catch (error) {
      console.error('Firebase signUp error:', error);
      throw error;
    }
  },

  async loginWithEmail(email: string, pass: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, pass);
      const user = userCredential.user;

      // Record activity
      await this.recordStudentActivity('LOGIN', 'Student logged into portal');
      return user;
    } catch (error) {
      console.error('Firebase login error:', error);
      throw error;
    }
  },

  async loginWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;

      // Ensure profile exists in Firestore
      const userRef = doc(db, 'users', user.uid);
      await setDoc(userRef, {
        uid: user.uid,
        email: user.email,
        fullName: user.displayName || 'UNLOST Student',
        emailVerified: user.emailVerified,
        role: user.email?.toLowerCase() === PRIMARY_ADMIN_EMAIL ? 'admin' : 'student',
        updatedAt: new Date().toISOString()
      }, { merge: true });

      await this.recordStudentActivity('LOGIN_GOOGLE', 'Logged in via Google Authentication');
      return user;
    } catch (error) {
      console.error('Firebase Google login error:', error);
      throw error;
    }
  },

  async sendVerificationLink(user = auth.currentUser || undefined) {
    if (!user) throw new Error('No active user to send verification to.');
    await sendEmailVerification(user);
    return true;
  },

  async resetPassword(email: string) {
    await sendPasswordResetEmail(auth, email);
    return true;
  },

  async logout() {
    await signOut(auth);
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

  async recordStudentActivity(actionType: string, resourceTitle: string) {
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
        timestamp: new Date().toISOString()
      });
    } catch (err) {
      // Activity recording should not crash client
      console.warn('Student activity audit log notice:', err);
    }
  },

  async saveSurveyResult(surveyData: Record<string, unknown>) {
    const user = auth.currentUser;
    try {
      const resultId = 'surv_' + Date.now();
      const survRef = doc(db, 'surveyResults', resultId);
      const payload = {
        id: resultId,
        userId: user?.uid || 'guest_' + Date.now(),
        studentName: surveyData.studentName || 'Student',
        studentEmail: surveyData.studentEmail || (user?.email || 'unverified@unlost.in'),
        grade: surveyData.grade || '',
        stream: surveyData.stream || '',
        interests: surveyData.interests || [],
        workStyle: surveyData.workStyle || '',
        topCareers: surveyData.topCareers || [],
        createdAt: new Date().toISOString()
      };
      await setDoc(survRef, payload);
      await this.recordStudentActivity('COMPLETED_CAREER_SURVEY', `Completed Career Survey — Top: ${(surveyData.topCareers as any[])?.[0]?.title || 'Undecided'}`);
      return resultId;
    } catch (err) {
      console.warn('Survey save to Firestore deferred:', err);
      return 'local_' + Date.now();
    }
  },

  async getAdminAnalytics() {
    // Collect aggregated data for admin dashboard
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

      // Also trigger GA4 gtag if loaded
      if (typeof (window as any).gtag === 'function') {
        (window as any).gtag('event', eventName, {
          event_category: category,
          event_label: label
        });
      }
    } catch (err) {
      // Telemetry should be non-blocking
      console.debug('Event tracking note:', err);
    }
  }
};

// Wire Auth State Listener
onAuthStateChanged(auth, (user) => {
  window.UnlostFirebase.currentUser = user;
  window.UnlostFirebase.isInitialized = true;

  if (user) {
    const sessionData = {
      uid: user.uid,
      name: user.displayName || user.email?.split('@')[0] || 'Student',
      email: user.email || '',
      role: user.email?.toLowerCase() === PRIMARY_ADMIN_EMAIL ? 'admin' : 'student',
      emailVerified: user.emailVerified,
      loggedInAt: new Date().toISOString(),
      onboarded: true
    };
    localStorage.setItem('unlost_student_session', JSON.stringify(sessionData));
  } else {
    // If not logged into Firebase, check if local demo session is active
    const local = localStorage.getItem('unlost_student_session');
    if (local && !local.includes('demo_student')) {
      // Keep session intact or clear
    }
  }

  // Dispatch auth state change custom event
  window.dispatchEvent(new CustomEvent('unlost-auth-changed', { detail: { user } }));
});
