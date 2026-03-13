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
  "/images/langchain.webp",
  "/images/kubernetes-plain.webp",
  "/images/huggingface.webp",
  "/images/gradio.webp",
  "/images/fastapi.webp",
  "/images/drizzle.webp",
  "/images/docker-original.webp",
  "/images/docker.webp",
  "/images/cplusplus-original.webp",
  "/images/auth0.webp",
  "/images/apachekafka-original.webp",
  "/images/redis-original.webp",
  "/images/razorpay.webp",
  "/images/rabbitmq-original.webp",
  "/images/python-original.webp",
  "/images/postgresql-original.webp",
  "/images/nestjs.webp",
];

// Canvas se har image ko white circle background ke saath process karo
const loadTextureWithBackground = (url: string): Promise<THREE.Texture> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const size = 512;
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d")!;

      // Pure white base
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, size, size);

      // Circle clip
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
      ctx.clip();

      // White background
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, size, size);

      // Logo — 42% size, perfectly centered
      const logoSize = size * 0.42;
      const offset = (size - logoSize) / 2;
      ctx.drawImage(img, offset, offset, logoSize, logoSize);

      // Subtle inner shadow at bottom for depth
      const shadowGrad = ctx.createRadialGradient(
        size / 2,
        size * 0.6,
        size * 0.1,
        size / 2,
        size / 2,
        size / 2,
      );
      shadowGrad.addColorStop(0, "rgba(0,0,0,0)");
      shadowGrad.addColorStop(1, "rgba(0,0,0,0.08)");
      ctx.fillStyle = shadowGrad;
      ctx.fillRect(0, 0, size, size);

      const texture = new THREE.CanvasTexture(canvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = 16;
      resolve(texture);
    };
    img.onerror = () => resolve(new THREE.Texture());
    img.src = url;
  });
};

const sphereGeometry = new THREE.SphereGeometry(1, 28, 28);

const spheres = [...Array(50)].map(() => ({
  scale: [0.7, 1, 0.8, 1, 1][Math.floor(Math.random() * 5)],
}));

type SphereProps = {
  vec?: THREE.Vector3;
  scale: number;
  r?: typeof THREE.MathUtils.randFloatSpread;
  material: THREE.MeshPhysicalMaterial;
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
  const [textures, setTextures] = useState<THREE.Texture[]>([]);

  useEffect(() => {
    // Sabhi textures ko white circle background ke saath load karo
    Promise.all(imageUrls.map(loadTextureWithBackground)).then(setTextures);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const threshold = document
        .getElementById("work")!
        .getBoundingClientRect().top;
      setIsActive(scrollY > threshold);
    };
    document.querySelectorAll(".header a").forEach((elem) => {
      const element = elem as HTMLAnchorElement;
      element.addEventListener("click", () => {
        const interval = setInterval(() => {
          handleScroll();
        }, 10);
        setTimeout(() => {
          clearInterval(interval);
        }, 1000);
      });
    });
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const materials = useMemo(() => {
    if (textures.length === 0) return [];
    return textures.map(
      (texture) =>
        new THREE.MeshPhysicalMaterial({
          map: texture,
          emissive: "#ffffff",
          emissiveMap: texture,
          emissiveIntensity: 0.05, // bahut kam — logo natural dikhega
          metalness: 0.0, // zero metalness — clean white ball
          roughness: 0.05, // almost zero — mirror-like surface
          clearcoat: 1.0, // max clearcoat — glossy top layer
          clearcoatRoughness: 0.02, // almost zero — perfect shine
          reflectivity: 1.0, // full reflectivity
          envMapIntensity: 1.2, // environment reflection strong
        }),
    );
  }, [textures]);

  // Jab tak textures load na hon, render mat karo
  if (materials.length === 0) return <div className="techstack" />;

  return (
    <div className="techstack">
      <h2> My Techstack</h2>

      <Canvas
        shadows
        gl={{ alpha: true, stencil: false, depth: false, antialias: false }}
        camera={{ position: [0, 0, 20], fov: 32.5, near: 1, far: 100 }}
        onCreated={(state) => (state.gl.toneMappingExposure = 1.5)}
        className="tech-canvas"
      >
        <ambientLight intensity={0.6} />
        <spotLight
          position={[20, 20, 25]}
          penumbra={0.5}
          angle={0.15}
          color="#ffffff"
          castShadow
          shadow-mapSize={[1024, 1024]}
          intensity={2.5}
        />
        <spotLight
          position={[-15, 10, 10]}
          penumbra={1}
          angle={0.3}
          color="#e8f4ff"
          intensity={1.2}
        />
        <directionalLight position={[0, 5, -4]} intensity={1.5} />
        <directionalLight
          position={[5, -5, 5]}
          intensity={0.4}
          color="#fff5e0"
        />
        <Physics gravity={[0, 0, 0]}>
          <Pointer isActive={isActive} />
          {spheres.map((props, i) => (
            <SphereGeo
              key={i}
              {...props}
              material={materials[i % materials.length]}
              isActive={isActive}
            />
          ))}
        </Physics>
        <Environment
          files="/models/char_enviorment.hdr"
          environmentIntensity={0.5}
          environmentRotation={[0, 4, 2]}
        />
        <EffectComposer enableNormalPass={false}>
          <N8AO color="#0f002c" aoRadius={2} intensity={1.15} />
        </EffectComposer>
      </Canvas>
    </div>
  );
};

export default TechStack;
