import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react';
import { flushSync } from 'react-dom';

const STORAGE_KEY = 'portfolio-theme';
const ThemeContext = createContext({ theme: 'dark', toggleTheme: () => { } });

export const useTheme = () => useContext(ThemeContext);

const resolveInitialTheme = () => {
    if (typeof window === 'undefined') return 'dark';
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === 'dark' || saved === 'light') return saved;
    // No stored choice: follow the OS, defaulting to dark.
    return window.matchMedia('(prefers-color-scheme: light)').matches
        ? 'light'
        : 'dark';
};

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(resolveInitialTheme);

    useEffect(() => {
        const root = document.documentElement;
        root.setAttribute('data-theme', theme);
        root.style.colorScheme = theme;
        window.localStorage.setItem(STORAGE_KEY, theme);

        const meta = document.querySelector('meta[name="theme-color"]');
        if (meta) meta.setAttribute('content', theme === 'dark' ? '#07070a' : '#f7f4ee');
    }, [theme]);

    /**
     * Flip the theme. When the browser supports the View Transitions API the
     * new palette floods out from the point that was clicked — a circular
     * wipe — instead of every surface cross-fading on its own schedule.
     * `event` is optional; without it the wipe starts at the top right.
     */
    const toggleTheme = useCallback((event) => {
        const flip = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (typeof document.startViewTransition !== 'function' || reduce) {
            flip();
            return;
        }

        const x = event?.clientX ?? window.innerWidth - 48;
        const y = event?.clientY ?? 40;
        const radius = Math.hypot(
            Math.max(x, window.innerWidth - x),
            Math.max(y, window.innerHeight - y),
        );
        const root = document.documentElement;
        root.style.setProperty('--vt-x', `${x}px`);
        root.style.setProperty('--vt-y', `${y}px`);
        root.style.setProperty('--vt-r', `${radius}px`);
        root.classList.add('vt-theme');

        const release = () => root.classList.remove('vt-theme');
        const transition = document.startViewTransition(() => {
            flushSync(flip);
        });
        transition.finished.finally(release);
        // Belt and braces: never leave the page with its transitions frozen.
        setTimeout(release, 1500);
    }, []);

    const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export default ThemeContext;
