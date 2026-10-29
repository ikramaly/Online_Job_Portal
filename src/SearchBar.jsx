
// import React, { useState, useEffect } from 'react';
// import { Search, MapPin, Briefcase, ExternalLink } from 'lucide-react';
// import { useNavigate } from "react-router";
// import { useDispatch } from 'react-redux';

// const SearchBar = () => {
//   const [query, setQuery] = useState("");
//   const [showSuggestions, setShowSuggestions] = useState(false);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [searchTerm, setSearchTerm] = useState("");
//   const [location, setLocation] = useState("");

//   // Logic to handle clicking outside to close the blur
//   const closeSearch = () => {
//     setShowSuggestions(false);
//   };

//   const suggestions = [
//     { id: 1, title: "Frontend Developer", company: "Google", link: "/job-seekers" },
//     { id: 2, title: "UI/UX Designer", company: "Meta", link: "/job-seekers" },
//     { id: 3, title: "Data Scientist", company: "Microsoft", link: "/job-seekers" },
//     { id: 4, title: "Java developer", company: "Microsoft", link: "/job-seekers" },
//     { id: 5, title: "Mern stack developer", company: "Microsoft", link: "/job-seekers" },
//     { id: 6, title: "Java Full stack", company: "Microsoft", link: "/job-seekers" },
//     { id: 7, title: "Backend developer", company: "Microsoft", link: "/job-seekers" },
//     { id: 8, title: "Call center", company: "Microsoft", link: "/job-seekers" },
//     { id: 9, title: "Login", company: "Microsoft", link: "/login" },
//     { id: 10, title: "Register", company: "Microsoft", link: "/register" },
//     { id: 11, title: "About", company: "About section", link: "/about-us" },
//     { id: 12, title: "My profile", company: "My profile section", link: "/my-profile" },
//     { id: 13, title: "Job Seekers", company: "Job Seekers section", link: "/job-seekers" },
//     { id: 14, title: "Homepage", company: "Home page Section", link: "/" },
//     { id: 15, title: "Photoshop", company: "Microsoft", link: "/companies" },
//   ];

//   return (
//     <>
//       {/* --- THE BLUR BACKDROP --- */}
//       {/* This div covers the whole screen, blurs it, and darkens it */}
//       {showSuggestions && (
//         <div 
//           className="fixed inset-0 bg-black/20 backdrop-blur-md z-[50] transition-all duration-500"
//           onClick={closeSearch} // Click anywhere outside to close
//         />
//       )}

//       {/* --- Search Bar Container --- */}
//       {/* Added z-[60] so it sits ON TOP of the blur */}
//       <div className={`relative w-full max-w-4xl mx-auto transition-all duration-300 ${showSuggestions ? 'z-[60]' : 'z-10'}`}>
        
//         {/* --- Main Search Input Group --- */}
//         <div className={`bg-white p-2 rounded-2xl lg:rounded-full shadow-2xl flex flex-col lg:flex-row items-center gap-2 border transition-all ${showSuggestions ? 'border-[#387780] ring-4 ring-[#387780]/10' : 'border-gray-100'}`}>
          
//           <div className="flex items-center flex-1 px-4 w-full">
//             <Search className={`${showSuggestions ? 'text-[#387780]' : 'text-gray-400'} mr-3 transition-colors`} size={20} />
//             <input 
//               type="text"
//               value={query}
//               onFocus={() => setShowSuggestions(true)} // Blur starts on focus
//               onChange={(e) => {
//                 setQuery(e.target.value);
//                 if (e.target.value.length === 0) setShowSuggestions(false);
//                 else setShowSuggestions(true);
//               }}
//               placeholder="Job title, keywords, or company"
//               className="w-full py-3 outline-none text-gray-700 placeholder-gray-400 bg-transparent"
//             />
//           </div>

//           <div className="hidden lg:block w-px h-8 bg-gray-200"></div>
          
//           <div className="px-4">
//             <svg 
//               width="24" height="24" viewBox="0 0 24 24" fill="none" 
//               className="hover:scale-110 transition-transform duration-300 cursor-pointer"
//             >
//               <defs>
//                 <linearGradient id="gemini-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
//                   <stop offset="0%" stopColor="#4285F4" />
//                   <stop offset="50%" stopColor="#9b72cb" />
//                   <stop offset="100%" stopColor="#d96570" />
//                 </linearGradient>
//               </defs>
//               <path 
//                 d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" 
//                 stroke="url(#gemini-gradient)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
//               />
//             </svg>
//           </div>
//         </div>

//         {/* --- Suggestions Dropdown --- */}
//         {showSuggestions && (
//           <div className="absolute top-full left-0 right-0 mt-3 bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden z-[70] animate-in fade-in slide-in-from-top-4 duration-300">
//             <div className="p-4 bg-gray-50/50 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">
//               Suggestions for you
//             </div>
            
//             <div className="max-h-80 overflow-y-auto">
//               {suggestions.map((job) => (
//                 <a
//                   key={job.id}
//                   href={job.link}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="flex items-center justify-between p-4 hover:bg-[#eef6f7] transition-colors group"
//                 >
//                   <div className="flex items-center gap-4">
//                     <div className="p-2 bg-slate-50 rounded-xl group-hover:bg-[#387780] group-hover:text-white transition-all">
//                       <Briefcase size={18} />
//                     </div>
//                     <div>
//                       <h4 className="font-bold text-gray-800 group-hover:text-[#387780] transition-colors">{job.title}</h4>
//                       <p className="text-xs text-gray-500">{job.company}</p>
//                     </div>
//                   </div>
//                   <ExternalLink size={14} className="text-gray-300 group-hover:text-[#387780] opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0" />
//                 </a>
//               ))}
//             </div>
            
//             <button className="w-full p-4 text-center text-sm font-bold text-[#387780] hover:bg-gray-50 transition-colors border-t border-gray-50">
//               See all results matching "{query}"
//             </button>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default SearchBar;

// import React, { useState } from 'react';
// import { Search, Briefcase, ExternalLink } from 'lucide-react';
// import { useNavigate } from "react-router";

// const SearchBar = () => {
//   const [query, setQuery] = useState("");
//   const [showSuggestions, setShowSuggestions] = useState(false);
//   const navigate = useNavigate();

//   const closeSearch = () => {
//     setShowSuggestions(false);
//   };

//   const suggestions = [
//     { id: 1, title: "Frontend Developer", company: "Google", link: "/job-seekers" },
//     { id: 2, title: "UI/UX Designer", company: "Meta", link: "/job-seekers" },
//     { id: 3, title: "Data Scientist", company: "Microsoft", link: "/job-seekers" },
//     { id: 4, title: "Java developer", company: "Microsoft", link: "/job-seekers" },
//     { id: 5, title: "Mern stack developer", company: "Microsoft", link: "/job-seekers" },
//     { id: 6, title: "Java Full stack", company: "Microsoft", link: "/job-seekers" },
//     { id: 7, title: "Backend developer", company: "Microsoft", link: "/job-seekers" },
//     { id: 8, title: "Call center", company: "Microsoft", link: "/job-seekers" },
//     { id: 9, title: "Login", company: "Microsoft", link: "/login" },
//     { id: 10, title: "Register", company: "Microsoft", link: "/register" },
//     { id: 11, title: "About", company: "About section", link: "/about-us" },
//     { id: 12, title: "My profile", company: "My profile section", link: "/my-profile" },
//     { id: 13, title: "Job Seekers", company: "Job Seekers section", link: "/job-seekers" },
//     { id: 14, title: "Homepage", company: "Home page Section", link: "/" },
//     { id: 15, title: "Photoshop", company: "Microsoft", link: "/companies" },
//   ];

//   // --- NEW FILTER LOGIC ---
//   // This filters the list whenever 'query' changes
//   const filteredSuggestions = suggestions.filter((item) => {
//     const searchTerm = query.toLowerCase();
//     return (
//       item.title.toLowerCase().includes(searchTerm) || 
//       item.company.toLowerCase().includes(searchTerm)
//     );
//   });

//   return (
//     <>
//       {showSuggestions && (
//         <div 
//           className="fixed inset-0 bg-black/20 backdrop-blur-md z-[50] transition-all duration-500"
//           onClick={closeSearch} 
//         />
//       )}

//       <div className={`relative w-full max-w-4xl mx-auto transition-all duration-300 ${showSuggestions ? 'z-[60]' : 'z-10'}`}>
        
//         <div className={`bg-white p-2 rounded-2xl lg:rounded-full shadow-2xl flex flex-col lg:flex-row items-center gap-2 border transition-all ${showSuggestions ? 'border-[#387780] ring-4 ring-[#387780]/10' : 'border-gray-100'}`}>
          
//           <div className="flex items-center flex-1 px-4 w-full">
//             <Search className={`${showSuggestions ? 'text-[#387780]' : 'text-gray-400'} mr-3 transition-colors`} size={20} />
//             <input 
//               type="text"
//               value={query}
//               onFocus={() => setShowSuggestions(true)}
//               onChange={(e) => {
//                 setQuery(e.target.value);
//                 setShowSuggestions(true);
//               }}
//               placeholder="Job title, keywords, or company"
//               className="w-full py-3 outline-none text-gray-700 placeholder-gray-400 bg-transparent font-medium"
//             />
//           </div>

//           <div className="hidden lg:block w-px h-8 bg-gray-200"></div>
          
//           <div className="px-4">
//              {/* Your SVG Icon */}
//              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="hover:scale-110 transition-transform cursor-pointer">
//                 <path d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="url(#gemini-gradient)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
//              </svg>
//           </div>
//         </div>

//         {/* --- DYNAMIC SUGGESTIONS --- */}
//         {showSuggestions && (
//           <div className="absolute top-full left-0 right-0 mt-3 bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden z-[70] animate-in fade-in slide-in-from-top-4 duration-300">
//             <div className="p-4 bg-gray-50/50 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">
//               {query.length > 0 ? `Results for "${query}"` : "Popular Categories"}
//             </div>
            
//             <div className="max-h-80 overflow-y-auto">
//               {filteredSuggestions.length > 0 ? (
//                 filteredSuggestions.map((job) => (
//                   <a
//                     key={job.id}
//                     href={job.link}
//                     className="flex items-center justify-between p-4 hover:bg-[#eef6f7] transition-colors group"
//                   >
//                     <div className="flex items-center gap-4">
//                       <div className="p-2 bg-slate-50 rounded-xl group-hover:bg-[#387780] group-hover:text-white transition-all">
//                         <Briefcase size={18} />
//                       </div>
//                       <div>
//                         <h4 className="font-bold text-gray-800 group-hover:text-[#387780] transition-colors">{job.title}</h4>
//                         <p className="text-xs text-gray-500">{job.company}</p>
//                       </div>
//                     </div>
//                     <ExternalLink size={14} className="text-gray-300 group-hover:text-[#387780] opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0" />
//                   </a>
//                 ))
//               ) : (
//                 <div className="p-8 text-center">
//                   <p className="text-gray-400 text-sm">No results found for "{query}"</p>
//                 </div>
//               )}
//             </div>
            
//             {query.length > 0 && (
//               <button className="w-full p-4 text-center text-sm font-bold text-[#387780] hover:bg-gray-50 transition-colors border-t border-gray-50">
//                 Search all jobs for "{query}"
//               </button>
//             )}
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default SearchBar;

import React, { useState } from 'react';
import { Search, Briefcase, ExternalLink, X } from 'lucide-react';

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const closeSearch = () => {
    setShowSuggestions(false);
  };

  const suggestions = [
    { id: 1, title: "Frontend Developer", company: "Google", link: "/job-seekers" },
    { id: 2, title: "UI/UX Designer", company: "Meta", link: "/job-seekers" },
    { id: 3, title: "Data Scientist", company: "Microsoft", link: "/job-seekers" },
    { id: 4, title: "Java developer", company: "Microsoft", link: "/job-seekers" },
    { id: 5, title: "Mern stack developer", company: "Microsoft", link: "/job-seekers" },
    { id: 6, title: "Java Full stack", company: "Microsoft", link: "/job-seekers" },
    { id: 7, title: "Backend developer", company: "Microsoft", link: "/job-seekers" },
    { id: 8, title: "Call center", company: "Microsoft", link: "/job-seekers" },
    { id: 9, title: "Login", company: "Microsoft", link: "/login" },
    { id: 10, title: "Register", company: "Microsoft", link: "/register" },
    { id: 11, title: "About", company: "About section", link: "/about-us" },
    { id: 12, title: "My profile", company: "My profile section", link: "/my-profile" },
    { id: 13, title: "Job Seekers", company: "Job Seekers section", link: "/job-seekers" },
    { id: 14, title: "Homepage", company: "Home page Section", link: "/" },
    { id: 15, title: "Photoshop", company: "Microsoft", link: "/companies" },
  ];


  const filteredSuggestions = suggestions.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.company.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      {/* --- THE BLUR BACKDROP --- */}
      {showSuggestions && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xl z-[100] transition-all duration-500"
          onClick={closeSearch} 
        />
      )}

      {/* --- Search Bar Container --- */}
      {/* When showSuggestions is true, we fix it to the middle of the viewport */}
      <div className={`
        transition-all duration-500 ease-in-out
        ${showSuggestions 
          ? 'fixed top-1/4 left-1/2 -translate-x-1/2 w-[90%] max-w-2xl z-[110]' 
          : 'relative w-full max-w-4xl mx-auto z-10'}
      `}>
        
        {/* --- Main Search Input Group --- */}
        <div className={`
          bg-white p-2 rounded-2xl lg:rounded-full shadow-2xl flex flex-col lg:flex-row items-center gap-2 border transition-all duration-300
          ${showSuggestions ? 'border-indigo-500 ring-8 ring-indigo-500/10' : 'border-gray-100'}
        `}>
          
          <div className="flex items-center flex-1 px-4 w-full">
            <Search className={`${showSuggestions ? 'text-indigo-600' : 'text-gray-400'} mr-3 transition-colors`} size={20} />
            <input 
              type="text"
              value={query}
              onFocus={() => setShowSuggestions(true)}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search jobs, roles or companies..."
              className="w-full py-3 outline-none text-gray-700 font-medium bg-transparent"
            />
          </div>

          {/* Close button visible only in Focus mode */}
          {showSuggestions && (
            <button 
              onClick={(e) => { e.stopPropagation(); closeSearch(); }}
              className="lg:hidden p-2 text-gray-400 hover:text-rose-500"
            >
              <X size={20} />
            </button>
          )}

          <div className="hidden lg:block w-px h-8 bg-gray-200"></div>
          
          <div className="px-4 hidden lg:block">
             <Search size={22} className="text-indigo-600" />
          </div>
        </div>

        {/* --- DYNAMIC SUGGESTIONS --- */}
        {showSuggestions && (
          <div className="absolute top-full left-0 right-0 mt-4 bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.2)] border border-gray-100 overflow-hidden z-[120] animate-in fade-in zoom-in-95 slide-in-from-top-2 duration-300">
            <div className="p-5 bg-gray-50/80 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] border-b border-gray-100">
              {query.length > 0 ? `Matching Results` : "Quick Access"}
            </div>
            
            <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
              {filteredSuggestions.length > 0 ? (
                filteredSuggestions.map((job) => (
                  <a
                    key={job.id}
                    href={job.link}
                    className="flex items-center justify-between p-5 hover:bg-indigo-50 transition-all group border-b border-gray-50 last:border-0"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 flex items-center justify-center bg-gray-50 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">
                        <Briefcase size={18} />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800 group-hover:text-indigo-700 transition-colors">{job.title}</h4>
                        <p className="text-xs text-gray-500 font-medium uppercase tracking-tighter">{job.company}</p>
                      </div>
                    </div>
                    <ExternalLink size={16} className="text-gray-300 group-hover:text-indigo-600 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0" />
                  </a>
                ))
              ) : (
                <div className="p-10 text-center">
                  <p className="text-gray-400 text-sm font-medium italic">No results found for "{query}"</p>
                </div>
              )}
            </div>
            
            {query.length > 0 && (
              <button className="w-full p-5 text-center text-sm font-extrabold text-indigo-600 hover:bg-indigo-50 transition-colors border-t border-gray-100">
                View all results for "{query}"
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default SearchBar;