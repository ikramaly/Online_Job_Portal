
import React from 'react';

const Template4 = ({ data }) => {
  // Safe Skill Parsing
  const skillsList = typeof data?.skills === 'string' 
    ? data.skills.split(',').map(s => s.trim()).filter(s => s !== "") 
    : [];

  return (
    <div className="bg-[#f8fafc] min-h-[1123px] p-8 font-mono text-slate-900 shadow-2xl">
      <div className="border-2 border-slate-900 bg-white">
        
        {/* 1. TOP NAV STYLE HEADER */}
        <header className="border-b-2 border-slate-900 p-8 flex justify-between items-end">
          <div>
            <h1 className="text-5xl font-black tracking-tighter uppercase leading-none mb-2">
              {data?.basics?.name || "User Name"}
            </h1>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">
              {data?.basics?.location || "Location Unknown"}
            </p>
          </div>
          <div className="text-right text-[11px] font-bold space-y-1">
            <p className="bg-slate-900 text-white px-2 py-1">{data?.basics?.email}</p>
            <p className="border border-slate-900 px-2 py-1">{data?.basics?.phone}</p>
            {data?.basics?.link && <p className="text-blue-600 underline truncate max-w-[200px]">{data?.basics?.link}</p>}
          </div>
        </header>

        {/* 2. THREE-COLUMN GRID LAYOUT */}
        <div className="grid grid-cols-12 min-h-[900px]">
          
          {/* LEFT SIDEBAR: Education & Skills */}
          <div className="col-span-4 border-r-2 border-slate-900 p-6 space-y-10">
            
            {/* EDUCATION SECTION */}
            <section>
              <h3 className="text-xs font-black bg-slate-900 text-white px-2 py-1 inline-block mb-4 uppercase italic">
                01. Education
              </h3>
              {data?.education?.map((edu, i) => (
                <div key={i} className="mb-6 border-l-4 border-slate-200 pl-3">
                  <p className="text-xs font-black uppercase text-slate-400">{edu.year}</p>
                  <h4 className="text-sm font-bold leading-tight">{edu.degree}</h4>
                  <p className="text-[11px] mt-1 font-medium">{edu.school}</p>
                </div>
              ))}
            </section>

            {/* SKILLS SECTION */}
            <section>
              <h3 className="text-xs font-black bg-slate-900 text-white px-2 py-1 inline-block mb-4 uppercase italic">
                02. Tech Stack
              </h3>
              <div className="flex flex-wrap gap-1">
                {skillsList.map((s, i) => (
                  <span key={i} className="text-[10px] font-bold border border-slate-300 px-2 py-1 hover:bg-slate-900 hover:text-white transition-colors cursor-crosshair">
                    {s}
                  </span>
                ))}
              </div>
            </section>
          </div>

          {/* MAIN CONTENT: Summary, Experience, Projects */}
          <div className="col-span-8 p-8 space-y-12">
            
            {/* SUMMARY */}
            <section>
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-4">/ / Overview</h3>
              <p className="text-sm leading-relaxed font-medium text-slate-700">
                {data?.basics?.summary || "No summary provided."}
              </p>
            </section>

            {/* EXPERIENCE */}
            <section>
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-6">/ / Experience</h3>
              {data?.experience?.map((exp, i) => (
                <div key={i} className="mb-8 relative pl-6 border-l-2 border-slate-900">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 bg-white border-2 border-slate-900 rounded-full"></div>
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="text-lg font-black uppercase tracking-tight">{exp.role}</h4>
                    <span className="text-[10px] font-bold italic">{exp.dates}</span>
                  </div>
                  <p className="text-xs font-bold text-blue-600 mb-2 uppercase">{exp.company}</p>
                  <p className="text-[13px] leading-relaxed text-slate-600">{exp.description}</p>
                </div>
              ))}
            </section>

            {/* PROJECTS */}
            <section>
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-6">/ / Projects</h3>
              <div className="grid grid-cols-2 gap-4">
                {data?.projects?.map((proj, i) => (
                  <div key={i} className="border-2 border-slate-900 p-4 hover:shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] transition-all">
                    <h4 className="text-sm font-black uppercase mb-1">{proj.name}</h4>
                    <p className="text-[9px] font-bold text-slate-400 mb-2">{proj.tech}</p>
                    <p className="text-[11px] text-slate-600 leading-snug line-clamp-3">
                      {proj.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

          </div>
        </div>

        {/* FOOTER BAR */}
        <footer className="border-t-2 border-slate-900 p-4 bg-slate-50 flex justify-between items-center">
          <p className="text-[9px] font-black uppercase tracking-widest">JiViKa System v1.0</p>
          <p className="text-[9px] font-bold">© 2026 {data?.basics?.name}</p>
        </footer>
      </div>
    </div>
  );
};

export default Template4;