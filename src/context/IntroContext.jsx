import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react';

const SEEN_KEY = 'portfolio-intro-seen';

const IntroContext = createContext({
    done: true,
    playing: false,
    finish: () => { },
});

/** `done` flips true once the intro curtain has lifted (or was skipped). */
export const useIntro = () => useContext(IntroContext);

const shouldPlay = () => {
    if (typeof window === 'undefined') return false;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
    try {
        return window.sessionStorage.getItem(SEEN_KEY) !== '1';
    } catch {
        return true;
    }
};

/**
 * Owns the one-time intro curtain. The hero waits for `done` so its
 * entrance plays to an audience rather than behind the curtain.
 *
 * Plays once per tab session: a reload mid-browse should not make the
 * visitor sit through it again.
 */
export const IntroProvider = ({ children }) => {
    const [playing] = useState(shouldPlay);
    const [done, setDone] = useState(() => !shouldPlay());

    useEffect(() => {
        if (!playing) return undefined;
        try {
            window.sessionStorage.setItem(SEEN_KEY, '1');
        } catch {
            /* storage blocked — the intro simply plays again next time */
        }
        return undefined;
    }, [playing]);

    const value = useMemo(
        () => ({ done, playing, finish: () => setDone(true) }),
        [done, playing],
    );

    return <IntroContext.Provider value={value}>{children}</IntroContext.Provider>;
};

export default IntroContext;
