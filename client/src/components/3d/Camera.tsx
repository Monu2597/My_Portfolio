import { useRef, useEffect } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { usePortfolio } from "../../lib/stores/usePortfolio";
import { gsap } from "gsap";

export default function Camera() {
  const { camera } = useThree();
  const { currentSection, scrollProgress } = usePortfolio();
  const targetPosition = useRef(new THREE.Vector3(0, 0, 10));
  const targetRotation = useRef(new THREE.Euler(0, 0, 0));

  useEffect(() => {
    // Define camera positions for each section
    const positions = {
      hero: { position: [0, 0, 10], rotation: [0, 0, 0] },
      about: { position: [5, 2, 8], rotation: [0, 0.2, 0] },
      skills: { position: [-3, 4, 12], rotation: [-0.1, -0.3, 0] },
      projects: { position: [2, -1, 15], rotation: [0.1, 0.1, 0] },
      contact: { position: [0, 0, 8], rotation: [0, 0, 0] }
    };

    const targetPos = positions[currentSection as keyof typeof positions] || positions.hero;
    
    gsap.to(targetPosition.current, {
      x: targetPos.position[0],
      y: targetPos.position[1],
      z: targetPos.position[2],
      duration: 2,
      ease: "power2.out"
    });

    gsap.to(targetRotation.current, {
      x: targetPos.rotation[0],
      y: targetPos.rotation[1],
      z: targetPos.rotation[2],
      duration: 2,
      ease: "power2.out"
    });
  }, [currentSection]);

  useFrame(() => {
    // Smooth camera movement
    camera.position.lerp(targetPosition.current, 0.02);
    camera.rotation.x = THREE.MathUtils.lerp(camera.rotation.x, targetRotation.current.x, 0.02);
    camera.rotation.y = THREE.MathUtils.lerp(camera.rotation.y, targetRotation.current.y, 0.02);
    camera.rotation.z = THREE.MathUtils.lerp(camera.rotation.z, targetRotation.current.z, 0.02);
    
    // Add subtle mouse parallax
    camera.position.x += Math.sin(scrollProgress * Math.PI * 2) * 0.5;
    camera.position.y += Math.cos(scrollProgress * Math.PI * 2) * 0.3;
  });

  return null;
}
