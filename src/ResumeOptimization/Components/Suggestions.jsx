

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Star, Lightbulb } from "lucide-react";

const Suggestions = ({ matchedKeywords = [] }) => {
  // Animation variants for the staggered list effect
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-md">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
            <Star size={20} fill="currentColor" />
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-900 tracking-tight">Verified Expertise</h3>
            <p className="text-slate-500 text-xs font-medium">Core competencies detected in your profile.</p>
          </div>
        </div>
        
        <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-slate-50 rounded-full border border-slate-100">
          <Lightbulb size={14} className="text-amber-500" />
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">ATS Optimized</span>
        </div>
      </div>

      {matchedKeywords.length > 0 ? (
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-wrap gap-3"
        >
          {matchedKeywords.map((skill, index) => (
            <motion.div
              key={index}
              variants={item}
              whileHover={{ scale: 1.05, y: -2 }}
              className="group flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-2xl hover:border-emerald-500 hover:shadow-lg hover:shadow-emerald-500/10 transition-all cursor-default"
            >
              <CheckCircle2 size={16} className="text-emerald-500 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-bold text-slate-700 group-hover:text-emerald-700 uppercase tracking-tight">
                {skill}
              </span>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="py-10 text-center border-2 border-dashed border-slate-100 rounded-[2rem]">
          <p className="text-slate-400 font-medium italic">No matching industry keywords detected.</p>
        </div>
      )}

      <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
          JiViKa Semantic Analysis v4.0
        </p>
        <div className="flex -space-x-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-slate-200" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Suggestions;