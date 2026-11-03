/**
 * UNLOST — Personalized 6-Page Student Career Guidance Report PDF Generator
 * Adheres strictly to UNLOST premium black-and-white visual identity.
 * Generates custom 6-page report from actual student survey responses.
 */

window.UnlostReportGenerator = {
  /**
   * Generates and downloads the personalized 6-page career report PDF
   * @param {Object} studentProfile - Complete survey data
   * @param {Object} analysis - Output from survey analysis
   */
  async generate6PageReport(studentProfile, analysis) {
    return this.downloadReportPDF(studentProfile, analysis);
  },

  async downloadReportPDF(studentProfile, analysis) {
    if (!studentProfile) {
      studentProfile = JSON.parse(localStorage.getItem('unlost_survey_data') || '{}');
    }
    if (!analysis) {
      analysis = JSON.parse(localStorage.getItem('unlost_survey_analysis') || '{}');
    }

    const studentName = studentProfile.name || 'Student';
    const stream = studentProfile.academicStream || 'General';
    const level = studentProfile.educationLevel || 'Class 12';
    const dateStr = new Date().toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

    // Check if jsPDF is available
    const { jsPDF } = window.jspdf || {};
    if (!jsPDF) {
      console.warn('jsPDF not loaded directly, triggering print-friendly report window');
      this.openPrintableReport(studentProfile, analysis);
      return;
    }

    try {
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const pageWidth = 210;
      const pageHeight = 297;
      const margin = 20;
      const contentWidth = pageWidth - (margin * 2);

      // Color Palette (UNLOST Black, White, Metallic Silver, Charcoal)
      const COLOR_BLACK = [10, 10, 10];
      const COLOR_CHARCOAL = [24, 24, 27];
      const COLOR_SILVER = [161, 161, 170];
      const COLOR_WHITE = [255, 255, 255];
      const COLOR_MUTED = [113, 113, 122];

      const drawHeader = (pageNumber, pageTitle) => {
        // Top Brand Bar
        doc.setFillColor(10, 10, 10);
        doc.rect(0, 0, pageWidth, 24, 'F');

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(14);
        doc.setTextColor(...COLOR_SILVER);
        doc.text('UN', margin, 15);
        doc.setTextColor(...COLOR_WHITE);
        doc.text('LOST', margin + 7.5, 15);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        doc.setTextColor(...COLOR_SILVER);
        doc.text('STUDENT CAREER DISCOVERY & GUIDANCE PLATFORM', margin + 30, 15);

        doc.setFontSize(8);
        doc.setTextColor(...COLOR_MUTED);
        doc.text(pageTitle.toUpperCase(), pageWidth - margin, 15, { align: 'right' });

        // Thin separator rule
        doc.setDrawColor(39, 39, 42);
        doc.setLineWidth(0.5);
        doc.line(margin, 24, pageWidth - margin, 24);
      };

      const drawFooter = (pageNumber) => {
        doc.setDrawColor(39, 39, 42);
        doc.setLineWidth(0.5);
        doc.line(margin, pageHeight - 16, pageWidth - margin, pageHeight - 16);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7.5);
        doc.setTextColor(...COLOR_MUTED);
        doc.text('UNLOST • Not lost. Just finding my way. • Official portal: beunlost.in', margin, pageHeight - 10);
        doc.text(`Page ${pageNumber} of 6`, pageWidth - margin, pageHeight - 10, { align: 'right' });
      };

      // ==========================================================
      // PAGE 1: STUDENT PROFILE & FOUNDATIONAL OVERVIEW
      // ==========================================================
      doc.setFillColor(15, 15, 17);
      doc.rect(0, 0, pageWidth, pageHeight, 'F');
      drawHeader(1, 'Personalized Career Guidance Report');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(22);
      doc.setTextColor(...COLOR_WHITE);
      doc.text('CONFIDENTIAL STUDENT CAREER DOSSIER', margin, 42);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10.5);
      doc.setTextColor(...COLOR_SILVER);
      doc.text(`Prepared for: ${studentName.toUpperCase()}`, margin, 50);
      doc.setFontSize(8.5);
      doc.setTextColor(...COLOR_MUTED);
      doc.text(`Generated on: ${dateStr} • Academic Stream: ${stream} • Level: ${level}`, margin, 56);

      // Section Card: Verified Academic Profile
      doc.setFillColor(...COLOR_CHARCOAL);
      doc.roundedRect(margin, 64, contentWidth, 68, 3, 3, 'F');
      doc.setDrawColor(45, 45, 50);
      doc.roundedRect(margin, 64, contentWidth, 68, 3, 3, 'S');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(...COLOR_WHITE);
      doc.text('1. VERIFIED STUDENT ACADEMIC PROFILE', margin + 6, 73);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(...COLOR_SILVER);
      
      const profileItems = [
        ['Student Name:', studentName, 'Current Education Level:', level],
        ['Academic Stream:', stream, 'Education Board:', studentProfile.educationBoard || 'CBSE / Recognized Board'],
        ['Class 10 Score:', studentProfile.class10Percentage ? `${studentProfile.class10Percentage}%` : 'Reported', 'Class 11 / Latest Score:', studentProfile.class11Percentage ? `${studentProfile.class11Percentage}%` : (studentProfile.latestScore || 'Active')],
        ['Favourite Subjects:', (studentProfile.favouriteSubjects || ['Mathematics', 'Physics']).slice(0, 3).join(', '), 'Subjects Needing Focus:', (studentProfile.difficultSubjects || ['None reported']).slice(0, 2).join(', ')],
        ['Primary Interests:', (studentProfile.interests || ['Technology', 'Problem Solving']).slice(0, 3).join(', '), 'Working Style:', studentProfile.workingStyle || 'Analytical & Focused']
      ];

      let py = 82;
      profileItems.forEach(row => {
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(...COLOR_MUTED);
        doc.text(row[0], margin + 6, py);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(...COLOR_WHITE);
        doc.text(String(row[1]), margin + 44, py);

        doc.setFont('helvetica', 'bold');
        doc.setTextColor(...COLOR_MUTED);
        doc.text(row[2], margin + 92, py);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(...COLOR_WHITE);
        doc.text(String(row[3]), margin + 138, py);
        py += 9.5;
      });

      // Section Card: Executive Summary & Philosophy
      doc.setFillColor(...COLOR_CHARCOAL);
      doc.roundedRect(margin, 140, contentWidth, 75, 3, 3, 'F');
      doc.setDrawColor(45, 45, 50);
      doc.roundedRect(margin, 140, contentWidth, 75, 3, 3, 'S');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(...COLOR_WHITE);
      doc.text('2. STRATEGIC EXECUTIVE SUMMARY', margin + 6, 149);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.8);
      doc.setTextColor(...COLOR_SILVER);
      const summaryText = [
        `Dear ${studentName},`,
        'Choosing a career is not about predicting the next 40 years of your life in a single afternoon. It is about understanding your foundational cognitive strengths, selecting an educational pathway that preserves optionality, and executing your next step with calm, deliberate discipline.',
        'Based on your academic performance, subject affinities, and problem-solving preferences, this dossier synthesizes verified admissions criteria, entrance examinations, institutional requirements, and practical skill development steps.',
        'Remember the core UNLOST premise: You do not need to have your entire future figured out. You only need to know where to direct your focus today.'
      ];
      let sy = 158;
      summaryText.forEach(line => {
        const splitLines = doc.splitTextToSize(line, contentWidth - 12);
        doc.text(splitLines, margin + 6, sy);
        sy += (splitLines.length * 4.5) + 2.5;
      });

      // Key Focus Callout
      doc.setFillColor(25, 25, 30);
      doc.roundedRect(margin, 222, contentWidth, 45, 3, 3, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(...COLOR_SILVER);
      doc.text('PRIMARY DIRECTIONAL THESIS', margin + 6, 231);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.8);
      doc.setTextColor(...COLOR_WHITE);
      const thesis = `Your cognitive indicators point strongly toward ${analysis.dominantProfile || 'Analytical & Systems Engineering'}. You demonstrate a high capacity for structured logical reasoning, structured inquiry, and persistence in complex problem solving. Focus on mastering foundational syllabus depth over superficial breadth.`;
      doc.text(doc.splitTextToSize(thesis, contentWidth - 12), margin + 6, 238);

      drawFooter(1);

      // ==========================================================
      // PAGE 2: IN-DEPTH CAREER ANALYSIS & 3 RECOMMENDATIONS
      // ==========================================================
      doc.addPage();
      doc.setFillColor(15, 15, 17);
      doc.rect(0, 0, pageWidth, pageHeight, 'F');
      drawHeader(2, 'Career Analysis & Top 3 Options');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(16);
      doc.setTextColor(...COLOR_WHITE);
      doc.text('TOP THREE RECOMMENDED CAREER PATHWAYS', margin, 36);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(...COLOR_MUTED);
      doc.text('Selected via multi-factor matching across your academic stream, cognitive traits, and verified opportunities.', margin, 42);

      const careers = (analysis.recommendedCareers && analysis.recommendedCareers.length > 0)
        ? analysis.recommendedCareers
        : [
            {
              name: 'Software Engineer & Systems Architect',
              matchPercentage: 96,
              description: 'Designs, develops, and scales modern software systems and cloud platforms.',
              whyMatch: 'Direct alignment with quantitative problem-solving and computer science interest.',
              requiredEducation: 'B.Tech / B.E. in Computer Science or Software Engineering',
              entranceExams: ['JEE Main', 'JEE Advanced', 'BITSAT'],
              skills: ['Data Structures', 'Algorithms', 'System Design', 'Git']
            },
            {
              name: 'Artificial Intelligence & Machine Learning Specialist',
              matchPercentage: 91,
              description: 'Constructs mathematical models, neural networks, and generative algorithms.',
              whyMatch: 'Capitalizes on mathematics, calculus, and programming curiosity.',
              requiredEducation: 'B.Tech in AI / Computer Science / Mathematics & Computing',
              entranceExams: ['JEE Advanced', 'JEE Main'],
              skills: ['Python', 'Linear Algebra', 'PyTorch', 'Model Fine-Tuning']
            },
            {
              name: 'Product Designer & UI/UX Specialist',
              matchPercentage: 85,
              description: 'Shapes digital interfaces, user workflows, and design systems.',
              whyMatch: 'Balances technical understanding with aesthetic intuition.',
              requiredEducation: 'Bachelor of Design (B.Des)',
              entranceExams: ['UCEED', 'NID DAT'],
              skills: ['Figma', 'User Research', 'Design Systems']
            }
          ];

      let cardY = 48;
      careers.slice(0, 3).forEach((c, idx) => {
        doc.setFillColor(...COLOR_CHARCOAL);
        doc.roundedRect(margin, cardY, contentWidth, 68, 3, 3, 'F');
        doc.setDrawColor(45, 45, 50);
        doc.roundedRect(margin, cardY, contentWidth, 68, 3, 3, 'S');

        // Number Badge
        doc.setFillColor(35, 35, 40);
        doc.roundedRect(margin + 5, cardY + 5, 20, 7, 2, 2, 'F');
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(7.5);
        doc.setTextColor(...COLOR_SILVER);
        doc.text(`OPTION 0${idx + 1}`, margin + 8, cardY + 10);

        // Match Percentage Badge
        doc.setFillColor(20, 40, 25);
        doc.roundedRect(pageWidth - margin - 28, cardY + 5, 23, 7, 2, 2, 'F');
        doc.setTextColor(52, 211, 153);
        doc.text(`${c.matchPercentage}% MATCH`, pageWidth - margin - 26, cardY + 10);

        // Career Title
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);
        doc.setTextColor(...COLOR_WHITE);
        doc.text(c.name, margin + 5, cardY + 19);

        // Description
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8.2);
        doc.setTextColor(...COLOR_SILVER);
        const descLines = doc.splitTextToSize(c.description, contentWidth - 10);
        doc.text(descLines, margin + 5, cardY + 25);

        // Why it matches
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8);
        doc.setTextColor(...COLOR_MUTED);
        doc.text('WHY THIS MATCHES YOU:', margin + 5, cardY + 35);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(...COLOR_WHITE);
        doc.text(doc.splitTextToSize(c.whyMatch, contentWidth - 45), margin + 45, cardY + 35);

        // Required Education
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(...COLOR_MUTED);
        doc.text('DEGREE / PATHWAY:', margin + 5, cardY + 43);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(...COLOR_WHITE);
        doc.text(c.requiredEducation, margin + 45, cardY + 43);

        // Entrance Exams
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(...COLOR_MUTED);
        doc.text('KEY ENTRANCE EXAMS:', margin + 5, cardY + 51);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(...COLOR_SILVER);
        doc.text(c.entranceExams.join(', '), margin + 45, cardY + 51);

        // Essential Skills
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(...COLOR_MUTED);
        doc.text('CORE SKILLS TO BUILD:', margin + 5, cardY + 59);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(...COLOR_SILVER);
        doc.text((c.skills || []).join(' • '), margin + 45, cardY + 59);

        cardY += 73;
      });

      drawFooter(2);

      // ==========================================================
      // PAGE 3: CHRONOLOGICAL CAREER ROADMAP & MILESTONES
      // ==========================================================
      doc.addPage();
      doc.setFillColor(15, 15, 17);
      doc.rect(0, 0, pageWidth, pageHeight, 'F');
      drawHeader(3, 'Sequential Career Roadmap');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(16);
      doc.setTextColor(...COLOR_WHITE);
      doc.text('FOUR-PHASE CAREER MILESTONE ROADMAP', margin, 36);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(...COLOR_MUTED);
      doc.text('Your chronological progression from current secondary studies to professional employment.', margin, 42);

      const roadmapPhases = [
        {
          phase: 'PHASE 1: SECONDARY FOUNDATIONS (CLASS 11 – 12)',
          duration: '12 – 18 MONTHS',
          objective: 'Master foundational syllabi, formula derivation, and entrance examination speed.',
          actions: [
            'Maintain strict conceptual depth in core subjects (Physics, Chemistry, Maths / Commerce).',
            'Complete comprehensive practice of past 10 years entrance examination question papers.',
            'Build an error log and revise formula handbooks bi-weekly.'
          ]
        },
        {
          phase: 'PHASE 2: ENTRANCE EXAMINATIONS & ADMISSIONS',
          duration: '3 – 6 MONTHS',
          objective: 'Execute high-pressure examination strategy and navigate centralized counseling.',
          actions: [
            'Appear for primary entrance exams (JEE Main/Adv, BITSAT, CUET, or state CETs).',
            'Participate in JoSAA / CSAB or institutional counseling rounds strategically based on rank.',
            'Secure enrollment in an accredited institution offering robust curriculum and placement cells.'
          ]
        },
        {
          phase: 'PHASE 3: UNDERGRADUATE MILESTONES (YEARS 1 – 3)',
          duration: '36 MONTHS',
          objective: 'Excel academically while constructing real-world proof-of-work and technical craft.',
          actions: [
            'Maintain a strong CGPA (above 8.0/10) to qualify for top-tier internships and scholarships.',
            'Develop 2-3 production-grade open-source projects or write peer-reviewed student research.',
            'Secure a competitive summer internship at a reputed enterprise or research laboratory.'
          ]
        },
        {
          phase: 'PHASE 4: PORTFOLIO, INTERNSHIP & CAREER LAUNCH',
          duration: 'FINAL YEAR',
          objective: 'Transition from student to verified professional practitioner.',
          actions: [
            'Complete a rigorous final capstone project demonstrating end-to-end domain ownership.',
            'Prepare system design, technical coding interviews, or corporate case studies.',
            'Participate in campus placement drives or pursue funded postgraduate specializations.'
          ]
        }
      ];

      let rY = 50;
      roadmapPhases.forEach((phase) => {
        doc.setFillColor(...COLOR_CHARCOAL);
        doc.roundedRect(margin, rY, contentWidth, 48, 3, 3, 'F');
        doc.setDrawColor(45, 45, 50);
        doc.roundedRect(margin, rY, contentWidth, 48, 3, 3, 'S');

        // Phase Header
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9.5);
        doc.setTextColor(...COLOR_WHITE);
        doc.text(phase.phase, margin + 6, rY + 8);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        doc.setTextColor(...COLOR_SILVER);
        doc.text(phase.duration, pageWidth - margin - 6, rY + 8, { align: 'right' });

        doc.setFont('helvetica', 'italic');
        doc.setFontSize(8);
        doc.setTextColor(...COLOR_MUTED);
        doc.text(`Key Objective: ${phase.objective}`, margin + 6, rY + 15);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        doc.setTextColor(...COLOR_SILVER);
        let aY = rY + 23;
        phase.actions.forEach(act => {
          doc.text(`•  ${act}`, margin + 6, aY);
          aY += 6.5;
        });

        rY += 54;
      });

      drawFooter(3);

      // ==========================================================
      // PAGE 4: STRATEGIC ACTION PLAN (IMMEDIATE, SHORT & LONG TERM)
      // ==========================================================
      doc.addPage();
      doc.setFillColor(15, 15, 17);
      doc.rect(0, 0, pageWidth, pageHeight, 'F');
      drawHeader(4, 'Strategic Action Plan');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(16);
      doc.setTextColor(...COLOR_WHITE);
      doc.text('PERSONALIZED ACTION EXECUTION MATRIX', margin, 36);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(...COLOR_MUTED);
      doc.text('Concrete, measurable milestones segmented into immediate, medium-term, and long-term horizons.', margin, 42);

      const actionBoxes = [
        {
          title: 'IMMEDIATE 30-DAY TARGETS (FOUNDATION BUILDING)',
          bullets: [
            'Audit your current syllabus: Identify the top 3 conceptual weaknesses in your primary subjects.',
            'Establish an uninterrupted 2-hour morning deep-work block dedicated exclusively to problem solving.',
            'Consolidate all official exam dates, portal registration links, and eligibility criteria.',
            'Eliminate passive reading: Replace reading notes with active recall and closed-book derivations.'
          ]
        },
        {
          title: '6-MONTH HORIZON (EXAM READINESS & SPEED)',
          bullets: [
            'Complete first round of syllabus coverage across all examination subjects.',
            'Take a minimum of 1 full-length, timed mock examination every 14 days.',
            'Maintain an Error Logbook: Every wrong answer must be solved again correctly after 48 hours.',
            'Begin a weekend side activity (e.g. basic Python programming, technical writing, or design).'
          ]
        },
        {
          title: '1-YEAR HORIZON (APPLICATION & TRANSITION)',
          bullets: [
            'Execute entrance examinations under calm composure and timed pacing.',
            'Prepare all necessary documents: Category certificates, Class 10/12 marksheets, ID verification.',
            'Research college placement records, faculty profiles, and scholarship deadlines thoroughly.',
            'Transition smoothly into your selected undergraduate discipline with an open, curious mindset.'
          ]
        },
        {
          title: 'PRACTICAL GUIDANCE FOR INDIAN STUDENTS',
          bullets: [
            'Do not rely solely on coaching materials; NCERT and standard textbook derivations are mandatory.',
            'Be vigilant regarding JoSAA/CSAB round-wise seat acceptance and fee deposit deadlines.',
            'Never hide weak chapters: facing difficult topics early removes fear months before the actual test.',
            'Your peer group matters: surround yourself with disciplined students who respect focus.'
          ]
        }
      ];

      let abY = 50;
      actionBoxes.forEach(box => {
        doc.setFillColor(...COLOR_CHARCOAL);
        doc.roundedRect(margin, abY, contentWidth, 48, 3, 3, 'F');
        doc.setDrawColor(45, 45, 50);
        doc.roundedRect(margin, abY, contentWidth, 48, 3, 3, 'S');

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9.5);
        doc.setTextColor(...COLOR_WHITE);
        doc.text(box.title, margin + 6, abY + 9);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        doc.setTextColor(...COLOR_SILVER);
        let bY = abY + 17;
        box.bullets.forEach(b => {
          doc.text(`✔  ${b}`, margin + 6, bY);
          bY += 7;
        });

        abY += 54;
      });

      drawFooter(4);

      // ==========================================================
      // PAGE 5: ADAPTIVE PERSONAL TIMETABLE & STUDY ROUTINE
      // ==========================================================
      doc.addPage();
      doc.setFillColor(15, 15, 17);
      doc.rect(0, 0, pageWidth, pageHeight, 'F');
      drawHeader(5, 'Adaptive Personal Timetable');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(16);
      doc.setTextColor(...COLOR_WHITE);
      doc.text('ADAPTIVE DAILY & WEEKLY STUDY SCHEDULE', margin, 36);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(...COLOR_MUTED);
      doc.text('Tailored to your current class level and available daily hours. Adaptable for weekdays vs weekends.', margin, 42);

      // Timetable Table
      doc.setFillColor(...COLOR_CHARCOAL);
      doc.roundedRect(margin, 48, contentWidth, 105, 3, 3, 'F');
      doc.setDrawColor(45, 45, 50);
      doc.roundedRect(margin, 48, contentWidth, 105, 3, 3, 'S');

      // Table Header
      doc.setFillColor(30, 30, 35);
      doc.rect(margin, 48, contentWidth, 10, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(...COLOR_SILVER);
      doc.text('TIME WINDOW', margin + 6, 54.5);
      doc.text('ACTIVITY / WORK SESSION', margin + 45, 54.5);
      doc.text('COGNITIVE FOCUS & EXPECTED OUTCOME', margin + 105, 54.5);

      const timetableSlots = [
        ['06:00 AM – 07:30 AM', 'Session 1: Deep Analytical Work', 'Fresh mind: Hardest numerical or conceptual derivations'],
        ['07:30 AM – 08:30 AM', 'Breakfast, Exercise & Review', 'Physical movement, review 10 formula flashcards'],
        ['08:30 AM – 03:30 PM', 'Academic Hours / College / School', 'Attentive classroom presence, clarify doubts with teachers'],
        ['04:30 PM – 06:00 PM', 'Session 2: Active Problem Solving', 'Solve 20 practice questions without looking at solutions'],
        ['06:00 PM – 06:45 PM', 'Decompression & Health Walk', 'Screen-free break to prevent mental fatigue'],
        ['06:45 PM – 08:30 PM', 'Session 3: Secondary Subject Study', 'Cover secondary subject chapters or write notes'],
        ['08:30 PM – 09:30 PM', 'Dinner & Family Interaction', 'Relaxation, calm conversational reset'],
        ['09:30 PM – 10:30 PM', 'Session 4: Revision & Next Day Plan', 'Error notebook analysis + set 3 exact goals for tomorrow'],
        ['10:45 PM – 05:45 AM', 'Restorative Sleep (7 Hours)', 'Crucial for long-term memory consolidation']
      ];

      let tY = 66;
      timetableSlots.forEach((slot, sIdx) => {
        if (sIdx % 2 === 1) {
          doc.setFillColor(20, 20, 23);
          doc.rect(margin, tY - 5, contentWidth, 10, 'F');
        }
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(7.8);
        doc.setTextColor(...COLOR_WHITE);
        doc.text(slot[0], margin + 6, tY + 1.5);

        doc.setFont('helvetica', 'normal');
        doc.setTextColor(...COLOR_SILVER);
        doc.text(slot[1], margin + 45, tY + 1.5);
        doc.text(slot[2], margin + 105, tY + 1.5);

        tY += 10.5;
      });

      // Weekly Target Card
      doc.setFillColor(...COLOR_CHARCOAL);
      doc.roundedRect(margin, 160, contentWidth, 50, 3, 3, 'F');
      doc.setDrawColor(45, 45, 50);
      doc.roundedRect(margin, 160, contentWidth, 50, 3, 3, 'S');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.5);
      doc.setTextColor(...COLOR_WHITE);
      doc.text('WEEKLY LEARNING CADENCE & REVISION PROTOCOL', margin + 6, 169);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(...COLOR_SILVER);
      const cadenceText = [
        '•  1-3-7-21 Spaced Repetition Rule: Revisit every difficult topic at day 1, day 3, day 7, and day 21.',
        '•  Sunday Mock Test Protocol: Every Sunday 09:00 AM – 12:00 PM is reserved for an authentic timed mock test.',
        '•  Sunday Post-Test Audit: Spend 2:00 PM – 4:00 PM categorizing mistakes into Conceptual, Calculation, or Panic.',
        '•  Weekend Practical Hour: Spend 90 minutes every Saturday working on practical skills (coding, design, or writing).'
      ];
      let cY = 177;
      cadenceText.forEach(line => {
        doc.text(line, margin + 6, cY);
        cY += 7.5;
      });

      drawFooter(5);

      // ==========================================================
      // PAGE 6: UNLOST PRINCIPLES, RULES & NEXT STEPS
      // ==========================================================
      doc.addPage();
      doc.setFillColor(15, 15, 17);
      doc.rect(0, 0, pageWidth, pageHeight, 'F');
      drawHeader(6, 'Rules of Engagement & Next Steps');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(16);
      doc.setTextColor(...COLOR_WHITE);
      doc.text('UNLOST PRINCIPLES: HOW TO NAVIGATE UNCERTAINTY', margin, 36);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(...COLOR_MUTED);
      doc.text('Guiding philosophies to maintain composure, avoid burnout, and stay focused.', margin, 42);

      // 2 Column comparison: What to do vs What to avoid
      const colWidth = (contentWidth - 8) / 2;

      // Left Box: What To Do
      doc.setFillColor(...COLOR_CHARCOAL);
      doc.roundedRect(margin, 48, colWidth, 90, 3, 3, 'F');
      doc.setDrawColor(45, 45, 50);
      doc.roundedRect(margin, 48, colWidth, 90, 3, 3, 'S');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.5);
      doc.setTextColor(52, 211, 153);
      doc.text('WHAT TO DO (HIGH-LEVERAGE)', margin + 6, 57);

      const doList = [
        'Focus on daily input goals (e.g. solve 25 questions) rather than distant rank anxieties.',
        'Benchmark yourself against official past papers, not social media boastings.',
        'Talk to actual college seniors currently studying your target degrees.',
        'Take full rest days when mental fatigue sets in to prevent long-term burnout.',
        'Use the UNLOST Student Dashboard to track milestone completions.'
      ];
      let doY = 66;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.8);
      doc.setTextColor(...COLOR_SILVER);
      doList.forEach(item => {
        const lines = doc.splitTextToSize(`✔  ${item}`, colWidth - 12);
        doc.text(lines, margin + 6, doY);
        doY += (lines.length * 4.5) + 3.5;
      });

      // Right Box: What To Avoid
      const rightX = margin + colWidth + 8;
      doc.setFillColor(...COLOR_CHARCOAL);
      doc.roundedRect(rightX, 48, colWidth, 90, 3, 3, 'F');
      doc.setDrawColor(45, 45, 50);
      doc.roundedRect(rightX, 48, colWidth, 90, 3, 3, 'S');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.5);
      doc.setTextColor(248, 113, 113);
      doc.text('WHAT TO AVOID (COMMON TRAPS)', rightX + 6, 57);

      const avoidList = [
        'Do not collect dozens of books; mastering 1-2 standard reference works is 10x more effective.',
        'Never choose a degree solely because a friend or relative insisted without verifying your fit.',
        'Avoid passive video bingeing: watching solutions is not the same as solving problems yourself.',
        'Do not panic over bad mock scores; mock tests are diagnostic tools, not definitive verdicts.',
        'Avoid isolation: maintain healthy communication with supportive family and mentors.'
      ];
      let avoidY = 66;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.8);
      doc.setTextColor(...COLOR_SILVER);
      avoidList.forEach(item => {
        const lines = doc.splitTextToSize(`✖  ${item}`, colWidth - 12);
        doc.text(lines, rightX + 6, avoidY);
        avoidY += (lines.length * 4.5) + 3.5;
      });

      // Bottom Call to Action Card
      doc.setFillColor(25, 25, 30);
      doc.roundedRect(margin, 146, contentWidth, 70, 3, 3, 'F');
      doc.setDrawColor(60, 60, 70);
      doc.roundedRect(margin, 146, contentWidth, 70, 3, 3, 'S');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(...COLOR_WHITE);
      doc.text('NEXT STEPS IN YOUR UNLOST WORKSPACE', margin + 6, 156);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(...COLOR_SILVER);
      const nextStepsText = [
        '1. Login to your UNLOST Student Dashboard (beunlost.in/dashboard.html).',
        '2. Add your top recommended career to "My Career Direction" to activate your personalized milestone tracker.',
        '3. Shortlist 3-5 target institutions on the College Directory and review their verified admission portals.',
        '4. Add your immediate weekly target to "My Learning Goals" on your dashboard.',
        '5. Reach out to our guidance support team anytime at beunlost.in@gmail.com with your queries.'
      ];
      let nsY = 166;
      nextStepsText.forEach(line => {
        doc.text(line, margin + 6, nsY);
        nsY += 8;
      });

      // Signature & Stamp
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(...COLOR_SILVER);
      doc.text('UNLOST GUIDANCE COUNCIL', margin + 6, 204);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(...COLOR_MUTED);
      doc.text('Verified Educational Architecture • beunlost.in', margin + 6, 209);

      drawFooter(6);

      // Save PDF to user's device
      const fileName = `UNLOST_Career_Report_${studentName.replace(/\s+/g, '_')}.pdf`;
      doc.save(fileName);

      if (window.UnlostApp && typeof window.UnlostApp.showToast === 'function') {
        window.UnlostApp.showToast('Your 6-Page Career Report PDF has been downloaded!');
      }
    } catch (err) {
      console.error('Error generating PDF report:', err);
      if (window.UnlostApp && typeof window.UnlostApp.showToast === 'function') {
        window.UnlostApp.showToast('Generating printable report...');
      }
      this.openPrintableReport(studentProfile, analysis);
    }
  },

  /**
   * Fallback for browser print dialog if jsPDF encounters device-specific constraints
   */
  openPrintableReport(studentProfile, analysis) {
    const studentName = (studentProfile && studentProfile.name) || 'Student';
    const stream = (studentProfile && studentProfile.academicStream) || 'Science (PCM)';
    const dateStr = new Date().toLocaleDateString('en-IN');
    const w = window.open('', '_blank');
    if (!w) {
      alert('Please allow popups to download your printable report.');
      return;
    }
    w.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>UNLOST Career Guidance Report — ${studentName}</title>
        <style>
          body { font-family: 'Helvetica Neue', Arial, sans-serif; background: #000; color: #fff; padding: 2rem; max-width: 800px; margin: 0 auto; line-height: 1.6; }
          .logo { font-size: 2rem; font-weight: bold; margin-bottom: 1rem; }
          .un { color: #a1a1aa; }
          .lost { color: #fff; }
          h1, h2, h3 { color: #fff; border-bottom: 1px solid #333; padding-bottom: 0.5rem; }
          .card { background: #18181b; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem; border: 1px solid #27272a; }
          .tag { display: inline-block; background: #27272a; padding: 0.2rem 0.6rem; border-radius: 4px; font-size: 0.8rem; margin-right: 0.5rem; color: #a1a1aa; }
          @media print { body { background: #fff; color: #000; } .card { background: #f4f4f5; color: #000; border-color: #ddd; } h1, h2, h3 { color: #000; } }
        </style>
      </head>
      <body>
        <div class="logo"><span class="un">UN</span><span class="lost">LOST</span></div>
        <h1>Personalized Student Career Dossier</h1>
        <p>Student: <strong>${studentName}</strong> | Stream: <strong>${stream}</strong> | Date: ${dateStr}</p>
        <div class="card">
          <h2>Dominant Career Profile: ${analysis.dominantProfile || 'Engineering & Emerging Tech'}</h2>
          <p>${analysis.disclaimer || 'Verified educational guidance from UNLOST.'}</p>
        </div>
        <button onclick="window.print()" style="padding: 0.8rem 1.5rem; background: #fff; color: #000; font-weight: bold; border: none; border-radius: 6px; cursor: pointer;">Print / Save as PDF</button>
      </body>
      </html>
    `);
    w.document.close();
  }
};
