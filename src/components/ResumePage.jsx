// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiDownload, FiExternalLink } from 'react-icons/fi';
import { about, experience, profile } from '../data/profile';
import { skillGroups } from '../data/work';
import { EASE } from '../lib/motion';
import SplitText from './ui/SplitText';
import { Magnetic } from './ui/Interactive';

const ResumePage = () => (
    <main className="section resume-page">
        <div className="shell">
            <motion.div
                className="resume-top"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: EASE.out }}
            >
                <Link to="/" className="resume-back mono" data-cursor="hide">
                    <FiArrowLeft /> Back to portfolio
                </Link>
                <span className="mono muted">{profile.location}</span>
            </motion.div>

            <h1 className="resume-title display">
                <SplitText text="Résumé" mode="char" stagger={0.05} duration={1.05} />
            </h1>

            <motion.p
                className="lede resume-lede"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: EASE.out, delay: 0.15 }}
            >
                {profile.role} · {about.education.degree}, {about.education.school}.
                The full document is below, or take the PDF with you.
            </motion.p>

            <motion.div
                className="resume-actions"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: EASE.out, delay: 0.25 }}
            >
                <Magnetic strength={0.2}>
                    <a
                        href={profile.links.resume}
                        download="Adityaraj_Bagwan_Resume.pdf"
                        className="btn btn-primary"
                        data-cursor="hide"
                    >
                        <FiDownload /> Download PDF
                    </a>
                </Magnetic>
                <a
                    href={profile.links.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-ghost"
                    data-cursor="hide"
                >
                    <FiExternalLink /> Open in new tab
                </a>
            </motion.div>

            {/* Text summary first: it is readable on phones, where embedded
                PDFs are effectively unusable. */}
            <motion.div
                className="resume-summary"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: EASE.out, delay: 0.32 }}
            >
                <section className="resume-block">
                    <h2 className="mono resume-h">Experience</h2>
                    <ul className="resume-xp">
                        {experience.map((item) => (
                            <li key={item.id}>
                                <div className="resume-xp-head">
                                    <h3>
                                        {item.role}
                                        <span className="muted"> · {item.company}</span>
                                    </h3>
                                    <span className="mono muted">{item.period}</span>
                                </div>
                                <p>{item.summary}</p>
                            </li>
                        ))}
                    </ul>
                </section>

                <section className="resume-block">
                    <h2 className="mono resume-h">Education</h2>
                    <div className="resume-xp-head">
                        <h3>{about.education.school}</h3>
                        <span className="mono muted">{about.education.period}</span>
                    </div>
                    <p>
                        {about.education.degree} · CGPA {about.education.cgpa}
                    </p>
                </section>

                <section className="resume-block">
                    <h2 className="mono resume-h">Skills</h2>
                    <dl className="resume-skills">
                        {skillGroups.map((g) => (
                            <div key={g.id}>
                                <dt className="mono">{g.title}</dt>
                                <dd>{g.skills.join(' · ')}</dd>
                            </div>
                        ))}
                    </dl>
                </section>
            </motion.div>

            <motion.div
                className="resume-viewer"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9, ease: EASE.out, delay: 0.4 }}
            >
                <object data={profile.links.resume} type="application/pdf">
                    <div className="resume-fallback">
                        <p>Your browser can&apos;t display the embedded PDF.</p>
                        <a
                            href={profile.links.resume}
                            download
                            className="btn btn-primary btn-sm"
                        >
                            <FiDownload /> Download it instead
                        </a>
                    </div>
                </object>
            </motion.div>
        </div>
    </main>
);

export default ResumePage;
