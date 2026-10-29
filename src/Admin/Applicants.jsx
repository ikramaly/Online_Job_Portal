
import React, { useEffect, useState } from "react";
import {
  MoreVertical,
  Download,
  Filter,
  FileText,
  CheckCircle,
  XCircle,
} from "lucide-react";
import axios from "axios";
import { APPLICATION_END_POINT } from "../Utils/Constant";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setAllApplicants } from "../Redux/applicationSlice";
import { toast } from "react-toastify";

const Applicants = () => {
  const [openMenuId, setOpenMenuId] = useState(null);
  const params = useParams();
  const dispatch = useDispatch();

  const { applicants } = useSelector((store) => store.application);


  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(
          `${APPLICATION_END_POINT}/${params.id}/applicants`,
          { withCredentials: true }
        );
        console.log(res.data);
        if (res.data.success) {
          dispatch(setAllApplicants(res.data.job));
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch applicants");
      }
    };
    fetchAllApplicants();
  }, [params.id, dispatch]);

  const statusHandler = async (status, id) => {
    try {
      const res = await axios.post(
        `${APPLICATION_END_POINT}/status/${id}/update`,
        { status },
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        setOpenMenuId(null);
        // Tip: You might want to trigger a re-fetch here to update the UI status
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating status");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans">
      {openMenuId && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => setOpenMenuId(null)}
        />
      )}

      <div className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Total Applicants: {applicants?.applications?.length || 0}
          </h1>
          <p className="text-gray-500 mt-1">
            Reviewing candidates for:{" "}
            <span className="text-indigo-600 font-semibold">
              {applicants?.title}
            </span>
          </p>
        </div>

        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 text-sm font-semibold transition-all">
            <Download size={18} /> Export CSV
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm font-semibold shadow-sm transition-all">
            <Filter size={18} /> Filter
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-visible">
        <div className="overflow-x-auto overflow-visible">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="p-6 font-bold text-gray-600 text-xs uppercase tracking-widest">FullName</th>
                <th className="p-6 font-bold text-gray-600 text-xs uppercase tracking-widest">Email</th>
                <th className="p-6 font-bold text-gray-600 text-xs uppercase tracking-widest">Contact</th>
                <th className="p-6 font-bold text-gray-600 text-xs uppercase tracking-widest">Resume</th>
                <th className="p-6 font-bold text-gray-600 text-xs uppercase tracking-widest">Date</th>
                <th className="p-6 font-bold text-gray-600 text-xs uppercase tracking-widest text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-50">
              {applicants?.applications?.length > 0 ? (
                applicants.applications.map((item) => (
                  <tr key={item._id} className="hover:bg-indigo-50/30 transition-colors group">
                    {/* PROFILE & NAME COLUMN */}
                    <td className="p-5">
                      <div className="flex items-center gap-3">
                        {item?.applicant?.profile?.profilePhoto ? (
                          <img 
                            src={item.applicant.profile.profilePhoto} 
                            alt="profile" 
                            className="w-10 h-10 rounded-full object-cover border border-gray-200"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold border border-indigo-200">
                            {item?.applicant?.fullname?.charAt(0).toUpperCase() || "?"}
                          </div>
                        )}
                        <div>
                          <p className="font-bold text-gray-900 text-sm leading-none">
                            {item?.applicant?.fullname || "N/A"}
                          </p>
                          <p className="text-[10px] text-gray-400 uppercase mt-1 tracking-tighter">Candidate</p>
                        </div>
                      </div>
                    </td>

                    <td className="p-5 text-gray-600 text-sm">
                      {item?.applicant?.email || "N/A"}
                    </td>

                    <td className="p-5 text-gray-600 text-sm font-medium">
                      {item?.applicant?.phoneNumber || "N/A"}
                    </td>

                    <td className="p-5">
                      {item?.applicant?.profile?.resume ? (
                        <a
                          href={item?.applicant?.profile?.resume}
                          target="_blank"
                          rel="noreferrer"
                          className="text-indigo-600 hover:text-indigo-800 font-semibold text-sm flex items-center gap-1 transition-colors"
                        >
                          <FileText size={16} />
                          <span className="truncate max-w-[120px]">
                            {item?.applicant?.profile?.resumeOriginalName || "View CV"}
                          </span>
                        </a>
                      ) : (
                        <span className="text-gray-400 text-sm italic">No Resume</span>
                      )}
                    </td>

                    <td className="p-5 text-gray-500 text-sm">
                      {item?.createdAt 
    ? item.createdAt.split("T")[0] 
    : applicants?.createdAt?.split("T")[0]}
                    </td>

                    <td className="p-5 relative text-center">
                      <button
                        onClick={() => setOpenMenuId(openMenuId === item._id ? null : item._id)}
                        className="p-2 text-gray-400 hover:text-indigo-600 rounded-lg hover:bg-indigo-50 transition-all"
                      >
                        <MoreVertical size={18} />
                      </button>

                      {/* ACTION DROPDOWN */}
                      {openMenuId === item._id && (
                        <div className="absolute right-10 top-12 w-40 bg-white border border-gray-100 rounded-xl shadow-xl z-20 py-2 animate-in fade-in zoom-in duration-150">
                          <button
                            onClick={() => statusHandler("accepted", item._id)}
                            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-emerald-600 hover:bg-emerald-50 font-bold transition-colors"
                          >
                            <CheckCircle size={16} /> Accepted
                          </button>
                          <button
                            onClick={() => statusHandler("rejected", item._id)}
                            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 font-bold transition-colors"
                          >
                            <XCircle size={16} /> Rejected
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="p-20 text-center text-gray-400 font-medium">
                    No applicants found for this job position.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Applicants;