
const Template1 = ({ data }) => {
  // 1. Safety check for skills (converts string to array)
  const skillsList = typeof data?.skills === 'string' 
    ? data.skills.split(',').map(s => s.trim()).filter(s => s !== "") 
    : [];

  return (
    <div className="p-10 bg-white min-h-[1123px] text-slate-800 border-t-[12px] border-slate-900 shadow-lg">
      {/* HEADER: Basics */}
      <header className="mb-8 border-b pb-6">
        <h1 className="text-4xl font-black uppercase tracking-tighter">{data?.basics?.name || "Your Name"}</h1>
        <p className="text-sm text-slate-500 mt-2">
          {data?.basics?.email} | {data?.basics?.phone} | {data?.basics?.location}
        </p>
        {data?.basics?.link && <p className="text-xs text-blue-600 mt-1">{data?.basics?.link}</p>}
      </header>

      {/* SECTION: Experience */}
      <section className="mb-8">
        <h2 className="text-xs font-black uppercase tracking-widest text-blue-600 mb-4 border-b pb-1">Professional Experience</h2>
        {data?.experience?.map((exp, i) => (
          <div key={i} className="mb-4">
            <div className="flex justify-between font-bold text-sm">
              <span>{exp.role}</span>
              <span className="text-slate-400 font-normal italic">{exp.dates}</span>
            </div>
            <p className="text-xs font-bold text-slate-600 uppercase mb-1">{exp.company}</p>
            <p className="text-sm text-slate-500 leading-relaxed">{exp.description}</p>
          </div>
        ))}
      </section>

      {/* NEW SECTION: Education (MS University Details) */}
      <section className="mb-8">
        <h2 className="text-xs font-black uppercase tracking-widest text-blue-600 mb-4 border-b pb-1">Education</h2>
        {data?.education?.map((edu, i) => (
          <div key={i} className="mb-3">
            <div className="flex justify-between font-bold text-sm">
              <span>{edu.school || "University Name"}</span>
              <span className="text-slate-400 font-normal">{edu.year}</span>
            </div>
            <p className="text-xs text-slate-600 italic">{edu.degree}</p>
          </div>
        ))}
      </section>

      {/* NEW SECTION: Projects */}
      <section className="mb-8">
        <h2 className="text-xs font-black uppercase tracking-widest text-blue-600 mb-4 border-b pb-1">Key Projects</h2>
        {data?.projects?.map((proj, i) => (
          <div key={i} className="mb-4">
            <div className="flex justify-between font-bold text-sm">
              <span>{proj.name}</span>
              <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-500">{proj.tech}</span>
            </div>
            <p className="text-sm text-slate-500 mt-1">{proj.description}</p>
          </div>
        ))}
      </section>

      {/* SECTION: Skills */}
      <section>
        <h2 className="text-xs font-black uppercase tracking-widest text-blue-600 mb-3">Technical Skills</h2>
        <div className="flex flex-wrap gap-2">
          {skillsList.map((s, i) => (
            <span key={i} className="px-2 py-1 bg-slate-50 border border-slate-200 text-[10px] font-bold rounded uppercase">
              {s}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Template1;