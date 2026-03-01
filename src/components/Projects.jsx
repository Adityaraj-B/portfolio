import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiExternalLink, FiGithub } from 'react-icons/fi';
import sangeetImage from '../assets/Gemini_Generated_Image_hjr2lhjr2lhjr2lh.png';

const projectsData = [
    {
        id: 1,
        title: 'Sangeet — Enterprise Music Streaming Platform',
        shortDescription: 'Production-ready music streaming app with native audio engineering, cloud sync, and advanced security.',
        description: 'Built a production-grade music streaming platform with native background playback, Firebase-backed cloud synchronization, and biometric authentication. Features intelligent queue management, offline-first architecture, real-time listening analytics, and seamless API integrations for search and metadata.',
        tech: ['Flutter', 'Firebase', 'Provider', 'just_audio', 'REST APIs', 'Material Design 3'],
        status: 'Completed',
        image: sangeetImage,
        features: [
            'Native background playback with lock-screen controls',
            'Firebase Auth with biometric access (Face ID/Fingerprint)',
            'Offline-first data sync with Cloud Firestore',
            'Real-time listening insights and engagement tracking',
            'Intelligent queue management with shuffle support',
            'Audio lifecycle handling (calls, Bluetooth, device changes)',
        ],
        github: 'https://github.com/Adityaraj-B/Sangeet.git',
        demo: '#',
    },
    {
        id: 2,
        title: 'PainSense — AI-Powered Pain Assessment System',
        shortDescription: 'Clinical-grade AI platform for real-time pain monitoring in non-verbal patients using computer vision.',
        description: 'Developed for VIT Bhopal × Johns Hopkins University Health Hackathon 2026. AI-driven digital health platform providing real-time, objective pain assessment for ICU, neonatal, and cognitively impaired patients. Combines facial expression analysis with validated clinical scales (CPOT, Primal Face Pain Scale) for continuous monitoring.',
        tech: ['React', 'Vite', 'Computer Vision', 'Facial Landmark Detection', 'Action Units', 'Clinical AI'],
        status: 'Completed',
        image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop',
        features: [
            'Real-time facial expression analysis with 68+ landmarks',
            'Clinical scale mapping (CPOT, Primal Face Pain Scale)',
            'Automated Facial Action Unit (AU) detection',
            'Privacy-first edge inference architecture',
            'Real-time pain visualization and trend monitoring',
            'Alert system for sudden pain spikes',
        ],
        github: 'https://github.com/ManjiriKench/PainSense.git',
        demo: 'https://painsense-4ff16.web.app/',
    },
    {
        id: 3,
        title: 'Kisan Setu — Farmer Scheme Discovery Platform',
        shortDescription: 'Flutter app that surfaces government schemes, insurance & financial support for rural farmers using just 3 inputs.',
        description: 'Built for a national hackathon (AS-4 problem statement). Kisan Setu bridges the information gap for rural Indian farmers — enter State, Crops, and Land Size and the app auto-matches eligible government schemes (PM-KISAN, PMFBY, KCC, eNAM, PKVY) from a curated database. Includes a dedicated PMFBY crop insurance flow, KCC & loan screens, Gemini-powered AI chatbot, 7-day weather farming advisories, and full multilingual support (EN/HI/MR). Secured OTP auth and offline-first architecture make it accessible to low-literacy users.',
        tech: ['Flutter', 'Firebase', 'Gemini AI', 'Provider', 'Secure Storage', 'REST APIs'],
        status: 'Completed',
        image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=600&h=400&fit=crop',
        features: [
            'Profile-driven scheme matching using State + Crops + Land size',
            'Curated database: PM-KISAN, PMFBY, KCC, eNAM, PKVY & more',
            'Dedicated PMFBY insurance flow with step-by-step premium guidance',
            'KCC & loan screens with subsidy detail breakdowns',
            'Multilingual support — English, Hindi & Marathi',
            'Gemini AI chatbot for natural-language scheme queries',
            '7-day weather forecast with spray & irrigation advisories',
            'Offline-first with encrypted local storage for sensitive data',
        ],
        github: 'https://github.com/Adityaraj-B/KisanSetu.git',
        demo: '#',
    },
];

const ProjectModal = ({ project, onClose }) => {
    return createPortal(
        <motion.div
            className="project-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        >
            <motion.div
                className="project-modal"
                initial={{ opacity: 0, scale: 0.9, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 50 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                onClick={(e) => e.stopPropagation()}
            >
                <button className="modal-close" onClick={onClose} aria-label="Close modal">
                    <FiX />
                </button>

                <div className="modal-image-wrapper">
                    <img src={project.image} alt={project.title} className="modal-image" />
                    <span className="modal-status">{project.status}</span>
                </div>

                <div className="modal-content">
                    <h2>{project.title}</h2>
                    <p className="modal-description">{project.description}</p>

                    <div className="modal-section">
                        <h3>Key Features</h3>
                        <ul className="modal-features">
                            {project.features.map((feature, index) => (
                                <motion.li
                                    key={index}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05, duration: 0.4 }}
                                >
                                    {feature}
                                </motion.li>
                            ))}
                        </ul>
                    </div>

                    <div className="modal-section">
                        <h3>Technologies</h3>
                        <div className="modal-tech">
                            {project.tech.map((tech, index) => (
                                <motion.span
                                    key={index}
                                    className="tech-tag"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.04, duration: 0.3 }}
                                >
                                    {tech}
                                </motion.span>
                            ))}
                        </div>
                    </div>

                    <div className="modal-actions">
                        <a href={project.github} className="btn btn-secondary" target="_blank" rel="noopener noreferrer">
                            <FiGithub /> View Code
                        </a>
                        <a href={project.demo} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                            <FiExternalLink /> Live Demo
                        </a>
                    </div>
                </div>
            </motion.div>
        </motion.div>,
        document.body
    );
};

const Projects = () => {
    const [selectedProject, setSelectedProject] = useState(null);

    // Lock background scroll when modal is open
    useEffect(() => {
        if (selectedProject) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [selectedProject]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 50, rotateX: -10 },
        visible: {
            opacity: 1,
            y: 0,
            rotateX: 0,
            transition: {
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
            },
        },
    };

    return (
        <>
            <section id="projects" className="projects-section">
                <div className="container">
                    <motion.div
                        className="section-header"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="section-label">Portfolio</span>
                        <h2 className="section-title">Featured Projects</h2>
                        <p className="section-subtitle">
                            A selection of projects I've worked on recently
                        </p>
                    </motion.div>

                    <motion.div
                        className="projects-grid"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-50px' }}
                        variants={containerVariants}
                    >
                        {projectsData.map((project) => (
                            <motion.article
                                className="project-card glass-card"
                                key={project.id}
                                variants={cardVariants}
                                onClick={() => setSelectedProject(project)}
                                whileHover={{
                                    y: -12,
                                    rotateY: 2,
                                    rotateX: 1,
                                    scale: 1.02,
                                    boxShadow: '0 24px 80px rgba(192, 192, 200, 0.15)',
                                    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
                                }}
                                style={{ perspective: 1000 }}
                            >
                                <div className="project-image-wrapper">
                                    <motion.img
                                        src={project.image}
                                        alt={project.title}
                                        className="project-image"
                                        whileHover={{ scale: 1.1 }}
                                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                    />
                                    <div className="project-overlay">
                                        <span>View Details</span>
                                    </div>
                                </div>
                                <div className="project-content">
                                    <span className="project-status">{project.status}</span>
                                    <h3>{project.title}</h3>
                                    <p>{project.shortDescription}</p>
                                    <div className="project-tech">
                                        {project.tech.slice(0, 3).map((tech, techIndex) => (
                                            <motion.span
                                                key={techIndex}
                                                className="tech-tag"
                                                whileHover={{ scale: 1.1, y: -2 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                {tech}
                                            </motion.span>
                                        ))}
                                        {project.tech.length > 3 && (
                                            <span className="tech-tag">+{project.tech.length - 3}</span>
                                        )}
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </motion.div>
                </div>
            </section>

            <AnimatePresence>
                {selectedProject && (
                    <ProjectModal
                        project={selectedProject}
                        onClose={() => setSelectedProject(null)}
                    />
                )}
            </AnimatePresence>
        </>
    );
};

export default Projects;
