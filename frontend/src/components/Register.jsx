import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, User, Mail, Lock, ArrowRight } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch(`${API_BASE_URL}/api/user/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (data.success) {
        alert("Registration Successful!");
        navigate('/login');
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      setError('Connection error. Is backend running?');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] p-10 shadow-2xl border border-slate-100">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-500 rounded-2xl mb-4 shadow-lg transform rotate-6">
            <UserPlus className="text-white w-8 h-8" />
          </div>
          <h2 className="text-3xl font-black text-slate-900">Create Account</h2>
        </div>

        {error && <div className="bg-rose-50 text-rose-600 p-3 rounded-xl text-sm font-bold mb-5 border border-rose-100">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <User className="absolute left-4 top-4 text-slate-300 w-5 h-5" />
            <input type="text" required placeholder="Full Name" 
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 py-4 outline-none focus:border-orange-500 transition-all"
              onChange={e => setFormData({...formData, name: e.target.value})} />
          </div>
          <div className="relative">
            <Mail className="absolute left-4 top-4 text-slate-300 w-5 h-5" />
            <input type="email" required placeholder="Email Address" 
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 py-4 outline-none focus:border-orange-500 transition-all"
              onChange={e => setFormData({...formData, email: e.target.value})} />
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-4 text-slate-300 w-5 h-5" />
            <input type="password" required placeholder="Password" 
              autoComplete="new-password"
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 py-4 outline-none focus:border-orange-500 transition-all"
              onChange={e => setFormData({...formData, password: e.target.value})} />
          </div>
          <button disabled={isLoading} className="w-full bg-orange-500 text-white py-4 rounded-2xl font-black text-lg hover:bg-orange-600 transition-all flex items-center justify-center gap-2">
            {isLoading ? "Signing up..." : "Sign Up"} <ArrowRight className="w-5 h-5" />
          </button>
        </form>
        <p className="mt-8 text-center text-slate-500 font-medium">Already have an account? <Link to="/login" className="text-orange-500 font-black">Login</Link></p>
      </div>
    </div>
  );
};

export default Register;