import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Menu from './components/Menu';
import About from './components/About';
import Contact from './components/Contact';
import Cart from './components/Cart';
import Login from './components/Login';
import MyOrder from './components/MyOrder';
import Admin from './components/Admin';
import Footer from './components/Footer';
import { ThemeProvider } from './context/ThemeContent';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from './pages/Verify';

function App() {
  // குறிப்பு: cart மற்றும் user ஸ்டேட்கள் இப்போது StoreContext-ல் இருந்து கையாளப்படும்.
  // எனவே இங்கிருக்கும் addToCart மற்றும் useState தேவையில்லை.

  return (
    <ThemeProvider>
      {/* ❌ Router இங்கிருந்து நீக்கப்பட்டது, ஏனென்றால் அது main.jsx-ல் உள்ளது */}
      <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300 flex flex-col">
        
        {/* Navbar - Common to all pages */}
        <Navbar />
        
        {/* Main Content Area */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/myorders" element={<MyOrder />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/verify" element={<Verify />} /> 
          </Routes>
        </main>

        {/* Footer - Common to all pages */}
        <Footer />
      </div>
      <ToastContainer />
    </ThemeProvider>
  );
}

export default App;