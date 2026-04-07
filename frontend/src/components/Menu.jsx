import React, { useState, useEffect } from 'react';
import { Plus, Star, Search } from 'lucide-react';

const Menu = ({ addToCart }) => {
  const [foods, setFoods] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  
  const categories = ['All', 'South Indian', 'Non-Veg', 'Drinks'];

  useEffect(() => {
    fetch('http://localhost:5000/api/food/list')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setFoods(data.data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Menu Fetch Error:", err);
        setLoading(false);
      });
  }, []);

  const filteredFoods = activeCategory === 'All' 
    ? foods 
    : foods.filter(f => f.category === activeCategory);

  if (loading) {
    return <div className="text-center py-20 font-bold text-orange-500">Loading 100+ Delicacies...</div>;
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

      {/* Food Grid Section */}
      <div className="mb-16">
        <div className="flex items-center gap-4 mb-8">
          <h3 className="text-2xl font-black text-slate-800 dark:text-white border-l-8 border-orange-500 pl-4">
            {activeCategory} Items
          </h3>
          <div className="h-[2px] flex-1 bg-slate-100 dark:bg-slate-800"></div>
          <span className="text-sm font-bold text-orange-500 bg-orange-50 px-4 py-1 rounded-full border border-orange-100">
            {filteredFoods.length} Items Found
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredFoods.map(food => (
            <div key={food._id} className="bg-white dark:bg-slate-900 rounded-[32px] border dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
              <div className="relative h-52 overflow-hidden">
                <img 
                  src={food.image} 
                  alt={food.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" 
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
                  {food.description}
                </p>
                <div className="flex justify-between items-center pt-4 border-t dark:border-slate-800">
                  <div className="flex flex-col">
                    <span className="text-2xl font-black text-slate-900 dark:text-white">₹{food.price}</span>
                  </div>
                  <button 
                    onClick={() => addToCart(food)}
                    className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 p-3 rounded-2xl hover:bg-orange-500 hover:text-white transition-all shadow-lg"
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