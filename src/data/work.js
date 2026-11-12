// Optimised WebP derivatives of the original uploads (see src/assets).
import hackathonCert from '../assets/cert-techathon.webp';
import certIds from '../assets/cert-ids.webp';
import certFdt from '../assets/cert-fdt.webp';
import certDsf from '../assets/cert-dsf.webp';
import certBdv from '../assets/cert-bdv.webp';
import certAwsSa from '../assets/cert-aws-sa.webp';
import logoDigipe from '../assets/logo-digipe.webp';
import logoYeskart from '../assets/logo-yeskart.webp';
import logoSangeet from '../assets/logo-sangeet.webp';

export const projects = [
    {
        id: 'digipe',
        index: '01',
        title: 'DIGIPe',
        subtitle: 'Solar Insurance Platform',
        year: '2026',
        status: 'In Production',
        accent: '#FF9A3C',
        blurb:
            'A production insurance app spanning 25+ screens, built on Clean Architecture with hardened payments and biometric security.',
        description:
            'Architected a scalable solar-insurance application using Flutter, BLoC and Clean Architecture. The app handles cascading location selection, document management and a secure Cashfree payment infrastructure with biometric gates and two-tier transaction resolution, plus screenshot and root-detection hardening for a regulated domain.',
        tech: ['Flutter', 'BLoC', 'Clean Architecture', 'Dio', 'Cashfree SDK', 'Secure Storage'],
        features: [
            '25+ screens on a modular, testable Clean Architecture base',
            '15+ REST endpoints via Dio interceptors with retry and back-off',
            'Cashfree payments with biometric gates and two-tier resolution',
            'Screenshot blocking and rooted-device detection',
            'Cascading location selection with document upload flows',
            'Auto-persisting forms via flutter_secure_storage',
        ],
        metrics: [
            { k: '25+', v: 'Screens' },
            { k: '15+', v: 'Endpoints' },
            { k: '2-tier', v: 'Txn safety' },
        ],
        stores: [
            {
                kind: 'play',
                label: 'Google Play',
                href: 'https://play.google.com/store/apps/details?id=in.digipe.app&pcampaignid=web_share',
            },
        ],
        logo: logoDigipe,
        logoBg: '#000000',
        image: null,
        github: null,
        demo: null,
        private: true,
    },
    {
        id: 'yeskart',
        index: '02',
        title: 'Yeskart',
        subtitle: 'Marketplace Customer App',
        year: '2026',
        status: 'Shipped',
        accent: '#F472B6',
        blurb:
            'The customer app for a multi-vendor marketplace: catalogue, cart, checkout, multi-gateway payments and order tracking on iOS and Android.',
        description:
            'Shipped the customer-facing Flutter app for Yeskart, a multi-vendor marketplace. It covers browsing and search with voice and barcode input, cart and checkout with map-based addresses, payment gateway integrations with an in-app wallet, order history and delivery tracking, push notifications and deep links. The codebase is split into 19 feature modules on Cubit/BLoC with a repository layer over a Dio API client, backed by Firebase for auth, messaging, analytics and crash reporting.',
        tech: ['Flutter', 'BLoC / Cubit', 'Dio', 'Firebase', 'Google Maps', 'Razorpay'],
        features: [
            '19 feature modules on Cubit/BLoC with a repository layer and Dio client',
            'Product search with voice input and barcode scanning',
            'Cart and checkout with address management and map-based location picking',
            'Payment integrations for Razorpay, Stripe and Paystack, plus an in-app wallet',
            'Order history and delivery tracking on maps, with ratings and reviews',
            'Phone OTP, Google and Apple sign-in through Firebase Auth',
            'Push notifications and deep links into products and orders',
            'Localisation and switchable light and dark themes',
        ],
        metrics: [
            { k: '19', v: 'Feature modules' },
            { k: '3', v: 'Pay gateways' },
            { k: '2', v: 'Platforms' },
        ],
        logo: logoYeskart,
        logoBg: '#ffffff',
        image: null,
        github: null,
        demo: null,
        private: true,
    },
    {
        id: 'sangeet',
        index: '03',
        title: 'Sangeet',
        subtitle: 'Cross-Platform Music Streaming',
        year: '2026',
        status: 'Shipped',
        accent: '#E0C298',
        blurb:
            'Sangeet 2.0: a music player for six platforms with a taste-aware autoplay engine, synced lyrics, an offline vault and a handcrafted onyx-and-gold design language.',
        description:
            'A ground-up rebuild of Sangeet as a cross-platform music app in a handcrafted design language called Atelier Acoustique: a deep onyx canvas, champagne-gold accents and a waveform scrubber. Playback runs through just_audio and audio_service with system media controls, an autoplay engine scores the next track against the session, skips and a learned taste profile, and an offline vault keeps downloads and favourites on device. State is BLoC throughout, with optional Firebase sign-in and Firestore backup, and a dedicated desktop shell ships Windows with an installer.',
        tech: ['Flutter', 'BLoC', 'just_audio', 'audio_service', 'Firebase', 'Cloud Firestore'],
        features: [
            'Background playback with lock-screen, notification and system media controls',
            'Autoplay engine that scores candidates on mood, session history, skips and taste',
            'Synced lyrics from LRCLIB, shown line by line while a track plays',
            'Offline vault for downloads and favourites, with a connectivity-aware banner',
            'Listening insights built from locally stored play events',
            'Optional Firebase email and Google sign-in with Firestore playlist backup',
            'Playlist import, global search and a waveform scrubber in the full-screen player',
            'Mobile shell and a desktop shell with sidebar, queue panel and player dock',
        ],
        metrics: [
            { k: '6', v: 'Platforms' },
            { k: 'Synced', v: 'Lyrics' },
            { k: 'Offline', v: 'Vault' },
        ],
        stores: [
            {
                kind: 'microsoft',
                label: 'Microsoft Store',
                href: 'https://apps.microsoft.com/detail/9n652jr75x7q?hl=en-US&gl=IN&ocid=pdpshare',
            },
        ],
        logo: logoSangeet,
        logoBg: '#000000',
        image: null,
        github: 'https://github.com/Adityaraj-B/Sangeet-2.0',
        demo: null,
    },
    {
        id: 'painsense',
        index: '04',
        title: 'PainSense',
        subtitle: 'Clinical AI Pain Assessment',
        year: '2026',
        status: 'Live',
        accent: '#6FE3C4',
        blurb:
            'Computer vision that reads pain in non-verbal ICU patients, mapped to validated clinical scales.',
        description:
            'Built for the VIT Bhopal and Johns Hopkins University Health Hackathon 2026. PainSense delivers real-time, objective pain assessment for ICU, neonatal and cognitively impaired patients by combining facial expression analysis with validated clinical scales (CPOT, Primal Face Pain Scale), all with privacy-first edge inference.',
        tech: ['React', 'Vite', 'Computer Vision', 'Facial Action Units', 'Node.js', 'Clinical AI'],
        features: [
            'Real-time facial analysis across 68+ landmarks',
            'Clinical scale mapping (CPOT, Primal Face Pain Scale)',
            'Automated Facial Action Unit detection',
            'Privacy-first edge inference, no video leaves the device',
            'Live pain visualisation and trend monitoring',
            'Alerting on sudden pain spikes',
        ],
        metrics: [
            { k: '68+', v: 'Landmarks' },
            { k: 'Edge', v: 'Inference' },
            { k: 'CPOT', v: 'Validated' },
        ],
        image:
            'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&h=800&fit=crop',
        github: 'https://github.com/ManjiriKench/PainSense.git',
        demo: 'https://painsense-4ff16.web.app/',
    },
    {
        id: 'kisansetu',
        index: '05',
        title: 'Kisan Setu',
        subtitle: 'Farmer Scheme Discovery',
        year: '2025',
        status: 'Shipped',
        accent: '#C3E88D',
        blurb:
            'Three inputs, state, crop and land size, and a farmer sees every government scheme they qualify for.',
        description:
            'Built for a national hackathon, Kisan Setu closes the information gap for rural Indian farmers. Enter State, Crops and Land Size and the app auto-matches eligible government schemes (PM-KISAN, PMFBY, KCC, eNAM, PKVY) from a curated database. It adds a dedicated PMFBY crop-insurance flow, a Gemini-powered chatbot, 7-day weather advisories and full EN/HI/MR multilingual support for low-literacy users.',
        tech: ['Flutter', 'Firebase', 'Gemini AI', 'Provider', 'Secure Storage', 'REST APIs'],
        features: [
            'Profile-driven scheme matching from state, crops and land size',
            'Curated database: PM-KISAN, PMFBY, KCC, eNAM, PKVY and more',
            'Dedicated PMFBY flow with step-by-step premium guidance',
            'KCC and loan screens with subsidy breakdowns',
            'Multilingual across English, Hindi and Marathi',
            'Gemini AI chatbot for natural-language scheme queries',
            '7-day forecast with spray and irrigation advisories',
            'Offline-first with encrypted local storage',
        ],
        metrics: [
            { k: '3', v: 'Inputs only' },
            { k: '3', v: 'Languages' },
            { k: 'Offline', v: 'Capable' },
        ],
        image:
            'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1200&h=800&fit=crop',
        github: 'https://github.com/Adityaraj-B/KisanSetu.git',
        demo: null,
    },
];

export const skillGroups = [
    {
        id: 'languages',
        title: 'Languages',
        note: 'Day-to-day fluency',
        skills: ['C', 'C++', 'Python', 'JavaScript', 'Dart', 'SQL'],
    },
    {
        id: 'mobile',
        title: 'Mobile & Frontend',
        note: 'Where I ship most',
        skills: ['Flutter', 'React', 'React Native', 'HTML5', 'CSS3', 'Material Design 3'],
    },
    {
        id: 'architecture',
        title: 'Mobile Architecture',
        note: 'How apps stay maintainable',
        skills: ['BLoC', 'Provider', 'Clean Architecture', 'get_it (DI)', 'go_router', 'Dio'],
    },
    {
        id: 'backend',
        title: 'Backend & Data',
        note: 'Behind the screen',
        skills: ['Node.js', 'Express.js', 'Firebase', 'RESTful APIs', 'JWT', 'Cloud Firestore'],
    },
    {
        id: 'ml',
        title: 'Machine Learning',
        note: 'Models and the maths',
        skills: ['Deep Learning', 'CNNs', 'RNNs', 'GANs', 'Supervised Learning', 'BigQuery ML'],
    },
    {
        id: 'cloud',
        title: 'Cloud & AI',
        note: 'Google Cloud native',
        skills: ['Google Cloud', 'Vertex AI', 'Cloud Run', 'Gemini API', 'LLM Integration', 'Pub/Sub'],
    },
    {
        id: 'aws-architecture',
        title: 'AWS Architecture',
        note: 'Solutions Architect learning plan',
        skills: [
            'Solutions Architecture',
            'Three-Tier Web Design',
            'Hybrid Architecture',
            'Containerised Systems',
            'Event-Driven Microservices',
            'Data-Driven Design',
        ],
    },
    {
        id: 'aws-services',
        title: 'AWS Services',
        note: 'Hands-on labs and simulations',
        skills: [
            'AWS Lambda',
            'API Gateway',
            'EventBridge',
            'SNS & SQS',
            'Amazon ECS',
            'IAM',
            'CloudWatch & X-Ray',
            'AWS Config',
        ],
    },
    {
        id: 'devops',
        title: 'DevOps & Delivery',
        note: 'From commit to production',
        skills: ['Git', 'GitHub Actions', 'Docker', 'CI/CD', 'Vercel', 'Netlify'],
    },
];

export const marqueeSkills = [
    'Flutter', 'Dart', 'BLoC', 'Clean Architecture', 'React', 'Node.js',
    'Firebase', 'Google Cloud', 'AWS', 'Vertex AI', 'Gemini API', 'Docker',
    'Python', 'C++', 'BigQuery ML', 'AWS Lambda', 'CI/CD', 'REST APIs',
];

export const certifications = [
    {
        id: 'aws-sa',
        title: 'AWS Solutions Architect Learning Plan',
        issuer: 'AWS Training & Certification',
        date: 'Oct 2026',
        kind: 'Learning Plan',
        detail:
            '32 courses, labs and simulations covering architecture design, security and IAM, networking, containers, serverless and event-driven systems, and data lakes.',
        image: certAwsSa,
    },
    {
        id: 'techathon',
        title: 'National Level Techathon Finalist',
        issuer: 'InnovateYou 2.0, Innovation Foundation',
        date: '2025',
        kind: 'Achievement',
        image: hackathonCert,
    },
    {
        id: 'gcp-ml',
        title: 'Google Cloud, ML & AI Track',
        issuer: 'Google Cloud Skills Boost',
        date: 'Mar 2026',
        kind: 'Specialisation',
        detail:
            'Feature Engineering, Engineer Data for Predictive Modeling with BigQuery ML, Create ML Models with BigQuery ML, Prepare Data for ML APIs, Level 3: Generative AI, Develop GenAI Apps with Gemini & Streamlit, Prompt Design in Vertex AI',
        image: null,
    },
    {
        id: 'gcp-infra',
        title: 'Google Cloud, Infrastructure & Deployment',
        issuer: 'Google Cloud Skills Boost',
        date: 'Oct 2025',
        kind: 'Specialisation',
        detail:
            'Cloud Run Functions: 3 Ways, App Engine: 3 Ways, Build a Website on Google Cloud, Set Up a Google Cloud Network, Monitoring in Google Cloud',
        image: null,
    },
    {
        id: 'ids',
        title: 'Introduction to Data Science',
        issuer: 'LinkedIn Learning',
        date: 'Sep 2025',
        kind: 'Course',
        image: certIds,
    },
    {
        id: 'fdt',
        title: 'Fundamentals of Data Transformation',
        issuer: 'LinkedIn Learning, Data Engineering',
        date: 'Sep 2025',
        kind: 'Course',
        image: certFdt,
    },
    {
        id: 'dsf',
        title: 'Data Science Foundations',
        issuer: 'LinkedIn Learning',
        date: 'Sep 2025',
        kind: 'Course',
        image: certDsf,
    },
    {
        id: 'bdv',
        title: 'Basics of Data Visualization Analysis',
        issuer: 'LinkedIn Learning',
        date: 'Sep 2025',
        kind: 'Course',
        image: certBdv,
    },
];

const badgeBase =
    'https://www.skills.google/public_profiles/def0927f-d367-48bf-9f53-66ef92b98bc9/badges/';

export const badges = [
    { id: '19397972', title: 'Level 3: Generative AI', track: 'Gen AI' },
    { id: '19352788', title: 'Gen AI with Gemini', track: 'Gen AI' },
    { id: '19350865', title: 'Prompt Design in Vertex AI', track: 'Gen AI' },
    { id: '19353172', title: 'Cloud Run Functions', track: 'Compute' },
    { id: '19292028', title: 'App Engine: 3 Ways', track: 'Compute' },
    { id: '18978325', title: 'Basics of Google Cloud Compute', track: 'Compute' },
    { id: '19293340', title: 'Cloud Speech API: 3 Ways', track: 'AI APIs' },
    { id: '19319163', title: 'Speech and Language APIs', track: 'AI APIs' },
    { id: '18984395', title: 'Get Started with Cloud Storage', track: 'Data' },
    { id: '18986027', title: 'Get Started with Pub/Sub', track: 'Data' },
    { id: '19044490', title: 'Get Started with Looker', track: 'Data' },
    { id: '19046820', title: 'Get Started with Dataplex', track: 'Data' },
    { id: '19234413', title: 'Data on Google Cloud', track: 'Data' },
    { id: '19043233', title: 'Get Started with API Gateway', track: 'Platform' },
    { id: '19233064', title: 'Set Up a Google Cloud Network', track: 'Platform' },
    { id: '19318312', title: 'Monitoring in Google Cloud', track: 'Platform' },
    { id: '19163575', title: 'Build a Website on Google Cloud', track: 'Platform' },
    { id: '19114458', title: 'Google Workspace Tools', track: 'Workspace' },
    { id: '19116305', title: 'App Building with AppSheet', track: 'Workspace' },
    { id: '19158100', title: 'Apps Script and AppSheet', track: 'Workspace' },
].map((b) => ({ ...b, link: badgeBase + b.id }));

export const badgeTracks = ['All', 'Gen AI', 'Compute', 'AI APIs', 'Data', 'Platform', 'Workspace'];

// AWS Training & Certification completion certificates (all 2026).
export const awsCourses = [
    { id: 'fundamentals-of-architecting-on-aws', title: 'Fundamentals of Architecting on AWS', track: 'Architecture', format: 'Course', date: '15 Oct 2026' },
    { id: 'designing-a-three-tier-web-architecture', title: 'Designing a Three-Tier Web Architecture', track: 'Architecture', format: 'Course', date: '15 Oct 2026' },
    { id: 'designing-a-containerized-architecture', title: 'Designing a Containerized Architecture', track: 'Architecture', format: 'Course', date: '17 Oct 2026' },
    { id: 'designing-a-compliant-secure-and-governe', title: 'Designing a Compliant, Secure, and Governed Architecture', track: 'Architecture', format: 'Course', date: '21 Oct 2026' },
    { id: 'designing-a-hybrid-architecture', title: 'Designing a Hybrid Architecture', track: 'Architecture', format: 'Course', date: '21 Oct 2026' },
    { id: 'designing-a-serverless-architecture-with', title: 'Designing a Serverless Architecture with Event-Driven Microservices', track: 'Architecture', format: 'Course', date: '21 Oct 2026' },
    { id: 'designing-a-data-driven-architecture', title: 'Designing a Data-Driven Architecture', track: 'Architecture', format: 'Course', date: '21 Oct 2026' },
    { id: 'solutions-architect-summary-and-resource', title: 'Solutions Architect: Summary and Resources', track: 'Architecture', format: 'Course', date: '21 Oct 2026' },
    { id: 'resilient-and-compliant-loan-processing', title: 'Meeting Simulator: Resilient and Compliant Loan Processing Applications', track: 'Architecture', format: 'Simulator', date: '21 Oct 2026' },
    { id: 'fundamentals-of-security-on-aws', title: 'Fundamentals of Security on AWS', track: 'Security', format: 'Course', date: '15 Oct 2026' },
    { id: 'core-security-concepts', title: 'SimuLearn: Core Security Concepts', track: 'Security', format: 'SimuLearn', date: '15 Oct 2026' },
    { id: 'introduction-to-aws-identity-and-access', title: 'Introduction to AWS Identity and Access Management (IAM)', track: 'Security', format: 'Course', date: '15 Oct 2026' },
    { id: 'securing-a-three-tiered-architecture', title: 'SimuLearn: Securing a Three-Tiered Architecture', track: 'Security', format: 'SimuLearn', date: '15 Oct 2026' },
    { id: 'securing-hybrid-access', title: 'SimuLearn: Securing Hybrid Access', track: 'Security', format: 'SimuLearn', date: '22 Oct 2026' },
    { id: 'resource-governance', title: 'SimuLearn: Resource Governance', track: 'Security', format: 'SimuLearn', date: '21 Oct 2026' },
    { id: 'automate-infrastructure-compliance-with', title: 'Lab: Automate Infrastructure Compliance with AWS Config', track: 'Security', format: 'Lab', date: '21 Oct 2026' },
    { id: 'networking-concepts', title: 'SimuLearn: Networking Concepts', track: 'Networking', format: 'SimuLearn', date: '15 Oct 2026' },
    { id: 'dns', title: 'SimuLearn: DNS', track: 'Networking', format: 'SimuLearn', date: '21 Oct 2026' },
    { id: 'content-delivery-networks', title: 'SimuLearn: Content Delivery Networks', track: 'Networking', format: 'SimuLearn', date: '21 Oct 2026' },
    { id: 'cloud-computing-essentials', title: 'SimuLearn: Cloud Computing Essentials', track: 'Compute', format: 'SimuLearn', date: '15 Oct 2026' },
    { id: 'computing-solutions', title: 'SimuLearn: Computing Solutions', track: 'Compute', format: 'SimuLearn', date: '15 Oct 2026' },
    { id: 'single-page-app', title: 'SimuLearn: Single-Page App', track: 'Compute', format: 'SimuLearn', date: '15 Oct 2026' },
    { id: 'container-services', title: 'SimuLearn: Container Services', track: 'Compute', format: 'SimuLearn', date: '21 Oct 2026' },
    { id: 'working-with-amazon-elastic-container-se', title: 'Working with Amazon Elastic Container Service', track: 'Compute', format: 'Course', date: '21 Oct 2026' },
    { id: 'serverless-foundations', title: 'SimuLearn: Serverless Foundations', track: 'Serverless', format: 'SimuLearn', date: '22 Oct 2026' },
    { id: 'decoupling-applications', title: 'SimuLearn: Decoupling Applications', track: 'Serverless', format: 'SimuLearn', date: '23 Oct 2026' },
    { id: 'event-driven-architecture-with-api-gatew', title: 'Event Driven Architecture with API Gateway, EventBridge and Lambda', track: 'Serverless', format: 'Lab', date: '21 Oct 2026' },
    { id: 'serverless-architecture-with-sns-sqs-and', title: 'Serverless Architecture with SNS, SQS and Lambda', track: 'Serverless', format: 'Lab', date: '21 Oct 2026' },
    { id: 'monitoring-micro-service-architectures-w', title: 'Lab: Monitoring Micro-Service Architectures with X-Ray and CloudWatch', track: 'Serverless', format: 'Lab', date: '21 Oct 2026' },
    { id: 'databases-in-practice', title: 'SimuLearn: Databases in Practice', track: 'Data', format: 'SimuLearn', date: '15 Oct 2026' },
    { id: 'federated-queries', title: 'SimuLearn: Federated Queries', track: 'Data', format: 'SimuLearn', date: '26 Oct 2026' },
    { id: 'data-lakes', title: 'SimuLearn: Data Lakes', track: 'Data', format: 'SimuLearn', date: '26 Oct 2026' },
];

export const awsTracks = ['All', 'Architecture', 'Security', 'Networking', 'Compute', 'Serverless', 'Data'];
