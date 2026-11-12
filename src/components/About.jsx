import { useRef } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiMapPin } from 'react-icons/fi';
import { about, interests, profile, stats } from '../data/profile';
import { EASE, inView, stagger } from '../lib/motion';
import SectionHead from './ui/SectionHead';
import { Rise } from './ui/Reveal';
import { Tilt } from './ui/Interactive';
import portrait from '../assets/portrait.webp';

/** Renders **bold** spans from the content layer without pulling in a parser. */
const RichText = ({ value }) => (
    <>
        {value.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
            part.startsWith('**') && part.endsWith('**') ? (
                <strong key={i}>{part.slice(2, -2)}</strong>
            ) : (
                <span key={i}>{part}</span>
            ),
        )}
    </>
);

const floatIn = {
    hidden: { opacity: 0, y: 16, scale: 0.9 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.8, ease: EASE.out },
    },
};

const cgpa = stats.find((s) => s.label === 'CGPA');

const About = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start'],
    });
    const imgY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);
    const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.9, 0]);

    return (
        <section className="section about-section" id="about" ref={ref}>
            <div className="shell">
                <SectionHead
                    index="02"
                    label="About"
                    title="Engineering that feels *considered*"
                />

                <div className="about-grid">
                    {/* -------- portrait -------- */}
                    <motion.div
                        className="about-visual"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={inView}
                        transition={{ duration: 1, ease: EASE.out }}
                    >
                        <Tilt max={6} scale={1.01} depth glow className="about-tilt">
                            <motion.div
                                className="about-portrait"
                                initial={{ clipPath: 'inset(14% 7% 14% 7%)' }}
                                whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
                                viewport={inView}
                                transition={{ duration: 1.05, ease: EASE.inOut }}
                            >
                                <motion.img
                                    src={portrait}
                                    alt={profile.name}
                                    style={{ y: imgY }}
                                    initial={{ scale: 1.16 }}
                                    whileInView={{ scale: 1 }}
                                    viewport={inView}
                                    transition={{ duration: 1.5, ease: EASE.out }}
                                    loading="lazy"
                                    decoding="async"
                                />
                                <motion.span
                                    className="about-portrait-glow"
                                    style={{ opacity: glowOpacity }}
                                />
                            </motion.div>

                            {/* Floating chips at their own depth, so they
                                separate from the photo as the card turns. */}
                            <motion.div
                                className="about-floats"
                                variants={stagger(0.12, 0.5)}
                                initial="hidden"
                                whileInView="visible"
                                viewport={inView}
                            >
                                <motion.span
                                    className="about-float about-float-cgpa tilt-layer"
                                    style={{ '--z': '70px' }}
                                    variants={floatIn}
                                >
                                    <span className="display about-float-value">
                                        {cgpa ? cgpa.value.toFixed(2) : about.education.cgpa}
                                    </span>
                                    <span className="mono">CGPA</span>
                                </motion.span>
                                <motion.span
                                    className="about-float about-float-place tilt-layer"
                                    style={{ '--z': '54px' }}
                                    variants={floatIn}
                                >
                                    <FiMapPin />
                                    <span className="mono">{about.education.place}</span>
                                </motion.span>
                                <motion.span
                                    className="about-float about-float-open tilt-layer"
                                    style={{ '--z': '90px' }}
                                    variants={floatIn}
                                >
                                    <span className="chip-dot" />
                                    <span className="mono">{profile.availabilityNote}</span>
                                </motion.span>
                            </motion.div>
                        </Tilt>

                        <div className="about-sig">
                            <span className="display about-sig-name">{profile.name}</span>
                            <span className="mono muted">{profile.role}</span>
                        </div>
                    </motion.div>

                    {/* -------- narrative -------- */}
                    <div className="about-copy">
                        {about.paragraphs.map((p, i) => (
                            <Rise as="p" key={i} delay={0.08 * i} className="about-para">
                                <RichText value={p} />
                            </Rise>
                        ))}

                        <Rise className="about-edu" delay={0.2}>
                            <div className="about-edu-head">
                                <span className="mono muted">Education</span>
                                <span className="mono about-edu-cgpa">
                                    CGPA {about.education.cgpa}
                                </span>
                            </div>
                            <h3 className="about-edu-school">{about.education.school}</h3>
                            <p className="about-edu-degree">{about.education.degree}</p>
                            <p className="mono muted about-edu-meta">
                                {about.education.place} · {about.education.period}
                            </p>
                            <motion.ul
                                className="about-courses"
                                variants={stagger(0.05, 0.1)}
                                initial="hidden"
                                whileInView="visible"
                                viewport={inView}
                            >
                                {about.education.coursework.map((c) => (
                                    <motion.li key={c} className="tag" variants={floatIn}>
                                        {c}
                                    </motion.li>
                                ))}
                            </motion.ul>
                        </Rise>

                        <Rise className="about-interests" delay={0.26}>
                            <span className="mono muted">Thinking about</span>
                            <p className="about-interests-list">
                                {interests.map((item, i) => (
                                    <span key={item}>
                                        {item}
                                        {i < interests.length - 1 ? (
                                            <em className="serif"> / </em>
                                        ) : null}
                                    </span>
                                ))}
                            </p>
                        </Rise>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
