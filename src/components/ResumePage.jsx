import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiDownload, FiArrowLeft, FiExternalLink } from 'react-icons/fi';

const ResumePage = () => {
    return (
        <section className="resume-section">
            <div className="container">
                <motion.div
                    className="resume-container"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                    <motion.h2
                        className="section-title"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                    >
                        My <span className="gradient-text">Resume</span>
                    </motion.h2>

                    <motion.div
                        className="resume-actions"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                    >
                        <Link to="/" className="btn btn-secondary">
                            <FiArrowLeft /> Back to Home
                        </Link>
                        <a
                            href="/resume.pdf"
                            download="Adityaraj_Bagwan_Resume.pdf"
                            className="btn btn-primary"
                        >
                            <FiDownload /> Download Resume
                        </a>
                        <a
                            href="/resume.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-secondary"
                        >
                            <FiExternalLink /> Open in New Tab
                        </a>
                    </motion.div>

                    <motion.div
                        className="resume-viewer"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                    >
                        <object
                            data="/resume.pdf"
                            type="application/pdf"
                            width="100%"
                            height="100%"
                        >
                            <p>
                                Your browser doesn't support embedded PDFs.
                                <a href="/resume.pdf" download>Download the PDF</a> instead.
                            </p>
                        </object>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default ResumePage;
