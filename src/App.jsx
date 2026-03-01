import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
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

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};

// Single animated gradient background
const AnimatedGradient = () => {
    return (
        <div className="animated-gradient-wrapper">
            <div className="animated-gradient-orb orb-1" />
            <div className="animated-gradient-orb orb-2" />
            <div className="animated-gradient-orb orb-3" />
            <div className="animated-gradient-orb orb-4" />
        </div>
    );
};

const HomePage = () => {
    useEffect(() => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px',
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                // Add class when entering viewport, remove when leaving
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                } else {
                    entry.target.classList.remove('is-visible');
                }
            });
        }, observerOptions);

        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        animatedElements.forEach((el) => observer.observe(el));

        return () => {
            animatedElements.forEach((el) => observer.unobserve(el));
        };
    }, []);

    return (
        <>
            <Hero />
            <main>
                <About />
                <Skills />
                <Projects />
                <Certifications />
                <Badges />
            </main>
            <Footer />
        </>
    );
};

function App() {
    useEffect(() => {
        const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
        document.documentElement.setAttribute('data-theme', savedTheme);
    }, []);

    return (
        <ThemeProvider>
            <Router>
                <AnimatedGradient />
                <ScrollToTop />
                <Navbar />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/resume" element={<ResumePage />} />
                </Routes>
            </Router>
        </ThemeProvider>
    );
}

export default App;