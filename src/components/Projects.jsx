import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiExternalLink, FiGithub, FiUploadCloud } from 'react-icons/fi';
import sangeetImage from '../assets/Gemini_Generated_Image_hjr2lhjr2lhjr2lh.png';
import useReadFocus from '../hooks/useReadFocus';

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

const easing = [0.22, 1, 0.36, 1];

const ProjectModal = ({ project, onClose, screenshots, onUpload }) => {
    const fileInputRef = useRef(null);

    const handleFileUpload = (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        const newImages = files.map((file) => ({
            id: URL.createObjectURL(file),
            url: URL.createObjectURL(file),
            name: file.name,
        }));

        onUpload(project.id, newImages);
    };

    return createPortal(
        <motion.div
            className="project-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: easing }}
            onClick={onClose}
        >
            <motion.div
                className="project-modal"
                data-lenis-prevent
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.5, ease: easing }}
                onClick={(e) => e.stopPropagation()}
            >
                <button className="modal-close" onClick={onClose} aria-label="Close">
                    <FiX size={20} />
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
                                    transition={{ delay: 0.2 + index * 0.05, duration: 0.4, ease: easing }}
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
                                    className="tech-tag"
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.3 + index * 0.04, duration: 0.4, ease: easing }}
                                >
                                    {tech}
                                </motion.span>
                            ))}
                        </div>
                    </div>

                    <div className="modal-section">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                            <h3 style={{ margin: 0 }}>Project Screenshots</h3>
                            <button
                                onClick={() => fileInputRef.current.click()}
                                className="btn btn-secondary"
                                style={{ padding: '0.5rem 1.1rem', fontSize: '0.85rem' }}
                            >
                                <FiUploadCloud /> Upload
                            </button>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileUpload}
                                multiple
                                accept="image/*"
                                style={{ display: 'none' }}
                            />
                        </div>

                        {screenshots && screenshots.length > 0 ? (
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '0.75rem' }}>
                                {screenshots.map((img) => (
                                    <motion.div
                                        key={img.id}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        style={{
                                            aspectRatio: '4/3',
                                            borderRadius: 'var(--radius-sm)',
                                            overflow: 'hidden',
                                            border: '1px solid var(--glass-border)',
                                        }}
                                    >
                                        <img src={img.url} alt={img.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            <div
                                style={{
                                    background: 'var(--glass-bg)',
                                    padding: '2rem 1rem',
                                    borderRadius: 'var(--radius-md)',
                                    textAlign: 'center',
                                    color: 'var(--text-muted)',
                                    border: '1px dashed var(--border-default)',
                                }}
                            >
                                <p style={{ margin: 0, fontSize: '0.9rem' }}>No screenshots uploaded for this project.</p>
                            </div>
                        )}
                    </div>

                    <div className="modal-actions">
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                            <FiGithub /> View Source
                        </a>
                        {project.demo !== '#' && (
                            <a href={project.demo} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                                <FiExternalLink /> Live Demo
                            </a>
                        )}
                    </div>
                </div>
            </motion.div>
        </motion.div>,
        document.body
    );
};

const Projects = () => {
    const [focusRef, isReading] = useReadFocus();
    const [selectedProject, setSelectedProject] = useState(null);
    const [screenshotsByProject, setScreenshotsByProject] = useState({});

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

    const handleUpload = (projectId, newImages) => {
        setScreenshotsByProject((prev) => ({
            ...prev,
            [projectId]: [...(prev[projectId] || []), ...newImages],
        }));
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: easing },
        },
    };

    return (
        <>
            <section
                id="projects"
                ref={focusRef}
                className={`projects-section ${isReading ? 'is-reading' : ''}`}
            >
                <div className="container container-wide">
                    <motion.div
                        className="section-header"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: easing }}
                    >
                        <span className="section-label">Portfolio</span>
                        <h2 className="section-title">Selected Works</h2>
                        <p className="section-subtitle">
                            A showcase of recent technical explorations and shipped products.
                        </p>
                    </motion.div>

                    <motion.div
                        className="projects-grid"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-100px' }}
                        variants={containerVariants}
                    >
                        {projectsData.map((project) => (
                            <motion.article
                                key={project.id}
                                className="project-card"
                                variants={cardVariants}
                                onClick={() => setSelectedProject(project)}
                                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                            >
                                <div className="project-image-wrapper">
                                    <motion.img
                                        src={project.image}
                                        alt={project.title}
                                        className="project-image"
                                        whileHover={{ scale: 1.06 }}
                                        transition={{ duration: 0.6, ease: easing }}
                                    />
                                    <div className="project-overlay">
                                        <span>View Project</span>
                                    </div>
                                </div>
                                <div className="project-content">
                                    <span className="project-status">{project.status}</span>
                                    <h3>{project.title}</h3>
                                    <p>{project.shortDescription}</p>
                                    <div className="project-tech">
                                        {project.tech.slice(0, 3).map((tech, techIndex) => (
                                            <span className="tech-tag" key={techIndex}>{tech}</span>
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
                        screenshots={screenshotsByProject[selectedProject.id] || []}
                        onUpload={handleUpload}
                    />
                )}
            </AnimatePresence>
        </>
    );
};

export default Projects;