

import React from "react";
import { motion } from "framer-motion";

const ProgressBar = ({ score }) => {
  const getColor = () => {
    if (score > 70) return "#10b981"; // Emerald-500
    if (score > 40) return "#f59e0b"; // Amber-500
    return "#ef4444"; // Rose-500
  };

  return (
    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-md">
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm font-black text-slate-900 uppercase">Analysis Completion</span>
        <span className="text-sm font-bold text-slate-500">{score}%</span>
      </div>
      <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden p-1">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 1.5, ease: "circOut" }}
          style={{ backgroundColor: getColor() }}
          className="h-full rounded-full shadow-lg shadow-emerald-500/20"
        />
      </div>
    </div>
  );
};

export default ProgressBar;