import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import api from '../api';
import './Auth.css';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', form);
      toast.success("Registration successful! You can now log in.");
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    }
  };

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  return (
    <div className="auth-page">
      <div className="auth-overlay"></div>
      <div className="container auth-container">
        <motion.div 
          className="auth-box glass"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="auth-header">
            <h2>Create Account</h2>
            <p>Join the Aurora Cafe community today.</p>
          </div>
          
          <form onSubmit={handleRegister} className="auth-form">
            <div className="form-group">
              <label>Full Name</label>
              <input 
                type="text" 
                name="name" 
                value={form.name} 
                onChange={handleChange} 
                className="input-field" 
                placeholder="John Doe"
                required 
              />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input 
                type="email" 
                name="email" 
                value={form.email} 
                onChange={handleChange} 
                className="input-field" 
                placeholder="hello@example.com"
                required 
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input 
                type="password" 
                name="password" 
                value={form.password} 
                onChange={handleChange} 
                className="input-field" 
                placeholder="••••••••"
                required 
              />
            </div>
            
            <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
          </form>
          
          <div className="auth-footer">
            <p>Already have an account? <Link to="/login" className="text-gold">Sign in here</Link></p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
