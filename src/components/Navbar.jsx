import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { FiArrowUpRight, FiX, FiMenu } from 'react-icons/fi';
import { navLinks, profile } from '../data/profile';
import { useSmoothScroll } from '../lib/SmoothScroll';
import { useActiveSection, useScrollLock } from '../lib/hooks';
import { EASE, SPRING } from '../lib/motion';
import { useIntro } from '../context/IntroContext';
import avatar from '../assets/avatar.webp';
import ThemeToggle from './ThemeToggle';
import { Magnetic } from './ui/Interactive';

const sectionIds = navLinks.map((l) => l.id);

const Navbar = () => {
    const [condensed, setCondensed] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const { scrollY } = useScroll();
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const { scrollTo, toTop } = useSmoothScroll();
    const { done: play } = useIntro();
    const onHome = pathname === '/';
    const active = useActiveSection(sectionIds);
    const last = useRef(0);

    // Condense once the page moves; tuck the bar away while reading down and
    // bring it back on the first upward nudge. Both only set state when the
    // answer actually changes, so scrolling never re-renders the nav.
    useMotionValueEvent(scrollY, 'change', (v) => {
        const prev = last.current;
        last.current = v;
        setCondensed((c) => (v > 60) !== c ? v > 60 : c);
        const goingDown = v > prev && v - prev > 2;
        const goingUp = v < prev && prev - v > 2;
        if (goingDown && v > 320) setHidden((h) => (h ? h : true));
        else if (goingUp || v < 120) setHidden((h) => (h ? false : h));
    });

    useEffect(() => setMenuOpen(false), [pathname]);
    useScrollLock(menuOpen);

    useEffect(() => {
        const onKey = (e) => e.key === 'Escape' && setMenuOpen(false);
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, []);

    const goToSection = (e, id) => {
        e.preventDefault();
        setMenuOpen(false);
        if (!onHome) {
            navigate('/');
            // Wait for the home route to paint before seeking the target.
            requestAnimationFrame(() =>
                setTimeout(() => scrollTo(id), 120),
            );
            return;
        }
        scrollTo(id);
    };

    const goHome = (e) => {
        e.preventDefault();
        setMenuOpen(false);
        if (onHome) toTop();
        else navigate('/');
    };

    const shown = play && (!hidden || menuOpen);

    return (
        <>
            <motion.header
                className={`nav${condensed ? ' is-condensed' : ''}`}
                initial={{ y: -90, opacity: 0 }}
                animate={shown ? { y: 0, opacity: 1 } : { y: -110, opacity: 0 }}
                transition={{ duration: play ? 0.7 : 0.9, ease: EASE.out, delay: play && !hidden && !condensed ? 0.2 : 0 }}
            >
                <nav className="nav-inner" aria-label="Primary">
                    <a href="/" className="nav-brand" onClick={goHome} data-cursor="link">
                        <span className="nav-mark">
                            <img src={avatar} alt="" width="36" height="36" decoding="async" />
                        </span>
                        <span className="nav-brand-text">
                            <strong>{profile.firstName}</strong>
                            <span className="mono nav-brand-role">{profile.role}</span>
                        </span>
                    </a>

                    <ul className="nav-links">
                        {navLinks.map((link) => {
                            const isActive = onHome && active === link.id;
                            return (
                                <li key={link.id}>
                                    <a
                                        href={`/#${link.id}`}
                                        onClick={(e) => goToSection(e, link.id)}
                                        className={`nav-link${isActive ? ' is-active' : ''}`}
                                        data-cursor="hide"
                                    >
                                        {isActive ? (
                                            <motion.span
                                                layoutId="nav-pill"
                                                className="nav-pill"
                                                transition={SPRING.snappy}
                                            />
                                        ) : null}
                                        <span>{link.label}</span>
                                    </a>
                                </li>
                            );
                        })}
                    </ul>

                    <div className="nav-actions">
                        <ThemeToggle />
                        <Magnetic strength={0.2} className="nav-cta-wrap">
                            <Link to="/resume" className="btn btn-sm btn-primary" data-cursor="hide">
                                Résumé <FiArrowUpRight />
                            </Link>
                        </Magnetic>
                        <button
                            type="button"
                            className="nav-burger"
                            onClick={() => setMenuOpen((v) => !v)}
                            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                            aria-expanded={menuOpen}
                        >
                            {menuOpen ? <FiX /> : <FiMenu />}
                        </button>
                    </div>
                </nav>
            </motion.header>

            <AnimatePresence>
                {menuOpen ? (
                    <motion.div
                        className="nav-sheet"
                        initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
                        animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
                        exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
                        transition={{ duration: 0.6, ease: EASE.inOut }}
                    >
                        <ul className="nav-sheet-links">
                            {navLinks.map((link, i) => (
                                <motion.li
                                    key={link.id}
                                    initial={{ opacity: 0, y: 30, rotateX: -30 }}
                                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                                    style={{ transformPerspective: 800, transformOrigin: '0% 100%' }}
                                    transition={{
                                        delay: 0.18 + i * 0.07,
                                        duration: 0.6,
                                        ease: EASE.out,
                                    }}
                                >
                                    <a
                                        href={`/#${link.id}`}
                                        onClick={(e) => goToSection(e, link.id)}
                                        className="display"
                                    >
                                        <span className="mono nav-sheet-index">
                                            0{i + 1}
                                        </span>
                                        {link.label}
                                    </a>
                                </motion.li>
                            ))}
                            <motion.li
                                initial={{ opacity: 0, y: 30, rotateX: -30 }}
                                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                                style={{ transformPerspective: 800, transformOrigin: '0% 100%' }}
                                transition={{
                                    delay: 0.18 + navLinks.length * 0.07,
                                    duration: 0.6,
                                    ease: EASE.out,
                                }}
                            >
                                <Link to="/resume" className="display">
                                    <span className="mono nav-sheet-index">
                                        0{navLinks.length + 1}
                                    </span>
                                    Résumé
                                </Link>
                            </motion.li>
                        </ul>

                        <motion.div
                            className="nav-sheet-foot"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            <a href={profile.links.email} className="mono">
                                {profile.email}
                            </a>
                            <span className="mono muted">{profile.location}</span>
                        </motion.div>
                    </motion.div>
                ) : null}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
