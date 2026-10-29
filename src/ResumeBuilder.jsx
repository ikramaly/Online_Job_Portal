import { useState } from "react";
import ResumePreview from "./Components/ResumePreview";
import TemplateSelector from "./Components/TemplateSelector";
import ResumeForm from "./Components/ResumeFrom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import React, { useEffect } from 'react';
import { Download, Save, Share2 } from 'lucide-react';
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
function ResumeBuilder() {
   const navigate = useNavigate();
  const {user} = useSelector(store => store.user);
  const [resumeData, setResumeData] = useState({
 

  "selectedTemplate": 1,
  "basics": {
    "name": "",
    "role": "",
    "email": "",
    "phone": "",
    "location": "",
    "linkedin": "",
    "github": "",
    "portfolio": "",
    "summary": ""
  },
  "skills": {
    "technical": [],
    "soft": [],
    "languages": []
  },
  "experience": [
    {
      "company": "",
      "role": "",
      "location": "",
      "duration": "",
      "description": "",
      "keyAchievements": []
    }
  ],
  "education": [
    {
      "institution": "",
      "degree": "",
      "field": "",
      "graduationYear": "",
      "score": ""
    }
  ],
  "projects": [
    {
      "title": "",
      "techStack": "",
      "link": "",
      "description": ""
    }
  ],
  "certifications": [
    {
      "name": "",
      "issuer": "",
      "year": ""
    }
  ],
  "extraCurricular": {
    "activities": [],
    "awards": []
  }

  });

  useEffect(()=>{
    if(!user){
      navigate("/register");
    }
  })

  useEffect(() => {
    const savedData = localStorage.getItem('jivika_resume_draft');
    if (savedData) {
      setResumeData(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('jivika_resume_draft', JSON.stringify(resumeData));
  }, [resumeData]);

  return (
    <div>
        <Navbar />
        

<div className="min-h-screen bg-[#f4f7fa] font-sans text-slate-900">
     

      {/* Main Content Grid */}
      <main className="max-w-[1600px] mx-auto grid grid-cols-12 gap-8 p-8">
        
        {/* LEFT COLUMN: Controls (40% width) */}
        <div className="col-span-12 lg:col-span-5 space-y-8 h-[calc(100vh-120px)] overflow-y-auto pr-2 custom-scrollbar">
          
          <section>
            <TemplateSelector resumeData={resumeData} setResumeData={setResumeData} />
          </section>

          <section>
            <ResumeForm resumeData={resumeData} setResumeData={setResumeData} />
          </section>
          
        </div>

        {/* RIGHT COLUMN: Live Preview (60% width) */}
        <div className="col-span-12 lg:col-span-7 bg-slate-300 rounded-2xl  overflow-hidden border border-slate-400 shadow-inner sticky top-24 h-[calc(100vh-120px)] flex flex-col">
          <div className="bg-slate-800 p-5 flex justify-center gap-4 text-white/50 text-[10px] uppercase font-bold tracking-widest">
            <span>A4 Live Production Preview</span>
            <span>•</span>
            <span>100% ATS Friendly</span>
          </div>
          
          <section className="overflow-auto  p-1 md:p-0 flex justify-center items-start">
            <ResumePreview resumeData={resumeData} />
          </section>
        </div>

      </main>
    </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default ResumeBuilder;