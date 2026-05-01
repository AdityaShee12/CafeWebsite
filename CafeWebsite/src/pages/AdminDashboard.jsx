import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { FiUsers, FiBox, FiMessageSquare, FiSettings, FiLogOut, FiPlus, FiTrash2, FiEdit2, FiCheck } from 'react-icons/fi';
import api from '../api';
import './Admin.css';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('menu');
  const [menuItems, setMenuItems] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Example data fetching
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [menuRes, msgRes] = await Promise.all([
          api.get('/menu').catch(() => ({ data: { data: [] } })),
          api.get('/contact').catch(() => ({ data: { data: [] } }))
        ]);
        setMenuItems(menuRes.data.data || []);
        setMessages(msgRes.data.data || []);
      } catch (error) {
        console.error("Failed to fetch admin data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDeleteItem = async (id) => {
    if(!window.confirm("Are you sure?")) return;
    try {
      await api.delete(`/menu/${id}`);
      setMenuItems(menuItems.filter(item => item._id !== id));
      toast.success("Item deleted");
    } catch (error) {
      toast.error("Failed to delete item");
    }
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="admin-loading">
          <div className="spinner"></div>
        </div>
      );
    }

    if (activeTab === 'menu') {
      return (
        <div className="admin-panel glass">
          <div className="panel-header">
            <h3>Menu Management</h3>
            <button className="btn btn-primary btn-sm flex-center gap-2">
              <FiPlus /> Add Item
            </button>
          </div>
          
          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {menuItems.length === 0 ? (
                  <tr><td colSpan="5" className="text-center py-4 text-beige">No items found.</td></tr>
                ) : (
                  menuItems.map(item => (
                    <tr key={item._id}>
                      <td>
                        <div className="table-img">
                          <img src={item.imageUrl} alt={item.name} />
                        </div>
                      </td>
                      <td className="font-heading font-bold">{item.name}</td>
                      <td><span className="badge">{item.category}</span></td>
                      <td className="text-gold font-bold">${Number(item.price).toFixed(2)}</td>
                      <td>
                        <div className="action-btns">
                          <button className="btn-icon-small"><FiEdit2 /></button>
                          <button className="btn-icon-small text-danger" onClick={() => handleDeleteItem(item._id)}><FiTrash2 /></button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    if (activeTab === 'messages') {
      return (
        <div className="admin-panel glass">
          <div className="panel-header">
            <h3>Contact Messages</h3>
          </div>
          <div className="messages-grid">
            {messages.length === 0 ? (
              <p className="text-beige text-center py-8">No messages found.</p>
            ) : (
              messages.map(msg => (
                <div key={msg._id} className="message-card">
                  <div className="message-header">
                    <h4>{msg.name}</h4>
                    <span className="message-date">{new Date(msg.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p className="message-email">{msg.email}</p>
                  <p className="message-subject">{msg.subject}</p>
                  <div className="message-body">
                    <p>{msg.message}</p>
                  </div>
                  <div className="message-footer">
                    <button className="btn btn-outline btn-sm">Mark Read</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      );
    }

    return (
      <div className="admin-panel glass">
        <div className="panel-header">
          <h3>Dashboard Overview</h3>
        </div>
        <p className="text-beige">Select a tab from the sidebar to manage content.</p>
      </div>
    );
  };

  return (
    <div className="page-wrapper admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar glass">
        <div className="sidebar-header">
          <h2>Admin<span>.</span></h2>
        </div>
        <nav className="sidebar-nav">
          <button 
            className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <FiBox /> Dashboard
          </button>
          <button 
            className={`nav-item ${activeTab === 'menu' ? 'active' : ''}`}
            onClick={() => setActiveTab('menu')}
          >
            <FiBox /> Menu Items
          </button>
          <button 
            className={`nav-item ${activeTab === 'messages' ? 'active' : ''}`}
            onClick={() => setActiveTab('messages')}
          >
            <FiMessageSquare /> Messages
          </button>
          <button 
            className={`nav-item ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            <FiUsers /> Users
          </button>
        </nav>
        <div className="sidebar-footer">
          <button className="nav-item text-danger">
            <FiLogOut /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-content">
        <header className="admin-header glass">
          <div>
            <h1 className="font-heading text-2xl">Admin Portal</h1>
            <p className="text-beige text-sm">Manage your cafe website content.</p>
          </div>
          <div className="admin-user">
            <span>Admin User</span>
            <div className="avatar">A</div>
          </div>
        </header>
        
        <div className="admin-body">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
