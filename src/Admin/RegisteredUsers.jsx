

import React, { useEffect, useState } from "react";
import { Search, Mail, ChevronLeft, ChevronRight, Phone, Trash2, UserX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../Navbar";
import Footer from "../Footer";
import axios from "axios";
import { USER_API_END_POINT } from "../Utils/Constant";
import { toast } from "react-toastify";

const RegisteredUsers = () => {
  const [users, setUsers] = useState([]);
  const [filterUsers, setFilterUsers] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // 1. Fetch Users
  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/all`, { withCredentials: true });
      if (res.data.success) {
        setUsers(res.data.users);
        setFilterUsers(res.data.users);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // 2. Delete User Logic
  const deleteUserHandler = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user? This action cannot be undone.")) return;

    try {
      const res = await axios.delete(`${USER_API_END_POINT}/delete/${userId}`, { withCredentials: true });
      if (res.data.success) {
        toast.success(res.data.message);
        // Update local state so the user disappears immediately
        setUsers(users.filter(user => user._id !== userId));
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete user");
    }
  };


// 2. Filter Logic
useEffect(() => {
  const filtered = users.filter((user) => {
    const name = user?.fullname?.toLowerCase() || "";
    const email = user?.email?.toLowerCase() || "";
    
    // ✅ Convert to string first to prevent "includes is not a function"
    const phone = String(user?.phoneNumber || ""); 
    
    return (
      name.includes(searchInput.toLowerCase()) || 
      email.includes(searchInput.toLowerCase()) ||
      phone.includes(searchInput)
    );
  });
  setFilterUsers(filtered);
  setCurrentPage(1);
}, [searchInput, users]);

  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentItems = filterUsers.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(filterUsers.length / itemsPerPage);

  return (
    <div className="min-h-screen bg-[#fcfcfc]">
      <Navbar />
      <div className="max-w-7xl mx-auto pt-28 px-4 sm:px-6 mb-20">
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">
              User <span className="text-[#387780]">Management</span>
            </h1>
            <p className="text-slate-500 font-medium mt-1">Review, contact, or remove accounts from the JiViKa database.</p>
          </div>

          <div className="relative w-full lg:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Filter database..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full pl-12 pr-6 py-4 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-[#387780]/10 font-bold transition-all"
            />
          </div>
        </div>

        <div className="bg-white rounded-[2rem] border border-slate-100 shadow-xl overflow-x-auto">
          <table className="w-full text-left min-w-[900px]">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.15em] text-slate-400">Identity</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.15em] text-slate-400">Contact</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.15em] text-slate-400">Role</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              <AnimatePresence mode="popLayout">
                {currentItems.length > 0 ? (
                  currentItems.map((user, idx) => (
                    <motion.tr 
                      key={user._id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="hover:bg-slate-50/50 transition-colors group"
                    >
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-900 flex items-center justify-center font-black text-xs border border-slate-200">
                            {user.fullname?.charAt(0)}
                          </div>
                          <div>
                            <p className="font-black text-slate-800 leading-none mb-1">{user.fullname}</p>
                            <p className="text-xs text-slate-400 font-bold">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-2 text-slate-600 font-bold text-sm">
                          <Phone size={14} className="text-[#387780]" />
                          {user.phoneNumber}
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <span className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider ${
                          user.role === 'recruiter' ? 'bg-orange-100 text-[#ff9933]' : 'bg-[#387780]/10 text-[#387780]'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <div className="flex justify-end gap-2">
                          <button 
                            onClick={() => window.location.href = `mailto:${user.email}`}
                            className="p-2 bg-slate-50 text-slate-400 hover:text-[#387780] hover:bg-white rounded-lg border border-transparent hover:border-[#387780]/20 transition-all"
                            title="Send Email"
                          >
                            <Mail size={18} />
                          </button>
                          <button 
                            onClick={() => deleteUserHandler(user._id)}
                            className="p-2 bg-slate-50 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg border border-transparent hover:border-red-200 transition-all"
                            title="Delete User"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="py-20 text-center">
                      <div className="flex flex-col items-center opacity-20">
                        <UserX size={48} className="mb-2" />
                        <p className="font-black uppercase tracking-widest text-xs">No users found</p>
                      </div>
                    </td>
                  </tr>
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {/* Stats & Pagination (Same as before) */}
        <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            Showing {currentItems.length} of {filterUsers.length} total entries
          </p>
          <div className="flex items-center gap-2">
            <button 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => prev - 1)}
              className="p-3 rounded-xl bg-white border border-slate-200 hover:border-[#387780] transition-colors disabled:opacity-20"
            >
              <ChevronLeft size={20} />
            </button>
            <span className="px-6 font-black text-sm text-slate-700">Page {currentPage} of {totalPages}</span>
            <button 
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => prev + 1)}
              className="p-3 rounded-xl bg-white border border-slate-200 hover:border-[#387780] transition-colors disabled:opacity-20"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RegisteredUsers;