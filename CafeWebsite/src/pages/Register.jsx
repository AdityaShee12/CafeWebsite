import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../api';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      toast.warning('Please fill in all fields');
      return;
    }
    
    setLoading(true);
    try {
      const { data } = await api.post("/auth/register", form);
      login(data.data);
      toast.success('Registration successful!');
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to register');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  return (
    <div className="min-h-screen bg-[#0F0802] text-[#F5EDD6] py-20 px-6 flex flex-col justify-center items-center">
      <div className="w-full max-w-md bg-white/[0.02] border border-[#D4AF5A]/15 rounded-xl p-8 shadow-2xl">
        <div className="text-center mb-10">
          <Link to="/" className="inline-block mb-4 no-underline font-playfair text-[#D4AF5A] text-2xl font-bold tracking-wider">☕ Aroma</Link>
          <h1 className="font-playfair text-[#F5EDD6] text-3xl font-bold mb-2">Create Account</h1>
          <p className="font-outfit text-[#F5EDD6]/50 text-sm font-light">Join us for exclusive offers and easy booking</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="font-outfit text-[0.68rem] font-medium tracking-[0.14em] uppercase text-[#D4AF5A]/80">Full Name</label>
            <input type="text" name="name" value={form.name} onChange={handleChange} className="res-input" placeholder="Enter your name" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-outfit text-[0.68rem] font-medium tracking-[0.14em] uppercase text-[#D4AF5A]/80">Email Address</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} className="res-input" placeholder="Enter your email" />
          </div>
          <div className="flex flex-col gap-2 mb-2">
            <label className="font-outfit text-[0.68rem] font-medium tracking-[0.14em] uppercase text-[#D4AF5A]/80">Password</label>
            <input type="password" name="password" value={form.password} onChange={handleChange} className="res-input" placeholder="Create a password" />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 px-8 py-3.5 bg-[#D4AF5A] text-[#0F0802] font-outfit text-[0.75rem] font-semibold tracking-widest uppercase rounded-sm transition-transform duration-300 hover:-translate-y-1 shadow-[0_8px_30px_rgba(212,175,90,0.25)] disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? 'Registering...' : 'Create Account'}
          </button>
        </form>

        <p className="mt-8 text-center font-outfit text-sm text-[#F5EDD6]/50">
          Already have an account? <Link to="/login" className="text-[#D4AF5A] hover:underline transition-all">Sign in here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
