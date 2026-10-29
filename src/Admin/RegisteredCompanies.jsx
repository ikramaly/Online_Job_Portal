// import React, { useEffect, useState } from "react";
// import {
//   Calendar,
//   Edit3,
//   Trash2,
//   MoreHorizontal,
//   ExternalLink,
//   Search,
//   Filter,
//   ArrowUpRight,
// } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import Footer from "../Footer";
// import Navbar from "../Navbar";
// import { useNavigate, useParams } from "react-router";
// import { useDispatch, useSelector } from "react-redux";
// import useGetAllCompanies from "../Hooks/useGetAllCompanies";
// import { setCompanies, setSearchCompanyByText } from "../Redux/companySlice";
// import { COMPANY_API_END_POINT } from "../Utils/Constant";
// import axios from "axios";
// import { toast } from "react-toastify";

// const RegisteredCompanies = () => {
//   useGetAllCompanies();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const params = useParams();
//   const { companies, searchCompanyByText } = useSelector(
//     (store) => store.company,
//   );

//   const [filterCompany, setFilterCompany] = useState(companies);
//   const [input, setInput] = useState("");

//   useEffect(() => {
//     const filteredCompany =
//       companies.length >= 0 &&
//       companies.filter((company) => {
//         if (!searchCompanyByText) return true;
//         return company?.name
//           ?.toLowerCase()
//           .includes(searchCompanyByText.toLowerCase());
//       });
//     setFilterCompany(filteredCompany);
//   }, [companies, searchCompanyByText]);

//   useEffect(() => {
//     dispatch(setSearchCompanyByText(input));
//   }, [input, dispatch]);


// const handleDelete = async (id) => {
//   const confirmDelete = window.confirm("Are you sure you want to delete?");
//   if (!confirmDelete) return;

//   try {
//     const res = await axios.delete(
//       `${COMPANY_API_END_POINT}/delete/${id}`,
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//         withCredentials: true, // optional (can remove if not using cookies)
//       }
//     );

//     if (res.data.success) {
//       const updatedCompanies = companies.filter(
//         (company) => company._id !== id
//       );

//       dispatch(setCompanies(updatedCompanies));

//     //   alert("Company deleted successfully ✅");
//     toast.success("Company deleted successfully ✅ .")
//     }
//   } catch (error) {
//     console.log("ERROR:", error.response?.data || error.message);
//     toast.error(error.response?.data?.message || "Internal server error.");
//   }
// };
//   return (
//     <div className="min-h-screen bg-white">
//       <Navbar />
//       <div className="max-w-7xl mx-auto mt-24 md:mt-10 px-4 sm:px-6 mb-25">
//         {/* Header Section */}
//         <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 md:mb-12 gap-6">
//           <div>
//             <motion.div
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               className="flex items-center gap-2 mb-3"
//             >
//               <span className="h-1 w-8 md:w-10 bg-[#ff9933] rounded-full"></span>
//               <span className="text-[#387780] font-black uppercase tracking-widest text-[10px] md:text-xs">
//                 Employer Dashboard
//               </span>
//             </motion.div>
//             <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
//               Registered{" "}
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#387780] to-slate-900">
//                 Companies
//               </span>
//             </h2>
//             <p className="text-slate-500 font-medium mt-2 text-sm md:text-base">
//               Manage your professional organization profiles and global
//               listings.
//             </p>
//           </div>

//           <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
//             <div className="relative group flex-1">
//               <Search
//                 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#387780] transition-colors"
//                 size={18}
//               />
//               <input
//                 type="text"
//                 onChange={(e) => setInput(e.target.value)}
//                 placeholder="Search companies..."
//                 className="w-full lg:w-64 pl-12 pr-6 py-3.5 bg-slate-50 md:bg-white border border-slate-100 rounded-2xl shadow-sm focus:ring-4 focus:ring-[#387780]/5 outline-none transition-all font-bold text-slate-700"
//               />
//             </div>
//             <button
//               onClick={() => navigate("/employers/company-name")}
//               className="bg-slate-900 text-white px-6 md:px-8 py-4 rounded-2xl font-black text-sm hover:bg-[#387780] transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-2 group whitespace-nowrap"
//             >
//               + <span className="hidden sm:inline">Register New Company</span>
//               <span className="sm:hidden text-xs">Register</span>
//               <ArrowUpRight
//                 size={16}
//                 className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
//               />
//             </button>
//           </div>
//         </div>

//         {/* Mobile & Tablet Card Layout (Visible only on small screens) */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:hidden">
//           <AnimatePresence>
//             {filterCompany?.length > 0 ? (
//               filterCompany.map((company, index) => (
//                 <motion.div
//                   key={company._id}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, scale: 0.95 }}
//                   transition={{ delay: index * 0.1 }}
//                   className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all"
//                 >
//                   <div className="flex items-start justify-between mb-4">
//                     <div className="w-14 h-14 rounded-2xl border border-slate-100 p-2 bg-white flex items-center justify-center">
//                       <img
//                         src={company.logo}
//                         alt={company.name}
//                         className="w-full h-full object-contain"
//                       />
//                     </div>
//                     <div className="flex gap-2">
//                       <button
//                         onClick={() =>
//                           navigate(`/employers/job-post/${company._id}`)
//                         }
//                         className="p-2.5 bg-slate-50 text-slate-600 rounded-xl hover:text-[#387780]"
//                       >
//                         <Edit3 size={18} />
//                       </button>
//                       <button
//                         onClick={() => handleDelete(company._id)}
//                         className="p-2.5 bg-red-50 text-red-500 rounded-xl"
//                       >
//                         <Trash2 size={18} />
//                       </button>
//                     </div>
//                   </div>
//                   <h3 className="font-black text-slate-800 text-lg leading-tight mb-1">
//                     {company.name}
//                   </h3>
//                   <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-wider mb-4">
//                     <Calendar size={12} /> {company.createdAt?.split("T")[0]}
//                   </div>
//                   <button className="w-full py-3 bg-[#387780] text-white rounded-xl font-black text-xs flex items-center justify-center gap-2">
//                     <ExternalLink size={14} /> View Site
//                   </button>
//                 </motion.div>
//               ))
//             ) : (
//               <div className="col-span-full py-10 text-center text-slate-500 font-bold">
//                 No companies found.
//               </div>
//             )}
//           </AnimatePresence>
//         </div>

//         {/* Desktop Data Table (Hidden on small screens) */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="hidden lg:block bg-white rounded-[3rem] border border-slate-100 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] overflow-hidden"
//         >
//           <table className="w-full text-left border-collapse">
//             <thead>
//               <tr className="bg-slate-50/50 border-b border-slate-100">
//                 <th className="px-10 py-7 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
//                   Identity
//                 </th>
//                 <th className="px-10 py-7 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
//                   Organization Name
//                 </th>
//                 <th className="px-10 py-7 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
//                   Onboarding Date
//                 </th>
//                 <th className="px-10 py-7 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 text-right">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-slate-50">
//               {filterCompany?.length > 0 ? (
//                 filterCompany.map((company, index) => (
//                   <motion.tr
//                     key={company._id}
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ delay: index * 0.1 }}
//                     className="hover:bg-[#f8fafc] transition-all group"
//                   >
//                     <td className="px-10 py-6">
//                       <div className="w-16 h-16 rounded-[1.5rem] bg-white border border-slate-100 p-3 shadow-sm group-hover:shadow-md transition-all flex items-center justify-center overflow-hidden">
//                         <img
//                           src={company.logo}
//                           alt={company.name}
//                           className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
//                         />
//                       </div>
//                     </td>
//                     <td className="px-10 py-6">
//                       <span className="font-black text-slate-800 text-lg group-hover:text-[#387780] transition-colors">
//                         {company.name}
//                       </span>
//                     </td>
//                     <td className="px-10 py-6">
//                       <div className="flex items-center gap-2.5 text-slate-500 font-black text-sm">
//                         <Calendar size={14} className="text-[#387780]" />
//                         {company.createdAt?.split("T")[0]}
//                       </div>
//                     </td>
//                     <td className="px-10 py-6 text-right">
//                       <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
//                         <button
//                           onClick={() =>
//                             navigate(`/employers/job-post/${company._id}`)
//                           }
//                           className="p-3 bg-white text-slate-400 hover:text-[#387780] border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-all"
//                         >
//                           <Edit3 size={18} />
//                         </button>
//                         <button
//                           onClick={() => handleDelete(company._id)}
//                           className="p-3 bg-white text-slate-400 hover:text-red-500 border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-all"
//                         >
//                           <Trash2 size={18} />
//                         </button>
//                         <button
//                           onClick={() => navigate(`/${company.website}`)}
//                           className="p-3 bg-[#387780] text-white rounded-2xl shadow-lg hover:scale-105 transition-all"
//                         >
//                           <ExternalLink size={18} />
//                         </button>
//                       </div>
//                     </td>
//                   </motion.tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td
//                     colSpan="4"
//                     className="text-center py-20 text-slate-400 font-bold uppercase tracking-widest text-xs"
//                   >
//                     No registered entities found
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </motion.div>

//         {/* Pagination (Simplified for Responsive) */}
//         <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-center">
//           <p className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest">
//             Total {filterCompany?.length} entities registered
//           </p>
//           <div className="flex gap-2">
//             <button className="h-10 px-4 flex items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 font-bold hover:border-[#387780] transition-all">
//               Prev
//             </button>
//             <button className="h-10 px-4 flex items-center justify-center rounded-xl bg-slate-900 text-white font-bold transition-all">
//               Next
//             </button>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default RegisteredCompanies;

import React, { useEffect, useState } from "react";
import {
  Calendar,
  Edit3,
  Trash2,
  ExternalLink,
  Search,
  ArrowUpRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "../Footer";
import Navbar from "../Navbar";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import useGetAllCompanies from "../Hooks/useGetAllCompanies";
import { setCompanies, setSearchCompanyByText } from "../Redux/companySlice";
import { COMPANY_API_END_POINT } from "../Utils/Constant";
import axios from "axios";
import { toast } from "react-toastify";

const RegisteredCompanies = () => {
  useGetAllCompanies();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { companies, searchCompanyByText } = useSelector((store) => store.company);

  const [filterCompany, setFilterCompany] = useState([]);
  const [input, setInput] = useState("");

  // --- PAGINATION STATE ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Sync search input with Redux
  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [input, dispatch]);

  // Filter companies and handle page reset
  useEffect(() => {
    const filtered = companies.filter((company) => {
      if (!searchCompanyByText) return true;
      return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
    });
    setFilterCompany(filtered);
    setCurrentPage(1); // Reset to page 1 on every new search
  }, [companies, searchCompanyByText]);

  // --- PAGINATION CALCULATIONS ---
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCompanies = filterCompany.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filterCompany.length / itemsPerPage);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this company?");
    if (!confirmDelete) return;

    try {
      const res = await axios.delete(`${COMPANY_API_END_POINT}/delete/${id}`, {
        withCredentials: true,
      });

      if (res.data.success) {
        const updatedCompanies = companies.filter((company) => company._id !== id);
        dispatch(setCompanies(updatedCompanies));
        toast.success("Company deleted successfully ✅");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Internal server error.");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-7xl mx-auto mt-24 md:mt-10 px-4 sm:px-6 mb-25">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 md:mb-12 gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 mb-3"
            >
              <span className="h-1 w-8 md:w-10 bg-[#ff9933] rounded-full"></span>
              <span className="text-[#387780] font-black uppercase tracking-widest text-[10px] md:text-xs">
                Employer Dashboard
              </span>
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
              Registered{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#387780] to-slate-900">
                Companies
              </span>
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <div className="relative group flex-1">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#387780] transition-colors"
                size={18}
              />
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Search companies..."
                className="w-full lg:w-64 pl-12 pr-6 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl shadow-sm focus:ring-4 focus:ring-[#387780]/5 outline-none transition-all font-bold text-slate-700"
              />
            </div>
            <button
              onClick={() => navigate("/employers/company-name")}
              className="bg-slate-900 text-white px-6 md:px-8 py-4 rounded-2xl font-black text-sm hover:bg-[#387780] transition-all shadow-xl flex items-center justify-center gap-2 group whitespace-nowrap"
            >
              + Register New Company
              <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Mobile View */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:hidden">
          <AnimatePresence mode="wait">
            {currentCompanies.length > 0 ? (
              currentCompanies.map((company, index) => (
                <motion.div
                  key={company._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-14 h-14 rounded-2xl border border-slate-100 p-2 bg-white flex items-center justify-center">
                      <img src={company.logo} alt={company.name} className="w-full h-full object-contain" />
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => navigate(`/employers/job-post/${company._id}`)} className="p-2.5 bg-slate-50 text-slate-600 rounded-xl hover:text-[#387780]"><Edit3 size={18} /></button>
                      <button onClick={() => handleDelete(company._id)} className="p-2.5 bg-red-50 text-red-500 rounded-xl"><Trash2 size={18} /></button>
                    </div>
                  </div>
                  <h3 className="font-black text-slate-800 text-lg mb-1">{company.name}</h3>
                  <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase mb-4">
                    <Calendar size={12} /> {company.createdAt?.split("T")[0]}
                  </div>
                  <button onClick={() => window.open(company.website, '_blank')} className="w-full py-3 bg-[#387780] text-white rounded-xl font-black text-xs flex items-center justify-center gap-2">
                    <ExternalLink size={14} /> View Site
                  </button>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full py-10 text-center text-slate-500 font-bold">No companies found.</div>
            )}
          </AnimatePresence>
        </div>

        {/* Desktop Table View */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="hidden lg:block bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden"
        >
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-10 py-7 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">Identity</th>
                <th className="px-10 py-7 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">Organization Name</th>
                <th className="px-10 py-7 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">Onboarding Date</th>
                <th className="px-10 py-7 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {currentCompanies.length > 0 ? (
                currentCompanies.map((company, index) => (
                  <motion.tr key={company._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: index * 0.05 }} className="hover:bg-[#f8fafc] group transition-all">
                    <td className="px-10 py-6">
                      <div className="w-16 h-16 rounded-[1.5rem] bg-white border border-slate-100 p-3 shadow-sm flex items-center justify-center overflow-hidden">
                        <img src={company.logo} alt={company.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />
                      </div>
                    </td>
                    <td className="px-10 py-6 font-black text-slate-800 text-lg group-hover:text-[#387780] transition-colors">{company.name}</td>
                    <td className="px-10 py-6 flex items-center gap-2.5 text-slate-500 font-black text-sm pt-12">
                      <Calendar size={14} className="text-[#387780]" /> {company.createdAt?.split("T")[0]}
                    </td>
                    <td className="px-10 py-6 text-right">
                      <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                        <button onClick={() => navigate(`/employers/job-post/${company._id}`)} className="p-3 bg-white text-slate-400 hover:text-[#387780] border border-slate-100 rounded-2xl shadow-sm"><Edit3 size={18} /></button>
                        <button onClick={() => handleDelete(company._id)} className="p-3 bg-white text-slate-400 hover:text-red-500 border border-slate-100 rounded-2xl shadow-sm"><Trash2 size={18} /></button>
                        <button onClick={() => window.open(company.website, '_blank')} className="p-3 bg-[#387780] text-white rounded-2xl shadow-lg"><ExternalLink size={18} /></button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr><td colSpan="4" className="text-center py-20 text-slate-400 font-bold uppercase text-xs">No registered entities found</td></tr>
              )}
            </tbody>
          </table>
        </motion.div>

        {/* Pagination Controls */}
        <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest">
            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filterCompany.length)} of {filterCompany.length} entities
          </p>
          
          <div className="flex items-center gap-2">
            <button 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => prev - 1)}
              className={`h-10 px-4 flex items-center justify-center rounded-xl border border-slate-200 font-bold transition-all ${currentPage === 1 ? "opacity-30 cursor-not-allowed" : "bg-white text-slate-600 hover:border-[#387780]"}`}
            >
              Prev
            </button>

            <div className="flex gap-1">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-10 h-10 rounded-xl font-bold text-xs transition-all ${currentPage === i + 1 ? "bg-[#387780] text-white shadow-lg" : "bg-white border border-slate-200 text-slate-400"}`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button 
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => setCurrentPage(prev => prev + 1)}
              className={`h-10 px-4 flex items-center justify-center rounded-xl font-bold transition-all ${currentPage === totalPages || totalPages === 0 ? "opacity-30 cursor-not-allowed" : "bg-slate-900 text-white hover:bg-[#387780]"}`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RegisteredCompanies;