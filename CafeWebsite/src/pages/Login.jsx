import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import api from '../api';
import './Auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/auth/login', { email, password });
      toast.success("Welcome back!");
      // Logic for context/state update here
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    }
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
            <h2>Welcome Back</h2>
            <p>Enter your details to access your account.</p>
          </div>
          
          <form onSubmit={handleLogin} className="auth-form">
            <div className="form-group">
              <label>Email Address</label>
              <input 
                type="email" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                className="input-field" 
                placeholder="hello@example.com"
                required 
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input 
                type="password" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                className="input-field" 
                placeholder="••••••••"
                required 
              />
            </div>
            
            <button type="submit" className="btn btn-primary btn-block">Sign In</button>
          </form>
          
          <div className="auth-footer">
            <p>Don't have an account? <Link to="/register" className="text-gold">Sign up here</Link></p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
