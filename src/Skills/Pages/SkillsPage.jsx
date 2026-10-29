// import { useEffect } from "react";
// import QuestionCard from "../Components/QuestionCard";
// import Timer from "../Components/Timer";
// import { useSkills } from "../Hooks/useSkills";
// import ProgressBar from "../Components/ProgressBar";
// import { Link } from "react-router";
// import {Send, ChevronRight , ChevronLeft} from "lucide-react";
// import Navbar from "../../Navbar";
// import Footer from "../../Footer";
// import { useNavigate } from "react-router";

// function SkillsPage() {
//     const navigate = useNavigate();
//   const subjects = ["react", "dsa"];

//   const { questions, currentQ, answers, timeLeft, handleAnswer, nextQuestion,prevQuestion, fetchQuestions, submitTest } = useSkills();

//   useEffect(() => { fetchQuestions(); }, []);

//   if (!questions || questions.length === 0) return (
//     <div className="h-screen flex items-center justify-center">
//       <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
//     </div>
//   );

//   return (
//     <div >
//       <Navbar />
//           <div className="p-10">
//       <h2 className="text-2xl font-bold mb-5">Select Skill</h2>

//       <div className="flex gap-4">
//         {subjects.map((sub) => (
//           <button
//             key={sub}
//             onClick={() => navigate(`/quiz/${sub}`)}
//             className="px-6 py-3 bg-blue-600 text-white rounded-xl"
//           >
//             {sub.toUpperCase()}
//           </button>
//         ))}
//       </div>
//     </div>
//     <div className="min-h-screen  bg-slate-50 flex flex-col items-center py-12 px-6">
//       <div className="w-full max-w-4xl flex flex-col items-center">
        
//         {/* Top Header */}
//         <div className="w-full flex justify-between items-center mb-12">
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white font-black italic">Ji</div>
//             <h2 className="text-xl font-black text-slate-800 tracking-tighter uppercase">Assessment</h2>
//           </div>
//           <Timer timeLeft={timeLeft} />
//         </div>

//         <ProgressBar current={currentQ + 1} total={questions.length} />

//         <QuestionCard
//           question={questions[currentQ]}
//           selected={answers[currentQ]}
//           onSelect={handleAnswer}
//         />

      

//         <div className="w-full max-w-2xl flex justify-between items-center mt-10">
          
//           {/* Previous Button - Hidden on first question */}
//           <div className="w-1/4">
//             {currentQ > 0 && (
//               <button 
//                 onClick={prevQuestion}
//                 className="flex items-center gap-2 px-6 py-4 text-slate-500 font-bold hover:text-blue-600 transition-all group"
//               >
//                 <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> 
//                 Back
//               </button>
//             )}
//           </div>

//           {/* Indicators */}
//           <div className="text-slate-400 text-xs font-bold uppercase tracking-widest">
//             {currentQ + 1} / {questions.length}
//           </div>

//           {/* Next / Submit Button */}
//           <div className="w-1/4 flex justify-end">
//             {currentQ < questions.length - 1 ? (
//               <button 
//                 onClick={nextQuestion} 
//                 disabled={!answers[currentQ]}
//                 className="flex items-center gap-2 px-10 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-blue-600 disabled:opacity-30 disabled:hover:bg-slate-900 transition-all shadow-xl active:scale-95"
//               >
//                 Next <ChevronRight size={20} />
//               </button>
//             ) : (
//               <button 
//                 onClick={submitTest}
//                 disabled={!answers[currentQ]}
//                 className="flex items-center gap-2 px-10 py-4 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-100 active:scale-95"
//               >
//                 Submit <Send size={18} />
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//       </div>
//       <Footer />
//     </div>
//   );
// }
// export default SkillsPage;

import QuestionCard from "../Components/QuestionCard";
import Timer from "../Components/Timer";
import { useSkills } from "../Hooks/useSkills";
import ProgressBar from "../Components/ProgressBar";
import { Send, ChevronRight, ChevronLeft } from "lucide-react";
import Navbar from "../../Navbar";
import Footer from "../../Footer";
import { useNavigate, useParams } from "react-router";

// import React from "react";
// import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Code2, Database, Globe, Cpu, Layers, Layout, Terminal 
} from "lucide-react";

// Subject data with icons and custom colors for a more attractive UI
const subjectData = [
  { id: "react", label: "React", icon: <Layers />, color: "#61DAFB" },
  { id: "dsa", label: "DSA", icon: <Cpu />, color: "#F7DF1E" },
  { id: "java", label: "Java", icon: <Code2 />, color: "#ED8B00" },
  { id: "c++", label: "C++", icon: <Terminal />, color: "#00599C" },
  { id: "python", label: "Python", icon: <Code2 />, color: "#3776AB" },
  { id: "html", label: "HTML", icon: <Globe />, color: "#E34F26" },
  { id: "css", label: "CSS", icon: <Layout />, color: "#1572B6" },
  { id: "javascript", label: "JavaScript", icon: <Code2 />, color: "#F7DF1E" },
  { id: "networking", label: "Networking", icon: <Globe />, color: "#4CAF50" },
  { id: "node js", label: "Node JS", icon: <Terminal />, color: "#339933" },
  { id: "sql", label: "SQL", icon: <Database />, color: "#00758F" },
];

function SkillsPage() {
  const navigate = useNavigate();
  const { subject } = useParams(); // 🔥 get subject
  // Animation Variants for the Container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  // Animation Variants for each Button
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  // const subjects = ["react", "dsa", "java", "c++", "c", "python","html", "css", "java Script", "networking","node js", "express js", "sql"];

  // 🔥 pass subject to hook
  const {
    questions,
    currentQ,
    answers,
    timeLeft,
    handleAnswer,
    nextQuestion,
    prevQuestion,
    submitTest,
  } = useSkills(subject);

  // 🔥 If no subject → show buttons
  if (!subject) {
    return (
      <div>
        <Navbar />
        <div className="p-10">



          <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">
          Test Your Skills
        </h2>
        <p className="text-slate-500 font-medium">
          Select a subject to start your JiViKa skill assessment.
        </p>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
      >
        {subjectData.map((sub) => (
          <motion.button
            key={sub.id}
            variants={itemVariants}
            whileHover={{ 
              scale: 1.05, 
              backgroundColor: "#f8fafc",
              borderColor: sub.color 
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(`/services/skills/${sub.id}`)}
            className="group flex flex-col items-center justify-center p-6 bg-white border-2 border-slate-100 rounded-[2rem] shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300"
          >
            <div 
              className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-colors duration-300"
              style={{ backgroundColor: `${sub.color}20`, color: sub.color }}
            >
              {sub.icon}
            </div>
            <span className="text-sm font-black text-slate-800 uppercase tracking-wider group-hover:text-slate-900">
              {sub.label}
            </span>
            
            {/* Tiny Indicator Dot */}
            <div 
              className="w-1.5 h-1.5 rounded-full mt-3 opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ backgroundColor: sub.color }}
            />
          </motion.button>
        ))}
      </motion.div>
    </div>
        </div>
        <Footer />
      </div>
    );
  }

  // 🔥 loading state
  if (!questions || questions.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />

      <div className="min-h-screen bg-slate-50 flex flex-col items-center py-12 px-6">
        <div className="w-full max-w-4xl flex flex-col items-center">

          {/* 🔥 Subject Title */}
          <h1 className="text-3xl font-black text-blue-600 mb-6 uppercase">
            {subject} Quiz
          </h1>

          {/* Header */}
          <div className="w-full flex justify-between items-center mb-12">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white font-black italic">
                Ji
              </div>
              <h2 className="text-xl font-black text-slate-800 uppercase">
                Assessment
              </h2>
            </div>

            <Timer timeLeft={timeLeft} />
          </div>

          <ProgressBar current={currentQ + 1} total={questions.length} />

          <QuestionCard
            question={questions[currentQ]}
            selected={answers[currentQ]}
            onSelect={handleAnswer}
          />

          <div className="w-full max-w-2xl flex justify-between items-center mt-10">

            {/* Prev */}
            <div className="w-1/4">
              {currentQ > 0 && (
                <button
                  onClick={prevQuestion}
                  className="flex items-center gap-2 px-6 py-4 text-slate-500 font-bold hover:text-blue-600"
                >
                  <ChevronLeft size={20} /> Back
                </button>
              )}
            </div>

            {/* Indicator */}
            <div className="text-slate-400 text-xs font-bold">
              {currentQ + 1} / {questions.length}
            </div>

            {/* Next / Submit */}
            <div className="w-1/4 flex justify-end">
              {currentQ < questions.length - 1 ? (
                <button
                  onClick={nextQuestion}
                  disabled={!answers[currentQ]}
                  className="flex items-center gap-2 px-10 py-4 bg-slate-900 text-white rounded-2xl"
                >
                  Next <ChevronRight size={20} />
                </button>
              ) : (
                <button
                  onClick={submitTest}
                  disabled={!answers[currentQ]}
                  className="flex items-center gap-2 px-10 py-4 bg-emerald-600 text-white rounded-2xl"
                >
                  Submit <Send size={18} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default SkillsPage;