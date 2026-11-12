import { motion } from 'framer-motion';
import { EASE, inView, lineUp, drawRule } from '../../lib/motion';

/**
 * Masked reveal — the child slides up from behind a clipping edge.
 * Use for headlines and single lines of type.
 */
export const Reveal = ({
    children,
    delay = 0,
    duration = 1,
    as = 'span',
    className = '',
    ...rest
}) => {
    const Tag = motion[as] ?? motion.span;
    return (
        <span className={`reveal-clip ${className}`} {...rest}>
            <Tag
                variants={lineUp}
                initial="hidden"
                whileInView="visible"
                viewport={inView}
                transition={{ duration, ease: EASE.out, delay }}
                style={{ display: 'block' }}
            >
                {children}
            </Tag>
        </span>
    );
};

/**
 * Rise + fade. The default entrance for blocks of content.
 */
export const Rise = ({
    children,
    delay = 0,
    y = 26,
    duration = 0.85,
    as = 'div',
    className = '',
    ...rest
}) => {
    const Tag = motion[as] ?? motion.div;
    return (
        <Tag
            className={className}
            initial={{ opacity: 0, y }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inView}
            transition={{ duration, ease: EASE.out, delay }}
            {...rest}
        >
            {children}
        </Tag>
    );
};

/**
 * A hairline that draws itself in from the left.
 */
export const RuleLine = ({ delay = 0, className = '' }) => (
    <motion.hr
        className={`rule ${className}`}
        variants={drawRule}
        initial="hidden"
        whileInView="visible"
        viewport={inView}
        transition={{ delay }}
        style={{ transformOrigin: 'left center' }}
    />
);

export default Reveal;
