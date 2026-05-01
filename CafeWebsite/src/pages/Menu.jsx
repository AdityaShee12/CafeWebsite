import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import api from '../api';
import './Menu.css';

// Using dummy items in case API is not fully set up or empty
const DUMMY_ITEMS = [
  { _id: '1', name: 'Signature Cappuccino', description: 'Rich espresso blended with velvety microfoam, finished with intricate latte art.', price: 6.50, category: 'Beverage', imageUrl: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&q=80', featured: true },
  { _id: '2', name: 'Almond Croissant', description: 'Flaky, buttery pastry filled with rich almond frangipane and dusted with powdered sugar.', price: 5.00, category: 'Pastry', imageUrl: 'https://images.unsplash.com/photo-1549903072-7e6e0d65666b?auto=format&fit=crop&q=80', featured: true },
  { _id: '3', name: 'Avocado Toast', description: 'Smashed avocado on artisanal sourdough with chili flakes and microgreens.', price: 12.00, category: 'Breakfast', imageUrl: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?auto=format&fit=crop&q=80', featured: false },
  { _id: '4', name: 'Pour Over Coffee', description: 'Single-origin beans manually brewed for a clean, nuanced flavor profile.', price: 5.50, category: 'Beverage', imageUrl: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80', featured: false },
  { _id: '5', name: 'Matcha Latte', description: 'Ceremonial grade matcha whisked with steamed oat milk.', price: 6.00, category: 'Beverage', imageUrl: 'https://images.unsplash.com/photo-1536420121552-b37f54c29f52?auto=format&fit=crop&q=80', featured: false },
  { _id: '6', name: 'Tiramisu', description: 'Classic Italian dessert with espresso-soaked ladyfingers and mascarpone cream.', price: 8.50, category: 'Dessert', imageUrl: 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?auto=format&fit=crop&q=80', featured: true }
];

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
        if (data.data && data.data.length > 0) {
          setItems(data.data);
        } else {
          setItems(DUMMY_ITEMS);
        }
      } catch (error) {
        console.error("Failed to fetch menu", error);
        setItems(DUMMY_ITEMS); // fallback to dummy items
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, []);

  const filteredItems = activeCategory === "All" 
    ? items 
    : items.filter(item => item.category === activeCategory);

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="page-wrapper menu-page">
      <div className="container">
        <motion.div 
          className="page-header"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <span className="section-subtitle">Our Offerings</span>
          <h1 className="page-title">Discover Our <span className="text-gold">Menu</span></h1>
          <p className="page-subtitle">
            Locally sourced ingredients, crafted with passion. Explore our handpicked selection of artisanal coffees, delicate pastries, and wholesome meals.
          </p>
        </motion.div>

        {/* Categories */}
        <motion.div 
          className="category-filters"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`filter-btn ${activeCategory === category ? 'active' : ''}`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Menu Grid */}
        {loading ? (
          <div className="loading-spinner">
            <div className="spinner"></div>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="empty-state">
            No items available in this category yet.
          </div>
        ) : (
          <motion.div layout className="menu-grid">
            <AnimatePresence>
              {filteredItems.map(item => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  key={item._id}
                  className="menu-card glass"
                >
                  <div className="menu-card-img">
                    <img src={item.imageUrl} alt={item.name} />
                    {item.featured && (
                      <span className="featured-badge">Featured</span>
                    )}
                  </div>
                  <div className="menu-card-content">
                    <div className="menu-card-header-row">
                      <h3>{item.name}</h3>
                    </div>
                    <p>{item.description}</p>
                    <div className="menu-card-footer">
                      <span className="price">${Number(item.price).toFixed(2)}</span>
                      <button className="btn-icon" aria-label="Order"><FiArrowRight /></button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Menu;
