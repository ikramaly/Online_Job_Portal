// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { 
//   Briefcase, MapPin, DollarSign, ListChecks, 
//   PlusCircle, Loader2, Building, Globe, UserCheck 
// } from 'lucide-react';
// import axios from 'axios';
// import { JOB_API_END_POINT } from '../Utils/Constant';
// import { useNavigate } from 'react-router';
// import { toast } from 'react-toastify';
// import { useSelector } from 'react-redux';

// const Companies = () => {
//   const [input, setInput] = useState({
//     title: "",
//     description: "",
//     requirements: "",
//     salary: "",
//     location: "",
//     jobType: "",
//     experience: "",
//     position: 0,
//     companyId: ""
//   });
  
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
// //   const { companies } = useSelector(store => store.company); // Assuming you have companies in redux

//   const changeEventHandler = (e) => {
//     setInput({ ...input, [e.target.name]: e.target.value });
//   };

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     try {
//       setLoading(true);
//       const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
//         headers: { 'Content-Type': 'application/json' },
//         withCredentials: true
//       });
//       if (res.data.success) {
//         toast.success(res.data.message);
//         navigate("/admin/jobs");
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Internal Server Error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6">
//       <motion.div 
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="max-w-4xl mx-auto"
//       >
//         <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden">
          
//           {/* Header Section */}
//           <div className="bg-[#387780] p-10 text-white">
//             <h1 className="text-3xl font-black flex items-center gap-3">
//               <PlusCircle size={32} className="text-[#ff9933]" />
//               Post New Opportunity
//             </h1>
//             <p className="text-slate-100 mt-2 font-medium opacity-80">
//               Create a high-impact job listing for the JiViKa global talent pool.
//             </p>
//           </div>

//           <form className="p-8 md:p-12">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
//               {/* Job Title */}
//               <div className="space-y-2">
//                 <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
//                   <Briefcase size={16} /> Job Title
//                 </label>
//                 <input
//                   type="text"
//                   name="title"
//                 //   value={input.title}
//                 //   onChange={changeEventHandler}
//                   placeholder="e.g. Senior Frontend Developer"
//                   className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-[#387780] focus:ring-4 focus:ring-[#387780]/10 outline-none transition-all"
//                   required
//                 />
//               </div>

//               {/* Salary */}
//               <div className="space-y-2">
//                 <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
//                   <DollarSign size={16} /> Salary (LPA)
//                 </label>
//                 <input
//                   type="text"
//                   name="salary"
//                 //   value={input.salary}
//                 //   onChange={changeEventHandler}
//                   placeholder="e.g. 12-18"
//                   className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-[#387780] focus:ring-4 focus:ring-[#387780]/10 outline-none transition-all"
//                   required
//                 />
//               </div>

//               {/* Location */}
//               <div className="space-y-2">
//                 <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
//                   <MapPin size={16} /> Location
//                 </label>
//                 <input
//                   type="text"
//                   name="location"
//                 //   value={input.location}
//                 //   onChange={changeEventHandler}
//                   placeholder="e.g. Remote or New Delhi"
//                   className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-[#387780] focus:ring-4 focus:ring-[#387780]/10 outline-none transition-all"
//                   required
//                 />
//               </div>

//               {/* Experience Level */}
//               <div className="space-y-2">
//                 <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
//                   <UserCheck size={16} /> Experience Level (Years)
//                 </label>
//                 <input
//                   type="number"
//                   name="experience"
//                 //   value={input.experience}
//                 //   onChange={changeEventHandler}
//                   placeholder="e.g. 3"
//                   className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-[#387780] focus:ring-4 focus:ring-[#387780]/10 outline-none transition-all"
//                   required
//                 />
//               </div>

//               {/* Job Type */}
//               <div className="space-y-2">
//                 <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
//                   <Globe size={16} /> Job Type
//                 </label>
//                 <select
//                   name="jobType"
//                 //   value={input.jobType}
//                 //   onChange={changeEventHandler}
//                   className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-[#387780] focus:ring-4 focus:ring-[#387780]/10 outline-none transition-all appearance-none"
//                   required
//                 >
//                   <option value="">Select Type</option>
//                   <option value="Full-Time">Full-Time</option>
//                   <option value="Part-Time">Part-Time</option>
//                   <option value="Contract">Contract</option>
//                   <option value="Internship">Internship</option>
//                 </select>
//               </div>

//               {/* Select Company */}
//               {/* <div className="space-y-2">
//                 <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
//                   <Briefcase size={16} /> Select Company
//                 </label>
//                 <select
//                   name="companyId"
//                 //   onChange={changeEventHandler}
//                   className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-[#387780] focus:ring-4 focus:ring-[#387780]/10 outline-none transition-all"
//                   required
//                 >
//                   <option value="">Choose your registered company</option> */}
//                   {/* {companies?.map((company) => (
//                     <option key={company._id} value={company._id}>{company.name}</option>
//                   ))} */}
//                 {/* </select>
//               </div> */}

//               {/* Description (Full Width) */}
//               <div className="md:col-span-2 space-y-2">
//                 <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
//                    Job Description
//                 </label>
//                 <textarea
//                   name="description"
//                   rows="4"
//                 //   value={input.description}
//                 //   onChange={changeEventHandler}
//                   placeholder="Describe the roles and responsibilities..."
//                   className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-[#387780] focus:ring-4 focus:ring-[#387780]/10 outline-none transition-all resize-none"
//                   required
//                 />
//               </div>

//               {/* Requirements (Full Width) */}
//               <div className="md:col-span-2 space-y-2">
//                 <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
//                   <ListChecks size={16} /> Skills & Requirements (Comma separated)
//                 </label>
//                 <input
//                   type="text"
//                   name="requirements"
//                 //   value={input.requirements}
//                 //   onChange={changeEventHandler}
//                   placeholder="e.g. React, Node.js, AWS, MongoDB"
//                   className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-[#387780] focus:ring-4 focus:ring-[#387780]/10 outline-none transition-all"
//                   required
//                 />
//               </div>
//             </div>

//             {/* Submit Button */}
//             <div className="mt-12">
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full py-5 rounded-2xl bg-[#ff9933] text-white font-black text-xl hover:bg-[#e68a00] shadow-xl shadow-orange-200 transition-all active:scale-95 flex items-center justify-center gap-3 disabled:bg-slate-400 disabled:cursor-not-allowed"
//               >
//                 {loading ? (
//                   <>
//                     <Loader2 className="animate-spin" /> Finalizing Job Post...
//                   </>
//                 ) : (
//                   "Post Job to JiViKa"
//                 )}
//               </button>
//             </div>
//           </form>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default Companies;

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Briefcase, MapPin, Globe, Upload, 
  PlusCircle, Loader2, Info, CheckCircle, 
  ArrowRight, X 
} from 'lucide-react';
import axios from 'axios';
import { COMPANY_API_END_POINT} from '../Utils/Constant';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import useGetCompanyById from '../Hooks/useGetCompanyById';
// import useGetAllCompanies from '../Hooks/useGetAllCompanies';

const Companies = () => {
  const params = useParams();
    useGetCompanyById(params.id);
  const [loading, setLoading] = useState(false);
  const [logoPreview, setLogoPreview] = useState(null);
  const [input, setInput] = useState({
    name : "",
    description: "",
    website: "",
    location: "",
    file: null
  });

  const navigate = useNavigate();
  
  
    const {singleCompany} = useSelector(store => store.company);
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const fileHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput({ ...input, file });
      const reader = new FileReader();
      reader.onloadend = () => setLogoPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(input);
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    if (input.file) formData.append("file", input.file);

    try {
      setLoading(true);
      const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true
      });
      if (res.data.success) {
        toast.success("Job Opportunity Live!");
        navigate("/admin/registered-companies");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Internal Server Error");
    } finally {
      setLoading(false);
    }
  };

  // const {singleCompany} = useSelector(store => store.company);

  useEffect(()=>{
    setInput({
      name: singleCompany.name || "",
      description:singleCompany.description || "",
      website:singleCompany.website || "",
      location:singleCompany.location || "",
      file:singleCompany.file || null,
    });
  },[singleCompany]);

  return (
    <div className="min-h-screen bg-[#f8fafc] py-16 px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-5xl mx-auto"
      >
        <div className="bg-white rounded-[3rem] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden flex flex-col lg:flex-row">
          
          {/* Left Side: Brand & Status */}
          <div className="lg:w-1/3 bg-[#387780] p-12 text-white flex flex-col justify-between">
            <div>
              <div className="bg-[#ff9933] w-12 h-12 rounded-2xl flex items-center justify-center mb-8 shadow-lg">
                <PlusCircle size={28} className="text-white" />
              </div>
              <h1 className="text-4xl font-black mb-6 leading-tight">Create a <br />New Opening</h1>
              <p className="text-slate-100 opacity-70 font-medium leading-relaxed">
                Fill in the details to reach our global community of high-performing professionals.
              </p>
            </div>

            <div className="space-y-6 mt-12">
              <StatusStep icon={<CheckCircle size={18}/>} text="Company Details" active={true}/>
              <StatusStep icon={<Info size={18}/>} text="Job Description" active={false}/>
              <StatusStep icon={<Globe size={18}/>} text="Public Visibility" active={false}/>
            </div>
          </div>

          {/* Right Side: Form */}
          <form onSubmit={submitHandler} className="lg:w-2/3 p-8 md:p-16 space-y-10">
            
            {/* Logo Upload Section */}
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-[2rem] p-8 bg-slate-50/50 hover:bg-white hover:border-[#387780] transition-all group relative">
              {logoPreview ? (
                <div className="relative">
                  <img src={logoPreview} alt="Preview" className="w-24 h-24 rounded-2xl object-cover shadow-md border-2 border-white" />
                  <button 
                    onClick={() => setLogoPreview(null)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-lg hover:scale-110 transition"
                  >
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center cursor-pointer">
                  <div className="bg-white p-4 rounded-2xl shadow-sm text-[#387780] group-hover:scale-110 transition-transform mb-3">
                    <Upload size={24} />
                  </div>
                  <span className="text-sm font-black text-slate-700">Upload Company Logo</span>
                  <span className="text-xs text-slate-400 mt-1">PNG, JPG up to 5MB</span>
                  <input type="file" className="hidden" accept="image/*" onChange={fileHandler} />
                </label>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Job Title */}
              <div className="space-y-2">
                <CustomLabel icon={<Briefcase size={16}/>} text="Company Name" />
                <input
                  type="text"
                  name="name"
                  value={input.name}
                  placeholder="eg. Google, Facebook"
                  className="custom-input"
                  onChange={changeEventHandler}
                  required
                />
              </div>

              {/* Location */}
              <div className="space-y-2">
                <CustomLabel icon={<MapPin size={16}/>} text="Work Location" />
                <input
                  type="text"
                  name="location"
                  value={input.location}
                  placeholder="e.g. London, UK / Remote"
                  className="custom-input"
                  onChange={changeEventHandler}
                  required
                />
              </div>

              {/* Website (Full Width on small, half on large) */}
              <div className="md:col-span-2 space-y-2">
                <CustomLabel icon={<Globe size={16}/>} text="Company Website URL" />
                <input
                  type="url"
                  name="website"
                  value={input.website}
                  placeholder="https://company.com"
                  className="custom-input"
                  onChange={changeEventHandler}
                  required
                />
              </div>

              {/* Description */}
              <div className="md:col-span-2 space-y-2">
                <CustomLabel icon={<Info size={16}/>} text="Detailed Job Description" />
                <textarea
                  name="description"
                  rows="5"
                  value={input.description}
                  placeholder="Describe the role, impact, and ideal candidate..."
                  className="custom-input resize-none"
                  onChange={changeEventHandler}
                  required
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4 pt-4">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-8 py-5 rounded-2xl font-black text-slate-400 hover:bg-slate-50 transition-colors"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-5 rounded-2xl bg-[#ff9933] text-white font-black text-xl hover:bg-[#e68a00] shadow-xl shadow-orange-100 transition-all active:scale-95 flex items-center justify-center gap-3 disabled:bg-slate-300"
              >
                {loading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <>Publish Opening <ArrowRight size={20} /></>
                )}
              </button>
            </div>
          </form>
        </div>
      </motion.div>

      {/* Global CSS Inject */}
      <style jsx="true">{`
        .custom-input {
          width: 100%;
          padding: 1.25rem 1.5rem;
          border-radius: 1.25rem;
          background: #f8fafc;
          border: 2px solid #f1f5f9;
          font-weight: 700;
          color: #1e293b;
          transition: all 0.3s ease;
          outline: none;
        }
        .custom-input:focus {
          border-color: #387780;
          background: white;
          box-shadow: 0 10px 15px -3px rgba(56, 119, 128, 0.1);
        }
        .custom-input::placeholder {
          color: #cbd5e1;
          font-weight: 500;
        }
      `}</style>
    </div>
  );
};

/* Internal Helper Components */
const CustomLabel = ({ icon, text }) => (
  <label className="text-sm font-black text-slate-600 flex items-center gap-2 px-1">
    <span className="text-[#387780]">{icon}</span> {text}
  </label>
);

const StatusStep = ({ icon, text, active }) => (
  <div className={`flex items-center gap-3 font-bold transition-opacity ${active ? 'opacity-100' : 'opacity-40'}`}>
    <div className={`p-2 rounded-lg ${active ? 'bg-white text-[#387780]' : 'bg-white/20 text-white'}`}>
      {icon}
    </div>
    <span className="text-sm tracking-wide uppercase">{text}</span>
  </div>
);

export default Companies;