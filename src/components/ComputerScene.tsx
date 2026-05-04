"use client";

import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, Float, Html } from "@react-three/drei";
import * as THREE from "three";

function Monitor() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.15;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.5, 0]}>
      {/* Base */}
      <mesh position={[0, -1.45, 0]} castShadow>
        <cylinderGeometry args={[0.6, 0.8, 0.1, 32]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Stand neck */}
      <mesh position={[0, -0.9, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.08, 1.0, 16]} />
        <meshStandardMaterial color="#16213e" metalness={0.6} roughness={0.4} />
      </mesh>
      {/* Back panel */}
      <mesh position={[0, 0, -0.07]} castShadow>
        <boxGeometry args={[3.2, 2.0, 0.12]} />
        <meshStandardMaterial color="#0f3460" metalness={0.5} roughness={0.5} />
      </mesh>
      {/* Bezel */}
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[3.0, 1.85, 0.05]} />
        <meshStandardMaterial color="#0a0a1a" metalness={0.3} roughness={0.7} />
      </mesh>
      {/* Screen */}
      <mesh position={[0, 0, 0.03]}>
        <boxGeometry args={[2.8, 1.65, 0.01]} />
        <meshStandardMaterial
          color="#0d0d1a"
          emissive="#60a5fa"
          emissiveIntensity={0.08}
          metalness={0.1}
          roughness={0.1}
        />
      </mesh>
      {/* Screen glow */}
      <mesh position={[0, 0, 0.04]}>
        <planeGeometry args={[2.75, 1.6]} />
        <meshStandardMaterial
          color="#60a5fa"
          emissive="#60a5fa"
          emissiveIntensity={0.15}
          transparent
          opacity={0.07}
        />
      </mesh>

      {/* Screen label */}
      <Html
  position={[0, 0.1, 0.12]}
  transform
  style={{ pointerEvents: "none" }}
>
        <div
          style={{
            width: 280,
            textAlign: "center",
            fontFamily: "monospace",
            color: "#a78bfa",
            fontSize: 11,
            lineHeight: 1.6,
            userSelect: "none",
          }}
        >
         <div style={{ color: "#60a5fa", fontSize: 7, marginBottom: 6, fontWeight: 700, letterSpacing: "0.05em" }}>
  Sandnes Productions
</div>
<div style={{ color: "#4ade80", fontSize: 4 }}>
  {">"} Bygger din digitale tilstedeværelse
</div>
<div style={{ color: "#a78bfa", fontSize: 5, marginTop: 3 }}>
  Next.js · TypeScript · Tailwind
</div>
        </div>
      </Html>

      {/* Power LED */}
      <mesh position={[1.35, -0.85, 0.03]}>
        <sphereGeometry args={[0.025, 8, 8]} />
        <meshStandardMaterial color="#4ade80" emissive="#4ade80" emissiveIntensity={2} />
      </mesh>

      {/* Keyboard */}
      <mesh position={[0, -1.6, 0.8]} rotation={[-0.1, 0, 0]} castShadow>
        <boxGeometry args={[2.2, 0.06, 0.75]} />
        <meshStandardMaterial color="#0d0d1a" metalness={0.4} roughness={0.6} />
      </mesh>
      <mesh position={[0, -1.565, 0.8]} rotation={[-0.1, 0, 0]}>
        <planeGeometry args={[2.1, 0.65]} />
        <meshStandardMaterial
          color="#60a5fa"
          emissive="#60a5fa"
          emissiveIntensity={0.04}
          transparent
          opacity={0.15}
        />
      </mesh>

      {/* Mouse */}
      <mesh position={[1.4, -1.6, 0.75]} castShadow>
        <capsuleGeometry args={[0.12, 0.22, 8, 16]} />
        <meshStandardMaterial color="#0d0d1a" metalness={0.3} roughness={0.7} />
      </mesh>
    </group>
  );
}

function FloatingParticles() {
  const points = useRef<THREE.Points>(null);
  const count = 80;

  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3]     = (Math.random() - 0.5) * 8;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
  }

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.elapsedTime * 0.04;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute args={[positions, 3]} attach="attributes-position" />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#60a5fa" transparent opacity={0.5} />
    </points>
  );
}

export default function ComputerScene() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 1, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={1} color="#60a5fa" />
        <pointLight position={[-5, 3, -2]} intensity={0.5} color="#a78bfa" />
        <spotLight
          position={[0, 8, 4]}
          intensity={0.8}
          angle={0.4}
          penumbra={0.5}
          color="#ffffff"
        />
        <Suspense fallback={null}>
          <Float floatIntensity={0.4} rotationIntensity={0.1} speed={1.5}>
            <Monitor />
          </Float>
          <FloatingParticles />
          <Environment preset="night" />
        </Suspense>
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.8}
        />
      </Canvas>
    </div>
  );
}