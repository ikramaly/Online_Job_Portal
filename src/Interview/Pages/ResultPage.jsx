

import { useLocation, Link } from "react-router-dom";
import { Award, RefreshCcw, Home, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

function ResultPage() {
  const { state } = useLocation();
  const score = state?.score || 0;
  
  const getFeedback = () => {
    if (score >= 3) return { msg: "Expert Level", color: "text-emerald-600", bg: "bg-emerald-50" };
    if (score >= 2) return { msg: "Strong Foundation", color: "text-blue-600", bg: "bg-blue-50" };
    return { msg: "Keep Learning", color: "text-amber-600", bg: "bg-amber-50" };
  };

  const feedback = getFeedback();

  return (
    <div>
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl p-10 text-center border border-slate-100"
      >
        <div className={`w-20 h-20 ${feedback.bg} ${feedback.color} rounded-3xl flex items-center justify-center mx-auto mb-6`}>
          <Award size={40} />
        </div>
        
        <h1 className="text-4xl font-black text-slate-900 mb-2">Test Result</h1>
        <p className={`text-lg font-bold ${feedback.color} uppercase tracking-widest mb-8`}>
          {feedback.msg}
        </p>

        <div className="bg-slate-50 rounded-3xl p-8 mb-8 border border-slate-100 shadow-inner">
          <span className="text-slate-400 text-sm font-bold block mb-1">FINAL SCORE</span>
          <span className="text-6xl font-black text-slate-800">{score}</span>
          <span className="text-slate-400 font-bold">/30</span>
        </div>

        <div className="flex flex-col gap-3">
          <Link to="/services/guidence/interview" className="flex items-center justify-center gap-2 w-full py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100">
            <RefreshCcw size={18} /> Retake Assessment
          </Link>
          <Link to="/services/guidence" className="flex items-center justify-center gap-2 w-full py-4 bg-white text-slate-600 border-2 border-slate-100 rounded-2xl font-bold hover:bg-slate-50 transition-all">
            <Home size={18} /> Back to Home
          </Link>
        </div>
      </motion.div>
    </div>

    </div>
  );
}

export default ResultPage;