import { useRef } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { experience } from '../data/profile';
import { EASE, inView } from '../lib/motion';
import SectionHead from './ui/SectionHead';

const ExperienceRow = ({ item, i }) => (
    <motion.li
        className={`xp${item.current ? ' is-current' : ''}`}
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={inView}
        transition={{ duration: 0.9, ease: EASE.out, delay: i * 0.05 }}
    >
        <div className="xp-rail">
            <motion.span
                className="xp-node"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={inView}
                transition={{ duration: 0.5, ease: EASE.out, delay: 0.15 + i * 0.05 }}
            />
        </div>

        <div className="xp-when">
            <span className="mono xp-period">{item.period}</span>
            {item.current ? (
                <span className="chip chip-live chip-xs">
                    <span className="chip-dot" />
                    Now
                </span>
            ) : null}
        </div>

        <div className="xp-what">
            <h3 className="xp-role">{item.role}</h3>
            <p className="xp-company">
                {item.company}
                <span className="mono xp-kind"> · {item.kind}</span>
            </p>
            <p className="xp-summary">{item.summary}</p>

            <motion.ul
                className="xp-highlights"
                initial="hidden"
                whileInView="visible"
                viewport={inView}
                variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.25 } },
                }}
            >
                {item.highlights.map((h) => (
                    <motion.li
                        key={h}
                        variants={{
                            hidden: { opacity: 0, x: -14 },
                            visible: {
                                opacity: 1,
                                x: 0,
                                transition: { duration: 0.6, ease: EASE.out },
                            },
                        }}
                    >
                        {h}
                    </motion.li>
                ))}
            </motion.ul>

            <ul className="prj-tech xp-tech">
                {item.tech.map((t) => (
                    <li key={t} className="tag">
                        {t}
                    </li>
                ))}
            </ul>
        </div>
    </motion.li>
);

const Experience = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start 70%', 'end 60%'],
    });
    // The spine draws itself as the reader descends the timeline.
    const progress = useSpring(scrollYProgress, {
        stiffness: 110,
        damping: 28,
        restDelta: 0.001,
    });
    const scaleY = useTransform(progress, [0, 1], [0, 1]);

    return (
        <section className="section xp-section">
            <div className="shell">
                <SectionHead
                    index="03"
                    label="Experience"
                    title="Where the *hours* went"
                    lede="Client work, hackathon builds and independent products, the places where I learned what holds up under real use."
                />

                <div className="xp-wrap" ref={ref}>
                    <div className="xp-spine" aria-hidden="true">
                        <motion.span
                            className="xp-spine-fill"
                            style={{ scaleY, transformOrigin: 'top center' }}
                        />
                    </div>

                    <ol className="xp-list">
                        {experience.map((item, i) => (
                            <ExperienceRow key={item.id} item={item} i={i} />
                        ))}
                    </ol>
                </div>
            </div>
        </section>
    );
};

export default Experience;
