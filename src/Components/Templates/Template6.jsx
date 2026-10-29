

import React from 'react';

const Template6 = ({ data }) => {
  // Safe Skill Parsing
  const skillsList = typeof data?.skills === 'string' 
    ? data.skills.split(',').map(s => s.trim()).filter(s => s !== "") 
    : [];

  return (
    <div className="p-16 bg-white min-h-[1123px] text-slate-800 shadow-2xl font-serif">
      
      {/* 1. MINIMALIST HEADER */}
      <header className="border-b-4 border-slate-900 pb-8 mb-10 flex justify-between items-end">
        <div>
          <h1 className="text-5xl font-bold text-slate-900 tracking-tight mb-2">
            {data?.basics?.name || "Candidate Name"}
          </h1>
          <div className="flex gap-4 text-sm font-medium text-slate-500 italic">
            <span>{data?.basics?.location}</span>
            <span>•</span>
            <span>{data?.basics?.phone}</span>
          </div>
        </div>
        <div className="text-right text-sm font-bold text-slate-900 uppercase tracking-widest">
          <p>{data?.basics?.email}</p>
          {data?.basics?.link && <p className="text-blue-700 text-[11px] mt-1 font-sans lowercase">{data?.basics?.link}</p>}
        </div>
      </header>

      {/* 2. EXECUTIVE SUMMARY */}
      <section className="mb-12">
        <h3 className="text-sm font-black uppercase tracking-[0.4em] text-slate-400 mb-4">Professional Profile</h3>
        <p className="text-base leading-relaxed text-slate-700 font-sans">
          {data?.basics?.summary || "Add your career objectives here."}
        </p>
      </section>

      {/* 3. EXPERIENCE (Main Focus) */}
      <section className="mb-12">
        <h3 className="text-sm font-black uppercase tracking-[0.4em] text-slate-400 mb-6">Experience</h3>
        <div className="space-y-8">
          {data?.experience?.map((exp, i) => (
            <div key={i} className="font-sans">
              <div className="flex justify-between items-baseline">
                <h4 className="text-lg font-bold text-slate-900 uppercase">{exp.role}</h4>
                <span className="text-sm font-bold text-slate-500 italic">{exp.dates}</span>
              </div>
              <p className="text-sm font-black text-slate-400 mb-3">{exp.company}</p>
              <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">
                {exp.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. TWO-COLUMN GRID FOR EDUCATION & SKILLS */}
      <div className="grid grid-cols-2 gap-16 mb-12">
        {/* EDUCATION */}
        <section>
          <h3 className="text-sm font-black uppercase tracking-[0.4em] text-slate-400 mb-6">Education</h3>
          {data?.education?.map((edu, i) => (
            <div key={i} className="mb-6 font-sans">
              <h4 className="text-sm font-bold text-slate-900 leading-tight">{edu.degree}</h4>
              <p className="text-xs text-slate-500 font-bold mt-1 uppercase tracking-wider">{edu.school}</p>
              <p className="text-[11px] text-slate-400 mt-1 italic">{edu.year}</p>
            </div>
          ))}
        </section>

        {/* SKILLS */}
        <section>
          <h3 className="text-sm font-black uppercase tracking-[0.4em] text-slate-400 mb-6">Core Competencies</h3>
          <div className="grid grid-cols-2 gap-y-2 gap-x-4">
            {skillsList.map((s, i) => (
              <div key={i} className="flex items-center gap-2 text-xs font-bold text-slate-600 font-sans uppercase tracking-tighter border-b border-slate-100 pb-1">
                <span className="text-slate-900">›</span> {s}
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* 5. PROJECTS (Full Width Bottom) */}
      <section>
        <h3 className="text-sm font-black uppercase tracking-[0.4em] text-slate-400 mb-6">Technical Projects</h3>
        <div className="space-y-6">
          {data?.projects?.map((proj, i) => (
            <div key={i} className="font-sans p-5 bg-slate-50 rounded border-r-4 border-slate-900 shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-bold text-slate-900 uppercase tracking-tight">{proj.name}</h4>
                <span className="text-[10px] font-black bg-white px-3 py-1 border border-slate-200 text-slate-400 rounded-full">
                  {proj.tech}
                </span>
              </div>
              <p className="text-sm text-slate-600 leading-snug">
                {proj.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer System Info */}
      <div className="mt-20 pt-4 border-t border-slate-100 flex justify-between items-center opacity-30 font-sans">
        <span className="text-[9px] font-bold uppercase tracking-widest">Document Generated via JiViKa Engine</span>
        <span className="text-[9px] font-bold uppercase tracking-widest">MS University Final Project</span>
      </div>
    </div>
  );
};

export default Template6;