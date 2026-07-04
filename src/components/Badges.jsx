import React from 'react';
import { motion } from 'framer-motion';
import { FiExternalLink } from 'react-icons/fi';
import { SiGooglecloud } from 'react-icons/si';
import useReadFocus from '../hooks/useReadFocus';

const badgesData = [
    { link: "https://www.skills.google/public_profiles/def0927f-d367-48bf-9f53-66ef92b98bc9/badges/18978325", title: "Basics of Google Cloud Compute" },
    { link: "https://www.skills.google/public_profiles/def0927f-d367-48bf-9f53-66ef92b98bc9/badges/18984395", title: "Get Started with Cloud Storage" },
    { link: "https://www.skills.google/public_profiles/def0927f-d367-48bf-9f53-66ef92b98bc9/badges/18986027", title: "Get Started with Pub/Sub" },
    { link: "https://www.skills.google/public_profiles/def0927f-d367-48bf-9f53-66ef92b98bc9/badges/19043233", title: "Get Started with API Gateway" },
    { link: "https://www.skills.google/public_profiles/def0927f-d367-48bf-9f53-66ef92b98bc9/badges/19044490", title: "Get Started with Looker" },
    { link: "https://www.skills.google/public_profiles/def0927f-d367-48bf-9f53-66ef92b98bc9/badges/19046820", title: "Get Started with Dataplex" },
    { link: "https://www.skills.google/public_profiles/def0927f-d367-48bf-9f53-66ef92b98bc9/badges/19114458", title: "Google Workspace Tools" },
    { link: "https://www.skills.google/public_profiles/def0927f-d367-48bf-9f53-66ef92b98bc9/badges/19116305", title: "App Building with AppSheet" },
    { link: "https://www.skills.google/public_profiles/def0927f-d367-48bf-9f53-66ef92b98bc9/badges/19158100", title: "Apps Script and AppSheet" },
    { link: "https://www.skills.google/public_profiles/def0927f-d367-48bf-9f53-66ef92b98bc9/badges/19163575", title: "Build Website on Google Cloud" },
    { link: "https://www.skills.google/public_profiles/def0927f-d367-48bf-9f53-66ef92b98bc9/badges/19233064", title: "Google Cloud Network" },
    { link: "https://www.skills.google/public_profiles/def0927f-d367-48bf-9f53-66ef92b98bc9/badges/19234413", title: "Data on GCP" },
    { link: "https://www.skills.google/public_profiles/def0927f-d367-48bf-9f53-66ef92b98bc9/badges/19292028", title: "App Engine: 3 Ways" },
    { link: "https://www.skills.google/public_profiles/def0927f-d367-48bf-9f53-66ef92b98bc9/badges/19293340", title: "Cloud Speech API: 3 Ways" },
    { link: "https://www.skills.google/public_profiles/def0927f-d367-48bf-9f53-66ef92b98bc9/badges/19318312", title: "Monitoring in Google Cloud" },
    { link: "https://www.skills.google/public_profiles/def0927f-d367-48bf-9f53-66ef92b98bc9/badges/19319163", title: "Speech and Language APIs" },
    { link: "https://www.skills.google/public_profiles/def0927f-d367-48bf-9f53-66ef92b98bc9/badges/19350865", title: "Prompt Design in Vertex AI" },
    { link: "https://www.skills.google/public_profiles/def0927f-d367-48bf-9f53-66ef92b98bc9/badges/19352788", title: "Gen AI with Gemini" },
    { link: "https://www.skills.google/public_profiles/def0927f-d367-48bf-9f53-66ef92b98bc9/badges/19353172", title: "Cloud Run Functions" },
    { link: "https://www.skills.google/public_profiles/def0927f-d367-48bf-9f53-66ef92b98bc9/badges/19397972", title: "Level 3: Generative AI" },
];

const Badges = () => {
    const [focusRef, isReading] = useReadFocus();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05,
            },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.9 },
        visible: (index) => ({
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.6,
                delay: (index % 4) * 0.08,
                ease: [0.16, 1, 0.3, 1],
            },
        }),
    };

    return (
        <section id="badges" ref={focusRef} className={`badges-section ${isReading ? 'is-reading' : ''}`}>
            <div className="container">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="section-label">Google Cloud</span>
                    <h2 className="section-title">Skill Badges</h2>
                    <p className="section-subtitle">
                        Hands-on experience with Google Cloud Platform
                    </p>
                </motion.div>

                <motion.div
                    className="badges-grid"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-80px' }}
                    variants={containerVariants}
                >
                    {badgesData.map((badge, index) => (
                        <motion.a
                            key={index}
                            href={badge.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="badge-card glass-card"
                            custom={index}
                            variants={cardVariants}
                            whileHover={{
                                y: -8,
                                scale: 1.05,
                                boxShadow: '0 16px 50px rgba(66, 133, 244, 0.15)',
                                transition: { duration: 0.3 }
                            }}
                        >
                            <motion.div
                                className="badge-icon"
                                whileHover={{
                                    rotate: [0, -10, 10, -10, 0],
                                    scale: 1.1
                                }}
                                transition={{ duration: 0.5 }}
                            >
                                <SiGooglecloud size={36} />
                            </motion.div>
                            <h3>{badge.title}</h3>
                            <motion.span
                                className="badge-link"
                                whileHover={{ x: 4 }}
                                transition={{ duration: 0.2 }}
                            >
                                View <FiExternalLink />
                            </motion.span>
                        </motion.a>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Badges;