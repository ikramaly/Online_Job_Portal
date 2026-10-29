import React from 'react';
import { ShieldCheck, Lock, Eye, FileText, Globe, Bell } from "lucide-react";
import Navbar from './Navbar';
import Footer from './Footer';

const PrivacyPolicy = () => {
  const lastUpdated = "January 2026";

  const sections = [
    {
      icon: <Eye className="text-[#387780] w-6 h-6" />,
      title: "Information We Collect",
      content: "We collect information you provide directly to us, such as when you create an account, upload a resume, or communicate with employers. This includes your name, email, phone number, and professional history."
    },
    {
      icon: <Lock className="text-[#387780] w-6 h-6" />,
      title: "How We Use Your Data",
      content: "JiViKa uses your data to match job seekers with relevant opportunities, facilitate communication between recruiters and candidates, and improve our search algorithms to provide a better user experience."
    },
    {
      icon: <Globe className="text-[#387780] w-6 h-6" />,
      title: "Data Sharing",
      content: "Your profile and resume are visible to registered recruiters when you apply for a position. We do not sell your personal information to third-party advertisers."
    },
    {
      icon: <ShieldCheck className="text-[#387780] w-6 h-6" />,
      title: "Security Measures",
      content: "We implement industry-standard security protocols, including encryption and secure socket layers (SSL), to protect your data from unauthorized access or disclosure."
    }
  ];

  return (
    <div>
        <Navbar />
  
    <div className="bg-gray-50 min-h-screen py-16 px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
        
        {/* Header Section */}
        <div className="bg-[#387780] p-10 text-white text-center">
          <div className="inline-block p-3 bg-white/20 rounded-2xl mb-4">
            <ShieldCheck size={40} />
          </div>
          <h1 className="text-4xl font-black mb-2">Privacy Policy</h1>
          <p className="text-gray-100 opacity-90">Last Updated: {lastUpdated}</p>
        </div>

        <div className="p-8 md:p-12 space-y-12">
          
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Introduction</h2>
            <p className="text-gray-600 leading-relaxed">
              Welcome to <strong>JiViKa</strong>. Your privacy is paramount to us. This Privacy Policy explains how we collect, use, and protect your personal information when you use our job portal services. By using JiViKa, you agree to the terms outlined in this document.
            </p>
          </section>

          {/* Icon Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {sections.map((section, index) => (
              <div key={index} className="flex gap-4 p-5 rounded-2xl border border-gray-100 hover:shadow-md transition">
                <div className="shrink-0">{section.icon}</div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">{section.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{section.content}</p>
                </div>
              </div>
            ))}
          </div>

          <hr className="border-gray-100" />

          {/* Specific Rights Section */}
          <section className="bg-[#387780]/5 p-6 rounded-2xl">
            <h2 className="text-xl font-bold text-[#387780] flex items-center gap-2 mb-4">
              <FileText size={20} /> Your Rights & Choices
            </h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2 text-sm">
              <li>You can update or delete your profile information at any time.</li>
              <li>You can set your profile to 'Private' to hide it from search results.</li>
              <li>You can opt-out of marketing emails via your account settings.</li>
              <li>You may request a copy of the personal data we hold about you.</li>
            </ul>
          </section>

          {/* Contact Section */}
          <section className="text-center pb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Questions?</h2>
            <p className="text-gray-600 mb-6">
              If you have any questions regarding this policy, please contact our privacy team.
            </p>
            <a 
              href="mailto:jivikacommunity@gmail.com" 
              className="bg-[#ff9933] text-white px-8 py-3 rounded-full font-bold hover:bg-[#e68a00] transition inline-block"
            >
              Contact Support
            </a>
          </section>
        </div>
      </div>
    </div>
    <Footer />
      </div>
  );
};

export default PrivacyPolicy;