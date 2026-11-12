/**
 * Single source of truth for every piece of portfolio content.
 * Components stay presentational; edit facts here only.
 */

export const profile = {
    name: 'Adityaraj Bagwan',
    firstName: 'Adityaraj',
    lastName: 'Bagwan',
    initials: 'AB',
    role: 'Flutter & Full-Stack Engineer',
    roleRotation: [
        'Flutter Engineer',
        'Full-Stack Developer',
        'Cloud & AI Builder',
        'Mobile Architect',
    ],
    tagline:
        'I build production-grade mobile and full-stack products: Flutter apps with clean architecture, Node backends, and AI powered by Google Cloud.',
    location: 'Pune, Maharashtra, India',
    email: 'adityarajb7@gmail.com',
    phone: '+91 88307 33635',
    available: true,
    availabilityNote: 'Open to SDE & Flutter internships',
    links: {
        github: 'https://github.com/Adityaraj-B',
        linkedin: 'https://linkedin.com/in/adityaraj-bagwan',
        email: 'mailto:adityarajb7@gmail.com',
        resume: '/resume.pdf',
        cloudProfile:
            'https://www.skills.google/public_profiles/def0927f-d367-48bf-9f53-66ef92b98bc9',
    },
};

export const stats = [
    { value: 8.63, suffix: '', label: 'CGPA', decimals: 2 },
    { value: 25, suffix: '+', label: 'Screens shipped' },
    { value: 60, suffix: '+', label: 'Cloud credentials' },
    { value: 5, suffix: '', label: 'Products built' },
];

export const about = {
    paragraphs: [
        "I'm a Computer Science undergraduate at **Vishwakarma University, Pune**, building Flutter and full-stack applications with Firebase, Google Cloud and REST APIs. The kind that ship, handle edge cases, and survive real users.",
        'My work sits where **architecture meets craft**: BLoC and Clean Architecture on the mobile side, Node and Express behind it, Vertex AI and the Gemini API when a product needs to think. I care about the hundred small decisions that separate a demo from a product.',
        'Right now I\'m engineering a production insurance platform, studying deep learning, and looking for a team where thoughtful detail is the default.',
    ],
    education: {
        school: 'Vishwakarma University',
        degree: 'B.Tech, Computer Science & Engineering',
        place: 'Pune, Maharashtra',
        period: '2024 to 2028 (Expected May 2028)',
        cgpa: '8.63 / 10',
        coursework: [
            'Data Structures & Algorithms',
            'Database Management',
            'Computer Networks',
            'AI & Machine Learning',
            'Data Science',
        ],
    },
};

export const experience = [
    {
        id: 'sankar',
        company: 'Sankar Group',
        role: 'Flutter Developer Intern',
        kind: 'DIGIPe · Yeskart',
        period: 'May 2026 to Present',
        current: true,
        summary:
            'Building production Flutter apps across two products: DIGIPe, a solar-insurance platform, and the customer app for Yeskart\'s multi-vendor marketplace.',
        highlights: [
            'Shipped the Yeskart customer app: catalogue, cart and checkout, multi-gateway payments, maps and push notifications on a Cubit-based, 19-module Flutter codebase.',
            'Integrated 15+ REST endpoints through Dio interceptors with retry/back-off, cascading location selection and document management.',
            'Engineered a Cashfree payment flow with biometric gates and two-tier transaction resolution.',
            'Hardened the app against screenshots and rooted devices, with auto-persisting flows via flutter_secure_storage.',
        ],
        tech: ['Flutter', 'BLoC', 'Dio', 'Firebase', 'Cashfree SDK', 'Secure Storage'],
    },
    {
        id: 'painsense-exp',
        company: 'VIT Bhopal × Johns Hopkins',
        role: 'Full-Stack & CV Engineer',
        kind: 'Health Hackathon 2026',
        period: 'Jan 2026',
        summary:
            'Built an end-to-end digital health platform for pain assessment in non-verbal patients.',
        highlights: [
            'Shipped a responsive React/Vite clinical dashboard with privacy-first backend services.',
            'Integrated edge-inference computer vision over 68+ facial landmarks, mapping Facial Action Units to validated CPOT scales.',
        ],
        tech: ['React', 'Node.js', 'Computer Vision', 'Clinical AI'],
    },
    {
        id: 'sangeet-exp',
        company: 'Sangeet',
        role: 'Cross-Platform Engineer',
        kind: 'Independent Product',
        period: 'Dec 2025 to Oct 2026',
        summary:
            'Music streaming app, rebuilt as Sangeet 2.0 with a new design language, an autoplay engine and desktop builds.',
        highlights: [
            'Rebuilt the app on BLoC for Android, iOS, web, Windows, macOS and Linux, with a dedicated desktop shell and a Windows installer.',
            'Built an autoplay engine that scores the next track against the session, skips and a learned taste profile.',
            'Added an offline vault, synced lyrics and local listening insights, with optional Firebase sign-in and Firestore backup.',
        ],
        tech: ['Flutter', 'BLoC', 'just_audio', 'Firebase'],
    },
];

export const navLinks = [
    { id: 'work', label: 'Work' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'credentials', label: 'Credentials' },
    { id: 'contact', label: 'Contact' },
];

export const interests = [
    'Artificial Intelligence',
    'Generative AI',
    'Full-Stack & Mobile',
    'Cloud Infrastructure',
];
