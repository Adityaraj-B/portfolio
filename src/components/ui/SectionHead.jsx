import { useRef } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, useScroll, useTransform } from 'framer-motion';
import { inView, drawRule } from '../../lib/motion';
import SplitText from './SplitText';
import { Rise } from './Reveal';

/**
 * The shared section opener: an index/eyebrow row over a drawn rule, then a
 * split-reveal headline and optional lede. Keeps every section's rhythm
 * identical, which is most of what makes a page feel designed.
 *
 * Behind it, the section index sits as an outlined watermark that drifts at
 * a different rate from the page — a cheap, quiet way to give each section
 * its own depth.
 */
const SectionHead = ({ index, label, title, lede, align = 'left', id }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start'],
    });
    const markY = useTransform(scrollYProgress, [0, 1], ['22%', '-32%']);
    const markOpacity = useTransform(scrollYProgress, [0, 0.35, 0.7, 1], [0, 1, 1, 0]);

    return (
        <header className={`sec-head sec-head-${align}`} id={id} ref={ref}>
            {index ? (
                <motion.span
                    className="sec-watermark display"
                    aria-hidden="true"
                    style={{ y: markY, opacity: markOpacity }}
                >
                    {index}
                </motion.span>
            ) : null}

            <motion.div
                className="sec-head-meta"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={inView}
                transition={{ duration: 0.6 }}
            >
                {index ? <span className="mono sec-index">{index}</span> : null}
                <span className="mono sec-label">{label}</span>
            </motion.div>

            <motion.hr
                className="rule sec-head-rule"
                variants={drawRule}
                initial="hidden"
                whileInView="visible"
                viewport={inView}
                style={{ transformOrigin: 'left center' }}
            />

            <h2 className="sec-title display">
                <SplitText text={title} stagger={0.05} duration={1.05} />
            </h2>

            {lede ? (
                <Rise as="p" className="lede sec-lede" delay={0.12}>
                    {lede}
                </Rise>
            ) : null}
        </header>
    );
};

export default SectionHead;
