import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { 
  FiPackage, FiPlus, FiShoppingBag, 
  FiLogOut, FiMessageSquare, FiUpload, FiTrash2 
} from "react-icons/fi";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("orders");
  const [orders, setOrders] = useState([]);
  const [messages, setMessages] = useState([]);
  const [foodList, setFoodList] = useState([]);
  const [totalEarnings, setTotalEarnings] = useState(0);

  const [image, setImage] = useState(null);
  const [foodData, setFoodData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Veg",
    hotelName: "",
    location: ""
  });

  // URL setup
  const url = "https://food-delivery-app-7gis.onrender.com";

  // Data Fetching
  const fetchData = async () => {
    try {
      const [orderRes, msgRes, foodRes] = await Promise.all([
        axios.get(`${url}/api/order/list`),
        axios.get(`${url}/api/messages/all`),
        axios.get(`${url}/api/food/list`)
      ]);

      if (orderRes.data.success) {
        const data = orderRes.data.data.reverse();
        setOrders(data);
        setTotalEarnings(data.reduce((acc, curr) => acc + Number(curr.amount || 0), 0));
      }
      if (msgRes.data) setMessages(Array.isArray(msgRes.data) ? msgRes.data : (msgRes.data.messages || []));
      if (foodRes.data.success) setFoodList(foodRes.data.data);
    } catch (error) {
      console.error("Fetch Error:", error);
    }
  };

  useEffect(() => { fetchData(); }, []);

  // Add Food Submission
  const onFoodSubmit = async (e) => {
    e.preventDefault();
    if (!image) return toast.error("Please upload an image!");

    if (!foodData.name || !foodData.description || !foodData.price || !foodData.category) {
      return toast.error("Please complete all required fields.");
    }

    const formData = new FormData();
    formData.append("name", foodData.name);
    formData.append("description", foodData.description);
    formData.append("price", String(foodData.price));
    formData.append("category", foodData.category);
    formData.append("hotelName", foodData.hotelName);
    formData.append("location", foodData.location);
    formData.append("image", image);

    try {
      const response = await fetch(`${url}/api/food/add`, {
        method: "POST",
        body: formData,
      });

      let data;
      try {
        data = await response.json();
      } catch (parseError) {
        console.error("Response parse error:", parseError);
        data = { success: false, message: "Unexpected server response" };
      }

      if (!response.ok) {
        console.error("Submit Error:", data);
        return toast.error(data.message || "Error adding food");
      }

      if (data.success) {
        setFoodData({ name: "", description: "", price: "", category: "Veg", hotelName: "", location: "" });
        setImage(null);
        toast.success("Dish added! 👨‍🍳");
        fetchData();
        setActiveTab("manage");
      } else {
        toast.error(data.message || "Error adding food");
      }
    } catch (error) {
      console.error("Submit Error:", error);
      toast.error("Error adding food");
    }
  };

  // Remove Food Item
  const removeFood = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        const res = await axios.post(`${url}/api/food/remove`, { id });
        if (res.data.success) { 
            toast.success("Item Removed Successfully"); 
            fetchData(); 
        }
      } catch (error) { 
          toast.error("Error removing item"); 
      }
    }
  };

  // Update Order Status
  const statusHandler = async (e, orderId) => {
    try {
      const res = await axios.post(`${url}/api/order/status`, { orderId, status: e.target.value });
      if (res.data.success) { toast.success("Status Updated"); fetchData(); }
    } catch (error) { toast.error("Failed to update status"); }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const getFoodImage = (food) => {
    if (!food?.image) return "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000";
    return food.image.startsWith("http") ? food.image : `${url}/images/${food.image}`;
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-50 font-sans text-slate-900">
      
      {/* SIDEBAR */}
      <div className="w-full md:w-80 bg-slate-900 text-white p-8 flex flex-col gap-8 shadow-2xl relative z-20">
        <h2 className="text-4xl font-black italic text-orange-500 tracking-tighter">YumDash.</h2>
        <nav className="flex flex-col gap-2 flex-1">
          <NavItem active={activeTab === "orders"} onClick={() => setActiveTab("orders")} icon={<FiShoppingBag />} label="Orders" badge={orders.filter(o => o.status !== "Delivered").length} />
          <NavItem active={activeTab === "addFood"} onClick={() => setActiveTab("addFood")} icon={<FiPlus />} label="Add Food" />
          <NavItem active={activeTab === "manage"} onClick={() => setActiveTab("manage")} icon={<FiPackage />} label="Manage Menu" />
          <NavItem active={activeTab === "messages"} onClick={() => setActiveTab("messages")} icon={<FiMessageSquare />} label="Messages" badge={messages.length} />
          <button onClick={handleLogout} className="flex items-center gap-4 p-4 mt-auto rounded-2xl font-bold text-rose-400 hover:bg-rose-500/10 transition-colors">
            <FiLogOut className="text-xl" /> Logout
          </button>
        </nav>
        <div className="bg-slate-800 p-6 rounded-[32px] border border-slate-700">
          <p className="text-[10px] text-slate-400 font-black uppercase mb-1">Total Revenue</p>
          <h3 className="text-2xl font-black text-white">₹{totalEarnings.toLocaleString()}</h3>
        </div>
      </div>

      {/* CONTENT AREA */}
      <div className="flex-1 p-6 md:p-14 overflow-y-auto max-h-screen">
        
        {/* ORDERS TAB */}
        {activeTab === "orders" && (
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-black mb-10 italic">Incoming <span className="text-orange-500">Orders</span></h2>
            <div className="grid gap-6">
              {orders.map((order, index) => (
                <div key={index} className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                  <div className="flex gap-6 items-center">
                    <div className="p-4 bg-orange-50 text-orange-500 rounded-3xl"><FiPackage size={32} /></div>
                    <div>
                      <p className="font-bold text-slate-800">{order.items?.map((item, idx) => `${item.name} x ${item.quantity}${idx === order.items.length - 1 ? '' : ', '}`)}</p>
                      <p className="text-sm text-slate-500 font-medium mt-1">{order.address?.firstName} {order.address?.lastName}</p>
                      <p className="text-xs text-slate-400 italic">{order.address?.city}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-6 w-full lg:w-auto">
                    <div className="text-center px-6">
                      <p className="text-[10px] uppercase font-black text-slate-400">Amount</p>
                      <p className="font-bold text-orange-500">₹{order.amount}</p>
                    </div>
                    <select onChange={(e) => statusHandler(e, order._id)} value={order.status} className="bg-slate-50 border-none rounded-xl font-bold p-3">
                      <option value="Food Processing">Processing</option>
                      <option value="Out for delivery">Out for delivery</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ADD FOOD TAB */}
        {activeTab === "addFood" && (
          <div className="max-w-2xl mx-auto bg-white p-10 rounded-[40px] shadow-xl border">
            <h2 className="text-3xl font-black mb-8 text-center text-slate-800">New <span className="text-orange-500">Creation</span></h2>
            <form onSubmit={onFoodSubmit} className="space-y-5">
              <label htmlFor="image-upload" className="mx-auto block w-36 h-36 bg-slate-50 border-2 border-dashed border-slate-200 rounded-[40px] cursor-pointer overflow-hidden relative group">
                {image ? <img src={URL.createObjectURL(image)} className="w-full h-full object-cover" alt="Preview" /> : 
                <div className="flex flex-col items-center justify-center h-full gap-2">
                  <FiUpload className="text-3xl text-slate-300" />
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Upload Photo</span>
                </div>}
                <input type="file" id="image-upload" hidden accept="image/*" onChange={(e) => {
                  const file = e.target.files?.[0] || null;
                  if (file && !file.type.startsWith("image/")) {
                    toast.error("Please select a valid image file.");
                    setImage(null);
                  } else {
                    setImage(file);
                  }
                }} />
              </label>

              <div className="grid grid-cols-2 gap-4">
                <input required className="input-field" placeholder="Hotel Name" value={foodData.hotelName} onChange={e => setFoodData({...foodData, hotelName: e.target.value})} />
                <input required className="input-field" placeholder="Location" value={foodData.location} onChange={e => setFoodData({...foodData, location: e.target.value})} />
              </div>
              <input required className="input-field" placeholder="Dish Name" value={foodData.name} onChange={e => setFoodData({...foodData, name: e.target.value})} />
              <textarea required className="input-field min-h-[120px]" placeholder="Brief Description" value={foodData.description} onChange={e => setFoodData({...foodData, description: e.target.value})} />
              <div className="grid grid-cols-2 gap-4">
                <input required type="number" className="input-field" placeholder="Price (₹)" value={foodData.price} onChange={e => setFoodData({...foodData, price: e.target.value})} />
                <select className="input-field font-bold text-slate-500" value={foodData.category} onChange={e => setFoodData({...foodData, category: e.target.value})}>
                  <option value="Veg">Veg</option>
                  <option value="Non-Veg">Non-Veg</option>
                  <option value="Drinks">Drinks</option>
                  <option value="South Indian">South Indian</option>
                </select>
              </div>
              <button type="submit" className="w-full bg-orange-500 text-white py-4 rounded-2xl font-black text-lg hover:bg-orange-600 shadow-lg">Publish Item</button>
            </form>
          </div>
        )}

        {/* MANAGE MENU TAB */}
        {activeTab === "manage" && (
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-black mb-10 italic">Manage <span className="text-orange-500">Menu</span></h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {foodList.map(food => (
                <div key={food._id} className="bg-white dark:bg-slate-900 rounded-[32px] border dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 group">
                  <div className="relative h-52 overflow-hidden bg-gray-100">
                    <img 
                      src={getFoodImage(food)} 
                      alt={food.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" 
                      onError={(e) => { 
                        e.target.src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000"; 
                      }} 
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full flex items-center gap-1 text-xs font-bold shadow-sm">
                      ⭐ 4.5
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest block mb-2">
                      {food.category}
                    </span>
                    <h4 className="font-bold text-slate-800 dark:text-white text-lg line-clamp-1 mb-2">
                      {food.name}
                    </h4>
                    <p className="text-xs text-slate-400 line-clamp-2 h-8 mb-4">
                      {food.description || "Fresh and delicious meal served hot."}
                    </p>
                    
                    <div className="flex justify-between items-center pt-4 border-t dark:border-slate-800">
                      <span className="text-2xl font-black text-slate-900 dark:text-white">₹{food.price}</span>
                      <button onClick={() => removeFood(food._id)} className="p-3 bg-rose-50 text-rose-500 rounded-2xl hover:bg-rose-500 hover:text-white transition-all">
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MESSAGES TAB */}
        {activeTab === "messages" && (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-black mb-10 italic">Customer <span className="text-orange-500">Inquiries</span></h2>
            <div className="space-y-4">
              {messages.map((msg, index) => (
                <div key={index} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                  <h4 className="font-black text-slate-800">{msg.name}</h4>
                  <p className="text-sm text-slate-400 mb-2">{msg.email}</p>
                  <p className="text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-2xl">{msg.message}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        .input-field { width: 100%; padding: 1.1rem 1.5rem; background: #f8fafc; border-radius: 1.25rem; outline: none; font-weight: 600; border: 2px solid transparent; transition: all 0.3s; }
        .input-field:focus { border-color: #f97316; background: white; }
      `}</style>
    </div>
  );
};

const NavItem = ({ active, onClick, icon, label, badge }) => (
  <button onClick={onClick} className={`flex items-center gap-4 p-4 rounded-2xl font-bold transition-all relative w-full ${active ? "bg-orange-500 text-white shadow-lg" : "text-slate-400 hover:bg-slate-800"}`}>
    <span className="text-xl">{icon}</span> {label}
    {badge > 0 && <span className="ml-auto bg-white text-orange-600 text-[10px] font-black px-2 py-1 rounded-full">{badge}</span>}
  </button>
);

export default Admin;