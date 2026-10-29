import React from 'react';
import { 
  Video, 
  FileCheck, 
  Target, 
  MessageSquare, 
  Award, 
  TrendingUp,
  ArrowRight,
  Users
} from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Link } from 'react-router';

const Guidence = () => {
  const coachingServices = [
    {
      title: "Interview Mastery",
      description: "1-on-1 mock interviews with industry experts from top tech firms. Get real-time feedback and confidence.",
      icon: <Video className="text-blue-600" size={24} />,
      tag: "Popular",
      color: "bg-blue-50",
      link: "/services/guidence/interview",
    },
    {
      title: "Resume Optimization",
      description: "Our experts will review your JiViKa-generated resume to ensure it passes ATS filters and grabs attention.",
      icon: <FileCheck className="text-emerald-600" size={24} />,
      tag: "Essential",
      color: "bg-emerald-50",
      link : "/services/guidence/resumeoptimization",
    },
    {
      title: "Career Strategy",
      description: "Not sure where to head? Map out your 5-year plan with senior mentors who have been in your shoes.",
      icon: <Target className="text-purple-600" size={24} />,
      tag: "Pro",
      color: "bg-purple-50",
      link: "/services/guidence/career"
    },
    {
      title: "Salary Negotiation",
      description: "Learn the art of negotiation to ensure you get the package you deserve. Increase your offer by up to 20%.",
      icon: <TrendingUp className="text-orange-600" size={24} />,
      tag: "High Value",
      color: "bg-orange-50",
      link: "/services/guidence/salary"
    }
  ];

  return (
    <div>
        <Navbar />
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      {/* --- Header Section --- */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider mb-4">
          <Award size={14} /> JiViKa Mentor Network
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-6">
          Accelerate Your <span className="text-blue-600">Career Growth</span>
        </h1>
        <p className="text-slate-600 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
          Connect with top-tier coaches to sharpen your skills, polish your profile, and land your dream job at international standards.
        </p>
      </div>

      {/* --- Services Grid --- */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
        {coachingServices.map((service, index) => (
          <Link to = {service.link}>
          <div 
            key={index} 
            className="group bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
          >
            <div className={`w-14 h-14 ${service.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
              {service.icon}
            </div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{service.tag}</span>
            
            <h3 className="text-xl font-bold text-slate-800 mt-1 mb-3">{service.title}</h3>
           
            <p className="text-slate-500 text-sm leading-relaxed mb-6">
              {service.description}
            </p>
            {/* <button className="flex items-center gap-2 text-blue-600 font-bold text-sm group-hover:gap-4 transition-all">
              Book Session <ArrowRight size={16} />
            </button> */}
          </div>
           </Link>
        ))}
      </div>

      {/* --- Stats / Social Proof Section --- */}
      <div className="max-w-5xl mx-auto bg-slate-900 rounded-[2.5rem] p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex flex-col gap-2 text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-bold">Join 5,000+ Students</h2>
          <p className="text-slate-400 text-sm">Who have successfully transitioned to international roles.</p>
        </div>
        
        <div className="flex -space-x-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="w-12 h-12 rounded-full border-4 border-slate-900 bg-slate-700 flex items-center justify-center overflow-hidden">
              <img src={`https://i.pravatar.cc/150?u=${i}`} alt="user" />
            </div>
          ))}
          <div className="w-12 h-12 rounded-full border-4 border-slate-900 bg-blue-600 flex items-center justify-center text-xs font-bold">
            +2k
          </div>
        </div>

        <button className="bg-white text-slate-900 px-8 py-4 rounded-2xl font-bold hover:bg-blue-50 transition-colors shadow-lg shadow-white/5">
          Get Started Now
        </button>
      </div>

      {/* --- FAQ / Help CTA --- */}
      <div className="max-w-7xl mx-auto mt-20 text-center">
        <div className="flex flex-col items-center gap-4">
          <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-200">
            <MessageSquare className="text-blue-600" />
          </div>
          <h3 className="text-lg font-bold text-slate-800">Still have questions?</h3>
          <p className="text-slate-500 text-sm italic">"Our support team is available 24/7 to help you choose the right path."</p>
          <button className="underline text-blue-600 font-semibold text-sm mt-2">
            Chat with a Career Advisor
          </button>
        </div>
      </div>
      </div>
      <Footer />
    </div>
  );
};

export default Guidence;