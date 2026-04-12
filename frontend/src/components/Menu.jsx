import React, { useState, useEffect, useContext } from 'react';
import { Plus, Star } from 'lucide-react';
import { StoreContext } from '../context/StoreContext';

const Menu = () => {
  const [foods, setFoods] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const { url, addToCart } = useContext(StoreContext);

  const categories = ['All', 'South Indian', 'Non-Veg', 'Drinks'];

  useEffect(() => {
    const fetchMenu = async () => {
      try {
      
        const res = await fetch(`${url}/api/food/list`);
        const data = await res.json();
        if (data.success) {
          setFoods(data.data);
        }
        setLoading(false);
      } catch (err) {
        console.error("Menu Fetch Error:", err);
        setLoading(false);
      }
    };

    if (url) fetchMenu();
  }, [url]);

  const filteredFoods = activeCategory === 'All' 
    ? foods 
    : foods.filter(f => f.category === activeCategory);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center dark:bg-slate-950">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
        <p className="ml-4 font-bold text-orange-500">Loading YumDash Menu...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h2 className="text-5xl font-black mb-4 dark:text-white">
          YumDash <span className="text-orange-500">Special Menu</span>
        </h2>
        <p className="text-slate-500 max-w-2xl mx-auto font-medium">
          Explore all {foods.length} delicious items from Chennai's best spots.
        </p>
      </div>
      
      {/* Category Filter */}
      <div className="flex gap-3 overflow-x-auto pb-8 no-scrollbar justify-center">
        {categories.map(cat => (
          <button 
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-8 py-3 rounded-full font-bold transition-all whitespace-nowrap ${
              activeCategory === cat 
              ? 'bg-orange-500 text-white shadow-xl scale-105' 
              : 'bg-white dark:bg-slate-900 text-slate-500 border dark:border-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Food Grid */}
      <div className="mb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredFoods.map(food => (
            <div key={food._id} className="bg-white dark:bg-slate-900 rounded-[32px] border dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 group">
              <div className="relative h-52 overflow-hidden bg-gray-100">
                <img 
                  src={food.image} 
                  alt={food.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" 
                  onError={(e) => { 
                    e.target.src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000"; 
                  }} 
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full flex items-center gap-1 text-xs font-bold shadow-sm">
                  <Star size={12} className="text-orange-500 fill-orange-500" /> 4.5
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
                  <button 
                    onClick={() => addToCart(food._id)}
                    className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 p-3 rounded-2xl hover:bg-orange-500 hover:text-white transition-all shadow-lg active:scale-90"
                  >
                    <Plus size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;