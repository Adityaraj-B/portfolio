import React from 'react';
import hackathonCert from '../assets/1741067205758.jpeg';
import ids from '../assets/Screenshot 2025-09-21 000538.png';
import fdt from '../assets/img.png';
import dsf from '../assets/img_1.png';
import bdv from '../assets/img_2.png';
const Certifications = () => {
    return (
        <section id="certifications" className="certifications-section">
            <h2 className="animate-on-scroll">Certifications</h2>
            <div className="certificate-card animate-on-scroll">
                <img src={hackathonCert} alt="Hackathon Certificate" />
                <div className="certificate-info">
                    <h3>National Level Hackathon</h3>
                    <p>Organized by the Innovation Foundation. Awarded for developing an innovative solution under a tight deadline.</p>
                </div>
            </div>
            <br/>
            <div className="certificate-card animate-on-scroll">
                <img src={ids} alt="Introduction to Data Science" />
                <div className="certificate-info">
                    <h3>LinkedIn Learning Certificate of Completion</h3>
                    <p>Course: Introduction to Data Science</p>
                </div>
            </div>
            <br/>
            <div className="certificate-card animate-on-scroll">
                <img src={fdt} alt="Fundamentals of Data Transformation of Data Engineering" />
                <div className="certificate-info">
                    <h3>LinkedIn Learning Certificate of Completion</h3>
                    <p>Course: Fundamentals of Data Transformation of Data Engineering</p>
                </div>
            </div>
            <br/>
            <div className="certificate-card animate-on-scroll">
                <img src={dsf} alt="data Science Foundations: Fundamentals" />
                <div className="certificate-info">
                    <h3>LinkedIn Learning Certificate of Completion</h3>
                    <p>Course: data Science Foundations: Fundamentals</p>
                </div>
            </div>
            <br/>
            <div className="certificate-card animate-on-scroll">
                <img src={bdv} alt="Basic of Data Visualization Analysis" />
                <div className="certificate-info">
                    <h3>LinkedIn Learning Certificate of Completion</h3>
                    <p>Course: Basic of Data Visualization Analysis</p>
                </div>
            </div>
        </section>
    );
};

export default Certifications;