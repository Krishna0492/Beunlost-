/**
 * UNLOST Pure Business Logic & State Calculators
 * Tested via node:test and tsx.
 */

export interface CareerItem {
  id: string;
  title: string;
  category: string;
  industry: string;
  educationLevel: string;
  overview: string;
  whatTheyDo: string[];
  requiredEducation: string[];
  relevantCourses: string[];
  importantSkills: string[];
  entranceExams: string[];
  careerPathways: string[];
  learningResources: { title: string; type: string; url?: string }[];
  relatedCareerIds: string[];
}

export interface RoadmapMilestone {
  id: string;
  title: string;
  phase: string;
  description: string;
  duration: string;
  keyActions: string[];
  completed?: boolean;
}

export interface RoadmapItem {
  id: string;
  careerId: string;
  title: string;
  overview: string;
  milestones: RoadmapMilestone[];
}

export interface AptitudeAnswer {
  questionId: number;
  trait: 'analytical' | 'creative' | 'scientific' | 'social' | 'systematic';
  weight: number;
}

export interface AptitudeResult {
  dominantTrait: string;
  scores: Record<string, number>;
  recommendedCategory: string;
  recommendedCareers: string[];
  disclaimer: string;
}

/**
 * Calculates student aptitude trait scores and mapped career directions
 */
export function calculateCareerAptitudeResult(answers: AptitudeAnswer[]): AptitudeResult {
  const scores: Record<string, number> = {
    analytical: 0,
    creative: 0,
    scientific: 0,
    social: 0,
    systematic: 0,
  };

  answers.forEach((ans) => {
    if (scores[ans.trait] !== undefined) {
      scores[ans.trait] += ans.weight || 1;
    }
  });

  let dominantTrait = 'analytical';
  let maxScore = -1;

  for (const [trait, score] of Object.entries(scores)) {
    if (score > maxScore) {
      maxScore = score;
      dominantTrait = trait;
    }
  }

  const traitCategoryMap: Record<string, { category: string; careers: string[] }> = {
    analytical: {
      category: 'Technology & Software Engineering',
      careers: ['software-engineer', 'data-scientist', 'cybersecurity-analyst'],
    },
    creative: {
      category: 'Design, Media & Innovation',
      careers: ['product-designer', 'ai-ml-specialist', 'software-engineer'],
    },
    scientific: {
      category: 'Medicine, Biology & Pure Sciences',
      careers: ['neurosurgeon', 'bioinformatician', 'aerospace-engineer'],
    },
    social: {
      category: 'Law, Public Administration & Leadership',
      careers: ['corporate-lawyer', 'civil-servant-ias', 'product-designer'],
    },
    systematic: {
      category: 'Finance, Banking & Management',
      careers: ['investment-banker', 'data-scientist', 'corporate-lawyer'],
    },
  };

  const rec = traitCategoryMap[dominantTrait] || traitCategoryMap.analytical;

  return {
    dominantTrait,
    scores,
    recommendedCategory: rec.category,
    recommendedCareers: rec.careers,
    disclaimer: 'These results are exploratory suggestions to help guide your discovery, not a diagnostic or rigid career lock-in.',
  };
}

/**
 * Calculates milestone completion rate and progress metrics
 */
export function calculateRoadmapProgress(
  milestones: { id: string; completed?: boolean }[],
  completedIds: string[] = []
): { completedCount: number; totalCount: number; percentage: number } {
  if (!milestones || milestones.length === 0) {
    return { completedCount: 0, totalCount: 0, percentage: 0 };
  }

  const completedCount = milestones.filter(
    (m) => m.completed || completedIds.includes(m.id)
  ).length;

  const totalCount = milestones.length;
  const percentage = Math.round((completedCount / totalCount) * 100);

  return {
    completedCount,
    totalCount,
    percentage,
  };
}

/**
 * Filters items by query string and category match
 */
export function filterDirectoryItems<T extends { title: string; category?: string; industry?: string; overview?: string }>(
  items: T[],
  query: string,
  categoryFilter?: string
): T[] {
  const cleanQuery = (query || '').toLowerCase().trim();
  const cleanCategory = (categoryFilter || '').toLowerCase().trim();

  return items.filter((item) => {
    const matchesCategory =
      !cleanCategory ||
      cleanCategory === 'all' ||
      (item.category && item.category.toLowerCase() === cleanCategory) ||
      (item.industry && item.industry.toLowerCase() === cleanCategory);

    if (!matchesCategory) return false;

    if (!cleanQuery) return true;

    const matchesTitle = item.title.toLowerCase().includes(cleanQuery);
    const matchesOverview = (item.overview || '').toLowerCase().includes(cleanQuery);

    return matchesTitle || matchesOverview;
  });
}

/**
 * Bookmark toggle state manager
 */
export function toggleSavedItem(
  savedList: string[],
  itemId: string
): { updatedList: string[]; isSaved: boolean } {
  const exists = savedList.includes(itemId);
  if (exists) {
    return {
      updatedList: savedList.filter((id) => id !== itemId),
      isSaved: false,
    };
  } else {
    return {
      updatedList: [...savedList, itemId],
      isSaved: true,
    };
  }
}
