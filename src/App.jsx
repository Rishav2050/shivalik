import { useState, useEffect } from 'react'
import { 
  Droplet, 
  Flame, 
  FlaskConical, 
  Wrench, 
  ShieldCheck, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  Menu, 
  X, 
  Send, 
  Award, 
  HeartHandshake, 
  Settings,
  ChevronUp
} from 'lucide-react'
import './App.css'

function App() {
  // Intro Preloader States
  const [showIntro, setShowIntro] = useState(true)
  const [isSlidingUp, setIsSlidingUp] = useState(false)
  
  // Navbar States
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeNav, setActiveNav] = useState('home')
  
  // Product Filter State
  const [activeFilter, setActiveFilter] = useState('all') // 'all', 'ro', 'fire', 'chemical'
  
  // Form States
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    division: 'General Inquiry',
    message: ''
  })
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  
  // Scroll to Top visibility
  const [showScrollTop, setShowScrollTop] = useState(false)

  // Trigger Intro Preloader and exit sequence
  useEffect(() => {
    // Disable body scroll during intro
    document.body.style.overflow = 'hidden'
    
    const slideTimer = setTimeout(() => {
      setIsSlidingUp(true)
    }, 2800)

    const finishTimer = setTimeout(() => {
      setShowIntro(false)
      document.body.style.overflow = 'unset'
    }, 3600)

    return () => {
      clearTimeout(slideTimer)
      clearTimeout(finishTimer)
    }
  }, [])

  // Handle scroll events (navbar shadow and active links highlight)
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
      
      if (window.scrollY > 500) {
        setShowScrollTop(true)
      } else {
        setShowScrollTop(false)
      }

      // Track active section
      const sections = ['home', 'about', 'services', 'products', 'contact']
      const scrollPos = window.scrollY + 200

      for (const section of sections) {
        const el = document.getElementById(section)
        if (el) {
          const top = el.offsetTop
          const height = el.offsetHeight
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveNav(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Form submission handler
  const handleFormChange = (e) => {
    const { name, value } = e.target
    setFormState(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    setSubmitting(true)
    
    // Simulate API request
    setTimeout(() => {
      setSubmitting(false)
      setFormSubmitted(true)
      setFormState({
        name: '',
        email: '',
        phone: '',
        division: 'General Inquiry',
        message: ''
      })
    }, 1500)
  }

  // Quick navigation scroll function
  const scrollToSection = (id) => {
    setMobileMenuOpen(false)
    const el = document.getElementById(id)
    if (el) {
      const offset = 80 // Height of navbar
      const bodyRect = document.body.getBoundingClientRect().top
      const elementRect = el.getBoundingClientRect().top
      const elementPosition = elementRect - bodyRect
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  // Data Definitions
  const products = [
    // RO Purifiers
    {
      id: 'ro-1',
      name: 'AquaShield Elite Cabinet RO',
      category: 'ro',
      desc: 'Advanced multi-stage RO+UV+UF water purifier with alkaline pH correction. Perfect for domestic kitchens.',
      badge: 'Bestseller',
      specs: {
        'Filtration Capacity': '15 LPH',
        'Storage Volume': '8 Liters',
        'Stages': '8 Stage Pure filtration',
        'Warranty': '1 Year Comprehensive'
      }
    },
    {
      id: 'ro-2',
      name: 'HydroMax 250 LPH Industrial RO Plant',
      category: 'ro',
      desc: 'Robust high-capacity commercial RO water purification system with pre-treatment sand & carbon filters.',
      badge: 'Industrial',
      specs: {
        'Filtration Capacity': '250 LPH',
        'Membrane Brand': 'Dow Filmtec USA',
        'Frame Material': 'SS 304 Stainless steel',
        'Operating Power': 'Single Phase 2HP'
      }
    },
    {
      id: 'ro-3',
      name: 'Under-Sink Compact Alkaline Purifier',
      category: 'ro',
      desc: 'Space-saving sleek under-sink model featuring premium mineralizer cartridges and automatic flushing.',
      badge: 'Compact',
      specs: {
        'Filtration Capacity': '12 LPH',
        'Storage tank': '6L Hydrostatic steel',
        'Alkaline pH range': '7.5 - 8.5 pH',
        'Installation': 'Under-counter custom'
      }
    },
    // Fire Hydrants
    {
      id: 'fire-1',
      name: 'Cast Iron Single Outlet Hydrant Valve',
      category: 'fire',
      desc: 'Heavy-duty IS:5290 certified landing valve. Engineered to control high water pressure for emergency fire protection.',
      badge: 'Certified',
      specs: {
        'Standard': 'IS: 5290 Type A',
        'Material': 'Gunmetal / Cast Iron',
        'Inlet Flange': '75mm NB standard',
        'Test Pressure': '21 kgf/cm²'
      }
    },
    {
      id: 'fire-2',
      name: 'ABC Dry Powder Extinguisher (6kg)',
      category: 'fire',
      desc: 'High fire-rating multipurpose extinguisher, suitable for Class A (solid), B (liquid), and C (gas) fires.',
      badge: 'Refillable',
      specs: {
        'Capacity': '6 kg charge',
        'Agent': 'MAP 50% Dry Powder',
        'Discharge Time': 'Min 15 Seconds',
        'Range': '4 Meters minimum'
      }
    },
    {
      id: 'fire-3',
      name: 'Heavy Duty Hose Reel Cabinet System',
      category: 'fire',
      desc: 'Wall-mounted double door MS sheet enclosure containing a swinging hose reel with 30m canvas hose pipe.',
      badge: 'Safety Std',
      specs: {
        'Hose Length': '30 Meters',
        'Enclosure Size': '750 x 600 x 250 mm',
        'Hose Diameter': '20mm reinforced PVC',
        'Cabinet Coating': 'Red Powder Coated'
      }
    },
    // Anodizing / Powder Coating
    {
      id: 'chem-1',
      name: 'MetClean-80 Anodizing Degreaser',
      category: 'chemical',
      desc: 'Acidic liquid concentrate formulation designed to remove industrial grease, oils, and oxides from aluminium alloys.',
      badge: 'Industrial Clean',
      specs: {
        'Form': 'Slightly amber liquid',
        'Operating Temp': 'Room temperature',
        'Concentration': '5% to 10% volume',
        'Application': 'Dip and immersion tanks'
      }
    },
    {
      id: 'chem-2',
      name: 'Premium Polyester Powder Coating',
      category: 'chemical',
      desc: 'Thermosetting TGIC-free polyester powder offering excellent UV resistance and mechanical durability for outdoor items.',
      badge: 'Coating Materials',
      specs: {
        'Color Range': 'All RAL Shades',
        'Gloss Level': '90%+ Glossy or Matte',
        'Curing Schedule': '200°C for 10 minutes',
        'Coverage': '10-12 sq.m per kg'
      }
    },
    {
      id: 'chem-3',
      name: 'Electrostatic Corona Powder Spray Gun',
      category: 'chemical',
      desc: 'Advanced powder coating applicator gun with variable voltage control for uniform wrap and Faraday cage penetration.',
      badge: 'Equipment',
      specs: {
        'Voltage Output': '0 - 100 KV adjustable',
        'Gun Weight': '500 Grams (Ergonomic)',
        'Powder Feed Rate': 'Max 500 g/min',
        'Safety Rating': 'ATEX Zone 22 Certified'
      }
    }
  ]

  const filteredProducts = activeFilter === 'all' 
    ? products 
    : products.filter(p => p.category === activeFilter)

  return (
    <>
      {/* Intro Animation Screen */}
      {showIntro && (
        <div className={`intro-overlay ${isSlidingUp ? 'slide-up' : ''}`}>
          <div className="intro-content">
            {/* Elegant SVG mountain crest animation representing 'Shivalik' range */}
            <svg className="intro-logo-svg" viewBox="0 0 100 60">
              {/* Left small peak */}
              <path className="mountain-path" d="M10,50 L35,25 L50,40" />
              {/* Center giant peak */}
              <path className="mountain-path" d="M30,50 L55,10 L75,35" />
              {/* Right peak */}
              <path className="mountain-path" d="M60,50 L80,25 L90,38" />
              {/* Horizon / glowing stroke */}
              <path className="glow-line" d="M5,50 L95,50" />
            </svg>
            <div className="intro-title">
              <h1 className="intro-company-name">Shivalik Enterprises</h1>
              <p className="intro-tagline">Purity • Protection • Performance</p>
            </div>
          </div>
        </div>
      )}

      {/* Header / Navbar */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container navbar-container">
          <a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }} className="nav-brand">
            <div className="nav-brand-logo">
              <Settings size={20} className="logo-spin-hover" />
            </div>
            <span>SHIVALIK</span>
          </a>

          {/* Desktop Navigation Links */}
          <ul className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
            <li>
              <a 
                href="#home" 
                onClick={(e) => { e.preventDefault(); scrollToSection('home'); }} 
                className={`nav-link ${activeNav === 'home' ? 'active' : ''}`}
              >
                Home
              </a>
            </li>
            <li>
              <a 
                href="#about" 
                onClick={(e) => { e.preventDefault(); scrollToSection('about'); }} 
                className={`nav-link ${activeNav === 'about' ? 'active' : ''}`}
              >
                About Us
              </a>
            </li>
            <li>
              <a 
                href="#services" 
                onClick={(e) => { e.preventDefault(); scrollToSection('services'); }} 
                className={`nav-link ${activeNav === 'services' ? 'active' : ''}`}
              >
                Services
              </a>
            </li>
            <li>
              <a 
                href="#products" 
                onClick={(e) => { e.preventDefault(); scrollToSection('products'); }} 
                className={`nav-link ${activeNav === 'products' ? 'active' : ''}`}
              >
                Products
              </a>
            </li>
            <li>
              <a 
                href="#contact" 
                onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }} 
                className="nav-cta"
              >
                Get In Touch
              </a>
            </li>
          </ul>

          {/* Mobile Menu Toggle Button */}
          <button 
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header id="home" className="hero-sec">
        <div className="hero-glow-1"></div>
        <div className="hero-glow-2"></div>
        
        <div className="container hero-grid">
          <div className="hero-content">
            <div className="hero-tag">
              <Award size={16} /> <span>Trusted Industrial Engineering Partner</span>
            </div>
            <h1 className="hero-title">
              Engineering Quality,
              <span>Safety & Purity.</span>
            </h1>
            <p className="hero-desc">
              Shivalik Enterprises delivers top-tier water purification setups, 
              fire hydrant safety systems, and specialized anodizing chemicals 
              tailored for industrial and domestic operations.
            </p>
            <div className="hero-buttons">
              <button onClick={() => scrollToSection('contact')} className="btn btn-primary">
                Consult an Expert <ArrowRight size={18} />
              </button>
              <button onClick={() => scrollToSection('products')} className="btn btn-secondary">
                View Catalog
              </button>
            </div>
          </div>

          {/* Interactive Sectors Dashboard */}
          <div className="hero-dashboard">
            <div 
              className={`division-card ro-card ${activeFilter === 'ro' ? 'active' : ''}`}
              onClick={() => {
                setActiveFilter('ro');
                scrollToSection('products');
              }}
            >
              <div className="div-icon-wrapper">
                <Droplet size={24} />
              </div>
              <div className="div-info">
                <h3>Water Purification (RO)</h3>
                <p>Advanced RO systems sales, custom pipelines, and maintenance contracts.</p>
              </div>
              <ArrowRight size={18} className="div-arrow" />
            </div>

            <div 
              className={`division-card fire-card ${activeFilter === 'fire' ? 'active' : ''}`}
              onClick={() => {
                setActiveFilter('fire');
                scrollToSection('products');
              }}
            >
              <div className="div-icon-wrapper">
                <Flame size={24} />
              </div>
              <div className="div-info">
                <h3>Fire Hydrant Systems</h3>
                <p>Emergency hydrants setting, safety audits, and cylinder refilling.</p>
              </div>
              <ArrowRight size={18} className="div-arrow" />
            </div>

            <div 
              className={`division-card chem-card ${activeFilter === 'chemical' ? 'active' : ''}`}
              onClick={() => {
                setActiveFilter('chemical');
                scrollToSection('products');
              }}
            >
              <div className="div-icon-wrapper">
                <FlaskConical size={24} />
              </div>
              <div className="div-info">
                <h3>Anodizing & Coatings</h3>
                <p>Immersion chemicals, TGIC polyester powders, and spraying tools.</p>
              </div>
              <ArrowRight size={18} className="div-arrow" />
            </div>
          </div>
        </div>
      </header>

      {/* About Us Section */}
      <section id="about" className="section-padding">
        <div className="container">
          <div className="about-grid">
            <div className="about-text">
              <span className="section-subtitle">Since 2012</span>
              <h2 className="section-title">Serving Industries with Dedication and Precision</h2>
              <p className="about-lead">
                Shivalik Enterprises has established itself as a reliable cornerstone in safety, 
                sanitation, and manufacturing services. We cater to businesses that demand uncompromising standards.
              </p>
              <p>
                Whether it is guaranteeing pure, contaminant-free drinking water for your workforce, 
                architecting robust high-pressure fire containment grids, or supply-chaining 
                chemical compounds that coat the foundations of aluminium products, we deliver with precision.
              </p>
              <div className="about-stats">
                <div className="stat-item">
                  <div className="stat-num">12+</div>
                  <div className="stat-label">Years of Operation</div>
                </div>
                <div className="stat-item">
                  <div className="stat-num">100%</div>
                  <div className="stat-label">Safety Compliance</div>
                </div>
              </div>
            </div>

            <div className="about-visual">
              <div className="about-visual-glow"></div>
              <div className="core-pillars">
                <div className="pillar-item">
                  <ShieldCheck size={20} className="pillar-icon" />
                  <span className="pillar-text">Strict ISI and Standard Compliance</span>
                </div>
                <div className="pillar-item">
                  <HeartHandshake size={20} className="pillar-icon" />
                  <span className="pillar-text">24/7 Dedicated AMC Service Support</span>
                </div>
                <div className="pillar-item">
                  <Wrench size={20} className="pillar-icon" />
                  <span className="pillar-text">Customized Engineering Design & Setup</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="section-padding">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Core Offerings</span>
            <h2 className="section-title">Specialized Services We Provide</h2>
            <p>Our experienced technicians ensure your systems are installed securely, certified properly, and maintained for continuous uptime.</p>
          </div>

          <div className="services-grid">
            {/* Service 1: RO Purifier Services */}
            <div className="service-card ro-service">
              <div className="service-icon-wrapper">
                <Droplet size={32} />
              </div>
              <h3 className="service-title">RO Purifier Setup & Maintenance</h3>
              <p className="service-desc">
                From high-capacity industrial multi-membrane filters to residential under-sink models, 
                we handle end-to-end installation and maintenance with absolute compliance.
              </p>
              <ul className="service-list">
                <li className="service-list-item">
                  <CheckCircle2 size={16} />
                  <span>Custom commercial layout designing & pipeline plumbing</span>
                </li>
                <li className="service-list-item">
                  <CheckCircle2 size={16} />
                  <span>Annual Maintenance Contracts (AMC) with quarterly audits</span>
                </li>
                <li className="service-list-item">
                  <CheckCircle2 size={16} />
                  <span>Chemical cleaning of membranes & booster pump calibrations</span>
                </li>
                <li className="service-list-item">
                  <CheckCircle2 size={16} />
                  <span>Total Dissolved Solids (TDS) and mineral testing services</span>
                </li>
              </ul>
            </div>

            {/* Service 2: Fire Hydrant Services */}
            <div className="service-card fire-service">
              <div className="service-icon-wrapper">
                <Flame size={32} />
              </div>
              <h3 className="service-title">Fire Hydrant Selling & Refilling</h3>
              <p className="service-desc">
                Constructing fire protection systems and servicing safety infrastructure. 
                We keep your workspaces fully prepared for code compliance audits.
              </p>
              <ul className="service-list">
                <li className="service-list-item">
                  <CheckCircle2 size={16} />
                  <span>Laying structural wet-riser pipelines & hydrant valves</span>
                </li>
                <li className="service-list-item">
                  <CheckCircle2 size={16} />
                  <span>Extinguisher refilling services (Dry powder, CO2, Foam, Water)</span>
                </li>
                <li className="service-list-item">
                  <CheckCircle2 size={16} />
                  <span>Hydrostatic pressure testing of cylinders & canvas hoses</span>
                </li>
                <li className="service-list-item">
                  <CheckCircle2 size={16} />
                  <span>Safety signages, fire alarms, and smoke detector calibration</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Products Showcase Section */}
      <section id="products" className="section-padding">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Catalog Directory</span>
            <h2 className="section-title">High Performance Engineering Products</h2>
            <p>Select a category below to explore the specifications of the premium machinery and chemical materials we supply.</p>
          </div>

          {/* Filter Navigation */}
          <div className="products-filter">
            <button 
              className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              All Divisions
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'ro' ? 'active ro-active' : ''}`}
              onClick={() => setActiveFilter('ro')}
            >
              💧 Water Purification
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'fire' ? 'active fire-active' : ''}`}
              onClick={() => setActiveFilter('fire')}
            >
              🔥 Fire Safety
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'chemical' ? 'active chem-active' : ''}`}
              onClick={() => setActiveFilter('chemical')}
            >
              🧪 Anodizing & Coatings
            </button>
          </div>

          {/* Products Grid */}
          <div className="products-grid">
            {filteredProducts.map((p) => (
              <div key={p.id} className={`product-card ${p.category === 'ro' ? 'ro-p' : p.category === 'fire' ? 'fire-p' : 'chem-p'}`}>
                <div className="product-visual-box">
                  <span className="product-badge">{p.badge}</span>
                  <div className="product-icon-display">
                    {p.category === 'ro' && <Droplet size={64} color="var(--color-ro)" />}
                    {p.category === 'fire' && <Flame size={64} color="var(--color-fire)" />}
                    {p.category === 'chemical' && <FlaskConical size={64} color="var(--color-chemical)" />}
                  </div>
                </div>
                <div className="product-content">
                  <h3 className="product-name">{p.name}</h3>
                  <p className="product-desc">{p.desc}</p>
                  
                  <div className="product-specs">
                    {Object.entries(p.specs).map(([label, val]) => (
                      <div key={label} className="spec-line">
                        <span className="spec-label">{label}</span>
                        <span className="spec-val">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-padding">
        <div className="container">
          <div className="contact-grid">
            
            {/* Left Column: Direct channels info */}
            <div className="contact-info">
              <div>
                <span className="section-subtitle">Get In Touch</span>
                <h2 className="section-title">Ready to secure your business layout?</h2>
                <p>Fill out the inquiry form, or connect with our sales desk directly via our channels below.</p>
              </div>

              <div className="contact-channels">
                <div className="channel-card">
                  <div className="channel-icon">
                    <Phone size={20} />
                  </div>
                  <div className="channel-detail">
                    <h4>Direct Phone Support</h4>
                    <p>+91 98765 43210</p>
                    <p>+91 87654 32109</p>
                  </div>
                </div>

                <div className="channel-card">
                  <div className="channel-icon">
                    <Mail size={20} />
                  </div>
                  <div className="channel-detail">
                    <h4>Email Correspondence</h4>
                    <p>info@shivalikenterprises.com</p>
                    <p>sales@shivalikenterprises.com</p>
                  </div>
                </div>

                <div className="channel-card">
                  <div className="channel-icon">
                    <MapPin size={20} />
                  </div>
                  <div className="channel-detail">
                    <h4>Corporate Office</h4>
                    <p>Sector-4, Industrial Area, Shivalik Complex,</p>
                    <p>New Delhi, Delhi - 110001, India</p>
                  </div>
                </div>

                <div className="channel-card">
                  <div className="channel-icon">
                    <Clock size={20} />
                  </div>
                  <div className="channel-detail">
                    <h4>Working Hours</h4>
                    <p>Monday - Saturday: 09:00 AM - 06:00 PM</p>
                    <p>Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Contact Form wrapper */}
            <div className="contact-form-wrapper">
              {!formSubmitted ? (
                <form onSubmit={handleFormSubmit}>
                  <h3 className="form-title">Send a Message</h3>
                  <p className="form-desc">Our division engineer will reply with a detailed project estimate proposal within 24 hours.</p>
                  
                  <div className="form-grid">
                    <div className="form-group">
                      <label htmlFor="name" className="form-label">Full Name</label>
                      <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        value={formState.name} 
                        onChange={handleFormChange}
                        placeholder="e.g. John Doe" 
                        required 
                        className="form-input"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="email" className="form-label">Email Address</label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        value={formState.email} 
                        onChange={handleFormChange}
                        placeholder="e.g. john@company.com" 
                        required 
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="phone" className="form-label">Phone Number</label>
                      <input 
                        type="tel" 
                        id="phone" 
                        name="phone" 
                        value={formState.phone} 
                        onChange={handleFormChange}
                        placeholder="e.g. +91 99999 88888" 
                        required 
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="division" className="form-label">Inquiry Division</label>
                      <select 
                        id="division" 
                        name="division" 
                        value={formState.division} 
                        onChange={handleFormChange}
                        className="form-select"
                      >
                        <option value="General Inquiry">General Corporate Inquiry</option>
                        <option value="Water Purification">Water Purification (RO)</option>
                        <option value="Fire Hydrant">Fire Safety & Hydrant</option>
                        <option value="Anodizing Coatings">Anodizing / Powder Coating</option>
                      </select>
                    </div>

                    <div className="form-group form-full">
                      <label htmlFor="message" className="form-label">Project Details / Message</label>
                      <textarea 
                        id="message" 
                        name="message" 
                        value={formState.message} 
                        onChange={handleFormChange}
                        placeholder="Provide details about your project specifications or maintenance schedule requirements..." 
                        required 
                        className="form-textarea"
                      />
                    </div>

                    <div className="form-full">
                      <button 
                        type="submit" 
                        disabled={submitting} 
                        className="submit-btn"
                      >
                        {submitting ? 'Sending Request...' : 'Send Message Request'}
                        {!submitting && <Send size={16} />}
                      </button>
                    </div>
                  </div>
                </form>
              ) : (
                <div className="success-state">
                  <div className="success-icon">
                    <CheckCircle2 size={36} />
                  </div>
                  <div>
                    <h3>Thank you for reaching out!</h3>
                    <p style={{ marginTop: '0.5rem' }}>Your message has been sent successfully. One of our engineers from the corresponding division will call you shortly.</p>
                  </div>
                  <button 
                    onClick={() => setFormSubmitted(false)} 
                    className="btn btn-secondary" 
                    style={{ marginTop: '1rem', width: 'fit-content' }}
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container footer-container">
          <div className="footer-logo">
            <div className="footer-logo-box">
              <Settings size={14} />
            </div>
            <span>SHIVALIK ENTERPRISES</span>
          </div>
          
          <div className="footer-copy">
            &copy; {new Date().getFullYear()} Shivalik Enterprises. All rights reserved.
          </div>

          <div className="footer-links">
            <a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }} className="footer-link">Home</a>
            <a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }} className="footer-link">About</a>
            <a href="#services" onClick={(e) => { e.preventDefault(); scrollToSection('services'); }} className="footer-link">Services</a>
            <a href="#products" onClick={(e) => { e.preventDefault(); scrollToSection('products'); }} className="footer-link">Products</a>
          </div>
        </div>
      </footer>

      {/* Floating Scroll to Top button */}
      {showScrollTop && (
        <button 
          className="btn btn-primary"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            padding: '0.75rem',
            borderRadius: '50%',
            zIndex: 90,
            boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          aria-label="Scroll back to top"
        >
          <ChevronUp size={20} />
        </button>
      )}
    </>
  )
}

export default App
