import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { name: "React", level: 95, color: "#61DAFB" },
  { name: "Three.js", level: 90, color: "#000000" },
  { name: "TypeScript", level: 88, color: "#3178C6" },
  { name: "Node.js", level: 85, color: "#339933" },
  { name: "GSAP", level: 82, color: "#88CE02" },
  { name: "WebGL", level: 75, color: "#990000" },
  { name: "Python", level: 80, color: "#3776AB" },
  { name: "MongoDB", level: 78, color: "#47A248" }
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
        <h2 className="section-title">Skills & Expertise</h2>
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
