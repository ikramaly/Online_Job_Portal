import React, { useState } from "react";
import { 
  FileText, 
  BookOpen, 
  Users, 
  TrendingUp, 
  Download, 
  Search, 
  ArrowRight,
  ShieldCheck,
  Zap,
  Lightbulb
} from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";

const HrResources = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
    { id: 'templates', label: 'Job Templates', icon: <FileText size={18} /> },
    { id: 'guides', label: 'Hiring Guides', icon: <BookOpen size={18} /> },
    { id: 'trends', label: 'Market Trends', icon: <TrendingUp size={18} /> },
    { id: 'compliance', label: 'Legal & Compliance', icon: <ShieldCheck size={18} /> },
  ];

  const resources = [
    {
      title: "Perfect Job Description Template",
      category: "templates",
      desc: "A plug-and-play template designed to attract top-tier engineering talent.",
      type: "PDF Document",
      icon: <FileText className="text-blue-500" />
    },
    {
      title: "2026 Tech Salary Report",
      category: "trends",
      desc: "Comprehensive data on global compensation benchmarks for the tech industry.",
      type: "Interactive Report",
      icon: <TrendingUp className="text-green-500" />
    },
    {
      title: "Diversity & Inclusion Playbook",
      category: "guides",
      desc: "How to build unbiased hiring pipelines and inclusive work cultures.",
      type: "E-Book",
      icon: <Users className="text-purple-500" />
    },
    {
      title: "Interview Scorecard Creator",
      category: "templates",
      desc: "Standardize your interview process with our custom evaluation logic.",
      type: "Tool",
      icon: <Zap className="text-orange-500" />
    }
  ];

  return (
    <div className="min-h-screen bg-[#fcfcfc]">
      <Navbar />
      
      {/* --- HERO SECTION --- */}
      <div className="pt-32 pb-20 bg-slate-900 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter">
              The Employer <span className="text-[#ff9933]">Playbook.</span>
            </h1>
            <p className="text-xl text-slate-400 mb-10 leading-relaxed">
              Master the art of hiring with JiViKa’s curated resources, 
              data-driven insights, and professional toolkits.
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-xl group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#ff9933] transition-colors" size={20} />
              <input 
                type="text"
                placeholder="Search templates, guides, or reports..."
                className="w-full bg-white/10 border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-white outline-none focus:ring-4 focus:ring-[#387780]/20 backdrop-blur-md transition-all"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </motion.div>
        </div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#387780]/20 rounded-full blur-[120px] -mr-40 -mt-40"></div>
      </div>

      {/* --- CATEGORY SELECTOR --- */}
      <div className="max-w-7xl mx-auto px-6 -mt-8 relative z-20">
        <div className="flex flex-wrap gap-4">
          {categories.map((cat) => (
            <button 
              key={cat.id}
              className="bg-white border border-slate-100 px-6 py-4 rounded-2xl shadow-lg flex items-center gap-3 font-bold text-slate-700 hover:border-[#387780] hover:text-[#387780] transition-all"
            >
              <span className="text-[#ff9933]">{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* --- RESOURCE GRID --- */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Featured Article (Double Width) */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="lg:col-span-2 bg-gradient-to-br from-[#387780] to-slate-800 rounded-[3rem] p-10 text-white flex flex-col justify-between group cursor-pointer shadow-2xl"
          >
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Lightbulb className="text-[#ff9933]" />
                <span className="text-xs font-black uppercase tracking-[0.2em] opacity-70">Featured Guide</span>
              </div>
              <h2 className="text-4xl font-black mb-4 leading-tight">How to Scale Your Engineering Team from 1 to 100</h2>
              <p className="text-slate-300 max-w-lg text-lg">A deep dive into the organizational structures and hiring strategies used by Silicon Valley's fastest-growing startups.</p>
            </div>
            <div className="mt-12 flex items-center gap-4 font-bold">
              <span>Read Full Guide</span>
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-[#ff9933] transition-all">
                <ArrowRight size={20} />
              </div>
            </div>
          </motion.div>

          {/* Individual Resources */}
          {resources.map((item, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -10 }}
              className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col justify-between hover:shadow-xl transition-all"
            >
              <div>
                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-6">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-black text-slate-800 mb-3">{item.title}</h3>
                <p className="text-slate-500 font-medium text-sm leading-relaxed mb-6">{item.desc}</p>
              </div>
              <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.type}</span>
                <button className="text-[#387780] hover:text-[#ff9933] transition-colors">
                  <Download size={20} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- NEWSLETTER CTA --- */}
      <section className="pb-32 px-6">
        <div className="max-w-7xl mx-auto bg-slate-50 rounded-[4rem] p-12 md:p-20 text-center border border-slate-100">
           <h2 className="text-4xl font-black text-slate-900 mb-4">Stay ahead of the curve.</h2>
           <p className="text-slate-500 mb-10 max-w-xl mx-auto font-medium">Join 5,000+ HR leaders receiving our weekly brief on talent acquisition and global hiring trends.</p>
           <div className="flex flex-col sm:flex-row max-w-lg mx-auto gap-3">
              <input 
                type="email" 
                placeholder="Work email address" 
                className="flex-1 px-6 py-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-[#387780]/10 outline-none font-bold"
              />
              <button className="bg-slate-900 text-white font-black px-8 py-4 rounded-2xl hover:bg-[#387780] transition-all">
                Subscribe
              </button>
           </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HrResources;