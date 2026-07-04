import { useEffect, useRef, useState } from 'react';

/**
 * useReadFocus
 * -------------
 * Tracks whether the observed element currently sits inside the "reading
 * band" of the viewport (by default, the middle ~40% of the screen).
 *
 * Attach the returned ref to a section/header/footer element and use the
 * returned boolean to toggle a class (e.g. "is-reading"). CSS then fades a
 * blurred glass backdrop in behind that section's text while it's centered
 * on screen (i.e. while the user is actually reading it), and fades it back
 * out once the section scrolls out of that band — so the space *between*
 * sections stays clear.
 *
 * @param {string} rootMargin - shrinks the viewport used for intersection
 *   checks. '-30% 0px -30% 0px' means only the middle 40% of the screen
 *   counts as "in focus". Make the percentages smaller (e.g. -15%) for a
 *   larger, more forgiving reading band; larger (e.g. -40%) for a tighter one.
 */
const useReadFocus = (rootMargin = '-30% 0px -30% 0px') => {
    const ref = useRef(null);
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
        const node = ref.current;
        if (!node || typeof IntersectionObserver === 'undefined') return undefined;

        const observer = new IntersectionObserver(
            ([entry]) => setIsFocused(entry.isIntersecting),
            { root: null, rootMargin, threshold: 0 }
        );

        observer.observe(node);
        return () => observer.disconnect();
    }, [rootMargin]);

    return [ref, isFocused];
};

export default useReadFocus;
