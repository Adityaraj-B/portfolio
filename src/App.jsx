import React, { useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Skills from './components/Skills.jsx';
import Certifications from './components/Certifications.jsx';
import Footer from './components/Footer.jsx';

function App() {
    useEffect(() => {
        const scrollElements = document.querySelectorAll('.animate-on-scroll');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                } else {
                    entry.target.classList.remove('is-visible');
                }
            });
        }, {
            threshold: 0.1
        });

        scrollElements.forEach(el => observer.observe(el));

        return () => scrollElements.forEach(el => observer.unobserve(el));
    }, []);

    return (
        <>
            <Navbar />
            <Hero />
            <main className="container">
                <About />
                <Skills />
                <Certifications />
            </main>
            <Footer />
        </>
    );
}

export default App;