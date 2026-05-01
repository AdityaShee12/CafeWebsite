import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiStar } from 'react-icons/fi';
import './Home.css';

// Import assets dynamically or use relative paths since Vite supports standard imports
import heroBg from '../assets/images/hero_cafe_interior_1777620297871.png';
import coffeeImg from '../assets/images/cappuccino_latte_art_1777620407067.png';
import pastryImg from '../assets/images/artisan_pastry_1777620468158.png';
import baristaImg from '../assets/images/barista_pouring_1777620502161.png';

const Home = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-bg">
          <img src={heroBg} alt="Luxury Cafe Interior" />
          <div className="hero-overlay"></div>
        </div>
        <div className="container hero-content">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h1 className="hero-title">
              Crafting Moments of <br /> <span className="text-gold">Pure Elegance</span>
            </h1>
            <p className="hero-subtitle">
              Experience artisanal coffee and exquisite pastries in a setting designed for true connoisseurs.
            </p>
            <div className="hero-actions">
              <a href="#menu" className="btn btn-primary">Discover Menu</a>
              <a href="#reservation" className="btn btn-outline">Reserve a Table</a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Menu Section */}
      <section id="menu" className="menu-section section-padding">
        <div className="container">
          <motion.div 
            className="section-header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <span className="section-subtitle">Our Selection</span>
            <h2 className="section-title">Artisan Offerings</h2>
          </motion.div>

          <motion.div 
            className="menu-grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {/* Menu Item 1 */}
            <motion.div className="menu-card glass" variants={fadeInUp}>
              <div className="menu-card-img">
                <img src={coffeeImg} alt="Signature Cappuccino" />
              </div>
              <div className="menu-card-content">
                <h3>Signature Cappuccino</h3>
                <p>Rich espresso blended with velvety microfoam, finished with intricate latte art.</p>
                <div className="menu-card-footer">
                  <span className="price">$6.50</span>
                  <button className="btn-icon" aria-label="Order"><FiArrowRight /></button>
                </div>
              </div>
            </motion.div>

            {/* Menu Item 2 */}
            <motion.div className="menu-card glass" variants={fadeInUp}>
              <div className="menu-card-img">
                <img src={pastryImg} alt="Almond Croissant" />
              </div>
              <div className="menu-card-content">
                <h3>Almond Croissant</h3>
                <p>Flaky, buttery pastry filled with rich almond frangipane and dusted with powdered sugar.</p>
                <div className="menu-card-footer">
                  <span className="price">$5.00</span>
                  <button className="btn-icon" aria-label="Order"><FiArrowRight /></button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Experience Section (Text + Image Split) */}
      <section className="experience-section section-padding bg-espresso">
        <div className="container experience-container">
          <motion.div 
            className="experience-text"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <span className="section-subtitle">The Aurora Experience</span>
            <h2 className="section-title">Mastery in Every Pour</h2>
            <p>
              Our award-winning baristas treat coffee preparation as an art form. 
              Sourced from sustainable, single-origin farms globally, our beans are roasted 
              in-house to bring out their unique, nuanced flavor profiles.
            </p>
            <a href="/about" className="btn btn-outline" style={{ marginTop: '2rem' }}>Our Story</a>
          </motion.div>
          
          <motion.div 
            className="experience-image-wrapper"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <img src={baristaImg} alt="Barista pouring coffee" className="experience-image" />
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section section-padding">
        <div className="container">
          <motion.div 
            className="section-header text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <span className="section-subtitle text-center mx-auto">Social Proof</span>
            <h2 className="section-title">Words of Praise</h2>
          </motion.div>

          <motion.div 
            className="testimonial-grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { text: "The most exquisite cappuccino I've ever had. The ambiance feels like a luxury lounge.", author: "Eleanor R." },
              { text: "A stunning environment matched only by their incredible almond croissants. A true gem.", author: "James M." },
              { text: "The perfect place for my morning ritual. Impeccable service and sophisticated design.", author: "Sophia T." }
            ].map((t, i) => (
              <motion.div key={i} className="testimonial-card glass" variants={fadeInUp}>
                <div className="stars text-gold">
                  <FiStar /><FiStar /><FiStar /><FiStar /><FiStar />
                </div>
                <p className="testimonial-text">"{t.text}"</p>
                <p className="testimonial-author">— {t.author}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA / Reservation Section */}
      <section id="reservation" className="cta-section section-padding bg-black">
        <div className="container">
          <motion.div 
            className="cta-box glass"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="cta-content">
              <h2>Join Us for an Unforgettable Visit</h2>
              <p>Reserve a table for your next meeting, date, or quiet afternoon.</p>
            </div>
            <form className="reservation-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-row">
                <input type="text" className="input-field" placeholder="Name" required />
                <input type="email" className="input-field" placeholder="Email" required />
              </div>
              <div className="form-row">
                <input type="date" className="input-field" required />
                <select className="input-field" required>
                  <option value="" disabled selected>Guests</option>
                  <option value="1">1 Person</option>
                  <option value="2">2 People</option>
                  <option value="3">3 People</option>
                  <option value="4+">4+ People</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                Confirm Reservation
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
