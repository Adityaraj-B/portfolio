import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiDownload } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Hero = () => {

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.12,
                delayChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
            },
        },
    };

    return (
        <header className="hero">
            <motion.div
                className="hero-content"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div className="hero-badge" variants={itemVariants}>
                    <span className="hero-badge-dot" />
                    Available for opportunities
                </motion.div>

                <motion.h1 className="hero-name" variants={itemVariants}>
                    Adityaraj Bagwan
                </motion.h1>

                <motion.h2 className="hero-title" variants={itemVariants}>
                    Software Engineer & <span className="highlight">Cloud Enthusiast</span>
                </motion.h2>

                <motion.p className="hero-description" variants={itemVariants}>
                    Undergraduate at Vishwakarma University, Pune. I build beautiful
                    mobile experiences with Flutter and explore the frontiers of
                    AI & Cloud Computing.
                </motion.p>

                <motion.div className="hero-cta" variants={itemVariants}>
                    <a href="#about" className="btn btn-primary">
                        View My Work <FiArrowRight />
                    </a>
                    <Link to="/resume" className="btn btn-secondary">
                        <FiDownload /> Resume
                    </Link>
                </motion.div>
            </motion.div>

            <motion.div
                className="scroll-indicator"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.8 }}
            >
                <span>Scroll</span>
                <div className="scroll-indicator-line" />
            </motion.div>
        </header>
    );
};

export default Hero;