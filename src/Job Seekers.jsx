

// import React, { useEffect, useState } from "react";
// import { MapPin, Briefcase, DollarSign, ChevronRight, CheckCircle } from "lucide-react";
// import { useNavigate } from "react-router";
// import { useSelector } from "react-redux";
// import Navbar from "./Navbar";
// import Footer from "./Footer";
// import FilterJobs from "./FilterJobs";

// const JobSeekersSection = () => {
//   const navigate = useNavigate();
//   const { allJobs, searchedQuery } = useSelector(store => store.job);
//   const [filterJobs, setFilterJobs] = useState(allJobs);

//   // Core Filtering Logic
//   useEffect(() => {
//     if (searchedQuery) {
//       const filtered = allJobs.filter((job) => {
//         return (
//           job?.title?.toLowerCase().includes(searchedQuery.toLowerCase()) ||
//           job?.description?.toLowerCase().includes(searchedQuery.toLowerCase()) ||
//           job?.location?.toLowerCase().includes(searchedQuery.toLowerCase()) ||
//           job?.salary?.toString().toLowerCase().includes(searchedQuery.toLowerCase())
//         );
//       });
//       setFilterJobs(filtered);
//     } else {
//       setFilterJobs(allJobs);
//     }
//   }, [allJobs, searchedQuery]);

//   const daysAgoFunction = (mongodbTime) => {
//     const createdAt = new Date(mongodbTime);
//     const currentTime = new Date();
//     const timeDifference = currentTime - createdAt;
//     return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
//   };

//   return (
//     <div className="bg-gray-50 min-h-screen flex flex-col">
//       <Navbar />
      
//       <div className="flex-grow pb-20">
//         <div className="text-[#387780] py-12">
//           <div className="max-w-7xl mx-auto px-6">
//             <h1 className="text-4xl font-black mb-2 tracking-tight">Find Your Next Role</h1>
//             <p className="text-gray-500 font-medium text-lg">Browse through the latest job openings on JiViKa.</p>
//           </div>
//         </div>

//         <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-8">
//           <FilterJobs />

//           <main className="w-full lg:w-3/4">
//             {filterJobs.length <= 0 ? (
//               <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[2rem] border border-dashed border-gray-300">
//                 <p className="text-gray-400 font-bold text-xl">No jobs match your criteria.</p>
//                 <button onClick={() => window.location.reload()} className="mt-4 text-[#387780] font-bold underline">Clear all filters</button>
//               </div>
//             ) : (
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {filterJobs.map((job) => (
//                   <div key={job?._id} className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-xl hover:border-[#387780]/20 transition-all flex flex-col">
//                     <div className="flex justify-between items-start mb-4">
//                       <div className="h-14 w-14 bg-[#f8fafc] rounded-2xl flex items-center justify-center border border-gray-50 overflow-hidden">
//                         <img src={job?.company?.logo} alt="logo" className="w-full h-full object-contain p-2" />
//                       </div>
//                       <span className="text-[10px] font-black uppercase tracking-widest bg-gray-100 text-gray-400 px-3 py-1.5 rounded-full">
//                         {daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)}d ago`}
//                       </span>
//                     </div>

//                     <h3 className="text-xl font-bold text-gray-900 mb-1">{job?.title}</h3>
//                     <p className="text-[#ff9933] font-bold text-sm mb-4 uppercase tracking-tighter">{job?.company?.name}</p>

//                     <div className="flex flex-wrap gap-2 mb-6">
//                       <div className="flex items-center text-gray-500 text-xs font-bold bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
//                         <MapPin size={14} className="mr-1.5" /> {job?.location}
//                       </div>
//                       <div className="flex items-center text-gray-500 text-xs font-bold bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
//                         <DollarSign size={14} className="mr-1.5" /> {job?.salary} LPA
//                       </div>
//                     </div>

//                     <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
//                       <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-black bg-emerald-50 text-emerald-600 uppercase tracking-widest">
//                         <CheckCircle size={12} className="mr-1.5" /> {job?.jobType}
//                       </span>
//                       <button 
//                         onClick={() => navigate(`/job-seekers/description/${job?._id}`)}
//                         className="text-[#387780] font-black text-sm flex items-center hover:gap-2 transition-all"
//                       >
//                         DETAILS <ChevronRight size={18} />
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </main>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default JobSeekersSection;

import React, { useEffect, useState } from "react";
import { MapPin, Briefcase, DollarSign, ChevronRight, CheckCircle, ChevronLeft, Building2 } from "lucide-react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";
import Footer from "./Footer";
import FilterJobs from "./FilterJobs";

const JobSeekersSection = () => {
  const navigate = useNavigate();
  const {user} = useSelector(store => store.user);
  const { allJobs, searchedQuery } = useSelector(store => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);

  // --- PAGINATION STATES ---
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 8;

  // Core Filtering Logic
  useEffect(() => {
    if (searchedQuery) {
      const filtered = allJobs.filter((job) => {
        return (
          job?.title?.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job?.description?.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job?.location?.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job?.salary?.toString().toLowerCase().includes(searchedQuery.toLowerCase())
        );
      });
      setFilterJobs(filtered);
    } else {
      setFilterJobs(allJobs);
    }
    // Reset to first page whenever search/filter changes
    setCurrentPage(1);
  }, [allJobs, searchedQuery]);

  // --- PAGINATION LOGIC ---
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filterJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filterJobs.length / jobsPerPage);

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  };

  useEffect(()=>{
    if(!user){
      navigate("/register")
    }
  })

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow pb-20">
        <div className="text-[#387780] py-12">
          <div className="max-w-7xl mx-auto px-6">
            <h1 className="text-4xl font-black mb-2 tracking-tight">Find Your Next Role</h1>
            <p className="text-gray-500 font-medium text-lg">Browse through the latest job openings on JiViKa.</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-8">
          <FilterJobs />

          <main className="w-full lg:w-3/4">
            {filterJobs.length <= 0 ? (
              <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[2rem] border border-dashed border-gray-300">
                <p className="text-gray-400 font-bold text-xl">No jobs match your criteria.</p>
                <button onClick={() => window.location.reload()} className="mt-4 text-[#387780] font-bold underline">Clear all filters</button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Map through currentJobs (paginated) instead of filterJobs */}
                  {currentJobs.map((job) => (
                    <div key={job?._id} className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-xl hover:border-[#387780]/20 transition-all flex flex-col">
                      <div className="flex justify-between items-start mb-4">
                        <div className="h-14 w-14 bg-[#f8fafc] rounded-2xl flex items-center justify-center border border-gray-100 overflow-hidden">
                          {job?.company?.logo ? <img src={job.company.logo} alt={`${job.company.name} logo`} className="w-full h-full object-contain p-2" /> : <Building2 className="text-[#387780]" size={24} aria-label="Company" />}
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest bg-gray-100 text-gray-400 px-3 py-1.5 rounded-full">
                          {daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)}d ago`}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 mb-1">{job?.title}</h3>
                      <p className="text-[#ff9933] font-bold text-sm mb-4 uppercase tracking-tighter">{job?.company?.name}</p>

                      <div className="flex flex-wrap gap-2 mb-6">
                        <div className="flex items-center text-gray-500 text-xs font-bold bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                          <MapPin size={14} className="mr-1.5" /> {job?.location}
                        </div>
                        <div className="flex items-center text-gray-500 text-xs font-bold bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                          <DollarSign size={14} className="mr-1.5" /> {job?.salary} LPA
                        </div>
                      </div>

                      <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
                        <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-black bg-emerald-50 text-emerald-600 uppercase tracking-widest">
                          <CheckCircle size={12} className="mr-1.5" /> {job?.jobType}
                        </span>
                        <button 
                          onClick={() => navigate(`/job-seekers/description/${job?._id}`)}
                          className="text-[#387780] font-black text-sm flex items-center hover:gap-2 transition-all"
                        >
                          DETAILS <ChevronRight size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* --- PAGINATION CONTROLS --- */}
                {filterJobs.length > jobsPerPage && (
                  <div className="flex justify-center items-center mt-12 gap-2">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className={`p-2 rounded-xl border transition-all ${
                        currentPage === 1 
                        ? "text-gray-300 border-gray-100 cursor-not-allowed" 
                        : "text-[#387780] border-gray-200 hover:bg-[#387780] hover:text-white"
                      }`}
                    >
                      <ChevronLeft size={20} />
                    </button>

                    {[...Array(totalPages)].map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentPage(index + 1)}
                        className={`w-10 h-10 rounded-xl font-bold transition-all ${
                          currentPage === index + 1
                            ? "bg-[#387780] text-white shadow-lg shadow-[#387780]/20"
                            : "text-gray-500 hover:bg-gray-100"
                        }`}
                      >
                        {index + 1}
                      </button>
                    ))}

                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className={`p-2 rounded-xl border transition-all ${
                        currentPage === totalPages 
                        ? "text-gray-300 border-gray-100 cursor-not-allowed" 
                        : "text-[#387780] border-gray-200 hover:bg-[#387780] hover:text-white"
                      }`}
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default JobSeekersSection;
