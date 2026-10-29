
import React from 'react';
import { motion } from 'framer-motion';
import { formatSalary } from "../Utils/salaryUtils";
import { Info, CheckCircle2, AlertCircle } from 'lucide-react';

const SalaryCard = ({ min, max, confidence }) => {
  const getBadgeConfig = (conf) => {
    if (conf === "High") return { color: "bg-emerald-500", icon: <CheckCircle2 size={14}/> };
    if (conf === "Medium") return { color: "bg-amber-500", icon: <Info size={14}/> };
    return { color: "bg-rose-500", icon: <AlertCircle size={14}/> };
  };

  const config = getBadgeConfig(confidence);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="mt-12 bg-white p-10 rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] text-center border border-slate-50 relative overflow-hidden"
    >
      {/* Decorative Gradient Background */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
      
      <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px] mb-4">Market Valuation Result</p>
      
      <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-2 tracking-tight">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
          {formatSalary(min)}
        </span>
        <span className="mx-3 text-slate-200">—</span>
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
          {formatSalary(max)}
        </span>
      </h2>
      
      <p className="text-slate-500 font-medium mb-8">Estimated Annual CTC range based on your profile.</p>

      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-100">
        <span className={`w-2 h-2 rounded-full ${config.color} animate-pulse`} />
        <span className="text-xs font-black text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
          {config.icon} {confidence} Confidence
        </span>
      </div>
    </motion.div>
  );
};

export default SalaryCard;