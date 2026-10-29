
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'; // For Redux
import { Filter, MapPin, Briefcase, IndianRupee, RotateCcw, X, SlidersHorizontal } from 'lucide-react';
import { setSearchedQuery } from './Redux/jobSlice';
// Assuming you have a job action to set searched query
// import { setSearchedQuery } from '@/redux/jobSlice'; 

const FilterJobs = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const changeHandler = (value) => {
    setSelectedValue(value);
  };

  // Whenever selectedValue changes, update the global store
  useEffect(() => {
    // This sends the filter value to your Redux state
    dispatch(setSearchedQuery(selectedValue)); 
    console.log("Selected Filter for Backend:", selectedValue);
  }, [selectedValue, dispatch]);

  const filterData = [
    {
      filterType: "Location",
      icon: <MapPin size={16} />,
      options: ["Delhi NCR", "Bangaluru", "Hyderabad", "Pune", "Remote"]
    },
    {
      filterType: "Industry",
      icon: <Briefcase size={16} />,
      options: ["Frontend Developer","Java Developer", "Backend Developer", "Data Science", "Graphic Designer", "Fullstack Developer"]
    },
    {
      filterType: "Salary",
      icon: <IndianRupee size={16} />,
      options: ["0-40k", "42k-1lakh", "1lakh to 5lakh","5lakh to 10lakh", "more than 10lakh"]
    }
  ];

  return (
    <>
      {/* Mobile Toggle & Backdrop remain same as your code */}
      <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-[40]">
        <button onClick={() => setIsOpen(true)} className="flex items-center gap-2 bg-[#387780] text-white px-8 py-4 rounded-full shadow-2xl font-bold">
          <SlidersHorizontal size={20} /> Filters
        </button>
      </div>
      {isOpen && <div className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-[50]" onClick={() => setIsOpen(false)} />}

      <aside className={`fixed inset-y-0 left-0 w-[85%] max-w-sm bg-white z-[60] transform transition-transform duration-500 lg:translate-x-0 lg:static lg:w-1/4 lg:z-10 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="lg:sticky lg:top-24 h-fit bg-white p-6 rounded-[2.5rem] lg:shadow-xl lg:shadow-gray-200/50 border border-gray-100 overflow-y-auto max-h-[90vh] lg:max-h-none">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center text-gray-900 font-black text-xl tracking-tight">
              <Filter className="w-5 h-5 mr-2 text-[#387780]" /> Filters
            </div>
            <button onClick={() => setSelectedValue("")} className="text-gray-400 hover:text-rose-500 transition-colors">
              <RotateCcw size={18} />
            </button>
          </div>

          <div className="space-y-8">
            {filterData.map((data, index) => (
              <div key={index}>
                <div className="flex items-center mb-4 text-gray-800">
                  <span className="p-2 bg-gray-50 rounded-lg text-[#387780] mr-2">{data.icon}</span>
                  <label className="text-sm font-black uppercase tracking-widest">{data.filterType}</label>
                </div>
                <div className="space-y-4 pl-2">
                  {data.options.map((option, idx) => {
                    const itemId = `filter-${index}-${idx}`;
                    return (
                      <div key={idx} className="flex items-center group">
                        <input 
                          type="radio" 
                          id={itemId}
                          name="job-filter" // Shared name makes all categories mutually exclusive for search
                          value={option}
                          checked={selectedValue === option}
                          onChange={(e) => changeHandler(e.target.value)}
                          className="w-5 h-5 text-[#387780] border-gray-300 focus:ring-[#387780] cursor-pointer" 
                        />
                        <label htmlFor={itemId} className={`ml-3 text-base font-semibold cursor-pointer transition-colors ${selectedValue === option ? 'text-[#387780]' : 'text-gray-500 hover:text-gray-800'}`}>
                          {option}
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
};

export default FilterJobs;