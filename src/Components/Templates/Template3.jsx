

import React from 'react';

const Template3 = ({ data }) => {
  // Safe Skill Parsing
  const skillsList = typeof data?.skills === 'string' 
    ? data.skills.split(',').map(s => s.trim()).filter(s => s !== "") 
    : [];

  return (
    <div className="p-12 bg-white min-h-[1123px] text-slate-800 shadow-2xl font-sans">
      
      {/* 1. CENTERED HEADER */}
      <header className="text-center mb-12">
        <h1 className="text-5xl font-black text-slate-900 tracking-tighter uppercase mb-2">
          {data?.basics?.name || "Your Name"}
        </h1>
        <div className="flex justify-center items-center gap-4 text-xs font-bold text-purple-600 uppercase tracking-widest">
          <span>{data?.basics?.location}</span>
          <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
          <span>{data?.basics?.phone}</span>
          <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
          <span>{data?.basics?.email}</span>
        </div>
        {data?.basics?.link && (
          <p className="mt-3 text-sm text-slate-400 font-medium lowercase italic">
            {data?.basics?.link}
          </p>
        )}
      </header>

      {/* 2. MODERN SUMMARY */}
      <section className="max-w-2xl mx-auto text-center mb-12">
        <p className="text-lg leading-relaxed text-slate-500 font-light italic">
          "{data?.basics?.summary || "Add a professional summary to stand out."}"
        </p>
      </section>

      <div className="grid grid-cols-12 gap-10">
        
        {/* LEFT COLUMN (Experience & Projects) */}
        <div className="col-span-8 space-y-10">
          
          {/* EXPERIENCE SECTION */}
          <section>
            <h3 className="text-sm font-black text-purple-600 uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
              Experience <div className="h-[1px] bg-purple-100 flex-grow"></div>
            </h3>
            {data?.experience?.map((exp, i) => (
              <div key={i} className="mb-8 last:mb-0">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">{exp.role}</h4>
                    <p className="text-sm font-bold text-slate-500 uppercase">{exp.company}</p>
                  </div>
                  <span className="text-[10px] font-black bg-slate-900 text-white px-3 py-1 rounded-full uppercase">
                    {exp.dates}
                  </span>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed border-l-2 border-slate-100 pl-4">
                  {exp.description}
                </p>
              </div>
            ))}
          </section>

          {/* PROJECTS SECTION (Activated) */}
          <section>
            <h3 className="text-sm font-black text-purple-600 uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
              Top Projects <div className="h-[1px] bg-purple-100 flex-grow"></div>
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {data?.projects?.map((proj, i) => (
                <div key={i} className="group p-5 rounded-2xl border border-slate-100 hover:bg-purple-50 transition-colors">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-extrabold text-slate-800">{proj.name}</h4>
                    <span className="text-[9px] text-purple-500 font-bold uppercase">{proj.tech}</span>
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-2">{proj.description}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN (Education & Skills) */}
        <div className="col-span-4 space-y-10">
          
          {/* SKILLS SECTION */}
          <section>
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-[0.2em] mb-6">Expertise</h3>
            <div className="flex flex-wrap gap-2">
              {skillsList.map((s, i) => (
                <span key={i} className="px-3 py-1.5 bg-slate-100 text-[10px] font-bold text-slate-700 rounded-lg hover:bg-purple-600 hover:text-white transition-all cursor-default">
                  {s}
                </span>
              ))}
            </div>
          </section>

          {/* EDUCATION SECTION (Activated) */}
          <section>
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-[0.2em] mb-6">Education</h3>
            {data?.education?.map((edu, i) => (
              <div key={i} className="mb-6 last:mb-0">
                <p className="text-xs font-black text-purple-600 uppercase mb-1">{edu.year}</p>
                <h4 className="text-sm font-bold text-slate-800 leading-tight">{edu.degree}</h4>
                <p className="text-xs text-slate-500 mt-1 italic">{edu.school}</p>
              </div>
            ))}
          </section>

        </div>
      </div>

      {/* FOOTER ACCENT */}
      <div className="mt-16 pt-8 border-t border-slate-100 text-center">
        <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.5em]">
          JiViKa Professional Portfolio
        </p>
      </div>
    </div>
  );
};

export default Template3;