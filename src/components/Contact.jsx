// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import {
    FiArrowUp,
    FiArrowUpRight,
    FiCheck,
    FiCopy,
    FiGithub,
    FiLinkedin,
    FiMail,
} from 'react-icons/fi';
import { profile } from '../data/profile';
import { EASE, inView } from '../lib/motion';
import { useCopy } from '../lib/hooks';
import { useSmoothScroll } from '../lib/SmoothScroll';
import SplitText from './ui/SplitText';
import { Magnetic } from './ui/Interactive';
import { Rise } from './ui/Reveal';

const socials = [
    { id: 'gh', href: profile.links.github, label: 'GitHub', icon: <FiGithub /> },
    { id: 'li', href: profile.links.linkedin, label: 'LinkedIn', icon: <FiLinkedin /> },
    { id: 'ml', href: profile.links.email, label: 'Email', icon: <FiMail /> },
];

const Contact = () => {
    const [copied, copy] = useCopy();
    const { toTop } = useSmoothScroll();

    return (
        <footer className="section contact-section" id="contact">
            <div className="shell">
                <motion.div
                    className="contact-eyebrow"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={inView}
                    transition={{ duration: 0.7 }}
                >
                    <span className="mono">06 — Contact</span>
                    {profile.available ? (
                        <span className="chip chip-live">
                            <span className="chip-dot" />
                            {profile.availabilityNote}
                        </span>
                    ) : null}
                </motion.div>

                <h2 className="contact-title display">
                    <SplitText text="Let us build" stagger={0.06} duration={1.1} />
                    <br />
                    <SplitText
                        text="something *considered*"
                        stagger={0.06}
                        duration={1.1}
                        delay={0.12}
                    />
                </h2>

                <Rise as="p" className="lede contact-lede" delay={0.1}>
                    Hiring for an internship, building something ambitious, or just want
                    to talk Flutter architecture? My inbox is open.
                </Rise>

                <div className="contact-mail">
                    <Magnetic strength={0.15}>
                        <a
                            href={profile.links.email}
                            className="contact-mail-link display"
                            data-cursor="Write"
                        >
                            {profile.email}
                        </a>
                    </Magnetic>
                    <button
                        type="button"
                        className="contact-copy"
                        onClick={() => copy(profile.email)}
                        aria-label="Copy email address"
                    >
                        {copied ? <FiCheck /> : <FiCopy />}
                        <span className="mono">{copied ? 'Copied' : 'Copy'}</span>
                    </button>
                </div>

                <Rise className="contact-actions" delay={0.14}>
                    <Magnetic strength={0.2}>
                        <a
                            href={profile.links.resume}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary"
                            data-cursor="hide"
                        >
                            Download résumé <FiArrowUpRight />
                        </a>
                    </Magnetic>
                    <ul className="contact-socials">
                        {socials.map((s, i) => (
                            <motion.li
                                key={s.id}
                                initial={{ opacity: 0, y: 14 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={inView}
                                transition={{
                                    duration: 0.6,
                                    ease: EASE.out,
                                    delay: 0.1 + i * 0.07,
                                }}
                            >
                                <a
                                    href={s.href}
                                    target={s.href.startsWith('mailto') ? undefined : '_blank'}
                                    rel="noopener noreferrer"
                                    aria-label={s.label}
                                    className="contact-social"
                                    data-cursor="link"
                                >
                                    {s.icon}
                                    <span className="mono">{s.label}</span>
                                </a>
                            </motion.li>
                        ))}
                    </ul>
                </Rise>

                <hr className="rule contact-rule" />

                <div className="contact-foot">
                    <span className="mono muted">
                        {profile.location} · {profile.phone}
                    </span>
                    <span className="mono muted contact-credit">
                        Designed &amp; built by {profile.name} · ©{' '}
                        {new Date().getFullYear()}
                    </span>
                    <button
                        type="button"
                        className="contact-top mono"
                        onClick={toTop}
                        data-cursor="hide"
                    >
                        Back to top <FiArrowUp />
                    </button>
                </div>
            </div>
        </footer>
    );
};

export default Contact;
