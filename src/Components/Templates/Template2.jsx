

import React from 'react';

const Template2 = ({ data }) => {
  // Safe Skill Parsing: Converts comma string to a clean Array
  const skillsList = typeof data?.skills === 'string' 
    ? data.skills.split(',').map(s => s.trim()).filter(s => s !== "") 
    : [];

  return (
    <div className="flex bg-white min-h-[1123px] shadow-2xl border border-slate-200">
      
      {/* LEFT SIDEBAR (Dark & Professional) */}
      <div className="w-1/3 bg-[#0f172a] text-slate-200 p-8 flex flex-col">
        {/* Profile Section */}
        <div className="mb-10 text-center">
          <div className="w-24 h-24 bg-slate-700 rounded-full mx-auto mb-4 border-4 border-slate-800 flex items-center justify-center text-3xl font-bold text-white uppercase">
            {data?.basics?.name?.charAt(0) || "U"}
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight uppercase">
            {data?.basics?.name || "Full Name"}
          </h2>
          <p className="text-[10px] text-blue-400 font-black tracking-[0.2em] mt-2 uppercase">
            Professional Profile
          </p>
        </div>

        {/* CONTACT INFO */}
        <section className="mb-10">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4 border-b border-slate-800 pb-2">Contact</h3>
          <div className="space-y-3 text-[11px]">
            <p className="truncate"><b>E:</b> {data?.basics?.email}</p>
            <p><b>P:</b> {data?.basics?.phone}</p>
            <p><b>L:</b> {data?.basics?.location}</p>
            {data?.basics?.link && <p className="text-blue-400 truncate"><b>W:</b> {data?.basics?.link}</p>}
          </div>
        </section>

        {/* EDUCATION (College Details Now Displaying Here) */}
        <section className="mb-10">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4 border-b border-slate-800 pb-2">Education</h3>
          {data?.education?.map((edu, i) => (
            <div key={i} className="mb-4 last:mb-0">
              <p className="text-xs font-bold text-white">{edu.degree || "Degree Name"}</p>
              <p className="text-[10px] text-slate-400 mt-1">{edu.school || "University Name"}</p>
              <p className="text-[9px] text-blue-400 font-bold mt-1 uppercase">{edu.year}</p>
            </div>
          ))}
        </section>

        {/* SKILLS */}
        <section>
          <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4 border-b border-slate-800 pb-2">Expertise</h3>
          <div className="flex flex-col gap-2">
            {skillsList.map((s, i) => (
              <div key={i} className="flex items-center gap-2 text-[11px]">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                <span>{s}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* RIGHT MAIN CONTENT (Clean & Spacious) */}
      <div className="w-2/3 p-12 text-slate-800">
        
        {/* Summary Area */}
        <section className="mb-12">
          <h2 className="text-2xl font-serif italic text-slate-900 mb-4">Executive Summary</h2>
          <p className="text-sm leading-relaxed text-slate-600 border-l-2 border-slate-100 pl-6 italic">
            {data?.basics?.summary || "No summary provided."}
          </p>
        </section>

        {/* EXPERIENCE AREA */}
        <section className="mb-12">
          <h2 className="text-sm font-black uppercase tracking-[0.3em] text-slate-400 mb-8 flex items-center gap-4">
            Experience <div className="h-[1px] bg-slate-100 flex-grow"></div>
          </h2>
          {data?.experience?.map((exp, i) => (
            <div key={i} className="mb-8">
              <div className="flex justify-between items-baseline mb-1">
                <h4 className="text-lg font-bold text-slate-900">{exp.role}</h4>
                <span className="text-[10px] font-black text-blue-600 uppercase">{exp.dates}</span>
              </div>
              <p className="text-xs font-bold text-slate-400 uppercase mb-3">{exp.company}</p>
              <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">{exp.description}</p>
            </div>
          ))}
        </section>

        {/* PROJECTS AREA (Now Displaying Here) */}
        <section>
          <h2 className="text-sm font-black uppercase tracking-[0.3em] text-slate-400 mb-8 flex items-center gap-4">
            Key Projects <div className="h-[1px] bg-slate-100 flex-grow"></div>
          </h2>
          <div className="grid grid-cols-1 gap-6">
            {data?.projects?.map((proj, i) => (
              <div key={i} className="p-4 bg-slate-50 rounded-xl border border-slate-100 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-blue-600"></div>
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-slate-900">{proj.name || "Project Title"}</h4>
                  <span className="text-[9px] font-black bg-white px-2 py-1 rounded border border-slate-200 text-slate-500 uppercase">
                    {proj.tech}
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {proj.description || "Project description goes here..."}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Template2;