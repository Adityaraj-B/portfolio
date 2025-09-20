import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHtml5, faCss3Alt, faJsSquare, faReact, faDev } from '@fortawesome/free-brands-svg-icons';
import { faCode, faCogs } from '@fortawesome/free-solid-svg-icons';

const skillsData = [
    { icon: faHtml5, title: "HTML", description: "Advanced knowledge in creating structured and semantic web content." },
    { icon: faCss3Alt, title: "CSS", description: "Moderate experience in designing responsive and visually appealing layouts." },
    { icon: faCode, title: "C", description: "In-depth understanding of system-level programming and memory management." },
    { icon: faCogs, title: "C++", description: "Solid foundation in object-oriented programming and high-performance applications." },
    { icon: faDev, title: "Flutter", description: "Currently learning to build beautiful, natively compiled cross-platform applications." },
    { icon: faJsSquare, title: "JavaScript", description: "Learning to add interactivity and dynamic functionality to web applications." },
    { icon: faReact, title: "React", description: "Exploring component-based architecture for building scalable user interfaces." }
];

const Skills = () => {
    return (
        <section id="skills" className="skills-section">
            <h2 className="animate-on-scroll">My Skillset</h2>
            <div className="skills-grid">
                {skillsData.map((skill, index) => (
                    <div className="skill-card animate-on-scroll" key={index}>
                        <FontAwesomeIcon icon={skill.icon} className="skill-icon" />
                        <h3>{skill.title}</h3>
                        <p>{skill.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Skills;