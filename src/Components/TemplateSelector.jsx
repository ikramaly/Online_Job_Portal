


import React from 'react';
import { Layout, CheckCircle2 } from 'lucide-react';

const TemplateSelector = ({ resumeData, setResumeData }) => {
  // --- FIX 1: Add a Safety Check ---
  // If resumeData isn't loaded yet, return null or a loader to prevent crash
  if (!resumeData) return null;

  const templates = [
    { id: 1, name: "Silicon Valley", desc: "ATS-Optimized & Minimalist", color: "bg-slate-900" },
    { id: 2, name: "London Corporate", desc: "Executive Gradient", color: "bg-blue-900" },
    { id: 3, name: "Creative Maven", desc: "Centered & Modern", color: "bg-purple-600" },
    { id: 4, name: "Tokyo Tech", desc: "Monochrome Grid", color: "bg-gray-800" },
    { id: 5, name: "Berlin Sidebar", desc: "Dual Column Split", color: "bg-emerald-700" },
    { id: 6, name: "Executive Clean", desc: "High-End Professional", color: "bg-indigo-900" },
  ];

  const handleSelect = (id) => {
    // --- FIX 2: Use Functional Update ---
    // This is safer when working with nested objects in React state
    setResumeData(prev => ({ 
      ...prev, 
      selectedTemplate: id 
    }));
  };

  return (
    <div className="page-break md:p-0 p-20 md:ml-0 ml-[-80px] justify-self-center">
    <div className="  justify-self-center bg-white rounded-2xl shadow-sm border border-slate-200">
      <div className="flex items-center gap-2 mb-6">
        <Layout className="text-blue-600" size={24} />
        <h2 className="text-xl font-bold text-slate-800">Choose Design</h2>
      </div>

      <div className="grid grid-cols-1 p-3 md:p-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map((template) => (
          <div
            key={template.id}
            onClick={() => handleSelect(template.id)}
            className={`relative group cursor-pointer rounded-xl border-2 transition-all duration-300 overflow-hidden ${
              // --- FIX 3: Optional Chaining ---
              resumeData?.selectedTemplate === template.id
                ? 'border-blue-600 ring-4 ring-blue-50'
                : 'border-slate-100 hover:border-blue-300 hover:shadow-md'
            }`}
          >
            <div className={`h-24 ${template.color} flex items-center justify-center relative`}>
               {resumeData?.selectedTemplate === template.id && (
                 <div className="absolute top-2 right-2 text-white animate-bounce">
                   <CheckCircle2 size={20} fill="currentColor" className="text-blue-500" />
                 </div>
               )}
               <span className="text-white/20 font-black text-4xl italic select-none">
                 {template.id}
               </span>
            </div>

            <div className="p-3 bg-white">
              <h3 className="text-sm font-bold text-slate-700 truncate">{template.name}</h3>
              <p className="text-[10px] text-slate-400 mt-0.5">{template.desc}</p>
            </div>

            <div className={`absolute inset-0 bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none`} />
          </div>
        ))}
      </div>

      <div className="mt-6 p-3 bg-blue-50 rounded-lg border border-blue-100">
        <p className="text-[11px] text-blue-700 leading-relaxed font-medium">
          💡 **Pro-Tip:** Recruiters at top tech companies prefer <b>Template 1</b> for its high ATS readability.
        </p>
      </div>
      </div>
    </div>
  );
};

export default TemplateSelector;