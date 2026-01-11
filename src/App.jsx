import { useState } from 'react'
import './App.css'

// Icons as simple SVG components
const Icons = {
  Menu: () => <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 12h18M3 6h18M3 18h18"/></svg>,
  X: () => <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>,
  Printer3D: () => <svg width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="3" y="9" width="18" height="12" rx="2"/><path d="M3 13h18M7 17h10M9 5h6v4H9z"/></svg>,
  Robot: () => <svg width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="4" y="8" width="16" height="12" rx="2"/><circle cx="9" cy="13" r="1.5"/><circle cx="15" cy="13" r="1.5"/><path d="M10 17h4M12 4v4M8 4h8"/></svg>,
  Brain: () => <svg width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M12 4.5a4.5 4.5 0 00-4.5 4.5c0 1.5.5 2.5 1.5 3.5-1 1-1.5 2-1.5 3.5a4.5 4.5 0 009 0c0-1.5-.5-2.5-1.5-3.5 1-1 1.5-2 1.5-3.5A4.5 4.5 0 0012 4.5z"/><path d="M12 4.5V20"/></svg>,
  Wifi: () => <svg width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M5 12.55a11 11 0 0114 0M8.53 16.11a6 6 0 016.95 0"/><circle cx="12" cy="20" r="1"/></svg>,
  Cpu: () => <svg width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 15h3M1 9h3M1 15h3"/></svg>,
  Zap: () => <svg width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>,
  Mail: () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 6l-10 7L2 6"/></svg>,
  Phone: () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>,
  MapPin: () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  Star: () => <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>,
  ArrowRight: () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>,
  ArrowLeft: () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>,
  Check: () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg>,
}

const coursesData = [
  { id: '3d-printing', icon: <Icons.Printer3D />, title: '3D Printing & Design', desc: 'Learn CAD modeling and bring your ideas to life with 3D printing technology', image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800', fullDesc: 'Master the art of 3D design and printing. Learn industry-standard CAD software, understand different printing technologies, and create real-world prototypes.', topics: ['CAD Software (Tinkercad, Fusion 360)', '3D Printer Operation', 'Material Selection', 'Prototype Development', 'Design Thinking'] },
  { id: 'robotics', icon: <Icons.Robot />, title: 'Robotics', desc: 'Build and program robots from scratch, from basic mechanics to advanced automation', image: 'https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?w=800', fullDesc: 'Dive into the exciting world of robotics. Build autonomous robots, learn programming, and understand mechanical systems.', topics: ['Robot Assembly', 'Motor Control', 'Sensor Integration', 'Programming Logic', 'Autonomous Navigation'] },
  { id: 'ai', icon: <Icons.Brain />, title: 'Artificial Intelligence', desc: 'Explore machine learning, neural networks, and create intelligent applications', image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800', fullDesc: 'Understand the fundamentals of AI and machine learning. Create projects that can recognize images, process language, and make decisions.', topics: ['Machine Learning Basics', 'Neural Networks', 'Image Recognition', 'Chatbot Development', 'AI Ethics'] },
  { id: 'iot', icon: <Icons.Wifi />, title: 'Internet of Things', desc: 'Connect devices, sensors, and build smart systems for the connected world', image: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=800', fullDesc: 'Learn to connect the physical and digital worlds. Build smart home devices, weather stations, and connected systems.', topics: ['Sensor Networks', 'WiFi & Bluetooth', 'Cloud Connectivity', 'Smart Home Projects', 'Data Visualization'] },
  { id: 'embedded', icon: <Icons.Cpu />, title: 'Embedded Systems', desc: 'Master microcontrollers, Arduino, Raspberry Pi, and circuit design', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800', fullDesc: 'Program microcontrollers and build embedded systems. Work with Arduino, Raspberry Pi, and learn real-time programming.', topics: ['Arduino Programming', 'Raspberry Pi Projects', 'Microcontroller Architecture', 'Real-time Systems', 'Hardware Interfacing'] },
  { id: 'electronics', icon: <Icons.Zap />, title: 'Electronics & Circuits', desc: 'Understand electronics fundamentals and create your own circuit projects', image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=800', fullDesc: 'Build a strong foundation in electronics. Learn circuit design, soldering, and create your own electronic gadgets.', topics: ['Circuit Fundamentals', 'Component Identification', 'Soldering Skills', 'PCB Design', 'Project Building'] },
]


function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState('home')
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' })
  const [formStatus, setFormStatus] = useState({ loading: false, success: false, error: '' })

  // Web3Forms - Get your free access key at https://web3forms.com
  const WEB3FORMS_KEY = '926c3ab0-9c7f-4966-afb8-8c18d31ed265'

  const scrollToContact = () => {
    setCurrentPage('home')
    setSelectedCourse(null)
    setTimeout(() => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormStatus({ loading: true, success: false, error: '' })
    
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          to_email: 'ops.shard@carecubs.in',
          subject: `New Enquiry from ${formData.name}`,
          from_name: formData.name,
          email: formData.email,
          phone: formData.phone || 'Not provided',
          message: formData.message
        })
      })
      
      const result = await response.json()
      if (result.success) {
        setFormStatus({ loading: false, success: true, error: '' })
        setFormData({ name: '', email: '', phone: '', message: '' })
      } else {
        setFormStatus({ loading: false, success: false, error: 'Failed to send. Please try again.' })
      }
    } catch (err) {
      setFormStatus({ loading: false, success: false, error: 'Failed to send. Please try again.' })
    }
  }

  const goHome = () => {
    setCurrentPage('home')
    setSelectedCourse(null)
    window.scrollTo(0, 0)
  }

  const openCourse = (course) => {
    setSelectedCourse(course)
    setCurrentPage('course')
    window.scrollTo(0, 0)
  }

  const testimonials = [
    { name: 'Priya Sharma', role: 'Parent', text: 'My son has developed a genuine passion for robotics. The hands-on approach at CareQubics is exceptional!' },
    { name: 'Rahul Verma', role: 'Student, Age 14', text: 'I built my first robot here! The teachers make complex concepts so easy to understand.' },
    { name: 'Anita Desai', role: 'School Principal', text: 'CareQubics has transformed how our students perceive technology. Highly recommended!' },
  ]

  const stats = [
    { number: '5000+', label: 'Students Trained' },
    { number: '50+', label: 'Schools Partnered' },
    { number: '100+', label: 'Projects Completed' },
    { number: '15+', label: 'Expert Mentors' },
  ]

  // Course Detail Page
  if (currentPage === 'course' && selectedCourse) {
    return (
      <div className="app">
        <nav className="navbar">
          <div className="container nav-container">
            <a onClick={goHome} className="logo" style={{cursor:'pointer'}}>
              <span className="logo-icon">◈</span>
              CareQubics
            </a>
            <button className="btn btn-primary nav-cta" onClick={scrollToContact}>Enroll Now</button>
          </div>
        </nav>
        <div className="page-content">
          <div className="container">
            <button className="back-btn" onClick={goHome}><Icons.ArrowLeft /> Back to Home</button>
            <div className="course-detail">
              <div className="course-detail-header">
                <div className="course-detail-icon">{selectedCourse.icon}</div>
                <h1>{selectedCourse.title}</h1>
              </div>
              <img src={selectedCourse.image} alt={selectedCourse.title} className="course-detail-image" />
              <p className="course-detail-desc">{selectedCourse.fullDesc}</p>
              <h3>What You'll Learn</h3>
              <ul className="course-topics">
                {selectedCourse.topics.map((topic, i) => (
                  <li key={i}><Icons.Check /> {topic}</li>
                ))}
              </ul>
              <button className="btn btn-primary btn-lg" onClick={scrollToContact}>Enroll in This Course</button>
            </div>
          </div>
        </div>
      </div>
    )
  }


  // About Page
  if (currentPage === 'about') {
    return (
      <div className="app">
        <nav className="navbar">
          <div className="container nav-container">
            <a onClick={goHome} className="logo" style={{cursor:'pointer'}}>
              <span className="logo-icon">◈</span>
              CareQubics
            </a>
            <button className="btn btn-primary nav-cta" onClick={scrollToContact}>Enroll Now</button>
          </div>
        </nav>
        <div className="page-content">
          <div className="container">
            <button className="back-btn" onClick={goHome}><Icons.ArrowLeft /> Back to Home</button>
            <div className="about-page">
              <h1>About <span className="gradient-text">CareQubics</span></h1>
              <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800" alt="Team" className="about-page-image" />
              <div className="about-page-content">
                <h2>Our Story</h2>
                <p>Founded in 2020, CareQubics emerged from a simple belief: every child deserves access to quality STEAM education. What started as a small workshop in Bangalore has grown into a movement that has touched thousands of young minds across India.</p>
                
                <h2>Our Mission</h2>
                <p>To democratize STEAM education by making it accessible, engaging, and impactful. We believe that hands-on learning is the key to unlocking a child's potential and preparing them for the future.</p>
                
                <h2>Our Team</h2>
                <p>Our team consists of passionate educators, engineers, and innovators who share a common goal: inspiring the next generation of creators. With backgrounds from top institutions and industry experience, our mentors bring real-world expertise to every classroom.</p>
                
                <h2>Our Impact</h2>
                <div className="about-stats">
                  {stats.map((stat, i) => (
                    <div key={i} className="about-stat">
                      <span className="stat-number">{stat.number}</span>
                      <span className="stat-label">{stat.label}</span>
                    </div>
                  ))}
                </div>
                
                <button className="btn btn-primary btn-lg" onClick={scrollToContact}>Get in Touch</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }


  // Home Page
  return (
    <div className="app">
      {/* Navigation */}
      <nav className="navbar">
        <div className="container nav-container">
          <a onClick={goHome} className="logo" style={{cursor:'pointer'}}>
            <span className="logo-icon">◈</span>
            CareQubics
          </a>
          <div className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
            <a href="#about" onClick={() => setMobileMenuOpen(false)}>About</a>
            <a href="#courses" onClick={() => setMobileMenuOpen(false)}>Courses</a>
            <a href="#why-us" onClick={() => setMobileMenuOpen(false)}>Why Us</a>
            <a href="#testimonials" onClick={() => setMobileMenuOpen(false)}>Testimonials</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)}>Contact</a>
          </div>
          <button className="btn btn-primary nav-cta" onClick={scrollToContact}>Enroll Now</button>
          <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <Icons.X /> : <Icons.Menu />}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-gradient"></div>
          <div className="hero-grid"></div>
        </div>
        <div className="container hero-content">
          <div className="hero-badge">🚀 Empowering Future Innovators</div>
          <h1>Learn <span className="gradient-text">STEAM</span> Skills<br />Build the Future</h1>
          <p className="hero-subtitle">
            Hands-on education in 3D Printing, Robotics, AI, IoT, and Electronics. 
            Transform curiosity into expertise with CareQubics.
          </p>
          <div className="hero-stats">
            {stats.map((stat, i) => (
              <div key={i} className="hero-stat">
                <span className="stat-number">{stat.number}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">About Us</span>
            <h2>Shaping Tomorrow's <span className="gradient-text">Innovators</span></h2>
            <p>CareQubics is a leading EdTech company dedicated to making STEAM education accessible, engaging, and impactful for students of all ages.</p>
          </div>
          <div className="about-grid">
            <div className="about-card">
              <div className="about-icon">🎯</div>
              <h3>Our Mission</h3>
              <p>To inspire and equip the next generation with cutting-edge technology skills through hands-on, project-based learning experiences.</p>
            </div>
            <div className="about-card">
              <div className="about-icon">👁️</div>
              <h3>Our Vision</h3>
              <p>A world where every student has the opportunity to become a creator, innovator, and problem-solver using technology.</p>
            </div>
            <div className="about-card">
              <div className="about-icon">💡</div>
              <h3>Our Approach</h3>
              <p>We believe in learning by doing. Our curriculum combines theory with practical projects that students can take home and showcase.</p>
            </div>
          </div>
          <div style={{textAlign:'center', marginTop:'32px'}}>
            <button className="btn btn-outline" onClick={() => { setCurrentPage('about'); window.scrollTo(0,0); }}>Learn More About Us <Icons.ArrowRight /></button>
          </div>
        </div>
      </section>


      {/* Courses Section */}
      <section id="courses" className="courses">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Our Programs</span>
            <h2>Explore Our <span className="gradient-text">Courses</span></h2>
            <p>Comprehensive programs designed to build real-world skills in emerging technologies</p>
          </div>
          <div className="courses-grid">
            {coursesData.map((course, i) => (
              <div key={i} className="course-card">
                <div className="course-icon">{course.icon}</div>
                <h3>{course.title}</h3>
                <p>{course.desc}</p>
                <a onClick={() => openCourse(course)} className="course-link" style={{cursor:'pointer'}}>Learn More <Icons.ArrowRight /></a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section id="why-us" className="why-us">
        <div className="container">
          <div className="why-us-content">
            <div className="why-us-text">
              <span className="section-tag">Why Choose Us</span>
              <h2>The CareQubics <span className="gradient-text">Advantage</span></h2>
              <ul className="features-list">
                <li><Icons.Check /> <span>Industry-experienced mentors with passion for teaching</span></li>
                <li><Icons.Check /> <span>State-of-the-art labs with latest equipment</span></li>
                <li><Icons.Check /> <span>Small batch sizes for personalized attention</span></li>
                <li><Icons.Check /> <span>Project-based curriculum with take-home kits</span></li>
                <li><Icons.Check /> <span>Certification upon course completion</span></li>
                <li><Icons.Check /> <span>Regular workshops and hackathons</span></li>
              </ul>
            </div>
            <div className="why-us-visual">
              <div className="visual-card">
                <div className="visual-content">
                  <div className="floating-badge badge-1">🤖 Robotics</div>
                  <div className="floating-badge badge-2">🖨️ 3D Print</div>
                  <div className="floating-badge badge-3">🧠 AI/ML</div>
                  <div className="floating-badge badge-4">📡 IoT</div>
                  <div className="center-icon">◈</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="testimonials">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Testimonials</span>
            <h2>What People <span className="gradient-text">Say</span></h2>
            <p>Hear from our students, parents, and partners</p>
          </div>
          <div className="testimonials-grid">
            {testimonials.map((t, i) => (
              <div key={i} className="testimonial-card">
                <div className="stars">
                  {[...Array(5)].map((_, j) => <Icons.Star key={j} />)}
                </div>
                <p className="testimonial-text">"{t.text}"</p>
                <div className="testimonial-author">
                  <div className="author-avatar">{t.name[0]}</div>
                  <div>
                    <div className="author-name">{t.name}</div>
                    <div className="author-role">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Start Your <span className="gradient-text">STEAM Journey</span>?</h2>
            <p>Join thousands of students who are already building the future with CareQubics</p>
            <button className="btn btn-white btn-lg" onClick={scrollToContact}>Enroll Now</button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info">
              <span className="section-tag">Get in Touch</span>
              <h2>Let's <span className="gradient-text">Connect</span></h2>
              <p>Have questions? We'd love to hear from you. Reach out and let's discuss how we can help your child excel.</p>
              <div className="contact-details">
                <div className="contact-item">
                  <Icons.Mail />
                  <span>hello@carequbics.com</span>
                </div>
                <div className="contact-item">
                  <Icons.Phone />
                  <span>+91 98765 43210</span>
                </div>
                <div className="contact-item">
                  <Icons.MapPin />
                  <span>Tech Hub, Innovation Street, Bangalore</span>
                </div>
              </div>
            </div>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
              </div>
              <div className="form-group">
                <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required />
              </div>
              <div className="form-group">
                <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
              </div>
              <div className="form-group">
                <textarea name="message" placeholder="Your Message" rows="4" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} required></textarea>
              </div>
              {formStatus.error && <p className="form-error">{formStatus.error}</p>}
              {formStatus.success && <p className="form-success">Message sent successfully!</p>}
              <button type="submit" className="btn btn-primary btn-lg btn-full" disabled={formStatus.loading}>
                {formStatus.loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <a onClick={goHome} className="logo" style={{cursor:'pointer'}}>
                <span className="logo-icon">◈</span>
                CareQubics
              </a>
              <p>Empowering the next generation of innovators through hands-on STEAM education.</p>
            </div>
            <div className="footer-links">
              <h4>Quick Links</h4>
              <a href="#about">About Us</a>
              <a href="#courses">Courses</a>
              <a href="#testimonials">Testimonials</a>
              <a href="#contact">Contact</a>
            </div>
            <div className="footer-links">
              <h4>Programs</h4>
              {coursesData.slice(0, 4).map((c, i) => (
                <a key={i} onClick={() => openCourse(c)} style={{cursor:'pointer'}}>{c.title.split(' ')[0]}</a>
              ))}
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2026 CareQubics. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
