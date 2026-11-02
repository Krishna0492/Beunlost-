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

export interface StudentSurveyData {
  name: string;
  age?: number | string;
  country?: string;
  state?: string;
  educationLevel: string;
  educationBoard?: string;
  academicStream: string;
  favouriteSubjects: string[];
  difficultSubjects?: string[];
  interests: string[];
  hobbies?: string[];
  strengths: string[];
  skills?: string[];
  workingStyle: string;
  careerAmbition?: string;
  studyHoursPerDay?: number;
  class10Percentage?: number | string;
  class11Percentage?: number | string;
  latestScore?: number | string;
  subjectScores?: Record<string, number | string>;
}

export interface CareerRecommendation {
  id: string;
  name: string;
  matchPercentage: number;
  description: string;
  whyMatch: string;
  requiredEducation: string;
  entranceExams: string[];
  skills: string[];
  institutes: string[];
  officialSource: string;
}

export interface SurveyAnalysisResult {
  dominantProfile: string;
  strengths: string[];
  growthAreas: string[];
  recommendedCareers: CareerRecommendation[];
  disclaimer: string;
}

/**
 * Analyzes multi-step student survey and generates 3 tailored career recommendations
 */
export function analyzeSurveyAndRecommend(data: Partial<StudentSurveyData>): SurveyAnalysisResult {
  const stream = (data.academicStream || '').toLowerCase();
  const subjects = (data.favouriteSubjects || []).map((s) => s.toLowerCase());
  const interests = (data.interests || []).map((i) => i.toLowerCase());
  const style = (data.workingStyle || '').toLowerCase();
  const strengths = data.strengths && data.strengths.length > 0
    ? data.strengths
    : ['Logical reasoning', 'Analytical thinking', 'Problem-solving persistence'];

  const growthAreas = [
    'Deep revision of foundational subjects before advanced topics',
    'Balancing entrance exam preparation with regular school coursework',
    'Developing hands-on project work and portfolio beyond theoretical syllabus',
  ];

  let dominantProfile = 'Analytical & Systems Thinking';
  let recommended: CareerRecommendation[] = [];

  if (stream.includes('pcb') || subjects.some((s) => s.includes('bio'))) {
    dominantProfile = 'Life Sciences & Clinical Medicine';
    recommended = [
      {
        id: 'neurosurgeon',
        name: 'Clinical Medicine & Neurosciences',
        matchPercentage: 94,
        description: 'Diagnoses and treats conditions affecting the nervous system, brain, and spinal column through clinical medicine.',
        whyMatch: 'Matches your interest in biology, patient healthcare impact, and deep scientific inquiry.',
        requiredEducation: 'MBBS (5.5 years) + MS/DNB General Surgery + MCh/DrNB Neurosurgery',
        entranceExams: ['NEET UG', 'NEET PG / INI-CET', 'NEET SS'],
        skills: ['Clinical Diagnosis', 'Surgical Dexterity', 'Emergency Decision Making', 'Patient Empathy'],
        institutes: ['AIIMS New Delhi', 'CMC Vellore', 'JIPMER Puducherry', 'KGMU Lucknow'],
        officialSource: 'National Medical Commission (NMC) — nmc.org.in',
      },
      {
        id: 'bioinformatician',
        name: 'Biotechnology & Computational Biology',
        matchPercentage: 88,
        description: 'Applies computation, machine learning, and statistical genetics to unravel genomic architectures and design novel therapeutics.',
        whyMatch: 'Combines biological curiosity with systematic research and cutting-edge biotechnology.',
        requiredEducation: 'B.Tech / B.Sc in Biotechnology / Bioinformatics followed by M.Tech / M.Sc / Ph.D.',
        entranceExams: ['JEE Main / Advanced', 'CUET UG', 'GATE', 'GAT-B'],
        skills: ['Python / R', 'Genomic Sequence Alignment', 'Molecular Modeling', 'Biostatistics'],
        institutes: ['IISc Bangalore', 'IIT Delhi', 'JNU New Delhi', 'Institute of Chemical Technology (ICT) Mumbai'],
        officialSource: 'Department of Biotechnology (DBT), Govt of India — dbtindia.gov.in',
      },
      {
        id: 'data-scientist',
        name: 'Healthcare Analytics & Data Science',
        matchPercentage: 82,
        description: 'Extracts predictive signals and epidemiology trends from medical imaging, clinical trials, and healthcare datasets.',
        whyMatch: 'Bridges life sciences with analytical methodologies and predictive modeling.',
        requiredEducation: 'B.Sc / B.Tech in Data Science, Statistics, or Computational Biology',
        entranceExams: ['CUET UG', 'JEE Main', 'State CETs'],
        skills: ['Python', 'SQL', 'Biostatistics', 'Epidemiology Modeling'],
        institutes: ['Indian Statistical Institute (ISI)', 'IIT Madras', 'IISc Bangalore'],
        officialSource: 'Indian Council of Medical Research (ICMR) — icmr.nic.in',
      },
    ];
  } else if (stream.includes('commerce') || subjects.some((s) => s.includes('account') || s.includes('econ') || s.includes('business'))) {
    dominantProfile = 'Commerce, Quantitative Finance & Strategy';
    recommended = [
      {
        id: 'investment-banker',
        name: 'Investment Banking & Corporate Finance',
        matchPercentage: 93,
        description: 'Advises corporations and institutions on mergers and acquisitions (M&A), equity underwriting, and valuation modeling.',
        whyMatch: 'Aligns with your numerical aptitude, commerce fundamentals, and strategic market interest.',
        requiredEducation: 'B.Com / BBA / Economics (Hons) followed by MBA in Finance or CFA charter',
        entranceExams: ['CUET UG', 'IPMAT', 'CAT', 'GMAT'],
        skills: ['Financial Modeling (DCF, Multiples)', 'Corporate Valuation', 'Excel Mastery', 'M&A Due Diligence'],
        institutes: ['SRCC Delhi', 'IIM Ahmedabad', 'IIM Bangalore', 'St. Xavier’s College Mumbai'],
        officialSource: 'Securities and Exchange Board of India (SEBI) — sebi.gov.in',
      },
      {
        id: 'corporate-lawyer',
        name: 'Corporate Law & Commercial Governance',
        matchPercentage: 87,
        description: 'Structures commercial agreements, resolves contractual disputes, and ensures regulatory compliance for enterprises.',
        whyMatch: 'Combines commerce acumen with critical statutory interpretation and high-stakes negotiation.',
        requiredEducation: '5-Year Integrated BBA LLB / BA LLB (Hons)',
        entranceExams: ['CLAT UG', 'AILET', 'SLAT'],
        skills: ['Contract Drafting', 'Statutory Interpretation', 'Regulatory Compliance', 'Commercial Negotiation'],
        institutes: ['NLSIU Bengaluru', 'NALSAR Hyderabad', 'WBNUJS Kolkata', 'NLU Delhi'],
        officialSource: 'Consortium of National Law Universities — consortiumofnlus.ac.in',
      },
      {
        id: 'data-scientist',
        name: 'FinTech Analytics & Quantitative Modeling',
        matchPercentage: 81,
        description: 'Applies statistical mathematics and algorithmic trading models to capital markets and risk management.',
        whyMatch: 'Leverages mathematics, commerce principles, and statistical decision-making.',
        requiredEducation: 'B.Sc / B.Com in Financial Technology, Economics or Statistics',
        entranceExams: ['CUET UG', 'State CETs', 'IPMAT'],
        skills: ['Quantitative Modeling', 'Python / R', 'Econometrics', 'Risk Analytics'],
        institutes: ['Delhi School of Economics', 'St. Stephen’s College', 'Loyola College Chennai'],
        officialSource: 'Reserve Bank of India (RBI) Academy — rbi.org.in',
      },
    ];
  } else if (
    stream.includes('arts') ||
    stream.includes('humanities') ||
    style.includes('creative') ||
    interests.some((i) => i === 'art' || i.includes('fine art') || i.includes('visual art') || i.includes('design'))
  ) {
    dominantProfile = 'Creative Innovation, Design & Governance';
    recommended = [
      {
        id: 'product-designer',
        name: 'Product Design & UI/UX Specialist',
        matchPercentage: 95,
        description: 'Shapes user journeys, visual design systems, and frictionless interactions for consumer and enterprise software.',
        whyMatch: 'Integrates creative taste, empathy for users, and visual problem-solving.',
        requiredEducation: 'Bachelor of Design (B.Des) or equivalent degree',
        entranceExams: ['UCEED', 'NID DAT', 'NIFT', 'CEED'],
        skills: ['Figma / Prototyping', 'Design Thinking', 'Visual Hierarchy', 'User Research'],
        institutes: ['National Institute of Design (NID) Ahmedabad', 'IDC School of Design, IIT Bombay', 'IIT Delhi', 'Srishti Institute'],
        officialSource: 'UCEED Office, IIT Bombay — uceed.iitb.ac.in',
      },
      {
        id: 'civil-servant-ias',
        name: 'Public Policy & Civil Services (IAS / IPS / IFS)',
        matchPercentage: 89,
        description: 'Formulates public welfare policies, oversees district administration, and drives socioeconomic governance.',
        whyMatch: 'Resonates with your appreciation for humanities, governance, ethics, and national impact.',
        requiredEducation: 'Bachelor’s degree in any discipline from a recognised university',
        entranceExams: ['UPSC Civil Services Examination (Prelims + Mains + Interview)'],
        skills: ['Public Administration', 'Analytical Writing', 'Ethics & Integrity', 'Crisis Leadership'],
        institutes: ['JNU New Delhi', 'Delhi University (Hindu, Miranda, St. Stephen’s)', 'Presidency University'],
        officialSource: 'Union Public Service Commission (UPSC) — upsc.gov.in',
      },
      {
        id: 'corporate-lawyer',
        name: 'Constitutional & International Law',
        matchPercentage: 84,
        description: 'Champions legal rights, intellectual property, constitutional liberties, and arbitration.',
        whyMatch: 'Builds upon critical essay writing, argumentative logic, and societal awareness.',
        requiredEducation: '5-Year Integrated BA LLB (Hons)',
        entranceExams: ['CLAT UG', 'AILET'],
        skills: ['Constitutional Law', 'Legal Research', 'Moot Court Advocacy', 'Drafting'],
        institutes: ['NLSIU Bengaluru', 'NALSAR Hyderabad', 'NLU Delhi', 'NUJS Kolkata'],
        officialSource: 'Consortium of NLUs — consortiumofnlus.ac.in',
      },
    ];
  } else {
    // Default: Science PCM / Technology / Engineering
    dominantProfile = 'Engineering, Computer Science & Emerging Tech';
    recommended = [
      {
        id: 'software-engineer',
        name: 'Software Engineer & Systems Architect',
        matchPercentage: 96,
        description: 'Designs, builds, and scales cloud systems, web platforms, and software engines powering modern digital infrastructure.',
        whyMatch: 'Directly aligns with your PCM stream, quantitative reasoning, and passion for building functional systems.',
        requiredEducation: 'B.Tech / B.E. in Computer Science, Software Engineering, or related fields',
        entranceExams: ['JEE Main', 'JEE Advanced', 'BITSAT', 'WBJEE', 'MHT CET'],
        skills: ['TypeScript / Python / Java', 'Data Structures & Algorithms', 'System Architecture', 'Git & Cloud Infrastructure'],
        institutes: ['IIT Bombay', 'IIT Delhi', 'IIT Madras', 'BITS Pilani', 'IIIT Hyderabad', 'NIT Trichy'],
        officialSource: 'Joint Seat Allocation Authority (JoSAA) — josaa.nic.in',
      },
      {
        id: 'ai-ml-specialist',
        name: 'Artificial Intelligence & Machine Learning Specialist',
        matchPercentage: 91,
        description: 'Constructs neural networks, multimodal generative algorithms, and statistical models enabling computers to learn and predict.',
        whyMatch: 'Leverages strong mathematical fundamentals, calculus, and programming curiosity.',
        requiredEducation: 'B.Tech in AI / Computer Science / Mathematics & Computing',
        entranceExams: ['JEE Advanced', 'JEE Main', 'BITSAT'],
        skills: ['Python', 'PyTorch / TensorFlow', 'Linear Algebra & Calculus', 'Model Fine-Tuning'],
        institutes: ['IIT Hyderabad', 'IIT Bombay', 'IISc Bangalore', 'IIIT Hyderabad'],
        officialSource: 'National Testing Agency (NTA) — nta.ac.in',
      },
      {
        id: 'product-designer',
        name: 'Product Design & Human-Computer Interaction',
        matchPercentage: 85,
        description: 'Merges technical software architecture with user psychology, wireframes, and design aesthetics.',
        whyMatch: 'Balances technical understanding with creative UI/UX instincts.',
        requiredEducation: 'B.Des / B.Tech with HCI specialization',
        entranceExams: ['UCEED', 'JEE Main Paper 2', 'NID DAT'],
        skills: ['Figma', 'UI/UX Prototyping', 'Component Architecture', 'Usability Testing'],
        institutes: ['IIT Bombay (IDC)', 'IIT Delhi', 'NID Ahmedabad', 'IIITDM Jabalpur'],
        officialSource: 'UCEED — uceed.iitb.ac.in',
      },
    ];
  }

  return {
    dominantProfile,
    strengths,
    growthAreas,
    recommendedCareers: recommended,
    disclaimer: 'These recommendations are based on your self-reported academic stream, performance, and personal interests. They are intended as structured directional guidance, not as a rigid limitation of your potential.',
  };
}

/**
 * Generates an adaptive personal study timetable based on student level and available hours
 */
export function generateStudyTimetable(data: {
  educationLevel?: string;
  studyHoursPerDay?: number;
  stream?: string;
}): {
  dailySchedule: { time: string; activity: string; focus: string }[];
  weeklyTargets: string[];
  revisionStrategy: string;
  mockTestCadence: string;
} {
  const hours = data.studyHoursPerDay || 4;
  const level = (data.educationLevel || 'Class 12').toLowerCase();

  const dailySchedule = [
    {
      time: '06:00 AM – 07:30 AM',
      activity: 'High-Focus Deep Work',
      focus: 'Core conceptual theory & formula derivation (Mathematics / Physics / Accounting)',
    },
    {
      time: '04:30 PM – 06:00 PM',
      activity: 'Active Problem Solving',
      focus: 'Solving 15–20 numerical problems or analytical case exercises without hints',
    },
    {
      time: '07:00 PM – 08:30 PM',
      activity: 'Secondary Subject & Skill Work',
      focus: 'Practical coding, language comprehension, or secondary theory modules',
    },
    {
      time: '09:30 PM – 10:30 PM',
      activity: 'Daily Revision & Error Log',
      focus: 'Review mistake notebook, summarize key theorems, plan next day goals',
    },
  ];

  if (hours <= 3) {
    dailySchedule.splice(2, 1);
  }

  return {
    dailySchedule,
    weeklyTargets: [
      'Complete 1 full chapter syllabus breakdown with formula summaries',
      'Solve 50–75 chapter-end questions graded by difficulty level',
      'Maintain an active Error Log documenting every mistake and solution',
      'Dedicate 3 hours over the weekend to practical skill building (coding/design)',
    ],
    revisionStrategy: 'Follow the 1-3-7-21 Spaced Repetition Protocol: review new topics after 24 hours, 3 days, 1 week, and 3 weeks.',
    mockTestCadence: level.includes('12') || level.includes('gap')
      ? 'One full-length 3-hour timed mock test every Sunday under strict exam conditions, followed by 2 hours of thorough post-test error analysis.'
      : 'Bi-weekly topic-wise sectional tests to build speed, accuracy, and examination composure.',
  };
}

/**
 * Generates a 6-digit verification OTP
 */
export function generateOtpCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * Validates student email format
 */
export function validateEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false;
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.trim());
}

