
import React, { useState } from "react";
import { 
  Briefcase, MapPin, DollarSign, FileText, 
  CheckCircle, Globe, Zap, Loader2, Building2, ChevronDown 
} from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { useSelector } from "react-redux";
import axios from "axios";
import { JOB_API_END_POINT } from "../Utils/Constant";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const PostJobs = () => {
  const [loading, setLoading] = useState(false);
  const { companies } = useSelector((store) => store.company);

  // Form State
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: "" 
  });

  const navigate = useNavigate();
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectChangeHandler = (e) => {
    // Access the value directly from the event
    const selectedCompanyId = e.target.value;
    setInput({ ...input, companyId: selectedCompanyId });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    
    // Basic Validation: Ensure a company is selected
    if(!input.companyId) {
        alert("Please select a company first.");
        return;
    }

    // setLoading(true);
    try {
       setLoading(true);
       const res = await axios.post(`${JOB_API_END_POINT}/post`, input,{
        headers:{
          'Content-Type':'application/json'
        },
        withCredentials:true
       });
       if(res.data.success){
        toast.success(res.data.message);
        navigate('/admin/jobs');
        
       }else{
        toast.error(error.response.data.message);

       }
      console.log("Submitting Job for Company ID:", input.companyId, input);
      // Your axios.post call here
      // const response = await axios.post(JOB_API_END_POINT, input, { withCredentials: true });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="h-1 w-10 bg-[#ff9933] rounded-full"></span>
              <span className="text-[#387780] font-black uppercase tracking-widest text-xs">Recruiter Console</span>
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">
              Create <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#387780] to-slate-900">New Opportunity</span>
            </h1>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 bg-white p-2 rounded-2xl border border-slate-100 shadow-sm">
            {/* Company Selection Dropdown */}
            <div className="relative w-full sm:w-64 group">
              <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#387780] transition-colors" size={18} />
              <select
                name="companyId"
                value={input.companyId}
                onChange={selectChangeHandler}
                className="w-full pl-12 pr-10 py-3 bg-slate-50 border-none rounded-xl font-bold text-slate-700 appearance-none focus:ring-2 focus:ring-[#387780]/20 outline-none transition-all cursor-pointer"
                required
              >
                <option value="">Select Company</option>
                {companies?.map((company) => (
                  <option key={company._id} value={company._id}>
                    {company.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
            </div>

            <button 
              form="job-post-form"
              type="submit" 
              disabled={loading}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 bg-[#387780] text-white rounded-xl font-black shadow-lg shadow-[#387780]/20 hover:bg-[#2c5e65] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <> <Loader2 className="animate-spin" size={16} /> Posting... </>
              ) : (
                <> <Zap size={16} fill="white"/> Publish Job </>
              )}
            </button>
          </div>
          {companies.length === 0 && (
            <p className="text-red-500 font-bold text-sm">Please register a company first.</p>
          )}
        </div>

        <form id="job-post-form" onSubmit={submitHandler}>
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1 space-y-8">
              {/* 1. Core Information */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-slate-100 shadow-sm"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl"><Briefcase size={24}/></div>
                  <h3 className="text-xl font-black text-slate-800 tracking-tight">Core Information</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Job Title</label>
                    <input 
                      type="text" name="title" value={input.title} onChange={changeEventHandler}
                      placeholder="e.g. Senior Frontend Engineer"
                      className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-[#387780] focus:bg-white outline-none font-bold text-slate-700 transition-all"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Location</label>
                    <div className="relative">
                      <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={18}/>
                      <input 
                        type="text" name="location" value={input.location} onChange={changeEventHandler}
                        placeholder="Remote, Noida, etc."
                        className="w-full pl-14 pr-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-[#387780] focus:bg-white outline-none font-bold text-slate-700 transition-all"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
                   <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Salary</label>
                      <div className="relative">
                        <DollarSign className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={18}/>
                        <input name="salary" value={input.salary} onChange={changeEventHandler} type="number" placeholder="5-10 LPA" className="w-full pl-14 focus:border-[#387780] pr-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 outline-none font-bold text-slate-700"/>
                      </div>
                   </div>
                   <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Experience</label>
                      <input name="experience" value={input.experience} onChange={changeEventHandler} type="text" placeholder="2+ Years" className="w-full px-6 py-4 rounded-2xl focus:border-[#387780] bg-slate-50 border border-slate-100 outline-none font-bold text-slate-700"/>
                   </div>
                   <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Openings</label>
                      <input name="position" value={input.position} onChange={changeEventHandler} type="number" className="w-full px-6 py-4 rounded-2xl focus:border-[#387780] bg-slate-50 border border-slate-100 outline-none font-bold text-slate-700"/>
                   </div>
                   <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Job Type</label>
                      <input name="jobType" value={input.jobType} onChange={changeEventHandler} type="text" placeholder="Full Time" className="w-full px-6 py-4 rounded-2xl focus:border-[#387780] bg-slate-50 border border-slate-100 outline-none font-bold text-slate-700"/>
                   </div>
                </div>
              </motion.div>

              {/* 2. Detailed Description */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-slate-100 shadow-sm"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl"><FileText size={24}/></div>
                  <h3 className="text-xl font-black text-slate-800 tracking-tight">Role Description</h3>
                </div>
                
                <div className="space-y-6">
                  <div className="space-y-2">
                     <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">About the Role</label>
                     <textarea name="description" value={input.description} onChange={changeEventHandler} rows="4" placeholder="Responsibilities..." className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-[#387780] focus:bg-white outline-none font-bold text-slate-700 resize-none"></textarea>
                  </div>
                  <div className="space-y-2">
                     <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Requirements</label>
                     <textarea name="requirements" value={input.requirements} onChange={changeEventHandler} rows="4" placeholder="Skills needed..." className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-[#387780] focus:bg-white outline-none font-bold text-slate-700 resize-none"></textarea>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Sidebar Quality Check */}
            <div className="lg:w-80 space-y-6">
              <div className="bg-slate-900 rounded-[2rem] p-8 text-white">
                <h4 className="text-lg font-black mb-4 flex items-center gap-2">
                  <CheckCircle size={18} className="text-[#ff9933]"/> Quality Check
                </h4>
                <ul className="space-y-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                  {[
                    { label: "Title", key: "title" },
                    { label: "Company", key: "companyId" },
                    { label: "Salary", key: "salary" },
                    { label: "Description", key: "description" },
                    { label: "Requirements", key: "requirements" },
                    { label: "Job Type", key: "jobType" },
                    { label: "Openings", key: "position" },
                    { label: "Experience", key: "experience" }
                  ].map((item) => (
                    <li key={item.key} className={`flex items-center gap-2 ${input[item.key] ? 'text-[#ff9933]' : ''}`}>
                      <div className={`h-1.5 w-1.5 rounded-full ${input[item.key] ? 'bg-[#ff9933]' : 'bg-slate-700'}`}></div> {item.label} Added
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-[#387780]/5 rounded-[2rem] p-8 border border-[#387780]/10">
                <Globe className="text-[#387780] mb-4" size={32}/>
                <h4 className="text-sm font-black text-[#387780] uppercase tracking-widest mb-2">Global Visibility</h4>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  By publishing, this job will be instantly visible to over 50,000+ active job seekers on JiViKa.
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default PostJobs;