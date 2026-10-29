

import React from 'react';
import { Link } from "react-router";
import { Mail, Phone, MapPin } from "lucide-react";
import { useSelector } from 'react-redux'; 
import github from "./github.png";
import linkedin from "./linkedin.png";
import facebook from "./facebook.png";

const Footer = () => {
  const { user } = useSelector((store) => store.user);

  // This variable will always hold the current year based on the user's system clock
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#387780] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        
        {/* Column 1: Brand & About */}
        <div>
          <div className="text-3xl font-extrabold tracking-wider mb-6">
            <span className="text-[#ff9933] text-5xl">J</span>iViKa
          </div>
          <p className="text-gray-200 leading-relaxed mb-6">
            Connecting talent with opportunity. JiViKa is your trusted partner in finding the career you deserve.
          </p>
          <div className="flex space-x-2">
            <a href="https://github.com/ManishNayak-123" target="_blank" rel="noreferrer">
              <img className="h-12 w-12 rounded-full border-2 border-transparent hover:border-[#ff9933] transition-all" src={github} alt="github" />
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">
              <img className="h-12 w-12 rounded-full border-2 border-transparent hover:border-[#ff9933] transition-all" src={linkedin} alt="linkedin" />
            </a>
            <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
              <img className="h-12 w-12 rounded-full border-2 border-transparent hover:border-[#ff9933] transition-all" src={facebook} alt="facebook" />
            </a>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h4 className="text-xl font-bold mb-6 border-b-2 border-[#ff9933] inline-block">Quick Links</h4>
          <ul className="space-y-4">
            <li><Link to="/" className="hover:text-[#ff9933] transition">Home</Link></li>
            <li><Link to="/job-seekers" className="hover:text-[#ff9933] transition">Find Jobs</Link></li>
            <li><Link to="/job-seekers" className="hover:text-[#ff9933] transition">Browse Companies</Link></li>
            <li><Link to="/about-us" className="hover:text-[#ff9933] transition">About Us</Link></li>
          </ul>
        </div>

        {/* Column 3: For Employers - CONDITIONALLY RENDERED */}
        {user && user.role === 'recruiter' ? (
          <div>
            <h4 className="text-xl font-bold mb-6 border-b-2 border-[#ff9933] inline-block">Employers</h4>
            <ul className="space-y-4">
              {user.demo ? (
                <li><Link to="/recruiter-dashboard" className="hover:text-[#ff9933] transition">Demo Dashboard</Link></li>
              ) : (
                <>
                  <li><Link to="/admin-jobs/post-jobs" className="hover:text-[#ff9933] transition">Post a Job</Link></li>
                  <li><Link to="/employers/company-name" className="hover:text-[#ff9933] transition">Register Company</Link></li>
                  <li><Link to="/admin/jobs" className="hover:text-[#ff9933] transition">Manage Jobs</Link></li>
                  <li><Link to="/admin/hr-resources" className="hover:text-[#ff9933] transition">HR Resources</Link></li>
                </>
              )}
            </ul>
          </div>
        ) : (
          <div>
            <h4 className="text-xl font-bold mb-6 border-b-2 border-[#ff9933] inline-block">Support</h4>
            <ul className="space-y-4">
              <li><Link to="/help-center" className="hover:text-[#ff9933] transition">Help Center</Link></li>
              <li><Link to="/faqs" className="hover:text-[#ff9933] transition">FAQs</Link></li>
              <li><Link to="/safety-center" className="hover:text-[#ff9933] transition">Safety Center</Link></li>
            </ul>
          </div>
        )}

        {/* Column 4: Contact Us */}
        <div>
          <h4 className="text-xl font-bold mb-6 border-b-2 border-[#ff9933] inline-block">Contact Info</h4>
          <ul className="space-y-4">
            <li className="flex items-center">
              <MapPin className="w-5 h-5 mr-3 text-[#ff9933]" />
              <span className="text-sm">muzaffarnagar,Uttar Pradesh, India</span>
            </li>
            <li className="flex items-center">
              <Phone className="w-5 h-5 mr-3 text-[#ff9933]" />
              <span className="text-sm">+91 82732 35248</span>
            </li>
            <li className="flex items-center">
              <Mail className="w-5 h-5 mr-3 text-[#ff9933]" />
              <span className="text-sm">jivikacommunity@gmail.com</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar - Updated with Dynamic Year */}
      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-white/10 text-center text-gray-300">
  {/* Main Copyright Text */}
  <p className="text-sm">
    &copy; {currentYear} JiViKa Job Portal. All Rights Reserved.
  </p>
  
  {/* Privacy Policy Link - Small text, underlined on hover */}
  <div className="mt-2">
    <Link 
      to="/privacy-policy" 
      className="text-[11px] text-gray-400 hover:text-white hover:underline transition-colors duration-200"
    >
      Privacy Policy
    </Link>
  </div>
</div>
    </footer>
  );
};

export default Footer;
