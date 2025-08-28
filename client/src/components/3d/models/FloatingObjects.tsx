import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Sphere, Box, Octahedron } from "@react-three/drei";

export default function FloatingObjects() {
  const groupRef = useRef<THREE.Group>(null);
  
  // Generate random positions for floating objects
  const objects = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      position: [
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 40
      ] as [number, number, number],
      rotation: [
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      ] as [number, number, number],
      scale: 0.1 + Math.random() * 0.5,
      type: Math.floor(Math.random() * 3),
      speed: 0.5 + Math.random() * 1.5
    }));
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, index) => {
        const obj = objects[index];
        if (child && obj) {
          child.rotation.x += 0.01 * obj.speed;
          child.rotation.y += 0.005 * obj.speed;
          child.position.y += Math.sin(state.clock.elapsedTime * obj.speed) * 0.01;
        }
      });
    }
  });

  return (
    <group ref={groupRef}>
      {objects.map((obj) => {
        const Component = obj.type === 0 ? Sphere : obj.type === 1 ? Box : Octahedron;
        const args = obj.type === 0 ? [1, 16, 16] : obj.type === 1 ? [1, 1, 1] : [1];
        
        return (
          <Component
            key={obj.id}
            args={args as any}
            position={obj.position}
            rotation={obj.rotation}
            scale={obj.scale}
          >
            <meshStandardMaterial
              color={obj.type === 0 ? "#6366f1" : obj.type === 1 ? "#ec4899" : "#10b981"}
              transparent
              opacity={0.3}
              wireframe={obj.type === 2}
            />
          </Component>
        );
      })}
    </group>
  );
}
