import React from 'react';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="nav-container">
                <a href="#" className="nav-logo">Adityaraj.</a>
                <ul className="nav-menu">
                    <li className="nav-item"><a href="#about">About</a></li>
                    <li className="nav-item"><a href="#skills">Skills</a></li>
                    <li className="nav-item"><a href="#certifications">Certifications</a></li>
                    <li className="nav-item"><a href="#resume">Resume</a></li>
                    <li className="nav-item"><a href="#contact" className="contact-btn">Contact Me</a></li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;