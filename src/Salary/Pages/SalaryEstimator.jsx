
import React from 'react';
import { motion } from 'framer-motion';
import SalaryForm from "../Components/SalaryForm";
import SalaryResult from "../Components/SalaryResult";
import { useSalary } from "../Hooks/useSalary";
import Navbar from "../../Navbar";
import Footer from "../../Footer";
import { formatSalary } from '../Utils/salaryUtils';
import NegotiationArt from '../Components/NegotiationArt';

const SalaryEstimator = () => {
  const { result, getSalary } = useSalary();

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-6 py-24">
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-[0.2em] inline-block mb-4"
          >
            Negotiation Power
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-black text-slate-900 tracking-tight mb-6"
          >
            Know Your <span className="text-blue-600">True Worth</span>
          </motion.h1>
          <p className="text-slate-500 text-lg font-medium max-w-xl mx-auto">
            Our AI-powered engine analyzes current Indian market trends to help you negotiate like a pro.
          </p>
        </div>

        <SalaryForm onSubmit={getSalary} />

        <div className="mt-8">
          <SalaryResult result={result} />
        </div>
        
        {/* Advice Section */}
        {result && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-12 p-8 bg-blue-600 rounded-[2rem] text-white"
          >
            <h3 className="font-black text-xl mb-2">💡 Negotiation Tip</h3>
            <p className="opacity-90 font-medium">
              Always anchor your negotiation around the <span className="underline decoration-2 underline-offset-4 font-bold">{formatSalary(result.max)}</span> mark. Highlight your specific contributions in {result.confidence === "High" ? "core frameworks" : "emerging tools"} to justify the higher end of the bracket.
            </p>
          </motion.div>
        )}
      </main>
      <NegotiationArt />
      <Footer />
    </div>
  );
};

export default SalaryEstimator;