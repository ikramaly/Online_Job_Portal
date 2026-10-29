// import React, { useState } from 'react';
// import { useNavigate } from 'react-router';
// import { motion } from 'framer-motion';
// import { Building2, ArrowRight, XCircle, ShieldCheck } from 'lucide-react';
// import axios from 'axios';
// import { COMPANY_API_END_POINT } from '../Utils/Constant';
// import { toast } from 'react-toastify';
// import { useDispatch } from 'react-redux';
// import { setSingleCompany } from '../Redux/companySlice';

// const CompanyName = () => {
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const [companyName, setCompanyName] = useState("");

//     const registerNewCompany = async () => {
//         if (!companyName.trim()) {
//             toast.error("Company name is required");
//             return;
//         }
//         try {
//             const res = await axios.post(`${COMPANY_API_END_POINT}/register`, { companyName }, {
//                 headers: { 'Content-Type': 'application/json' },
//                 withCredentials: true
//             });

//             if (res?.data?.success) {
//                 dispatch(setSingleCompany(res.data.company));
//                 toast.success(res.data.message);
//                 const companyId = res?.data?.company?._id;
//                 // Redirecting to the requirements/details form
//                 navigate(`/employers/job-post/${companyId}`);
//             }
//         } catch (error) {
//             console.log(error);
//             toast.error(error.response?.data?.message || "Registration failed");
//         }
//     };

//     return (
//         <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-6">
//             <motion.div
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 className="max-w-2xl w-full bg-white rounded-[3rem] shadow-2xl shadow-slate-200 border border-slate-100 p-10 md:p-16 text-center"
//             >
//                 {/* Icon & Branding */}
//                 <div className="inline-flex items-center justify-center w-20 h-20 bg-[#387780]/10 text-[#387780] rounded-3xl mb-8">
//                     <Building2 size={40} />
//                 </div>

//                 <h1 className="text-4xl font-black text-slate-900 mb-4">
//                     Register Your <span className="text-[#ff9933]">Company</span>
//                 </h1>
//                 <p className="text-slate-500 font-medium mb-10 text-lg">
//                     What would you like to give your company name? You can change this later.
//                 </p>

//                 {/* Input Field */}
//                 <div className="relative mb-10">
//                     <input
//                         type="text"
//                         placeholder="e.g. JiViKa Solutions, Google, etc."
//                         className="w-full px-8 py-5 rounded-2xl bg-slate-50 border-2 border-slate-100 focus:border-[#387780] focus:bg-white outline-none transition-all text-xl font-bold text-slate-800 placeholder:text-slate-300 shadow-inner"
//                         onChange={(e) => setCompanyName(e.target.value)}
//                     />
//                 </div>

//                 {/* Action Buttons */}
//                 <div className="flex flex-col md:flex-row items-center justify-center gap-4">
//                     <button
//                         onClick={() => navigate("/employers")}
//                         className="w-full md:w-auto flex items-center justify-center gap-2 px-10 py-4 rounded-2xl font-black text-slate-500 hover:bg-slate-100 transition-colors"
//                     >
//                         <XCircle size={20} /> Cancel
//                     </button>

//                     <button
//                         onClick={registerNewCompany}
//                         className="w-full md:w-auto flex items-center justify-center gap-2 px-12 py-4 rounded-2xl bg-[#387780] text-white font-black text-lg hover:bg-[#2c5e65] shadow-xl shadow-[#387780]/20 transition-transform active:scale-95"
//                     >
//                         Continue <ArrowRight size={20} />
//                     </button>
//                 </div>

//                 {/* Trust Badge */}
//                 <div className="mt-12 pt-8 border-t border-slate-50 flex items-center justify-center gap-2 text-[11px] font-black uppercase tracking-widest text-slate-400">
//                     <ShieldCheck size={16} className="text-[#387780]" />
//                     Secure Employer Registration
//                 </div>
//             </motion.div>
//         </div>
//     );
// };

// export default CompanyName;

import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import { Building2, ArrowRight, ChevronLeft, ShieldCheck, Sparkles, Globe } from 'lucide-react';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '../Utils/Constant';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setSingleCompany } from '../Redux/companySlice';

const CompanyName = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [companyName, setCompanyName] = useState("");
    const [loading, setLoading] = useState(false);

    const registerNewCompany = async () => {
        if (!companyName.trim()) {
            toast.error("Company name is required");
            return;
        }
        setLoading(true);
        try {
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, { companyName }, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });

            if (res?.data?.success) {
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message);
                const companyId = res?.data?.company?._id;
                navigate(`/employers/job-post/${companyId}`);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white flex flex-col md:flex-row">
            
            {/* Left Side: Branding & Info (Visible on Desktop) */}
            <div className="hidden md:flex md:w-1/2 bg-[#387780] relative overflow-hidden items-center justify-center p-16">
                <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-[-5%] right-[-5%] w-96 h-96 bg-[#ff9933]/20 rounded-full blur-3xl"></div>
                
                <div className="relative z-10 max-w-md">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                    >
                        <span className="px-4 py-2 rounded-full bg-white/10 text-white text-xs font-bold uppercase tracking-widest border border-white/20">
                            Employer Suite
                        </span>
                    </motion.div>
                    <h2 className="text-5xl font-black text-white leading-tight mb-6">
                        Build your <span className="text-[#ff9933]">Dream Team</span> with JiViKa.
                    </h2>
                    <p className="text-[#e2f3f5] text-lg font-medium opacity-80 leading-relaxed">
                        Join thousands of top-tier companies finding their next innovators through our intelligent hiring ecosystem.
                    </p>

                    <div className="mt-12 space-y-6">
                        <div className="flex items-center gap-4 text-white/90">
                            <div className="p-2 bg-white/10 rounded-lg"><Sparkles size={20}/></div>
                            <p className="font-bold">AI-Driven Candidate Matching</p>
                        </div>
                        <div className="flex items-center gap-4 text-white/90">
                            <div className="p-2 bg-white/10 rounded-lg"><Globe size={20}/></div>
                            <p className="font-bold">Global Talent Reach</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side: Form */}
            <div className="flex-1 flex flex-col justify-center px-8 md:px-20 py-12 relative">
                
                {/* Back Button */}
                <button 
                    onClick={() => navigate(-1)}
                    className="absolute top-8 left-8 md:left-20 flex items-center gap-2 text-slate-400 hover:text-[#387780] font-bold transition-colors"
                >
                    <ChevronLeft size={20} /> Back
                </button>

                <div className="max-w-md w-full mx-auto">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        {/* Progress Bar */}
                        <div className="flex gap-2 mb-10">
                            <div className="h-1.5 w-16 bg-[#387780] rounded-full"></div>
                            <div className="h-1.5 w-16 bg-slate-100 rounded-full"></div>
                            <div className="h-1.5 w-16 bg-slate-100 rounded-full"></div>
                        </div>

                        <div className="inline-flex p-4 bg-slate-50 rounded-2xl mb-6">
                            <Building2 className="text-[#387780]" size={32} />
                        </div>

                        <h1 className="text-3xl font-black text-slate-900 mb-2">
                            What’s your company called?
                        </h1>
                        <p className="text-slate-500 font-medium mb-8">
                            This will be your workspace name. You can update your brand details in the next step.
                        </p>

                        <div className="space-y-6">
                            <div className="relative group">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 absolute left-5 top-2 z-10 group-focus-within:text-[#387780] transition-colors">
                                    Official Company Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g. Acme Corp or JiViKa Tech"
                                    className="w-full pl-5 pr-5 pt-7 pb-4 rounded-2xl bg-white border-2 border-slate-100 focus:border-[#387780] outline-none transition-all text-lg font-bold text-slate-800 placeholder:text-slate-300 shadow-sm"
                                    onChange={(e) => setCompanyName(e.target.value)}
                                    autoFocus
                                />
                            </div>

                            <button
                                onClick={registerNewCompany}
                                disabled={loading}
                                className={`w-full flex items-center justify-center gap-3 py-5 rounded-2xl bg-[#387780] text-white font-black text-lg transition-all shadow-xl shadow-[#387780]/20 hover:shadow-[#387780]/40 ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:-translate-y-1 active:scale-[0.98]'}`}
                            >
                                {loading ? "Registering..." : "Setup Workspace"}
                                <ArrowRight size={20} />
                            </button>
                        </div>

                        {/* Footer Info */}
                        <div className="mt-10 flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-300">
                            <ShieldCheck size={14} />
                            Verified Enterprise Onboarding
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default CompanyName;