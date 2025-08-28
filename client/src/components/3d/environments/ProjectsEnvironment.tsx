import { useRef, useMemo } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Box, Sphere } from "@react-three/drei";

export default function ProjectsEnvironment() {
  const groupRef = useRef<THREE.Group>(null);
  
  // Create project showcase boxes
  const projectBoxes = useMemo(() => {
    return Array.from({ length: 4 }, (_, i) => ({
      id: i,
      position: [
        Math.cos((i / 4) * Math.PI * 2) * 8,
        Math.sin(i * 0.5) * 2,
        Math.sin((i / 4) * Math.PI * 2) * 8
      ] as [number, number, number],
      rotation: [0, (i / 4) * Math.PI * 2, 0] as [number, number, number],
      color: ["#6366f1", "#ec4899", "#10b981", "#f59e0b"][i]
    }));
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central Hub */}
      <Sphere args={[0.5, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={0.2}
        />
      </Sphere>
      
      {/* Project Display Boxes */}
      {projectBoxes.map((box) => (
        <group key={box.id} position={box.position} rotation={box.rotation}>
          {/* Main Box */}
          <Box args={[2, 3, 0.2]}>
            <meshStandardMaterial color="#2a2a2a" />
          </Box>
          
          {/* Screen */}
          <Box args={[1.6, 2.4, 0.05]} position={[0, 0, 0.13]}>
            <meshBasicMaterial color="#000000" />
          </Box>
          
          {/* Content Simulation */}
          <Box args={[1.4, 0.3, 0.01]} position={[0, 0.8, 0.16]}>
            <meshBasicMaterial color={box.color} />
          </Box>
          
          <Box args={[1.4, 0.8, 0.01]} position={[0, 0.2, 0.16]}>
            <meshBasicMaterial color="#333333" />
          </Box>
          
          <Box args={[1.4, 0.4, 0.01]} position={[0, -0.4, 0.16]}>
            <meshBasicMaterial color="#555555" />
          </Box>
          
          {/* Connection Lines */}
          <Box args={[0.05, 0.05, 8]} position={[0, 0, -4]} rotation={[0, Math.PI, 0]}>
            <meshBasicMaterial color={box.color} transparent opacity={0.3} />
          </Box>
        </group>
      ))}
    </group>
  );
}
