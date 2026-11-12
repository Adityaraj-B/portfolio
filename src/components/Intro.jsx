import { useEffect, useRef } from 'react';
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, animate, motion } from 'framer-motion';
import { profile } from '../data/profile';
import { useIntro } from '../context/IntroContext';
import { useSmoothScroll } from '../lib/SmoothScroll';
import { EASE, INTRO } from '../lib/motion';

/**
 * Intro — a short curtain: the wordmark and a 0→100 counter, then the
 * curtain lifts out of the top of the viewport in a single clip-path wipe.
 *
 * The counter writes digits straight to the DOM; the progress rule is a
 * transform-only scale. Nothing here lays out during the animation.
 */
const Intro = () => {
    const { playing, done, finish } = useIntro();
    const { stop, start } = useSmoothScroll();
    const digits = useRef(null);

    useEffect(() => {
        if (!playing || done) return undefined;

        stop();
        const node = digits.current;
        const controls = animate(0, 100, {
            duration: INTRO.hold,
            ease: [0.65, 0, 0.35, 1],
            onUpdate: (v) => {
                if (node) node.textContent = String(Math.round(v)).padStart(3, '0');
            },
        });
        const timer = setTimeout(finish, INTRO.hold * 1000 + 120);

        return () => {
            controls.stop();
            clearTimeout(timer);
        };
    }, [playing, done, finish, stop]);

    useEffect(() => {
        if (done) start();
    }, [done, start]);

    if (!playing) return null;

    return (
        <AnimatePresence>
            {!done ? (
                <motion.div
                    className="intro"
                    aria-hidden="true"
                    initial={{ clipPath: 'inset(0 0 0% 0)' }}
                    exit={{
                        clipPath: 'inset(0 0 100% 0)',
                        transition: { duration: INTRO.lift, ease: EASE.inOut },
                    }}
                >
                    <motion.div
                        className="intro-inner"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{
                            opacity: 0,
                            y: -40,
                            transition: { duration: 0.5, ease: EASE.quart },
                        }}
                        transition={{ duration: 0.7, ease: EASE.out, delay: 0.1 }}
                    >
                        <span className="intro-mark mono">
                            {profile.initials}
                            <span className="intro-mark-dot" />
                        </span>
                        <span className="intro-name display">
                            {profile.firstName}{' '}
                            <em>{profile.lastName}</em>
                        </span>
                        <span className="intro-role mono">{profile.role}</span>
                    </motion.div>

                    <div className="intro-foot">
                        <span className="intro-count display" ref={digits}>
                            000
                        </span>
                        <motion.span
                            className="intro-rule"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: INTRO.hold, ease: [0.65, 0, 0.35, 1] }}
                        />
                    </div>
                </motion.div>
            ) : null}
        </AnimatePresence>
    );
};

export default Intro;
