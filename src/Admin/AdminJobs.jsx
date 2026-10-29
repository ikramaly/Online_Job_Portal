
import React, { useEffect, useState } from "react";
import {
  Calendar,
  Edit3,
  Trash2,
  ExternalLink,
  Search,
  ArrowUpRight,
  User,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "../Footer";
import Navbar from "../Navbar";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { JOB_API_END_POINT } from "../Utils/Constant";
import axios from "axios";
import { toast } from "react-toastify";
import useGetAllAdminJobs from "../Hooks/useGetAllAdminJobs";
import { setAllJobs, setSearchJobByText } from "../Redux/jobSlice";

const AdminJobs = () => {
  useGetAllAdminJobs();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { searchJobByText, allAdminJobs } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allAdminJobs);
  const [input, setInput] = useState("");

  // --- PAGINATION STATES ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Adjust this number to change jobs per page

  useEffect(() => {
    const filteredJobs = allAdminJobs.filter((job) => {
      if (!searchJobByText) return true;
      return (
        job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
        job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase())
      );
    });
    setFilterJobs(filteredJobs);
    setCurrentPage(1); // Reset to first page when search changes
  }, [allAdminJobs, searchJobByText]);

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input, dispatch]);

  // --- PAGINATION CALCULATION ---
  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentJobs = filterJobs.slice(firstItemIndex, lastItemIndex);
  const totalPages = Math.ceil(filterJobs.length / itemsPerPage);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;

    try {
      const res = await axios.delete(`${JOB_API_END_POINT}/delete/${id}`, {
        withCredentials: true,
      });

      if (res.data.success) {
        const updatedJobs = allAdminJobs.filter((job) => job._id !== id);
        dispatch(setAllJobs(updatedJobs));
        toast.success("Job deleted successfully ✅");
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
              A list of{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#387780] to-slate-900">
                Posted Jobs
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
                onChange={(e) => setInput(e.target.value)}
                placeholder="Search jobs or companies..."
                className="w-full lg:w-64 pl-12 pr-6 py-3.5 bg-slate-50 md:bg-white border border-slate-100 rounded-2xl shadow-sm focus:ring-4 focus:ring-[#387780]/5 outline-none transition-all font-bold text-slate-700"
              />
            </div>
            <button
              onClick={() => navigate("/admin-jobs/post-jobs")}
              className="bg-slate-900 text-white px-6 md:px-8 py-4 rounded-2xl font-black text-sm hover:bg-[#387780] transition-all shadow-xl flex items-center justify-center gap-2 group whitespace-nowrap cursor-pointer"
            >
              + <span className="hidden sm:inline">Post Job</span>
              <ArrowUpRight
                size={16}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
              />
            </button>
          </div>
        </div>

        {/* Mobile & Tablet Card Layout (Mapping over currentJobs) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:hidden">
          <AnimatePresence mode="wait">
            {currentJobs?.length > 0 ? (
              currentJobs.map((job, index) => (
                <motion.div
                  key={job._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => navigate(`/employers/job-post/${job._id}`)}
                        className="p-2.5 bg-slate-50 text-slate-600 rounded-xl hover:text-[#387780]"
                      >
                        <Edit3 size={18} />
                      </button>
                      <button
                        onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                        className="p-2.5 bg-slate-50 text-slate-600 rounded-xl hover:text-[#387780]"
                      >
                        <User size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(job._id)}
                        className="p-2.5 bg-red-50 text-red-500 rounded-xl"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                  <h3 className="font-black text-slate-800 text-lg leading-tight mb-1">
                    {job?.company?.name}
                  </h3>
                  <h3 className="font-bold text-[#387780] text-md leading-tight mb-2">
                    {job?.title}
                  </h3>
                  <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-wider mb-4">
                    <Calendar size={12} /> {job.createdAt?.split("T")[0]}
                  </div>
                  <button className="w-full py-3 bg-[#387780] text-white rounded-xl font-black text-xs flex items-center justify-center gap-2">
                    <ExternalLink size={14} /> View Details
                  </button>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full py-10 text-center text-slate-500 font-bold">
                No jobs found in this view.
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Desktop Data Table (Mapping over currentJobs) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="hidden lg:block bg-white rounded-[3rem] border border-slate-100 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] overflow-hidden"
        >
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-10 py-7 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
                  Company Name
                </th>
                <th className="px-10 py-7 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
                  Role
                </th>
                <th className="px-10 py-7 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
                  Posted Date
                </th>
                <th className="px-10 py-7 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {currentJobs?.length > 0 ? (
                currentJobs.map((job, index) => (
                  <motion.tr
                    key={job._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-[#f8fafc] transition-all group"
                  >
                    <td className="px-10 py-6">
                      <span className="font-black text-slate-800 text-lg group-hover:text-[#387780] transition-colors">
                        {job?.company?.name}
                      </span>
                    </td>
                    <td className="px-10 py-6">
                      <span className="font-black text-slate-800 text-lg group-hover:text-[#387780] transition-colors">
                        {job?.title}
                      </span>
                    </td>
                    <td className="px-10 py-6">
                      <div className="flex items-center gap-2.5 text-slate-500 font-black text-sm">
                        <Calendar size={14} className="text-[#387780]" />
                        {job.createdAt?.split("T")[0]}
                      </div>
                    </td>
                    <td className="px-10 py-6 text-right">
                      <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                        <button
                          onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                          className="p-3 bg-white text-slate-400 hover:text-[#387780] border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-all"
                        >
                          <User size={18} />
                        </button>
                        <button
                          onClick={() => navigate(`/admin-jobs/post-jobs`)}
                          className="p-3 bg-white text-slate-400 hover:text-[#387780] border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-all"
                        >
                          <Edit3 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(job._id)}
                          className="p-3 bg-white text-slate-400 hover:text-red-500 border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-all"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-20 text-slate-400 font-bold uppercase tracking-widest text-xs">
                    No jobs found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </motion.div>

        {/* --- PAGINATION UI --- */}
        <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-6">
          <p className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest">
            Showing {filterJobs.length === 0 ? 0 : firstItemIndex + 1} to{" "}
            {Math.min(lastItemIndex, filterJobs.length)} of {filterJobs.length} Jobs.
          </p>

          <div className="flex items-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className={`h-10 w-10 flex items-center justify-center rounded-xl border transition-all ${
                currentPage === 1
                  ? "border-slate-100 text-slate-200 cursor-not-allowed"
                  : "border-slate-200 bg-white text-slate-600 hover:border-[#387780] hover:text-[#387780]"
              }`}
            >
              <ChevronLeft size={18} />
            </button>

            {/* Page Number Buttons */}
            <div className="flex gap-1">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`h-10 w-10 rounded-xl font-bold text-xs transition-all ${
                    currentPage === index + 1
                      ? "bg-slate-900 text-white shadow-lg shadow-slate-200"
                      : "bg-white border border-slate-100 text-slate-400 hover:bg-slate-50"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            <button
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className={`h-10 w-10 flex items-center justify-center rounded-xl border transition-all ${
                currentPage === totalPages || totalPages === 0
                  ? "border-slate-100 text-slate-200 cursor-not-allowed"
                  : "border-slate-900 bg-slate-900 text-white hover:bg-[#387780]"
              }`}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminJobs;