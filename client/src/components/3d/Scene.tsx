import { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { usePortfolio } from "../../lib/stores/usePortfolio";
import Lights from "./Lights";
import Camera from "./Camera";
import HeroEnvironment from "./environments/HeroEnvironment";
import ProjectsEnvironment from "./environments/ProjectsEnvironment";
import FloatingObjects from "./models/FloatingObjects";

export default function Scene() {
  const sceneRef = useRef<THREE.Group>(null);
  const { currentSection, scrollProgress } = usePortfolio();

  useFrame((state, delta) => {
    if (sceneRef.current) {
      // Subtle scene rotation based on scroll
      sceneRef.current.rotation.y = scrollProgress * 0.1;
    }
  });

  return (
    <group ref={sceneRef}>
      <color attach="background" args={["#0a0a0a"]} />
      <fog attach="fog" args={["#0a0a0a", 50, 200]} />
      
      <Lights />
      <Camera />
      
      {/* Environment based on current section */}
      {(currentSection === 'hero' || currentSection === 'about') && (
        <HeroEnvironment />
      )}
      
      {(currentSection === 'skills' || currentSection === 'projects') && (
        <ProjectsEnvironment />
      )}
      
      <FloatingObjects />
    </group>
  );
}
