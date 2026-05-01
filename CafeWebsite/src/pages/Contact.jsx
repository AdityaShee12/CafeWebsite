import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { FiMapPin, FiPhone, FiMail } from 'react-icons/fi';
import api from '../api';
import './Contact.css';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const missingFields = [];
    if (!form.name) missingFields.push('name');
    if (!form.email) missingFields.push('email');
    if (!form.message) missingFields.push('message');

    if (missingFields.length > 0) {
      toast.error(`Please enter ${missingFields.length} missing input(s): ${missingFields.join(', ')}`);
      return;
    }
    
    setLoading(true);
    try {
      await api.post('/contact', form);
      toast.success('Message sent successfully! We will get back to you soon.');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="page-wrapper contact-page">
      <div className="container">
        <motion.div 
          className="page-header"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <span className="section-subtitle">Get In Touch</span>
          <h1 className="page-title">We'd Love to <span className="text-gold">Hear from You</span></h1>
          <p className="page-subtitle">
            Whether you have a question about our menu, need to book a private event, or just want to say hello, our team is here to help.
          </p>
        </motion.div>

        <div className="contact-grid">
          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="contact-info-wrapper"
          >
            <div className="contact-info-block">
              <h3>Our Information</h3>
              <div className="info-item">
                <div className="icon-box"><FiMapPin /></div>
                <div>
                  <h4>Address</h4>
                  <p>Subhas Pally, Nangi Station Road<br/>Kolkata - 700140</p>
                </div>
              </div>
              
              <div className="info-item">
                <div className="icon-box"><FiPhone /></div>
                <div>
                  <h4>Phone</h4>
                  <p>+91 8910384698</p>
                </div>
              </div>

              <div className="info-item">
                <div className="icon-box"><FiMail /></div>
                <div>
                  <h4>Email</h4>
                  <p>hello@auroracafe.com</p>
                </div>
              </div>
            </div>

            <div className="hours-block glass">
              <h3>Opening Hours</h3>
              <ul>
                <li><span>Monday - Friday</span> <span>8:00 AM - 10:00 PM</span></li>
                <li><span>Saturday</span> <span>8:00 AM - 11:00 PM</span></li>
                <li className="text-gold"><span>Sunday</span> <span>9:00 AM - 11:00 PM</span></li>
              </ul>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="contact-form-wrapper glass"
          >
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row-contact">
                <div className="form-group">
                  <label>Your Name *</label>
                  <input type="text" name="name" value={form.name} onChange={handleChange} className="input-field" placeholder="John Doe" />
                </div>
                <div className="form-group">
                  <label>Email Address *</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange} className="input-field" placeholder="john@example.com" />
                </div>
              </div>
              <div className="form-group">
                <label>Subject *</label>
                <input type="text" name="subject" value={form.subject} onChange={handleChange} className="input-field" placeholder="How can we help you?" />
              </div>
              <div className="form-group">
                <label>Message *</label>
                <textarea name="message" value={form.message} onChange={handleChange} className="input-field textarea-field" placeholder="Write your message here..." />
              </div>
              <button 
                type="submit" 
                disabled={loading}
                className="btn btn-primary submit-btn"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
