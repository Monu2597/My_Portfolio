import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "MBD Finance – Blockchain E-commerce Platform",
    description: "Integrated MetaMask wallet for crypto payments, increasing digital product sales by 20%. Enhanced platform scalability by 25% via dealer submission approval feature.",
    tech: ["Blockchain", "MetaMask", "E-commerce", "Manual Testing"],
    image: "/textures/wood.jpg"
  },
  {
    title: "Mr. Fix – On-demand Service Booking App",
    description: "Boosted user engagement by 25% by designing intuitive dual interfaces for customers and providers. Comprehensive testing of booking workflows.",
    tech: ["Mobile App", "Service Booking", "UI Testing", "User Engagement"],
    image: "/textures/asphalt.png"
  },
  {
    title: "Praavi HRMS – Workforce Management System",
    description: "Enabled attendance tracking via facial recognition; onboarded 100+ users with role-based access. Extensive testing of access controls and user management.",
    tech: ["HRMS", "Facial Recognition", "Role-based Access", "API Testing"],
    image: "/textures/grass.png"
  },
  {
    title: "eGurukul – eLearning Platform",
    description: "Served 40,000 students with 1,200 pre-recorded lectures and 500+ assessments. Drove 30% revenue growth by introducing bite-sized course packages.",
    tech: ["eLearning", "Video Platform", "Assessment System", "Performance Testing"],
    image: "/textures/sand.jpg"
  },
  {
    title: "Cheesed Anytime – Charity Assistance App",
    description: "Increased community help requests by 30% through an optimized service request workflow. Focused testing on user journey optimization.",
    tech: ["Charity App", "Workflow Testing", "User Journey", "Mobile Testing"],
    image: "/textures/wood.jpg"
  },
  {
    title: "Unpin SECCA Web – E-Sports Tournament Platform",
    description: "Managed admin panel access for 12 user roles, ensuring secure and scalable permission controls. Comprehensive role-based testing.",
    tech: ["E-Sports", "Admin Panel", "Permission Controls", "Security Testing"],
    image: "/textures/sky.png"
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
        <h2 className="section-title">Major Projects & Experience</h2>
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
