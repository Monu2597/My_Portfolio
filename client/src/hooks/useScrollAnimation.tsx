import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePortfolio } from "../lib/stores/usePortfolio";

gsap.registerPlugin(ScrollTrigger);

export function useScrollAnimation() {
  const { setCurrentSection, setScrollProgress } = usePortfolio();

  useEffect(() => {
    // Update scroll progress
    const updateProgress = () => {
      const scrolled = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrolled / maxScroll, 1);
      setScrollProgress(progress);
    };

    // Set up section observers
    const sections = document.querySelectorAll('[data-section]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
            const sectionId = entry.target.getAttribute('data-section');
            if (sectionId) {
              setCurrentSection(sectionId);
            }
          }
        });
      },
      { threshold: [0.3, 0.7] }
    );

    sections.forEach((section) => observer.observe(section));
    window.addEventListener('scroll', updateProgress);
    
    // Initial update
    updateProgress();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', updateProgress);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [setCurrentSection, setScrollProgress]);
}
