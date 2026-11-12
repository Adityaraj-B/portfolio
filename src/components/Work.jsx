import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import {
    FiArrowUpRight,
    FiChevronDown,
    FiChevronUp,
    FiGithub,
    FiLock,
    FiX,
    FiCheck,
} from 'react-icons/fi';
import { FaGooglePlay, FaMicrosoft } from 'react-icons/fa';
import { projects } from '../data/work';
import { EASE, inView, overlayFade, sheetRise, swingUp } from '../lib/motion';
import { useScrollLock } from '../lib/hooks';
import { useSmoothScroll } from '../lib/SmoothScroll';
import SectionHead from './ui/SectionHead';
import { Tilt } from './ui/Interactive';

// Projects shown before the "show more" control. Anything added to the data
// file beyond this count tucks itself behind the toggle automatically.
const PREVIEW_COUNT = 3;

const STORE_ICONS = { play: FaGooglePlay, microsoft: FaMicrosoft };

/* ---------------------------------------------------------------- media */

const ProjectMedia = ({ project }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start'],
    });
    // Slow counter-scroll inside the frame: the classic editorial parallax.
    // Only `y` is animated — the oscillating scale that used to ride along
    // forced the browser to re-rasterise a 1200px image on every frame. The
    // overscale it provided is now a static CSS height instead.
    const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

    return (
        <div className="prj-media" ref={ref}>
            <motion.div
                className="prj-media-frame"
                initial={{ clipPath: 'inset(12% 8% 12% 8%)' }}
                whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
                viewport={inView}
                transition={{ duration: 1, ease: EASE.inOut }}
            >
                {project.image ? (
                    <motion.img
                        src={project.image}
                        alt={`${project.title} — ${project.subtitle}`}
                        loading="lazy"
                        decoding="async"
                        style={{ y }}
                        initial={{ scale: 1.18 }}
                        whileInView={{ scale: 1 }}
                        viewport={inView}
                        transition={{ duration: 1.4, ease: EASE.out }}
                    />
                ) : project.logo ? (
                    <motion.div
                        className="prj-media-logo"
                        style={{ y, background: project.logoBg }}
                    >
                        <img
                            src={project.logo}
                            alt={`${project.title} logo`}
                            loading="lazy"
                            decoding="async"
                        />
                    </motion.div>
                ) : (
                    <motion.div
                        className="prj-media-synth"
                        style={{ y, '--accent-project': project.accent }}
                    >
                        <span className="prj-media-mark display">{project.title.charAt(0)}</span>
                        <div className="prj-media-lines">
                            {project.tech.slice(0, 5).map((t, i) => (
                                <span key={t} style={{ '--i': i }}>
                                    {t}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                )}
                {project.logo ? null : <span className="prj-media-sheen" />}
            </motion.div>

            <span className="chip prj-status">
                {project.private ? <FiLock /> : <span className="chip-dot" />}
                {project.status}
            </span>
        </div>
    );
};

/* ----------------------------------------------------------------- row */

// The card swings up out of the page plane as it enters, then the media and
// copy sit at different depths inside the tilt so the card genuinely turns
// rather than just skewing.
const ProjectRow = ({ project, onOpen }) => (
    <motion.article
        className="prj"
        style={{ '--accent-project': project.accent, transformPerspective: 1400 }}
        variants={swingUp()}
        initial="hidden"
        whileInView="visible"
        viewport={inView}
    >
        <Tilt max={4} scale={1} depth glow className="prj-tilt">
            <button
                type="button"
                className="prj-hit"
                onClick={() => onOpen(project)}
                data-cursor="Open"
                aria-label={`Open case study: ${project.title}`}
            />

            <div className="tilt-layer prj-media-layer" style={{ '--z': '46px' }}>
                <ProjectMedia project={project} />
            </div>

            <div className="prj-copy tilt-layer" style={{ '--z': '22px' }}>
                <div className="prj-top">
                    <span className="mono prj-index">{project.index}</span>
                    <span className="mono prj-year">{project.year}</span>
                </div>

                <h3 className="prj-title display">{project.title}</h3>
                <p className="prj-subtitle mono">{project.subtitle}</p>
                <p className="prj-blurb">{project.blurb}</p>

                <dl className="prj-metrics">
                    {project.metrics.map((m) => (
                        <div key={m.v}>
                            <dt>{m.k}</dt>
                            <dd className="mono">{m.v}</dd>
                        </div>
                    ))}
                </dl>

                <ul className="prj-tech">
                    {project.tech.map((t) => (
                        <li key={t} className="tag">
                            {t}
                        </li>
                    ))}
                </ul>

                <span className="prj-more mono">
                    Read the case <FiArrowUpRight />
                </span>
            </div>
        </Tilt>
    </motion.article>
);

/* --------------------------------------------------------------- sheet */

const ProjectSheet = ({ project, onClose }) => {
    useScrollLock(Boolean(project));

    if (!project) return null;

    return createPortal(
        <motion.div
            className="sheet-scrim"
            data-cursor="Close"
            variants={overlayFade}
            initial="initial"
            animate="animate"
            exit="exit"
            onClick={onClose}
        >
            <motion.div
                className="sheet"
                style={{ '--accent-project': project.accent, transformPerspective: 1200 }}
                variants={sheetRise}
                initial="initial"
                animate="animate"
                exit="exit"
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-label={project.title}
                data-cursor="default"
                data-lenis-prevent
            >
                <button
                    type="button"
                    className="sheet-close"
                    onClick={onClose}
                    aria-label="Close"
                    data-cursor="hide"
                >
                    <FiX />
                </button>

                <header className="sheet-head">
                    <span className="mono sheet-index">
                        {project.index} / {project.year}
                    </span>
                    <h2 className="display sheet-title">{project.title}</h2>
                    <p className="mono sheet-sub">{project.subtitle}</p>
                    <p className="lede sheet-lede">{project.description}</p>

                    <div className="sheet-actions">
                        {(project.stores ?? []).map((store) => {
                            const Icon = STORE_ICONS[store.kind];
                            return (
                                <a
                                    key={store.href}
                                    href={store.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-primary btn-sm"
                                    data-cursor="hide"
                                >
                                    {Icon ? <Icon /> : null} {store.label}
                                    <FiArrowUpRight />
                                </a>
                            );
                        })}
                        {project.demo ? (
                            <a
                                href={project.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-primary btn-sm"
                                data-cursor="hide"
                            >
                                Live site <FiArrowUpRight />
                            </a>
                        ) : null}
                        {project.github ? (
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-ghost btn-sm"
                                data-cursor="hide"
                            >
                                <FiGithub /> Source
                            </a>
                        ) : null}
                        {project.private ? (
                            <span className="chip">
                                <FiLock /> Private client codebase
                            </span>
                        ) : null}
                    </div>
                </header>

                <div className="sheet-body">
                    <section>
                        <h3 className="mono sheet-h">What it does</h3>
                        <ul className="sheet-features">
                            {project.features.map((f, i) => (
                                <motion.li
                                    key={f}
                                    initial={{ opacity: 0, x: -12 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{
                                        delay: 0.1 + i * 0.05,
                                        duration: 0.5,
                                        ease: EASE.out,
                                    }}
                                >
                                    <FiCheck />
                                    <span>{f}</span>
                                </motion.li>
                            ))}
                        </ul>
                    </section>

                    <aside className="sheet-aside">
                        <h3 className="mono sheet-h">Built with</h3>
                        <ul className="prj-tech">
                            {project.tech.map((t) => (
                                <li key={t} className="tag">
                                    {t}
                                </li>
                            ))}
                        </ul>

                        <h3 className="mono sheet-h">By the numbers</h3>
                        <dl className="sheet-metrics">
                            {project.metrics.map((m) => (
                                <div key={m.v}>
                                    <dt>{m.k}</dt>
                                    <dd className="mono">{m.v}</dd>
                                </div>
                            ))}
                        </dl>
                    </aside>
                </div>
            </motion.div>
        </motion.div>,
        document.body,
    );
};

/* ---------------------------------------------------------------- work */

const Work = () => {
    const [open, setOpen] = useState(null);
    const [expanded, setExpanded] = useState(false);
    const { stop, start, scrollTo } = useSmoothScroll();

    const hiddenCount = Math.max(0, projects.length - PREVIEW_COUNT);
    const shown = expanded ? projects : projects.slice(0, PREVIEW_COUNT);

    const toggle = () => {
        if (!expanded) {
            setExpanded(true);
            return;
        }
        // Collapsing shortens the page under the reader, so bring them back
        // to the top of the section instead of leaving them in empty space.
        setExpanded(false);
        requestAnimationFrame(() => scrollTo('#work', { offset: -20 }));
    };

    // Freeze Lenis behind the sheet and close on Escape.
    useEffect(() => {
        if (!open) {
            start();
            return undefined;
        }
        stop();
        const onKey = (e) => e.key === 'Escape' && setOpen(null);
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [open, stop, start]);

    return (
        <section className="section work-section" id="work">
            <div className="shell">
                <SectionHead
                    index="01"
                    label="Selected work"
                    title="Products I have *shipped*"
                    lede="A selection of builds across mobile, cloud and applied AI. Each one went past the prototype stage — real auth, real payments, real edge cases."
                />

                <div className="work-list">
                    {shown.map((project) => (
                        <ProjectRow
                            key={project.id}
                            project={project}
                            onOpen={setOpen}
                        />
                    ))}
                </div>

                {hiddenCount > 0 ? (
                    <div className="work-more">
                        <span className="mono work-more-count">
                            {String(shown.length).padStart(2, '0')} /{' '}
                            {String(projects.length).padStart(2, '0')}
                        </span>
                        <button
                            type="button"
                            className="btn btn-ghost"
                            onClick={toggle}
                            aria-expanded={expanded}
                            data-cursor="hide"
                        >
                            {expanded ? (
                                <>
                                    Show fewer <FiChevronUp />
                                </>
                            ) : (
                                <>
                                    Show {hiddenCount} more{' '}
                                    {hiddenCount === 1 ? 'project' : 'projects'} <FiChevronDown />
                                </>
                            )}
                        </button>
                    </div>
                ) : null}
            </div>

            <AnimatePresence>
                {open ? (
                    <ProjectSheet project={open} onClose={() => setOpen(null)} />
                ) : null}
            </AnimatePresence>
        </section>
    );
};

export default Work;
