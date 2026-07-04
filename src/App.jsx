import React, { useEffect, useState, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import './App.css';

import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Skills from './components/Skills.jsx';
import Projects from './components/Projects.jsx';
import Certifications from './components/Certifications.jsx';
import Badges from './components/Badges.jsx';
import Footer from './components/Footer.jsx';
import ResumePage from './components/ResumePage.jsx';
import LiquidGlassBackground from './components/LiquidGlassBackground.jsx';

const ScrollToTop = () => {
    const { pathname } = useLocation();
    useEffect(() => {
        // Instant scroll on route change to prevent Lenis conflicts
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
};

// Page transition variants
const pageVariants = {
    initial: { opacity: 0, y: 16 },
    animate: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
    exit: {
        opacity: 0,
        y: -12,
        transition: { duration: 0.3, ease: [0.4, 0, 1, 1] },
    },
};

// 3D fold-in on scroll
const sectionVariants = {
    hidden: {
        opacity: 0,
        y: 80,
        rotateX: -15,
        scale: 0.95,
        z: -100
    },
    visible: {
        opacity: 1,
        y: 0,
        rotateX: 0,
        scale: 1,
        z: 0,
        transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
    },
};

const AnimatedSection = ({ children }) => (
    <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={sectionVariants}
        style={{ perspective: 1200, transformStyle: "preserve-3d" }}
    >
        {children}
    </motion.div>
);

const HomePage = () => {
    return (
        <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            <Hero />
            <main>
                <AnimatedSection><About /></AnimatedSection>
                <AnimatedSection><Skills /></AnimatedSection>
                <AnimatedSection><Projects /></AnimatedSection>
                <AnimatedSection><Certifications /></AnimatedSection>
                <AnimatedSection><Badges /></AnimatedSection>
            </main>
            <AnimatedSection><Footer /></AnimatedSection>
        </motion.div>
    );
};

const AnimatedRoutes = () => {
    const location = useLocation();
    return (
        <AnimatePresence mode="wait" initial={false}>
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<HomePage />} />
                <Route
                    path="/resume"
                    element={
                        <motion.div
                            variants={pageVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                        >
                            <ResumePage />
                        </motion.div>
                    }
                />
            </Routes>
        </AnimatePresence>
    );
};

const loadingMessages = [
    "INITIALIZING ENVIRONMENT",
    "BUILDING GEOMETRY",
    "COMPILING SHADERS",
    "ASSEMBLING SCENE",
    "CALIBRATING LIGHTING",
    "POLISHING PIXELS",
];

/*
 * CustomLoader — Pure CSS loading screen.
 *
 * All 6 messages are rendered at once as a vertical strip inside a 20px
 * clipping container.  A CSS `transform: translateY()` animation with
 * `steps(5)` scrolls through them on the **compositor thread**, which is
 * completely independent of the main thread.  This keeps the text cycling
 * smoothly even while the GPU is blocked compiling WebGL shaders.
 */
const CustomLoader = ({ show }) => {
    const [mounted, setMounted] = useState(true);
    const overlayRef = useRef(null);

    useEffect(() => {
        if (show) { setMounted(true); return; }
        const node = overlayRef.current;
        if (!node) { setMounted(false); return; }
        const onEnd = (e) => { if (e.propertyName === 'opacity') setMounted(false); };
        node.addEventListener('transitionend', onEnd);
        requestAnimationFrame(() => node.classList.add('loader-hidden'));
        return () => node.removeEventListener('transitionend', onEnd);
    }, [show]);

    if (!mounted) return null;

    return (
        <div ref={overlayRef} className="global-preloader">
            <div className="preloader-text-wrap">
                <div className="preloader-text-strip">
                    {loadingMessages.map((msg, i) => (
                        <span key={i} className="preloader-text-item">{msg}</span>
                    ))}
                </div>
            </div>
        </div>
    );
};

function App() {
    const [loaderDone, setLoaderDone] = useState(false);

    // The 3D scene fires onLoaded once its initial shaders are compiled
    // and the first frames have rendered → dismiss the loader.
    const handleSceneReady = () => {
        // Tiny delay so the rendered frame is fully flushed before transition
        requestAnimationFrame(() => setLoaderDone(true));
    };

    // Safety fallback: if shaders take abnormally long, dismiss anyway
    useEffect(() => {
        const id = setTimeout(() => setLoaderDone(true), 8000);
        return () => clearTimeout(id);
    }, []);

    useEffect(() => {
        const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
        document.documentElement.setAttribute('data-theme', savedTheme);

        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smooth: true,
            smoothTouch: false,
        });
        let rafId;
        function raf(time) {
            lenis.raf(time);
            rafId = requestAnimationFrame(raf);
        }
        rafId = requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
            cancelAnimationFrame(rafId);
        };
    }, []);

    return (
        <ThemeProvider>
            <CustomLoader show={!loaderDone} />
            <LiquidGlassBackground onLoaded={handleSceneReady} />
            <Router>
                <ScrollToTop />
                <Navbar />
                <AnimatedRoutes />
            </Router>
        </ThemeProvider>
    );
}

export default App;