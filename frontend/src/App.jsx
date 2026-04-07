import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Menu from './components/Menu';
import About from './components/About';
import Contact from './components/Contact';
import Cart from './components/Cart';
import Login from './components/Login';
import Register from './components/Register';
import MyOrder from './components/MyOrder';
import Admin from './components/Admin';
import Footer from './components/Footer';
import { ThemeProvider } from './context/ThemeContent';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from './pages/Verify';

function App() {
  // Cart State
  const [cart, setCart] = useState([]);
  
  // User State (Retrieved from LocalStorage)
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Add to Cart Function
  const addToCart = (item) => {
    const exist = cart.find((x) => x._id === item._id);
    if (exist) {
      setCart(cart.map((x) => x._id === item._id ? { ...exist, quantity: exist.quantity + 1 } : x));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300 flex flex-col">
          {/* Navbar - Common to all pages */}
          <Navbar cartCount={cart.length} user={user} setUser={setUser} />
          
          {/* Main Content Area */}
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home addToCart={addToCart} />} />
              <Route path="/menu" element={<Menu addToCart={addToCart} />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
              <Route path="/login" element={<Login setUser={setUser} />} />
              <Route path="/register" element={<Register />} />
              <Route path="/my-orders" element={<MyOrder />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/verify" element={<Verify />} /> {/* Verify Page - Payment Verification Page */}
            </Routes>
          </main>

          {/* Footer - Common to all pages */}
          <Footer />
        </div>
      </Router>
      <ToastContainer />
    </ThemeProvider>
        
  );
}

export default App;