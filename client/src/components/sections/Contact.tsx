import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const contactRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  useEffect(() => {
    gsap.fromTo(formRef.current,
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        scrollTrigger: {
          trigger: contactRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section 
      ref={contactRef}
      className="section contact-section"
      data-section="contact"
    >
      <div className="contact-content">
        <h2 className="section-title">Professional Profile</h2>
        
        {/* Career Objective */}
        <div className="career-objective">
          <h3>Career Objective</h3>
          <p>
            Seeking challenging opportunities to leverage my 5+ years of QA expertise in driving software quality 
            excellence. Passionate about transitioning into automation testing while continuing to deliver 
            high-impact manual testing solutions.
          </p>
        </div>
        
        <div className="profile-grid">
          {/* Contact Information */}
          <div className="contact-card">
            <h3>Contact Information</h3>
            <div className="contact-details">
              <div className="contact-row">
                <span className="contact-icon">📧</span>
                <div className="contact-info-text">
                  <span className="contact-label">Email</span>
                  <span className="contact-value">mohityadav2597@gmail.com</span>
                </div>
              </div>
              <div className="contact-row">
                <span className="contact-icon">📱</span>
                <div className="contact-info-text">
                  <span className="contact-label">Phone</span>
                  <span className="contact-value">+91 8826920160</span>
                </div>
              </div>
              <div className="contact-row">
                <span className="contact-icon">📍</span>
                <div className="contact-info-text">
                  <span className="contact-label">Location</span>
                  <span className="contact-value">New Delhi, India</span>
                </div>
              </div>
              <div className="contact-row">
                <span className="contact-icon">💼</span>
                <div className="contact-info-text">
                  <span className="contact-label">LinkedIn</span>
                  <span className="contact-value">Available upon request</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Education & Qualifications */}
          <div className="education-card">
            <h3>Education & Qualifications</h3>
            <div className="education-timeline">
              <div className="education-item">
                <div className="education-year">2020-2023</div>
                <div className="education-content">
                  <h4>Master of Computer Applications (MCA)</h4>
                  <p>Maharaja Agrasen Himalayan Garhwal University</p>
                  <span className="education-location">Uttarakhand, India</span>
                </div>
              </div>
              <div className="education-item">
                <div className="education-year">2017-2020</div>
                <div className="education-content">
                  <h4>Bachelor of Computer Applications (BCA)</h4>
                  <p>Kalinga University</p>
                  <span className="education-location">Chhattisgarh, India</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Professional Tools & Technologies */}
        <div className="tools-technologies">
          <h3>Professional Tools & Technologies</h3>
          <div className="tools-grid">
            <div className="tool-category">
              <h4>Testing Tools</h4>
              <div className="tool-tags">
                <span className="tool-tag primary">Jira</span>
                <span className="tool-tag primary">Postman</span>
                <span className="tool-tag primary">Selenium (Basic)</span>
                <span className="tool-tag primary">Zoho</span>
              </div>
            </div>
            <div className="tool-category">
              <h4>Development Tools</h4>
              <div className="tool-tags">
                <span className="tool-tag secondary">GitHub</span>
                <span className="tool-tag secondary">VS Code</span>
                <span className="tool-tag secondary">Cursor</span>
                <span className="tool-tag secondary">MS Excel</span>
              </div>
            </div>
            <div className="tool-category">
              <h4>Methodologies</h4>
              <div className="tool-tags">
                <span className="tool-tag accent">Agile Boards</span>
                <span className="tool-tag accent">SDLC</span>
                <span className="tool-tag accent">STLC</span>
              </div>
            </div>
            <div className="tool-category">
              <h4>AI & Modern Tools</h4>
              <div className="tool-tags">
                <span className="tool-tag highlight">Perplexity AI</span>
                <span className="tool-tag highlight">Grok</span>
                <span className="tool-tag highlight">Colab</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Current Learning & Goals */}
        <div className="learning-goals">
          <h3>Professional Development</h3>
          <div className="learning-grid">
            <div className="learning-card">
              <h4>🎯 Current Learning</h4>
              <ul className="learning-list">
                <li>Selenium Test Automation</li>
                <li>Python Programming</li>
                <li>HTML & CSS Fundamentals</li>
                <li>Advanced API Testing</li>
              </ul>
            </div>
            <div className="goals-card">
              <h4>🚀 Career Goals</h4>
              <div className="goal-item">
                <strong>Primary Goal:</strong> Transition to Automation QA Expert
              </div>
              <div className="goal-item">
                <strong>Focus Areas:</strong> Test Automation Framework Development
              </div>
              <div className="goal-item">
                <strong>Timeline:</strong> Actively upgrading skills in 2025
              </div>
            </div>
          </div>
        </div>
        
        {/* Professional Interests */}
        <div className="interests-section">
          <h3>Personal Interests</h3>
          <div className="interests-tags">
            <span className="interest-tag">🏏 Cricket</span>
            <span className="interest-tag">✈️ Travel</span>
            <span className="interest-tag">💻 Tech Trends</span>
            <span className="interest-tag">🤖 AI & Automation</span>
            <span className="interest-tag">📚 Continuous Learning</span>
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="cta-section">
          <h3>Ready to Collaborate?</h3>
          <p>Open to discussing QA opportunities, automation projects, and quality assurance consulting.</p>
          <div className="cta-buttons">
            <button className="cta-btn primary" onClick={() => window.open('mailto:mohityadav2597@gmail.com')}>
              📧 Send Email
            </button>
            <button className="cta-btn secondary" onClick={() => window.open('tel:+918826920160')}>
              📞 Call Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
