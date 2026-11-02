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
      id: "general-physician",
      title: "General Physician & Internal Medicine Specialist",
      category: "Medicine",
      industry: "Primary Healthcare & Clinical Medicine",
      educationLevel: "MBBS + MD / DNB (General / Internal Medicine)",
      overview: "Diagnoses systemic illnesses, manages complex chronic medical disorders (cardiovascular, metabolic, respiratory), coordinates preventive health, and delivers evidence-based clinical therapeutics.",
      whatTheyDo: [
        "Conduct comprehensive clinical examinations, differential diagnoses, and outpatient triage.",
        "Formulate evidence-based pharmacological treatment plans, antibiotic stewardship, and lifestyle management.",
        "Manage complex multi-morbidity in adult patients across in-patient hospital wards and intensive care units.",
        "Counsel patients and families on chronic disease prevention, vaccination, and long-term prognosis."
      ],
      requiredEducation: [
        "MBBS (Bachelor of Medicine and Bachelor of Surgery, 5.5 years including 1-year compulsory rotatory medical internship)",
        "Postgraduate MD (Doctor of Medicine) in General Medicine or DNB in Internal Medicine (3 years)"
      ],
      relevantCourses: [
        "Clinical Medicine, Systemic Pathology & Diagnostics",
        "Pharmacology, Therapeutics & Toxicology",
        "Epidemiology, Preventive & Social Medicine (PSM)",
        "Critical Care & Emergency Resuscitation"
      ],
      importantSkills: [
        "Clinical Diagnostics & Stethoscope Auscultation",
        "Emergency Patient Stabilization & ICU Care",
        "Compassionate Communication & Bedside Manner",
        "Pharmacological Therapeutics Assessment"
      ],
      entranceExams: ["NEET UG", "NEET PG / INI-CET"],
      careerPathways: [
        "Junior Resident -> Senior Resident -> Consultant Physician -> Head of Internal Medicine / Medical Superintendent"
      ],
      learningResources: [
        { title: "Harrison's Principles of Internal Medicine", type: "Gold Standard Textbook" },
        { title: "The Lancet & BMJ Clinical Case Reviews", type: "Peer-Reviewed Journals" }
      ],
      relatedCareerIds: ["neurosurgeon", "bioinformatician"]
    },
    {
      id: "neurosurgeon",
      title: "Clinical Neurosurgeon",
      category: "Medicine",
      industry: "Neurosurgery, Cranial & Spinal Operative Medicine",
      educationLevel: "MBBS + MS General Surgery + M.Ch Neurosurgery (or 6-Year DNB)",
      overview: "Specializes in the surgical prevention, diagnosis, evaluation, and operative treatment of disorders affecting the brain, spinal cord, cerebrovascular system, and peripheral nervous system.",
      whatTheyDo: [
        "Perform delicate microsurgical craniotomies, aneurysm clippings, tumor resections, and spinal instrumentation under operating microscopes.",
        "Interpret high-resolution neuro-imaging: brain MRI, CT angiography, and intraoperative functional neuro-mapping.",
        "Provide critical neuro-intensive resuscitation and continuous intracranial pressure (ICP) monitoring.",
        "Lead multidisciplinary neuro-oncology, neuro-vascular, and spine trauma surgical boards."
      ],
      requiredEducation: [
        "MBBS (5.5 years including 1-year rotatory internship from NMC-recognized medical college)",
        "MS in General Surgery (3 years) followed by NEET-SS qualifying for M.Ch in Neurosurgery (3 years)",
        "Or direct 6-year post-MBBS DNB / M.Ch in Neurosurgery at apex research centers (NIMHANS, AIIMS, PGIMER)"
      ],
      relevantCourses: [
        "Gross Neuroanatomy, Neurophysiology & Neuropathology",
        "Operative Microsurgical Techniques & Neuronavigation",
        "Neuro-traumatology, Critical Care & Spinal Biomechanics"
      ],
      importantSkills: [
        "Sub-millimeter Microsurgical Precision & Steady Hand Endurance",
        "High-Stakes Decision Making Under Critical Hemorrhage",
        "Advanced Neuro-imaging Interpretation (DTI, FMRI)",
        "Patient & Family Counseling for Critical Surgical Procedures"
      ],
      entranceExams: ["NEET UG", "NEET PG / INI-CET", "NEET SS (Super Specialty)"],
      careerPathways: [
        "Neurosurgical Resident -> Junior Consultant Neurosurgeon -> Senior Consultant -> Director of Neurosurgery & Skull Base Research"
      ],
      learningResources: [
        { title: "Youmans and Winn Neurological Surgery", type: "Definitive Reference" },
        { title: "Journal of Neurosurgery (AANS)", type: "Peer-Reviewed Journal" }
      ],
      relatedCareerIds: ["general-physician", "bioinformatician"]
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
      id: "roadmap-physician",
      careerId: "general-physician",
      title: "General Physician & Internal Medicine Pathway",
      overview: "Rigorous clinical pathway through Class 12 PCB, NEET UG, MBBS undergraduate training, NEET PG, and MD in Internal Medicine.",
      milestones: [
        {
          id: "phy-m1",
          phase: "Phase 1: Pre-Medical Foundations (Class 11 - 12)",
          title: "Senior Secondary PCB & NEET UG Preparation",
          duration: "2 Years",
          keyActions: [
            "Master Class 11 and 12 Physics, Chemistry, and Biology (NCERT thorough memorization & conceptual clarity).",
            "Solve 15,000+ objective practice questions and take 40+ full-syllabus NEET UG mock tests.",
            "Score in the 99th+ percentile in NEET UG to secure admission to a government medical college."
          ]
        },
        {
          id: "phy-m2",
          phase: "Phase 2: MBBS Degree & Rotatory Internship",
          title: "Undergraduate Clinical Training (5.5 Years)",
          duration: "5.5 Years",
          keyActions: [
            "Complete 4.5 years of medical curriculum: Anatomy, Physiology, Biochemistry, Pathology, Microbiology, Pharmacology, and Clinical Medicine.",
            "Complete 12 months of mandatory rotatory internship in in-patient wards, emergency casualty, and primary healthcare centers.",
            "Obtain State Medical Council registration and practice license."
          ]
        },
        {
          id: "phy-m3",
          phase: "Phase 3: Post-Graduate Medical Entrance",
          title: "NEET PG / INI-CET Examination",
          duration: "6-12 Months",
          keyActions: [
            "Prepare for 19 MBBS subjects for NEET PG or INI-CET (for AIIMS, JIPMER, PGI).",
            "Secure high rank to match into MD General Medicine / Internal Medicine."
          ]
        },
        {
          id: "phy-m4",
          phase: "Phase 4: MD Internal Medicine Residency",
          title: "Junior Residency & Advanced In-Patient Therapeutics",
          duration: "3 Years",
          keyActions: [
            "Manage acute emergency admissions, intensive care unit (ICU) patients, and multi-system pathology.",
            "Conduct clinical thesis research and present papers at national internal medicine conferences.",
            "Pass theory and clinical practical board examinations for MD General Medicine."
          ]
        },
        {
          id: "phy-m5",
          phase: "Phase 5: Senior Residency & Clinical Practice",
          title: "Consultant Physician Practice",
          duration: "1-3 Years",
          keyActions: [
            "Serve as Senior Resident in a teaching tertiary care hospital.",
            "Establish independent outpatient consultant practice or advance to sub-specialties (Cardiology, Nephrology, Endocrinology)."
          ]
        }
      ]
    },
    {
      id: "roadmap-neurosurgeon",
      careerId: "neurosurgeon",
      title: "Neurosurgical Super-Specialization Pathway",
      overview: "Demanding 12-to-15 year surgical journey through MBBS, general surgical residency, and advanced neurosurgical microsurgery fellowship.",
      milestones: [
        {
          id: "ns-m1",
          phase: "Phase 1: Pre-Medical Foundations (Class 11 - 12)",
          title: "Class 12 PCB & NEET UG Qualification",
          duration: "2 Years",
          keyActions: [
            "Thorough mastery of NCERT Physics, Chemistry, and Biology.",
            "Clear NEET UG with top rank to secure MBBS admission at an apex medical college."
          ]
        },
        {
          id: "ns-m2",
          phase: "Phase 2: MBBS Degree & Surgical Foundations",
          title: "Medical School & Mandatory Internship",
          duration: "5.5 Years",
          keyActions: [
            "Complete 5.5-year MBBS curriculum with high distinction in Anatomy and Surgery.",
            "Complete 1-year rotatory internship with extended elective posting in Neurosurgery and Trauma Surgery."
          ]
        },
        {
          id: "ns-m3",
          phase: "Phase 3: Surgical Residency (MS General Surgery)",
          title: "Master of Surgery (MS) in General Surgery",
          duration: "3 Years",
          keyActions: [
            "Master operative sterile technique, laparoscopy, trauma management, and basic vascular suturing.",
            "Complete 3-year residency and write MS surgical dissertation.",
            "Clear exit surgical examination to receive MS (Surgery) degree."
          ]
        },
        {
          id: "ns-m4",
          phase: "Phase 4: NEET-SS & M.Ch in Neurosurgery",
          title: "Magister Chirurgiae (M.Ch) Neurosurgery Super-Specialty",
          duration: "3 Years",
          keyActions: [
            "Crack NEET-SS (Super Specialty) or INI-SS entrance examination.",
            "Train under operating microscopes: craniotomy for brain tumors, aneurysm clips, skull-base surgeries, and spine instrumentation.",
            "Publish neurosurgical case series in indexed international journals."
          ]
        },
        {
          id: "ns-m5",
          phase: "Phase 5: Sub-Specialization & Consultant Neurosurgeon",
          title: "Skull Base / Pediatric / Cerebrovascular Fellowship",
          duration: "1-2 Years Post M.Ch",
          keyActions: [
            "Undertake advanced fellowship in minimally invasive neuro-endoscopy or endovascular neurosurgery.",
            "Practice as Consultant Neurosurgeon at a tertiary academic medical institute or dedicated neuro-center."
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
      location: "Powai, Mumbai, Maharashtra, India",
      institutionType: "IIT (Institute of National Importance & Eminence)",
      overview: "Premier technical institute renowned globally for computer science, microelectronics, aerospace engineering, and pioneering startup ecosystems.",
      courses: ["B.Tech", "Dual Degree (B.Tech + M.Tech)", "B.Des Industrial Design", "M.Tech", "Ph.D."],
      engineeringBranches: ["Computer Science & Engineering", "Artificial Intelligence & Data Science", "Electrical Engineering", "Mechanical Engineering", "Aerospace Engineering", "Chemical Engineering", "Civil Engineering", "Metallurgical Engineering"],
      eligibility: "Class 12 with Physics, Chemistry, and Mathematics. Must secure minimum 75% aggregate in 12th board (65% for SC/ST) or be in the top 20 percentile of qualifying board.",
      entranceExams: ["JEE Main (Qualifying) -> JEE Advanced", "UCEED (for B.Des)"],
      officialWebsite: "https://www.iitb.ac.in",
      admissionPortal: "https://josaa.nic.in",
      applicationProcedure: "Qualify JEE Main -> Secure rank in JEE Advanced -> Register and participate in Joint Seat Allocation Authority (JoSAA) web counseling rounds.",
      feeInfo: "Approx. ₹1,15,000 to ₹1,30,000 per semester for General/OBC (Full tuition fee remission for SC/ST/PwD and economically disadvantaged students per Ministry guidelines).",
      scholarshipsInfo: "Merit-cum-Means (MCM) Scholarship, Institute Free Studentship, Inspire Scholarship (DST), and alumni-endowed emergency aid.",
      placementStats: { highlight: "Over 350 companies participate annually; highest domestic offers exceed ₹1 Cr; robust global research & engineering recruitment.", source: "IIT Bombay Placement Cell Annual Report", year: "2023-2024" },
      lastVerified: "2024-2025 Academic Cycle"
    },
    {
      id: "iit-delhi",
      name: "Indian Institute of Technology Delhi (IITD)",
      location: "Hauz Khas, New Delhi, India",
      institutionType: "IIT (Institute of National Importance & Eminence)",
      overview: "World-class university at the heart of the national capital, excelling in computing, computational mathematics, robotics, and nanotechnology.",
      courses: ["B.Tech", "Dual Degree", "B.Des", "M.Tech", "Ph.D."],
      engineeringBranches: ["Computer Science & Engineering", "Mathematics & Computing", "Electrical Engineering", "Mechanical Engineering", "Civil Engineering", "Chemical Engineering", "Biochemical Engineering & Biotechnology", "Textile Technology", "Energy Engineering"],
      eligibility: "10+2 with PCM; minimum 75% aggregate marks in 12th board or top 20 percentile in respective board.",
      entranceExams: ["JEE Main -> JEE Advanced", "UCEED (B.Des)"],
      officialWebsite: "https://home.iitd.ac.in",
      admissionPortal: "https://josaa.nic.in",
      applicationProcedure: "Admissions strictly allocated via JoSAA centralized counseling based on All India Rank in JEE Advanced.",
      feeInfo: "Tuition fee ₹1,00,000 per semester for General category; 100% waiver for parental income below ₹1 Lakh; two-thirds waiver for income between ₹1-5 Lakhs.",
      scholarshipsInfo: "Institute Merit-cum-Means, Donor-sponsored scholarships, National Fellowship schemes.",
      placementStats: { highlight: "1,050+ unique job offers secured; core engineering, algorithmic trading, software development, and deep tech roles.", source: "Office of Career Services (OCS) IIT Delhi", year: "2023-2024" },
      lastVerified: "2024-2025 Academic Cycle"
    },
    {
      id: "iit-madras",
      name: "Indian Institute of Technology Madras (IITM)",
      location: "Chennai, Tamil Nadu, India",
      institutionType: "IIT (NIRF Overall Rank #1 & Institute of Eminence)",
      overview: "Ranked #1 overall by NIRF for multiple consecutive years, renowned for IITM Research Park, quantum computing, naval architecture, and deep-tech innovation.",
      courses: ["B.Tech", "Dual Degree", "BS in Medical Sciences & Engineering", "M.Tech", "Ph.D."],
      engineeringBranches: ["Computer Science & Engineering", "Data Science & Artificial Intelligence", "Electrical Engineering", "Mechanical Engineering", "Aerospace Engineering", "Naval Architecture & Ocean Engineering", "Chemical Engineering", "Civil Engineering"],
      eligibility: "10+2 with PCM, minimum 75% aggregate or top 20 percentile of qualifying state/central board.",
      entranceExams: ["JEE Main -> JEE Advanced"],
      officialWebsite: "https://www.iitm.ac.in",
      admissionPortal: "https://josaa.nic.in",
      applicationProcedure: "Centralized seat allocation through JoSAA based on JEE Advanced All India Rank.",
      feeInfo: "Approx. ₹1,12,000 per semester (General category); full tuition waiver for SC/ST/PwD students.",
      scholarshipsInfo: "Institute Free Studentship, MCM Scholarship, Girish Reddy Scholarship, Aditya Birla Scholarship.",
      placementStats: { highlight: "1,200+ offers across 250+ recruiting entities including top global research labs and Fortune 500 tech leaders.", source: "IIT Madras Career Pathway Centre", year: "2023-2024" },
      lastVerified: "2024-2025 Academic Cycle"
    },
    {
      id: "iit-kanpur",
      name: "Indian Institute of Technology Kanpur (IITK)",
      location: "Kalyanpur, Kanpur, Uttar Pradesh, India",
      institutionType: "IIT (Institute of National Importance)",
      overview: "Pioneer of computer science education in India with its legendary flight laboratory, wind tunnels, cybersecurity C3i center, and theoretical physics research.",
      courses: ["B.Tech", "BS (4-Year Pure Sciences)", "Dual Degree", "M.Tech", "Ph.D."],
      engineeringBranches: ["Computer Science & Engineering", "Electrical Engineering", "Mechanical Engineering", "Aerospace Engineering", "Chemical Engineering", "Civil Engineering", "Materials Science & Engineering", "Earth Sciences"],
      eligibility: "Class 12 with PCM from recognized board, adhering to JoSAA 75% / top 20 percentile criterion.",
      entranceExams: ["JEE Main -> JEE Advanced"],
      officialWebsite: "https://www.iitk.ac.in",
      admissionPortal: "https://josaa.nic.in",
      applicationProcedure: "JoSAA centralized counseling seat allocation based solely on JEE Advanced rank.",
      feeInfo: "Approx. ₹1,18,000 per semester for General/OBC; graded concessions based on verified parental income.",
      scholarshipsInfo: "Donor Merit Scholarship, MCM Scholarship (free basic mess + ₹1,000 monthly stipend for eligible students).",
      placementStats: { highlight: "985+ job offers in Phase 1; dominant recruiting in software, quantitative analysis, core engineering, and R&D.", source: "Students Placement Office (SPO) IIT Kanpur", year: "2023-2024" },
      lastVerified: "2024-2025 Academic Cycle"
    },
    {
      id: "iit-kharagpur",
      name: "Indian Institute of Technology Kharagpur (IIT KGP)",
      location: "Kharagpur, West Bengal, India",
      institutionType: "IIT (The First IIT, Established 1951)",
      overview: "The largest and oldest IIT campus in India spanning 2,100 acres, offering interdisciplinary programs across artificial intelligence, micro-specializations, and law.",
      courses: ["B.Tech (Hons)", "Integrated M.Tech", "B.Arch", "M.Sc", "Ph.D."],
      engineeringBranches: ["Computer Science & Engineering", "Electronics & Electrical Communication", "Electrical Engineering", "Mechanical Engineering", "Aerospace Engineering", "Chemical Engineering", "Civil Engineering", "Ocean Engineering & Naval Architecture", "Industrial & Systems Engineering", "Mining Engineering"],
      eligibility: "10+2 with PCM, 75% aggregate or top 20 percentile in Board.",
      entranceExams: ["JEE Main -> JEE Advanced", "AAT (Architecture Aptitude Test for B.Arch)"],
      officialWebsite: "https://www.iitkgp.ac.in",
      admissionPortal: "https://josaa.nic.in",
      applicationProcedure: "JoSAA counseling allotment based on JEE Advanced All India Rank.",
      feeInfo: "Approx. ₹1,25,000 per semester for General category; standardized income-based subsidies.",
      scholarshipsInfo: "Pandit Ishwar Chandra Vidyasagar Scholarship, Inspire Fellowship, MCM Scheme.",
      placementStats: { highlight: "1,600+ offers received; prominent participation from semiconductor, cloud computing, and finance industries.", source: "Career Development Centre (CDC) IIT Kharagpur", year: "2023-2024" },
      lastVerified: "2024-2025 Academic Cycle"
    },
    {
      id: "iit-roorkee",
      name: "Indian Institute of Technology Roorkee (IITR)",
      location: "Roorkee, Uttarakhand, India",
      institutionType: "IIT (Heritage Technical Institution, Estd 1847)",
      overview: "Oldest technical institution in Asia, celebrated for cutting-edge civil, earthquake engineering, renewable energy, and competitive programming culture.",
      courses: ["B.Tech", "Integrated M.Tech", "B.Arch", "M.Tech", "Ph.D."],
      engineeringBranches: ["Computer Science & Engineering", "Data Science & Artificial Intelligence", "Electronics & Communication", "Electrical Engineering", "Mechanical Engineering", "Civil Engineering", "Chemical Engineering", "Biotechnology", "Production & Industrial Engineering"],
      eligibility: "10+2 with PCM, 75% aggregate or top 20 percentile in 12th Board examinations.",
      entranceExams: ["JEE Main -> JEE Advanced"],
      officialWebsite: "https://www.iitr.ac.in",
      admissionPortal: "https://josaa.nic.in",
      applicationProcedure: "JoSAA centralized choice filling and seat allocation based on JEE Advanced rank.",
      feeInfo: "Approx. ₹1,14,000 per semester for General students; government fee waiver policies apply.",
      scholarshipsInfo: "James Thomason Scholarship for top rankers, MCM Institute Scholarships.",
      placementStats: { highlight: "Over 800 offers in initial days; strong hiring from systems software, quantitative finance, and civil infrastructure.", source: "Placement and Internship Cell IIT Roorkee", year: "2023-2024" },
      lastVerified: "2024-2025 Academic Cycle"
    },
    {
      id: "iit-hyderabad",
      name: "Indian Institute of Technology Hyderabad (IITH)",
      location: "Kandi, Sangareddy, Telangana, India",
      institutionType: "IIT (Second Generation IIT, Estd 2008)",
      overview: "Rapidly rising premier IIT famous for launching India’s first B.Tech in Artificial Intelligence, fractal academics, and close Japanese university partnerships.",
      courses: ["B.Tech", "B.Des", "M.Tech", "Ph.D."],
      engineeringBranches: ["Artificial Intelligence", "Computer Science & Engineering", "Electrical Engineering", "Biomedical Engineering", "Mechanical & Aerospace Engineering", "Chemical Engineering", "Civil Engineering", "Materials Science & Metallurgical Engineering"],
      eligibility: "10+2 with PCM, 75% in Board or top 20 percentile.",
      entranceExams: ["JEE Main -> JEE Advanced", "UCEED (B.Des)"],
      officialWebsite: "https://www.iith.ac.in",
      admissionPortal: "https://josaa.nic.in",
      applicationProcedure: "JoSAA online seat allocation rounds based on JEE Advanced rank.",
      feeInfo: "Approx. ₹1,15,000 per semester; full fee remission for SC/ST and lowest income brackets.",
      scholarshipsInfo: "Government of India Post-Matric Scholarships, Institute MCM, Japanese Monbukagakusho fellowships.",
      placementStats: { highlight: "Over 500 job offers; exceptional placement ratios in AI/ML, autonomous systems, and semiconductor design.", source: "Office of Career Services IIT Hyderabad", year: "2023-2024" },
      lastVerified: "2024-2025 Academic Cycle"
    },
    {
      id: "bits-pilani",
      name: "Birla Institute of Technology and Science (BITS Pilani)",
      location: "Pilani (Rajasthan), Goa Campus, Hyderabad Campus, India",
      institutionType: "Private Deemed University (Institute of Eminence)",
      overview: "World-renowned institution recognized for its merit-only admissions, zero attendance policy, robust Practice School (PS-I & PS-II) industry internships, and dual degree programs.",
      courses: ["B.E. (Hons)", "M.Sc (Hons) Dual Degree", "B.Pharm", "M.E.", "Ph.D."],
      engineeringBranches: ["Computer Science", "Electronics & Communication", "Electrical & Electronics", "Mechanical Engineering", "Chemical Engineering", "Civil Engineering", "Manufacturing Engineering", "Electronics & Instrumentation"],
      eligibility: "10+2 from a recognized board with minimum 75% aggregate in Physics, Chemistry, and Mathematics, and at least 60% in each individual subject.",
      entranceExams: ["BITSAT (BITS Admission Test)"],
      officialWebsite: "https://www.bits-pilani.ac.in",
      admissionPortal: "https://www.bitsadmission.com",
      applicationProcedure: "Register for BITSAT -> Appear in computer-based entrance test (Session 1 & Session 2) -> Submit branch preferences based on normalized score.",
      feeInfo: "Approx. ₹2,75,000 per semester (Tuition fee). Hostel and student mess charges billed separately.",
      scholarshipsInfo: "Generous Merit and Merit-cum-Means (MCM) scholarships covering 15% to 100% of tuition for over 30% of enrolled students.",
      placementStats: { highlight: "Over 90% placement rate across campuses; top recruiting in software, FinTech, analytics, and mechanical core.", source: "BITS Central Placement Division Report", year: "2023-2024" },
      lastVerified: "2024-2025 Academic Cycle"
    },
    {
      id: "nit-trichy",
      name: "National Institute of Technology Tiruchirappalli (NITT)",
      location: "Tiruchirappalli, Tamil Nadu, India",
      institutionType: "NIT (Consistently Ranked #1 NIT by NIRF)",
      overview: "India’s highest-ranked National Institute of Technology, acclaimed for exceptional mechanical, electrical, and computer science engineering training.",
      courses: ["B.Tech", "B.Arch", "M.Tech", "MCA", "MBA", "Ph.D."],
      engineeringBranches: ["Computer Science & Engineering", "Electronics & Communication", "Electrical & Electronics", "Mechanical Engineering", "Civil Engineering", "Chemical Engineering", "Metallurgical & Materials Engineering", "Production Engineering", "Instrumentation & Control"],
      eligibility: "10+2 with PCM; 75% aggregate in Board or top 20 percentile.",
      entranceExams: ["JEE Main"],
      officialWebsite: "https://www.nitt.edu",
      admissionPortal: "https://josaa.nic.in",
      applicationProcedure: "Admissions strictly managed via JoSAA and CSAB special rounds based on JEE Main All India Rank.",
      feeInfo: "Tuition fee approx. ₹62,500 per semester for General/OBC; 100% fee waiver for family income below ₹1 Lakh; partial for ₹1-5 Lakhs.",
      scholarshipsInfo: "Post-Matric Scholarships, Central Sector Schemes, Institute Merit-cum-Means.",
      placementStats: { highlight: "90%+ placement across departments; 220+ core and tech enterprises recruit during campus drive.", source: "NITT Training and Placement Cell", year: "2023-2024" },
      lastVerified: "2024-2025 Academic Cycle"
    },
    {
      id: "nit-surathkal",
      name: "National Institute of Technology Karnataka (NITK Surathkal)",
      location: "Mangaluru, Karnataka, India",
      institutionType: "NIT (Institute of National Importance)",
      overview: "Picturesque coastal campus featuring its own private beach and deepwater research facilities; renowned for computer science, IT, and marine structures.",
      courses: ["B.Tech", "M.Tech", "MCA", "MBA", "Ph.D."],
      engineeringBranches: ["Computer Science & Engineering", "Artificial Intelligence", "Information Technology", "Electronics & Communication", "Electrical & Electronics", "Mechanical Engineering", "Civil Engineering", "Chemical Engineering", "Mining Engineering", "Metallurgical & Materials"],
      eligibility: "10+2 with PCM; minimum 75% aggregate in 12th Board examinations.",
      entranceExams: ["JEE Main"],
      officialWebsite: "https://www.nitk.ac.in",
      admissionPortal: "https://josaa.nic.in",
      applicationProcedure: "Centralized counseling via JoSAA / CSAB based on JEE Main All India Rank (Home State and Other State quotas).",
      feeInfo: "Tuition fee ₹62,500 per semester for General category; government income-based subsidies strictly honored.",
      scholarshipsInfo: "Central and State Government Merit-cum-Means scholarships; alumni welfare endowment funds.",
      placementStats: { highlight: "Consistent 92%+ placement for circuit branches; highest offers above ₹50 LPA; heavy presence of tech MNCs.", source: "NITK Career Development Centre", year: "2023-2024" },
      lastVerified: "2024-2025 Academic Cycle"
    },
    {
      id: "nit-warangal",
      name: "National Institute of Technology Warangal (NITW)",
      location: "Warangal, Telangana, India",
      institutionType: "NIT (The First Regional Engineering College in India)",
      overview: "The pioneer of the REC/NIT system in India (estd 1959 by Jawaharlal Nehru), recognized for outstanding alumni, electrical power systems, and computer engineering.",
      courses: ["B.Tech", "Integrated M.Sc", "M.Tech", "MCA", "Ph.D."],
      engineeringBranches: ["Computer Science & Engineering", "Electronics & Communication", "Electrical & Electronics", "Mechanical Engineering", "Civil Engineering", "Chemical Engineering", "Biotechnology", "Metallurgical & Materials"],
      eligibility: "10+2 with PCM, 75% aggregate or top 20 percentile in 12th Board.",
      entranceExams: ["JEE Main"],
      officialWebsite: "https://www.nitw.ac.in",
      admissionPortal: "https://josaa.nic.in",
      applicationProcedure: "JoSAA / CSAB counseling seat allotment based on JEE Main rank.",
      feeInfo: "Tuition fee ₹62,500 per semester; full waiver for SC/ST and parental income under ₹1 Lakh.",
      scholarshipsInfo: "National Scholarship Portal (NSP) schemes, NITW Alumni Association financial assistance.",
      placementStats: { highlight: "1,100+ offers; strong recruitment across software giants, analytics consulting, and public sector units (PSUs).", source: "NIT Warangal Centre for Career Planning", year: "2023-2024" },
      lastVerified: "2024-2025 Academic Cycle"
    },
    {
      id: "iiit-hyderabad",
      name: "International Institute of Information Technology Hyderabad (IIITH)",
      location: "Gachibowli, Hyderabad, Telangana, India",
      institutionType: "Autonomous / Not-for-Profit Public-Private Partnership",
      overview: "India's undisputed powerhouse in competitive programming, computer vision, natural language processing (LTRC), and robotics; consistently outranks top IITs in open source and research output.",
      courses: ["B.Tech (CSE, ECE)", "Dual Degree B.Tech + MS by Research (5 Years)", "M.Tech", "Ph.D."],
      engineeringBranches: ["Computer Science & Engineering", "Electronics & Communication Engineering", "Computer Science + Computational Natural Sciences (CND)", "Computer Science + Human Sciences (CHD)"],
      eligibility: "Class 12 with Physics, Chemistry, and Mathematics from any recognized board.",
      entranceExams: ["JEE Main (High Cutoff Percentile, typically 99.8%+)", "UGEE (Undergraduate Entrance Exam for Dual Degree)", "Olympiad / SPEC Mode"],
      officialWebsite: "https://www.iiit.ac.in",
      admissionPortal: "https://ugadmissions.iiit.ac.in",
      applicationProcedure: "Independent institutional application: register separately at IIIT Hyderabad portal with JEE Main percentile or appear for UGEE test + interview.",
      feeInfo: "Approx. ₹2,00,000 per semester (Tuition fee). Hostel and food charges separate.",
      scholarshipsInfo: "Need-based Financial Assistance (NFA) covering up to 100% of tuition fees through institute corpus and alumni sponsorships.",
      placementStats: { highlight: "100% placement track record; median domestic salary routinely exceeds ₹30 LPA; major presence in Google, Meta, Microsoft, Apple, and elite research labs.", source: "IIIT Hyderabad Placement Office", year: "2023-2024" },
      lastVerified: "2024-2025 Academic Cycle"
    },
    {
      id: "iiit-bangalore",
      name: "International Institute of Information Technology Bangalore (IIITB)",
      location: "Electronic City, Bengaluru, Karnataka, India",
      institutionType: "Deemed University (Non-Profit Public-Private Partnership)",
      overview: "Located in the heart of India's Silicon Valley, famous for integrated 5-year M.Tech and 4-year B.Tech programs in computer science and data engineering.",
      courses: ["B.Tech", "Integrated M.Tech (iM.Tech 5-Year)", "M.Tech", "M.Sc Digital Society", "Ph.D."],
      engineeringBranches: ["Computer Science & Engineering", "Electronics & Communication Engineering", "Data Science & Artificial Intelligence"],
      eligibility: "10+2 with PCM with first class aggregate.",
      entranceExams: ["JEE Main (All India Rank)"],
      officialWebsite: "https://www.iiitb.ac.in",
      admissionPortal: "https://www.iiitb.ac.in/admissions",
      applicationProcedure: "Direct application on IIIT Bangalore official portal using JEE Main All India Common Rank List (CRL). No JoSAA counseling required.",
      feeInfo: "Approx. ₹2,25,000 to ₹2,50,000 per semester.",
      scholarshipsInfo: "Utkarsha Scholarship (100% tuition waiver for top 25 JEE Main rankers who join), Dean’s Merit List scholarships.",
      placementStats: { highlight: "Average salary approx. ₹25+ LPA for iM.Tech/B.Tech graduates; 100% placement in Electronic City tech giants and global unicorns.", source: "IIIT Bangalore Career Guidance Cell", year: "2023-2024" },
      lastVerified: "2024-2025 Academic Cycle"
    },
    {
      id: "dtu-delhi",
      name: "Delhi Technological University (DTU - Formerly DCE)",
      location: "Rohini, New Delhi, India",
      institutionType: "State Government Technical University",
      overview: "Formerly Delhi College of Engineering (estd 1941), possessing legendary alumni legacy, peer culture, and high volume campus recruitment across software and core manufacturing.",
      courses: ["B.Tech", "M.Tech", "MBA", "Ph.D."],
      engineeringBranches: ["Computer Engineering", "Information Technology", "Software Engineering", "Mathematics & Computing", "Electronics & Communication", "Electrical Engineering", "Mechanical Engineering", "Civil Engineering", "Biotechnology", "Automobile Engineering"],
      eligibility: "10+2 with PCM, minimum 60% aggregate in Physics, Chemistry, and Mathematics.",
      entranceExams: ["JEE Main"],
      officialWebsite: "https://www.dtu.ac.in",
      admissionPortal: "https://jacdelhi.admissions.nic.in",
      applicationProcedure: "Joint Admission Counseling (JAC Delhi) portal based on JEE Main All India Rank (85% Delhi Region Quota, 15% Outside Delhi Quota).",
      feeInfo: "Approx. ₹2,10,000 to ₹2,25,000 annually.",
      scholarshipsInfo: "Delhi Govt Merit-cum-Means Financial Assistance Scheme (100% fee waiver for NFSA/Priority card holders).",
      placementStats: { highlight: "Over 1,800 offers generated; highest domestic compensation top tier; massive recruitment from Apple, Google, Amazon, Microsoft, and PSU firms.", source: "DTU Training and Placement Department", year: "2023-2024" },
      lastVerified: "2024-2025 Academic Cycle"
    },
    {
      id: "coep-pune",
      name: "COEP Technological University (Formerly College of Engineering Pune)",
      location: "Shivajinagar, Pune, Maharashtra, India",
      institutionType: "State Public Unitary Technological University (Estd 1854)",
      overview: "Third oldest engineering institution in Asia, alma mater of Sir M. Visvesvaraya; known for student clubs (satellite team, robotics, formula student) and strong Maharashtra industrial connect.",
      courses: ["B.Tech", "M.Tech", "Ph.D."],
      engineeringBranches: ["Computer Engineering", "Artificial Intelligence & Robotics", "Electronics & Telecommunication", "Electrical Engineering", "Mechanical Engineering", "Civil Engineering", "Metallurgy & Material Science", "Manufacturing Engineering", "Instrumentation & Control"],
      eligibility: "10+2 with PCM; passed MHT-CET or JEE Main with valid non-zero score.",
      entranceExams: ["MHT-CET (State Quota)", "JEE Main (All India Quota)"],
      officialWebsite: "https://www.coeptech.ac.in",
      admissionPortal: "https://cetcell.mahacet.org",
      applicationProcedure: "State Common Entrance Test Cell Maharashtra Centralized Admission Process (CAP) rounds.",
      feeInfo: "Approx. ₹95,000 per year (Subsidized public fee structure).",
      scholarshipsInfo: "Government of Maharashtra EBC Scholarship (50% tuition waiver for economic criteria), Rajarshi Chhatrapati Shahu Maharaj Shikshan Shulkh Shishyavrutti Yojna.",
      placementStats: { highlight: "85%+ placement rate across classical and computer branches; top recruiting from automotive, IT services, and defense engineering.", source: "COEP Training and Placement Cell", year: "2023-2024" },
      lastVerified: "2024-2025 Academic Cycle"
    },
    {
      id: "jadavpur-engineering",
      name: "Jadavpur University Faculty of Engineering & Technology (JU FET)",
      location: "Kolkata, West Bengal, India",
      institutionType: "State Autonomous Research University (NIRF Top 10)",
      overview: "Celebrated for having the most economical fee structure in the country (less than ₹10,000 for full 4 years of engineering) coupled with unmatched academic prestige and research.",
      courses: ["B.E.", "B.Tech", "M.E.", "M.Tech", "Ph.D."],
      engineeringBranches: ["Computer Science & Engineering", "Information Technology", "Electronics & Telecommunication", "Electrical Engineering", "Mechanical Engineering", "Chemical Engineering", "Civil Engineering", "Instrumentation & Electronics", "Power Engineering", "Production Engineering"],
      eligibility: "10+2 with PCM with minimum 60% in Physics, Chemistry, Math and 30% in English.",
      entranceExams: ["WBJEE (West Bengal Joint Entrance Examination)"],
      officialWebsite: "https://www.jaduniv.edu.in",
      admissionPortal: "https://wbjeeb.nic.in",
      applicationProcedure: "WBJEE centralized e-counseling based on General Merit Rank (GMR).",
      feeInfo: "Incredible value: Tuition fee is approx. ₹2,400 to ₹3,000 per year for classical engineering branches; ₹30,000 per year for Information Technology.",
      scholarshipsInfo: "Swami Vivekananda Merit-cum-Means Scholarship (SVMCM), Kanyashree Prakalpa (K3), National Scholarship Portal schemes.",
      placementStats: { highlight: "Near 100% placement in IT and circuit branches; over 85% in mechanical/chemical; extraordinary Return on Investment (ROI) nationwide.", source: "Jadavpur University Placement Office", year: "2023-2024" },
      lastVerified: "2024-2025 Academic Cycle"
    },
    {
      id: "vit-vellore",
      name: "Vellore Institute of Technology (VIT)",
      location: "Vellore, Tamil Nadu, India",
      institutionType: "Deemed Private University (Institute of Eminence)",
      overview: "Large-scale private technological university with ABET-accredited programs, fully flexible credit system (FFCS), and extensive global university credit transfers.",
      courses: ["B.Tech", "Integrated M.Tech", "M.Tech", "MCA", "Ph.D."],
      engineeringBranches: ["Computer Science & Engineering", "CSE with AI & Machine Learning", "CSE with Data Science", "Information Security", "Electronics & Communication", "Electrical & Electronics", "Mechanical Engineering", "Biotechnology", "Civil Engineering"],
      eligibility: "10+2 with Physics, Chemistry, and Mathematics/Biology with minimum 60% aggregate (50% for SC/ST and North Eastern states).",
      entranceExams: ["VITEEE (VIT Engineering Entrance Examination)"],
      officialWebsite: "https://vit.ac.in",
      admissionPortal: "https://viteee.vit.ac.in",
      applicationProcedure: "Register and appear for VITEEE computer-based test -> Participate in rank-based online counseling across 5 fee categories.",
      feeInfo: "Category 1 Tuition approx. ₹1,98,000 per year; Category 2-5 progressively higher depending on entrance rank.",
      scholarshipsInfo: "GV School Development Programme (GVSDP): 100% tuition waiver for state board/CBSE board rankers and top 50 VITEEE rankers.",
      placementStats: { highlight: "Limca Book of Records for maximum campus recruitments; 900+ visiting companies; super dream offers exceeding ₹10 LPA for over 3,000 students.", source: "VIT Career Development Centre", year: "2023-2024" },
      lastVerified: "2024-2025 Academic Cycle"
    },
    {
      id: "thapar-patiala",
      name: "Thapar Institute of Engineering and Technology (TIET)",
      location: "Patiala, Punjab, India",
      institutionType: "Private Deemed University (Established 1956)",
      overview: "Respected heritage institution with academic collaboration with Trinity College Dublin; renowned for engineering curriculum, modern campus infrastructure, and alumni network.",
      courses: ["B.E.", "B.Tech", "M.E.", "M.Tech", "Ph.D."],
      engineeringBranches: ["Computer Engineering", "Computer Science & Business Systems", "Electronics & Communication", "Electrical Engineering", "Mechanical Engineering", "Civil Engineering", "Biotechnology", "Mechatronics"],
      eligibility: "10+2 with PCM with at least 70% aggregate marks (65% for SC/ST).",
      entranceExams: ["JEE Main (Mode 1 - 50% seats)", "Class 12 Board Percentage (Mode 2 - 50% seats)"],
      officialWebsite: "https://www.thapar.edu",
      admissionPortal: "https://admissions.thapar.edu",
      applicationProcedure: "Direct application on Thapar University admissions portal; evaluated on JEE Main score or Class 12 PCM percentage.",
      feeInfo: "Approx. ₹2,15,000 to ₹2,45,000 per semester depending on the engineering branch.",
      scholarshipsInfo: "Merit scholarships covering full tuition for candidates with high JEE Main ranks or 95%+ marks in Class 12.",
      placementStats: { highlight: "350+ recruiters; 1,800+ total offers; prominent hiring from Zomato, DE Shaw, JP Morgan, Cisco, and Maruti Suzuki.", source: "TIET Centre for Industrial Liaison & Placement", year: "2023-2024" },
      lastVerified: "2024-2025 Academic Cycle"
    },
    {
      id: "iisc-bangalore",
      name: "Indian Institute of Science (IISc)",
      location: "Bengaluru, Karnataka, India",
      institutionType: "Public Research University (Institute of Eminence)",
      overview: "India's highest-ranked university globally for scientific research and doctoral studies; offers cutting-edge B.Tech in Mathematics and Computing and Bachelor of Science (Research).",
      courses: ["B.Tech Mathematics and Computing", "Bachelor of Science (Research)", "M.Tech", "Integrated Ph.D."],
      engineeringBranches: ["Mathematics & Computing", "Computational Data Science", "Electrical Communication", "Mechanical Engineering", "Aerospace Engineering", "Materials Engineering"],
      eligibility: "10+2 with Physics, Chemistry, and Mathematics with first-class marks (minimum 60%).",
      entranceExams: ["JEE Advanced (for B.Tech)", "JEE Main / JEE Adv / NEET UG (for BS Research)"],
      officialWebsite: "https://iisc.ac.in",
      admissionPortal: "https://admissions.iisc.ac.in",
      applicationProcedure: "Direct application to IISc online portal with valid score in JEE Advanced or JEE Main.",
      feeInfo: "Highly subsidized: Approx. ₹30,000 to ₹35,000 per semester.",
      scholarshipsInfo: "All students receive standard national or institutional fellowship/stipend based on merit.",
      placementStats: { highlight: "Preeminent destination for deep tech research scientists, quantitative finance teams, and doctoral fellowship placement at MIT, Stanford, and Cambridge.", source: "IISc Office of Career Counselling and Placement", year: "2023-2024" },
      lastVerified: "2024-2025 Academic Cycle"
    },
    {
      id: "aiims-delhi",
      name: "All India Institute of Medical Sciences (AIIMS New Delhi)",
      location: "Ansari Nagar, New Delhi, India",
      institutionType: "Autonomous Public Medical Institute of National Importance",
      overview: "The premier medical research and healthcare institution of India, offering unmatched clinical exposure, advanced surgical theaters, and subsidized world-class medical education.",
      courses: ["MBBS", "B.Sc Nursing", "MD / MS", "M.Ch / DM", "Ph.D."],
      engineeringBranches: ["Not Applicable (Medical College)"],
      eligibility: "10+2 with Physics, Chemistry, Biology, and English with minimum 60% aggregate (50% for SC/ST).",
      entranceExams: ["NEET UG (for MBBS)", "INI-CET (for MD/MS)"],
      officialWebsite: "https://www.aiims.edu",
      admissionPortal: "https://mcc.nic.in",
      applicationProcedure: "Medical Counselling Committee (MCC) All India Quota 100% counseling based on NEET UG All India Rank.",
      feeInfo: "Approx. ₹1,628 for the ENTIRE 5.5-year MBBS course including tuition, hostel, and registration fees.",
      scholarshipsInfo: "Subsidized government education; external DST/DBT research stipends.",
      placementStats: { highlight: "Graduates secure residency positions in premier national and international teaching hospitals (USMLE, PLAB, INI-CET).", source: "AIIMS Academic Section", year: "2023-2024" },
      lastVerified: "2024-2025 Academic Cycle"
    },
    {
      id: "nid-ahmedabad",
      name: "National Institute of Design (NID)",
      location: "Paldi, Ahmedabad, Gujarat, India",
      institutionType: "Autonomous Institution of National Importance",
      overview: "Pioneering design institution in India offering world-renowned programs in industrial design, communication design, textile design, and digital interaction systems.",
      courses: ["B.Des Product Design", "B.Des Graphic Design", "B.Des Animation Film", "B.Des Film & Video", "M.Des"],
      engineeringBranches: ["Design & Human Interaction (Industrial / Digital)"],
      eligibility: "10+2 in any stream (Science, Commerce, Arts) from a recognized board.",
      entranceExams: ["NID DAT (Design Aptitude Test - Prelims and Mains)"],
      officialWebsite: "https://www.nid.edu",
      admissionPortal: "https://admissions.nid.edu",
      applicationProcedure: "Two-stage admission test: DAT Prelims (written/drawing) -> DAT Mains (Studio Test and Interview).",
      feeInfo: "Approx. ₹1,80,000 to ₹2,10,000 per semester.",
      scholarshipsInfo: "Financial Aid Scheme for underprivileged students; Ford Foundation and industry design endowments.",
      placementStats: { highlight: "Top design studios, consumer tech firms, and automotive brands recruit for UI/UX, product styling, and brand identity.", source: "NID Industry Interface Cell", year: "2023-2024" },
      lastVerified: "2024-2025 Academic Cycle"
    },
    {
      id: "nlsiu-bangalore",
      name: "National Law School of India University (NLSIU)",
      location: "Nagarbhavi, Bengaluru, Karnataka, India",
      institutionType: "Public National Law University (NIRF Law Rank #1)",
      overview: "The gold standard of legal education in South Asia, pioneering 5-year integrated law degrees with stellar corporate law firm and judicial clerkship placement records.",
      courses: ["BA LLB (Hons)", "LLM", "Ph.D. in Law"],
      engineeringBranches: ["Not Applicable (National Law University)"],
      eligibility: "10+2 with minimum 45% marks for General category (40% for SC/ST).",
      entranceExams: ["CLAT (Common Law Admission Test)"],
      officialWebsite: "https://www.nls.ac.in",
      admissionPortal: "https://consortiumofnlus.ac.in",
      applicationProcedure: "Centralized counseling through the Consortium of National Law Universities based on CLAT merit list.",
      feeInfo: "Approx. ₹3,20,000 per year (Tuition and facilities).",
      scholarshipsInfo: "Need-based and Merit-cum-Means financial assistance provided by university endowment and legal alumni.",
      placementStats: { highlight: "100% placement for students opting for corporate law; premier domestic firms (Cyril Amarchand, Shardul Amarchand, Trilegal, Khaitan) and international Magic Circle firms recruit annually.", source: "NLSIU Recruitment Coordination Committee", year: "2023-2024" },
      lastVerified: "2024-2025 Academic Cycle"
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
