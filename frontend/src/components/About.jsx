import React from 'react';
import { Utensils, Truck, ShieldCheck, Heart } from 'lucide-react';

const About = () => {
  const features = [
    { icon: <Utensils className="text-orange-500" />, title: "Best Quality", desc: "We use only fresh and organic ingredients for our dishes." },
    { icon: <Truck className="text-orange-500" />, title: "Fast Delivery", desc: "Our delivery partners ensure your food reaches you in 30 mins." },
    { icon: <ShieldCheck className="text-orange-500" />, title: "Safe & Hygienic", desc: "We follow strict safety protocols in our kitchens." },
    { icon: <Heart className="text-orange-500" />, title: "Made with Love", desc: "Every dish is prepared with passion and care." }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-20">
        <img src="https://picsum.photos/seed/kitchen/800/600" alt="About" className="rounded-[40px] shadow-2xl" />
        <div>
          <h2 className="text-4xl font-black mb-6 dark:text-white">About <span className="text-orange-500">YumDash</span></h2>
          <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed mb-6">
            YumDash started with a simple mission: to bring the best flavors of Chennai to your doorstep. We partner with top local restaurants to provide a seamless food ordering experience.
          </p>
          <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed">
            Whether you're craving a spicy Biryani or a cheesy Pizza, we've got you covered. Our platform is designed to be fast, reliable, and user-friendly.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {features.map((f, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 p-8 rounded-3xl border dark:border-slate-800 text-center">
            <div className="w-16 h-16 bg-orange-50 dark:bg-orange-900/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              {f.icon}
            </div>
            <h4 className="font-bold text-lg mb-2 dark:text-white">{f.title}</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;