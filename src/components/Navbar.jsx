import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);

            // Track active section on homepage
            if (location.pathname === '/') {
                const sections = ['about', 'skills', 'projects', 'certifications', 'badges', 'contact'];
                let current = '';
                for (const id of sections) {
                    const el = document.getElementById(id);
                    if (el) {
                        const rect = el.getBoundingClientRect();
                        if (rect.top <= 200) {
                            current = id;
                        }
                    }
                }
                setActiveSection(current);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [location.pathname]);

    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    // Smooth scroll to section with buttery easing
    const scrollToSection = useCallback((e, href) => {
        e.preventDefault();

        // If on another page, navigate home first then scroll
        if (location.pathname !== '/') {
            navigate('/');
            // Delay scroll until after navigation
            setTimeout(() => {
                const id = href.replace('/#', '');
                const el = document.getElementById(id);
                if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 100);
            return;
        }

        const id = href.replace('/#', '').replace('#', '');
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        setIsOpen(false);
    }, [location.pathname, navigate]);

    const navLinks = [
        { href: '/#about', label: 'About', sectionId: 'about' },
        { href: '/#skills', label: 'Skills', sectionId: 'skills' },
        { href: '/#projects', label: 'Projects', sectionId: 'projects' },
        { href: '/#certifications', label: 'Credentials', sectionId: 'certifications' },
        { href: '/resume', label: 'Resume', isRoute: true },
    ];

    const linkVariants = {
        hidden: { opacity: 0, y: -8 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: 0.05 * i,
                duration: 0.4,
                ease: [0.16, 1, 0.3, 1],
            },
        }),
    };

    return (
        <motion.nav
            className={`navbar ${scrolled ? 'scrolled' : ''}`}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
            <div className="nav-container">
                <Link to="/" className="nav-logo">
                    adityaraj
                </Link>

                <ul className={`nav-menu ${isOpen ? 'active' : ''}`}>
                    {navLinks.map((link, index) => (
                        <motion.li
                            className={`nav-item ${
                                !link.isRoute && activeSection === link.sectionId ? 'active' : ''
                            } ${link.isRoute && location.pathname === '/resume' ? 'active' : ''}`}
                            key={index}
                            custom={index}
                            variants={linkVariants}
                            initial="hidden"
                            animate="visible"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.2 }}
                        >
                            {link.isRoute ? (
                                <Link to={link.href}>{link.label}</Link>
                            ) : (
                                <a
                                    href={link.href}
                                    onClick={(e) => scrollToSection(e, link.href)}
                                >
                                    {link.label}
                                </a>
                            )}
                            {/* Active indicator dot */}
                            <AnimatePresence>
                                {((!link.isRoute && activeSection === link.sectionId) ||
                                    (link.isRoute && location.pathname === '/resume')) && (
                                    <motion.div
                                        className="nav-active-indicator"
                                        layoutId="activeNav"
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0 }}
                                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                    />
                                )}
                            </AnimatePresence>
                        </motion.li>
                    ))}
                </ul>

                <div className="nav-right">
                    <motion.a
                        href="#contact"
                        className="contact-btn"
                        onClick={(e) => scrollToSection(e, '#contact')}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                    >
                        Let's Talk
                    </motion.a>
                    <ThemeToggle />
                    <button
                        className={`nav-toggle ${isOpen ? 'active' : ''}`}
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle navigation"
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </div>
        </motion.nav>
    );
};

export default Navbar;