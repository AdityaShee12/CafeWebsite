import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../api';

const CATEGORIES = ["All", "Beverage", "Pastry", "Breakfast", "Lunch", "Dessert"];

const Menu = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    const fetchMenu = async () => {
      setLoading(true);
      try {
        const { data } = await api.get('/menu');
        setItems(data.data);
      } catch (error) {
        console.error("Failed to fetch menu", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, []);

  const filteredItems = activeCategory === "All" 
    ? items 
    : items.filter(item => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#0F0802] text-[#F5EDD6] py-20 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-px bg-[#D4AF5A]" />
            <span className="text-[#D4AF5A] font-outfit text-xs font-medium tracking-[.22em] uppercase">Our Offerings</span>
            <span className="w-8 h-px bg-[#D4AF5A]" />
          </div>
          <h1 className="font-playfair text-[#F5EDD6] text-4xl md:text-5xl font-bold mb-4">
            Discover Our <em className="text-[#D4AF5A] not-italic">Menu</em>
          </h1>
          <p className="font-outfit text-[#F5EDD6]/50 max-w-2xl mx-auto text-sm md:text-base font-light">
            Locally sourced ingredients, crafted with passion. Explore our handpicked selection of artisanal coffees, delicate pastries, and wholesome meals.
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 rounded-full font-outfit text-xs font-medium tracking-wide transition-all duration-300 ${
                activeCategory === category 
                  ? 'bg-[#D4AF5A] text-[#0F0802] shadow-[0_0_15px_rgba(212,175,90,0.3)]' 
                  : 'bg-white/5 text-[#F5EDD6]/70 hover:bg-white/10 hover:text-[#D4AF5A]'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
             <div className="w-10 h-10 border-4 border-[#D4AF5A]/30 border-t-[#D4AF5A] rounded-full animate-spin"></div>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center text-[#F5EDD6]/50 py-20">
            No items available in this category yet.
          </div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredItems.map(item => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                key={item._id}
                className="group relative bg-white/[0.02] border border-[#D4AF5A]/10 rounded-xl overflow-hidden hover:bg-white/[0.04] hover:border-[#D4AF5A]/30 transition-all duration-500"
              >
                <div className="aspect-[4/3] overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F0802] via-transparent to-transparent z-10 opacity-60" />
                  <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out" />
                  {item.featured && (
                    <div className="absolute top-4 right-4 z-20 bg-[#D4AF5A] text-[#0F0802] text-[0.65rem] font-bold tracking-widest uppercase px-3 py-1 rounded-sm shadow-md">
                      Featured
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3 gap-4">
                    <h3 className="font-playfair text-xl font-bold text-[#F5EDD6] leading-tight">{item.name}</h3>
                    <span className="font-outfit text-[#D4AF5A] font-medium text-lg shrink-0">${item.price.toFixed(2)}</span>
                  </div>
                  <p className="font-outfit text-[#F5EDD6]/60 text-sm font-light leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Menu;
