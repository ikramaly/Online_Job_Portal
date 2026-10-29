import React, { useState, useRef } from 'react';
import { Search, ChevronRight, Briefcase, Zap,MapPin, Globe, ExternalLink , DollarSign, CheckCircle, Link } from "lucide-react";
import Navbar from './Navbar';
import Footer from './Footer';
import SearchBar from './SearchBar';
import { useNavigate } from 'react-router';
import CompaniesSection from './CompaniesSection';
import useGetAllJobs from './Hooks/useGetAllJobs';
import { useSelector } from 'react-redux';
const dictionary = {
  en: {
    find_dream_job: "Find Your Dream Job Today",
    explore_opportunities: "Explore thousands of opportunities and take the next step in your career.",
    search_placeholder: "Search Job Titles, Companies, or Keywords...",
    my_profile: "My Profile",
    find_companies: "Find Companies",
    how_it_works: "How It Works",
    popular_categories: "Popular Categories",
    top_companies: "Top Companies Hiring Now"
  }
};

const HomePage = () => {
  const navigate = useNavigate();
  const [currentLang] = useState("en"); // Defaulting to English as per your file
  // const searchInputRef = useRef(null);


  const t = (key) => dictionary[currentLang][key] || key;
  const {user} = useSelector(store => store.user);
const profileHandler = () =>{
  //  const user = JSON.parse(localStorage.getItem("user"));
   if(!user)
   {
    navigate("/register");
   }else{
    navigate("/my-profile");
   }
  
}

// useGetAllJobs();
useGetAllJobs();
  return (

    <div>
    <Navbar />
    <div className="min-h-screen bg-gray-50">
      {/* 1. HERO SECTION */}
      <div className="bg-[#387780] py-20 text-white shadow-xl">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 leading-tight">
            {t("find_dream_job")}
          </h1>
          <p className="text-xl opacity-90 mb-10">
            {t("explore_opportunities")}
          </p>



{/*   search bar start */}
           <div>
            <SearchBar />
           </div>
          {/* search bar end */}

          <div className="flex justify-center space-x-4 mt-8">
            {/* <Link to= "/my-profile" > */}
            <button
            //  onClick={()=>navigate("/my-profile")}
            onClick={profileHandler}
             className="bg-[#ff9933] cursor-pointer text-white font-bold py-0 md:py-3 md:px-8 px-4 rounded-full shadow-lg hover:scale-105 transition">
              {t("my_profile")}
            </button>
            {/* </Link> */}
            <button
            onClick={()=>navigate("/job-seekers")}
            className="bg-white cursor-pointer text-[#387780] font-bold  py-0 md:py-3 md:px-8 px-4  rounded-full shadow-lg hover:scale-105 transition">
              {t("find_companies")}
            </button>
          </div>
        </div>
      </div>

      

      {/* 3. HOW IT WORKS SECTION */}
      <div className="bg-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">{t("how_it_works")}</h2>
          <div className="flex flex-col md:flex-row justify-between items-center space-y-12 md:space-y-0 md:space-x-8">
            {[
              { step: "1", title: "Create Account", desc: "Build your professional profile." },
              { step: "2", title: "Upload Resume", desc: "Let employers find you easily." },
              { step: "3", title: "Find Jobs", desc: "Apply to your favorite positions." }
            ].map((item, idx) => (
              <div key={idx} className="flex-1 text-center relative">
                <div className="w-20 h-20 bg-[#387780] text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6 shadow-lg">
                  {item.step}
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-800">{item.title}</h3>
                <p className="text-gray-600 text-lg leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
  <CompaniesSection />

      <Footer />
    </div>
    </div>
  );
};

export default HomePage;