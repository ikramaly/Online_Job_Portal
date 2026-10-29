import React from 'react';
import { ShieldAlert, Eye, Lock, Flag, CheckCircle, AlertTriangle, ShieldCheck, ChevronRight } from 'lucide-react';
import Footer from './Footer';
import Navbar from './Navbar';

const SafetyCard = ({ icon, title, description, points }) => (
  <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300">
    <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-6">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
    <p className="text-gray-500 text-sm leading-relaxed mb-6">{description}</p>
    <ul className="space-y-3">
      {points.map((point, i) => (
        <li key={i} className="flex items-start gap-3 text-sm text-gray-700 font-medium">
          <CheckCircle size={16} className="text-emerald-500 mt-0.5 flex-shrink-0" />
          {point}
        </li>
      ))}
    </ul>
  </div>
);

const SafetyCenter = () => {
  return (
    <div>
        <Navbar />
    <div className="min-h-screen bg-[#fcfdfe] pb-20">
      {/* --- HERO SECTION --- */}
      <div className="bg-[#387780] pt-28 pb-40 px-6 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-4 py-2 rounded-full mb-6 border border-emerald-500/20">
            <ShieldCheck size={18} />
            <span className="text-xs font-black uppercase tracking-widest">Verified Safety</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
            Your Safety is Our <span className="text-[#ff9933]">Priority.</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            At JiViKa, we use world-class technology and manual moderation to ensure your job search remains secure, private, and scam-free.
          </p>
        </div>
        {/* Abstract Background Decoration */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-1/4 left-10 w-64 h-64 bg-indigo-500 rounded-full blur-[120px]" />
            <div className="absolute bottom-1/4 right-10 w-64 h-64 bg-[#ff9933] rounded-full blur-[120px]" />
        </div>
      </div>

      {/* --- CORE SAFETY PILLARS --- */}
      <div className="max-w-7xl mx-auto px-6 -mt-20 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <SafetyCard 
            icon={<ShieldAlert size={28} />}
            title="Spotting Scams"
            description="Learn how to identify fraudulent job postings and protect your personal information."
            points={[
              "Never pay for a job interview",
              "Be wary of 'Too good to be true' offers",
              "Check for official company emails"
            ]}
          />
          <SafetyCard 
            icon={<Lock size={28} />}
            title="Data Protection"
            description="We use bank-grade encryption to ensure your resume and contact details are safe."
            points={[
              "End-to-end data encryption",
              "Authorized recruiter access only",
              "No 3rd-party data sharing"
            ]}
          />
          <SafetyCard 
            icon={<Eye size={28} />}
            title="Safe Communication"
            description="Guidelines for interacting with recruiters and scheduling safe interviews."
            points={[
              "Use the JiViKa messaging system",
              "Avoid sharing bank details",
              "Meet in public or official offices"
            ]}
          />
        </div>
      </div>

      {/* --- REPORTING SECTION --- */}
      <div className="max-w-5xl mx-auto px-6 mt-32">
        <div className="bg-rose-50 rounded-[3rem] p-8 md:p-16 border border-rose-100 flex flex-col md:flex-row items-center gap-12">
          <div className="w-24 h-24 bg-rose-100 rounded-3xl flex items-center justify-center text-rose-600 flex-shrink-0 shadow-inner">
            <AlertTriangle size={48} />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl font-black text-gray-900 mb-4">See something suspicious?</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              If you encounter a suspicious job posting, a fake recruiter, or inappropriate behavior, report it immediately. Our safety team reviews every report within 24 hours.
            </p>
            <button className="bg-rose-600 hover:bg-rose-700 text-white px-10 py-4 rounded-2xl font-bold transition-all shadow-lg shadow-rose-200 flex items-center gap-2 mx-auto md:mx-0">
              <Flag size={18} /> Report a Problem
            </button>
          </div>
        </div>
      </div>

      {/* --- SAFETY CHECKLIST --- */}
      <div className="max-w-4xl mx-auto px-6 mt-32">
        <h2 className="text-3xl font-black text-center text-gray-900 mb-12">Job Seeker's Safety Checklist</h2>
        <div className="space-y-4">
          {[
            { title: "Check the Company Profile", detail: "Always view the company's official profile on JiViKa before applying." },
            { title: "Google the Recruiter", detail: "Verify the recruiter on LinkedIn or the company's official staff directory." },
            { title: "Secure Your Identity", detail: "Do not include sensitive info like Aadhar, PAN, or Passport numbers on your resume." },
            { title: "Trust Your Instincts", detail: "If a conversation feels unprofessional or aggressive, stop communicating immediately." }
          ].map((item, index) => (
            <div key={index} className="group p-6 bg-white rounded-2xl border border-gray-100 hover:border-indigo-200 transition-all cursor-default shadow-sm flex items-center justify-between">
              <div className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center text-xs font-bold">{index + 1}</span>
                <div>
                  <h4 className="font-bold text-gray-900">{item.title}</h4>
                  <p className="text-gray-500 text-sm mt-1">{item.detail}</p>
                </div>
              </div>
              <ChevronRight size={20} className="text-gray-300 group-hover:text-indigo-600 transition-all" />
            </div>
          ))}
        </div>
      </div>

      {/* --- FOOTER CTA --- */}
      <div className="text-center mt-32 px-6">
        <h3 className="text-xl font-bold text-gray-400 mb-4 uppercase tracking-[0.3em]">Stay Informed</h3>
        <p className="text-gray-500 mb-8 font-medium">Read our full <span className="text-indigo-600 cursor-pointer hover:underline">Privacy Policy</span> and <span className="text-indigo-600 cursor-pointer hover:underline">Terms of Service</span>.</p>
      </div>
    </div>
    <Footer />
    </div>
  );
};

export default SafetyCenter;