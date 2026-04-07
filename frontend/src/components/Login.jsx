import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
   
    let endpoint = isLogin ? "/api/user/login" : "/api/user/register";
    
    
    if (isLogin && formData.email === "admin@yumdash.com") {
      endpoint = "/api/admin/login";
    }

   
    const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
    const url = `${API_BASE_URL}${endpoint}`;

    console.log("Connecting to:", url); 

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("token", data.token);

        if (formData.email === "admin@yumdash.com") {
          alert("Admin Login Success! ");
          navigate("/admin"); 
        } else {
          localStorage.setItem("user", JSON.stringify(data.user));
          alert(isLogin ? "Login Success! " : "Registration Success! ");
          navigate("/");
        }
        
        
        window.location.reload(); 
      } else {
        alert(data.message || "Error occurred");
      }
    } catch (error) {
      console.error("Auth Error:", error);
     
      alert("Connection Error! Please check if your backend is running or VITE_API_URL is correct.");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 dark:bg-slate-950 px-4 transition-colors duration-300">
      <div className="max-w-md w-full bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-xl border border-gray-100 dark:border-slate-800">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-2 italic">
            Yum<span className="text-orange-500">Dash</span>
          </h2>
          <h2 className="text-xl font-bold text-gray-700 dark:text-slate-300">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h2>
          <p className="text-gray-500 dark:text-slate-400 text-sm">Please enter your details</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="relative">
              <User className="absolute left-4 top-4 text-gray-400" size={20} />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white outline-none focus:ring-2 ring-orange-500 transition-all"
              />
            </div>
          )}

          <div className="relative">
            <Mail className="absolute left-4 top-4 text-gray-400" size={20} />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white outline-none focus:ring-2 ring-orange-500 transition-all"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-4 text-gray-400" size={20} />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white outline-none focus:ring-2 ring-orange-500 transition-all"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gray-900 dark:bg-orange-500 text-white py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-lg active:scale-95"
          >
            {isLogin ? "Login" : "Sign Up"} <ArrowRight size={20} />
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600 dark:text-slate-400">
            {isLogin ? "New to YumDash?" : "Already have an account?"}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="ml-2 text-orange-500 font-bold hover:underline"
            >
              {isLogin ? "Create one" : "Login here"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;