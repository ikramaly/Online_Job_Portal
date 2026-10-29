

// import React, { useRef } from 'react';
// import { useReactToPrint } from 'react-to-print'; // Named import
// import { Download, FileText } from 'lucide-react';

// // Template Imports
// import Template1 from "./Templates/Template1";
// import Template2 from "./Templates/Template2";
// import Template3 from "./Templates/Template3";
// import Template4 from "./Templates/Template4";
// import Template5 from "./Templates/Template5";
// import Template6 from "./Templates/Template6";

// const ResumePreview = ({ resumeData }) => {
//   const componentRef = useRef(null);

//   // VITE FIX: ensure the hook is called correctly
//   const handlePrint = useReactToPrint({
//     contentRef: componentRef,
//     documentTitle: `${resumeData?.basics?.name || 'Resume'}_JiViKa`,
//   });

//   if (!resumeData) return null;

//   const renderTemplate = () => {
//     const templateId = Number(resumeData?.selectedTemplate) || 1;
//     const props = { data: resumeData };
//     switch (templateId) {
//       case 1: return <Template1 {...props} />;
//       case 2: return <Template2 {...props} />;
//       case 3: return <Template3 {...props} />;
//       case 4: return <Template4 {...props} />;
//       case 5: return <Template5 {...props} />;
//       case 6: return <Template6 {...props} />;
//       default: return <Template1 {...props} />;
//     }
//   };

//   return (
//     <div className='md:ml-0  md:p-0 p-20 ml-[-80px]'>
//     <div className="flex flex-col gap-6">
//       <div className="sticky top-0 z-30 flex items-center justify-between bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-slate-200 shadow-lg">
//         <div className="flex items-center md:gap-3 gap-0 m-[5px]">
//           <div className="p-2  bg-blue-600 rounded-lg text-white">
//             <FileText size={20} />
//           </div>
//           <span className="text-sm font-bold text-slate-800 tracking-tight">JiViKa Engine</span>
//         </div>
        
//         <button 
//           onClick={() => handlePrint()}
//           className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg active:scale-95 text-sm"
//         >
//           <Download size={18} /> Download PDF
//         </button>
//       </div>

//       <div className="w-full bg-slate-100 p-4 md:p-10 flex justify-center overflow-auto rounded-[2rem] border-2 border-slate-200 shadow-inner min-h-[700px]">
//         <div 
//           className="bg-white shadow-2xl origin-top transition-all duration-300"
//           style={{ 
//             width: '210mm', 
//             transform: 'scale(0.8)',
//             marginBottom: '-100px' 
//           }}
//         >
//           <div ref={componentRef} className="printable-area bg-white">
//              {renderTemplate()}
//           </div>
//         </div>
//       </div>

//       <style dangerouslySetInnerHTML={{ __html: `
//         @media print {
//           body * { visibility: hidden !important; }
//           .printable-area, .printable-area * { visibility: visible !important; }
//           .printable-area {
//             position: absolute !important;
//             left: 0 !important;
//             top: 0 !important;
//             width: 100% !important;
//           }
//           @page { size: A4; margin: 0; }
//         }
//       `}} />
//     </div>
//     </div>
//   );
// };

// export default ResumePreview;


// import React, { useRef } from 'react';
// import { useReactToPrint } from 'react-to-print';
// import { Download, FileText, Eye, Smartphone, Monitor } from 'lucide-react';

// // Template Imports
// import Template1 from "./Templates/Template1";
// import Template2 from "./Templates/Template2";
// import Template3 from "./Templates/Template3";
// import Template4 from "./Templates/Template4";
// import Template5 from "./Templates/Template5";
// import Template6 from "./Templates/Template6";

// const ResumePreview = ({ resumeData }) => {
//   const componentRef = useRef(null);

//   // The hook that handles the PDF generation
//   const handlePrint = useReactToPrint({
//     contentRef: componentRef,
//     documentTitle: `${resumeData?.basics?.name || 'Resume'}_JiViKa`,
//   });

//   if (!resumeData) return null;

//   const renderTemplate = () => {
//     const templateId = Number(resumeData?.selectedTemplate) || 1;
//     const props = { data: resumeData };
//     switch (templateId) {
//       case 1: return <Template1 {...props} />;
//       case 2: return <Template2 {...props} />;
//       case 3: return <Template3 {...props} />;
//       case 4: return <Template4 {...props} />;
//       case 5: return <Template5 {...props} />;
//       case 6: return <Template6 {...props} />;
//       default: return <Template1 {...props} />;
//     }
//   };

//   return (
//     <div >
//     <div className="flex flex-col gap-4 md:gap-6 w-full max-w-5xl mx-auto">
      
//       {/* 1. RESPONSIVE ACTION BAR */}
//       <div className="sticky top-0 z-30 flex flex-col sm:flex-row items-center justify-between bg-white/90 backdrop-blur-md p-3 md:p-4 rounded-xl md:rounded-2xl border border-slate-200 shadow-lg gap-3">
//         <div className="flex items-center gap-3 w-full sm:w-auto">
//           <div className="p-2 bg-blue-600 rounded-lg text-white">
//             <FileText size={18} />
//           </div>
//           <div>
//             <h4 className="text-xs md:text-sm font-bold text-slate-800 tracking-tight">JiViKa Preview</h4>
//             <div className="flex items-center gap-2 text-[9px] text-slate-400 uppercase font-black">
//               <span className="flex items-center gap-1"><Monitor size={10}/> Desktop</span>
//               <span className="flex items-center gap-1"><Smartphone size={10}/> Mobile Ready</span>
//             </div>
//           </div>
//         </div>
        
//         <button 
//           onClick={() => handlePrint()}
//           className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 md:py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg active:scale-95 text-xs md:text-sm"
//         >
//           <Download size={18} /> Download PDF
//         </button>
//       </div>

//       {/* 2. RESPONSIVE VIEWPORT (The Magic Part) */}
//       <div className="w-full bg-slate-100 p-2 md:p-10 flex justify-center overflow-hidden rounded-2xl md:rounded-[2rem] border-2 border-slate-200 shadow-inner min-h-[500px] md:min-h-[700px]">
        
//         {/* RESIZING LOGIC: 
//             On desktop: scale(0.8)
//             On mobile: We use a container that allows the 210mm div to scale down 
//             to fit the mobile width using CSS 'scale' and 'origin-top'.
//         */}
//         <div className="relative w-full flex justify-center scale-container">
//           <div 
//             className="bg-white shadow-2xl origin-top transition-all duration-300 print-wrapper"
//             style={{ 
//               width: '210mm', 
//               minHeight: '297mm',
//             }}
//           >
//             {/* THE ACTUAL CONTENT */}
//             <div ref={componentRef} className="printable-area bg-white w-full h-full">
//                {renderTemplate()}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* 3. RESPONSIVE STYLES & PRINT FIXES */}
//       <style dangerouslySetInnerHTML={{ __html: `
//         /* Responsive Scaling for Mobile App Preview */
//         @media (max-width: 768px) {
//           .scale-container {
//             /* This shrinks the A4 preview to fit mobile screens */
//             height: 600px; 
//             overflow: hidden;
//           }
//           .print-wrapper {
//             transform: scale(0.4); /* Shrink for mobile */
//             margin-bottom: -60%;
//           }
//         }

//         @media (min-width: 769px) {
//           .print-wrapper {
//             transform: scale(0.85); /* Normal for desktop */
//             margin-bottom: -100px;
//           }
//         }

//         /* Essential Print Logic (Works on all devices) */
//         @media print {
//           body * { visibility: hidden !important; }
//           .printable-area, .printable-area * { visibility: visible !important; }
//           .printable-area {
//             position: absolute !important;
//             left: 0 !important;
//             top: 0 !important;
//             width: 210mm !important;
//             height: 297mm !important;
//             transform: scale(1) !important; /* Always print at 100% size */
//           }
//           @page { size: A4; margin: 0; }
//         }
//       `}} />
//     </div>
//     </div>
//   );
// };

// export default ResumePreview;

import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Download, FileText, Eye, Smartphone, Monitor } from 'lucide-react';

// Template Imports
import Template1 from "./Templates/Template1";
import Template2 from "./Templates/Template2";
import Template3 from "./Templates/Template3";
import Template4 from "./Templates/Template4";
import Template5 from "./Templates/Template5";
import Template6 from "./Templates/Template6";

const ResumePreview = ({ resumeData }) => {
  const componentRef = useRef(null);

  // The hook that handles the PDF generation
  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: `${resumeData?.basics?.name || 'Resume'}_JiViKa`,
  });

  if (!resumeData) return null;

  const renderTemplate = () => {
    const templateId = Number(resumeData?.selectedTemplate) || 1;
    const props = { data: resumeData };
    switch (templateId) {
      case 1: return <Template1 {...props} />;
      case 2: return <Template2 {...props} />;
      case 3: return <Template3 {...props} />;
      case 4: return <Template4 {...props} />;
      case 5: return <Template5 {...props} />;
      case 6: return <Template6 {...props} />;
      default: return <Template1 {...props} />;
    }
  };

  return (
    
    <div className="flex-colgap-2 md:gap-6 w-full max-w-xl md:max-w-5xl  mx-auto">
      
      {/* 1. RESPONSIVE ACTION BAR */}
      <div className="sticky top-0 z-30 flex   flex-col sm:flex-row items-center justify-between bg-white/90 backdrop-blur-md p-3 md:p-4 rounded-xl md:rounded-2xl border border-slate-200 shadow-lg gap-3">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="p-2 bg-blue-600 rounded-lg text-white">
            <FileText size={18} />
          </div>
          <div>
            <h4 className="text-xs md:text-sm font-bold text-slate-800 tracking-tight">JiViKa Preview</h4>
            <div className="flex items-center gap-2 text-[9px] text-slate-400 uppercase font-black">
              <span className="flex items-center gap-1"><Monitor size={10}/> Desktop</span>
              <span className="flex items-center gap-1"><Smartphone size={10}/> Mobile Ready</span>
            </div>
          </div>
        </div>
        
        <button 
          onClick={() => handlePrint()}
          className="w-full sm:w-auto cursor-pointer flex items-center justify-center gap-2 px-6 py-2.5 md:py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg active:scale-95 text-xs md:text-sm"
        >
          <Download size={18} /> Download PDF
        </button>
      </div>

      {/* 2. RESPONSIVE VIEWPORT (The Magic Part) */}
      <div className="w-full bg-slate-100 p-2 md:p-10 flex justify-center overflow-hidden rounded-2xl md:rounded-[2rem] border-2 border-slate-200 shadow-inner min-h-[500px] md:min-h-[700px]">
        
        {/* RESIZING LOGIC: 
            On desktop: scale(0.8)
            On mobile: We use a container that allows the 210mm div to scale down 
            to fit the mobile width using CSS 'scale' and 'origin-top'.
        */}
        <div className="relative w-full flex justify-center scale-container">
          <div 
            className="bg-white shadow-2xl origin-top transition-all duration-300 print-wrapper"
            style={{ 
              width: '210mm', 
              minHeight: '297mm',
            }}
          >
            {/* THE ACTUAL CONTENT */}
            <div ref={componentRef} className="printable-area bg-white w-full h-full">
               {renderTemplate()}
            </div>
          </div>
        </div>
      </div>

      {/* 3. RESPONSIVE STYLES & PRINT FIXES */}
      <style dangerouslySetInnerHTML={{ __html: `
        /* Responsive Scaling for Mobile App Preview */
        @media (max-width: 768px) {
          .scale-container {
            /* This shrinks the A4 preview to fit mobile screens */
            height: 600px; 
            overflow: hidden;
          }
          .print-wrapper {
            transform: scale(0.4); /* Shrink for mobile */
            margin-bottom: -60%;
          }
        }

        @media (min-width: 769px) {
          .print-wrapper {
            transform: scale(0.85); /* Normal for desktop */
            margin-bottom: -100px;
          }
        }

        /* Essential Print Logic (Works on all devices) */
        @media print {
          body * { visibility: hidden !important; }
          .printable-area, .printable-area * { visibility: visible !important; }
          .printable-area {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 210mm !important;
            height: 297mm !important;
            transform: scale(1) !important; /* Always print at 100% size */
          }
          @page { size: A4; margin: 0; }
        }
      `}} />
    </div>
  );
};

export default ResumePreview;