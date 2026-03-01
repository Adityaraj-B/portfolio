import React from 'react';
import { motion } from 'framer-motion';
import {
    SiC, SiCplusplus, SiPython, SiJavascript, SiDart,
    SiHtml5, SiCss3, SiReact, SiFlutter,
    SiGooglecloud, SiGit, SiGithub, SiLinux, SiFirebase
} from 'react-icons/si';
import { TbApi, TbBinaryTree } from 'react-icons/tb';
import { FiDatabase } from 'react-icons/fi';

const skillCategories = [
    {
        title: 'Languages',
        skills: [
            { icon: <SiC />, name: 'C' },
            { icon: <SiCplusplus />, name: 'C++' },
            { icon: <SiPython />, name: 'Python' },
            { icon: <SiJavascript />, name: 'JavaScript' },
            { icon: <SiDart />, name: 'Dart' },
        ],
    },
    {
        title: 'Frontend',
        skills: [
            { icon: <SiHtml5 />, name: 'HTML5' },
            { icon: <SiCss3 />, name: 'CSS3' },
            { icon: <SiReact />, name: 'React' },
            { icon: <SiFlutter />, name: 'Flutter' },
        ],
    },
    {
        title: 'Backend & Cloud',
        skills: [
            { icon: <SiGooglecloud />, name: 'GCP' },
            { icon: <SiFirebase />, name: 'Firebase' },
            { icon: <TbApi />, name: 'REST APIs' },
            { icon: <FiDatabase />, name: 'Databases' },
        ],
    },
    {
        title: 'Tools & Core',
        skills: [
            { icon: <SiGit />, name: 'Git' },
            { icon: <SiGithub />, name: 'GitHub' },
            { icon: <TbBinaryTree />, name: 'Data Science & Algorithms' },
        ],
    },
];

const Skills = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.1,
            },
        },
    };

    const categoryVariants = {
        hidden: { opacity: 0, x: -30 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
                staggerChildren: 0.06,
            },
        },
    };

    const tagVariants = {
        hidden: { opacity: 0, scale: 0.85, y: 20 },
        visible: (index) => ({
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                duration: 0.5,
                delay: index * 0.05,
                ease: [0.16, 1, 0.3, 1],
            },
        }),
    };

    return (
        <section id="skills" className="skills-section">
            <div className="container">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="section-label">Expertise</span>
                    <h2 className="section-title">Technical Skills</h2>
                    <p className="section-subtitle">
                        Technologies and tools I use to bring ideas to life
                    </p>
                </motion.div>

                <motion.div
                    className="skills-categories"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-80px' }}
                    variants={containerVariants}
                >
                    {skillCategories.map((category, catIndex) => (
                        <motion.div
                            className="skill-category"
                            key={catIndex}
                            variants={categoryVariants}
                        >
                            <h3 className="skill-category-title">{category.title}</h3>
                            <div className="skill-tags">
                                {category.skills.map((skill, skillIndex) => (
                                    <motion.span
                                        className="skill-tag glass-card"
                                        key={skillIndex}
                                        custom={skillIndex}
                                        variants={tagVariants}
                                        whileHover={{
                                            y: -6,
                                            scale: 1.08,
                                            boxShadow: '0 12px 40px rgba(192, 192, 200, 0.15)',
                                            borderColor: 'var(--accent-primary)',
                                            transition: { duration: 0.2 }
                                        }}
                                    >
                                        <span className="skill-tag-icon">{skill.icon}</span>
                                        {skill.name}
                                    </motion.span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Skills;