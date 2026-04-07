import React, { useState, useContext } from 'react';
import { Mail, Phone, MapPin, Send, Clock, Globe } from 'lucide-react';
import { StoreContext } from '../context/StoreContext'; // StoreContext-ஐ இம்போர்ட் செய்யவும்

const Contact = () => {
  const { url } = useContext(StoreContext); // Context-ல் இருந்து URL-ஐ எடுக்கவும்
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // localhost-க்கு பதிலாக url வேரியபிளைப் பயன்படுத்தவும்
      const res = await fetch(`${url}/api/messages/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (data.success) {
        alert("✅ " + data.message);
        setFormData({ name: '', email: '', message: '' });
      } else {
        alert("❌ " + data.message);
      }
    } catch (err) {
      alert("Server connection error! Please check your backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-orange-500 font-bold tracking-widest uppercase mb-2">Get in Touch</h2>
          <h1 className="text-4xl md:text-5xl font-black text-slate-800 dark:text-white mb-4">
            We're here to help you!
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            If you have any questions or concerns, feel free to reach out to us. We're here to listen to your feedback.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Left Side: Contact Info */}
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Call Us */}
              <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-800 hover:border-orange-200 transition">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 text-orange-600 rounded-2xl flex items-center justify-center mb-4">
                  <Phone size={24} />
                </div>
                <h3 className="font-bold text-xl dark:text-white">Call Us</h3>
                <p className="text-gray-500">+91 98765 43210</p>
                <p className="text-gray-500">044 1234 5678</p>
              </div>

              {/* Email Us */}
              <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-800 hover:border-orange-200 transition">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-2xl flex items-center justify-center mb-4">
                  <Mail size={24} />
                </div>
                <h3 className="font-bold text-xl dark:text-white">Email Us</h3>
                <p className="text-gray-500 text-sm">support@yumdash.com</p>
                <p className="text-gray-500 text-sm">hello@yumdash.com</p>
              </div>

              {/* Location */}
              <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-800 hover:border-orange-200 transition">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-2xl flex items-center justify-center mb-4">
                  <MapPin size={24} />
                </div>
                <h3 className="font-bold text-xl dark:text-white">Visit Us</h3>
                <p className="text-gray-500">123, Foodie Street,</p>
                <p className="text-gray-500">Anna Nagar, Chennai.</p>
              </div>

              {/* Working Hours */}
              <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-800 hover:border-orange-200 transition">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded-2xl flex items-center justify-center mb-4">
                  <Clock size={24} />
                </div>
                <h3 className="font-bold text-xl dark:text-white">Working Hours</h3>
                <p className="text-gray-500">Mon - Sun</p>
                <p className="text-gray-500 text-sm">10:00 AM - 11:00 PM</p>
              </div>
            </div>

            {/* Banner Section */}
            <div className="bg-orange-500 rounded-[40px] p-8 text-white relative overflow-hidden">
               <div className="relative z-10">
                 <h3 className="text-2xl font-bold mb-2">Fastest Delivery in Chennai!</h3>
                 <p className="opacity-90">We deliver your favorite food in the fastest time!</p>
               </div>
               <Globe size={150} className="absolute -right-10 -bottom-10 opacity-20" />
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <div className="bg-white dark:bg-slate-900 p-8 md:p-12 rounded-[40px] shadow-2xl border border-gray-50 dark:border-slate-800">
            <h3 className="text-3xl font-bold mb-8 dark:text-white">Send a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-600 dark:text-gray-400 ml-2">Name</label>
                <input 
                  type="text" 
                  placeholder="Enter your name" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full p-4 rounded-2xl border border-gray-200 dark:bg-slate-800 dark:border-slate-700 dark:text-white outline-none focus:ring-2 ring-orange-500/50 transition-all" 
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-600 dark:text-gray-400 ml-2">Email Address</label>
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  required
                  autoComplete="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full p-4 rounded-2xl border border-gray-200 dark:bg-slate-800 dark:border-slate-700 dark:text-white outline-none focus:ring-2 ring-orange-500/50 transition-all" 
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-600 dark:text-gray-400 ml-2">Message</label>
                <textarea 
                  placeholder="How can we help you today?" 
                  rows="4" 
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full p-4 rounded-2xl border border-gray-200 dark:bg-slate-800 dark:border-slate-700 dark:text-white outline-none focus:ring-2 ring-orange-500/50 transition-all resize-none"
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className={`w-full py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all transform active:scale-95 shadow-lg ${
                  loading 
                  ? 'bg-gray-400 cursor-not-allowed shadow-none' 
                  : 'bg-orange-500 text-white hover:bg-orange-600 shadow-orange-200'
                }`}
              >
                {loading ? "Sending..." : "Send Message"} 
                {!loading && <Send size={20} />}
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;