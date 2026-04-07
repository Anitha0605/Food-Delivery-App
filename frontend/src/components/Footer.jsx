import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        {/* Brand Info */}
        <div className="space-y-6">
          <h2 className="text-3xl font-black text-orange-500">YumDash</h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            Chennai's favorite food delivery app. Bringing the best flavors of the city right to your doorstep with speed and love.
          </p>
          
          {/* Social Icons with Direct Links */}
          <div className="flex gap-4">
            {/* Instagram Link */}
            <a 
              href="https://www.instagram.com/your_username" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center hover:bg-orange-500 transition-colors"
              title="Follow us on Instagram"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>

            {/* Facebook Link */}
            <a 
              href="https://www.facebook.com/your_page" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center hover:bg-orange-500 transition-colors"
              title="Follow us on Facebook"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </a>

            {/* Twitter Link */}
            <a 
              href="https://www.twitter.com/your_handle" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center hover:bg-orange-500 transition-colors"
              title="Follow us on Twitter"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-bold text-lg mb-6">Quick Links</h4>
          <ul className="space-y-4 text-slate-400 text-sm font-medium">
            <li><a href="#" className="hover:text-orange-500 transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-orange-500 transition-colors">Our Menu</a></li>
            <li><a href="#" className="hover:text-orange-500 transition-colors">Track Order</a></li>
            <li><a href="#" className="hover:text-orange-500 transition-colors">Become a Partner</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="font-bold text-lg mb-6">Contact Us</h4>
          <ul className="space-y-4 text-slate-400 text-sm">
            <li className="flex items-start gap-3">
              <MapPin size={18} className="text-orange-500 shrink-0" />
              <span>123, Foodie Street, Anna Nagar East,<br />Chennai - 600102, Tamil Nadu</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} className="text-orange-500 shrink-0" />
              <span>+91 98765 43210</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={18} className="text-orange-500 shrink-0" />
              <span>hello@yumdash.com</span>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="font-bold text-lg mb-6">Newsletter</h4>
          <p className="text-slate-400 text-sm mb-4">Subscribe to get special offers and discounts.</p>
          <div className="flex gap-2">
            <input type="text" placeholder="Email" className="bg-slate-800 border-none rounded-xl px-4 py-3 text-sm w-full focus:ring-2 ring-orange-500 outline-none" />
            <button className="bg-orange-500 p-3 rounded-xl hover:bg-orange-600 transition-colors">Go</button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-10 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
        <p>© 2026 YumDash Food Delivery. All Rights Reserved.</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
          <a href="#" className="hover:text-white transition-colors">Refund Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;