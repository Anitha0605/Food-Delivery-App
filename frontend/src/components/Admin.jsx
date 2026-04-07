import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { 
  FiPackage, FiPlus, FiGrid, FiShoppingBag, 
  FiLogOut, FiTrendingUp, FiMapPin, FiMail, FiMessageSquare, FiClock, FiUploadCloud
} from "react-icons/fi";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("orders");
  const [orders, setOrders] = useState([]);
  const [messages, setMessages] = useState([]);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const url = "import.meta.env.VITE_API_URL || http://localhost:5000";

  // --- 1. Fetch Data ---
  const fetchData = async () => {
    try {
      const orderRes = await axios.get(`${url}/api/order/list`);
      if (orderRes.data.success) {
        const orderData = orderRes.data.data.reverse();
        setOrders(orderData);
        const total = orderData.reduce((acc, order) => acc + Number(order.amount || 0), 0);
        setTotalEarnings(total);
      }

      const msgRes = await axios.get(`${url}/api/messages/all`);
      if (msgRes.status === 200) {
        setMessages(msgRes.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => { fetchData(); }, []);

  // --- 2. Order Status Handler ---
  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(`${url}/api/order/status`, { orderId, status: event.target.value });
      if (response.data.success) {
        await fetchData();
        toast.success("Status Updated!");
      }
    } catch (error) {
      toast.error("Failed to update status!");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#f8fafc] font-sans">
      
      {/* --- SIDEBAR  --- */}
      <div className="w-full md:w-80 bg-slate-950 text-white p-8 flex flex-col gap-8 shadow-2xl z-20">
        <div>
          <h2 className="text-3xl font-black italic text-orange-500 tracking-tighter">YumDash.</h2>
          <p className="text-[10px] text-slate-500 font-bold uppercase mt-1 tracking-widest">Admin Dashboard</p>
        </div>
        
        <nav className="flex flex-col gap-2 flex-1">
          <button onClick={() => setActiveTab("orders")} className={`flex items-center gap-4 p-4 rounded-[20px] font-bold transition-all ${activeTab === "orders" ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20" : "hover:bg-slate-900 text-slate-400"}`}>
            <FiShoppingBag className="text-xl" /> Orders
          </button>
          <button onClick={() => setActiveTab("addFood")} className={`flex items-center gap-4 p-4 rounded-[20px] font-bold transition-all ${activeTab === "addFood" ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20" : "hover:bg-slate-900 text-slate-400"}`}>
            <FiPlus className="text-xl" /> Add Food
          </button>
          <button onClick={() => setActiveTab("addHotel")} className={`flex items-center gap-4 p-4 rounded-[20px] font-bold transition-all ${activeTab === "addHotel" ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20" : "hover:bg-slate-900 text-slate-400"}`}>
            <FiGrid className="text-xl" /> Add Hotel
          </button>
          <button onClick={() => setActiveTab("messages")} className={`flex items-center gap-4 p-4 rounded-[20px] font-bold transition-all ${activeTab === "messages" ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20" : "hover:bg-slate-900 text-slate-400"}`}>
            <FiMessageSquare className="text-xl" /> Messages 
            {messages.length > 0 && <span className="ml-auto bg-orange-600 text-white text-[10px] px-2 py-1 rounded-full">{messages.length}</span>}
          </button>

          <button onClick={handleLogout} className="flex items-center gap-4 p-4 mt-auto rounded-[20px] font-bold text-rose-500 hover:bg-rose-500/10 transition-all border border-transparent hover:border-rose-500/20">
            <FiLogOut className="text-xl" /> Logout
          </button>
        </nav>

        {/* Total Revenue */}
        <div className="bg-slate-900 p-6 rounded-[32px] border border-slate-800 relative overflow-hidden">
           <div className="absolute -right-4 -top-4 text-slate-800 text-6xl opacity-20"><FiTrendingUp /></div>
           <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-2 relative z-10">Total Revenue</p>
           <h3 className="text-3xl font-black text-white relative z-10">₹{totalEarnings.toLocaleString()}</h3>
        </div>
      </div>

      {/* --- MAIN CONTENT  --- */}
      <div className="flex-1 p-6 md:p-14 overflow-y-auto">
        
        {/* 1. ORDERS TAB */}
        {activeTab === "orders" && (
          <div className="max-w-5xl mx-auto space-y-10 animate-in fade-in duration-500">
            <h1 className="text-5xl font-black text-slate-900 tracking-tighter italic">Order <span className="text-orange-500">Queue</span></h1>
            <div className="grid gap-6">
              {orders.length > 0 ? orders.map((order, index) => (
                <div key={index} className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm flex flex-col lg:flex-row justify-between items-center gap-8 hover:border-orange-100 transition-all">
                  <div className="flex gap-8 items-center flex-1">
                    <div className="bg-slate-50 p-7 rounded-[30px] text-slate-400 text-4xl transition-colors"><FiPackage /></div>
                    <div className="space-y-1">
                      <h4 className="text-2xl font-black text-slate-800">{order.address?.firstName || "Customer"}</h4>
                      <p className="text-slate-400 text-sm font-bold flex items-center gap-2"><FiMapPin className="text-orange-500" /> {order.address?.city}</p>
                      <p className="text-slate-500 font-medium bg-slate-50 px-4 py-2 rounded-xl inline-block mt-2 text-sm italic">
                        {order.items?.map(item => `${item.name} x ${item.quantity}`).join(", ")}
                      </p>
                      <div className="flex items-center gap-4 mt-3">
                         <span className="font-black text-slate-900 text-2xl tracking-tighter">₹{order.amount}</span>
                         <span className={`text-[10px] uppercase font-black px-4 py-1.5 rounded-full border-2 ${order.status === 'Delivered' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-orange-50 text-orange-600 border-orange-100'}`}>{order.status}</span>
                      </div>
                    </div>
                  </div>
                  <div className="w-full lg:w-64">
                    <select onChange={(e) => statusHandler(e, order._id)} value={order.status} className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-[24px] font-black text-slate-700 outline-none focus:border-orange-500 shadow-inner appearance-none text-center">
                      <option value="Food Processing">Pending</option>
                      <option value="Out for delivery">Out for Delivery</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </div>
                </div>
              )) : <div className="text-center py-20 text-slate-400">No orders found!</div>}
            </div>
          </div>
        )}

        {/* 2. ADD FOOD TAB */}
        {activeTab === "addFood" && (
          <div className="max-w-3xl mx-auto bg-white p-10 md:p-16 rounded-[60px] shadow-2xl border border-orange-50 animate-in slide-in-from-bottom-10">
            <h2 className="text-4xl font-black text-center mb-10">Add New <span className="text-orange-500">Cuisine</span></h2>
            <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); toast.success("Food item added successfully!"); }}>
              <div className="space-y-3">
                <label className="text-xs font-black uppercase text-slate-400 ml-4">Dish Name</label>
                <input required type="text" placeholder="Dish Name" className="w-full p-6 bg-slate-50 rounded-[30px] border-2 border-transparent outline-none focus:border-orange-500 transition-all font-bold" />
              </div>
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-xs font-black uppercase text-slate-400 ml-4">Price (₹)</label>
                  <input required type="number" placeholder="250" className="w-full p-6 bg-slate-50 rounded-[30px] border-2 border-transparent outline-none focus:border-orange-500 transition-all font-bold" />
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-black uppercase text-slate-400 ml-4">Category</label>
                  <select className="w-full p-6 bg-slate-50 rounded-[30px] border-2 border-transparent outline-none focus:border-orange-500 font-black text-slate-600 appearance-none">
                    <option value="Veg">Veg</option>
                    <option value="Non-Veg">Non-Veg</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="w-full bg-orange-500 text-white py-6 rounded-[35px] font-black text-xl hover:bg-orange-600 transition-all shadow-xl shadow-orange-200">Save Food Item</button>
            </form>
          </div>
        )}

        {/* 3. ADD HOTEL TAB */}
        {activeTab === "addHotel" && (
          <div className="max-w-3xl mx-auto bg-white p-10 md:p-16 rounded-[60px] shadow-2xl border border-slate-50 animate-in slide-in-from-bottom-10">
            <h2 className="text-4xl font-black text-center mb-10">Register <span className="text-orange-500">Hotel</span></h2>
            <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); toast.info("Hotel registered successfully!"); }}>
              <div className="space-y-3">
                <label className="text-xs font-black uppercase text-slate-400 ml-4">Hotel Brand Name</label>
                <input type="text" placeholder="Hotel Name" className="w-full p-6 bg-slate-50 rounded-[30px] border-2 border-transparent outline-none focus:border-slate-900 transition-all font-bold" />
              </div>
              <div className="space-y-3">
                <label className="text-xs font-black uppercase text-slate-400 ml-4">Location</label>
                <input type="text" placeholder="City" className="w-full p-6 bg-slate-50 rounded-[30px] border-2 border-transparent outline-none focus:border-slate-900 transition-all font-bold" />
              </div>
              <button className="w-full bg-slate-950 text-white py-6 rounded-[35px] font-black text-xl hover:bg-slate-900 transition-all shadow-xl">Confirm Registration</button>
            </form>
          </div>
        )}

        {/* 4. MESSAGES TAB */}
        {activeTab === "messages" && (
          <div className="max-w-5xl mx-auto space-y-10 animate-in slide-in-from-right-8 duration-500">
            <h1 className="text-5xl font-black text-slate-900 tracking-tighter italic">User <span className="text-orange-500">Queries</span></h1>
            <div className="grid gap-6">
              {messages.length > 0 ? messages.map((msg, index) => (
                <div key={index} className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm hover:border-orange-100 transition-all">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center font-black text-xl">{msg.name.charAt(0)}</div>
                      <div>
                        <h4 className="text-xl font-black text-slate-800">{msg.name}</h4>
                        <p className="text-orange-500 font-bold text-sm flex items-center gap-2"><FiMail size={14}/> {msg.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400 text-xs font-bold"><FiClock size={12} /> {new Date(msg.createdAt).toLocaleDateString()}</div>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-[24px] text-slate-700 font-medium leading-relaxed border-l-4 border-orange-500 italic">
                    "{msg.message}"
                  </div>
                </div>
              )) : <div className="text-center py-20 text-slate-400">No messages found!</div>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;