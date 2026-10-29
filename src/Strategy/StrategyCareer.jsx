
const allProfessions = [
  // Development
  { name: "Frontend Developer", cat: "dev", level: "MERN Stack" },
  { name: "Backend Developer", cat: "dev", level: "Node/Python" },
  { name: "Full Stack Developer", cat: "dev", level: "Enterprise" },
  { name: "Mobile App Developer", cat: "dev", level: "iOS/Android" },
  {name : "Pythond Developer" , cat : "dev" , level : "Develpment"},
  {name : "Java full Stack Developer" , cat : "dev" , level : "Enterprise"},
  // Data & AI
  { name: "Data Scientist", cat: "data", level: "Python/R" },
  { name: "Machine Learning Engineer", cat: "data", level: "AI" },
  { name: "Data Engineer", cat: "data", level: "Big Data" },
  { name: "AI Researcher", cat: "data", level: "Deep Learning" },
  // Cybersecurity
  { name: "Ethical Hacker", cat: "cyber", level: "Security" },
  { name: "Cybersecurity Analyst", cat: "cyber", level: "SOC" },
  { name: "Penetration Tester", cat: "cyber", level: "VAPT" },
  // Cloud
  { name: "DevOps Engineer", cat: "cloud", level: "CI/CD" },
  { name: "Cloud Architect", cat: "cloud", level: "AWS/Azure" },
  { name: "SRE", cat: "cloud", level: "Infrastructure" },
  // Design
  { name: "UI Designer", cat: "design", level: "Visual" },
  { name: "UX Researcher", cat: "design", level: "Strategy" },
  { name: "Product Designer", cat: "design", level: "Figma" },
];



// StrategyCareer.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe } from 'lucide-react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import RoadModal from "./Frontend/RoadModal";
// import { roadmapRegistry } from './data/roadmapData'; // Import your registry
import {FrontendRoadmap} from "./Frontend/FrontendRoadmap.js";

const StrategyCareer = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState(null); // Track WHICH job info to show

  const handleOpenRoadmap = (jobName) => {
    const data = FrontendRoadmap[jobName];
    if (data) {
      setSelectedContent(data);
      setIsModalOpen(true);
    } else {
      alert("Working on the roadmap for " + jobName);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-slate-50 py-20 px-6">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-black text-slate-900">JiViKa Career Directory</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Use .map() to generate cards from your allProfessions array */}
          {allProfessions.map((job) => (
            <motion.div key={job.name} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all cursor-pointer">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-4">
                <Globe size={20} />
              </div>
              <h4 className="text-lg font-bold text-slate-800">{job.name}</h4>
              <button 
                onClick={() => handleOpenRoadmap(job.name)} 
                className="mt-6 text-blue-600 text-xs font-bold"
              >
                View Roadmap
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ONE COMMON MODAL AT THE BOTTOM OF THE PAGE */}
      <RoadModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        content={selectedContent} 
      />
      {/* <RoadModal /> */}
      
      <Footer />
    </div>
  );
};

export default StrategyCareer;