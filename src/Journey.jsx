import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Briefcase, Handshake } from "lucide-react";
import { toast } from "react-toastify";

const JoinJourney = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formType, setFormType] = useState(""); // 'career' or 'partner'
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Operational Logic: Integrate with your USER_API_END_POINT or a dedicated Email service
    console.log(`Sending ${formType} request for: ${email}`);
    
    toast.success("Request received! Our team will reach out shortly.");
    setIsOpen(false);
    setEmail("");
  };

  return (
    <section className="py-24 px-6">
      <div className="max-w-5xl mx-auto bg-slate-900 rounded-[4rem] p-12 md:p-24 text-center text-white relative overflow-hidden">
        
        {/* Content */}
        <div className="relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black mb-8 tracking-tighter"
          >
            Want to be part of <br />
            <span className="text-[#ff9933]">the JiViKa journey?</span>
          </motion.h2>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={() => { setFormType("career"); setIsOpen(true); }}
              className="bg-[#ff9933] text-white font-black py-5 px-10 rounded-2xl hover:scale-105 transition-all flex items-center justify-center gap-2"
            >
              <Briefcase size={20} /> View Open Positions
            </button>
            <button 
              onClick={() => { setFormType("partner"); setIsOpen(true); }}
              className="bg-white/10 backdrop-blur-md border border-white/20 text-white font-black py-5 px-10 rounded-2xl hover:bg-white/20 transition-all flex items-center justify-center gap-2"
            >
              <Handshake size={20} /> Become a Partner
            </button>
          </div>
        </div>

        {/* --- OPERATIONAL MODAL --- */}
        <AnimatePresence>
          {isOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"
              />
              
              <motion.div 
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="bg-white w-full max-w-md rounded-[2.5rem] p-10 relative z-10 shadow-2xl"
              >
                <button 
                  onClick={() => setIsOpen(false)}
                  className="absolute top-6 right-6 text-slate-400 hover:text-slate-900"
                >
                  <X />
                </button>

                <h3 className="text-2xl font-black text-slate-900 mb-2">
                  {formType === "career" ? "Join our Internal Team" : "Partner with JiViKa"}
                </h3>
                <p className="text-slate-500 mb-8 font-medium">
                  {formType === "career" 
                    ? "Drop your email to get notified about our next hiring sprint." 
                    : "Enter your corporate email to receive our partnership deck."}
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="relative">
                    <input 
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full pl-6 pr-12 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-[#387780]/10 outline-none text-slate-900 font-bold"
                    />
                    <button type="submit" className="absolute right-2 top-2 bottom-2 bg-[#387780] text-white px-4 rounded-xl hover:bg-slate-900 transition-colors">
                      <Send size={18} />
                    </button>
                  </div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest text-center">
                    No spam. Just opportunities.
                  </p>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default JoinJourney;