import { useRef } from 'react';
import {
    AnimatePresence,
    // eslint-disable-next-line no-unused-vars
    motion,
    useScroll,
    useSpring,
    useTransform,
} from 'framer-motion';
import { FiArrowDown, FiArrowUpRight } from 'react-icons/fi';
import { profile, stats } from '../data/profile';
import { EASE } from '../lib/motion';
import { useHoverCapable, usePointerTilt, useRotatingIndex } from '../lib/hooks';
import { useSmoothScroll } from '../lib/SmoothScroll';
import { useIntro } from '../context/IntroContext';
import SplitText from './ui/SplitText';
import Counter from './ui/Counter';
import { Magnetic } from './ui/Interactive';
import HeroScene from './HeroScene';

const riseIn = (delay = 0, y = 24) => ({
    hidden: { opacity: 0, y, filter: 'blur(6px)' },
    visible: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: { duration: 1.05, ease: EASE.out, delay },
    },
});

const statsContainerVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.08, delayChildren: 0.95 },
    },
};

const statItemVariants = {
    hidden: { opacity: 0, y: 20, filter: 'blur(4px)' },
    visible: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: { duration: 0.85, ease: EASE.out },
    },
};

const tickerVariants = {
    initial: { y: '110%', opacity: 0, rotateX: -45, filter: 'blur(4px)' },
    animate: {
        y: '0%',
        opacity: 1,
        rotateX: 0,
        filter: 'blur(0px)',
        transition: { duration: 0.65, ease: EASE.out },
    },
    exit: {
        y: '-110%',
        opacity: 0,
        rotateX: 45,
        filter: 'blur(4px)',
        transition: { duration: 0.5, ease: EASE.inOut || EASE.out },
    },
};

const Hero = () => {
    const ref = useRef(null);
    const { scrollTo } = useSmoothScroll();
    const { done: play } = useIntro();
    const hoverable = useHoverCapable();
    const roleIndex = useRotatingIndex(profile.roleRotation.length, 3000);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start start', 'end start'],
    });

    const smoothScroll = useSpring(scrollYProgress, {
        stiffness: 110,
        damping: 26,
        mass: 0.25,
        restDelta: 0.001,
    });

    const eyebrowY = useTransform(smoothScroll, [0, 1], ['0%', '-45%']);
    const firstNameY = useTransform(smoothScroll, [0, 1], ['0%', '-36%']);
    const lastNameY = useTransform(smoothScroll, [0, 1], ['0%', '-26%']);
    const asideY = useTransform(smoothScroll, [0, 1], ['0%', '-16%']);
    const statsY = useTransform(smoothScroll, [0, 1], ['0%', '-8%']);
    const sceneY = useTransform(smoothScroll, [0, 1], ['0%', '20%']);
    const fade = useTransform(smoothScroll, [0, 0.72], [1, 0]);
    const scale = useTransform(smoothScroll, [0, 1], [1, 0.94]);

    const { rotateX, rotateY } = usePointerTilt(1.4, hoverable);

    return (
        <header className="hero" ref={ref} id="top">
            <HeroScene
                play={play}
                style={{ opacity: fade, y: sceneY, willChange: 'transform, opacity' }}
            />

            <motion.div
                className="hero-inner shell"
                style={{
                    scale,
                    rotateX,
                    rotateY,
                    transformPerspective: 1600,
                    willChange: 'transform',
                }}
            >
                <motion.div
                    className="hero-eyebrow"
                    style={{ y: eyebrowY, opacity: fade }}
                    initial="hidden"
                    animate={play ? 'visible' : 'hidden'}
                >
                    {profile.available && (
                        <motion.span className="chip chip-live" variants={riseIn(0.1, 14)}>
                            <span className="chip-dot" />
                            {profile.availabilityNote}
                        </motion.span>
                    )}

                    <motion.span className="mono hero-place" variants={riseIn(0.24, 14)}>
                        {profile.location}
                    </motion.span>
                </motion.div>

                <motion.h1
                    className="hero-name display"
                    style={{ opacity: fade }}
                >
                    <motion.span
                        className="hero-name-line"
                        style={{ y: firstNameY, display: 'block', willChange: 'transform' }}
                    >
                        <SplitText
                            text={profile.firstName}
                            mode="char"
                            stagger={0.032}
                            duration={1.15}
                            delay={0.15}
                            lineHeight="0.9"
                            play={play}
                        />
                    </motion.span>
                    <motion.span
                        className="hero-name-line hero-name-last"
                        style={{ y: lastNameY, display: 'block', willChange: 'transform' }}
                    >
                        <SplitText
                            text={profile.lastName}
                            mode="char"
                            stagger={0.032}
                            duration={1.15}
                            delay={0.32}
                            lineHeight="0.9"
                            play={play}
                        />
                    </motion.span>
                </motion.h1>

                <motion.div
                    className="hero-body"
                    style={{ y: asideY, opacity: fade, willChange: 'transform, opacity' }}
                    initial="hidden"
                    animate={play ? 'visible' : 'hidden'}
                >
                    <motion.div className="hero-role" variants={riseIn(0.55)}>
                        <span className="mono hero-role-label">Currently</span>
                        <div className="hero-role-ticker">
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={roleIndex}
                                    variants={tickerVariants}
                                    initial="initial"
                                    animate="animate"
                                    exit="exit"
                                    style={{
                                        display: 'inline-block',
                                        transformPerspective: 600,
                                        transformOrigin: '50% 50% -20px',
                                        willChange: 'transform, opacity, filter',
                                    }}
                                >
                                    {profile.roleRotation[roleIndex]}
                                </motion.span>
                            </AnimatePresence>
                        </div>
                    </motion.div>

                    <div>
                        <motion.p className="lede hero-lede" variants={riseIn(0.68)}>
                            {profile.tagline}
                        </motion.p>

                        <motion.div className="hero-cta" variants={riseIn(0.8)}>
                            <Magnetic strength={0.22}>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={() => scrollTo('work')}
                                    data-cursor="hide"
                                >
                                    See the work <FiArrowDown />
                                </button>
                            </Magnetic>
                            <Magnetic strength={0.22}>
                                <a
                                    href={profile.links.email}
                                    className="btn btn-ghost"
                                    data-cursor="hide"
                                >
                                    Get in touch <FiArrowUpRight />
                                </a>
                            </Magnetic>
                        </motion.div>
                    </div>
                </motion.div>

                <motion.dl
                    className="hero-stats"
                    style={{ y: statsY, opacity: fade, willChange: 'transform, opacity' }}
                    initial="hidden"
                    animate={play ? 'visible' : 'hidden'}
                    variants={statsContainerVariants}
                >
                    {stats.map((stat) => (
                        <motion.div
                            className="hero-stat"
                            key={stat.label}
                            variants={statItemVariants}
                        >
                            <dt className="hero-stat-value">
                                <Counter
                                    value={stat.value}
                                    decimals={stat.decimals ?? 0}
                                    suffix={stat.suffix}
                                    delay={0.95}
                                    active={play}
                                />
                            </dt>
                            <dd className="mono hero-stat-label">{stat.label}</dd>
                        </motion.div>
                    ))}
                </motion.dl>
            </motion.div>

            <motion.div
                className="hero-scroll-wrap"
                style={{ opacity: fade, willChange: 'opacity' }}
            >
                <motion.button
                    type="button"
                    className="hero-scroll"
                    onClick={() => scrollTo('work')}
                    initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
                    animate={
                        play
                            ? { opacity: 1, y: 0, filter: 'blur(0px)' }
                            : { opacity: 0, y: 12, filter: 'blur(4px)' }
                    }
                    transition={{ delay: 1.4, duration: 1, ease: EASE.out }}
                    aria-label="Scroll to work"
                    data-cursor="hide"
                >
                    <span className="mono">Scroll</span>
                    <span className="hero-scroll-rail">
                        <span className="hero-scroll-dot" />
                    </span>
                </motion.button>
            </motion.div>
        </header>
    );
};

export default Hero;