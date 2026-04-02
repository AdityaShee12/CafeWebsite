import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import api from '../api';

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

  return (
    <div className="min-h-screen bg-[#0F0802] text-[#F5EDD6] py-20 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-px bg-[#D4AF5A]" />
            <span className="text-[#D4AF5A] font-outfit text-xs font-medium tracking-[.22em] uppercase">Get In Touch</span>
            <span className="w-8 h-px bg-[#D4AF5A]" />
          </div>
          <h1 className="font-playfair text-[#F5EDD6] text-4xl md:text-5xl font-bold mb-4">
            We'd Love to <em className="text-[#D4AF5A] not-italic">Hear from You</em>
          </h1>
          <p className="font-outfit text-[#F5EDD6]/50 max-w-2xl mx-auto text-sm md:text-base font-light">
            Whether you have a question about our menu, need to book a private event, or just want to say hello, our team is here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-10"
          >
            <div>
              <h3 className="font-playfair text-[1.6rem] text-[#F5EDD6] mb-6 border-b border-[#D4AF5A]/20 pb-4">Our Information</h3>
              <div className="flex flex-col gap-6 font-outfit font-light text-[#F5EDD6]/60">
                <div className="flex items-start gap-4">
                  <div className="bg-[#D4AF5A]/10 p-3 rounded-md text-[#D4AF5A]">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                  </div>
                  <div>
                    <h4 className="text-[#D4AF5A] font-medium tracking-wide uppercase text-xs mb-1">Address</h4>
                    <p className="text-sm leading-relaxed">Subhas Pally, Nangi Station Road<br/>Kolkata - 700140</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-[#D4AF5A]/10 p-3 rounded-md text-[#D4AF5A]">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  </div>
                  <div>
                    <h4 className="text-[#D4AF5A] font-medium tracking-wide uppercase text-xs mb-1">Phone</h4>
                    <p className="text-sm">8910384698</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-[#D4AF5A]/10 p-3 rounded-md text-[#D4AF5A]">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                  </div>
                  <div>
                    <h4 className="text-[#D4AF5A] font-medium tracking-wide uppercase text-xs mb-1">Email</h4>
                    <p className="text-sm">sheeaditya12@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#1A0D03] p-8 rounded-xl border border-[#D4AF5A]/10">
              <h4 className="font-playfair text-[#D4AF5A] text-xl mb-4">Opening Hours</h4>
              <ul className="space-y-2 font-outfit text-sm font-light text-[#F5EDD6]/60">
                <li className="flex justify-between border-b border-white/5 pb-2"><span>Monday - Friday</span> <span>8:00 AM - 10:00 PM</span></li>
                <li className="flex justify-between border-b border-white/5 pb-2"><span>Saturday</span> <span>8:00 AM - 11:00 PM</span></li>
                <li className="flex justify-between pt-1 text-[#D4AF5A]"><span>Sunday</span> <span>9:00 AM - 11:00 PM</span></li>
              </ul>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white/[0.02] border border-[#D4AF5A]/15 rounded-xl p-8"
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="font-outfit text-[0.68rem] font-medium tracking-[0.14em] uppercase text-[#D4AF5A]/80">Your Name *</label>
                  <input type="text" name="name" value={form.name} onChange={handleChange} className="res-input" placeholder="John Doe" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-outfit text-[0.68rem] font-medium tracking-[0.14em] uppercase text-[#D4AF5A]/80">Email Address *</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange} className="res-input" placeholder="john@example.com" />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-outfit text-[0.68rem] font-medium tracking-[0.14em] uppercase text-[#D4AF5A]/80">Subject *</label>
                <input type="text" name="subject" value={form.subject} onChange={handleChange} className="res-input" placeholder="How can we help you?" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-outfit text-[0.68rem] font-medium tracking-[0.14em] uppercase text-[#D4AF5A]/80">Message *</label>
                <textarea name="message" value={form.message} onChange={handleChange} className="res-input resize-y min-h-[140px]" placeholder="Write your message here..." />
              </div>
              <button 
                type="submit" 
                disabled={loading}
                className="mt-2 flex items-center justify-center gap-3 px-8 py-4 bg-[#D4AF5A] text-[#0F0802] font-outfit text-[0.75rem] font-semibold tracking-widest uppercase rounded-sm transition-transform duration-300 hover:-translate-y-1 shadow-[0_8px_30px_rgba(212,175,90,0.25)] disabled:opacity-70 disabled:cursor-not-allowed"
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
