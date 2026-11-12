import { useMemo, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from 'framer-motion';
import { FiArrowUpRight, FiAward } from 'react-icons/fi';
import { SiAmazonwebservices, SiGooglecloud } from 'react-icons/si';
import { awsCourses, awsTracks, badgeTracks, badges, certifications } from '../data/work';
import { profile } from '../data/profile';
import { EASE, SPRING, inView, swingUp } from '../lib/motion';
import SectionHead from './ui/SectionHead';
import { Tilt } from './ui/Interactive';

const VIEWS = [
    { id: 'certs', label: 'Certifications', count: certifications.length },
    { id: 'aws', label: 'AWS', count: awsCourses.length },
    { id: 'badges', label: 'Google Cloud', count: badges.length },
];

/* ---------------------------------------------------------------- certs */

const CertCard = ({ cert, i }) => (
    <motion.li
        className="cert"
        style={{ transformPerspective: 1200 }}
        variants={swingUp((i % 3) * 0.08)}
        initial="hidden"
        whileInView="visible"
        viewport={inView}
    >
        <Tilt max={6} glow className="cert-tilt">
            {cert.image ? (
                <div className="cert-thumb">
                    <img
                        src={cert.image}
                        alt={cert.title}
                        loading="lazy"
                        decoding="async"
                    />
                </div>
            ) : (
                <div className="cert-thumb cert-thumb-synth">
                    <SiGooglecloud />
                    <span className="cert-thumb-ring" />
                </div>
            )}

            <div className="cert-body">
                <div className="cert-top">
                    <span className="mono cert-kind">{cert.kind}</span>
                    <span className="mono muted">{cert.date}</span>
                </div>
                <h3 className="cert-title">{cert.title}</h3>
                <p className="mono muted cert-issuer">{cert.issuer}</p>
                {cert.detail ? <p className="cert-detail">{cert.detail}</p> : null}
            </div>
        </Tilt>
    </motion.li>
);

/* --------------------------------------------------------------- badges */

// No `layout` prop: measuring and tweening 20 grid items on every filter
// change costs far more than the cross-fade is worth.
const BadgeCard = ({ badge, i }) => (
    <motion.li
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.35, ease: EASE.out, delay: Math.min(i, 10) * 0.022 }}
        className="badge"
    >
        <a
            href={badge.link}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="link"
        >
            <span className="badge-icon">
                <SiGooglecloud />
            </span>
            <span className="badge-text">
                <span className="mono badge-track">{badge.track}</span>
                <span className="badge-title">{badge.title}</span>
            </span>
            <FiArrowUpRight className="badge-arrow" />
        </a>
    </motion.li>
);

/* ----------------------------------------------------------- aws courses */

// Completion certificates carry no public URL, so these are static cards.
const AwsCard = ({ course, i }) => (
    <motion.li
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.35, ease: EASE.out, delay: Math.min(i, 10) * 0.022 }}
        className="badge"
    >
        <div className="badge-static">
            <span className="badge-icon badge-icon-aws">
                <SiAmazonwebservices />
            </span>
            <span className="badge-text">
                <span className="mono badge-track">
                    {course.format} · {course.date}
                </span>
                <span className="badge-title">{course.title}</span>
            </span>
        </div>
    </motion.li>
);

/* ---------------------------------------------------------- credentials */

const Credentials = () => {
    const [view, setView] = useState('certs');
    const [track, setTrack] = useState('All');
    const [awsTrack, setAwsTrack] = useState('All');

    const shownBadges = useMemo(
        () => (track === 'All' ? badges : badges.filter((b) => b.track === track)),
        [track],
    );

    const shownAws = useMemo(
        () => (awsTrack === 'All' ? awsCourses : awsCourses.filter((c) => c.track === awsTrack)),
        [awsTrack],
    );

    return (
        <section className="section cred-section" id="credentials">
            <div className="shell">
                <SectionHead
                    index="05"
                    label="Credentials"
                    title="Proof of the *groundwork*"
                    lede="An AWS Solutions Architect learning plan, Google Cloud specialisations, data-science coursework and a national techathon finish: the receipts behind the stack above."
                />

                <div className="cred-switch" role="tablist" aria-label="Credential type">
                    {VIEWS.map((v) => (
                        <button
                            key={v.id}
                            type="button"
                            role="tab"
                            aria-selected={view === v.id}
                            className={`cred-switch-btn${view === v.id ? ' is-active' : ''}`}
                            onClick={() => setView(v.id)}
                            data-cursor="hide"
                        >
                            {view === v.id ? (
                                <motion.span
                                    layoutId="cred-switch"
                                    className="cred-switch-bg"
                                    transition={SPRING.snappy}
                                />
                            ) : null}
                            <span>
                                {v.label}
                                <span className="mono cred-switch-count">{v.count}</span>
                            </span>
                        </button>
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    {view === 'certs' ? (
                        <motion.ul
                            key="certs"
                            className="cert-grid"
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -16 }}
                            transition={{ duration: 0.45, ease: EASE.out }}
                        >
                            {certifications.map((cert, i) => (
                                <CertCard key={cert.id} cert={cert} i={i} />
                            ))}
                        </motion.ul>
                    ) : view === 'aws' ? (
                        <motion.div
                            key="aws"
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -16 }}
                            transition={{ duration: 0.45, ease: EASE.out }}
                        >
                            <div className="cred-filters">
                                {awsTracks.map((t) => (
                                    <button
                                        key={t}
                                        type="button"
                                        className={`filter-chip${awsTrack === t ? ' is-active' : ''}`}
                                        onClick={() => setAwsTrack(t)}
                                        data-cursor="hide"
                                    >
                                        {t}
                                    </button>
                                ))}
                            </div>

                            <ul className="badge-grid">
                                <AnimatePresence initial={false}>
                                    {shownAws.map((course, i) => (
                                        <AwsCard key={course.id} course={course} i={i} />
                                    ))}
                                </AnimatePresence>
                            </ul>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="badges"
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -16 }}
                            transition={{ duration: 0.45, ease: EASE.out }}
                        >
                            <div className="cred-filters">
                                {badgeTracks.map((t) => (
                                    <button
                                        key={t}
                                        type="button"
                                        className={`filter-chip${track === t ? ' is-active' : ''}`}
                                        onClick={() => setTrack(t)}
                                        data-cursor="hide"
                                    >
                                        {t}
                                    </button>
                                ))}
                            </div>

                            <ul className="badge-grid">
                                <AnimatePresence initial={false}>
                                    {shownBadges.map((badge, i) => (
                                        <BadgeCard key={badge.id} badge={badge} i={i} />
                                    ))}
                                </AnimatePresence>
                            </ul>

                            <a
                                className="cred-profile-link mono"
                                href={profile.links.cloudProfile}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FiAward /> View the full Google Cloud profile
                                <FiArrowUpRight />
                            </a>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};

export default Credentials;
