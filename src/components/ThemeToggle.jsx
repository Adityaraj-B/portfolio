import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { FiSun, FiMoon } from 'react-icons/fi';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <motion.button
            className="theme-toggle"
            onClick={toggleTheme}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle theme"
        >
            <motion.div
                initial={false}
                animate={{ rotate: theme === 'dark' ? 0 : 180 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="theme-icon-wrapper"
            >
                {theme === 'dark' ? (
                    <FiMoon className="theme-icon" />
                ) : (
                    <FiSun className="theme-icon" />
                )}
            </motion.div>
        </motion.button>
    );
};

export default ThemeToggle;
