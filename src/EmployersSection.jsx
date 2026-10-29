// import React from "react";
// import { 
//   Users, 
//   Zap, 
//   ClipboardList, 
//   CheckCircle, 
//   Send, 
//   BarChart3, 
//   ChevronRight 
// } from "lucide-react";
// import Navbar from "./Navbar";
// import Footer from "./Footer";
// import { useNavigate } from "react-router";

// const EmployersSection = () => {
//   const benefits = [
//     {
//       icon: <Users className="w-8 h-8" />,
//       title: "Access Top Talent",
//       desc: "Connect with over 2 million qualified candidates across all industries.",
//     },
//     {
//       icon: <Zap className="w-8 h-8" />,
//       title: "Instant Matching",
//       desc: "Our AI-powered algorithm finds the best candidates for your role in seconds.",
//     },
//     {
//       icon: <BarChart3 className="w-8 h-8" />,
//       title: "Advanced Analytics",
//       desc: "Track application trends and manage your hiring pipeline effectively.",
//     },
//   ];

//   const navigate = useNavigate();
//   return (
//     <div>
//       <Navbar />
//     <div className="bg-white min-h-screen">
//       {/* --- HERO / HEADER --- */}
//       <div className="bg-[#387780] py-20 text-white text-center px-6">
//         <h1 className="text-5xl font-extrabold mb-6 leading-tight">
//           Hire Your Dream Team with <span className="text-[#ff9933]">JiViKa</span>
//         </h1>
//         <p className="text-xl opacity-90 mb-10 max-w-2xl mx-auto">
//           Post your jobs to the world's most engaged community of professionals. 
//           Start hiring today and scale your business.
//         </p>
//         <button  onClick={()=>navigate("/employers/job-post")} className="bg-[#ff9933] text-white font-bold py-4 px-10 rounded-full shadow-lg hover:scale-105 transition transform text-lg flex items-center mx-auto">
//           Post a Job Now <Send className="ml-2 w-5 h-5" />
//         </button>
//       </div>

//       {/* --- BENEFITS STATS --- */}
//       <div className="max-w-7xl mx-auto px-6 -mt-10 mb-20">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {benefits.map((benefit, idx) => (
//             <div key={idx} className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 text-center">
//               <div className="inline-block p-4 bg-[#eef6f7] text-[#387780] rounded-2xl mb-4">
//                 {benefit.icon}
//               </div>
//               <h3 className="text-xl font-bold mb-2 text-gray-800">{benefit.title}</h3>
//               <p className="text-gray-500">{benefit.desc}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* --- HOW TO POST SECTION --- */}
//       <div className="py-20 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-16">
//           <div className="lg:w-1/2">
//             <h2 className="text-4xl font-bold text-gray-800 mb-6">Simple 3-Step Hiring</h2>
//             <div className="space-y-8">
//               {[
//                 { step: "01", title: "Create Company Profile", desc: "Build brand awareness with a custom company page." },
//                 { step: "02", title: "Post Your Job", desc: "Define your requirements and reach targeted candidates." },
//                 { step: "03", title: "Review & Hire", desc: "Use our dashboard to interview and select the best fit." }
//               ].map((item, idx) => (
//                 <div key={idx} className="flex items-start">
//                   <span className="text-4xl font-black text-[#ff9933]/20 mr-4">{item.step}</span>
//                   <div>
//                     <h4 className="text-xl font-bold text-gray-800">{item.title}</h4>
//                     <p className="text-gray-600">{item.desc}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
          
//           {/* Card Mockup */}
//           <div className="lg:w-1/2 bg-white p-8 rounded-3xl shadow-2xl border-t-8 border-[#387780]">
//             <h3 className="text-2xl font-bold mb-4">Preview Your Job Post</h3>
//             <div className="border border-dashed border-gray-200 p-6 rounded-xl">
//               <div className="flex items-center mb-4">
//                 <div className="w-12 h-12 bg-gray-200 rounded-lg mr-4"></div>
//                 <div>
//                   <div className="h-4 w-32 bg-gray-200 rounded mb-2"></div>
//                   <div className="h-3 w-20 bg-gray-100 rounded"></div>
//                 </div>
//               </div>
//               <div className="space-y-2">
//                 <div className="h-3 w-full bg-gray-50 rounded"></div>
//                 <div className="h-3 w-full bg-gray-50 rounded"></div>
//                 <div className="h-3 w-2/3 bg-gray-50 rounded"></div>
//               </div>
//               <button className="mt-6 w-full py-2 bg-[#387780]/10 text-[#387780] font-bold rounded-lg cursor-not-allowed">
//                 Apply Now
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* --- CTA BOTTOM --- */}
//       <div className="py-20 text-center">
//         <h2 className="text-3xl font-bold mb-6">Ready to find your next great hire?</h2>
//         <div className="flex justify-center gap-4">
//           <button className="bg-[#387780] text-white px-8 py-3 rounded-full font-bold hover:bg-[#2c5e65] transition">
//             View Pricing
//           </button>
//           <button className="border-2 border-[#387780] text-[#387780] px-8 py-3 rounded-full font-bold hover:bg-gray-50 transition">
//             Contact Sales
//           </button>
//         </div>
//       </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default EmployersSection;

import React from "react";
import { 
  Users, 
  Zap, 
  Send, 
  BarChart3, 
  MoreHorizontal, 
  Eye, 
  Edit3, 
  Trash2,
  Calendar,
  CheckCircle
} from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";

const EmployersSection = () => {
  const navigate = useNavigate();

  const benefits = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "Access Top Talent",
      desc: "Connect with over 2 million qualified candidates across all industries.",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Instant Matching",
      desc: "Our AI-powered algorithm finds the best candidates for your role in seconds.",
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Advanced Analytics",
      desc: "Track application trends and manage your hiring pipeline effectively.",
    },
  ];

  // Dummy Data for Registered Companies (Replace with your Redux/API data)
  const registeredCompanies = [
    { id: 1, logo: "https://logo.clearbit.com/google.com", name: "Google Tech", date: "2023-10-12" },
    { id: 2, logo: "https://logo.clearbit.com/microsoft.com", name: "Microsoft Corp", date: "2024-01-05" },
    { id: 3, logo: "https://logo.clearbit.com/amazon.com", name: "Amazon Services", date: "2024-02-15" },
  ];

  return (
    <div>
      <Navbar />
      <div className="bg-white min-h-screen">
        {/* --- HERO SECTION --- */}
        <div className="bg-[#387780] py-24 text-white text-center px-6">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-black mb-6 leading-tight"
          >
            Hire Your Dream Team with <span className="text-[#ff9933]">JiViKa</span>
          </motion.h1>
          <p className="text-xl opacity-90 mb-10 max-w-2xl mx-auto font-medium">
            Post your jobs to the world's most engaged community of professionals. 
            Start hiring today and scale your business.
          </p>
          <button 
            onClick={() => navigate("/employers/company-name")} 
            className="bg-[#ff9933] text-white font-black py-5 px-12 rounded-full shadow-2xl hover:bg-[#e68a00] transition transform hover:scale-105 text-lg flex items-center mx-auto gap-3"
          >
            Post a Job Now <Send size={20} />
          </button>
        </div>

        {/* --- BENEFITS STATS --- */}
        <div className="max-w-7xl mx-auto px-6 -mt-12 mb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-50 text-center hover:translate-y-[-5px] transition-all">
                <div className="inline-block p-4 bg-[#eef6f7] text-[#387780] rounded-2xl mb-5">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-black mb-2 text-slate-800">{benefit.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* --- REGISTERED COMPANIES SECTION --- */}
        {/* <div className="max-w-7xl mx-auto px-6 mb-24">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-black text-slate-900">Registered Companies</h2>
              <p className="text-slate-500 font-medium">Manage your organization profiles and job listings.</p>
            </div>
            <button 
              // onClick={() => navigate(() =>("employers/job-post"))}
              onClick={() => navigate("/employers/company-name")}
              className="bg-slate-900 text-white px-6 py-3 rounded-2xl font-bold text-sm hover:bg-slate-800 transition shadow-lg"
            >
              + Register New Company
            </button>
          </div>

          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-slate-200/40 overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="px-8 py-6 text-xs font-black uppercase tracking-widest text-slate-400">Logo</th>
                  <th className="px-8 py-6 text-xs font-black uppercase tracking-widest text-slate-400">Company Name</th>
                  <th className="px-8 py-6 text-xs font-black uppercase tracking-widest text-slate-400">Reg. Date</th>
                  <th className="px-8 py-6 text-xs font-black uppercase tracking-widest text-slate-400 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {registeredCompanies.map((company) => (
                  <tr key={company.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-8 py-5">
                      <div className="w-12 h-12 rounded-2xl bg-white border border-slate-100 p-2 shadow-sm flex items-center justify-center overflow-hidden">
                        <img src={company.logo} alt={company.name} className="w-full h-full object-contain" />
                      </div>
                    </td>
                    <td className="px-8 py-5 font-black text-slate-800 text-lg">
                      {company.name}
                    </td>
                    <td className="px-8 py-5 text-slate-500 font-bold flex items-center gap-2 mt-4">
                      <Calendar size={14} className="text-[#387780]" />
                      {company.date}
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 text-slate-400 hover:text-[#387780] hover:bg-[#387780]/10 rounded-xl transition-all">
                          <Edit3 size={18} />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all">
                          <Trash2 size={18} />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all">
                          <MoreHorizontal size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div> */}

        {/* --- HOW TO POST SECTION --- */}
        <div className="py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <h2 className="text-4xl font-black text-slate-900 mb-8">Simple 3-Step Hiring</h2>
              <div className="space-y-10">
                {[
                  { step: "01", title: "Create Company Profile", desc: "Build brand awareness with a custom company page." },
                  { step: "02", title: "Post Your Job", desc: "Define your requirements and reach targeted candidates." },
                  { step: "03", title: "Review & Hire", desc: "Use our dashboard to interview and select the best fit." }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-6 group">
                    <span className="text-5xl font-black text-[#ff9933]/10 group-hover:text-[#ff9933]/20 transition-colors leading-none">{item.step}</span>
                    <div>
                      <h4 className="text-xl font-black text-slate-800 mb-1">{item.title}</h4>
                      <p className="text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Live Preview Card */}
            <div className="lg:w-1/2 bg-white p-10 rounded-[3rem] shadow-2xl shadow-slate-200 border-t-[12px] border-[#387780]">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-black text-slate-900">Live Preview</h3>
                <span className="bg-[#387780]/10 text-[#387780] px-3 py-1 rounded-lg text-[10px] font-black uppercase">Standard Listing</span>
              </div>
              <div className="border-2 border-dashed border-slate-100 p-8 rounded-3xl bg-slate-50/30">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-slate-200 rounded-2xl mr-5 animate-pulse"></div>
                  <div className="space-y-2">
                    <div className="h-5 w-40 bg-slate-200 rounded-lg animate-pulse"></div>
                    <div className="h-3 w-24 bg-slate-100 rounded-lg animate-pulse"></div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="h-3 w-full bg-slate-100 rounded-lg"></div>
                  <div className="h-3 w-full bg-slate-100 rounded-lg"></div>
                  <div className="h-3 w-3/4 bg-slate-100 rounded-lg"></div>
                </div>
                <button className="mt-8 w-full py-4 bg-[#387780] text-white font-black rounded-2xl opacity-40 cursor-not-allowed flex items-center justify-center gap-2">
                  <CheckCircle size={18} /> Apply Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* --- CTA BOTTOM --- */}
        <div className="py-24 text-center">
          <h2 className="text-4xl font-black mb-8 text-slate-900">Ready to find your next great hire?</h2>
          <div className="flex justify-center items-center gap-6">
            <button className="bg-[#387780] text-white px-10 py-4 rounded-2xl font-black hover:bg-[#2c5e65] transition shadow-xl shadow-[#387780]/20">
              View Pricing
            </button>
            <button className="border-2 border-slate-200 text-slate-600 px-10 py-4 rounded-2xl font-black hover:bg-slate-50 transition">
              Contact Sales
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EmployersSection;