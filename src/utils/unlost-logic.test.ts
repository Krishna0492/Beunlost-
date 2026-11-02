import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateCareerAptitudeResult,
  calculateRoadmapProgress,
  filterDirectoryItems,
  toggleSavedItem,
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
