


import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import {
  ChevronLeft,
  MapPin,
  Briefcase,
  DollarSign,
  Clock,
  ShieldCheck,
  Share2,
  Calendar
} from 'lucide-react';
import axios from 'axios';
import { APPLICATION_END_POINT, JOB_API_END_POINT } from './Utils/Constant';
import { useDispatch, useSelector } from 'react-redux';
import { setSingleJob } from './Redux/jobSlice';
import { toast } from 'react-toastify';
import { readDemoJobs } from './Utils/demoJobs';
import { createDemoApplication, readDemoApplications, DEMO_APPLICATIONS_CHANGED } from './Utils/demoApplications';
const MotionDiv = motion.div;

const JobDescription = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { singleJob } = useSelector(store => store.job);
  const { user } = useSelector(store => store.user);

  const [apiIsApplied, setApiIsApplied] = useState(false);
  const isApplied = import.meta.env.VITE_DEMO_MODE !== 'false'
    ? Boolean(singleJob?.demoAppliedBy?.includes(user?._id))
    : apiIsApplied;

  useEffect(() => {
    if (import.meta.env.VITE_DEMO_MODE !== 'false') {
      const job = readDemoJobs().find((item) => (item.id || item._id) === id && !item.archivedAt);
      if (job) {
        const applications = readDemoApplications().filter((application) => application.jobId === id);
        const applied = applications.some((application) => application.studentId === user?._id);
        dispatch(setSingleJob({ ...job, applications, demoAppliedBy: applied ? [user?._id] : [] }));
      } else {
        dispatch(setSingleJob(null));
      }
      window.scrollTo(0, 0);
      return;
    }

    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${id}`, {
          withCredentials: true
        });

        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setApiIsApplied(res.data.job.applications.some(app => app.applicant === user?._id));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchSingleJob();
    window.scrollTo(0, 0);
  }, [id, dispatch, user?._id]);

  useEffect(() => {
    if (import.meta.env.VITE_DEMO_MODE === 'false') return undefined;
    const refreshApplications = () => {
      const job = readDemoJobs().find((item) => (item.id || item._id) === id && !item.archivedAt);
      if (!job) return;
      const applications = readDemoApplications().filter((application) => application.jobId === id);
      const applied = applications.some((application) => application.studentId === user?._id);
      dispatch(setSingleJob({ ...job, applications, demoAppliedBy: applied ? [user?._id] : [] }));
    };
    window.addEventListener(DEMO_APPLICATIONS_CHANGED, refreshApplications);
    window.addEventListener('storage', refreshApplications);
    return () => {
      window.removeEventListener(DEMO_APPLICATIONS_CHANGED, refreshApplications);
      window.removeEventListener('storage', refreshApplications);
    };
  }, [id, dispatch, user?._id]);

  // 🔥 Integrated Apply Logic with Position Check
  const applyHandler = async () => {
    if (import.meta.env.VITE_DEMO_MODE !== 'false') {
      if (!user || user.role !== 'student') {
        toast.error('Sign in as a student to apply for this demo job.');
        return;
      }
      const job = readDemoJobs().find((item) => (item.id || item._id) === id && !item.archivedAt);
      if (!job) {
        toast.error('This job listing is no longer available.');
        return;
      }
      try {
        const result = createDemoApplication(job, user);
        if (!result.created) {
          dispatch(setSingleJob({ ...job, applications: readDemoApplications().filter((application) => application.jobId === id), demoAppliedBy: [user._id] }));
          return;
        }
        const applications = readDemoApplications().filter((application) => application.jobId === id);
        dispatch(setSingleJob({ ...job, applications, demoAppliedBy: [user._id] }));
        toast.success('Demo application submitted.');
      } catch (error) {
        toast.error(error.message || 'Could not save your application in this browser.');
      }
      return;
    }

    // 1. Check if positions are full
    const totalApplicants = singleJob?.applications?.length || 0;
    const totalPositions = Number(singleJob?.position) || 0;

    if (totalApplicants >= totalPositions) {
      alert("All positions are filled for this job. Kindly apply for another job.");
      return; // Stop the execution
    }

    // 2. Proceed with API call if positions are available
    try {
      const res = await axios.get(`${APPLICATION_END_POINT}/apply/${id}`, {
        withCredentials: true,
      });
      if (res.data.success) {
        setApiIsApplied(true);
        const updatedSingleJob = { 
          ...singleJob, 
          applications: [...singleJob.applications, { applicant: user?._id }] 
        };
        dispatch(setSingleJob(updatedSingleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  }

  const daysAgoFunction = (mongodbTime) => {
    if (!mongodbTime) return "Today";
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    return days === 0 ? "Today" : `${days} day${days > 1 ? 's' : ''} ago`;
  }

  if (!singleJob) {
    if (import.meta.env.VITE_DEMO_MODE !== 'false') {
      return <div className="min-h-screen flex items-center justify-center bg-slate-50"><div className="rounded-2xl bg-white p-8 text-center shadow-sm"><h1 className="text-xl font-bold text-slate-900">Job listing unavailable</h1><p className="mt-2 text-slate-600">This job may have been archived or removed.</p><button type="button" onClick={() => navigate('/')} className="mt-5 rounded-xl bg-[#387780] px-5 py-2 font-bold text-white">Browse jobs</button></div></div>;
    }
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#387780]/20 border-4 border-t-[#387780] animate-spin"></div>
          <p className="font-bold text-slate-400">Loading Opportunity...</p>
        </div>
      </div>
    );
  }

  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-gray-200 pb-20"
    >
      <div className="bg-[#387780] border-b sticky top-0 z-50 p-4 shadow-sm">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-[#ff9933] font-bold hover:bg-slate-50 px-4 py-2 rounded-xl transition-all"
          >
            <ChevronLeft size={20} /> Back to Search
          </button>
          <div className="p-2 hover:bg-slate-50 rounded-full cursor-pointer transition-colors text-slate-400 hover:text-[#387780]">
            <Share2 size={20} />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 mt-10 grid lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-slate-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#ff9933]/5 rounded-bl-full -mr-10 -mt-10"></div>
            
            <div className="mb-10 relative">
              <span className="bg-[#387780]/10 text-[#387780] px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest">
                {singleJob?.jobType}
              </span>
              <h1 className="text-3xl md:text-5xl font-black text-slate-900 mt-4 leading-tight">
                {singleJob?.title}
              </h1>
              <p className="text-xl font-bold text-[#ff9933] mt-2">
                {singleJob?.company?.name}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              <InfoBox icon={<MapPin size={22} />} label="Location" value={singleJob?.location} />
              <InfoBox icon={<Briefcase size={22} />} label="Positions" value={`${singleJob?.position} Openings`} />
              <InfoBox icon={<DollarSign size={22} />} label="Salary" value={`${singleJob?.salary} LPA`} />
              <InfoBox icon={<Clock size={22} />} label="Posted" value={daysAgoFunction(singleJob?.createdAt)} />
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-black text-slate-900 mb-4 border-l-4 border-[#ff9933] pl-4">About the Role</h3>
                <p className="text-slate-600 leading-relaxed text-lg text-justify">
                  {singleJob?.description}
                </p>
              </div>

              <div>
                <h3 className="text-xl font-black text-slate-900 mb-4 border-l-4 border-[#387780] pl-4">Requirements</h3>
                <p className="bg-slate-50 p-4 rounded-xl text-slate-700 font-bold border border-slate-100">
                  {singleJob?.requirements}
                </p>
              </div>
            </div>
          </div>
        </div>

        <aside className="lg:col-span-1">
          <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/50 border border-slate-100 sticky top-28">
            <h3 className="text-xl font-black mb-6 text-slate-900">Job Summary</h3>

            <div className="space-y-4 mb-8">
              <SummaryRow icon={<Calendar size={16}/>} label="Posted Date" value={singleJob?.createdAt?.split("T")[0] || "Today"} />
              <SummaryRow icon={<Briefcase size={16}/>} label="Role Type" value={singleJob?.jobType} />
              <SummaryRow icon={<Clock size={16}/>} label="Open Positions" value={singleJob?.position} />
              <hr className="border-slate-50" />
              <div className="flex justify-between items-center bg-[#387780]/5 p-3 rounded-xl">
                <span className="text-sm font-bold text-slate-500">{import.meta.env.VITE_DEMO_MODE !== 'false' ? 'Actual Applicants' : 'Total Applicants'}</span>
                <span className="text-lg font-black text-[#387780]">{singleJob?.applications?.length || 0}</span>
              </div>
            </div>

            <motion.button
              whileHover={!isApplied ? { scale: 1.02, backgroundColor: "#2d5f66" } : {}}
              whileTap={!isApplied ? { scale: 0.98 } : {}}
              onClick={isApplied ? null : applyHandler} // Use the logic-enhanced applyHandler
              disabled={isApplied}
              className={`w-full py-5 rounded-2xl font-black text-lg transition-all shadow-lg ${
                isApplied
                  ? "bg-slate-200 text-slate-500 cursor-not-allowed"
                  : "bg-[#387780] text-white shadow-[#387780]/20 cursor-pointer"
              }`}
            >
              {isApplied ? "Application Sent" : "Apply Now"}
            </motion.button>

            <div className="flex items-center justify-center gap-2 mt-6 text-[10px] font-black uppercase tracking-tighter text-slate-400">
              <ShieldCheck size={16} className="text-[#387780]" />
              Verified & Secured by JiViKa
            </div>
          </div>
        </aside>
      </div>
    </MotionDiv>
  );
};

const InfoBox = ({ icon, label, value }) => (
  <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 flex flex-col items-center text-center transition-all hover:bg-white hover:shadow-md group">
    <div className="text-[#387780] mb-2 group-hover:scale-110 transition-transform">{icon}</div>
    <span className="text-[10px] uppercase text-slate-400 font-black tracking-tighter mb-1">
      {label}
    </span>
    <span className="text-xs font-bold text-slate-800 truncate w-full">
      {value || "N/A"}
    </span>
  </div>
);

const SummaryRow = ({ icon, label, value }) => (
  <div className="flex justify-between items-center text-sm">
    <span className="text-slate-500 flex items-center gap-2 font-medium">
      <span className="text-[#ff9933]">{icon}</span> {label}
    </span>
    <span className="font-bold text-slate-900">{value}</span>
  </div>
);

export default JobDescription;
