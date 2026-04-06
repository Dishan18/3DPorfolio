import * as THREE from "three";
import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { EffectComposer, N8AO } from "@react-three/postprocessing";
import {
  BallCollider,
  Physics,
  RigidBody,
  CylinderCollider,
  RapierRigidBody,
} from "@react-three/rapier";

const textureLoader = new THREE.TextureLoader();
const imageUrls = [
  "/images/react2.webp",
  "/images/next2.webp",
  "/images/node2.webp",
  "/images/express.webp",
  "/images/mongo.webp",
  "/images/mysql.webp",
  "/images/typescript.webp",
  "/images/javascript.webp",
  "/images/git.webp",
  "/images/claude.webp",
  "/images/cpp.webp",
  "/images/cursor.webp",
  "/images/java.webp",
  "/images/jupyter.webp",
  "/images/postman.webp",
  "/images/python.webp",
  "/images/supabase.webp",
  "/images/tensorflow.webp",
  "/images/keras.webp",
  "/images/vscode.webp",
];
const textures = imageUrls.map((url) => {
  const texture = textureLoader.load(url);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.generateMipmaps = false;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.needsUpdate = true;
  return texture;
});

const sphereGeometry = new THREE.SphereGeometry(1, 18, 18);

type SphereProps = {
  vec?: THREE.Vector3;
  scale: number;
  r?: typeof THREE.MathUtils.randFloatSpread;
  material: THREE.MeshStandardMaterial;
  isActive: boolean;
};

function SphereGeo({
  vec = new THREE.Vector3(),
  scale,
  r = THREE.MathUtils.randFloatSpread,
  material,
  isActive,
}: SphereProps) {
  const api = useRef<RapierRigidBody | null>(null);

  useFrame((_state, delta) => {
    if (!isActive) return;
    delta = Math.min(0.1, delta);
    const impulse = vec
      .copy(api.current!.translation())
      .normalize()
      .multiply(
        new THREE.Vector3(
          -50 * delta * scale,
          -150 * delta * scale,
          -50 * delta * scale,
        ),
      );

    api.current?.applyImpulse(impulse, true);
  });

  return (
    <RigidBody
      linearDamping={0.75}
      angularDamping={0.15}
      friction={0.2}
      position={[r(20), r(20) - 25, r(20) - 10]}
      ref={api}
      colliders={false}
    >
      <BallCollider args={[scale]} />
      <CylinderCollider
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, 1.2 * scale]}
        args={[0.15 * scale, 0.275 * scale]}
      />
      <mesh
        castShadow
        receiveShadow
        scale={scale}
        geometry={sphereGeometry}
        material={material}
        rotation={[0.3, 1, 1]}
      />
    </RigidBody>
  );
}

type PointerProps = {
  vec?: THREE.Vector3;
  isActive: boolean;
};

function Pointer({ vec = new THREE.Vector3(), isActive }: PointerProps) {
  const ref = useRef<RapierRigidBody>(null);

  useFrame(({ pointer, viewport }) => {
    if (!isActive) return;
    const targetVec = vec.lerp(
      new THREE.Vector3(
        (pointer.x * viewport.width) / 2,
        (pointer.y * viewport.height) / 2,
        0,
      ),
      0.2,
    );
    ref.current?.setNextKinematicTranslation(targetVec);
  });

  return (
    <RigidBody
      position={[100, 100, 100]}
      type="kinematicPosition"
      colliders={false}
      ref={ref}
    >
      <BallCollider args={[2]} />
    </RigidBody>
  );
}

const TechStack = () => {
  const [isActive, setIsActive] = useState(false);
  const [enableAO, setEnableAO] = useState(true);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 900);

  useEffect(() => {
    const setPerformanceMode = () => {
      const nav = navigator as Navigator & { deviceMemory?: number };
      const lowCores = (navigator.hardwareConcurrency || 8) <= 4;
      const lowMemory = (nav.deviceMemory || 8) <= 4;
      const narrowViewport = window.innerWidth < 1200;
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      setIsMobileView(window.innerWidth <= 900);

      setEnableAO(
        !(lowCores || lowMemory || narrowViewport || prefersReducedMotion),
      );
    };

    setPerformanceMode();
    window.addEventListener("resize", setPerformanceMode);

    return () => {
      window.removeEventListener("resize", setPerformanceMode);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const workSection = document.getElementById("projects");
      if (!workSection) {
        setIsActive(false);
        return;
      }

      const sectionTop = workSection.getBoundingClientRect().top + scrollY;
      const activationPoint = sectionTop - window.innerHeight * 0.6;
      setIsActive(scrollY >= activationPoint);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const spheres = useMemo(() => {
    const sphereCount = isMobileView ? 8 : enableAO ? 16 : 10;
    const desktopScales = [0.7, 1, 0.8, 1, 1];
    const mobileScales = [0.45, 0.55, 0.6, 0.65, 0.7];
    const scales = isMobileView ? mobileScales : desktopScales;

    return [...Array(sphereCount)].map(() => ({
      scale: scales[Math.floor(Math.random() * scales.length)],
      materialIndex: Math.floor(Math.random() * textures.length),
    }));
  }, [enableAO, isMobileView]);

  const materials = useMemo(() => {
    return textures.map(
      (texture) =>
        new THREE.MeshStandardMaterial({
          map: texture,
          emissive: "#ffffff",
          emissiveMap: enableAO ? texture : null,
          emissiveIntensity: enableAO ? 0.25 : 0.08,
          metalness: enableAO ? 0.35 : 0.15,
          roughness: enableAO ? 0.9 : 1,
        }),
    );
  }, [enableAO]);

  return (
    <div className="techstack">
      <h2> My Techstack</h2>

      <Canvas
        dpr={enableAO ? [1, 1.5] : [1, 1.25]}
        gl={{ alpha: true, stencil: false, depth: false, antialias: false }}
        camera={{ position: [0, 0, 20], fov: 32.5, near: 1, far: 100 }}
        onCreated={(state) => (state.gl.toneMappingExposure = 1.5)}
        className="tech-canvas"
      >
        <ambientLight intensity={1} />
        <spotLight
          position={[20, 20, 25]}
          penumbra={1}
          angle={0.2}
          color="white"
        />
        <directionalLight position={[0, 5, -4]} intensity={2} />
        <Physics gravity={[0, 0, 0]} timeStep={enableAO ? "vary" : 1 / 45}>
          <Pointer isActive={isActive} />
          {spheres.map((props, i) => (
            <SphereGeo
              key={i}
              scale={props.scale}
              material={materials[props.materialIndex]}
              isActive={isActive}
            />
          ))}
        </Physics>
        <Environment
          files="/models/char_enviorment.hdr"
          environmentIntensity={0.5}
          environmentRotation={[0, 4, 2]}
        />
        {enableAO && (
          <EffectComposer enableNormalPass={false}>
            <N8AO color="#0f002c" aoRadius={2} intensity={1.15} />
          </EffectComposer>
        )}
      </Canvas>
    </div>
  );
};

export default TechStack;
