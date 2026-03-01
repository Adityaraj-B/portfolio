import React from 'react';
import { motion } from 'framer-motion';
import hackathonCert from '../assets/1741067205758.jpeg';
import ids from '../assets/Screenshot 2025-09-21 000538.png';
import fdt from '../assets/img.png';
import dsf from '../assets/img_1.png';
import bdv from '../assets/img_2.png';

const certificationsData = [
    {
        image: hackathonCert,
        title: 'National Level Hackathon',
        description: 'Organized by the Innovation Foundation. Awarded for developing an innovative solution.',
    },
    {
        image: ids,
        title: 'Introduction to Data Science',
        description: 'LinkedIn Learning Certificate',
    },
    {
        image: fdt,
        title: 'Fundamentals of Data Transformation',
        description: 'LinkedIn Learning - Data Engineering',
    },
    {
        image: dsf,
        title: 'Data Science Foundations',
        description: 'LinkedIn Learning Certificate',
    },
    {
        image: bdv,
        title: 'Data Visualization Analysis',
        description: 'LinkedIn Learning Certificate',
    },
];

const Certifications = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.12,
            },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, x: -40, scale: 0.95 },
        visible: (index) => ({
            opacity: 1,
            x: 0,
            scale: 1,
            transition: {
                duration: 0.7,
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1],
            },
        }),
    };

    return (
        <section id="certifications" className="certifications-section">
            <div className="container">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="section-label">Achievements</span>
                    <h2 className="section-title">Certifications</h2>
                </motion.div>

                <motion.div
                    className="certifications-list"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-80px' }}
                    variants={containerVariants}
                >
                    {certificationsData.map((cert, index) => (
                        <motion.div
                            className="certificate-card glass-card"
                            key={index}
                            custom={index}
                            variants={cardVariants}
                            whileHover={{
                                x: 12,
                                scale: 1.02,
                                boxShadow: '0 16px 50px rgba(192, 192, 200, 0.12)',
                                transition: { duration: 0.3 }
                            }}
                        >
                            <motion.img
                                src={cert.image}
                                alt={cert.title}
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.4 }}
                            />
                            <div className="certificate-info">
                                <h3>{cert.title}</h3>
                                <p>{cert.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Certifications;