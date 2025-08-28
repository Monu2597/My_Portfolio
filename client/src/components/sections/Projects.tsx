import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "3D E-commerce Platform",
    description: "Interactive product visualization with Three.js and WebGL",
    tech: ["React", "Three.js", "WebGL", "Node.js"],
    image: "/textures/wood.jpg"
  },
  {
    title: "Real-time Collaboration Tool",
    description: "Multi-user workspace with live synchronization",
    tech: ["TypeScript", "WebSockets", "MongoDB", "React"],
    image: "/textures/asphalt.png"
  },
  {
    title: "AR Mobile Experience",
    description: "Augmented reality application for retail visualization",
    tech: ["React Native", "ARKit", "WebRTC", "Python"],
    image: "/textures/grass.png"
  },
  {
    title: "Data Visualization Dashboard",
    description: "Interactive analytics platform with real-time updates",
    tech: ["D3.js", "React", "Python", "PostgreSQL"],
    image: "/textures/sand.jpg"
  }
];

export default function Projects() {
  const projectsRef = useRef<HTMLDivElement>(null);
  const projectRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    projectRefs.current.forEach((project, index) => {
      if (project) {
        gsap.fromTo(project,
          { opacity: 0, y: 100, rotateX: -10 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 1,
            delay: index * 0.2,
            scrollTrigger: {
              trigger: project,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    });
  }, []);

  return (
    <section 
      ref={projectsRef}
      className="section projects-section"
      data-section="projects"
    >
      <div className="projects-content">
        <h2 className="section-title">Featured Projects</h2>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div 
              key={project.title}
              ref={el => projectRefs.current[index] = el!}
              className="project-card"
            >
              <div className="project-image">
                <img src={project.image} alt={project.title} />
                <div className="project-overlay">
                  <button className="project-button">View Project</button>
                </div>
              </div>
              <div className="project-info">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-tech">
                  {project.tech.map(tech => (
                    <span key={tech} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
