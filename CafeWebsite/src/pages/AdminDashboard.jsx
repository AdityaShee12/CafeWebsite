import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FiEdit, FiTrash2, FiCheck, FiX, FiPlus, FiMessageSquare, FiCalendar, FiCoffee } from 'react-icons/fi';
import api from '../api';
import { AuthContext } from '../context/AuthContext';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('menu');
  const [dataList, setDataList] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // Menu Modal State
  const [showMenuModal, setShowMenuModal] = useState(false);
  const [editingMenu, setEditingMenu] = useState(null);
  const [menuForm, setMenuForm] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Beverage',
    imageUrl: '',
    isAvailable: true,
    featured: false
  });

  useEffect(() => {
    if (!user) {
      toast.error('Please login first');
      navigate('/login');
    } else if (user.role !== 'admin') {
      toast.error('Access denied');
      navigate('/');
    }
  }, [user, navigate]);

  const fetchData = async () => {
    setLoading(true);
    try {
      let res;
      if (activeTab === 'menu') {
        res = await api.get('/menu');
        setDataList(res.data.data || []);
      } else if (activeTab === 'reservations') {
        res = await api.get('/reservations');
        setDataList(res.data.data || []);
      } else if (activeTab === 'messages') {
        res = await api.get('/contact');
        setDataList(res.data.data || []);
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && user.role === 'admin') fetchData();
  }, [activeTab, user]);

  if (!user || user.role !== 'admin') return null;

  /* ── Menu Handlers ── */
  const handleOpenMenuModal = (item = null) => {
    if (item) {
      setEditingMenu(item);
      setMenuForm({
        name: item.name,
        description: item.description,
        price: item.price,
        category: item.category,
        imageUrl: item.imageUrl,
        isAvailable: item.isAvailable,
        featured: item.featured
      });
    } else {
      setEditingMenu(null);
      setMenuForm({
        name: '',
        description: '',
        price: '',
        category: 'Beverage',
        imageUrl: '',
        isAvailable: true,
        featured: false
      });
    }
    setShowMenuModal(true);
  };

  const handleMenuSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingMenu) {
        await api.put(`/menu/${editingMenu._id}`, menuForm);
        toast.success('Menu item updated');
      } else {
        await api.post('/menu', menuForm);
        toast.success('Menu item created');
      }
      setShowMenuModal(false);
      fetchData();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error saving item');
    }
  };

  const handleDeleteMenu = async (id) => {
    if (!window.confirm('Are you sure you want to delete this menu item?')) return;
    try {
      await api.delete(`/menu/${id}`);
      toast.success('Item deleted');
      fetchData();
    } catch (err) {
      toast.error('Failed to delete item');
    }
  };

  /* ── Reservation Handlers ── */
  const handleUpdateReservationStatus = async (id, status) => {
    try {
      await api.patch(`/reservations/${id}/status`, { status });
      toast.success(`Reservation marked as ${status}`);
      fetchData();
    } catch (err) {
      toast.error('Failed to update status');
    }
  };

  /* ── Message Handlers ── */
  const handleMarkRead = async (id) => {
    try {
      await api.put(`/contact/${id}/read`);
      toast.success('Message marked as read');
      fetchData();
    } catch (err) {
      toast.error('Failed to update message');
    }
  };

  const handleDeleteMessage = async (id) => {
    if (!window.confirm('Delete this message?')) return;
    try {
      await api.delete(`/contact/${id}`);
      toast.success('Message deleted');
      fetchData();
    } catch (err) {
      toast.error('Failed to delete message');
    }
  };

  return (
    <div className="min-h-screen bg-[#0F0802] text-[#F5EDD6] py-20 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4 mt-8">
          <div>
            <h1 className="font-playfair text-[#D4AF5A] text-4xl font-bold mb-2">Admin Portal</h1>
            <p className="font-outfit text-[#F5EDD6]/50">Welcome, {user.name} • Organize and manage Aroma Cafe</p>
          </div>
          <button 
            onClick={() => { logout(); navigate('/login'); }}
            className="px-6 py-2 border border-[#D4AF5A]/30 text-[#D4AF5A] font-outfit text-xs tracking-wider uppercase rounded hover:bg-[#D4AF5A] hover:text-[#0F0802] transition-colors"
          >
            Logout
          </button>
        </div>

        <div className="flex flex-wrap gap-2 border-b border-[#D4AF5A]/10 mb-8 pb-4">
          <button onClick={() => setActiveTab('menu')} className={`flex items-center gap-2 px-6 py-2.5 font-outfit text-sm font-medium tracking-wide capitalize rounded-sm transition-colors ${activeTab === 'menu' ? 'bg-[#D4AF5A] text-[#0F0802]' : 'bg-white/5 text-[#F5EDD6]/70 hover:bg-white/10 hover:text-[#D4AF5A]'}`}>
            <FiCoffee /> Menu
          </button>
          <button onClick={() => setActiveTab('reservations')} className={`flex items-center gap-2 px-6 py-2.5 font-outfit text-sm font-medium tracking-wide capitalize rounded-sm transition-colors ${activeTab === 'reservations' ? 'bg-[#D4AF5A] text-[#0F0802]' : 'bg-white/5 text-[#F5EDD6]/70 hover:bg-white/10 hover:text-[#D4AF5A]'}`}>
            <FiCalendar /> Reservations
          </button>
          <button onClick={() => setActiveTab('messages')} className={`flex items-center gap-2 px-6 py-2.5 font-outfit text-sm font-medium tracking-wide capitalize rounded-sm transition-colors ${activeTab === 'messages' ? 'bg-[#D4AF5A] text-[#0F0802]' : 'bg-white/5 text-[#F5EDD6]/70 hover:bg-white/10 hover:text-[#D4AF5A]'}`}>
            <FiMessageSquare /> Messages
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center p-20">
             <div className="w-8 h-8 border-4 border-[#D4AF5A]/30 border-t-[#D4AF5A] rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="bg-white/[0.02] border border-[#D4AF5A]/10 rounded-xl p-6 shadow-2xl">
            {/* ── Menu Tab ── */}
            {activeTab === 'menu' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="font-playfair text-2xl text-[#F5EDD6]">Menu Items</h2>
                  <button onClick={() => handleOpenMenuModal()} className="px-4 py-2 bg-[#D4AF5A] text-[#0F0802] text-xs font-bold uppercase tracking-wider rounded-sm flex items-center gap-2 hover:bg-[#D4AF5A]/90 transition">
                    <FiPlus /> Add Item
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[600px]">
                    <thead>
                      <tr className="border-b border-[#D4AF5A]/20">
                        <th className="p-3 font-outfit text-xs tracking-wider uppercase text-[#D4AF5A]/70">Name</th>
                        <th className="p-3 font-outfit text-xs tracking-wider uppercase text-[#D4AF5A]/70">Category</th>
                        <th className="p-3 font-outfit text-xs tracking-wider uppercase text-[#D4AF5A]/70">Price</th>
                        <th className="p-3 font-outfit text-xs tracking-wider uppercase text-[#D4AF5A]/70">Status</th>
                        <th className="p-3 font-outfit text-xs tracking-wider uppercase text-[#D4AF5A]/70 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dataList.map(item => (
                        <tr key={item._id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                          <td className="p-3 font-playfair font-medium text-lg">{item.name}</td>
                          <td className="p-3 font-outfit text-sm text-[#F5EDD6]/70">{item.category}</td>
                          <td className="p-3 font-outfit text-sm text-[#D4AF5A]">${item.price.toFixed(2)}</td>
                          <td className="p-3 font-outfit text-sm">
                            <span className={`px-2 py-1 rounded text-xs ${item.isAvailable ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                              {item.isAvailable ? 'Available' : 'Sold Out'}
                            </span>
                          </td>
                          <td className="p-3 text-right flex justify-end gap-3">
                            <button onClick={() => handleOpenMenuModal(item)} className="text-[#D4AF5A] hover:text-[#F5EDD6] transition" title="Edit">
                              <FiEdit size={18} />
                            </button>
                            <button onClick={() => handleDeleteMenu(item._id)} className="text-red-400 hover:text-red-300 transition" title="Delete">
                              <FiTrash2 size={18} />
                            </button>
                          </td>
                        </tr>
                      ))}
                      {dataList.length === 0 && (
                        <tr><td colSpan="5" className="text-center p-8 text-[#F5EDD6]/50 font-outfit">No menu items found</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            
            {/* ── Reservations Tab ── */}
            {activeTab === 'reservations' && (
              <div>
                <h2 className="font-playfair text-2xl text-[#F5EDD6] mb-6">Reservations</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[800px]">
                    <thead>
                      <tr className="border-b border-[#D4AF5A]/20">
                        <th className="p-3 font-outfit text-xs tracking-wider uppercase text-[#D4AF5A]/70">Guest</th>
                        <th className="p-3 font-outfit text-xs tracking-wider uppercase text-[#D4AF5A]/70">Date & Time</th>
                        <th className="p-3 font-outfit text-xs tracking-wider uppercase text-[#D4AF5A]/70">Code</th>
                        <th className="p-3 font-outfit text-xs tracking-wider uppercase text-[#D4AF5A]/70">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dataList.map(item => (
                        <tr key={item._id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                          <td className="p-3">
                            <div className="font-playfair font-medium text-lg">{item.name}</div>
                            <div className="font-outfit text-xs text-[#F5EDD6]/50 drop-shadow-sm">{item.email} • {item.phone}</div>
                            <div className="font-outfit text-xs text-[#D4AF5A] mt-1">{item.guests} Guests</div>
                          </td>
                          <td className="p-3 font-outfit text-sm text-[#F5EDD6]/90">
                            {new Date(item.date).toLocaleDateString()} at {item.time}
                          </td>
                          <td className="p-3 font-outfit text-sm text-[#D4AF5A]/80 tracking-wider">
                            {item.confirmationCode}
                          </td>
                          <td className="p-3 font-outfit text-sm">
                            <select 
                              value={item.status}
                              onChange={(e) => handleUpdateReservationStatus(item._id, e.target.value)}
                              className="bg-[#0F0802] border border-[#D4AF5A]/30 text-[#F5EDD6] p-1.5 rounded outline-none focus:border-[#D4AF5A] text-xs"
                            >
                              <option value="pending">Pending</option>
                              <option value="confirmed">Confirmed</option>
                              <option value="completed">Completed</option>
                              <option value="cancelled">Cancelled</option>
                              <option value="no-show">No Show</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                      {dataList.length === 0 && (
                        <tr><td colSpan="4" className="text-center p-8 text-[#F5EDD6]/50 font-outfit">No reservations found</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ── Messages Tab ── */}
            {activeTab === 'messages' && (
              <div>
                <h2 className="font-playfair text-2xl text-[#F5EDD6] mb-6">Contact Messages</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[800px]">
                    <thead>
                      <tr className="border-b border-[#D4AF5A]/20">
                        <th className="p-3 font-outfit text-xs tracking-wider uppercase text-[#D4AF5A]/70">Sender</th>
                        <th className="p-3 font-outfit text-xs tracking-wider uppercase text-[#D4AF5A]/70 w-1/2">Message</th>
                        <th className="p-3 font-outfit text-xs tracking-wider uppercase text-[#D4AF5A]/70">Date</th>
                        <th className="p-3 font-outfit text-xs tracking-wider uppercase text-[#D4AF5A]/70 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dataList.map(item => (
                        <tr key={item._id} className={`border-b border-white/5 hover:bg-white/[0.02] transition-colors ${!item.isRead ? 'bg-[#D4AF5A]/5' : ''}`}>
                          <td className="p-3">
                            <div className="font-playfair font-medium text-lg">{item.name}</div>
                            <div className="font-outfit text-xs text-[#F5EDD6]/50">{item.email}</div>
                          </td>
                          <td className="p-3 font-outfit text-sm text-[#F5EDD6]/80 whitespace-pre-wrap">
                            <div className="font-bold text-[#D4AF5A] mb-1">{item.subject}</div>
                            {item.message}
                          </td>
                          <td className="p-3 font-outfit text-sm text-[#F5EDD6]/50">
                            {new Date(item.createdAt).toLocaleDateString()}
                          </td>
                          <td className="p-3 text-right flex justify-end gap-3 items-center h-full pt-6">
                            {!item.isRead && (
                              <button onClick={() => handleMarkRead(item._id)} className="text-[#D4AF5A] hover:text-[#F5EDD6] transition font-outfit text-xs flex items-center gap-1" title="Mark Read">
                                <FiCheck size={14} /> Read
                              </button>
                            )}
                            <button onClick={() => handleDeleteMessage(item._id)} className="text-red-400 hover:text-red-300 transition" title="Delete">
                              <FiTrash2 size={18} />
                            </button>
                          </td>
                        </tr>
                      ))}
                      {dataList.length === 0 && (
                        <tr><td colSpan="4" className="text-center p-8 text-[#F5EDD6]/50 font-outfit">No messages found</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── Menu Form Modal ── */}
      {showMenuModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#150B04] border border-[#D4AF5A]/20 p-8 rounded-xl max-w-md w-full shadow-2xl relative">
            <button onClick={() => setShowMenuModal(false)} className="absolute top-4 right-4 text-[#F5EDD6]/50 hover:text-[#D4AF5A] transition">
              <FiX size={24} />
            </button>
            <h3 className="font-playfair text-2xl text-[#D4AF5A] mb-6">{editingMenu ? 'Edit Menu Item' : 'Add Menu Item'}</h3>
            <form onSubmit={handleMenuSubmit} className="space-y-4">
              <div>
                <label className="block font-outfit text-xs text-[#F5EDD6]/70 mb-1">Name</label>
                <input required type="text" value={menuForm.name} onChange={(e) => setMenuForm({...menuForm, name: e.target.value})} className="w-full bg-[#0F0802] border border-[#D4AF5A]/20 p-2 text-[#F5EDD6] outline-none focus:border-[#D4AF5A] rounded" />
              </div>
              <div>
                <label className="block font-outfit text-xs text-[#F5EDD6]/70 mb-1">Description</label>
                <textarea required value={menuForm.description} onChange={(e) => setMenuForm({...menuForm, description: e.target.value})} className="w-full bg-[#0F0802] border border-[#D4AF5A]/20 p-2 text-[#F5EDD6] outline-none focus:border-[#D4AF5A] rounded resize-none h-20" />
              </div>
              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="block font-outfit text-xs text-[#F5EDD6]/70 mb-1">Price ($)</label>
                  <input required min="0" step="0.01" type="number" value={menuForm.price} onChange={(e) => setMenuForm({...menuForm, price: e.target.value})} className="w-full bg-[#0F0802] border border-[#D4AF5A]/20 p-2 text-[#F5EDD6] outline-none focus:border-[#D4AF5A] rounded" />
                </div>
                <div className="w-1/2">
                  <label className="block font-outfit text-xs text-[#F5EDD6]/70 mb-1">Category</label>
                  <select required value={menuForm.category} onChange={(e) => setMenuForm({...menuForm, category: e.target.value})} className="w-full bg-[#0F0802] border border-[#D4AF5A]/20 p-2.5 text-[#F5EDD6] outline-none focus:border-[#D4AF5A] rounded">
                    <option value="Beverage">Beverage</option>
                    <option value="Pastry">Pastry</option>
                    <option value="Breakfast">Breakfast</option>
                    <option value="Lunch">Lunch</option>
                    <option value="Dessert">Dessert</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block font-outfit text-xs text-[#F5EDD6]/70 mb-1">Image URL</label>
                <input type="text" value={menuForm.imageUrl} onChange={(e) => setMenuForm({...menuForm, imageUrl: e.target.value})} className="w-full bg-[#0F0802] border border-[#D4AF5A]/20 p-2 text-[#F5EDD6] outline-none focus:border-[#D4AF5A] rounded" placeholder="https://..." />
              </div>
              <div className="flex items-center gap-4 pt-2">
                <label className="flex items-center gap-2 font-outfit text-sm text-[#F5EDD6]">
                  <input type="checkbox" checked={menuForm.isAvailable} onChange={(e) => setMenuForm({...menuForm, isAvailable: e.target.checked})} className="accent-[#D4AF5A]" /> Available
                </label>
                <label className="flex items-center gap-2 font-outfit text-sm text-[#F5EDD6]">
                  <input type="checkbox" checked={menuForm.featured} onChange={(e) => setMenuForm({...menuForm, featured: e.target.checked})} className="accent-[#D4AF5A]" /> Featured
                </label>
              </div>
              <button type="submit" className="w-full mt-6 py-3 bg-[#D4AF5A] text-[#0F0802] font-outfit font-bold tracking-widest uppercase text-sm rounded hover:bg-[#F5EDD6] transition-colors">
                {editingMenu ? 'Save Changes' : 'Create Item'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
