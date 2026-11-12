import { useRef } from 'react';
import {
    // eslint-disable-next-line no-unused-vars
    motion,
    useAnimationFrame,
    useInView,
    useMotionValue,
    useScroll,
    useSpring,
    useTransform,
    useVelocity,
    wrap,
} from 'framer-motion';

/**
 * Marquee — an infinitely scrolling ribbon of items that reacts to the
 * page: scroll faster and it speeds up, scroll back up and it reverses,
 * then eases back to its idle drift. Hovering slows it to a crawl so the
 * items can be read.
 *
 * One transform write per frame on a promoted layer, and it stops ticking
 * entirely while off-screen.
 */
const Marquee = ({
    items,
    speed = 38,
    reverse = false,
    separator = '•',
    className = '',
}) => {
    const ref = useRef(null);
    const inView = useInView(ref, { margin: '120px 0px' });
    const hovered = useRef(false);

    const baseX = useMotionValue(0);
    const { scrollY } = useScroll();
    const velocity = useVelocity(scrollY);
    const smooth = useSpring(velocity, { damping: 50, stiffness: 400 });
    // px/s of scroll → a multiplier on the base drift.
    const factor = useTransform(smooth, [0, 1200], [0, 4], { clamp: false });
    const direction = useRef(reverse ? -1 : 1);

    // Percentage of the track; two copies of the row make -50% a seamless loop.
    const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);

    // `speed` is seconds per full loop; convert to %/s.
    const baseVelocity = 50 / speed;

    useAnimationFrame((_, delta) => {
        if (!inView) return;
        const dt = delta / 1000;
        const f = factor.get();

        if (f < -0.05) direction.current = reverse ? 1 : -1;
        else if (f > 0.05) direction.current = reverse ? -1 : 1;

        const crawl = hovered.current ? 0.18 : 1;
        let move = direction.current * baseVelocity * dt * crawl;
        move += move * Math.abs(f);
        baseX.set(baseX.get() + move);
    });

    const row = (
        <ul className="marquee-row" aria-hidden="true">
            {items.map((item, i) => (
                <li key={`${item}-${i}`} className="marquee-item">
                    <span>{item}</span>
                    <span className="marquee-sep">{separator}</span>
                </li>
            ))}
        </ul>
    );

    return (
        <div
            className={`marquee ${className}`}
            ref={ref}
            onPointerEnter={() => {
                hovered.current = true;
            }}
            onPointerLeave={() => {
                hovered.current = false;
            }}
        >
            <motion.div className="marquee-track" style={{ x }}>
                {row}
                {row}
            </motion.div>
            <span className="sr-only">{items.join(', ')}</span>
        </div>
    );
};

export default Marquee;
