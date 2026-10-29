
import { motion } from "framer-motion";

function ProgressBar({ current, total }) {
  const progress = (current / total) * 100;

  return (
    <div className="w-full max-w-2xl mb-8">
      <div className="flex justify-between items-end mb-2">
        <span className="text-sm font-bold text-slate-500">Progress</span>
        <span className="text-xs font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
          {Math.round(progress)}% Complete
        </span>
      </div>
      <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-blue-500 to-indigo-600"
        />
      </div>
    </div>
  );
}

export default ProgressBar;