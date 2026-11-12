import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { cancelFrame, frame } from 'framer-motion';
import Lenis from 'lenis';

const SmoothScrollContext = createContext({
    lenis: null,
    scrollTo: () => { },
    toTop: () => { },
    stop: () => { },
    start: () => { },
});

export const useSmoothScroll = () => useContext(SmoothScrollContext);

const expoOut = (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t));

const resolveTarget = (target) => {
    if (typeof target === 'number' || target instanceof HTMLElement) return target;
    if (typeof target === 'string') {
        const cleanId = target.replace(/^#/, '');
        return document.getElementById(cleanId) || document.querySelector(target);
    }
    return null;
};

export const SmoothScrollProvider = ({ children }) => {
    const lenisRef = useRef(null);
    const [lenisInstance, setLenisInstance] = useState(null);

    useEffect(() => {
        if (typeof window === 'undefined') return undefined;

        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        let lenis = null;

        const update = ({ timestamp }) => {
            lenis?.raf(timestamp);
        };

        const initLenis = () => {
            if (mediaQuery.matches) {
                destroyLenis();
                return;
            }

            lenis = new Lenis({
                lerp: 0.085,
                orientation: 'vertical',
                gestureOrientation: 'vertical',
                smoothWheel: true,
                syncTouch: false,
                touchMultiplier: 1.5,
                wheelMultiplier: 0.95,
                autoRaf: false,
                autoResize: true,
                overscroll: false,
            });

            lenisRef.current = lenis;
            setLenisInstance(lenis);
            frame.read(update, true);
        };

        const destroyLenis = () => {
            cancelFrame(update);
            if (lenis) {
                lenis.destroy();
                lenis = null;
            }
            lenisRef.current = null;
            setLenisInstance(null);
        };

        initLenis();
        mediaQuery.addEventListener('change', initLenis);

        return () => {
            mediaQuery.removeEventListener('change', initLenis);
            destroyLenis();
        };
    }, []);

    const scrollTo = useCallback((target, options = {}) => {
        const resolved = resolveTarget(target);
        if (resolved === null) return;

        const lenis = lenisRef.current;
        const offset = options.offset ?? -40;

        if (lenis) {
            lenis.scrollTo(resolved, {
                offset,
                duration: 1.35,
                easing: expoOut,
                ...options,
            });
            return;
        }

        if (typeof resolved === 'number') {
            window.scrollTo({ top: resolved + offset, behavior: 'smooth' });
        } else {
            const top = resolved.getBoundingClientRect().top + window.scrollY + offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    }, []);

    const toTop = useCallback((options = {}) => {
        const lenis = lenisRef.current;
        if (lenis) {
            lenis.scrollTo(0, {
                duration: 1.25,
                easing: expoOut,
                ...options,
            });
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, []);

    const stop = useCallback(() => lenisRef.current?.stop(), []);
    const start = useCallback(() => lenisRef.current?.start(), []);

    const value = useMemo(
        () => ({
            lenis: lenisInstance,
            scrollTo,
            toTop,
            stop,
            start,
        }),
        [lenisInstance, scrollTo, toTop, stop, start]
    );

    return (
        <SmoothScrollContext.Provider value={value}>
            {children}
        </SmoothScrollContext.Provider>
    );
};

export default SmoothScrollProvider;