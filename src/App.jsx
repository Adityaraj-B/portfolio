import { useEffect } from 'react';
import {
    BrowserRouter,
    Route,
    Routes,
    useLocation,
} from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';

import { ThemeProvider } from './context/ThemeContext';
import { IntroProvider } from './context/IntroContext';
import SmoothScrollProvider, { useSmoothScroll } from './lib/SmoothScroll';
import { pageTransition } from './lib/motion';

import Backdrop from './components/Backdrop';
import Cursor from './components/Cursor';
import Intro from './components/Intro';
import ScrollProgress from './components/ScrollProgress';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Work from './components/Work';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Credentials from './components/Credentials';
import Contact from './components/Contact';
import ResumePage from './components/ResumePage';

import './styles/main.css';

/**
 * Jump to the top instantly on route change so transitions start clean.
 * Goes through Lenis when it is running — a bare window.scrollTo would
 * leave Lenis's internal position desynced and cause a jump on first wheel.
 */
const ResetScroll = () => {
    const { pathname } = useLocation();
    const { lenis } = useSmoothScroll();

    useEffect(() => {
        if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
        else window.scrollTo(0, 0);
    }, [pathname, lenis]);

    return null;
};

const Page = ({ children }) => (
    <motion.div
        variants={pageTransition}
        initial="initial"
        animate="animate"
        exit="exit"
    >
        {children}
    </motion.div>
);

const Home = () => (
    <Page>
        <Hero />
        <Work />
        <About />
        <Experience />
        <Skills />
        <Credentials />
        <Contact />
    </Page>
);

const Shell = () => {
    const location = useLocation();
    return (
        <>
            <ResetScroll />
            <Navbar />
            <AnimatePresence mode="wait" initial={false}>
                <Routes location={location} key={location.pathname}>
                    <Route path="/" element={<Home />} />
                    <Route
                        path="/resume"
                        element={
                            <Page>
                                <ResumePage />
                            </Page>
                        }
                    />
                    <Route path="*" element={<Home />} />
                </Routes>
            </AnimatePresence>
        </>
    );
};

const App = () => (
    <MotionConfig reducedMotion="user">
        <ThemeProvider>
            <SmoothScrollProvider>
                <IntroProvider>
                    <Backdrop />
                    <Cursor />
                    <ScrollProgress />
                    <Intro />
                    <BrowserRouter>
                        <Shell />
                    </BrowserRouter>
                </IntroProvider>
            </SmoothScrollProvider>
        </ThemeProvider>
    </MotionConfig>
);

export default App;
