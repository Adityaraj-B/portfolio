import { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from 'framer-motion';
import { marqueeSkills, skillGroups } from '../data/work';
import { EASE, SPRING, inView, swingUp } from '../lib/motion';
import SectionHead from './ui/SectionHead';
import Marquee from './ui/Marquee';
import { useHoverCapable } from '../lib/hooks';

const Skills = () => {
    const [activeId, setActiveId] = useState(skillGroups[0].id);
    const hoverable = useHoverCapable();
    const active = skillGroups.find((g) => g.id === activeId) ?? skillGroups[0];
    const activeIndex = skillGroups.findIndex((g) => g.id === active.id);

    const focus = (id) => setActiveId(id);

    return (
        <section className="section skills-section" id="skills">
            <div className="shell">
                <SectionHead
                    index="04"
                    label="Capabilities"
                    title="The *stack* I reach for"
                    lede="Browse the stack by discipline. Flutter and Google Cloud are where I go deepest; the rest is what makes a product whole."
                />

                <div className="skills-browser">
                    {/* ---- index column ---- */}
                    <ul className="skills-index" role="tablist" aria-label="Skill categories">
                        {skillGroups.map((group, i) => {
                            const isActive = group.id === active.id;
                            return (
                                <motion.li
                                    key={group.id}
                                    initial={{ opacity: 0, x: -18 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={inView}
                                    transition={{
                                        duration: 0.7,
                                        ease: EASE.out,
                                        delay: i * 0.05,
                                    }}
                                >
                                    <button
                                        type="button"
                                        role="tab"
                                        aria-selected={isActive}
                                        className={`skills-tab${isActive ? ' is-active' : ''}`}
                                        onClick={() => focus(group.id)}
                                        onMouseEnter={hoverable ? () => focus(group.id) : undefined}
                                        onFocus={() => focus(group.id)}
                                        data-cursor="hide"
                                    >
                                        {isActive ? (
                                            <motion.span
                                                layoutId="skills-marker"
                                                className="skills-marker"
                                                transition={SPRING.snappy}
                                            />
                                        ) : null}
                                        <span className="mono skills-tab-index">
                                            {String(i + 1).padStart(2, '0')}
                                        </span>
                                        <span className="skills-tab-title">{group.title}</span>
                                        <span className="skills-tab-count mono">
                                            {group.skills.length}
                                        </span>
                                    </button>
                                </motion.li>
                            );
                        })}
                    </ul>

                    {/* ---- detail panel ---- */}
                    <motion.div
                        className="skills-panel"
                        style={{ transformPerspective: 1200 }}
                        variants={swingUp(0.1)}
                        initial="hidden"
                        whileInView="visible"
                        viewport={inView}
                    >
                        <div className="skills-panel-head">
                            <span className="mono muted">{active.note}</span>
                            <span className="mono skills-panel-pos">
                                {String(activeIndex + 1).padStart(2, '0')} /{' '}
                                {String(skillGroups.length).padStart(2, '0')}
                            </span>
                        </div>

                        <AnimatePresence mode="wait">
                            <motion.ul
                                className="skills-list"
                                key={active.id}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                variants={{
                                    hidden: {},
                                    visible: { transition: { staggerChildren: 0.055 } },
                                    exit: { transition: { staggerChildren: 0.02, staggerDirection: -1 } },
                                }}
                            >
                                {active.skills.map((skill) => (
                                    <motion.li
                                        key={skill}
                                        className="skills-item"
                                        style={{
                                            transformPerspective: 700,
                                            transformOrigin: '0% 100%',
                                        }}
                                        variants={{
                                            // opacity + transform only: animating
                                            // filter: blur() here repainted this
                                            // large serif text every frame.
                                            hidden: { opacity: 0, y: 26, rotateX: -50 },
                                            visible: {
                                                opacity: 1,
                                                y: 0,
                                                rotateX: 0,
                                                transition: { duration: 0.65, ease: EASE.out },
                                            },
                                            exit: {
                                                opacity: 0,
                                                y: -14,
                                                rotateX: 30,
                                                transition: { duration: 0.22 },
                                            },
                                        }}
                                    >
                                        <span className="display">{skill}</span>
                                    </motion.li>
                                ))}
                            </motion.ul>
                        </AnimatePresence>
                    </motion.div>
                </div>
            </div>

            <div className="skills-ribbon">
                <Marquee items={marqueeSkills} speed={46} />
                <Marquee items={[...marqueeSkills].reverse()} speed={56} reverse />
            </div>
        </section>
    );
};

export default Skills;
