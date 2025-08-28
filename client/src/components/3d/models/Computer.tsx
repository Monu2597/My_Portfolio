import { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Box, Plane } from "@react-three/drei";

export default function Computer() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Computer Base */}
      <Box args={[4, 0.3, 3]} position={[0, -2, 0]}>
        <meshStandardMaterial color="#2a2a2a" />
      </Box>
      
      {/* Screen */}
      <Box args={[3.5, 2.5, 0.1]} position={[0, -0.5, 0]}>
        <meshStandardMaterial color="#1a1a1a" />
      </Box>
      
      {/* Screen Display */}
      <Plane args={[3.2, 2.2]} position={[0, -0.5, 0.06]}>
        <meshBasicMaterial color="#000033" />
      </Plane>
      
      {/* Screen Content Simulation */}
      <Plane args={[2.8, 0.3]} position={[0, 0.2, 0.07]}>
        <meshBasicMaterial color="#6366f1" />
      </Plane>
      <Plane args={[2.8, 0.2]} position={[0, -0.2, 0.07]}>
        <meshBasicMaterial color="#ec4899" />
      </Plane>
      <Plane args={[2.8, 0.2]} position={[0, -0.5, 0.07]}>
        <meshBasicMaterial color="#10b981" />
      </Plane>
      
      {/* Stand */}
      <Box args={[0.5, 1.5, 0.3]} position={[0, -1.25, -0.5]}>
        <meshStandardMaterial color="#333333" />
      </Box>
    </group>
  );
}
