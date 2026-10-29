import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, MessageSquare, GraduationCap, Building2 } from 'lucide-react';
import Footer from './Footer';
import Navbar from './Navbar';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`border-b border-gray-100 transition-all ${isOpen ? 'bg-indigo-50/30' : ''}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-6 px-4 text-left hover:bg-gray-50/50 transition-colors"
      >
        <span className={`font-bold text-lg ${isOpen ? 'text-[#387780]' : 'text-gray-800'}`}>
          {question}
        </span>
        {isOpen ? (
          <ChevronUp className="text-[#387780]" size={20} />
        ) : (
          <ChevronDown className="text-gray-400" size={20} />
        )}
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 pb-6 px-4 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="text-gray-600 leading-relaxed text-base">
          {answer}
        </p>
        <div className="mt-4 flex items-center gap-4">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-tighter">Was this helpful?</p>
            <div className="flex gap-2">
                <button className="text-xs bg-white border border-gray-200 px-2 py-1 rounded hover:bg-emerald-50 hover:border-emerald-200 transition-all">👍 Yes</button>
                <button className="text-xs bg-white border border-gray-200 px-2 py-1 rounded hover:bg-rose-50 hover:border-rose-200 transition-all">👎 No</button>
            </div>
        </div>
      </div>
    </div>
  );
};

const FAQ = () => {
  const [activeTab, setActiveTab] = useState('students');

  const studentFaqs = [
    {
      question: "How do I improve my profile strength?",
      answer: "Complete all sections including your Bio, Skills, and Experience. Profiles with a professional summary and at least 5 skills are 5x more likely to be noticed by recruiters on JiViKa."
    },
    {
      question: "Who can see my uploaded resume?",
      answer: "Your resume is only visible to recruiters of the jobs you explicitly apply for. We value your privacy and do not show your personal contact details to the public."
    },
    {
      question: "What does 'Pending' status mean?",
      answer: "This means the recruiter has received your application but has not yet reviewed it. Once they open your profile, your status may update to 'Shortlisted' or 'Accepted'."
    }
  ];

  const recruiterFaqs = [
    {
      question: "How long does my job posting stay active?",
      answer: "By default, job postings remain active for 30 days. You can manually close a position earlier from your dashboard if you have already found the right candidate."
    },
    {
      question: "How can I filter the best candidates?",
      answer: "Use the 'Applicants' dashboard to filter by specific skills or experience levels. Our system highlights candidates whose skills closely match your job requirements."
    }
  ];

  return (
    <div>
        <Navbar />
    <div className="min-h-screen bg-white py-20 px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#387780]/10 text-[#387780] px-4 py-2 rounded-full mb-4">
            <HelpCircle size={18} />
            <span className="text-sm font-black uppercase tracking-widest">Knowledge Base</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">Frequently Asked Questions</h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Everything you need to know about the JiViKa Job Portal. Can't find an answer? 
            <span className="text-[#387780] font-bold cursor-pointer hover:underline"> Contact our team.</span>
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex p-1 bg-gray-100 rounded-2xl mb-12 max-w-md mx-auto">
          <button
            onClick={() => setActiveTab('students')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all ${
              activeTab === 'students' ? 'bg-white text-[#387780] shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <GraduationCap size={20} /> For Students
          </button>
          <button
            onClick={() => setActiveTab('recruiters')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all ${
              activeTab === 'recruiters' ? 'bg-white text-[#387780] shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Building2 size={20} /> For Recruiters
          </button>
        </div>

        {/* FAQ List */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-2xl shadow-gray-200/50 overflow-hidden">
          {activeTab === 'students' ? (
            studentFaqs.map((faq, index) => <FAQItem key={index} {...faq} />)
          ) : (
            recruiterFaqs.map((faq, index) => <FAQItem key={index} {...faq} />)
          )}
        </div>

        {/* Bottom Contact Section */}
        <div className="mt-20 p-10 bg-[#387780] rounded-[3rem] text-center text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-2">Still have questions?</h2>
            <p className="text-indigo-100 mb-8">If you cannot find an answer in our FAQ, you can always contact us. We will answer you shortly!</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-[#ff9933] hover:bg-[#e68a2e] text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-[#ff9933]/20 flex items-center justify-center gap-2 mx-auto sm:mx-0">
                    <MessageSquare size={18} /> Support Chat
                </button>
                <button className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-3 rounded-xl font-bold transition-all backdrop-blur-sm">
                    Email support@jivika.com
                </button>
            </div>
          </div>
          {/* Decorative Circle Backgrounds */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-black/5 rounded-full blur-3xl" />
        </div>

      </div>
    </div>
    <Footer />
    </div>
  );
};

export default FAQ;