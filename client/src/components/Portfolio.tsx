import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Scene from "./3d/Scene";
import Navigation from "./ui/Navigation";
import ScrollIndicator from "./ui/ScrollIndicator";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Contact from "./sections/Contact";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

export default function Portfolio() {
  useScrollAnimation();

  return (
    <>
      {/* 3D Canvas Background */}
      <Canvas
        camera={{
          position: [0, 0, 10],
          fov: 75,
          near: 0.1,
          far: 1000
        }}
        gl={{
          antialias: true,
          powerPreference: "high-performance",
          alpha: true
        }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1
        }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>

      {/* UI Overlay */}
      <div style={{ position: 'relative', zIndex: 10 }}>
        <Navigation />
        <ScrollIndicator />
        
        {/* Portfolio Sections */}
        <div className="portfolio-content">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Contact />
        </div>
      </div>
    </>
  );
}
