/**
 * UNLOST — Comprehensive Verified Student Career Data Store
 * Careers, Roadmaps, Colleges, Exams, Skills, Scholarships & Aptitude Test
 * Verified factual requirements without invented cutoffs or fabricated statistics.
 */

const UNLOST_DATA_STORE = {
  careers: [
    {
      id: "software-engineer",
      title: "Software Engineer / Systems Architect",
      category: "Technology",
      industry: "Information Technology & Computing",
      educationLevel: "Bachelor's / Master's Degree",
      overview: "Designs, develops, and optimizes large-scale software systems, cloud architectures, web platforms, and mobile ecosystems that power modern applications.",
      whatTheyDo: [
        "Architect clean, scalable backend services, distributed systems, and modern web applications.",
        "Solve algorithmic complexities, data persistence challenges, and database indexing.",
        "Collaborate in cross-functional engineering teams using Git, automated CI/CD, and peer reviews.",
        "Optimize latency, memory efficiency, and network reliability under high traffic loads."
      ],
      requiredEducation: [
        "B.Tech / B.E. in Computer Science, Software Engineering, or related technical disciplines",
        "Or Bachelor of Computer Applications (BCA) followed by Master of Computer Applications (MCA)",
        "Or verified portfolio of open-source contributions, algorithms mastery, and production systems"
      ],
      relevantCourses: [
        "Data Structures and Algorithms",
        "Operating Systems & Computer Architecture",
        "Distributed Systems and Cloud Architecture",
        "Database Management Systems (SQL & NoSQL)"
      ],
      importantSkills: [
        "TypeScript / JavaScript / Python",
        "Distributed Computing & API Design",
        "Git version control & Linux tooling",
        "Analytical Problem Solving"
      ],
      entranceExams: ["JEE Main & Advanced", "BITSAT", "GATE (Postgraduate)"],
      careerPathways: [
        "Junior Developer -> Systems Engineer -> Senior Software Architect -> Engineering Director / CTO",
        "Specialization into Cloud Infrastructure, Backend Microservices, Security, or Full Stack"
      ],
      learningResources: [
        { title: "MIT OpenCourseWare: Introduction to Computer Science", type: "Course" },
        { title: "System Design Primer (Open Source Architecture)", type: "Handbook" },
        { title: "CS50: Introduction to Computer Science (Harvard)", type: "Course" }
      ],
      relatedCareerIds: ["ai-ml-specialist", "data-scientist", "cybersecurity-analyst"]
    },
    {
      id: "ai-ml-specialist",
      title: "Artificial Intelligence & Machine Learning Specialist",
      category: "Technology",
      industry: "Artificial Intelligence & Computational Intelligence",
      educationLevel: "Bachelor's / Master's / Ph.D.",
      overview: "Constructs mathematical models, neural networks, and multimodal generative algorithms that enable computers to learn patterns, understand language, and make predictions.",
      whatTheyDo: [
        "Train, fine-tune, and evaluate deep learning architectures, transformers, and neural networks.",
        "Curate, clean, and preprocess large unstructured datasets (text, vision, audio, signals).",
        "Deploy model weights to production with latency and GPU memory optimizations.",
        "Evaluate model alignment, safety guidelines, and bias metrics."
      ],
      requiredEducation: [
        "B.Tech / B.E. in Computer Science, Artificial Intelligence, Data Science, or Mathematics",
        "M.Tech / M.S. or Ph.D. strongly recommended for foundational model research and lab roles"
      ],
      relevantCourses: [
        "Linear Algebra & Multivariable Calculus",
        "Probability Theory and Mathematical Statistics",
        "Deep Learning & Convolutional / Transformer Networks",
        "Natural Language Processing & Computer Vision"
      ],
      importantSkills: [
        "Python, PyTorch, TensorFlow",
        "Model Fine-Tuning & Prompt Engineering",
        "GPU Acceleration (CUDA basics)",
        "Mathematical Modeling"
      ],
      entranceExams: ["JEE Main & Advanced", "GATE (Data Science & AI / CS)"],
      careerPathways: [
        "ML Engineer -> Senior AI Research Scientist -> Head of Machine Learning"
      ],
      learningResources: [
        { title: "Fast.ai Practical Deep Learning for Coders", type: "Course" },
        { title: "Stanford CS229: Machine Learning by Andrew Ng", type: "Lecture Series" },
        { title: "Hugging Face Open Source Documentation & Models", type: "Technical Guide" }
      ],
      relatedCareerIds: ["software-engineer", "data-scientist"]
    },
    {
      id: "product-designer",
      title: "Product Designer & UI/UX Specialist",
      category: "Design",
      industry: "Digital Design & Human-Computer Interaction",
      educationLevel: "Bachelor's Degree in Design or Self-Taught Portfolio",
      overview: "Shapes the intuitive look, feel, wireframes, and workflows of digital software. Merges psychology, typography, aesthetic systems, and user behavior into frictionless experiences.",
      whatTheyDo: [
        "Conduct user research, journey mapping, and empathy interviews.",
        "Produce wireframes, interactive high-fidelity prototypes, and component design systems.",
        "Partner closely with developers to ensure pixel-perfect accessibility and responsive layouts.",
        "Iterate designs based on usability metrics and feedback."
      ],
      requiredEducation: [
        "B.Des / M.Des from institutions like NID, IIT IDC, or leading design academies",
        "Or Bachelor's degree paired with an outstanding design case study portfolio"
      ],
      relevantCourses: [
        "Human-Computer Interaction (HCI)",
        "Visual Typography, Color Theory, and Grid Systems",
        "Information Architecture & Usability Testing",
        "Design Systems & Design Tokens"
      ],
      importantSkills: [
        "Figma, Prototyping, Component Libraries",
        "User Interviewing & Usability Analysis",
        "Visual Hierarchy and Responsive Principles",
        "HTML/CSS familiarity"
      ],
      entranceExams: ["UCEED (Undergraduate)", "CEED (Postgraduate)", "NID DAT"],
      careerPathways: [
        "Product Designer -> Senior UX Architect -> Design Director / VP of Design"
      ],
      learningResources: [
        { title: "Nielsen Norman Group UX Research Guides", type: "Articles" },
        { title: "Refactoring UI by Adam Wathan & Steve Schoger", type: "Book" }
      ],
      relatedCareerIds: ["software-engineer"]
    },
    {
      id: "investment-banker",
      title: "Investment Banker & Quantitative Analyst",
      category: "Finance",
      industry: "Banking, Capital Markets & Corporate Valuation",
      educationLevel: "Bachelor's / Master's Degree (MBA/CFA)",
      overview: "Advises institutions and corporations on capital raising, mergers and acquisitions (M&A), equity underwriting, and multi-asset financial modeling.",
      whatTheyDo: [
        "Build discounted cash flow (DCF), LBO, and three-statement financial models.",
        "Perform market research, company valuations, and investor pitch decks.",
        "Coordinate institutional due diligence during corporate acquisition transactions."
      ],
      requiredEducation: [
        "B.Com / BBA / Economics / Mathematics / B.Tech from tier-1 institutions",
        "MBA in Finance (IIMs / premier business schools) or CFA charterholder"
      ],
      relevantCourses: [
        "Corporate Finance and Financial Statement Analysis",
        "Quantitative Economics & Econometrics",
        "Securities Valuation and Fixed Income"
      ],
      importantSkills: [
        "Financial Modeling (Excel, Python)",
        "Valuation Methodologies (DCF, Multiples)",
        "High-Stakes Presentation & Negotiation"
      ],
      entranceExams: ["CAT (Common Admission Test for IIMs)", "CFA Level 1-3", "GMAT"],
      careerPathways: [
        "Analyst -> Associate -> Vice President -> Managing Director"
      ],
      learningResources: [
        { title: "Corporate Finance Institute (CFI) Modeling Guides", type: "Tutorials" },
        { title: "Aswath Damodaran Valuation Lectures (NYU Stern)", type: "Video Series" }
      ],
      relatedCareerIds: ["data-scientist", "corporate-lawyer"]
    },
    {
      id: "neurosurgeon",
      title: "Physician & Clinical Neurosurgeon",
      category: "Medicine",
      industry: "Healthcare & Surgical Medicine",
      educationLevel: "MBBS + MS/DNB + M.Ch Neurosurgery",
      overview: "Diagnoses and treats conditions affecting the nervous system, brain, and spinal column through delicate microsurgical procedures.",
      whatTheyDo: [
        "Perform intracranial neurosurgeries and spine stabilization operations.",
        "Interpret MRI, CT scans, and neurophysiological diagnostic readouts.",
        "Provide critical patient care in neuro-intensive care units (NICU)."
      ],
      requiredEducation: [
        "MBBS (5.5 years including 1-year compulsory rotatory internship)",
        "MS in General Surgery followed by M.Ch in Neurosurgery (or direct 6-year DNB/M.Ch)"
      ],
      relevantCourses: [
        "Human Anatomy & Neuroanatomy",
        "Pathology, Pharmacology, and Surgical Techniques",
        "Clinical Neurology & Neuroradiology"
      ],
      importantSkills: [
        "Microsurgical Dexterity & Endurance",
        "Emergency Decision Making Under Pressure",
        "Patient Empathy and Medical Ethics"
      ],
      entranceExams: ["NEET UG", "NEET PG / INI-CET", "NEET SS"],
      careerPathways: [
        "Resident Surgeon -> Associate Neurosurgeon -> Chief of Neurosurgery"
      ],
      learningResources: [
        { title: "Gray's Anatomy Student References", type: "Textbook" },
        { title: "New England Journal of Medicine Case Studies", type: "Journals" }
      ],
      relatedCareerIds: ["bioinformatician"]
    },
    {
      id: "corporate-lawyer",
      title: "Corporate & Commercial Lawyer",
      category: "Law",
      industry: "Legal Services & Corporate Governance",
      educationLevel: "BA LLB / BBA LLB (5 Years) or LLB (3 Years)",
      overview: "Drafts commercial contracts, ensures regulatory compliance, handles intellectual property, and structures joint ventures for enterprises.",
      whatTheyDo: [
        "Draft and review merger agreements, licensing pacts, and shareholder terms.",
        "Advise boards on corporate governance and antitrust regulations.",
        "Represent corporations before regulatory tribunals and arbitration forums."
      ],
      requiredEducation: [
        "5-Year Integrated Law Degree (BA LLB / BBA LLB / B.Sc LLB) from a National Law University",
        "Enrollment in State Bar Council and All India Bar Examination (AIBE)"
      ],
      relevantCourses: [
        "Company Law & Competition Law",
        "Contracts & Commercial Transactions",
        "Intellectual Property Rights (IPR)"
      ],
      importantSkills: [
        "Contract Drafting & Critical Analysis",
        "Statutory Interpretation",
        "Strategic Negotiation"
      ],
      entranceExams: ["CLAT (Common Law Admission Test)", "AILET"],
      careerPathways: [
        "Associate -> Senior Associate -> Partner -> General Counsel"
      ],
      learningResources: [
        { title: "Bar Council of India Legal Education Guidelines", type: "Curriculum" },
        { title: "Harvard Law School Corporate Governance Forum", type: "Publication" }
      ],
      relatedCareerIds: ["civil-servant-ias", "investment-banker"]
    },
    {
      id: "civil-servant-ias",
      title: "Civil Services Officer (IAS / IPS / IFS)",
      category: "Government",
      industry: "Public Policy & National Administration",
      educationLevel: "Bachelor's Degree in any discipline",
      overview: "Formulates public welfare policies, oversees district administration, enforces rule of law, and implements socioeconomic development programs.",
      whatTheyDo: [
        "Administer revenue, law enforcement, disaster management, and public health at district level.",
        "Draft policy briefs for government ministries and monitor budget execution.",
        "Ensure transparency, civic services delivery, and community welfare."
      ],
      requiredEducation: [
        "Graduation (Bachelor's degree in any field recognized by UGC)",
        "Minimum age 21 years with nationality eligibility"
      ],
      relevantCourses: [
        "Indian Constitution, Polity, and Governance",
        "Modern Indian & World History",
        "Economic Development, Environment, and Ethics"
      ],
      importantSkills: [
        "Public Administration & Decisiveness",
        "Crisis Leadership & Communication",
        "Unbiased Ethical Judgment"
      ],
      entranceExams: ["UPSC Civil Services Examination (Prelims, Mains, Interview)"],
      careerPathways: [
        "Sub-Divisional Magistrate -> District Magistrate (Collector) -> Joint Secretary -> Cabinet Secretary"
      ],
      learningResources: [
        { title: "UPSC Official Syllabus & Question Papers Archive", type: "Official Archive" },
        { title: "NITI Aayog Strategy Reports & Economic Survey", type: "Government Reports" }
      ],
      relatedCareerIds: ["corporate-lawyer"]
    },
    {
      id: "data-scientist",
      title: "Data Scientist & Analytics Architect",
      category: "Technology",
      industry: "Big Data & Business Intelligence",
      educationLevel: "Bachelor's / Master's Degree in CS, Statistics, or Math",
      overview: "Extracts predictive signals, trends, and actionable insights from vast multi-terabyte datasets using statistical analysis and predictive modeling.",
      whatTheyDo: [
        "Build exploratory statistical models and time-series forecasting pipelines.",
        "Communicate findings via interactive dashboards to executives.",
        "Formulate A/B testing frameworks to validate product hypotheses."
      ],
      requiredEducation: [
        "Degree in Statistics, Mathematics, Data Science, or Computer Science"
      ],
      relevantCourses: [
        "Applied Probability and Inference",
        "Big Data Processing (Spark, SQL)",
        "Predictive Modeling and Experimentation"
      ],
      importantSkills: [
        "SQL, Python, R, Pandas",
        "Data Storytelling & Visualization",
        "Hypothesis Testing"
      ],
      entranceExams: ["JEE Main", "GATE (Data Science & AI)"],
      careerPathways: [
        "Data Analyst -> Senior Data Scientist -> Chief Data Officer"
      ],
      learningResources: [
        { title: "Kaggle Micro-courses and Open Competitions", type: "Interactive" }
      ],
      relatedCareerIds: ["software-engineer", "ai-ml-specialist", "investment-banker"]
    },
    {
      id: "aerospace-engineer",
      title: "Aerospace & Aeronautical Engineer",
      category: "Engineering",
      industry: "Aviation, Spaceflight & Defense Systems",
      educationLevel: "B.Tech / M.Tech in Aerospace / Mechanical Engineering",
      overview: "Designs, simulates, and manufactures flight vehicles, satellite launch systems, rocket engines, and aerodynamics profiles.",
      whatTheyDo: [
        "Model aerodynamic flow using Computational Fluid Dynamics (CFD).",
        "Design lightweight propulsion and structural airframes for satellites and aircraft.",
        "Conduct wind tunnel testing and flight telemetry validation."
      ],
      requiredEducation: [
        "B.Tech / B.E. in Aerospace, Aeronautical, or Mechanical Engineering from institutes like IITs, IIST, or MIT"
      ],
      relevantCourses: [
        "Aerodynamics & Gas Dynamics",
        "Flight Mechanics and Control Systems",
        "Rocket Propulsion and Orbital Mechanics"
      ],
      importantSkills: [
        "ANSYS, MATLAB, SolidWorks",
        "Thermodynamics & Structural Analysis",
        "Safety-Critical Systems Verification"
      ],
      entranceExams: ["JEE Main & Advanced", "GATE (Aerospace)"],
      careerPathways: [
        "Aerodynamics Engineer -> Propulsion Lead -> Chief Aerospace Architect"
      ],
      learningResources: [
        { title: "NASA Technical Reports & Aerodynamics Guide", type: "Public Archive" }
      ],
      relatedCareerIds: ["software-engineer"]
    },
    {
      id: "bioinformatician",
      title: "Bioinformatician & Computational Biologist",
      category: "Science",
      industry: "Genomics, Biotechnology & Molecular Medicine",
      educationLevel: "Bachelor's / Master's / Ph.D. in Bioinformatics or Biotech",
      overview: "Applies computer science, statistics, and algorithms to decode DNA sequencing, understand genetic diseases, and accelerate drug discovery.",
      whatTheyDo: [
        "Analyze Next-Generation Sequencing (NGS) datasets for clinical gene mutations.",
        "Model 3D protein structures and simulate ligand-binding pharmacology.",
        "Build computational pipelines for public biomedical databases (NCBI, UniProt)."
      ],
      requiredEducation: [
        "B.Tech / B.Sc in Bioinformatics, Biotechnology, or Molecular Biology"
      ],
      relevantCourses: [
        "Molecular Genetics & Biochemistry",
        "Statistical Genomics and Algorithms in Bioinformatics",
        "Python and R for Biological Data"
      ],
      importantSkills: [
        "BioPython, R (Bioconductor), Linux",
        "Sequence Alignment (BLAST, Bowtie)",
        "Structural Biology & PyMOL"
      ],
      entranceExams: ["JEE Main / NEET UG", "GATE (Biotechnology)"],
      careerPathways: [
        "Computational Biologist -> Principal Scientist -> Head of Drug Discovery"
      ],
      learningResources: [
        { title: "Rosalind: Platform for Learning Bioinformatics", type: "Interactive" }
      ],
      relatedCareerIds: ["neurosurgeon", "data-scientist"]
    },
    {
      id: "chartered-accountant",
      title: "Chartered Accountant (CA)",
      category: "Finance",
      industry: "Auditing, Taxation & Financial Governance",
      educationLevel: "ICAI Professional Qualification (Foundation, Inter, Articleship, Final)",
      overview: "Ensures statutory compliance, financial auditing, forensic accounting, direct and indirect taxation, and enterprise risk management.",
      whatTheyDo: [
        "Conduct statutory and internal audits for corporate enterprises.",
        "Formulate tax planning strategies and handle corporate filings.",
        "Advise companies on mergers, financial restructuring, and regulatory standards."
      ],
      requiredEducation: [
        "Graduation (Commerce/Any Stream) or 10+2 entry through ICAI CA Foundation",
        "Mandatory 2 to 3 years of practical articleship training under a practicing CA"
      ],
      relevantCourses: [
        "Accounting Standards and Ind AS",
        "Corporate and Economic Laws",
        "Direct Tax Laws & International Taxation",
        "Strategic Financial Management"
      ],
      importantSkills: [
        "Statutory Auditing & Internal Controls",
        "Tax Law Interpretation",
        "Forensic Accounting & Financial Analysis"
      ],
      entranceExams: ["ICAI CA Foundation", "CA Intermediate", "CA Final"],
      careerPathways: [
        "Audit Senior -> Audit Manager -> Partner at Accounting Firm / Corporate CFO"
      ],
      learningResources: [
        { title: "ICAI Official Study Modules and Bos Portal", type: "Official Curriculum" }
      ],
      relatedCareerIds: ["investment-banker", "corporate-lawyer"]
    },
    {
      id: "environmental-scientist",
      title: "Environmental Scientist & Sustainability Consultant",
      category: "Science",
      industry: "Environmental Conservation, Renewable Energy & Climate Policy",
      educationLevel: "B.Sc / M.Sc / B.Tech in Environmental Science or Engineering",
      overview: "Assesses environmental impacts, designs conservation strategies, monitors pollutant levels, and guides corporate ESG policies.",
      whatTheyDo: [
        "Perform Environmental Impact Assessments (EIA) for industrial projects.",
        "Model carbon emissions and design renewable energy transition strategies.",
        "Conduct soil, air, and water quality field sampling and laboratory testing."
      ],
      requiredEducation: [
        "B.Sc / B.Tech in Environmental Science, Ecology, or Earth Sciences"
      ],
      relevantCourses: [
        "Ecology & Biodiversity Conservation",
        "Environmental Chemistry & Toxicology",
        "GIS & Remote Sensing Applications"
      ],
      importantSkills: [
        "GIS (ArcGIS/QGIS), Remote Sensing",
        "Environmental Impact Assessment (EIA)",
        "Carbon Accounting & ESG Frameworks"
      ],
      entranceExams: ["CUET UG", "GATE (Environmental Science & Engineering)"],
      careerPathways: [
        "Environmental Officer -> ESG Consultant -> Sustainability Director"
      ],
      learningResources: [
        { title: "UN Environment Programme Publications", type: "Reports" }
      ],
      relatedCareerIds: ["civil-servant-ias"]
    }
  ],

  roadmaps: [
    {
      id: "roadmap-software",
      careerId: "software-engineer",
      title: "Software Engineering & Systems Roadmap",
      overview: "A structured 5-phase pathway from secondary school fundamentals to junior engineering roles and system architecture.",
      milestones: [
        {
          id: "sw-m1",
          phase: "Phase 1: Foundations (Class 11 - 12)",
          title: "Mathematical Foundations & First Programming Language",
          duration: "12-18 Months",
          keyActions: [
            "Master Class 11-12 Mathematics (Calculus, Probability, Matrices).",
            "Learn Python or modern JavaScript basics: variables, functions, and control flow.",
            "Write 5 small CLI scripts (e.g. calculator, to-do list, text parser)."
          ]
        },
        {
          id: "sw-m2",
          phase: "Phase 2: College & Competitive Entrance",
          title: "Undergraduate Degree & Data Structures",
          duration: "Year 1 - 2 of University",
          keyActions: [
            "Enroll in B.Tech / BCA or begin structured computer science curriculum.",
            "Master arrays, linked lists, hash tables, binary trees, and recursion.",
            "Solve 100+ standard problems on platforms like LeetCode or HackerRank."
          ]
        },
        {
          id: "sw-m3",
          phase: "Phase 3: Core Systems & Web Development",
          title: "Full-Stack Development, Git & Databases",
          duration: "Year 2 - 3",
          keyActions: [
            "Build complete web apps using TypeScript, modern React, and Node.js.",
            "Design relational databases with PostgreSQL and write optimized SQL queries.",
            "Maintain version control habits on GitHub with meaningful commit messages."
          ]
        },
        {
          id: "sw-m4",
          phase: "Phase 4: Real-World Engineering & Internships",
          title: "Production Projects & Software Internships",
          duration: "Year 3 - 4",
          keyActions: [
            "Deploy applications with cloud services (Docker, CI/CD pipelines).",
            "Contribute to open-source software repositories or build a personal capstone product.",
            "Apply for summer engineering internships and complete technical interviews."
          ]
        },
        {
          id: "sw-m5",
          phase: "Phase 5: Industry Placement",
          title: "Professional Entry & Architecture Specialization",
          duration: "Post Graduation",
          keyActions: [
            "Join an engineering organization as an Associate / Junior Software Engineer.",
            "Learn microservices, observability, caching (Redis), and system resiliency.",
            "Seek mentorship and build deep domain expertise."
          ]
        }
      ]
    },
    {
      id: "roadmap-product-design",
      careerId: "product-designer",
      title: "Product Design (UI/UX) Roadmap",
      overview: "Step-by-step craft journey from visual taste and wireframing to shipping complete user-centered digital products.",
      milestones: [
        {
          id: "pd-m1",
          phase: "Phase 1: Visual Literacy & Design Principles",
          title: "Typography, Hierarchy & Spacing",
          duration: "6 Months",
          keyActions: [
            "Learn the fundamentals of typography scales, 8pt spatial grid, and contrast ratios.",
            "Deconstruct 10 industry-leading applications (analyze why decisions were made).",
            "Master Figma keyboard shortcuts and vector tools."
          ]
        },
        {
          id: "pd-m2",
          phase: "Phase 2: User Research & Wireframing",
          title: "User Journeys, Personas & Wireframes",
          duration: "6-9 Months",
          keyActions: [
            "Learn how to conduct user discovery interviews without leading questions.",
            "Translate messy problem statements into clear low-fidelity wireframe flows.",
            "Test low-fidelity prototypes with real peers to spot usability gaps."
          ]
        },
        {
          id: "pd-m3",
          phase: "Phase 3: Design Systems & Component Design",
          title: "Interactive Prototyping & Design Systems",
          duration: "6-12 Months",
          keyActions: [
            "Build reusable Figma component sets with auto-layout and design tokens.",
            "Learn basic HTML/CSS mental models so designs are practical to build.",
            "Document edge cases: empty states, error banners, and loading skeletons."
          ]
        },
        {
          id: "pd-m4",
          phase: "Phase 4: Case Studies & Portfolio",
          title: "3 In-Depth Product Case Studies",
          duration: "4-6 Months",
          keyActions: [
            "Produce 3 detailed case studies focusing on problem framing, iterations, and metrics.",
            "Publish your personal design portfolio website.",
            "Participate in design critiques with senior designers."
          ]
        }
      ]
    },
    {
      id: "roadmap-medicine",
      careerId: "neurosurgeon",
      title: "Medical & Neurosurgical Pathway",
      overview: "Rigorous clinical pathway through MBBS, qualifying exams, surgical residency, and neurosurgical sub-specialization.",
      milestones: [
        {
          id: "med-m1",
          phase: "Phase 1: Pre-Medical School",
          title: "Class 12 Science (PCB) & NEET UG Preparation",
          duration: "2 Years",
          keyActions: [
            "Master Physics, Chemistry, and Biology (NCERT curriculum focus).",
            "Clear NEET UG with top percentile to secure admission to a government medical college."
          ]
        },
        {
          id: "med-m2",
          phase: "Phase 2: MBBS Degree",
          title: "Undergraduate Medical Training & Compulsory Rotatory Internship",
          duration: "5.5 Years",
          keyActions: [
            "Study Pre-clinical (Anatomy, Physiology), Para-clinical (Pathology, Pharma), and Clinical subjects.",
            "Complete 1-year rotatory hospital internship across emergency, surgery, and medicine wards.",
            "Clear qualifying post-graduate exam (NEET PG / INI-CET)."
          ]
        },
        {
          id: "med-m3",
          phase: "Phase 3: General Surgery Residency",
          title: "MS / DNB in General Surgery",
          duration: "3 Years",
          keyActions: [
            "Perform hands-on minor and assist in major surgical operations.",
            "Acquire deep knowledge of trauma care, wound management, and sterile techniques."
          ]
        },
        {
          id: "med-m4",
          phase: "Phase 4: Neurosurgery Super-Specialization",
          title: "M.Ch in Neurosurgery",
          duration: "3 Years",
          keyActions: [
            "Train in microsurgery, craniotomy, spinal cord decompression, and vascular clipping.",
            "Publish original research in peer-reviewed clinical neurosurgical journals."
          ]
        }
      ]
    },
    {
      id: "roadmap-law",
      careerId: "corporate-lawyer",
      title: "Corporate Law & Legal Practice Roadmap",
      overview: "Step-by-step pathway from CLAT entrance examination through 5-year law school, moot courts, and corporate law firm placement.",
      milestones: [
        {
          id: "law-m1",
          phase: "Phase 1: Entrance Preparation (Class 11 - 12)",
          title: "CLAT & Reading Comprehension Mastery",
          duration: "12-18 Months",
          keyActions: [
            "Build strong reading speed across editorials, legal reasoning, and current affairs.",
            "Practice analytical and logical reasoning problem sets.",
            "Clear CLAT to gain admission to a National Law University (NLU)."
          ]
        },
        {
          id: "law-m2",
          phase: "Phase 2: Early Law School (Years 1 - 2)",
          title: "Constitutional Foundations & Moot Courts",
          duration: "Years 1 - 2",
          keyActions: [
            "Study Constitutional Law, Contracts, Torts, and Family Law.",
            "Participate in foundational moot court competitions to hone oral advocacy.",
            "Undertake first summer internship with a litigation advocate or NGO."
          ]
        },
        {
          id: "law-m3",
          phase: "Phase 3: Corporate Specialization (Years 3 - 4)",
          title: "Corporate Law, Securities & Internships",
          duration: "Years 3 - 4",
          keyActions: [
            "Specialize in Company Law, Mergers & Acquisitions, and Securities Regulation.",
            "Complete corporate internships with leading law firms.",
            "Publish research papers on contemporary corporate governance topics."
          ]
        },
        {
          id: "law-m4",
          phase: "Phase 4: Bar Enrollment & Professional Entry",
          title: "AIBE Examination & Associate Placement",
          duration: "Year 5 & Post Grad",
          keyActions: [
            "Complete final semester and graduate with BA LLB (Hons).",
            "Enroll with the State Bar Council and clear the All India Bar Examination (AIBE).",
            "Begin practice as a corporate legal associate."
          ]
        }
      ]
    },
    {
      id: "roadmap-civil-services",
      careerId: "civil-servant-ias",
      title: "Civil Services (UPSC CSE) Pathway",
      overview: "Comprehensive roadmap through undergraduate studies, optional subject mastery, prelims, mains, and interview preparation.",
      milestones: [
        {
          id: "cs-m1",
          phase: "Phase 1: Degree & Foundational Reading",
          title: "Graduation & NCERT Fundamentals",
          duration: "18-24 Months",
          keyActions: [
            "Pursue graduation in any recognized discipline while building foundational general studies habits.",
            "Read Class 6-12 NCERTs in History, Geography, Polity, and Economics.",
            "Read a national newspaper daily for editorial analysis and governance insights."
          ]
        },
        {
          id: "cs-m2",
          phase: "Phase 2: Core Syllabus & Optional Selection",
          title: "Advanced General Studies & Optional Subject",
          duration: "12 Months",
          keyActions: [
            "Choose your UPSC Optional subject based on interest and scoring depth.",
            "Complete syllabus coverage for GS Papers I, II, III, and IV (Ethics).",
            "Begin daily answer writing practice (150 and 250 words format)."
          ]
        },
        {
          id: "cs-m3",
          phase: "Phase 3: Prelims & Mains Test Series",
          title: "Mock Tests & Rigorous Answer Writing",
          duration: "6-8 Months",
          keyActions: [
            "Solve 40+ full-length Prelims mock tests and analyze negative marking.",
            "Practice previous 10 years UPSC question papers for trend analysis.",
            "Appear for UPSC CSE Prelims."
          ]
        },
        {
          id: "cs-m4",
          phase: "Phase 4: Mains & Personality Test",
          title: "Mains Examination & Interview Board",
          duration: "4-6 Months",
          keyActions: [
            "Clear CSE Mains consisting of 9 written descriptive papers.",
            "Prepare Detailed Application Form (DAF) for the personality interview at Dholpur House.",
            "Undergo mock interviews for administrative posture and ethics evaluation."
          ]
        }
      ]
    }
  ],

  colleges: [
    {
      id: "iit-bombay",
      name: "Indian Institute of Technology Bombay (IITB)",
      location: "Mumbai, Maharashtra, India",
      institutionType: "Public Autonomous University (Institute of Eminence)",
      overview: "Consistently ranked among the top technical institutes in India, renowned for world-class computer science, aerospace, and electrical engineering research.",
      courses: ["B.Tech Computer Science", "B.Tech Electrical", "B.Des Industrial Design", "M.Tech", "Ph.D."],
      eligibility: "10+2 with Physics, Chemistry, and Mathematics (top 20 percentile or 75%+ aggregate in Board).",
      entranceExams: ["JEE Main -> JEE Advanced", "UCEED (for B.Des)"],
      officialWebsite: "https://www.iitb.ac.in",
      admissionInfo: "Admissions strictly managed through Joint Seat Allocation Authority (JoSAA) based on All India Rank in JEE Advanced."
    },
    {
      id: "aiims-delhi",
      name: "All India Institute of Medical Sciences (AIIMS New Delhi)",
      location: "New Delhi, India",
      institutionType: "Autonomous Public Medical Institute",
      overview: "The premier medical research and healthcare institution of India, offering unmatched clinical exposure and subsidised high-quality medical education.",
      courses: ["MBBS", "B.Sc Nursing", "MD / MS", "M.Ch / DM"],
      eligibility: "10+2 with Physics, Chemistry, Biology, and English with minimum 60% aggregate.",
      entranceExams: ["NEET UG (for MBBS)", "INI-CET (for MD/MS)"],
      officialWebsite: "https://www.aiims.edu",
      admissionInfo: "Admission through Medical Counselling Committee (MCC) based on NEET UG All India Rank."
    },
    {
      id: "nid-ahmedabad",
      name: "National Institute of Design (NID)",
      location: "Ahmedabad, Gujarat, India",
      institutionType: "Autonomous Institution of National Importance",
      overview: "Pioneering design institution in India offering world-renowned programs in industrial design, communication design, textile, and IT integrated design.",
      courses: ["B.Des Product Design", "B.Des Graphic Design", "B.Des Animation", "M.Des"],
      eligibility: "10+2 in any stream (Science, Commerce, Arts) from a recognized board.",
      entranceExams: ["NID DAT (Design Aptitude Test - Prelims and Mains)"],
      officialWebsite: "https://www.nid.edu",
      admissionInfo: "Two-stage admission test: DAT Prelims followed by DAT Mains studio test and personal interviews."
    },
    {
      id: "nlsiu-bangalore",
      name: "National Law School of India University (NLSIU)",
      location: "Bengaluru, Karnataka, India",
      institutionType: "Public National Law University",
      overview: "The gold standard of legal education in South Asia, pioneering 5-year integrated law degrees with top corporate and judicial placement records.",
      courses: ["BA LLB (Hons)", "LLM", "Ph.D. in Law"],
      eligibility: "10+2 with minimum 45% marks for General category (40% for SC/ST).",
      entranceExams: ["CLAT (Common Law Admission Test)"],
      officialWebsite: "https://www.nls.ac.in",
      admissionInfo: "Centralized counselling through the Consortium of National Law Universities based on CLAT merit."
    },
    {
      id: "iisc-bangalore",
      name: "Indian Institute of Science (IISc)",
      location: "Bengaluru, Karnataka, India",
      institutionType: "Public Research University (Institute of Eminence)",
      overview: "India's highest-ranked research university dedicated to scientific discovery, advanced materials, computing, and biotechnology.",
      courses: ["Bachelor of Science (Research)", "B.Tech Mathematics and Computing", "M.Sc", "Ph.D."],
      eligibility: "10+2 with Physics, Chemistry, and Mathematics (first class or 60%+ aggregate).",
      entranceExams: ["JEE Main", "JEE Advanced", "NEET UG", "GATE"],
      officialWebsite: "https://iisc.ac.in",
      admissionInfo: "Merit-based admissions evaluating ranks in JEE Advanced, JEE Main, or NEET UG."
    },
    {
      id: "iit-delhi",
      name: "Indian Institute of Technology Delhi (IITD)",
      location: "New Delhi, India",
      institutionType: "Public Autonomous University (Institute of Eminence)",
      overview: "Leading engineering and technology university with state-of-the-art research centers in artificial intelligence, robotics, and energy.",
      courses: ["B.Tech Computer Science", "B.Tech Mathematics & Computing", "B.Tech Mechanical", "M.Tech"],
      eligibility: "10+2 with Physics, Chemistry, and Mathematics.",
      entranceExams: ["JEE Main -> JEE Advanced"],
      officialWebsite: "https://home.iitd.ac.in",
      admissionInfo: "Admission through JoSAA counselling based on JEE Advanced rank."
    },
    {
      id: "bits-pilani",
      name: "Birla Institute of Technology and Science (BITS Pilani)",
      location: "Pilani, Rajasthan, India",
      institutionType: "Private Deemed University (Institute of Eminence)",
      overview: "Renowned institution with zero attendance policy, strong alumni entrepreneurship culture, and dual degree program options.",
      courses: ["B.E. Computer Science", "B.E. Electrical", "M.Sc Dual Degree", "B.Pharm"],
      eligibility: "10+2 with minimum 75% aggregate in Physics, Chemistry, and Math with at least 60% in each subject.",
      entranceExams: ["BITSAT"],
      officialWebsite: "https://www.bits-pilani.ac.in",
      admissionInfo: "Merit based on BITSAT computer-based entrance examination."
    },
    {
      id: "iim-ahmedabad",
      name: "Indian Institute of Management Ahmedabad (IIMA)",
      location: "Ahmedabad, Gujarat, India",
      institutionType: "Autonomous Public Business School",
      overview: "The top-ranked management institute in India, world-famous for its rigorous case-study pedagogy and executive leadership.",
      courses: ["Post Graduate Programme in Management (MBA)", "PGP-FABM", "ePGP", "Ph.D."],
      eligibility: "Bachelor's degree in any discipline with at least 50% marks or equivalent CGPA.",
      entranceExams: ["CAT (Common Admission Test)", "GMAT"],
      officialWebsite: "https://www.iima.ac.in",
      admissionInfo: "Two-stage selection: CAT percentile shortlisting followed by Analytical Writing Test (AWT) and Personal Interview."
    },
    {
      id: "st-stephens",
      name: "St. Stephen's College, University of Delhi",
      location: "New Delhi, India",
      institutionType: "Constituent College of Delhi University",
      overview: "One of India's oldest and most prestigious liberal arts and sciences colleges, known for humanities, economics, and mathematics.",
      courses: ["BA (Hons) Economics", "BA (Hons) History", "B.Sc (Hons) Physics", "B.Sc (Hons) Mathematics"],
      eligibility: "10+2 from a recognized board with required domain subjects.",
      entranceExams: ["CUET UG (Common University Entrance Test)"],
      officialWebsite: "https://www.ststephens.edu",
      admissionInfo: "Admissions through Common Seat Allocation System (CSAS) based on CUET UG percentile."
    },
    {
      id: "cmc-vellore",
      name: "Christian Medical College (CMC)",
      location: "Vellore, Tamil Nadu, India",
      institutionType: "Private Medical College & Teaching Hospital",
      overview: "Globally respected medical institution celebrated for excellence in clinical teaching, ethical medicine, and subsidised rural health care.",
      courses: ["MBBS", "B.Sc Nursing", "Allied Health Sciences", "MD / MS"],
      eligibility: "10+2 with Physics, Chemistry, Biology, and English with qualifying aggregate.",
      entranceExams: ["NEET UG"],
      officialWebsite: "https://www.cmch-vellore.edu",
      admissionInfo: "Admission through state counselling based on NEET UG All India Rank."
    }
  ],

  entranceExams: [
    {
      id: "jee-advanced",
      name: "JEE Advanced (Joint Entrance Examination)",
      governingBody: "Joint Admission Board (JAB) / IITs",
      targetPrograms: "B.Tech, B.S., and Dual Degree programs at 23 Indian Institutes of Technology (IITs)",
      eligibility: "Top 2,50,000 rankers in JEE Main; 10+2 with Physics, Chemistry, and Mathematics with 75% aggregate or top 20 percentile in Board.",
      examPattern: "Two mandatory papers of 3 hours each (Computer Based Test), testing Physics, Chemistry, and Mathematics with multiple choice and numerical value questions.",
      syllabus: "Advanced mechanics, electromagnetism, modern physics, physical/organic/inorganic chemistry, calculus, coordinate geometry, vectors.",
      datesNote: "Annually in May/June. Always verify official schedule for current session.",
      officialUrl: "https://jeeadv.ac.in"
    },
    {
      id: "jee-main",
      name: "JEE Main (Joint Entrance Examination Main)",
      governingBody: "National Testing Agency (NTA)",
      targetPrograms: "B.Tech / B.E. at 31 NITs, 25 IIITs, 28 CFTIs, and qualifying cutoff for JEE Advanced",
      eligibility: "Passed Class 12 or equivalent in Physics, Chemistry, and Mathematics.",
      examPattern: "Computer Based Test of 3 hours with 90 questions (75 to be attempted). Physics, Chemistry, and Mathematics.",
      syllabus: "Class 11 and 12 CBSE/NCERT curriculum for Physics, Chemistry, and Mathematics.",
      datesNote: "Conducted in two sessions annually (Session 1 in Jan/Feb, Session 2 in April).",
      officialUrl: "https://jeemain.nta.nic.in"
    },
    {
      id: "neet-ug",
      name: "NEET UG (National Eligibility cum Entrance Test)",
      governingBody: "National Testing Agency (NTA)",
      targetPrograms: "MBBS, BDS, BAMS, BHMS across all government and private medical colleges in India",
      eligibility: "10+2 with Physics, Chemistry, Biology/Biotechnology; minimum age 17 years.",
      examPattern: "Pen and paper (OMR) test with 200 questions (180 to be attempted) spanning Physics, Chemistry, Botany, and Zoology. 720 total marks.",
      syllabus: "Class 11 and 12 NCERT curriculum for Physics, Chemistry, and Biology.",
      datesNote: "Annually in May. Check official NTA releases for exam notifications.",
      officialUrl: "https://neet.nta.nic.in"
    },
    {
      id: "clat",
      name: "CLAT (Common Law Admission Test)",
      governingBody: "Consortium of National Law Universities",
      targetPrograms: "5-Year Integrated Law (BA LLB, BBA LLB, B.Sc LLB) across 24 NLUs",
      eligibility: "10+2 or equivalent with minimum 45% aggregate (40% for reserved categories).",
      examPattern: "Offline 2-hour exam with 120 comprehension-based questions covering English, Current Affairs & GK, Legal Reasoning, Logical Reasoning, and Quantitative Techniques.",
      syllabus: "Reading comprehension, critical reasoning, Indian legal principles, current events.",
      datesNote: "Typically held in December for the following academic year.",
      officialUrl: "https://consortiumofnlus.ac.in"
    },
    {
      id: "cat",
      name: "CAT (Common Admission Test)",
      governingBody: "Conducted by IIMs on rotation",
      targetPrograms: "MBA / PGP programs across 21 IIMs, FMS Delhi, IIT DoMS, and top business schools",
      eligibility: "Bachelor's degree in any discipline with at least 50% marks (45% for SC/ST).",
      examPattern: "Computer Based Test of 2 hours with 66 questions divided into 3 timed sections: VARC, DILR, and QA (40 minutes each).",
      syllabus: "Verbal Ability & Reading Comprehension, Data Interpretation, Logical Reasoning, Quantitative Aptitude.",
      datesNote: "Annually on the last Sunday of November.",
      officialUrl: "https://iimcat.ac.in"
    },
    {
      id: "uceed",
      name: "UCEED (Undergraduate Common Entrance Exam for Design)",
      governingBody: "IIT Bombay",
      targetPrograms: "Bachelor of Design (B.Des) at IIT Bombay, IIT Delhi, IIT Guwahati, IIT Hyderabad, and IIITDM Jabalpur",
      eligibility: "Passed Class 12 or equivalent in any stream (Science, Commerce, Arts).",
      examPattern: "Part A (Computer-based testing visualization, analytical thinking, design aptitude) + Part B (Hands-on drawing and sketching examination).",
      syllabus: "Visualization, spatial ability, observation, environmental sensitivity, analytical reasoning.",
      datesNote: "Annually in January.",
      officialUrl: "https://www.uceed.iitb.ac.in"
    },
    {
      id: "cuet-ug",
      name: "CUET UG (Common University Entrance Test)",
      governingBody: "National Testing Agency (NTA)",
      targetPrograms: "Undergraduate programs across 45+ Central Universities (Delhi University, BHU, JNU, etc.)",
      eligibility: "Class 12 passed or appearing from any recognized educational board.",
      examPattern: "Computer Based Test with Section 1 (Languages), Section 2 (Domain-specific subjects), and Section 3 (General Test).",
      syllabus: "Class 12 NCERT syllabus for respective domain subjects selected by the candidate.",
      datesNote: "Annually in May/June.",
      officialUrl: "https://cuetug.nta.nic.in"
    },
    {
      id: "gate",
      name: "GATE (Graduate Aptitude Test in Engineering)",
      governingBody: "IISc and 7 IITs on rotation",
      targetPrograms: "M.Tech / Ph.D. admissions at IITs/NITs and PSU recruitment (IOCL, ONGC, NTPC, etc.)",
      eligibility: "Candidates in 3rd year or higher of undergraduate degree in engineering, technology, science, or commerce.",
      examPattern: "3-hour Computer Based Test with 65 questions testing General Aptitude, Engineering Mathematics, and core technical discipline.",
      syllabus: "Core engineering discipline subjects and analytical problem solving.",
      datesNote: "Annually in February.",
      officialUrl: "https://gate2026.iit.ac.in"
    },
    {
      id: "nda-na",
      name: "NDA & NA Examination",
      governingBody: "Union Public Service Commission (UPSC)",
      targetPrograms: "National Defence Academy (Army, Navy, Air Force) and Indian Naval Academy",
      eligibility: "Unmarried male and female candidates aged 16.5 to 19.5 years; Class 12 passed (Physics & Math for Navy/Air Force).",
      examPattern: "Written test with Mathematics (300 marks) and General Ability Test (600 marks), followed by 5-day SSB interview.",
      syllabus: "Algebra, calculus, trigonometry, general knowledge, English, physics, history, and current events.",
      datesNote: "Conducted twice annually (NDA-I in April, NDA-II in September).",
      officialUrl: "https://upsc.gov.in"
    },
    {
      id: "upsc-cse",
      name: "UPSC Civil Services Examination",
      governingBody: "Union Public Service Commission",
      targetPrograms: "Indian Administrative Service (IAS), Indian Police Service (IPS), Indian Foreign Service (IFS)",
      eligibility: "Graduate in any field from a recognized university; age 21 to 32 (relaxations apply).",
      examPattern: "Stage 1: Preliminary (2 Objective Papers) -> Stage 2: Main Examination (9 Descriptive Papers) -> Stage 3: Personality Test / Interview.",
      syllabus: "History, polity, geography, economics, international relations, ethics, and one chosen optional subject.",
      datesNote: "Prelims annually in May/June, Mains in September.",
      officialUrl: "https://upsc.gov.in"
    }
  ],

  skills: [
    {
      id: "sk-programming",
      title: "Algorithmic Thinking & Programming",
      category: "Technical",
      level: "Beginner to Advanced",
      description: "Understand code fundamentals, data manipulation, recursion, computational logic, and modular abstractions.",
      recommendedFor: ["Software Engineer", "AI/ML Specialist", "Data Scientist"]
    },
    {
      id: "sk-problem-solving",
      title: "First-Principles Problem Solving",
      category: "Critical Thinking",
      level: "All Levels",
      description: "Break complex, messy problems down into fundamental physical and mathematical truths and reason up from there.",
      recommendedFor: ["All Careers", "Civil Services", "Engineering"]
    },
    {
      id: "sk-communication",
      title: "Technical & Executive Communication",
      category: "Communication",
      level: "Essential",
      description: "Express intricate concepts clearly in writing, presentations, and collaborative technical debates without jargon.",
      recommendedFor: ["Product Designer", "Corporate Lawyer", "Engineering"]
    },
    {
      id: "sk-financial-modeling",
      title: "Quantitative Financial Analysis",
      category: "Finance",
      level: "Intermediate",
      description: "Build three-statement models, discount cash flows (DCF), analyze balance sheets, and value assets rigorously.",
      recommendedFor: ["Investment Banker", "Corporate Lawyer", "Data Scientist"]
    },
    {
      id: "sk-prototyping",
      title: "UI Design & Interactive Prototyping",
      category: "Design",
      level: "Beginner to Intermediate",
      description: "Create interactive wireframes, master typography and responsive layouts using Figma and design token systems.",
      recommendedFor: ["Product Designer", "Frontend Developer"]
    },
    {
      id: "sk-data-analysis",
      title: "Data Visualization & SQL Querying",
      category: "Technical",
      level: "Beginner to Intermediate",
      description: "Extract insights from relational databases with SQL, manipulate DataFrames in Python, and build clear analytical charts.",
      recommendedFor: ["Data Scientist", "Investment Banker", "Civil Services"]
    },
    {
      id: "sk-legal-reasoning",
      title: "Statutory Interpretation & Legal Drafting",
      category: "Critical Thinking",
      level: "Intermediate",
      description: "Analyze legislation, identify precedents, evaluate contractual risk, and draft concise commercial agreements.",
      recommendedFor: ["Corporate Lawyer", "Civil Services"]
    },
    {
      id: "sk-public-administration",
      title: "Policy Analysis & Governance Ethics",
      category: "Leadership",
      level: "Advanced",
      description: "Evaluate public policies, budgetary allocations, civic welfare impacts, and administrative ethical frameworks.",
      recommendedFor: ["Civil Services", "Environmental Scientist"]
    }
  ],

  scholarships: [
    {
      id: "inspire-dst",
      name: "INSPIRE Scholarship for Higher Education (SHE)",
      provider: "Department of Science & Technology (DST), Govt. of India",
      educationLevel: "Undergraduate (B.Sc / B.S. / Integrated M.Sc)",
      amount: "₹80,000 per annum (₹60,000 scholarship + ₹20,000 summer mentorship project)",
      eligibility: "Top 1% rank in Class 12 board examinations or JEE/NEET rank within top 10,000 who enroll in natural & basic sciences.",
      officialUrl: "https://online-inspire.gov.in",
      applicationPeriod: "Typically October - December annually"
    },
    {
      id: "reliance-foundation",
      name: "Reliance Foundation Undergraduate Scholarship",
      provider: "Reliance Foundation",
      educationLevel: "Undergraduate (All degree programs)",
      amount: "Up to ₹2,00,000 over the course of study",
      eligibility: "First-year undergraduate students with minimum 60% in Class 12 and household income criteria.",
      officialUrl: "https://scholarships.reliancefoundation.org",
      applicationPeriod: "August - October annually"
    },
    {
      id: "aditya-birla",
      name: "Aditya Birla Scholarship",
      provider: "Aditya Birla Group",
      educationLevel: "Undergraduate (IITs, BITS) & Postgraduate (IIMs, XLRI, Law NLUs)",
      amount: "Covers academic fees + hostel and living stipend",
      eligibility: "Top 20 rank holders admitted to selected premier institutions (IITs, IIMs, NLUs).",
      officialUrl: "https://www.adityabirlascholars.net",
      applicationPeriod: "Upon admission at partner campuses"
    },
    {
      id: "central-sector-nsp",
      name: "Central Sector Scheme of Scholarships for College and University Students",
      provider: "Department of Higher Education, Ministry of Education, Govt. of India",
      educationLevel: "Undergraduate & Postgraduate",
      amount: "₹12,000 per annum for undergraduate; ₹20,000 per annum for postgraduate",
      eligibility: "Students above 80th percentile in Class 12 board exams pursuing regular degree courses with family income below ₹4.5 Lakh.",
      officialUrl: "https://scholarships.gov.in",
      applicationPeriod: "July - November annually on National Scholarship Portal (NSP)"
    },
    {
      id: "pmsss-jk",
      name: "Prime Minister's Special Scholarship Scheme (PMSSS)",
      provider: "AICTE / Ministry of Education",
      educationLevel: "Undergraduate (Engineering, Nursing, General Degrees)",
      amount: "Full tuition fee waiver + ₹1,00,000 annual maintenance allowance",
      eligibility: "Domicile students of Jammu & Kashmir and Ladakh who passed 10+2 from state boards or CBSE in the region.",
      officialUrl: "https://www.aicte-india.org/bureaus/jk",
      applicationPeriod: "May - July annually"
    },
    {
      id: "tata-scholarship",
      name: "Tata Trusts Medical and Healthcare Scholarships",
      provider: "Tata Trusts",
      educationLevel: "Undergraduate & Postgraduate (MBBS, BDS, Nursing)",
      amount: "Covers 30% to 80% of annual tuition fees based on merit and financial need",
      eligibility: "Students admitted to recognized medical colleges in India with minimum 60% aggregate in qualifying examinations.",
      officialUrl: "https://www.tatatrusts.org",
      applicationPeriod: "September - November annually"
    }
  ],

  aptitudeQuestions: [
    {
      id: 1,
      text: "When you encounter a broken device, app, or system, what is your instinctive reaction?",
      options: [
        { label: "Take it apart to understand the underlying logic and code.", trait: "analytical", weight: 2 },
        { label: "Redesign the interface so it is simpler and more pleasant to use.", trait: "creative", weight: 2 },
        { label: "Formulate a systematic hypothesis and test each variable.", trait: "scientific", weight: 2 },
        { label: "Help the person struggling to use it and explain how it works.", trait: "social", weight: 2 },
        { label: "Analyze the cost, warranty, and efficiency of replacing it.", trait: "systematic", weight: 2 }
      ]
    },
    {
      id: 2,
      text: "Which type of activity makes time fly by the fastest for you?",
      options: [
        { label: "Writing code, solving algorithmic puzzles, or building automation scripts.", trait: "analytical", weight: 2 },
        { label: "Sketching, visual layout, photography, or video production.", trait: "creative", weight: 2 },
        { label: "Reading scientific research, human biology, or cosmic astrophysics.", trait: "scientific", weight: 2 },
        { label: "Leading a club, debating policies, or organizing community initiatives.", trait: "social", weight: 2 },
        { label: "Tracking investments, analyzing market trends, and spreadsheets.", trait: "systematic", weight: 2 }
      ]
    },
    {
      id: 3,
      text: "If you had a free weekend to complete any self-directed project, what would you pick?",
      options: [
        { label: "Build a web app or automate a repetitive task.", trait: "analytical", weight: 2 },
        { label: "Create a design system or brand portfolio.", trait: "creative", weight: 2 },
        { label: "Conduct a biology or chemistry experiment and record results.", trait: "scientific", weight: 2 },
        { label: "Draft a policy proposal or prepare a legal argument.", trait: "social", weight: 2 },
        { label: "Simulate a stock portfolio and backtest strategies.", trait: "systematic", weight: 2 }
      ]
    },
    {
      id: 4,
      text: "In group work, what role do people naturally look to you for?",
      options: [
        { label: "The technical architect who builds the difficult working components.", trait: "analytical", weight: 2 },
        { label: "The visual storyteller who creates the pitch deck and user flow.", trait: "creative", weight: 2 },
        { label: "The fact-checker who verifies evidence and methodological rigor.", trait: "scientific", weight: 2 },
        { label: "The spokesperson who negotiates, coordinates, and speaks publicly.", trait: "social", weight: 2 },
        { label: "The project planner who tracks budgets, timelines, and deliverables.", trait: "systematic", weight: 2 }
      ]
    },
    {
      id: 5,
      text: "What kind of real-world impact excites you most?",
      options: [
        { label: "Creating software used by millions across the globe daily.", trait: "analytical", weight: 2 },
        { label: "Crafting beautiful artifacts and unforgettable digital experiences.", trait: "creative", weight: 2 },
        { label: "Discovering medical cures or advancing fundamental science.", trait: "scientific", weight: 2 },
        { label: "Protecting human rights and enacting fair public governance.", trait: "social", weight: 2 },
        { label: "Directing capital to fund world-changing enterprises.", trait: "systematic", weight: 2 }
      ]
    }
  ]
};

// Export to window global
window.UNLOST_DATA = UNLOST_DATA_STORE;

// Safe accessor functions
window.UNLOST_DATA.getCareers = () => window.UNLOST_DATA.careers || [];
window.UNLOST_DATA.getRoadmaps = () => window.UNLOST_DATA.roadmaps || [];
window.UNLOST_DATA.getColleges = () => window.UNLOST_DATA.colleges || [];
window.UNLOST_DATA.getExams = () => window.UNLOST_DATA.entranceExams || [];
window.UNLOST_DATA.getSkills = () => window.UNLOST_DATA.skills || [];
window.UNLOST_DATA.getScholarships = () => window.UNLOST_DATA.scholarships || [];

// Dispatch event so any delayed listeners immediately know data is ready
if (typeof document !== 'undefined') {
  document.dispatchEvent(new CustomEvent('unlost:data-ready', { detail: window.UNLOST_DATA }));
}
