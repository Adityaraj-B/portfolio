import { useCallback, useEffect, useRef, useState } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';

/** Reactive media query. */
export const useMediaQuery = (query) => {
    const [matches, setMatches] = useState(() => {
        if (typeof window === 'undefined') return false;
        return window.matchMedia(query).matches;
    });

    useEffect(() => {
        const mql = window.matchMedia(query);
        const onChange = (e) => setMatches(e.matches);
        setMatches(mql.matches);
        mql.addEventListener('change', onChange);
        return () => mql.removeEventListener('change', onChange);
    }, [query]);

    return matches;
};

/** True on pointer-fine devices wide enough for hover affordances. */
export const useHoverCapable = () =>
    useMediaQuery('(hover: hover) and (pointer: fine) and (min-width: 900px)');

/** True when the OS asks for reduced motion. */
export const useReducedMotion = () =>
    useMediaQuery('(prefers-reduced-motion: reduce)');

/**
 * Tracks which section id currently owns the viewport.
 *
 * Uses IntersectionObserver rather than reading boundingClientRect on every
 * scroll event: the old approach forced a synchronous layout for each section
 * on every frame of Lenis momentum, which is the classic cause of scroll jank.
 * The observer hands us the same answer off the main thread and only fires
 * when a section actually crosses the band.
 */
export const useActiveSection = (ids) => {
    const [active, setActive] = useState('');

    useEffect(() => {
        if (!ids.length || typeof IntersectionObserver === 'undefined') {
            return undefined;
        }

        const intersecting = new Set();

        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) intersecting.add(entry.target.id);
                    else intersecting.delete(entry.target.id);
                }
                // First in document order wins: that is the section whose top
                // sits in the reading band, i.e. the one being read.
                setActive(ids.find((id) => intersecting.has(id)) ?? '');
            },
            { rootMargin: '-25% 0px -45% 0px', threshold: 0 },
        );

        for (const id of ids) {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        }

        return () => observer.disconnect();
    }, [ids]);

    return active;
};

/** Copy to clipboard with a transient "copied" flag. */
export const useCopy = (resetAfter = 1800) => {
    const [copied, setCopied] = useState(false);
    const timer = useRef(null);

    const copy = useCallback(
        async (text) => {
            try {
                await navigator.clipboard.writeText(text);
            } catch {
                const ta = document.createElement('textarea');
                ta.value = text;
                ta.style.position = 'fixed';
                ta.style.opacity = '0';
                document.body.appendChild(ta);
                ta.select();
                document.execCommand('copy');
                document.body.removeChild(ta);
            }
            setCopied(true);
            clearTimeout(timer.current);
            timer.current = setTimeout(() => setCopied(false), resetAfter);
        },
        [resetAfter],
    );

    useEffect(() => () => clearTimeout(timer.current), []);

    return [copied, copy];
};

/** Rotates through a list of strings on an interval. */
export const useRotatingIndex = (length, interval = 2600) => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (length <= 1) return undefined;
        const id = setInterval(
            () => setIndex((i) => (i + 1) % length),
            interval,
        );
        return () => clearInterval(id);
    }, [length, interval]);

    return index;
};

/**
 * Moves the cursor spotlight by writing a transform straight onto one node.
 *
 * The previous version set --mx/--my on documentElement, which invalidated an
 * inherited custom property for every element on the page on each pointer
 * move, and drove a full-viewport gradient repaint. Transforming a single
 * pre-painted layer instead stays entirely on the compositor.
 */
export const usePointerSpotlight = (ref, enabled = true) => {
    useEffect(() => {
        if (!enabled || !ref?.current) return undefined;

        const node = ref.current;
        let frame = 0;
        let x = 0;
        let y = 0;

        const apply = () => {
            frame = 0;
            node.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        };

        const onMove = (e) => {
            x = e.clientX;
            y = e.clientY;
            if (!frame) frame = requestAnimationFrame(apply);
        };

        window.addEventListener('pointermove', onMove, { passive: true });
        return () => {
            window.removeEventListener('pointermove', onMove);
            if (frame) cancelAnimationFrame(frame);
        };
    }, [ref, enabled]);
};

const TILT_SPRING = { stiffness: 50, damping: 18, mass: 1.2 };

/**
 * Whole-stage parallax: two slow springs (degrees) that lean toward the
 * pointer's position in the viewport. `nx`/`ny` are the smoothed -1..1
 * offsets for layers that want to translate rather than rotate.
 *
 * One frame-coalesced listener per consumer; the springs are what make it
 * feel heavy and expensive rather than jittery.
 */
export const usePointerTilt = (max = 4, enabled = true) => {
    const nx = useMotionValue(0);
    const ny = useMotionValue(0);
    const rx = useMotionValue(0);
    const ry = useMotionValue(0);
    const rotateX = useSpring(rx, TILT_SPRING);
    const rotateY = useSpring(ry, TILT_SPRING);
    const sx = useSpring(nx, TILT_SPRING);
    const sy = useSpring(ny, TILT_SPRING);

    useEffect(() => {
        if (!enabled) {
            nx.set(0);
            ny.set(0);
            rx.set(0);
            ry.set(0);
            return undefined;
        }

        let frame = 0;
        let px = 0;
        let py = 0;

        const apply = () => {
            frame = 0;
            nx.set(px);
            ny.set(py);
            rx.set(-py * max);
            ry.set(px * max);
        };

        const onMove = (e) => {
            px = (e.clientX / window.innerWidth - 0.5) * 2;
            py = (e.clientY / window.innerHeight - 0.5) * 2;
            if (!frame) frame = requestAnimationFrame(apply);
        };

        window.addEventListener('pointermove', onMove, { passive: true });
        return () => {
            window.removeEventListener('pointermove', onMove);
            if (frame) cancelAnimationFrame(frame);
        };
    }, [enabled, max, nx, ny, rx, ry]);

    return { rotateX, rotateY, nx: sx, ny: sy };
};

/** Locks body scroll (used by the project sheet). */
export const useScrollLock = (locked) => {
    useEffect(() => {
        if (!locked) return undefined;
        const prev = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = prev;
        };
    }, [locked]);
};
