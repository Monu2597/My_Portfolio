import { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { usePortfolio } from "../../lib/stores/usePortfolio";

export default function Lights() {
  const directionalRef = useRef<THREE.DirectionalLight>(null);
  const pointRef = useRef<THREE.PointLight>(null);
  const { scrollProgress } = usePortfolio();

  useFrame(() => {
    if (directionalRef.current) {
      // Animate main light based on scroll
      directionalRef.current.intensity = 0.8 + Math.sin(scrollProgress * Math.PI) * 0.2;
    }
    
    if (pointRef.current) {
      // Moving accent light
      pointRef.current.position.x = Math.sin(scrollProgress * Math.PI * 2) * 10;
      pointRef.current.position.z = Math.cos(scrollProgress * Math.PI * 2) * 10;
    }
  });

  return (
    <>
      {/* Ambient light for base illumination */}
      <ambientLight intensity={0.3} color="#ffffff" />
      
      {/* Main directional light */}
      <directionalLight
        ref={directionalRef}
        position={[10, 10, 5]}
        intensity={0.8}
        color="#ffffff"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      
      {/* Accent point light */}
      <pointLight
        ref={pointRef}
        position={[0, 5, 0]}
        intensity={0.5}
        color="#6366f1"
        distance={20}
      />
      
      {/* Rim light */}
      <pointLight
        position={[-10, 0, -10]}
        intensity={0.3}
        color="#ec4899"
        distance={30}
      />
      
      {/* Fill light */}
      <spotLight
        position={[0, 10, 10]}
        intensity={0.4}
        angle={0.6}
        penumbra={0.5}
        color="#ffffff"
        castShadow
      />
    </>
  );
}
