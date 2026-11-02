import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          login: path.resolve(__dirname, 'login.html'),
          register: path.resolve(__dirname, 'register.html'),
          forgotPassword: path.resolve(__dirname, 'forgot-password.html'),
          onboarding: path.resolve(__dirname, 'onboarding.html'),
          dashboard: path.resolve(__dirname, 'dashboard.html'),
          careerExplorer: path.resolve(__dirname, 'career-explorer.html'),
          careerDetails: path.resolve(__dirname, 'career-details.html'),
          roadmaps: path.resolve(__dirname, 'roadmaps.html'),
          roadmapDetails: path.resolve(__dirname, 'roadmap-details.html'),
          skillDevelopment: path.resolve(__dirname, 'skill-development.html'),
          colleges: path.resolve(__dirname, 'colleges.html'),
          collegeDetails: path.resolve(__dirname, 'college-details.html'),
          entranceExams: path.resolve(__dirname, 'entrance-exams.html'),
          examDetails: path.resolve(__dirname, 'exam-details.html'),
          scholarships: path.resolve(__dirname, 'scholarships.html'),
          scholarshipDetails: path.resolve(__dirname, 'scholarship-details.html'),
          aptitudeTest: path.resolve(__dirname, 'aptitude-test.html'),
          savedItems: path.resolve(__dirname, 'saved-items.html'),
          progress: path.resolve(__dirname, 'progress.html'),
          profile: path.resolve(__dirname, 'profile.html'),
          settings: path.resolve(__dirname, 'settings.html'),
          about: path.resolve(__dirname, 'about.html'),
          contact: path.resolve(__dirname, 'contact.html'),
          privacyPolicy: path.resolve(__dirname, 'privacy-policy.html'),
          terms: path.resolve(__dirname, 'terms.html'),
        },
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
