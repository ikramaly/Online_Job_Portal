// import OptionsList from "./OptionsList";

// function QuestionCard({ question, selected, onSelect }) {
//   return (
//     <div className="mt-4">
//       <h3>{question.question}</h3>

//       <OptionsList
//         options={question.options}
//         selected={selected}
//         onSelect={onSelect}
//       />
//     </div>
//   );
// }

// export default QuestionCard;

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

function QuestionCard({ question, selected, onSelect }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={question.question}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="w-full max-w-2xl bg-white rounded-3xl p-8 shadow-xl border border-slate-100"
      >
        <span className="text-xs font-black uppercase tracking-widest text-blue-600 mb-2 block">
          Technical Assessment
        </span>
        <h3 className="text-2xl font-bold text-slate-800 leading-tight mb-8">
          {question.question}
        </h3>

        <div className="grid grid-cols-1 gap-4">
          {question.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => onSelect(opt)}
              className={`flex items-center justify-between p-5 rounded-2xl border-2 transition-all duration-200 group ${
                selected === opt
                  ? "border-blue-600 bg-blue-50/50 shadow-md"
                  : "border-slate-100 hover:border-blue-200 hover:bg-slate-50"
              }`}
            >
              <span className={`font-semibold ${selected === opt ? "text-blue-700" : "text-slate-600"}`}>
                {opt}
              </span>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                selected === opt ? "bg-blue-600 border-blue-600" : "border-slate-200 group-hover:border-blue-300"
              }`}>
                {selected === opt && <CheckCircle2 size={16} className="text-white" />}
              </div>
            </button>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default QuestionCard;