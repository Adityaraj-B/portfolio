import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiExternalLink, FiGithub, FiUploadCloud } from 'react-icons/fi';
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

const glassStyle = {
    background: 'var(--glass-bg)',
    backdropFilter: 'var(--glass-blur)',
    WebkitBackdropFilter: 'var(--glass-blur)',
    border: 'none',
    boxShadow: 'var(--glass-glow)',
    borderRadius: 'var(--radius-lg)',
};

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
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 9999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem',
                background: 'rgba(0, 0, 0, 0.6)',
                backdropFilter: 'blur(12px)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: easing }}
            onClick={onClose}
        >
            <motion.div
                data-lenis-prevent
                style={{
                    ...glassStyle,
                    position: 'relative',
                    width: '100%',
                    maxWidth: '900px',
                    maxHeight: '90vh',
                    borderRadius: '24px',
                    color: '#fff',
                    overflowY: 'auto',
                    WebkitOverflowScrolling: 'touch',
                }}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.5, ease: easing }}
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '1.5rem',
                        right: '1.5rem',
                        background: 'rgba(255,255,255,0.1)',
                        border: 'none',
                        borderRadius: '50%',
                        width: '40px',
                        height: '40px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff',
                        cursor: 'pointer',
                        zIndex: 10,
                        backdropFilter: 'blur(8px)',
                    }}
                >
                    <FiX size={20} />
                </button>

                <div style={{ position: 'relative', width: '100%', height: '300px', flexShrink: 0, overflow: 'hidden' }}>
                    <div
                        style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'linear-gradient(to top, rgba(10,10,12,1) 0%, transparent 100%)',
                            zIndex: 1,
                        }}
                    />
                    <img
                        src={project.image}
                        alt={project.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <span
                        style={{
                            position: 'absolute',
                            bottom: '1.5rem',
                            left: '2rem',
                            zIndex: 2,
                            background: 'rgba(255,255,255,0.15)',
                            padding: '6px 16px',
                            borderRadius: '20px',
                            fontSize: '0.85rem',
                            fontWeight: '600',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255,255,255,0.2)',
                            letterSpacing: '1px',
                            textTransform: 'uppercase',
                        }}
                    >
                        {project.status}
                    </span>
                </div>

                <div style={{ padding: '2.5rem', zIndex: 2 }}>
                    <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '1rem', letterSpacing: '-0.5px' }}>
                        {project.title}
                    </h2>
                    <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '2rem' }}>
                        {project.description}
                    </p>

                    <div style={{ marginBottom: '2.5rem' }}>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '1rem', color: '#fff' }}>
                            Key Features
                        </h3>
                        <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '0.8rem' }}>
                            {project.features.map((feature, index) => (
                                <motion.li
                                    key={index}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 + index * 0.05, duration: 0.4, ease: easing }}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'flex-start',
                                        color: 'rgba(255,255,255,0.85)',
                                        fontSize: '1rem',
                                        lineHeight: '1.5',
                                    }}
                                >
                                    <span style={{ color: '#ffffff', marginRight: '12px', opacity: 0.5 }}>0{index + 1}</span>
                                    {feature}
                                </motion.li>
                            ))}
                        </ul>
                    </div>

                    <div style={{ marginBottom: '3rem' }}>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '1rem', color: '#fff' }}>
                            Technologies
                        </h3>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                            {project.tech.map((tech, index) => (
                                <motion.span
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.3 + index * 0.04, duration: 0.4, ease: easing }}
                                    style={{
                                        background: 'rgba(255,255,255,0.05)',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        padding: '8px 16px',
                                        borderRadius: '12px',
                                        fontSize: '0.9rem',
                                        color: 'rgba(255,255,255,0.9)',
                                    }}
                                >
                                    {tech}
                                </motion.span>
                            ))}
                        </div>
                    </div>

                    <div style={{ marginBottom: '3rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h3 style={{ fontSize: '1.2rem', fontWeight: '600', color: '#fff', margin: 0 }}>
                                Project Screenshots
                            </h3>
                            <button
                                onClick={() => fileInputRef.current.click()}
                                style={{
                                    background: 'rgba(255,255,255,0.1)',
                                    padding: '8px 16px',
                                    borderRadius: '10px',
                                    color: '#fff',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    cursor: 'pointer',
                                    border: '1px solid rgba(255,255,255,0.2)',
                                    fontWeight: '500',
                                    fontSize: '0.9rem',
                                    transition: 'background 0.3s ease'
                                }}
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
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem' }}>
                                {screenshots.map((img) => (
                                    <motion.div
                                        key={img.id}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        style={{
                                            height: '140px',
                                            borderRadius: '12px',
                                            overflow: 'hidden',
                                            position: 'relative',
                                            border: '1px solid rgba(255,255,255,0.1)',
                                        }}
                                    >
                                        <img src={img.url} alt={img.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            <div style={{
                                background: 'rgba(255,255,255,0.02)',
                                padding: '2.5rem 1rem',
                                borderRadius: '16px',
                                textAlign: 'center',
                                color: 'rgba(255,255,255,0.4)',
                                border: '1px dashed rgba(255,255,255,0.15)'
                            }}>
                                <p style={{ margin: 0, fontSize: '0.95rem' }}>No screenshots uploaded for this project.</p>
                            </div>
                        )}
                    </div>

                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                ...glassStyle,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '12px 24px',
                                borderRadius: '12px',
                                color: '#fff',
                                textDecoration: 'none',
                                fontWeight: '500',
                                transition: 'all 0.3s ease',
                            }}
                        >
                            <FiGithub /> View Source
                        </a>
                        {project.demo !== '#' && (
                            <a
                                href={project.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    background: '#fff',
                                    color: '#000',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    padding: '12px 24px',
                                    borderRadius: '12px',
                                    textDecoration: 'none',
                                    fontWeight: '600',
                                    transition: 'all 0.3s ease',
                                }}
                            >
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
            <section id="projects" style={{ padding: '8rem 2rem', position: 'relative', zIndex: 10 }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: easing }}
                        style={{ textAlign: 'center', marginBottom: '5rem' }}
                    >
                        <span style={{ color: 'rgba(255,255,255,0.5)', letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.85rem' }}>
                            Portfolio
                        </span>
                        <h2 style={{ fontSize: '3.5rem', fontWeight: '700', margin: '1rem 0', color: '#fff', letterSpacing: '-1px' }}>
                            Selected Works
                        </h2>
                        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
                            A showcase of recent technical explorations and shipped products.
                        </p>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-100px' }}
                        variants={containerVariants}
                        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2.5rem', marginBottom: '5rem' }}
                    >
                        {projectsData.map((project) => (
                            <motion.article
                                key={project.id}
                                variants={cardVariants}
                                onClick={() => setSelectedProject(project)}
                                style={{
                                    ...glassStyle,
                                    borderRadius: '24px',
                                    overflow: 'hidden',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    color: '#fff',
                                }}
                                whileHover={{
                                    y: -8,
                                    background: 'var(--glass-bg-hover)',
                                    boxShadow: 'var(--glass-glow-hover)',
                                    border: 'none',
                                    transition: { duration: 0.4, ease: easing },
                                }}
                            >
                                <div style={{ height: '240px', overflow: 'hidden', position: 'relative' }}>
                                    <motion.img
                                        src={project.image}
                                        alt={project.title}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0.6, ease: easing }}
                                    />
                                    <div style={{
                                        position: 'absolute',
                                        inset: 0,
                                        background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)',
                                        opacity: 0.6,
                                    }} />
                                </div>
                                <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                                    <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.8rem' }}>
                                        {project.status}
                                    </span>
                                    <h3 style={{ fontSize: '1.4rem', fontWeight: '600', marginBottom: '1rem', lineHeight: '1.3' }}>
                                        {project.title}
                                    </h3>
                                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.5rem', flexGrow: 1 }}>
                                        {project.shortDescription}
                                    </p>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                        {project.tech.slice(0, 3).map((tech, techIndex) => (
                                            <span
                                                key={techIndex}
                                                style={{
                                                    background: 'rgba(255,255,255,0.05)',
                                                    border: '1px solid rgba(255,255,255,0.08)',
                                                    padding: '6px 12px',
                                                    borderRadius: '8px',
                                                    fontSize: '0.8rem',
                                                    color: 'rgba(255,255,255,0.8)',
                                                }}
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                        {project.tech.length > 3 && (
                                            <span style={{
                                                background: 'rgba(255,255,255,0.02)',
                                                border: '1px dashed rgba(255,255,255,0.2)',
                                                padding: '6px 12px',
                                                borderRadius: '8px',
                                                fontSize: '0.8rem',
                                                color: 'rgba(255,255,255,0.5)',
                                            }}>
                                                +{project.tech.length - 3}
                                            </span>
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