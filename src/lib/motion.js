/**
 * Shared motion language. Every component pulls its easing and variants
 * from here so the whole site animates with one personality.
 */

export const EASE = {
    out: [0.16, 1, 0.3, 1],
    quart: [0.25, 1, 0.5, 1],
    inOut: [0.83, 0, 0.17, 1],
    soft: [0.22, 1, 0.36, 1],
};

export const SPRING = {
    soft: { type: 'spring', stiffness: 120, damping: 20, mass: 0.9 },
    snappy: { type: 'spring', stiffness: 380, damping: 30 },
    glide: { type: 'spring', stiffness: 60, damping: 18, mass: 1.1 },
    /** For 3D tilt: heavy enough that the card feels like it has mass. */
    tilt: { stiffness: 150, damping: 18, mass: 0.8 },
};

/** Intro curtain timing, in seconds: how long it holds, how long it lifts. */
export const INTRO = { hold: 1.4, lift: 1 };

/** Default in-view trigger — fires a touch before the element is centred. */
export const inView = { once: true, margin: '-12% 0px -12% 0px' };
export const inViewSoft = { once: true, margin: '0px 0px -8% 0px' };

/** Container that staggers its children. */
export const stagger = (step = 0.07, delay = 0) => ({
    hidden: {},
    visible: {
        transition: { staggerChildren: step, delayChildren: delay },
    },
});

/** Rise + fade — the workhorse. */
export const rise = (y = 26, duration = 0.85) => ({
    hidden: { opacity: 0, y },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration, ease: EASE.out },
    },
});

/** Masked line reveal — pair with a .reveal-clip parent. */
export const lineUp = {
    hidden: { y: '110%', opacity: 0 },
    visible: {
        y: '0%',
        opacity: 1,
        transition: { duration: 1, ease: EASE.out },
    },
};

/** Scale-in for cards and tiles. */
export const popIn = {
    hidden: { opacity: 0, y: 18, scale: 0.97 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.7, ease: EASE.out },
    },
};

/**
 * Card that swings up out of the page plane. Pair with
 * `transformPerspective` on the element so the rotation reads as depth.
 */
export const swingUp = (delay = 0) => ({
    hidden: { opacity: 0, y: 40, rotateX: -14, scale: 0.97 },
    visible: {
        opacity: 1,
        y: 0,
        rotateX: 0,
        scale: 1,
        transition: { duration: 0.95, ease: EASE.out, delay },
    },
});

/** Horizontal slide, used by list rows. */
export const slideIn = (x = -24) => ({
    hidden: { opacity: 0, x },
    visible: { opacity: 1, x: 0, transition: { duration: 0.75, ease: EASE.out } },
});

/** Draws a 1px rule from left to right. */
export const drawRule = {
    hidden: { scaleX: 0 },
    visible: {
        scaleX: 1,
        transition: { duration: 1.1, ease: EASE.inOut },
    },
};

/** Route-level page transition. */
export const pageTransition = {
    initial: { opacity: 0, y: 18, scale: 0.995 },
    animate: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.7, ease: EASE.out },
    },
    exit: {
        opacity: 0,
        y: -12,
        scale: 0.995,
        transition: { duration: 0.32, ease: EASE.quart },
    },
};

/** Overlay / modal pair. */
export const overlayFade = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.35, ease: EASE.out } },
    exit: { opacity: 0, transition: { duration: 0.25, ease: EASE.quart } },
};

export const sheetRise = {
    initial: { opacity: 0, y: 56, scale: 0.97, rotateX: 6 },
    animate: {
        opacity: 1,
        y: 0,
        scale: 1,
        rotateX: 0,
        transition: { duration: 0.65, ease: EASE.out },
    },
    exit: {
        opacity: 0,
        y: 28,
        scale: 0.985,
        rotateX: 3,
        transition: { duration: 0.3, ease: EASE.quart },
    },
};
