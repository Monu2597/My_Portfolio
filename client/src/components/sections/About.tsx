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
            I'm a dedicated Senior QA Engineer with 5+ years of hands-on experience in manual testing 
            across web and mobile applications. I excel at test planning, bug reporting, and leading 
            end-to-end quality assurance processes that elevate product quality and customer satisfaction.
          </p>
          <p>
            My expertise spans from manual testing to test automation basics, with a strong focus on 
            QA process optimization and cross-functional collaboration. I'm passionate about ensuring 
            software excellence and am actively expanding my skills in automation testing with Selenium and Python.
          </p>
          <p>
            Currently pursuing opportunities to leverage my quality assurance expertise while transitioning 
            into automation testing, combining my solid foundation in manual testing with emerging automation skills.
          </p>
        </div>
        <div className="about-stats">
          <div className="stat">
            <span className="stat-number">15+</span>
            <span className="stat-label">Projects Tested</span>
          </div>
          <div className="stat">
            <span className="stat-number">5+</span>
            <span className="stat-label">Years Experience</span>
          </div>
          <div className="stat">
            <span className="stat-number">30%</span>
            <span className="stat-label">Bug Detection Rate Improvement</span>
          </div>
          <div className="stat">
            <span className="stat-number">40K+</span>
            <span className="stat-label">Users Served</span>
          </div>
        </div>
      </div>
    </section>
  );
}
