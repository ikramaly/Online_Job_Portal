


import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, AlertCircle, CheckCircle2 } from "lucide-react";

const ScoreCard = ({ score }) => {
  // 1. DATA SAFETY GUARD: 
  // If score is NaN, null, or undefined, default it to 0.
  const validatedScore = isNaN(score) || score === null || score === undefined ? 0 : score;

  const isHigh = validatedScore > 70;
  const isMid = validatedScore > 40;

  return (
    <motion.div 
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-lg flex items-center justify-between"
    >
      <div>
        <h2 className="text-slate-500 font-bold text-xs uppercase tracking-[0.2em] mb-1">ATS Compatibility</h2>
        <div className="flex items-baseline gap-2">
          {/* 2. STRING CASTING: 
              We wrap the score in String() to ensure React receives a valid text node. 
          */}
          <span className="md:text-6xl text-3xl font-black text-slate-900 tracking-tighter">
            {String(validatedScore)}
          </span>
          <span className="text-xl font-bold text-slate-400">/100</span>
        </div>
      </div>

      <div className="flex flex-col items-end">
        <div className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm ${
          isHigh ? "bg-emerald-50 text-emerald-600" : isMid ? "bg-amber-50 text-amber-600" : "bg-rose-50 text-rose-600"
        }`}>
          {isHigh ? <CheckCircle2 size={16}/> : <AlertCircle size={16}/>}
          {isHigh ? "Interview Ready" : isMid ? "Needs Polish" : "Critical Fixes"}
        </div>
        <div className="mt-4 flex items-center gap-1 text-[10px] font-black text-slate-400 uppercase">
          <TrendingUp size={12} />
          Top 5% of Applicants
        </div>
      </div>
    </motion.div>
  );
};

export default ScoreCard;