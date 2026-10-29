

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileSearch, Sparkles, LayoutDashboard} from "lucide-react";
import FileUpload from "../Components/FileUpload";
import ScoreCard from "../Components/ScoreCard";
import ProgressBar from "../Components/ProgressBar";
import Suggestions from "../Components/Suggestions";
import { useResumeAnalyzer } from "../Hooks/useResumeAnalyzer";
import { Link } from "react-router";
import Footer from "../../Footer";
import Navbar from "../../Navbar";

const ResumeAnalyzerPage = () => {
  const { score, matchedKeywords, loading, analyzeResume } = useResumeAnalyzer();

  return (
    <div>
        <Navbar />
    <div className="min-h-screen bg-[#f8fafc] p-6 lg:p-12 font-sans">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto"
      >
        {/* Header Section */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="text-blue-600" size={20} />
              <span className="text-xs font-black uppercase tracking-widest text-blue-600">AI Powered Analysis</span>
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Resume Intelligence</h1>
            <p className="text-slate-500 font-medium mt-1">Optimize your profile for 2026 ATS standards.</p>
          </div>
          
          <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white">
              <LayoutDashboard size={18} />
            </div>
            <Link to= "/">
            <span  className="text-sm font-bold text-slate-700">JiViKa Portal</span>
            </Link>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Upload */}
          <div className="lg:col-span-5">
            <motion.div 
              whileHover={{ scale: 1.01 }}
              className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/50 relative overflow-hidden"
            >
              <div className="relative z-10">
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 text-blue-600">
                  <FileSearch size={28} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Upload Resume</h3>
                <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                  Upload your PDF. Our AI will scan for keywords, formatting, and industry alignment.
                </p>
                <FileUpload onUpload={analyzeResume} loading={loading} />
              </div>
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-blue-50 rounded-full blur-3xl opacity-50" />
            </motion.div>
          </div>

          {/* Right Column: Results */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div 
                  key="loading"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="h-full flex flex-col items-center justify-center bg-white rounded-[2.5rem] border border-dashed border-slate-300 p-20"
                >
                  <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4" />
                  <p className="font-bold text-slate-900">Scanning Document...</p>
                </motion.div>
              ) : score !== null ? (
                <motion.div 
                  key="results"
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <ScoreCard score={score} />
                  <ProgressBar score={score} />
                  <Suggestions matchedKeywords={matchedKeywords} />
                </motion.div>
              ) : (
                <div className="h-full flex items-center justify-center border-2 border-dashed border-slate-200 rounded-[2.5rem] text-slate-400 p-20 text-center">
                  <p className="font-medium italic">Your analysis results will appear here.</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
    <Footer />
    </div>
  );
};

export default ResumeAnalyzerPage;