import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top center",
        end: "bottom center",
        scrub: 1
      }
    });

    // Initial animations - ensure visibility
    gsap.fromTo(titleRef.current, 
      { opacity: 0, y: 100 }, 
      { opacity: 1, y: 0, duration: 1.2, delay: 0.3, ease: "power2.out" }
    );
    gsap.fromTo(subtitleRef.current, 
      { opacity: 0, y: 50 }, 
      { opacity: 1, y: 0, duration: 1.2, delay: 0.6, ease: "power2.out" }
    );

    // Scroll-based animations - keep title more visible
    tl.to(titleRef.current, { y: -50, opacity: 0.8 })
      .to(subtitleRef.current, { y: -25, opacity: 0.6 }, "<");

  }, []);

  return (
    <section 
      ref={heroRef}
      className="section hero-section"
      data-section="hero"
    >
      <div className="hero-content">
        <h1 ref={titleRef} className="hero-title">
          Mohit Yadav
        </h1>
        <p ref={subtitleRef} className="hero-subtitle">
          Senior QA Engineer with 5+ years of hands-on experience in manual testing across web and mobile applications
        </p>
        <div className="hero-cta">
          <button className="cta-button">
            View My Projects
          </button>
          <div className="hero-contact">
            <span className="contact-info">📧 mohityadav2597@gmail.com</span>
            <span className="contact-info">📱 +91 8826920160</span>
            <span className="contact-info">📍 New Delhi, India</span>
          </div>
        </div>
      </div>
    </section>
  );
}
