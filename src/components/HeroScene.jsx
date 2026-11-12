// eslint-disable-next-line no-unused-vars
import { motion, useTransform } from 'framer-motion';
import { EASE } from '../lib/motion';
import { useHoverCapable, usePointerTilt } from '../lib/hooks';

const TILES = [
    { label: 'Flutter', x: '6%', y: '2%', z: 95, w: 140, delay: 0, duration: 6.4 },
    { label: 'Clean Architecture', x: '58%', y: '14%', z: 155, w: 188, delay: 1.1, duration: 7.2 },
    { label: 'Google Cloud', x: '4%', y: '50%', z: 35, w: 152, delay: 2.2, duration: 8.1 },
    { label: 'Gemini API', x: '68%', y: '62%', z: 125, w: 136, delay: 0.6, duration: 6.8 },
    { label: 'Node.js', x: '34%', y: '80%', z: 15, w: 112, delay: 1.7, duration: 7.6 },
];

const stageVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.085, delayChildren: 0.75 },
    },
};

const ringVariants = {
    hidden: ({ z }) => ({
        opacity: 0,
        scale: 0.82,
        z: z - 60,
    }),
    visible: ({ z, opacity = 1 }) => ({
        opacity,
        scale: 1,
        z,
        transition: { duration: 1.6, ease: EASE.out },
    }),
};

const orbVariants = {
    hidden: { opacity: 0, scale: 0.6, z: -140 },
    visible: {
        opacity: 1,
        scale: 1,
        z: -90,
        transition: { duration: 1.8, ease: EASE.out },
    },
};

const tileVariants = {
    hidden: (t) => ({
        opacity: 0,
        scale: 0.78,
        y: 28,
        z: t.z - 55,
        filter: 'blur(8px)',
    }),
    visible: (t) => ({
        opacity: t.z < 40 ? 0.72 : t.z < 100 ? 0.88 : 1,
        scale: 1,
        y: 0,
        z: t.z,
        filter: 'blur(0px)',
        transition: { duration: 1.25, ease: EASE.out },
    }),
};

const HeroScene = ({ play, style }) => {
    const hoverable = useHoverCapable();
    const { rotateX, rotateY } = usePointerTilt(6.5, hoverable);

    const shiftX = useTransform(rotateY, [-6.5, 6.5], [-14, 14]);
    const shiftY = useTransform(rotateX, [-6.5, 6.5], [14, -14]);

    return (
        <motion.div
            className="hero-scene"
            aria-hidden="true"
            style={{ ...style, perspective: 1400 }}
        >
            <motion.div
                className="hero-stage"
                style={{
                    rotateX,
                    rotateY,
                    x: shiftX,
                    y: shiftY,
                    transformStyle: 'preserve-3d',
                    willChange: 'transform',
                }}
                variants={stageVariants}
                initial="hidden"
                animate={play ? 'visible' : 'hidden'}
            >
                <motion.span
                    className="hero-ring hero-ring-1"
                    custom={{ z: -45, opacity: 0.85 }}
                    variants={ringVariants}
                    style={{ willChange: 'transform, opacity' }}
                />
                <motion.span
                    className="hero-ring hero-ring-2"
                    custom={{ z: -85, opacity: 0.55 }}
                    variants={ringVariants}
                    style={{ willChange: 'transform, opacity' }}
                />
                <motion.span
                    className="hero-orb"
                    variants={orbVariants}
                    style={{ willChange: 'transform, opacity' }}
                />

                {TILES.map((t, i) => (
                    <motion.span
                        key={t.label}
                        className="hero-tile"
                        custom={t}
                        variants={tileVariants}
                        style={{
                            left: t.x,
                            top: t.y,
                            width: t.w,
                            transformStyle: 'preserve-3d',
                            willChange: 'transform, opacity, filter',
                        }}
                    >
                        <span
                            className="hero-tile-float"
                            style={{
                                animationDelay: `${-t.delay}s`,
                                animationDuration: `${t.duration}s`,
                            }}
                        >
                            <span className="mono hero-tile-idx">
                                {String(i + 1).padStart(2, '0')}
                            </span>
                            <span className="hero-tile-label">{t.label}</span>
                            <span className="hero-tile-dot" />
                        </span>
                    </motion.span>
                ))}
            </motion.div>
        </motion.div>
    );
};

export default HeroScene;