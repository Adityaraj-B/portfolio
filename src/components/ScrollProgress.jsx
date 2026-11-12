// eslint-disable-next-line no-unused-vars
import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * ScrollProgress — a hairline at the very top of the page whose scale
 * tracks reading progress, smoothed by a spring so Lenis's momentum
 * reads as fluid rather than twitchy.
 */
const ScrollProgress = () => {
    const { scrollYProgress } = useScroll();
    const width = useSpring(scrollYProgress, {
        stiffness: 160,
        damping: 30,
        restDelta: 0.001,
    });

    return (
        <motion.div
            className="scroll-progress"
            style={{ scaleX: width }}
            aria-hidden="true"
        />
    );
};

export default ScrollProgress;
