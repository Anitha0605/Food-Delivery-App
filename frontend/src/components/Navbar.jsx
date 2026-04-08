import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingBag, LogOut, User, Sun, Moon, Phone, MapPin } from 'lucide-react';
import { useTheme } from '../context/ThemeContent';
import { StoreContext } from '../context/StoreContext';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  // StoreContext-லிருந்து தேவையான டேட்டாவை எடுக்கிறோம்
  const { cartItems, setToken, token } = useContext(StoreContext);

  // லோக்கல் ஸ்டோரேஜிலிருந்து பயனர் விவரங்களை எடுக்கிறோம்
  const userData = JSON.parse(localStorage.getItem("user"));

  // ✅ திருத்தப்பட்ட வரி: cartItems ஆப்ஜெக்ட்டாக இருந்தால் மட்டுமே கணக்கிடும். 
  // இல்லையெனில் எரர் வராமல் 0 என்று காட்டும்.
  const cartCount = (cartItems && typeof cartItems === 'object') 
    ? Object.values(cartItems).reduce((acc, count) => acc + count, 0) 
    : 0;

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setToken("");
    navigate('/login');
    window.location.reload(); 
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b dark:border-slate-800 shadow-sm">
      {/* Top Bar - Contact Information */}
      <div className="bg-slate-900 dark:bg-slate-800 text-white py-2 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
          <div className="flex gap-6">
            <span className="flex items-center gap-2">
              <Phone size={12} className="text-orange-500" /> +91 98765 43210
            </span>
            <span className="flex items-center gap-2">
              <MapPin size={12} className="text-orange-500" /> Anna Nagar, Chennai
            </span>
          </div>
          <span className="text-orange-400">Free Delivery on orders above ₹500</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-3xl font-black tracking-tighter text-slate-900 dark:text-white flex items-center gap-1">
          Yum<span className="text-orange-500">Dash</span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className={`text-sm font-bold transition-colors ${isActive('/') ? 'text-orange-500' : 'text-slate-600 dark:text-slate-300 hover:text-orange-500'}`}>Home</Link>
          <Link to="/menu" className={`text-sm font-bold transition-colors ${isActive('/menu') ? 'text-orange-500' : 'text-slate-600 dark:text-slate-300 hover:text-orange-500'}`}>Menu</Link>
          <Link to="/about" className={`text-sm font-bold transition-colors ${isActive('/about') ? 'text-orange-500' : 'text-slate-600 dark:text-slate-300 hover:text-orange-500'}`}>About</Link>
          <Link to="/contact" className={`text-sm font-bold transition-colors ${isActive('/contact') ? 'text-orange-500' : 'text-slate-600 dark:text-slate-300 hover:text-orange-500'}`}>Contact</Link>
          {token && (
            <Link to="/myorders" className={`text-sm font-bold transition-colors ${isActive('/myorders') ? 'text-orange-500' : 'text-slate-600 dark:text-slate-300 hover:text-orange-500'}`}>My Orders</Link>
          )}
        </div>
        
        <div className="flex items-center gap-3 md:gap-6">
          {/* Theme Toggle */}
          <button onClick={toggleTheme} className="p-2 text-slate-500 hover:text-orange-500 transition-colors">
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          
          {/* Cart Icon with Badge */}
          <Link to="/cart" className="relative p-2 text-slate-500 hover:text-orange-500 transition-colors">
            <ShoppingBag size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-[9px] w-5 h-5 rounded-full flex items-center justify-center font-black border-2 border-white dark:border-slate-950">
                {cartCount}
              </span>
            )}
          </Link>

          {/* User Section (Login/Logout/Profile) */}
          {token && userData ? (
            <div className="flex items-center gap-3 border-l dark:border-slate-800 pl-4 md:pl-6">
              <div className="flex flex-col items-end hidden sm:flex">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Welcome</span>
                <span className="text-sm font-black dark:text-white">{userData.name}</span>
              </div>
              <div className="relative group">
                <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/20 rounded-2xl flex items-center justify-center text-orange-600 cursor-pointer group-hover:bg-orange-500 group-hover:text-white transition-all">
                  <User size={20} />
                </div>
                {/* Dropdown Menu */}
                <div className="absolute right-0 top-full pt-2 hidden group-hover:block w-48 shadow-2xl z-50">
                  <div className="bg-white dark:bg-slate-900 border dark:border-slate-800 rounded-2xl shadow-xl p-2">
                    <Link to={userData.role === 'admin' ? "/admin" : "/myorders"} className="block px-4 py-2 text-sm font-bold dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl">Dashboard</Link>
                    <button onClick={logout} className="w-full text-left px-4 py-2 text-sm font-bold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/10 rounded-xl">Logout</button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login" className="text-sm font-bold text-slate-600 dark:text-slate-300 px-4 py-2 hover:text-orange-500 transition-colors">Login</Link>
              <Link to="/login?mode=signup"className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg shadow-orange-500/20">Sign Up</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;