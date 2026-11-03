import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateCareerAptitudeResult,
  calculateRoadmapProgress,
  filterDirectoryItems,
  toggleSavedItem,
  analyzeSurveyAndRecommend,
  generateStudyTimetable,
  generateOtpCode,
  validateEmail,
  validateRegistrationInput,
  calculateVerificationCooldown,
  isValidStatusTransition,
  isAuthorizedAdmin,
  type AptitudeAnswer,
} from './unlost-logic';

test('calculateCareerAptitudeResult correctly identifies analytical trait and recommendations', () => {
  const answers: AptitudeAnswer[] = [
    { questionId: 1, trait: 'analytical', weight: 2 },
    { questionId: 2, trait: 'analytical', weight: 1 },
    { questionId: 3, trait: 'creative', weight: 1 },
  ];

  const result = calculateCareerAptitudeResult(answers);
  assert.equal(result.dominantTrait, 'analytical');
  assert.equal(result.scores.analytical, 3);
  assert.equal(result.scores.creative, 1);
  assert.ok(result.recommendedCareers.includes('software-engineer'));
  assert.ok(result.disclaimer.includes('exploratory suggestions'));
});

test('calculateCareerAptitudeResult works with creative and scientific profiles', () => {
  const answers: AptitudeAnswer[] = [
    { questionId: 1, trait: 'scientific', weight: 3 },
    { questionId: 2, trait: 'creative', weight: 1 },
  ];

  const result = calculateCareerAptitudeResult(answers);
  assert.equal(result.dominantTrait, 'scientific');
  assert.ok(result.recommendedCareers.includes('neurosurgeon'));
});

test('calculateRoadmapProgress correctly computes counts and percentages', () => {
  const milestones = [
    { id: 'm1', completed: true },
    { id: 'm2', completed: false },
    { id: 'm3', completed: false },
    { id: 'm4', completed: false },
  ];

  const res1 = calculateRoadmapProgress(milestones);
  assert.equal(res1.completedCount, 1);
  assert.equal(res1.totalCount, 4);
  assert.equal(res1.percentage, 25);

  const res2 = calculateRoadmapProgress(milestones, ['m2', 'm3']);
  assert.equal(res2.completedCount, 3);
  assert.equal(res2.percentage, 75);

  const resEmpty = calculateRoadmapProgress([]);
  assert.equal(resEmpty.percentage, 0);
});

test('filterDirectoryItems matches search query and category', () => {
  const items = [
    { id: '1', title: 'Software Engineer', category: 'Technology', overview: 'Build modern systems' },
    { id: '2', title: 'Investment Banker', category: 'Finance', overview: 'Financial modeling' },
    { id: '3', title: 'Product Designer', category: 'Design', overview: 'UI and UX design systems' },
  ];

  const filtered1 = filterDirectoryItems(items, 'software');
  assert.equal(filtered1.length, 1);
  assert.equal(filtered1[0].id, '1');

  const filteredCategory = filterDirectoryItems(items, '', 'Finance');
  assert.equal(filteredCategory.length, 1);
  assert.equal(filteredCategory[0].title, 'Investment Banker');

  const filteredOverview = filterDirectoryItems(items, 'modeling');
  assert.equal(filteredOverview.length, 1);
  assert.equal(filteredOverview[0].id, '2');
});

test('toggleSavedItem adds and removes bookmarks cleanly', () => {
  const initial = ['career-1', 'career-2'];
  const resAdd = toggleSavedItem(initial, 'career-3');
  assert.equal(resAdd.isSaved, true);
  assert.deepEqual(resAdd.updatedList, ['career-1', 'career-2', 'career-3']);

  const resRemove = toggleSavedItem(resAdd.updatedList, 'career-1');
  assert.equal(resRemove.isSaved, false);
  assert.deepEqual(resRemove.updatedList, ['career-2', 'career-3']);
});

test('analyzeSurveyAndRecommend recommends engineering careers for Science PCM student', () => {
  const analysis = analyzeSurveyAndRecommend({
    name: 'Aarav Sharma',
    academicStream: 'Science (PCM)',
    favouriteSubjects: ['Mathematics', 'Physics', 'Computer Science'],
    interests: ['Artificial Intelligence', 'Software Development'],
    workingStyle: 'analytical',
  });

  assert.equal(analysis.recommendedCareers.length, 3);
  assert.equal(analysis.recommendedCareers[0].id, 'software-engineer');
  assert.ok(analysis.recommendedCareers[0].matchPercentage > 90);
  assert.ok(analysis.recommendedCareers[0].institutes.includes('IIT Bombay'));
});

test('analyzeSurveyAndRecommend recommends medicine for Science PCB student', () => {
  const analysis = analyzeSurveyAndRecommend({
    name: 'Priya Patel',
    academicStream: 'Science (PCB)',
    favouriteSubjects: ['Biology', 'Chemistry'],
    interests: ['Neuroscience', 'Clinical Research'],
    workingStyle: 'scientific',
  });

  assert.equal(analysis.recommendedCareers.length, 3);
  assert.equal(analysis.recommendedCareers[0].id, 'neurosurgeon');
  assert.ok(analysis.recommendedCareers[0].entranceExams.includes('NEET UG'));
});

test('generateStudyTimetable adapts schedule to student hours and weekly targets', () => {
  const timetable = generateStudyTimetable({
    educationLevel: 'Class 12',
    studyHoursPerDay: 5,
    stream: 'Science (PCM)',
  });

  assert.ok(timetable.dailySchedule.length >= 3);
  assert.ok(timetable.weeklyTargets.length >= 3);
  assert.ok(timetable.revisionStrategy.includes('Spaced Repetition'));
  assert.ok(timetable.mockTestCadence.includes('mock test'));
});

test('validateEmail and generateOtpCode perform rigorous checks', () => {
  assert.equal(validateEmail('student@unlost.in'), true);
  assert.equal(validateEmail('invalid-email'), false);
  assert.equal(validateEmail(''), false);

  const otp = generateOtpCode();
  assert.equal(otp.length, 6);
  assert.match(otp, /^\d{6}$/);
});

test('validateRegistrationInput enforces name, email and password strength', () => {
  assert.equal(validateRegistrationInput('', 'test@unlost.in', 'pass123').valid, false);
  assert.equal(validateRegistrationInput('A', 'test@unlost.in', 'pass123').valid, false);
  assert.equal(validateRegistrationInput('Aarav', 'invalid-email', 'pass123').valid, false);
  assert.equal(validateRegistrationInput('Aarav', 'aarav@unlost.in', '123').valid, false);
  assert.equal(validateRegistrationInput('Aarav', 'aarav@unlost.in', 'securePassword123').valid, true);
});

test('calculateVerificationCooldown calculates elapsed time accurately', () => {
  const now = 100000;
  // First time (no previous sent)
  assert.equal(calculateVerificationCooldown(null, now).canSend, true);
  // Just sent 10s ago
  const res10s = calculateVerificationCooldown(now - 10000, now);
  assert.equal(res10s.canSend, false);
  assert.equal(res10s.remainingSec, 50);
  // Sent 65s ago (cooldown expired)
  const res65s = calculateVerificationCooldown(now - 65000, now);
  assert.equal(res65s.canSend, true);
  assert.equal(res65s.remainingSec, 0);
});

test('isValidStatusTransition verifies email before active status and allows deletion request', () => {
  // Pending to active requires verified email
  assert.equal(isValidStatusTransition('pending_verification', 'active', false), false);
  assert.equal(isValidStatusTransition('pending_verification', 'active', true), true);
  // Deletion request is always allowed
  assert.equal(isValidStatusTransition('active', 'deletion_requested', true), true);
  assert.equal(isValidStatusTransition('pending_verification', 'deletion_requested', false), true);
  // Same status is allowed
  assert.equal(isValidStatusTransition('active', 'active', true), true);
});

test('isAuthorizedAdmin rejects unverified users and non-admin emails', () => {
  assert.equal(isAuthorizedAdmin(null), false);
  // Unverified admin email -> rejected
  assert.equal(isAuthorizedAdmin({ email: 'k7286113@gmail.com', emailVerified: false }), false);
  // Verified student email -> rejected
  assert.equal(isAuthorizedAdmin({ email: 'student@gmail.com', emailVerified: true }), false);
  // Verified primary admin email -> accepted
  assert.equal(isAuthorizedAdmin({ email: 'k7286113@gmail.com', emailVerified: true }), true);
  // Verified user with custom claim -> accepted
  assert.equal(isAuthorizedAdmin({ email: 'customadmin@unlost.in', emailVerified: true, hasAdminClaim: true }), true);
});


