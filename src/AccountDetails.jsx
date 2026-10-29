import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Bell, Camera, ShieldCheck, Save } from 'lucide-react';

const AccountDetails = () => {
  const [activeTab, setActiveTab] = useState('personal');

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-black text-slate-900 mb-2">Account Settings</h1>
        <p className="text-slate-500 font-medium mb-10">Manage your personal information and security preferences.</p>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="md:w-1/4 flex flex-col gap-2">
            <TabButton 
              active={activeTab === 'personal'} 
              onClick={() => setActiveTab('personal')}
              icon={<User size={18} />} 
              label="Personal Info" 
            />
            <TabButton 
              active={activeTab === 'security'} 
              onClick={() => setActiveTab('security')}
              icon={<Lock size={18} />} 
              label="Security" 
            />
            <TabButton 
              active={activeTab === 'notifications'} 
              onClick={() => setActiveTab('notifications')}
              icon={<Bell size={18} />} 
              label="Notifications" 
            />
          </div>

          {/* Content Area */}
          <motion.div 
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="md:w-3/4 bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 p-8 md:p-12"
          >
            {activeTab === 'personal' && (
              <div className="space-y-8">
                {/* Avatar Upload */}
                <div className="flex items-center gap-6">
                  <div className="relative group">
                    <div className="w-24 h-24 rounded-3xl bg-slate-100 flex items-center justify-center overflow-hidden border-4 border-white shadow-lg">
                      <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Avatar" />
                    </div>
                    <button className="absolute -bottom-2 -right-2 p-2 bg-[#387780] text-white rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                      <Camera size={16} />
                    </button>
                  </div>
                  <div>
                    <h3 className="font-black text-slate-800 text-xl">Profile Picture</h3>
                    <p className="text-slate-400 text-sm font-medium">PNG or JPG. Max 2MB.</p>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-black text-slate-600 ml-1">Full Name</label>
                    <input type="text" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-slate-100 focus:border-[#387780] outline-none transition-all font-bold" defaultValue="Admin User" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-black text-slate-600 ml-1">Email Address</label>
                    <input type="email" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-slate-100 focus:border-[#387780] outline-none transition-all font-bold" defaultValue="admin@jivika.com" />
                  </div>
                </div>

                <button className="flex items-center gap-2 bg-[#387780] text-white px-8 py-4 rounded-2xl font-black shadow-lg shadow-[#387780]/20 hover:bg-[#2c5e65] transition-all">
                  <Save size={18} /> Update Profile
                </button>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-8">
                <div className="p-6 bg-[#eef6f7] rounded-3xl border border-[#387780]/10 flex items-start gap-4">
                  <ShieldCheck className="text-[#387780] mt-1" />
                  <div>
                    <h4 className="font-black text-slate-800">Two-Factor Authentication</h4>
                    <p className="text-slate-500 text-sm font-medium">Add an extra layer of security to your JiViKa account.</p>
                  </div>
                </div>
                {/* Password fields would go here */}
                <p className="text-slate-400 font-bold text-center py-10">Security configurations are encrypted and private.</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

/* Helper Component */
const TabButton = ({ active, onClick, icon, label }) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-black transition-all ${
      active 
      ? 'bg-[#387780] text-white shadow-lg shadow-[#387780]/20 translate-x-2' 
      : 'text-slate-400 hover:bg-slate-100 hover:text-slate-600'
    }`}
  >
    {icon} {label}
  </button>
);

export default AccountDetails;