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
        <h2 className="section-title">Let's Connect</h2>
        <div className="contact-grid">
          <div className="contact-info">
            <h3>Get In Touch</h3>
            <p>
              Looking for opportunities to leverage my QA expertise in challenging projects. 
              Open to discussing manual testing, automation, and quality assurance roles.
            </p>
            <div className="contact-details">
              <div className="contact-item">
                <span className="contact-label">Email</span>
                <span className="contact-value">mohityadav2597@gmail.com</span>
              </div>
              <div className="contact-item">
                <span className="contact-label">Phone</span>
                <span className="contact-value">+91 8826920160</span>
              </div>
              <div className="contact-item">
                <span className="contact-label">Location</span>
                <span className="contact-value">New Delhi, India</span>
              </div>
              <div className="contact-item">
                <span className="contact-label">LinkedIn</span>
                <span className="contact-value">Available on request</span>
              </div>
            </div>
            <div className="education-section">
              <h3>Education & Certifications</h3>
              <div className="education-item">
                <h4>Master of Computer Applications (MCA)</h4>
                <p>Maharaja Agrasen Himalayan Garhwal University, Uttarakhand (2020-2023)</p>
              </div>
              <div className="education-item">
                <h4>Bachelor of Computer Applications (BCA)</h4>
                <p>Kalinga University, Chhattisgarh (2017-2020)</p>
              </div>
              <div className="tools-section">
                <h4>Tools & Technologies</h4>
                <p>Jira • Postman • Selenium (Basics) • Zoho • MS Excel • Agile Boards • GitHub • VS Code • AI Tools</p>
              </div>
              <div className="learning-section">
                <h4>Currently Learning</h4>
                <p>Selenium Automation • Python • HTML • CSS</p>
                <p><strong>Goal:</strong> Becoming an Automation QA Expert</p>
              </div>
            </div>
          </div>
          <form ref={formRef} onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="form-textarea"
              />
            </div>
            <button type="submit" className="form-submit">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
