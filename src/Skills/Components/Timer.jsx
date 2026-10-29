

import { Clock } from "lucide-react";

function Timer({ timeLeft }) {
  const isCritical = timeLeft < 60;
  
  // Format seconds into MM:SS
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className={`flex items-center gap-3 px-6 py-3 rounded-2xl border-2 transition-all duration-500 ${
      isCritical 
      ? "bg-red-50 border-red-200 text-red-600 animate-pulse" 
      : "bg-white border-slate-100 text-slate-700"
    }`}>
      <Clock size={20} className={isCritical ? "text-red-500" : "text-blue-500"} />
      <span className="font-mono text-xl font-black">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </span>
    </div>
  );
}

export default Timer;