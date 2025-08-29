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

    // Set up section observers with improved scrolling detection
    const sections = document.querySelectorAll('[data-section]');
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the section with the highest intersection ratio
        let currentEntry: IntersectionObserverEntry | null = null;
        let highestRatio = 0;
        
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > highestRatio) {
            highestRatio = entry.intersectionRatio;
            currentEntry = entry;
          }
        });
        
        // Update current section based on the most visible section
        if (currentEntry && highestRatio > 0.1) {
          const sectionId = currentEntry.target.getAttribute('data-section');
          if (sectionId) {
            setCurrentSection(sectionId);
          }
        }
        
        // Handle scroll up to hero section specifically
        if (window.scrollY < 100) {
          setCurrentSection('hero');
        }
      },
      { 
        threshold: [0.1, 0.25, 0.5, 0.75, 0.9],
        rootMargin: '-10% 0px -10% 0px'
      }
    );

    // Enhanced scroll handling for better section detection
    const handleScroll = () => {
      updateProgress();
      
      // Special handling for scroll to top
      if (window.scrollY < 50) {
        setCurrentSection('hero');
      }
    };

    sections.forEach((section) => observer.observe(section));
    window.addEventListener('scroll', handleScroll);
    
    // Initial update
    updateProgress();
    setCurrentSection('hero');

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [setCurrentSection, setScrollProgress]);
}