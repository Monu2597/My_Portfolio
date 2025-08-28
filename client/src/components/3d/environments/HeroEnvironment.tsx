import { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Sphere, Ring } from "@react-three/drei";
import Computer from "../models/Computer";

export default function HeroEnvironment() {
  const ringRef = useRef<THREE.Mesh>(null);
  const sphereRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.elapsedTime * 0.2;
    }
    if (sphereRef.current) {
      sphereRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.5;
    }
  });

  return (
    <group>
      {/* Main Computer Display */}
      <Computer />
      
      {/* Decorative Ring */}
      <Ring
        ref={ringRef}
        args={[8, 12, 32]}
        position={[0, 0, -5]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <meshStandardMaterial
          color="#6366f1"
          transparent
          opacity={0.1}
          side={THREE.DoubleSide}
        />
      </Ring>
      
      {/* Floating Sphere */}
      <Sphere
        ref={sphereRef}
        args={[1, 32, 32]}
        position={[6, 2, -3]}
      >
        <meshStandardMaterial
          color="#ec4899"
          transparent
          opacity={0.6}
          emissive="#ec4899"
          emissiveIntensity={0.1}
        />
      </Sphere>
      
      {/* Background Particles */}
      {Array.from({ length: 50 }).map((_, i) => (
        <Sphere
          key={i}
          args={[0.05, 8, 8]}
          position={[
            (Math.random() - 0.5) * 100,
            (Math.random() - 0.5) * 50,
            (Math.random() - 0.5) * 50
          ]}
        >
          <meshBasicMaterial
            color="#ffffff"
            transparent
            opacity={0.3}
          />
        </Sphere>
      ))}
    </group>
  );
}
