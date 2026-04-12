import React, { useState, useEffect, useContext } from 'react'; 
import { Plus, Star, Flame, ArrowRight, Utensils, Clock, MapPin } from 'lucide-react';
import { StoreContext } from '../context/StoreContext';

const Home = () => {
  const [hotels, setHotels] = useState([]);
  const [foods, setFoods] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [loading, setLoading] = useState(true);

  const { url, addToCart } = useContext(StoreContext);

  const hotelMeta = {
    "Thalappakatti": "https://thalappakatti.com/wp-content/uploads/2016/11/besi1.jpg",
    "Junior Kuppanna": "https://crazymasalafood.com/wp-content/images/2023/08/hotel-junior-kuppanna.jpg",
    "A2B": "https://latest.thedailyguardian.com/wp-content/uploads/2023/10/pg-6-5.jpg",
    "Anjappar": "https://image.wedmegood.com/resized/450X/uploads/member/1709086/1609747149_4.PNG",
    "Murugan Idli": "https://th.bing.com/th/id/R.8121f4c88a03b65b662659b01de0bf81?rik=2MKHNfg%2bCOzpTg&riu=http%3a%2f%2fviewtraveling.com%2fwp-content%2fuploads%2f2018%2f11%2fMurugan-Idly-Kadai.jpg&ehk=%2fhj6by2560IhIbxDaORY0n1kYkYZVK2Q1orrs4IWKaA%3d&risl=&pid=ImgRaw&r=0",
    "Sangeetha": "https://img.restaurantguru.com/w550/h367/re31-dishes-HOTEL-SANGEETHA-GRAND-2022-09.jpg",
    "Cream Centre": "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg2AjMw4xX3oZch2Nd6QH8GiyeDfOz3ChlbxiAHGPjU1MSGS7TJMWZHYI6LzqRDsc4yoEQ8wkT1ndqw6Bv_itJLdvyrctn1tyKcJo_2szeteK5JoKXhjHGUO-PWr2M63so89UgLR_KDg6c94CiGbsg6G8QfqRyDskq0BDUO45g7YRwG-6OGSsSyBdnQ/w1200-h630-p-k-no-nu/IMG_20211216_183212.jpg",
    "YumDash Special": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=1000",
    "Saravana Bhavan": "https://incredibleindiaphotogallery.com/wp-content/uploads/2010/08/Hotel-Saravana-Bhavan.jpg",
    "Foodie Hub": "https://i.pinimg.com/736x/58/e0/09/58e00946df2d724c60c66757ec0114af.jpg",
    "Buhari": "https://www.chennaitop10.com/wp-content/uploads/2023/07/buhari-hotel-shenoy-nagar-chennai-north-indian-restaurants-9jd6kmmie5-768x576.jpg",
    "Default": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000"
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${url}/api/food/list`);
        const data = await res.json();
        if (data.success) {
          setFoods(data.data);
          const uniqueHotels = [...new Set(data.data.map(item => item.hotelName || "YumDash Special"))];
          setHotels(uniqueHotels);
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setLoading(false);
      }
    };
    if (url) fetchData();
  }, [url]);

  const scrollToMenu = () => {
    const section = document.getElementById('menu-section');
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center dark:bg-slate-950">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="pb-20 bg-white dark:bg-slate-950 min-h-screen">
      
      {/* --- HERO SECTION --- */}
      <div className="bg-orange-50 dark:bg-slate-900/50 py-16 md:py-24 mb-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="animate-in fade-in slide-in-from-left-8 duration-700">
            <span className="bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-6 inline-block">
              <Flame size={14} className="inline mr-2" /> Fastest Delivery in Chennai
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white leading-[1.1] mb-6">
              Craving for <span className="text-orange-500">Delicious</span> Food?
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-lg mb-10 max-w-md">
              Order from Chennai's most iconic restaurants and get it delivered in 30 mins.
            </p>
            <button
              onClick={scrollToMenu}
              className="bg-orange-500 text-white px-10 py-5 rounded-[24px] font-black text-xl shadow-xl shadow-orange-500/20 hover:bg-orange-600 transition-all flex items-center gap-3 active:scale-95"
            >
              Order Now <ArrowRight />
            </button>
          </div>
          <div className="relative hidden md:block animate-in fade-in zoom-in duration-1000">
            <img src="https://biyopos.com/wp-content/uploads/2024/07/happy-customer-online-food-order-delivery.webp" alt="Promo" className="rounded-[40px] shadow-2xl" />
          </div>
        </div>
      </div>

      <div id="menu-section" className="max-w-7xl mx-auto px-4 pt-10">
        
        {/* --- 1.HOTEL CARDS --- */}
        {!selectedHotel ? (
          <div className="animate-in fade-in duration-500">
            <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-10 tracking-tighter">
              Explore <span className="text-orange-500">Restaurants</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {hotels.map((hotel, index) => (
                <div 
                  key={index}
                  onClick={() => setSelectedHotel(hotel)}
                  className="bg-white dark:bg-slate-900 rounded-[40px] overflow-hidden border-2 border-slate-100 dark:border-slate-800 hover:border-orange-500 cursor-pointer transition-all group shadow-sm hover:shadow-xl"
                >
                  <div className="relative h-60 overflow-hidden">
                    <img 
                      src={hotelMeta[hotel] || hotelMeta["Default"]} 
                      alt={hotel} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                      <Star size={12} className="text-orange-500 fill-orange-500" /> 4.2
                    </div>
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-black text-slate-800 dark:text-white mb-2">{hotel}</h3>
                    <div className="flex items-center gap-4 text-slate-400 text-sm font-bold">
                      <span className="flex items-center gap-1"><Clock size={14}/> 30 min</span>
                      <span className="flex items-center gap-1"><MapPin size={14}/> Chennai</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* --- 2.MENU ITEMS --- */
          <div className="animate-in slide-in-from-right-10 duration-500">
            <div className="flex items-center gap-4 mb-10">
              <button 
                onClick={() => setSelectedHotel(null)}
                className="p-3 bg-slate-100 dark:bg-slate-800 rounded-full hover:bg-orange-500 hover:text-white transition-all shadow-md"
              >
                <ArrowRight className="rotate-180" />
              </button>
              <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">
                {selectedHotel} <span className="text-orange-500">Menu</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {foods
                .filter(food => (food.hotelName || "YumDash Special") === selectedHotel)
                .map(food => (
                  <div key={food._id} className="bg-white dark:bg-slate-900 rounded-[32px] border dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl transition-all group">
                    <div className="relative h-56 overflow-hidden bg-gray-100">
                      <img 
                        src={food.image} 
                        alt={food.name} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                        onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000"; }}
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="font-bold text-lg dark:text-white mb-1">{food.name}</h3>
                      <p className="text-[10px] font-black text-orange-500 uppercase tracking-widest mb-3">{food.category}</p>
                      <div className="flex justify-between items-center mt-4">
                        <p className="text-slate-900 dark:text-white font-black text-2xl">₹{food.price}</p>
                        <button 
                          onClick={() => addToCart(food._id)}
                          className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 p-3 rounded-2xl hover:bg-orange-500 transition-colors active:scale-90"
                        >
                          <Plus size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;