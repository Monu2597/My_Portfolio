import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { name: "Manual Testing", level: 95, color: "#6366f1" },
  { name: "Test Planning", level: 90, color: "#ec4899" },
  { name: "API Testing (Postman)", level: 88, color: "#f59e0b" },
  { name: "Jira Management", level: 92, color: "#10b981" },
  { name: "Regression Testing", level: 90, color: "#8b5cf6" },
  { name: "Agile Methodology", level: 85, color: "#06b6d4" },
  { name: "Test Automation (Selenium)", level: 65, color: "#84cc16" },
  { name: "Defect Tracking", level: 88, color: "#f97316" },
  { name: "Test Documentation", level: 92, color: "#ef4444" },
  { name: "Python (Learning)", level: 55, color: "#3b82f6" }
];

export default function Skills() {
  const skillsRef = useRef<HTMLDivElement>(null);
  const skillBarsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    skillBarsRef.current.forEach((bar, index) => {
      if (bar) {
        const skill = skills[index];
        gsap.fromTo(bar.querySelector('.skill-progress'),
          { width: "0%" },
          {
            width: `${skill.level}%`,
            duration: 1.5,
            delay: index * 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: skillsRef.current,
              start: "top 70%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    });
  }, []);

  return (
    <section 
      ref={skillsRef}
      className="section skills-section"
      data-section="skills"
    >
      <div className="skills-content">
        <h2 className="section-title">Technical Skills & Expertise</h2>
        <div className="skills-grid">
          {skills.map((skill, index) => (
            <div 
              key={skill.name}
              ref={el => skillBarsRef.current[index] = el!}
              className="skill-item"
            >
              <div className="skill-header">
                <span className="skill-name">{skill.name}</span>
                <span className="skill-percentage">{skill.level}%</span>
              </div>
              <div className="skill-bar">
                <div 
                  className="skill-progress" 
                  style={{ backgroundColor: skill.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
