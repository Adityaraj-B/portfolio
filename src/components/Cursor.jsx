import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
// eslint-disable-next-line no-unused-vars
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { EASE } from '../lib/motion';
import { useHoverCapable } from '../lib/hooks';

const RING = 84; // px — the ring is always this big and scaled down

const MODE_SCALE = {
    default: 30 / RING,
    link: 52 / RING,
    label: 1,
    hide: 30 / RING,
};

/**
 * Cursor — a two-part pointer: an instant dot and a lagging ring.
 * Any element carrying `data-cursor="..."` swells the ring and can print a
 * label inside it (e.g. "Open", "Write"). Desktop + fine pointer only.
 *
 * The ring is a fixed-size element driven by `scale`. Animating its width and
 * height instead, as this first did, relaid out the element on every frame of
 * every hover. A press squeezes the ring so clicks feel acknowledged.
 */
const Cursor = () => {
    const hoverable = useHoverCapable();

    const x = useMotionValue(-200);
    const y = useMotionValue(-200);
    const ringX = useSpring(x, { stiffness: 260, damping: 26, mass: 0.5 });
    const ringY = useSpring(y, { stiffness: 260, damping: 26, mass: 0.5 });

    const [label, setLabel] = useState('');
    const [mode, setMode] = useState('default');
    const [visible, setVisible] = useState(false);
    const [pressed, setPressed] = useState(false);
    // Mirrored in a ref so the move handler never re-subscribes.
    const visibleRef = useRef(false);

    useEffect(() => {
        if (!hoverable) return undefined;

        const onMove = (e) => {
            x.set(e.clientX);
            y.set(e.clientY);
            if (!visibleRef.current) {
                visibleRef.current = true;
                setVisible(true);
            }
        };

        const onOver = (e) => {
            const target = e.target.closest?.('[data-cursor]');
            const value = target?.getAttribute('data-cursor');
            // `default` lets a region (the project sheet) opt out of an
            // ancestor's label, so only the backdrop says "Close".
            if (!target || value === 'default') {
                setMode('default');
                setLabel('');
                return;
            }
            if (value === 'link' || value === 'hide') {
                setMode(value);
                setLabel('');
            } else {
                setMode('label');
                setLabel(value);
            }
        };

        const onLeave = () => {
            visibleRef.current = false;
            setVisible(false);
        };
        const onDown = () => setPressed(true);
        const onUp = () => setPressed(false);

        window.addEventListener('pointermove', onMove, { passive: true });
        window.addEventListener('pointerover', onOver, { passive: true });
        window.addEventListener('pointerdown', onDown, { passive: true });
        window.addEventListener('pointerup', onUp, { passive: true });
        document.addEventListener('pointerleave', onLeave);

        return () => {
            window.removeEventListener('pointermove', onMove);
            window.removeEventListener('pointerover', onOver);
            window.removeEventListener('pointerdown', onDown);
            window.removeEventListener('pointerup', onUp);
            document.removeEventListener('pointerleave', onLeave);
        };
    }, [hoverable, x, y]);

    if (!hoverable) return null;

    const shown = visible && mode !== 'hide';
    const ringScale = MODE_SCALE[mode] * (pressed ? 0.78 : 1);

    // Portalled to <body>: #root is an isolated stacking context, so anything
    // rendered inside it, whatever its z-index, sits below overlays that are
    // themselves portalled to <body> (the project sheet). Living next to them
    // lets the cursor's own z-index put it on top.
    return createPortal(
        <>
            <motion.div
                className="cursor-dot"
                style={{ x, y }}
                animate={{
                    opacity: shown ? 1 : 0,
                    scale: mode === 'label' ? 0 : pressed ? 1.6 : 1,
                }}
                transition={{ duration: 0.2 }}
            />
            <motion.div
                className={`cursor-ring is-${mode}`}
                style={{ x: ringX, y: ringY, width: RING, height: RING }}
                animate={{ opacity: shown ? 1 : 0, scale: ringScale }}
                transition={{ duration: 0.3, ease: EASE.out }}
            >
                <motion.span
                    className="mono cursor-label"
                    animate={{ opacity: mode === 'label' ? 1 : 0 }}
                    transition={{ duration: 0.18 }}
                >
                    {label}
                </motion.span>
            </motion.div>
        </>,
        document.body,
    );
};

export default Cursor;
