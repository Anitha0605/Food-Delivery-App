import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FiPackage, FiTruck, FiCheckCircle, FiClock, FiRefreshCw, FiMapPin } from 'react-icons/fi';

const MyOrders = () => {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");
  const url = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const fetchOrders = async () => {
    try {
      const response = await axios.post(url + "/api/order/userorders", {}, {
        headers: { token }
      });
      if (response.data.success) {
        setData(response.data.data.reverse());
      }
    } catch (error) {
      console.error("Error fetching orders", error);
    }
  };

  useEffect(() => {
    if (token) { fetchOrders(); }
  }, [token]);

  
  const getStatusNumber = (status) => {
    if (status === "Food Processing") return 1;
    if (status === "Out for delivery") return 2;
    if (status === "Delivered") return 3;
    return 1;
  };

  return (
    <div className="max-w-4xl mx-auto my-10 p-4 md:p-8 min-h-screen font-sans">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
        <div>
          <h2 className="text-4xl font-black text-slate-900 leading-tight">
            Track Your <span className="text-orange-500">Meal</span>
          </h2>
          <p className="text-slate-400 font-medium">Your order will be delivered on time!</p>
        </div>
        <button 
          onClick={fetchOrders} 
          className="flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-3xl font-bold hover:bg-orange-600 transition-all shadow-xl active:scale-95"
        >
          <FiRefreshCw className="text-lg" /> Update Status
        </button>
      </div>

      <div className="space-y-12">
        {data.map((order, index) => {
          const currentStep = getStatusNumber(order.status);
          
          return (
            <div key={index} className="bg-white rounded-[48px] p-8 md:p-12 shadow-2xl shadow-slate-100 border border-slate-50 relative overflow-hidden">
              {/* Background Accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-bl-full -mr-10 -mt-10 opacity-50"></div>

              <div className="flex flex-col lg:flex-row gap-12 relative z-10">
                
                {/* Left Side: Order Info */}
                <div className="flex-1 space-y-6">
                  <div>
                    <span className="text-[10px] font-black bg-orange-100 text-orange-600 px-4 py-2 rounded-full uppercase tracking-widest">
                      Order ID: #{order._id.slice(-6)}
                    </span>
                    <h3 className="text-2xl font-black text-slate-800 mt-4 leading-tight">
                      {order.items.map((item, idx) => (
                        <span key={idx}>{item.name} <span className="text-orange-500">x{item.quantity}</span>{idx === order.items.length - 1 ? "" : ", "}</span>
                      ))}
                    </h3>
                  </div>

                  <div className="flex items-center gap-6">
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Total Amount</p>
                      <p className="text-3xl font-black text-slate-900">₹{order.amount}.00</p>
                    </div>
                    <div className="h-10 w-[2px] bg-slate-100"></div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Items</p>
                      <p className="text-3xl font-black text-slate-900">{order.items.length}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-slate-400 font-medium bg-slate-50 p-4 rounded-2xl border border-slate-100 italic text-sm">
                    <FiMapPin className="text-orange-500" /> {order.address?.street}, {order.address?.city}
                  </div>
                </div>

                {/* Right Side: Vertical Image-Style Tracker */}
                <div className="flex-1 border-l-2 border-dashed border-slate-100 pl-8 md:pl-12 space-y-10 relative">
                  
                  {/* Step 1: Processing */}
                  <div className="flex items-center gap-6 relative">
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center text-xl transition-all duration-500 shadow-lg ${currentStep >= 1 ? 'bg-orange-500 text-white shadow-orange-200' : 'bg-slate-100 text-slate-300'}`}>
                      <FiClock />
                    </div>
                    <div className="flex flex-col">
                      <p className={`font-black text-sm uppercase tracking-widest ${currentStep >= 1 ? 'text-orange-500' : 'text-slate-300'}`}>Order Confirmed</p>
                      <p className="text-xs text-slate-400 font-medium">Your order has been confirmed.</p>
                    </div>
                    {/* Link Line */}
                    <div className={`absolute top-14 left-7 w-[2px] h-10 transition-all duration-700 ${currentStep > 1 ? 'bg-orange-500' : 'bg-slate-100'}`}></div>
                  </div>

                  {/* Step 2: On the Way */}
                  <div className="flex items-center gap-6 relative">
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center text-xl transition-all duration-500 shadow-lg ${currentStep >= 2 ? 'bg-orange-500 text-white shadow-orange-200' : 'bg-slate-100 text-slate-300'}`}>
                      <FiTruck />
                    </div>
                    <div className="flex flex-col">
                      <p className={`font-black text-sm uppercase tracking-widest ${currentStep >= 2 ? 'text-orange-500' : 'text-slate-300'}`}>Out For Delivery</p>
                      <p className="text-xs text-slate-400 font-medium">Your order is on the way!</p>
                    </div>
                    {/* Link Line */}
                    <div className={`absolute top-14 left-7 w-[2px] h-10 transition-all duration-700 ${currentStep > 2 ? 'bg-emerald-500' : 'bg-slate-100'}`}></div>
                  </div>

                  {/* Step 3: Delivered */}
                  <div className="flex items-center gap-6">
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center text-xl transition-all duration-500 shadow-lg ${currentStep >= 3 ? 'bg-emerald-500 text-white shadow-emerald-100' : 'bg-slate-100 text-slate-300'}`}>
                      <FiCheckCircle />
                    </div>
                    <div className="flex flex-col">
                      <p className={`font-black text-sm uppercase tracking-widest ${currentStep >= 3 ? 'text-emerald-600' : 'text-slate-300'}`}>Delivered Successfully</p>
                      <p className="text-xs text-slate-400 font-medium">Your order has been delivered!</p>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          );
        })}

        {data.length === 0 && (
          <div className="text-center py-32 bg-white rounded-[60px] border-4 border-dashed border-slate-50">
            <FiPackage className="text-8xl text-slate-100 mx-auto mb-6" />
            <p className="text-slate-400 font-bold text-xl italic tracking-tight">No orders yet!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;