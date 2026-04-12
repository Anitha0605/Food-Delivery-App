import React, { useState, useContext } from 'react';
import { Trash2, ArrowRight, ShoppingBag, Ticket, Info, Plus, Minus } from 'lucide-center';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { StoreContext } from '../context/StoreContext';

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, food_list, removeFromCart, addToCart, url, token, clearCart } = useContext(StoreContext);
  const user = JSON.parse(localStorage.getItem('user'));

  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);

  const cartData = food_list.filter(item => cartItems[item._id] > 0);

  const subtotal = cartData.reduce((acc, item) => acc + (item.price * cartItems[item._id]), 0);
  const gstAmount = subtotal * 0.05;
  const platformFee = subtotal > 0 ? 5 : 0;
  const deliveryFee = subtotal > 0 ? 40 : 0;
  
  const totalBeforeDiscount = subtotal + gstAmount + platformFee + deliveryFee;
  const finalAmount = totalBeforeDiscount - discount;

  const applyCoupon = () => {
    if (couponCode.toUpperCase() === 'WELCOME50' && subtotal > 200) {
      setDiscount(50);
      alert(" Promo Applied! ₹50 Discounted.");
    } else {
      alert("Invalid Coupon or Minimum Order ₹200 required.");
      setDiscount(0);
    }
  };

  const handleCheckout = async () => {
    if (!token) {
      alert("Please login first!");
      return navigate('/login');
    }

    const orderData = {
      userId: user?.id || user?._id,
      items: cartData.map(item => ({...item, quantity: cartItems[item._id]})),
      amount: finalAmount,
      address: {
        firstName: user?.name || "Guest",
        street: "123, Anna Nagar",
        city: "Chennai",
        phone: "9876543210"
      }
    };

    try {
      const response = await axios.post(`${url}/api/order/place`, orderData, {
        headers: { token }
      });

      if (response.data.success) {
        alert(" Order Placed Successfully!");
        clearCart(); 
        navigate('/myorders'); 
      }
    } catch (err) {
      console.error(err);
      alert("Server error! Try again.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 min-h-screen bg-gray-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="flex items-center gap-2 mb-8">
        <ShoppingBag className="text-orange-500" size={28} />
        <h2 className="text-3xl font-black text-slate-900 dark:text-white">Your Cart</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-4">
          {cartData.length === 0 ? (
            <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border-2 border-dashed dark:border-slate-800">
              <p className="text-slate-400 text-lg">Your cart is empty!</p>
              <button onClick={() => navigate('/')} className="mt-4 text-orange-500 font-bold hover:underline">Browse Menu</button>
            </div>
          ) : (
            cartData.map((item) => (
              <div key={item._id} className="flex items-center gap-4 bg-white dark:bg-slate-900 p-5 rounded-2xl shadow-sm border dark:border-slate-800">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-24 h-24 object-cover rounded-xl bg-gray-100" 
                  onError={(e) => { e.target.src = "https://via.placeholder.com/150?text=No+Image"; }}
                />
                
                <div className="flex-1">
                  <h3 className="font-bold text-xl dark:text-white">{item.name}</h3>
                  <p className="text-orange-600 font-bold mb-2">₹{item.price}</p>
                  <div className="flex items-center gap-3 bg-gray-100 dark:bg-slate-800 w-fit px-2 py-1 rounded-lg">
                    <button onClick={() => removeFromCart(item._id)} className="p-1 hover:bg-white dark:hover:bg-slate-700 rounded-md text-orange-500"><Minus size={16}/></button>
                    <span className="font-bold dark:text-white w-6 text-center">{cartItems[item._id]}</span>
                    <button onClick={() => addToCart(item._id)} className="p-1 hover:bg-white dark:hover:bg-slate-700 rounded-md text-orange-500"><Plus size={16}/></button>
                  </div>
                </div>
                <div className="text-right pr-2">
                  <p className="font-black text-lg dark:text-white mb-2">₹{item.price * cartItems[item._id]}</p>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-lg border-t-4 border-orange-500 sticky top-24">
            <h3 className="text-xl font-bold mb-6 dark:text-white">Bill Details</h3>
            <div className="space-y-4 mb-6 text-slate-500 dark:text-slate-400">
              <div className="flex justify-between"><span>Item Total</span><span>₹{subtotal}</span></div>
              <div className="flex justify-between"><span>GST (5%)</span><span>₹{gstAmount.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Delivery/Platform Fee</span><span>₹{deliveryFee + platformFee}</span></div>
              {discount > 0 && <div className="flex justify-between text-green-600 font-bold"><span>Discount</span><span>-₹{discount}</span></div>}
              <hr className="dark:border-slate-800" />
              <div className="flex justify-between items-center pt-2">
                <span className="text-lg font-bold dark:text-white">To Pay</span>
                <span className="text-3xl font-black text-orange-500">₹{finalAmount.toFixed(2)}</span>
              </div>
            </div>
            <button 
              onClick={handleCheckout} 
              disabled={cartData.length === 0}
              className={`w-full py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 active:scale-95 transition-all ${cartData.length === 0 ? 'bg-gray-200 text-gray-400' : 'bg-orange-500 text-white shadow-lg shadow-orange-500/20'}`}
            >
              Confirm Order <ArrowRight size={22} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;