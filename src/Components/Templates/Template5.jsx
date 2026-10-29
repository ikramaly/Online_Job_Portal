

import React from 'react';

const Template5 = ({ data }) => {
  // Safe Skill Parsing
  const skillsList = typeof data?.skills === 'string' 
    ? data.skills.split(',').map(s => s.trim()).filter(s => s !== "") 
    : [];

  return (
    <div className="flex bg-[#fdfdfd] min-h-[1123px] shadow-2xl overflow-hidden font-sans">
      
      {/* LEFT SIDEBAR (Emerald Accent) */}
      <div className="w-[38%] bg-[#064e3b] text-emerald-50 p-10 flex flex-col justify-between">
        <div>
          {/* Header */}
          <header className="mb-12">
            <h1 className="text-4xl font-light tracking-tight leading-tight mb-2">
              {data?.basics?.name?.split(' ')[0]} <br />
              <span className="font-bold text-white">{data?.basics?.name?.split(' ')[1] || ""}</span>
            </h1>
            <div className="h-1 w-12 bg-emerald-400 mt-6"></div>
          </header>

          {/* Contact Details */}
          <section className="mb-12 space-y-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-emerald-400">Contact</h3>
            <div className="space-y-4 text-sm font-light">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-bold text-emerald-500">Email</span>
                <span className="truncate">{data?.basics?.email}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-bold text-emerald-500">Phone</span>
                <span>{data?.basics?.phone}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-bold text-emerald-500">Location</span>
                <span>{data?.basics?.location}</span>
              </div>
            </div>
          </section>

          {/* Education (College Detail Display) */}
          <section className="mb-12">
            <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-emerald-400 mb-6">Education</h3>
            {data?.education?.map((edu, i) => (
              <div key={i} className="mb-6 last:mb-0 group">
                <p className="text-xs font-black text-white uppercase">{edu.year}</p>
                <p className="text-sm font-bold mt-1 leading-tight">{edu.degree}</p>
                <p className="text-xs text-emerald-300/80 mt-1 italic">{edu.school}</p>
              </div>
            ))}
          </section>
        </div>

        {/* Brand Tag */}
        <div className="opacity-20 text-[10px] font-bold tracking-[0.5em] uppercase -rotate-90 origin-left translate-y-10">
          JiViKa Portal System
        </div>
      </div>

      {/* RIGHT CONTENT AREA */}
      <div className="w-[62%] p-12 py-16 text-slate-700">
        
        {/* Summary Block */}
        <section className="mb-16">
          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300 mb-6">About Me</h3>
          <p className="text-lg font-light leading-relaxed text-slate-500 italic">
            {data?.basics?.summary || "Professional summary not provided."}
          </p>
        </section>

        {/* Experience Block */}
        <section className="mb-16">
          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300 mb-8">Professional Path</h3>
          {data?.experience?.map((exp, i) => (
            <div key={i} className="mb-10 last:mb-0 relative">
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-xl font-bold text-slate-800">{exp.role}</h4>
                <span className="text-[10px] font-black text-emerald-700 bg-emerald-50 px-2 py-1 rounded">
                  {exp.dates}
                </span>
              </div>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">{exp.company}</p>
              <p className="text-sm text-slate-500 leading-relaxed border-l-2 border-slate-100 pl-6">
                {exp.description}
              </p>
            </div>
          ))}
        </section>

        {/* Projects Block (Two-column layout for projects) */}
        <section className="mb-16">
          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300 mb-8">Selected Projects</h3>
          <div className="space-y-6">
            {data?.projects?.map((proj, i) => (
              <div key={i} className="p-5 border border-slate-100 rounded-lg hover:shadow-md transition-shadow">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-bold text-slate-800">{proj.name}</h4>
                  <span className="text-[9px] font-bold text-emerald-600 italic">#{proj.tech}</span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">{proj.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Skills Block */}
        <section>
          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300 mb-8">Core Expertise</h3>
          <div className="flex flex-wrap gap-3">
            {skillsList.map((s, i) => (
              <span key={i} className="px-4 py-2 bg-slate-900 text-white text-[10px] font-bold rounded-sm uppercase tracking-tighter">
                {s}
              </span>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Template5;