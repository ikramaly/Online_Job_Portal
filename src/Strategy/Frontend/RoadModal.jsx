
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight } from 'lucide-react';

const RoadModal = ({ isOpen, onClose, content }) => {
  if (!content) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-6"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden relative"
          >
            {/* Close Button */}
            <button onClick={onClose} className="absolute top-6 right-6 p-2 hover:bg-slate-100 rounded-full">
              <X size={24} className="text-slate-400" />
            </button>

            <div className="p-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-black shadow-lg shadow-blue-100">
                  {content.shortCode}
                </div>
                <h2 className="text-2xl font-black text-slate-900">{content.title} Roadmap</h2>
              </div>

              {/* Dynamic Steps Mapping */}
              <div className="space-y-6 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
                {content.steps.map((step, i) => (
                  <div key={i} className="flex gap-4 items-start border-l-2 border-blue-500 pl-6 py-1 relative">
                    <div className="absolute -left-[9px] top-2 w-4 h-4 rounded-full bg-blue-600 border-4 border-white shadow-sm" />
                    <div>
                      <h4 className="font-bold text-slate-800">{step.title}</h4>
                      <p className="text-sm text-slate-500 mt-1">{step.detail}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button onClick={onClose} className="mt-10 w-full py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-blue-600 transition-all flex items-center justify-center gap-2">
                Start Learning This Path <ChevronRight size={18} />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default RoadModal;