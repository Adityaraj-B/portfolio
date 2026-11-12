// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { FiMoon, FiSun } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import { SPRING } from '../lib/motion';

/**
 * A two-state track. The knob slides and the icon crossfades, so the
 * control reads as a physical switch rather than a button that changes.
 */
const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <button
            type="button"
            className="theme-toggle"
            onClick={(e) => toggleTheme(e)}
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
            data-cursor="hide"
        >
            <span className="theme-track" data-state={isDark ? 'dark' : 'light'}>
                <motion.span className="theme-knob" layout transition={SPRING.snappy}>
                    <motion.span
                        key={theme}
                        initial={{ opacity: 0, rotate: -70, scale: 0.6 }}
                        animate={{ opacity: 1, rotate: 0, scale: 1 }}
                        transition={{ duration: 0.35 }}
                        className="theme-knob-icon"
                    >
                        {isDark ? <FiMoon /> : <FiSun />}
                    </motion.span>
                </motion.span>
            </span>
        </button>
    );
};

export default ThemeToggle;
