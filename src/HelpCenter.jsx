import React, { useState } from 'react';
import { Search, BookOpen, User, ShieldCheck, HelpCircle, MessageCircle, ArrowRight, LifeBuoy } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

const HelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    {
      icon: <User className="text-blue-600" size={32} />,
      title: "Account & Profile",
      desc: "Managing your account settings, privacy, and profile updates.",
      articles: ["Changing your password", "Verifying your email", "Profile visibility"]
    },
    {
      icon: <BookOpen className="text-emerald-600" size={32} />,
      title: "Job Applications",
      desc: "Everything about finding jobs and tracking your applications.",
      articles: ["How to apply for a job", "Tracking status", "Withdrawing applications"]
    },
    {
      icon: <ShieldCheck className="text-indigo-600" size={32} />,
      title: "Security & Privacy",
      desc: "How we protect your data and tips for staying safe online.",
      articles: ["Two-factor authentication", "Reporting scams", "Data protection policy"]
    },
    {
      icon: <LifeBuoy className="text-rose-600" size={32} />,
      title: "Troubleshooting",
      desc: "Technical issues, browser compatibility, and bug reporting.",
      articles: ["Page not loading", "Resume upload errors", "Login issues"]
    }
  ];

  return (
    <div>
        <Navbar />
    <div className="min-h-screen bg-[#f8fafc]">
      {/* --- HERO SECTION --- */}
      <div className="bg-[#387780] pt-24 pb-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
            How can we help you today?
          </h1>
          <p className="text-indigo-100 text-lg mb-10 max-w-2xl mx-auto">
            Search our knowledge base for answers to your questions or browse popular topics below.
          </p>
          
          {/* Global Search Bar */}
          <div className="relative max-w-2xl mx-auto group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#387780] transition-colors" size={24} />
            <input 
              type="text"
              placeholder="Search for articles (e.g. 'how to apply')"
              className="w-full pl-14 pr-6 py-5 rounded-2xl shadow-2xl outline-none text-gray-800 text-lg border-none ring-0 focus:ring-4 focus:ring-white/20 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* --- CATEGORIES GRID --- */}
      <div className="max-w-7xl mx-auto px-6 -mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((cat, index) => (
            <div key={index} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
              <div className="mb-6 p-4 bg-gray-50 rounded-2xl inline-block group-hover:bg-white group-hover:shadow-md transition-all">
                {cat.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{cat.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                {cat.desc}
              </p>
              <ul className="space-y-3">
                {cat.articles.map((art, i) => (
                  <li key={i} className="flex items-center text-sm font-semibold text-gray-700 hover:text-[#387780] cursor-pointer">
                    <ArrowRight size={14} className="mr-2 text-gray-300" /> {art}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* --- POPULAR ARTICLES SECTION --- */}
      <div className="max-w-5xl mx-auto px-6 py-24">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-2xl font-bold text-gray-900">Recommended for you</h2>
          <button className="text-[#387780] font-bold text-sm hover:underline">View all articles</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            "How to stand out to recruiters?",
            "Understanding Job Status labels",
            "Setting up job alerts for new openings",
            "Is my personal information safe?"
          ].map((text, i) => (
            <div key={i} className="flex items-center p-6 bg-white rounded-2xl border border-gray-100 hover:border-indigo-200 cursor-pointer transition-colors shadow-sm">
              <HelpCircle className="text-gray-300 mr-4" size={20} />
              <span className="font-semibold text-gray-700">{text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* --- CONTACT SUPPORT CTA --- */}
      <div className="bg-white border-t border-gray-100 py-20 px-6">
        <div className="max-w-3xl mx-auto bg-indigo-50 rounded-[3rem] p-12 text-center border border-indigo-100">
          <div className="w-16 h-16 bg-indigo-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-indigo-200">
            <MessageCircle size={32} />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Still need help?</h2>
          <p className="text-gray-600 mb-8">
            Can't find what you're looking for? Our support team is available 24/7 to assist you with any questions.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="px-10 py-4 bg-gray-900 text-white rounded-2xl font-bold hover:bg-black transition-all shadow-xl shadow-gray-200">
              Contact Support
            </button>
            <button className="px-10 py-4 bg-white text-gray-900 border border-gray-200 rounded-2xl font-bold hover:bg-gray-50 transition-all">
              Live Chat
            </button>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </div>
  );
};

export default HelpCenter;