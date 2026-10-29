

import React from 'react';
import { MapPin, Briefcase, IndianRupee, Building2 } from "lucide-react";

const LatestJobCards = ({ job }) => {
  return (
    <div className="group bg-white rounded-3xl border border-gray-100 p-7 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col min-h-[320px] cursor-pointer">
      {/* company logo */}
      <div className='flex gap-6'>
      <div className='rounded-full h-15 w-15 flex items-center justify-center text-[#387780]'>
        {job?.company?.logo ? <img src={job.company.logo} alt={`${job.company.name} logo`} /> : <Building2 size={30} aria-label="Company" />}
      </div>
      {/* Company Name */}
      <div className="mb-10">
        <h1 className="font-bold text-2xl text-gray-900 tracking-tight">
          {job?.company?.name}
        </h1>
      </div>
      </div>

      {/* Job Title & Location */}
      <div className="mb-4">
        <h3 className="text-xl font-extrabold text-[#387780] group-hover:text-[#2d5f66] transition-colors leading-tight">
          {job?.title}
        </h3>
        <div className="flex items-center text-sm text-gray-400 mt-2">
          <MapPin className="w-4 h-4 mr-1" />
          <span>{job?.location || "Delhi, Gurugram"}</span>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-500 text-sm mb-6 line-clamp-2 leading-relaxed">
        {job?.description || "No description available for this position."}
      </p>

      {/* Footer: Position, Type, & Salary */}
      <div className="mt-auto pt-5 border-t border-gray-50 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Positions */}
          <div className="flex items-center text-[#387780]">
            <Briefcase className="w-5 h-5 mr-1" />
            <span className="font-bold text-base">{job?.position}</span>
          </div>
          
          {/* Job Type */}
          <div className="flex flex-col text-[#387780] leading-none">
            <span className="text-[10px] font-black uppercase tracking-tighter">
              {job?.jobType || "Full Time"}
            </span>
          </div>
        </div>

        {/* Salary */}
        <div className="flex items-center text-[#387780] font-bold text-lg">
          <IndianRupee className="w-4 h-4" />
          <span>{job?.salary}LPA</span>
        </div>
      </div>
    </div>
  );
};

export default LatestJobCards;
