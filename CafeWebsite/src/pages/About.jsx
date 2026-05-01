import React from 'react';
import { motion } from 'framer-motion';
import './About.css';
import baristaImg from '../assets/images/barista_pouring_1777620502161.png';
import heroBg from '../assets/images/hero_cafe_interior_1777620297871.png';

const About = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } }
  };

  return (
    <div className="page-wrapper about-page">
      <div className="container">
        
        <motion.div 
          className="page-header"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <span className="section-subtitle">Our Heritage</span>
          <h1 className="page-title">The Story of Aurora</h1>
          <p className="page-subtitle">
            Founded with a passion for exceptional coffee and artisanal baking, Aurora Cafe is a sanctuary for those who appreciate the finer things in life.
          </p>
        </motion.div>

        <div className="about-content">
          <motion.div 
            className="about-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
            }}
          >
            {/* Story 1 */}
            <motion.div className="about-text-block glass p-8" variants={fadeInUp}>
              <h3 className="text-gold mb-4 text-2xl font-heading">Ethically Sourced</h3>
              <p className="text-beige font-light leading-relaxed">
                We believe that great coffee starts at the source. Our beans are carefully selected from sustainable, single-origin farms across the globe. We build direct relationships with farmers to ensure fair trade practices and the highest quality beans.
              </p>
            </motion.div>

            {/* Story 2 */}
            <motion.div className="about-image-block" variants={fadeInUp}>
              <img src={baristaImg} alt="Our Barista" className="rounded shadow-lg" />
            </motion.div>

            {/* Story 3 */}
            <motion.div className="about-image-block" variants={fadeInUp}>
              <img src={heroBg} alt="Cafe Interior" className="rounded shadow-lg" />
            </motion.div>

            {/* Story 4 */}
            <motion.div className="about-text-block glass p-8" variants={fadeInUp}>
              <h3 className="text-gold mb-4 text-2xl font-heading">Artisanal Craftsmanship</h3>
              <p className="text-beige font-light leading-relaxed">
                Every cup we pour and every pastry we bake is a testament to our dedication. Our master baristas and pastry chefs undergo rigorous training to perfect their craft, ensuring that every visit to Aurora is a memorable culinary experience.
              </p>
            </motion.div>
          </motion.div>
        </div>

      </div>
    </div>
  );
};

export default About;
