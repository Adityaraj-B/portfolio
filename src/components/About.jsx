import React from 'react';
import { motion } from 'framer-motion';
import profile from '../assets/pic.jpeg';

const About = () => {
    const stats = [
        { value: '8.53', label: 'CGPA' },
        { value: '20+', label: 'Badges' },
        { value: 'B.Tech', label: 'CS Engineering' },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.12,
                delayChildren: 0.15,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
            },
        },
    };

    const statVariants = {
        hidden: { opacity: 0, scale: 0.8, y: 20 },
        visible: (index) => ({
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1],
            },
        }),
    };

    return (
        <section id="about" className="about-section">
            <div className="container">
                <motion.div
                    className="about-grid"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                    variants={containerVariants}
                >
                    <motion.div className="about-visual" variants={itemVariants}>
                        <motion.div
                            className="about-image-container glass-card"
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <motion.img
                                src={profile}
                                alt="Adityaraj Bagwan"
                                className="about-image"
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            />
                        </motion.div>
                    </motion.div>

                    <div className="about-content">
                        <motion.div variants={itemVariants}>
                            <span className="section-label">About</span>
                            <h2 className="section-title">
                                Building the future,<br />one line at a time
                            </h2>
                        </motion.div>

                        <motion.p variants={itemVariants}>
                            I'm a Computer Science undergraduate at <strong>Vishwakarma University, Pune</strong>,
                            passionate about creating accessible and user-friendly digital experiences. My journey
                            spans both front-end elegance and back-end robustness.
                        </motion.p>

                        <motion.p variants={itemVariants}>
                            My focus areas include Object-Oriented Programming, Data Structures & Algorithms,
                            Database Management, and AI & Machine Learning. I thrive on projects where design
                            meets thoughtful engineering.
                        </motion.p>

                        <motion.div className="about-stats" variants={itemVariants}>
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={index}
                                    className="stat-item glass-card"
                                    custom={index}
                                    variants={statVariants}
                                    whileHover={{
                                        y: -8,
                                        scale: 1.05,
                                        boxShadow: '0 20px 60px rgba(168, 85, 247, 0.15)',
                                        transition: { duration: 0.3 }
                                    }}
                                >
                                    <div className="stat-value">{stat.value}</div>
                                    <div className="stat-label">{stat.label}</div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;