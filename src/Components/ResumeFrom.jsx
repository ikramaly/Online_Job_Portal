

import React, { useState } from 'react';
import { 
  Plus, Trash2, Sparkles, ChevronRight, 
  ChevronLeft, GraduationCap, Briefcase, 
  User, FileText, Code, FolderGit2 
} from 'lucide-react';

const ResumeForm = ({ resumeData, setResumeData }) => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { id: 'basics', label: 'Personal', icon: <User size={16} /> },
    { id: 'summary', label: 'Summary', icon: <FileText size={16} /> },
    { id: 'experience', label: 'Work', icon: <Briefcase size={16} /> },
    { id: 'education', label: 'Education', icon: <GraduationCap size={16} /> },
    { id: 'skills', label: 'Skills', icon: <Code size={16} /> },
    { id: 'projects', label: 'Projects', icon: <FolderGit2 size={16} /> }
  ];

  // --- Handlers ---

  const handleBasicsChange = (e) => {
    setResumeData({
      ...resumeData,
      basics: { ...resumeData?.basics, [e.target.name]: e.target.value }
    });
  };

  const updateList = (section, index, field, value) => {
    const newList = [...resumeData[section]];
    newList[index][field] = value;
    setResumeData({ ...resumeData, [section]: newList });
  };

  const addItem = (section, emptyObj) => {
    setResumeData({ 
      ...resumeData, 
      [section]: [...(resumeData[section] || []), emptyObj] 
    });
  };

  // ENABLED: The Delete Function
  const removeItem = (section, index) => {
    const newList = resumeData[section].filter((_, i) => i !== index);
    setResumeData({ ...resumeData, [section]: newList });
  };

  if (!resumeData) return <div className="p-10 text-center text-slate-500">Initializing JiViKa Form...</div>;

  return (
    <div className='md:p-0 p-15 md:mt-0 mt-[-50px]  md:ml-0 ml-[-80px] items-center '>
    <div className=" bg-white rounded-2xl  shadow-lg border border-slate-200 overflow-hidden flex flex-col h-full">
      
      {/* 1. Step Indicator Navigation */}
      <div className="flex bg-slate-50 border-b overflow-x-auto no-scrollbar">
        {steps.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setActiveStep(i)}
            className={`flex items-center gap-2 px-6 py-4 text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all border-r border-slate-100 ${
              activeStep === i 
                ? 'bg-white text-blue-600 border-b-2 border-b-blue-600' 
                : 'text-slate-400 hover:bg-slate-100'
            }`}
          >
            {s.icon} {s.label}
          </button>
        ))}
      </div>

      {/* 2. Main Form Content */}
      <div className="p-8 flex-grow overflow-y-auto custom-scrollbar" style={{ minHeight: '550px' }}>
        
        {/* STEP 0: BASICS */}
        {activeStep === 0 && (
          <div className="space-y-6 animate-fadeIn">
            <h3 className="text-xl font-bold text-slate-800 border-l-4 border-blue-600 pl-3">Personal Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <input name="name" placeholder="Full Name" value={resumeData.basics?.name || ""} onChange={handleBasicsChange} className="p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500" />
              <input name="email" placeholder="Email Address" value={resumeData.basics?.email || ""} onChange={handleBasicsChange} className="p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500" />
              <input name="phone" placeholder="Phone Number" value={resumeData.basics?.phone || ""} onChange={handleBasicsChange} className="p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500" />
              <input name="location" placeholder="City, Country" value={resumeData.basics?.location || ""} onChange={handleBasicsChange} className="p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500" />
              <input name="link" placeholder="Portfolio/LinkedIn URL" value={resumeData.basics?.link || ""} onChange={handleBasicsChange} className="p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500 col-span-2" />
            </div>
          </div>
        )}

        {/* STEP 1: SUMMARY */}
        {activeStep === 1 && (
          <div className="space-y-4 animate-fadeIn">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-slate-800 border-l-4 border-blue-600 pl-3">Professional Summary</h3>
              <button className="flex items-center gap-2 text-xs bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition font-bold shadow-md">
                <Sparkles size={14} /> AI Generate
              </button>
            </div>
            <textarea 
              name="summary" 
              className="w-full h-48 p-4 border rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none leading-relaxed text-slate-600"
              placeholder="Write a high-impact summary of your career..."
              value={resumeData.basics?.summary || ""}
              onChange={handleBasicsChange}
            />
          </div>
        )}

        {/* STEP 2: EXPERIENCE */}
        {activeStep === 2 && (
          <div className="space-y-6 animate-fadeIn">
            <h3 className="text-xl font-bold text-slate-800 border-l-4 border-blue-600 pl-3">Work Experience</h3>
            {resumeData.experience?.map((exp, index) => (
              <div key={index} className="p-6 border border-slate-200 bg-slate-50 rounded-2xl relative group hover:border-blue-200 transition-colors">
                <button onClick={() => removeItem('experience', index)} className="absolute top-4 right-4 text-slate-300 hover:text-red-500 p-2 hover:bg-white rounded-full transition shadow-sm">
                  <Trash2 size={18} />
                </button>
                <div className="grid grid-cols-2 gap-4">
                  <input placeholder="Company Name" className="p-3 border rounded-xl outline-none" value={exp.company} onChange={(e) => updateList('experience', index, 'company', e.target.value)} />
                  <input placeholder="Job Role" className="p-3 border rounded-xl outline-none" value={exp.role} onChange={(e) => updateList('experience', index, 'role', e.target.value)} />
                  <input placeholder="Duration (e.g., 2022 - Present)" className="p-3 border rounded-xl outline-none col-span-2" value={exp.dates} onChange={(e) => updateList('experience', index, 'dates', e.target.value)} />
                  <textarea placeholder="Achievements & Responsibilities" className="p-3 border rounded-xl outline-none col-span-2 h-24" value={exp.description} onChange={(e) => updateList('experience', index, 'description', e.target.value)} />
                </div>
              </div>
            ))}
            <button onClick={() => addItem('experience', { company: '', role: '', dates: '', description: '' })} className="w-full py-4 border-2 border-dashed border-slate-300 rounded-2xl text-slate-500 font-bold hover:border-blue-500 hover:text-blue-600 transition flex items-center justify-center gap-2 bg-white">
              <Plus size={20} /> Add Experience
            </button>
          </div>
        )}

        {/* STEP 3: EDUCATION */}
        {activeStep === 3 && (
          <div className="space-y-6 animate-fadeIn">
            <h3 className="text-xl font-bold text-slate-800 border-l-4 border-blue-600 pl-3">Education</h3>
            {resumeData.education?.map((edu, index) => (
              <div key={index} className="p-6 border border-slate-200 bg-slate-50 rounded-2xl relative group">
                <button onClick={() => removeItem('education', index)} className="absolute top-4 right-4 text-slate-300 hover:text-red-500 p-2 hover:bg-white rounded-full transition">
                  <Trash2 size={18} />
                </button>
                <div className="grid grid-cols-2 gap-4">
                  <input placeholder="University / School" className="p-3 border rounded-xl outline-none" value={edu.school} onChange={(e) => updateList('education', index, 'school', e.target.value)} />
                  <input placeholder="Degree / Course" className="p-3 border rounded-xl outline-none" value={edu.degree} onChange={(e) => updateList('education', index, 'degree', e.target.value)} />
                  <input placeholder="Year" className="p-3 border rounded-xl outline-none col-span-2" value={edu.year} onChange={(e) => updateList('education', index, 'year', e.target.value)} />
                </div>
              </div>
            ))}
            <button onClick={() => addItem('education', { school: '', degree: '', year: '' })} className="w-full py-4 border-2 border-dashed border-slate-300 rounded-2xl text-slate-500 font-bold hover:border-blue-500 hover:text-blue-600 transition flex items-center justify-center gap-2 bg-white">
              <Plus size={20} /> Add Education
            </button>
          </div>
        )}

        {/* STEP 4: SKILLS */}
        {activeStep === 4 && (
          <div className="space-y-4 animate-fadeIn">
            <h3 className="text-xl font-bold text-slate-800 border-l-4 border-blue-600 pl-3">Skills</h3>
            <p className="text-xs text-slate-400 mb-2 font-medium italic">Type your skills separated by commas (e.g., React, Java, SQL, Leadership)</p>
            <textarea 
              className="w-full h-48 p-4 border rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none leading-relaxed"
              placeholder="Tailwind CSS, Redux, Node.js, Python..."
              value={resumeData.skills || ""}
              onChange={(e) => setResumeData({...resumeData, skills: e.target.value})}
            />
          </div>
        )}

        {/* STEP 5: PROJECTS */}
        {activeStep === 5 && (
          <div className="space-y-6 animate-fadeIn">
            <h3 className="text-xl font-bold text-slate-800 border-l-4 border-blue-600 pl-3">Projects</h3>
            {resumeData.projects?.map((proj, index) => (
              <div key={index} className="p-6 border border-slate-200 bg-slate-50 rounded-2xl relative group">
                <button onClick={() => removeItem('projects', index)} className="absolute top-4 right-4 text-slate-300 hover:text-red-500 p-2 hover:bg-white rounded-full transition">
                  <Trash2 size={18} />
                </button>
                <div className="grid grid-cols-2 gap-4">
                  <input placeholder="Project Title" className="p-3 border rounded-xl outline-none" value={proj.name} onChange={(e) => updateList('projects', index, 'name', e.target.value)} />
                  <input placeholder="Tech Used (e.g., MERN Stack)" className="p-3 border rounded-xl outline-none" value={proj.tech} onChange={(e) => updateList('projects', index, 'tech', e.target.value)} />
                  <textarea placeholder="Project Overview" className="p-3 border rounded-xl outline-none col-span-2 h-24" value={proj.description} onChange={(e) => updateList('projects', index, 'description', e.target.value)} />
                </div>
              </div>
            ))}
            <button onClick={() => addItem('projects', { name: '', tech: '', description: '' })} className="w-full py-4 border-2 border-dashed border-slate-300 rounded-2xl text-slate-500 font-bold hover:border-blue-500 hover:text-blue-600 transition flex items-center justify-center gap-2 bg-white">
              <Plus size={20} /> Add Project
            </button>
          </div>
        )}

      </div>

      {/* 3. Navigation Footer */}
      <div className="p-6 border-t bg-slate-50 flex justify-between items-center shadow-inner">
        <button 
          onClick={() => setActiveStep(prev => Math.max(0, prev - 1))}
          className={`flex items-center gap-2 md:px-6 md:text-[18px] text-[12px] px-0 py-2 font-black text-[11px] uppercase tracking-widest transition-all ${
            activeStep === 0 ? 'text-slate-200 cursor-not-allowed' : 'text-slate-600 hover:text-blue-600'
          }`}
          disabled={activeStep === 0}
        >
          <ChevronLeft size={18} /> Previous
        </button>

        <div className="flex gap-2">
          {steps.map((_, idx) => (
            <div key={idx} className={`h-1.5 w-1.5 rounded-full transition-all ${activeStep === idx ? 'bg-blue-600 w-4' : 'bg-slate-300'}`} />
          ))}
        </div>

        <button 
          onClick={() => setActiveStep(prev => Math.min(steps.length - 1, prev + 1))}
          className="flex items-center gap-2 md:px-8 px-0 py-3 bg-blue-600 text-white rounded-xl font-black text-[11px] uppercase tracking-widest hover:bg-blue-700 transition shadow-lg shadow-blue-200"
        >
          {activeStep === steps.length - 1 ? 'Save All' : 'Next Step'} <ChevronRight size={18} />
        </button>
      </div>
    </div>
    </div>
  );
};

export default ResumeForm;