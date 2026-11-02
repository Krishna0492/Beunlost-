# UNLOST — Student Career Discovery & Guidance Platform

> **"Not lost. Just finding my way."**  
> Official Instagram: [@beunlost.in](https://instagram.com/beunlost.in)

UNLOST is a multi-page student discovery and guidance platform engineered to help high school and university students explore careers, understand educational pathways, navigate college admissions, master entrance examinations, build practical skills, and organize their goals into actionable roadmaps.

---

## 1. Visual & Brand Identity

- **Palette**: Deep cinematic black backgrounds (`#060608`, `#0a0a0d`), pure white typography, metallic silver gradients (`#c0c5ce`), and charcoal cards (`#13141b`).
- **Logo**: Typography-only UNLOST wordmark. **UN** in metallic silver gradient, **LOST** in pure white.
- **Principles**: Minimal, modern, intelligent, trustworthy, and encouraging. Avoids cheap neon glow, generic stock education templates, or fake claims.

---

## 2. Platform Architecture & Multi-Page Structure

Every page is an independent, responsive HTML page utilizing relative paths (`./`) so the entire platform works out of the box locally, on custom domains, and on GitHub Pages subpaths like `https://krishna0492.github.io/Unlost-/`.

```text
UNLOST/
├── index.html                   # Public cinematic homepage with 10 core sections & step ladder
├── login.html                   # Student sign-in with remember me & demo fill
├── register.html                # Multi-field student registration & password strength
├── forgot-password.html         # Password recovery flow
├── onboarding.html              # 5-step interactive onboarding questionnaire
├── dashboard.html               # Personalized student workspace with 10 interactive cards
├── career-explorer.html         # Search & filter careers by discipline and education level
├── career-details.html          # Dynamic career details, duties, courses & trajectories
├── roadmaps.html                # Career roadmap builder directory
├── roadmap-details.html         # Interactive chronological milestone checklist with progress %
├── skill-development.html       # Practical competencies, programming & critical thinking tracker
├── colleges.html                # Universities directory with search & filters
├── college-details.html         # College programs, eligibility & admission links
├── entrance-exams.html          # National entrance exams tracker
├── exam-details.html            # Exam pattern, syllabus, and official links
├── scholarships.html            # Merit & government scholarship discovery
├── scholarship-details.html     # Grant amounts and eligibility criteria
├── aptitude-test.html           # 5-question career aptitude & trait discovery quiz
├── saved-items.html             # Categorized bookmarks library (careers, colleges, roadmaps, etc.)
├── progress.html                # Verified progress metrics, milestones & achievements
├── profile.html                 # Student profile & academic stream editor
├── settings.html                # Account, notification preferences, data export & reset
├── about.html                   # Brand mission & philosophy
├── contact.html                 # Student support and inquiries
├── privacy-policy.html          # Student data rights and local persistence
├── terms.html                   # Terms of service
├── assets/
│   ├── css/
│   │   ├── style.css            # Brand theme, buttons, cards, typography, step ladder
│   │   ├── dashboard.css        # Student workspace layout, sidebar, topbar, 10-card grid
│   │   └── responsive.css       # Mobile drawer, breakpoints, collapsible sidebar
│   ├── js/
│   │   ├── data.js              # Comprehensive data store (careers, exams, colleges, skills, quiz)
│   │   ├── auth.js              # Session manager, SHA-256 password hashing, route protection
│   │   ├── app.js               # Shared bookmarks store, toasts, profile helpers
│   │   ├── dashboard.js         # Workspace cards controller and reactive milestone checkboxes
│   │   ├── careers.js           # Directory filtering and dynamic ?id= details rendering
│   │   ├── roadmaps.js          # Sequential milestone progress calculation and state toggling
│   │   └── profile.js           # Student profile forms and JSON data exporter
│   ├── images/
│   └── icons/
├── README.md                    # Project documentation & integration guides
└── UNLOST-WEBSITE.zip           # Complete downloadable multi-page package
```

---

## 3. GitHub Pages Deployment Instructions

This website was built with strictly relative paths (`./assets/...`, `./career-explorer.html`, etc.) specifically to run cleanly on GitHub Pages under repository subpaths such as:
**`https://krishna0492.github.io/Unlost-/`**

### Steps to Deploy:
1. Initialize or clone your repository:
   ```bash
   git init
   git remote add origin https://github.com/krishna0492/Unlost-.git
   ```
2. Copy the contents of the `UNLOST` directory into the root of your repository (or push the repository directly).
3. Push to GitHub:
   ```bash
   git add .
   git commit -m "Deploy UNLOST multi-page student platform"
   git branch -M main
   git push -u origin main
   ```
4. In GitHub, navigate to **Settings** > **Pages**.
5. Under **Build and deployment**, set **Source** to `Deploy from a branch`, choose branch `main` and folder `/ (root)`.
6. Click **Save**. Within 1-2 minutes, your multi-page UNLOST platform will be live at:
   `https://krishna0492.github.io/Unlost-/`

---

## 4. Firebase Authentication & Firestore Configuration Guide

UNLOST is engineered with a clean modular bridge in `assets/js/auth.js` and `assets/js/app.js`. By default, it operates flawlessly using client-side cryptographic hashing (SHA-256) and browser storage. To connect your production Firebase cloud project:

### Step 1: Create a Firebase Project
1. Visit the [Firebase Console](https://console.firebase.google.com/).
2. Create a new project called `unlost-platform`.
3. In **Authentication** > **Sign-in method**, enable **Email/Password** and optionally **Google**.
4. In **Firestore Database**, create a database in production mode.

### Step 2: Configure Client SDK
Include the Firebase scripts in the HTML `<head>` or initialize in `assets/js/auth.js`:
```html
<script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-auth-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore-compat.js"></script>
```

Add your web configuration to `assets/js/auth.js`:
```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "unlost-platform.firebaseapp.com",
  projectId: "unlost-platform",
  storageBucket: "unlost-platform.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
firebase.initializeApp(firebaseConfig);
```

### Step 3: Secure Firestore Rules (`firestore.rules`)
Deploy these security rules to ensure students can only view public directory data and read/write their own private student records:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Public directory data is read-only for all users
    match /careers/{careerId} {
      allow read: if true;
      allow write: if false;
    }
    match /colleges/{collegeId} {
      allow read: if true;
      allow write: if false;
    }
    match /entranceExams/{examId} {
      allow read: if true;
      allow write: if false;
    }
    match /scholarships/{scholarshipId} {
      allow read: if true;
      allow write: if false;
    }
    match /roadmaps/{roadmapId} {
      allow read: if true;
      allow write: if false;
    }

    // Private student records (users only read & write their own documents)
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /studentProfiles/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /savedItems/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /progress/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

---

## 5. Completed Features

- [x] Complete multi-page architecture with 20+ working HTML pages.
- [x] Cinematic dark theme with pure white typography and metallic silver wordmark.
- [x] Full public homepage with 10 sections and animated 5-step journey ladder.
- [x] Student registration, login, remember me, forgot password, and demo auto-fill.
- [x] 5-step interactive student onboarding wizard with progress percentage.
- [x] Personalized student dashboard workspace with 10 modular cards.
- [x] Career explorer with search and multi-category filters.
- [x] Dynamic career details viewer with trajectories, courses, and exam links.
- [x] Chronological career roadmaps with interactive milestone checkboxes and live progress calculation.
- [x] Skill development module with category filters and mastery toggling.
- [x] College directory with verified institutions, degree programs, and official links.
- [x] College details profile page with eligibility and exam requirements.
- [x] Entrance exam directory and syllabus breakdown pages.
- [x] Scholarship discovery hub with eligibility requirements and portal links.
- [x] Interactive 5-question Aptitude & Career Discovery Test with trait breakdown and career mapping.
- [x] Saved items workspace with tabbed filtering across careers, colleges, exams, roadmaps, and scholarships.
- [x] Progress tracker with live milestone completion counters, mastered skills, and achievement badges.
- [x] Student profile editor and academic stream customization.
- [x] Workspace settings with JSON data export and local storage management.
- [x] Complete downloadable `UNLOST-WEBSITE.zip` distribution.
