import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
    return (
        <footer id="contact" className="footer">
            <div className="container">
                <h2>Get In Touch</h2>
                <h3>Feel free to reach out for collaborations or just a friendly chat!</h3>
                <div className="social-icons">
                    <a href="http://www.linkedin.com/in/adityaraj-bagwan-07464a320" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faLinkedin} />
                    </a>
                    <a href="https://github.com/Adityaraj-B" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faGithub} />
                    </a>
                    <a href="adityarajb7@rediffmail.com">
                        <FontAwesomeIcon icon={faEnvelope} />
                    </a>
                </div>
                <div className="footer-bottom">
                    <h3>&copy; {new Date().getFullYear()} Adityaraj Bagwan. All Rights Reserved.</h3>
                </div>
            </div>
        </footer>
    );
};

export default Footer;