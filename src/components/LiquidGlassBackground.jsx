import React, { useRef, useMemo, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, MeshTransmissionMaterial, Float, Lightformer } from '@react-three/drei';
import * as THREE from 'three';

const useDesignTokens = () => {
    const [tokens, setTokens] = useState({ accent: '#c0c0c8', bg: '#08080a', theme: 'dark' });

    useEffect(() => {
        const read = () => {
            const styles = getComputedStyle(document.documentElement);
            const accent = styles.getPropertyValue('--accent-primary').trim() || '#c0c0c8';
            const bg = styles.getPropertyValue('--bg-primary').trim() || '#08080a';
            const theme = document.documentElement.getAttribute('data-theme') || 'dark';
            setTokens({ accent, bg, theme });
        };
        read();
        const observer = new MutationObserver(read);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
        return () => observer.disconnect();
    }, []);

    return tokens;
};

const useSceneDrivers = () => {
    const state = useRef({ scroll: 0, pointerX: 0, pointerY: 0 });
    useEffect(() => {
        const onScroll = () => {
            const max = Math.max(1, document.body.scrollHeight - window.innerHeight);
            state.current.scroll = THREE.MathUtils.clamp(window.scrollY / max, 0, 1);
        };
        const onPointerMove = (e) => {
            state.current.pointerX = (e.clientX / window.innerWidth) * 2 - 1;
            state.current.pointerY = (e.clientY / window.innerHeight) * 2 - 1;
        };
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('pointermove', onPointerMove, { passive: true });
        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('pointermove', onPointerMove);
        };
    }, []);
    return state;
};

const glassConfig = (tint) => {
    // Detect mobile once — cached by React's module scope
    const mobile = typeof window !== 'undefined' && window.innerWidth < 768;

    return {
        backside: !mobile,                          // skip backside pass on mobile
        backsideThickness: 0.2,
        samples: mobile ? 2 : 3,                    // 3 is visually identical to 4, much faster compile
        resolution: mobile ? 128 : 256,             // 256 is indistinguishable from 512 at background depth
        thickness: 0.5,
        chromaticAberration: 0.02,
        anisotropy: 0.1,
        distortion: 0.08,
        distortionScale: 0.15,
        temporalDistortion: 0.015,
        iridescence: 1,
        iridescenceIOR: 1.2,
        iridescenceThicknessRange: [100, 1200],
        clearcoat: 1,
        clearcoatRoughness: 0.02,
        roughness: 0.02,
        metalness: 0.1,
        envMapIntensity: 3.5,
        transmission: 1,
        ior: 1.45,
        color: tint,
    };
};

const createLemniscateCurve = (scale = 2.0) => {
    const points = [];
    const segments = 100;
    for (let i = 0; i <= segments; i++) {
        const t = (i / segments) * Math.PI * 2;
        const sinT = Math.sin(t);
        const cosT = Math.cos(t);
        const denom = 1 + sinT * sinT;
        const x = (scale * cosT) / denom;
        const y = (scale * sinT * cosT) / denom;
        points.push(new THREE.Vector3(x, y, 0));
    }
    return new THREE.CatmullRomCurve3(points, true);
};

const InfinityLoopWithPackets = ({ theme, accent, scale = 1 }) => {
    const groupRef = useRef();
    const curve = useMemo(() => createLemniscateCurve(2.8), []);
    const tubeGeo = useMemo(() => new THREE.TubeGeometry(curve, 120, 0.12, 12, true), [curve]);
    const tint = theme === 'light' ? '#ffffff' : '#ffffff';

    useFrame((_, delta) => {
        if (groupRef.current) {
            groupRef.current.rotation.z += delta * 0.08;
            groupRef.current.rotation.y += delta * 0.04;
        }
    });

    return (
        <group ref={groupRef} scale={scale}>
            <mesh geometry={tubeGeo}>
                <MeshTransmissionMaterial {...glassConfig(tint)} thickness={0.3} />
            </mesh>
            {[0, 0.2, 0.4, 0.6, 0.8].map((offset, i) => (
                <DataPacket
                    key={i}
                    curve={curve}
                    speed={0.08}
                    offset={offset}
                    accent={accent}
                />
            ))}
        </group>
    );
};

const DataPacket = ({ curve, speed, offset, accent }) => {
    const ref = useRef();

    useFrame((state) => {
        if (!ref.current) return;
        const t = ((state.clock.elapsedTime * speed + offset) % 1 + 1) % 1;
        const point = curve.getPointAt(t);
        ref.current.position.copy(point);
        ref.current.rotation.x = state.clock.elapsedTime * 2;
        ref.current.rotation.y = state.clock.elapsedTime * 3;
    });

    return (
        <mesh ref={ref}>
            <boxGeometry args={[0.06, 0.06, 0.06]} />
            <meshStandardMaterial
                color={accent}
                emissive={accent}
                emissiveIntensity={1.5}
                roughness={0.1}
                metalness={0.8}
            />
        </mesh>
    );
};

const Chevron = ({ position, rotation, scale = 1, flip = false, theme }) => {
    const groupRef = useRef();
    const tint = theme === 'light' ? '#ffffff' : '#ffffff';
    const angle = flip ? -0.45 : 0.45;

    return (
        <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
            <mesh position={[0, 0.22, 0]} rotation={[0, 0, angle]}>
                <boxGeometry args={[0.65, 0.06, 0.06]} />
                <MeshTransmissionMaterial {...glassConfig(tint)} backside={false} samples={2} resolution={128} />
            </mesh>
            <mesh position={[0, -0.22, 0]} rotation={[0, 0, -angle]}>
                <boxGeometry args={[0.65, 0.06, 0.06]} />
                <MeshTransmissionMaterial {...glassConfig(tint)} backside={false} samples={2} resolution={128} />
            </mesh>
        </group>
    );
};

const CurlyBrace = ({ position, rotation, scale = 1, flip = false, theme }) => {
    const tint = theme === 'light' ? '#ffffff' : '#ffffff';
    const dir = flip ? -1 : 1;

    const geometry = useMemo(() => {
        const points = [
            new THREE.Vector3(0, 0.5, 0),
            new THREE.Vector3(dir * 0.1, 0.46, 0),
            new THREE.Vector3(dir * 0.14, 0.28, 0),
            new THREE.Vector3(dir * 0.04, 0.09, 0),
            new THREE.Vector3(dir * 0.22, 0.02, 0),
            new THREE.Vector3(dir * 0.04, -0.09, 0),
            new THREE.Vector3(dir * 0.14, -0.28, 0),
            new THREE.Vector3(dir * 0.1, -0.46, 0),
            new THREE.Vector3(0, -0.5, 0),
        ];
        const curve = new THREE.CatmullRomCurve3(points, false, 'catmullrom', 0.5);
        return new THREE.TubeGeometry(curve, 32, 0.028, 6, false);
    }, [dir]);

    return (
        <mesh geometry={geometry} position={position} rotation={rotation} scale={scale}>
            <MeshTransmissionMaterial {...glassConfig(tint)} backside={false} samples={2} resolution={128} />
        </mesh>
    );
};

const FullStackLayers = ({ position, theme, accent }) => {
    const groupRef = useRef();
    const tint = theme === 'light' ? '#ffffff' : '#ffffff';

    useFrame((state) => {
        if (!groupRef.current) return;
        groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.15;
    });

    const layers = [
        { y: 0.45, width: 1.1, depth: 0.7, label: 'Frontend' },
        { y: 0.0, width: 1.3, depth: 0.8, label: 'Backend' },
        { y: -0.45, width: 1.0, depth: 0.65, label: 'Database' },
    ];

    return (
        <group ref={groupRef} position={position}>
            {layers.map((layer, i) => (
                <mesh key={i} position={[0, layer.y, 0]}>
                    <boxGeometry args={[layer.width, 0.08, layer.depth]} />
                    <MeshTransmissionMaterial {...glassConfig(tint)} backside={false} samples={2} resolution={128} thickness={0.2} />
                </mesh>
            ))}
            {[0.225, -0.225].map((y, i) => (
                <mesh key={`conn-${i}`} position={[0, y, 0]}>
                    <cylinderGeometry args={[0.015, 0.015, 0.37, 8]} />
                    <meshStandardMaterial
                        color={accent}
                        emissive={accent}
                        emissiveIntensity={1.2}
                        transparent
                        opacity={0.8}
                    />
                </mesh>
            ))}
        </group>
    );
};

const CLOUD_NODES = [
    [0, 0.5, 0],
    [-0.5, -0.2, 0.3],
    [0.5, -0.2, -0.3],
    [0, -0.6, 0],
];

const CLOUD_EDGES = [
    [0, 1], [0, 2], [0, 3], [1, 2], [1, 3], [2, 3],
];

const CloudCluster = ({ position, theme, accent }) => {
    const groupRef = useRef();
    const tint = theme === 'light' ? '#ffffff' : '#ffffff';

    useFrame((state) => {
        if (!groupRef.current) return;
        groupRef.current.rotation.y = state.clock.elapsedTime * 0.15;
        groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    });

    const wireGeometries = useMemo(() =>
        CLOUD_EDGES.map(([a, b]) => {
            const from = new THREE.Vector3(...CLOUD_NODES[a]);
            const to = new THREE.Vector3(...CLOUD_NODES[b]);
            return new THREE.BufferGeometry().setFromPoints([from, to]);
        }),
        []);

    return (
        <group ref={groupRef} position={position}>
            {CLOUD_NODES.map((pos, i) => (
                <mesh key={i} position={pos}>
                    <sphereGeometry args={[0.1, 16, 16]} />
                    <MeshTransmissionMaterial {...glassConfig(tint)} backside={false} samples={2} resolution={128} thickness={0.15} />
                </mesh>
            ))}
            {wireGeometries.map((geo, i) => (
                <line key={i} geometry={geo}>
                    <lineBasicMaterial color={accent} transparent opacity={0.6} />
                </line>
            ))}
        </group>
    );
};

const Slash = ({ position, rotation, theme }) => {
    const tint = theme === 'light' ? '#ffffff' : '#ffffff';
    return (
        <mesh position={position} rotation={rotation}>
            <boxGeometry args={[0.06, 0.6, 0.06]} />
            <MeshTransmissionMaterial {...glassConfig(tint)} backside={false} samples={2} resolution={128} />
        </mesh>
    );
};

const FloatingSymbols = ({ accent }) => {
    const groupRef = useRef();

    const symbols = useMemo(() => {
        const arr = [];
        for (let i = 0; i < 30; i++) {
            arr.push({
                pos: [
                    (Math.random() - 0.5) * 16,
                    (Math.random() - 0.5) * 14,
                    (Math.random() - 0.5) * 10,
                ],
                rotSpeed: 0.2 + Math.random() * 0.5,
                floatSpeed: 0.3 + Math.random() * 0.4,
                floatAmp: 0.2 + Math.random() * 0.3,
                size: 0.02 + Math.random() * 0.04,
                offset: Math.random() * Math.PI * 2,
            });
        }
        return arr;
    }, []);

    useFrame((state) => {
        if (!groupRef.current) return;
        groupRef.current.rotation.y = state.clock.elapsedTime * 0.008;
    });

    return (
        <group ref={groupRef}>
            {symbols.map((s, i) => (
                <FloatingDot key={i} {...s} accent={accent} time={0} />
            ))}
        </group>
    );
};

const FloatingDot = ({ pos, rotSpeed, floatSpeed, floatAmp, size, offset, accent }) => {
    const ref = useRef();

    useFrame((state) => {
        if (!ref.current) return;
        const t = state.clock.elapsedTime;
        ref.current.position.y = pos[1] + Math.sin(t * floatSpeed + offset) * floatAmp;
        ref.current.rotation.x = t * rotSpeed;
        ref.current.rotation.z = t * rotSpeed * 0.7;
    });

    return (
        <mesh ref={ref} position={pos}>
            <octahedronGeometry args={[size, 0]} />
            <meshStandardMaterial
                color={accent}
                emissive={accent}
                emissiveIntensity={1.0}
                roughness={0.2}
                metalness={0.5}
                transparent
                opacity={0.8}
            />
        </mesh>
    );
};

const Scene = ({ isMobile }) => {
    const driver = useSceneDrivers();
    const { accent, theme } = useDesignTokens();
    const groupRef = useRef();

    /*
     * Progressive rendering — mount shapes in stages so the GPU compiles
     * shaders in small batches instead of one massive 5-second block.
     *
     * Stage 0: InfinityLoop (1 MTM) + FloatingSymbols (0 MTM) — hero piece
     * Stage 1: Chevrons ×2 + Slash (5 MTM) — code symbols
     * Stage 2: CurlyBraces ×2 + FullStackLayers (5 MTM) — side decorations
     * Stage 3: CloudCluster (4 MTM) — final decoration
     *
     * 4-frame gap between stages lets the browser/GPU breathe and the
     * CSS loading animation (or the main page) can update between batches.
     */
    const [stage, setStage] = useState(0);
    const stageFrames = useRef(0);

    useFrame(() => {
        if (!groupRef.current) return;
        const { pointerX, pointerY, scroll } = driver.current;

        groupRef.current.rotation.y = THREE.MathUtils.lerp(
            groupRef.current.rotation.y,
            pointerX * 0.1,
            0.04
        );
        groupRef.current.rotation.x = THREE.MathUtils.lerp(
            groupRef.current.rotation.x,
            pointerY * 0.06,
            0.04
        );

        const targetY = (0.5 - scroll) * 2.5;
        groupRef.current.position.y = THREE.MathUtils.lerp(
            groupRef.current.position.y,
            targetY,
            0.04
        );

        // Advance to next stage after 4 frames of breathing room
        if (stage < 3) {
            stageFrames.current++;
            if (stageFrames.current >= 4) {
                stageFrames.current = 0;
                setStage((s) => s + 1);
            }
        }
    });

    return (
        <>
            <ambientLight intensity={theme === 'light' ? 1.5 : 0.8} />
            <spotLight position={[6, 8, 6]} angle={0.25} penumbra={1} intensity={2.5} color="#ffffff" />
            <spotLight position={[-6, -4, 4]} angle={0.4} penumbra={1} intensity={1.5} color={accent} />

            <Float speed={0.6} rotationIntensity={0.03} floatIntensity={0.2}>
                <group ref={groupRef}>
                    {/* Stage 0: Hero piece — mounts immediately */}
                    <InfinityLoopWithPackets theme={theme} accent={accent} scale={isMobile ? 0.7 : 1.0} />
                    <FloatingSymbols accent={accent} />

                    {/* Stage 1: Code symbols — mounts after hero renders */}
                    {stage >= 1 && (
                        <group scale={isMobile ? 0.6 : 1.0} position={isMobile ? [0, 0.4, 0] : [0, 0, 0]}>
                            <Chevron position={[-0.65, -2.0, 0]} rotation={[0, 0, 0]} scale={0.9} theme={theme} />
                            <Slash position={[0, -2.0, 0]} rotation={[0, 0, 0.3]} theme={theme} />
                            <Chevron position={[0.65, -2.0, 0]} rotation={[0, 0, 0]} scale={0.9} flip theme={theme} />
                        </group>
                    )}

                    {/* Stage 2: Side decorations - hidden on mobile to save GPU */}
                    {stage >= 2 && !isMobile && (
                        <>
                            <CurlyBrace position={[2.9, 0, 0.5]} rotation={[0, 0.3, 0]} scale={1.1} theme={theme} />
                            <CurlyBrace position={[-2.9, 0, 0.5]} rotation={[0, -0.3, 0]} scale={1.1} flip theme={theme} />
                            <FullStackLayers position={[-4.5, -1.5, -0.3]} theme={theme} accent={accent} />
                        </>
                    )}

                    {/* Stage 3: Cloud cluster - hidden on mobile to save GPU */}
                    {stage >= 3 && !isMobile && (
                        <CloudCluster position={[4.0, -1.3, -0.5]} theme={theme} accent={accent} />
                    )}
                </group>
            </Float>

            <Environment resolution={256}>
                <group rotation={[-Math.PI / 3, -0.4, 0]}>
                    <Lightformer intensity={5.0} rotation-x={Math.PI / 2} position={[0, 6, -10]} scale={[14, 12, 1]} color="#ffffff" />
                    <Lightformer intensity={3.0} rotation-y={Math.PI / 2} position={[-6, 1, -1]} scale={[40, 3, 1]} color={theme === 'light' ? '#ffffff' : '#e0e0ea'} />
                    <Lightformer intensity={2.0} rotation-y={-Math.PI / 2} position={[8, -2, 2]} scale={[20, 4, 1]} color={accent} />
                </group>
            </Environment>
        </>
    );
};

const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);
    return isMobile;
};

/**
 * FadeInTrigger — after 2 stable rendered frames (shaders compiled),
 * triggers the parent's opacity transition and signals the loader to dismiss.
 */
const FadeInTrigger = ({ onReady }) => {
    const frames = useRef(0);
    useFrame(() => {
        if (frames.current === 2 && onReady) {
            onReady();
        }
        frames.current++;
    });
    return null;
};

const LiquidGlassBackground = ({ onLoaded }) => {
    const { theme } = useDesignTokens();
    const isMobile = useIsMobile();
    const [visible, setVisible] = useState(false);

    const handleReady = () => {
        setVisible(true);    // start CSS opacity transition
        if (onLoaded) onLoaded(); // tell App to dismiss loader
    };

    const vignette =
        theme === 'light'
            ? 'radial-gradient(ellipse at 50% 40%, rgba(58,58,76,0.04) 0%, transparent 70%)'
            : 'radial-gradient(ellipse at 50% 40%, rgba(140,140,180,0.04) 0%, transparent 70%)';

    return (
        <div
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: -1,
                pointerEvents: 'none',
                background: vignette,
                opacity: visible ? 1 : 0,
                transition: 'opacity 2.5s ease-in-out',
            }}
        >
            <Canvas
                camera={{ position: [1, -0.6, isMobile ? 12 : 6], fov: isMobile ? 50 : 52 }}
                dpr={isMobile ? [1, 1] : [1, 1.5]}
                gl={{ antialias: !isMobile, alpha: true, powerPreference: 'high-performance' }}
            >
                <FadeInTrigger onReady={handleReady} />
                <Suspense fallback={null}>
                    <Scene isMobile={isMobile} />
                </Suspense>
            </Canvas>
        </div>
    );
};

export default LiquidGlassBackground;