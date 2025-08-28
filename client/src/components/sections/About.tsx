import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const aboutRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(contentRef.current,
      { opacity: 0, x: -100 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        scrollTrigger: {
          trigger: aboutRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, []);

  return (
    <section 
      ref={aboutRef}
      className="section about-section"
      data-section="about"
    >
      <div ref={contentRef} className="about-content">
        <h2 className="section-title">About Me</h2>
        <div className="about-text">
          <p>
            I'm a passionate developer who combines technical expertise with creative vision 
            to build extraordinary digital experiences. With a focus on modern web technologies 
            and 3D graphics, I create applications that push the boundaries of what's possible 
            in the browser.
          </p>
          <p>
            My journey spans full-stack development, 3D visualization, and interactive design. 
            I believe in the power of technology to tell stories and create meaningful connections 
            between brands and their audiences.
          </p>
        </div>
        <div className="about-stats">
          <div className="stat">
            <span className="stat-number">50+</span>
            <span className="stat-label">Projects Completed</span>
          </div>
          <div className="stat">
            <span className="stat-number">5+</span>
            <span className="stat-label">Years Experience</span>
          </div>
          <div className="stat">
            <span className="stat-number">20+</span>
            <span className="stat-label">Technologies Mastered</span>
          </div>
        </div>
      </div>
    </section>
  );
}
