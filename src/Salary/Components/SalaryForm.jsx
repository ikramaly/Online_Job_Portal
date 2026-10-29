
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, MapPin, Code2, Sparkles } from 'lucide-react';

const SalaryForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({ skills: "", experience: 0, location: "Tier1" });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      skills: formData.skills.split(",").map((s) => s.trim()).filter(s => s !== ""),
      experience: Number(formData.experience)
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 backdrop-blur-xl p-8 rounded-[2.5rem] shadow-2xl border border-slate-100 max-w-xl mx-auto"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 flex items-center gap-2 ml-1">
            <Code2 size={16} className="text-blue-600" /> Technical Skills
          </label>
          <input
            type="text"
            placeholder="React, Node.js, AWS..."
            className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-blue-500/10 transition-all outline-none font-medium"
            onChange={(e) => setFormData({...formData, skills: e.target.value})}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 flex items-center gap-2 ml-1">
              <Briefcase size={16} className="text-blue-600" /> Experience (Yrs)
            </label>
            <input
              type="number"
              min="0"
              className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-blue-500/10 transition-all outline-none font-medium"
              onChange={(e) => setFormData({...formData, experience: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 flex items-center gap-2 ml-1">
              <MapPin size={16} className="text-blue-600" /> Location
            </label>
            <select 
              className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-blue-500/10 transition-all outline-none font-medium appearance-none"
              onChange={(e) => setFormData({...formData, location: e.target.value})}
            >
              <option value="Tier1">Tier 1 (Metro)</option>
              <option value="Tier2">Tier 2 (City)</option>
              <option value="Tier3">Tier 3 (Town)</option>
            </select>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-lg shadow-xl shadow-slate-200 flex items-center justify-center gap-3 hover:bg-blue-600 transition-colors"
        >
          <Sparkles size={20} /> Calculate My Value
        </motion.button>
      </form>
    </motion.div>
  );
};

export default SalaryForm;