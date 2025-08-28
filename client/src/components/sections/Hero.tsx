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

    // Initial animations
    gsap.fromTo(titleRef.current, 
      { opacity: 0, y: 100 }, 
      { opacity: 1, y: 0, duration: 1, delay: 0.5 }
    );
    gsap.fromTo(subtitleRef.current, 
      { opacity: 0, y: 50 }, 
      { opacity: 1, y: 0, duration: 1, delay: 0.8 }
    );

    // Scroll-based animations
    tl.to(titleRef.current, { y: -100, opacity: 0.5 })
      .to(subtitleRef.current, { y: -50, opacity: 0.3 }, "<");

  }, []);

  return (
    <section 
      ref={heroRef}
      className="section hero-section"
      data-section="hero"
    >
      <div className="hero-content">
        <h1 ref={titleRef} className="hero-title">
          Creative Developer
        </h1>
        <p ref={subtitleRef} className="hero-subtitle">
          Crafting immersive digital experiences through code and creativity
        </p>
        <div className="hero-cta">
          <button className="cta-button">
            Explore My Work
          </button>
        </div>
      </div>
    </section>
  );
}
