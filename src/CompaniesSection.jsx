
import React from "react";
import { ExternalLink } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // 1. Import useNavigate
import LatestJobCards from "./LatestJobCards";

const CompaniesSection = () => {
  const navigate = useNavigate(); // 2. Initialize navigate
  
  // Accessing jobs directly from Redux store
  const { allJobs } = useSelector((store) => store.job);

  // 3. Define the click handler
  const viewAllJobsHandler = () => {
    navigate("/job-seekers"); // Change this path to match your Jobs page route
  };

  return (
    <div className="w-full bg-gray-100">
      <section className="py-24 max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
              Latest <span className="text-[#387780]"> & Top Job Openings </span>
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl">
              Discover your next career move. We bring the latest opportunities 
              from top-tier recruiters directly to you.
            </p>
          </div>
        </div>

        {/* Companies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {allJobs && allJobs.length > 0 ? (
            // Displaying the first 6 jobs
            allJobs.slice(0, 6).map((job) => (
              <LatestJobCards key={job._id} job={job} />
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
              <span className="text-gray-400 font-semibold text-xl">
                No Jobs Available right now
              </span>
              <p className="text-gray-400">Check back later for new openings!</p>
            </div>
          )}
        </div>

        {/* 4. Operational "View All Jobs" Button */}
        <button 
          onClick={viewAllJobsHandler} 
          className="text-[#ff9933] mt-8 flex items-center hover:underline group font-black uppercase tracking-widest text-sm"
        >
          View All Jobs
          <ExternalLink className="ml-2 w-5 h-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
        </button>

        {/* Branding Bar */}
        <div className="mt-20 pt-10 border-t border-gray-200">
          <p className="text-center text-gray-400 font-medium uppercase tracking-[0.2em] text-xs mb-8">
            Trusted by Industry Leaders
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
            <span className="text-2xl font-black italic">Jio</span>
            <span className="text-2xl font-serif font-bold">Google</span>
            <span className="text-2xl font-sans font-extrabold">Facebook</span>
            <span className="text-2xl font-mono font-bold">Apple</span>
            <span className="text-2xl font-sans font-black">TCS</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CompaniesSection;