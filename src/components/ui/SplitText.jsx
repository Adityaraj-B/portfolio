import { motion } from 'framer-motion';
import { EASE, inView } from '../../lib/motion';

/**
 * Splits a string into words (and optionally characters) and animates each
 * one out from behind a mask, swinging up out of the page plane. The
 * signature kinetic-type reveal used for the hero name and section
 * headlines.
 *
 * `text` may contain `*emphasis*` markers — those words render in the
 * display serif italic accent style.
 *
 * By default the reveal fires when the text scrolls into view. Pass
 * `play` (true/false) to drive it explicitly instead — the hero does this
 * so its headline waits for the intro curtain.
 */
const SplitText = ({
    text,
    mode = 'word',
    delay = 0,
    stagger = 0.045,
    duration = 1,
    className = '',
    as = 'span',
    lineHeight,
    play,
}) => {
    const Tag = motion[as] ?? motion.span;
    const words = String(text).split(' ');

    let unitIndex = 0;

    const container = {
        hidden: {},
        visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
    };

    const unit = {
        hidden: { y: '115%', opacity: 0, rotateX: -55, rotate: 1.5 },
        visible: {
            y: '0%',
            opacity: 1,
            rotateX: 0,
            rotate: 0,
            transition: { duration, ease: EASE.out },
        },
    };

    const trigger =
        play === undefined
            ? { whileInView: 'visible', viewport: inView }
            : { animate: play ? 'visible' : 'hidden' };

    return (
        <Tag
            className={`split ${className}`}
            variants={container}
            initial="hidden"
            {...trigger}
            aria-label={String(text).replace(/\*/g, '')}
        >
            {words.map((word, w) => {
                const emphasised = word.startsWith('*') && word.endsWith('*');
                const clean = emphasised ? word.slice(1, -1) : word;
                const pieces = mode === 'char' ? clean.split('') : [clean];

                return (
                    <span className="split-word" key={`${word}-${w}`} aria-hidden="true">
                        {pieces.map((piece, p) => {
                            unitIndex += 1;
                            return (
                                <span
                                    className="split-mask"
                                    key={`${piece}-${p}`}
                                    style={lineHeight ? { lineHeight } : undefined}
                                >
                                    <motion.span
                                        className={`split-unit${emphasised ? ' split-em' : ''}`}
                                        variants={unit}
                                        custom={unitIndex}
                                        style={{
                                            transformPerspective: 600,
                                            transformOrigin: '50% 100%',
                                        }}
                                    >
                                        {piece}
                                    </motion.span>
                                </span>
                            );
                        })}
                    </span>
                );
            })}
        </Tag>
    );
};

export default SplitText;
