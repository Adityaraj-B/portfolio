import React from 'react';
import { motion } from 'framer-motion';
import { FiLinkedin, FiGithub, FiMail } from 'react-icons/fi';

const Footer = () => {
    const socialLinks = [
        {
            href: 'http://www.linkedin.com/in/adityaraj-bagwan-07464a320',
            icon: <FiLinkedin />,
            label: 'LinkedIn'
        },
        {
            href: 'https://github.com/Adityaraj-B',
            icon: <FiGithub />,
            label: 'GitHub'
        },
        {
            href: 'mailto:adityarajb7@rediffmail.com',
            icon: <FiMail />,
            label: 'Email'
        },
    ];

    return (
        <motion.footer
            id="contact"
            className="footer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
            <div className="container">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1, duration: 0.6 }}
                >
                    <span className="section-label">Contact</span>
                    <h2 className="section-title">Let's Connect</h2>
                </motion.div>

                <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                >
                    Open for collaborations and opportunities
                </motion.h3>

                <motion.div
                    className="social-icons"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                >
                    {socialLinks.map((link, index) => (
                        <motion.a
                            key={index}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={link.label}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 + index * 0.1, duration: 0.4 }}
                            whileHover={{
                                y: -6,
                                rotate: [0, -5, 5, 0],
                                boxShadow: '0 12px 40px rgba(168, 85, 247, 0.25)',
                                transition: { duration: 0.3 }
                            }}
                        >
                            {link.icon}
                        </motion.a>
                    ))}
                </motion.div>

                <motion.div
                    className="footer-bottom"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                >
                    <h3>
                        Designed & Built by Adityaraj Bagwan
                        <br />
                        © {new Date().getFullYear()}
                    </h3>
                </motion.div>
            </div>
        </motion.footer>
    );
};

export default Footer;