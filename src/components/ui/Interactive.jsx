import { useCallback, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useHoverCapable } from '../../lib/hooks';
import { SPRING } from '../../lib/motion';

/**
 * Coalesces pointermove bursts down to one update per frame. A mouse can emit
 * several hundred events a second; without this each one would schedule its
 * own spring update and style write.
 */
const useFramePointer = (handler) => {
    const frame = useRef(0);
    const latest = useRef(null);

    useEffect(
        () => () => {
            if (frame.current) cancelAnimationFrame(frame.current);
        },
        [],
    );

    return useCallback(
        (event) => {
            latest.current = {
                clientX: event.clientX,
                clientY: event.clientY,
                currentTarget: event.currentTarget,
            };
            if (frame.current) return;
            frame.current = requestAnimationFrame(() => {
                frame.current = 0;
                if (latest.current) handler(latest.current);
            });
        },
        [handler],
    );
};

/**
 * Magnetic — the element leans toward the cursor while it hovers nearby,
 * then springs back. Degrades to a plain wrapper on touch devices.
 */
export const Magnetic = ({
    children,
    strength = 0.35,
    className = '',
    as = 'div',
    ...rest
}) => {
    const hoverable = useHoverCapable();
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.6 });
    const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.6 });

    const onMove = useFramePointer(
        useCallback(
            ({ clientX, clientY }) => {
                const node = ref.current;
                if (!node) return;
                const rect = node.getBoundingClientRect();
                x.set((clientX - (rect.left + rect.width / 2)) * strength);
                y.set((clientY - (rect.top + rect.height / 2)) * strength);
            },
            [strength, x, y],
        ),
    );

    const onLeave = useCallback(() => {
        x.set(0);
        y.set(0);
    }, [x, y]);

    const Tag = motion[as] ?? motion.div;

    if (!hoverable) {
        const Plain = as;
        return (
            <Plain className={className} {...rest}>
                {children}
            </Plain>
        );
    }

    return (
        <Tag
            ref={ref}
            className={className}
            style={{ x: sx, y: sy }}
            onPointerMove={onMove}
            onPointerLeave={onLeave}
            {...rest}
        >
            {children}
        </Tag>
    );
};

/**
 * Tilt — 3D parallax on pointer move, plus a sheen layer that tracks the
 * cursor. Writes --gx/--gy so CSS can position the sheen and glow.
 *
 * `depth` turns on `preserve-3d` so children marked `.tilt-layer` can sit at
 * their own `--z` and genuinely separate from the card as it turns. It is
 * opt-in because a preserved 3D context stops the card flattening to a
 * single compositor layer — fine for a handful of cards, not for a grid of
 * twenty.
 *
 * `glow` draws an accent-coloured rim that follows the cursor.
 */
export const Tilt = ({
    children,
    max = 7,
    scale = 1.012,
    className = '',
    sheen = true,
    glow = false,
    depth = false,
    ...rest
}) => {
    const hoverable = useHoverCapable();
    const ref = useRef(null);
    const rx = useMotionValue(0);
    const ry = useMotionValue(0);
    const srx = useSpring(rx, SPRING.tilt);
    const sry = useSpring(ry, SPRING.tilt);

    const onMove = useFramePointer(
        useCallback(
            ({ clientX, clientY }) => {
                const node = ref.current;
                if (!node) return;
                const rect = node.getBoundingClientRect();
                const px = (clientX - rect.left) / rect.width;
                const py = (clientY - rect.top) / rect.height;
                ry.set((px - 0.5) * max * 2);
                rx.set((0.5 - py) * max * 2);
                node.style.setProperty('--gx', `${(px * 100).toFixed(1)}%`);
                node.style.setProperty('--gy', `${(py * 100).toFixed(1)}%`);
            },
            [max, rx, ry],
        ),
    );

    const onLeave = useCallback(() => {
        rx.set(0);
        ry.set(0);
    }, [rx, ry]);

    const classes = [
        'tilt',
        sheen ? 'tilt-sheen' : '',
        glow ? 'tilt-glow' : '',
        depth ? 'tilt-depth' : '',
        className,
    ]
        .filter(Boolean)
        .join(' ');

    if (!hoverable) {
        return (
            <div className={className} {...rest}>
                {children}
            </div>
        );
    }

    return (
        <motion.div
            ref={ref}
            className={classes}
            style={{
                rotateX: srx,
                rotateY: sry,
                transformPerspective: 1100,
            }}
            whileHover={{ scale }}
            transition={{ duration: 0.45 }}
            onPointerMove={onMove}
            onPointerLeave={onLeave}
            {...rest}
        >
            {children}
        </motion.div>
    );
};

export default Magnetic;
