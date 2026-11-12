import { useEffect, useRef } from 'react';
import { animate, useInView } from 'framer-motion';
import { EASE } from '../../lib/motion';

/**
 * Counter — eases a number up to its value the first time it scrolls into
 * view (and, when `active` is passed, only once that is also true — the hero
 * uses it to wait for the intro curtain).
 *
 * Writes the digits straight to the DOM node rather than holding them in
 * state: four counters animating via setState meant four React re-renders
 * per frame during the hero's entrance, exactly when the main thread is
 * busiest.
 */
const Counter = ({
    value,
    decimals = 0,
    suffix = '',
    duration = 1.5,
    delay = 0,
    active = true,
}) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '0px 0px -24px 0px' });
    const visible = inView && active;

    useEffect(() => {
        const node = ref.current;
        if (!node) return undefined;

        const format = (v) => v.toFixed(decimals) + suffix;

        if (!visible) {
            node.textContent = format(0);
            return undefined;
        }

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            node.textContent = format(value);
            return undefined;
        }

        const controls = animate(0, value, {
            duration,
            delay,
            ease: EASE.out,
            onUpdate: (v) => {
                node.textContent = format(v);
            },
        });

        return () => controls.stop();
    }, [visible, value, decimals, suffix, duration, delay]);

    return <span ref={ref} className="counter" />;
};

export default Counter;
