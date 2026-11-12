import { useRef } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useHoverCapable, usePointerSpotlight, usePointerTilt } from '../lib/hooks';

/**
 * Backdrop — the full-page atmosphere, composed entirely of CSS layers:
 *
 *   1. aurora   three drifting colour fields, transform-only on their own
 *               layers (no parent blur filter — see components.css)
 *   2. grid     a faint engineering grid that fades out toward the edges
 *   3. spot     a pre-painted gradient disc the cursor drags around
 *   4. grain    static film grain that stops the gradients banding
 *
 * The aurora and grid also parallax a little against the page and the
 * pointer, at different rates, so the background has depth of its own.
 * Everything here is painted once and then only composited, so the backdrop
 * costs nothing per frame while scrolling.
 */
const Backdrop = () => {
    const hoverable = useHoverCapable();
    const spotRef = useRef(null);
    usePointerSpotlight(spotRef, hoverable);

    const { scrollY } = useScroll();
    const smooth = useSpring(scrollY, { stiffness: 60, damping: 24, mass: 1 });
    const { nx, ny } = usePointerTilt(1, hoverable);

    const auroraY = useTransform([smooth, ny], ([s, n]) => s * -0.08 + n * -16);
    const auroraX = useTransform(nx, (v) => v * -22);
    const gridY = useTransform(smooth, (v) => v * -0.035);
    const gridX = useTransform(nx, (v) => v * -8);

    return (
        <div className="backdrop" aria-hidden="true">
            <motion.div className="aurora" style={{ y: auroraY, x: auroraX }}>
                <span className="aurora-blob blob-1" />
                <span className="aurora-blob blob-2" />
                <span className="aurora-blob blob-3" />
            </motion.div>
            <motion.div className="bg-grid" style={{ y: gridY, x: gridX }} />
            {hoverable ? <div className="bg-spot" ref={spotRef} /> : null}
            <div className="bg-grain" />
            <div className="bg-vignette" />
        </div>
    );
};

export default Backdrop;
