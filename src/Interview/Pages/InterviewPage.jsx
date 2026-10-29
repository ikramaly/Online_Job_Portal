import { useEffect } from "react";
import QuestionCard from "../Components/QuestionCard";
import Timer from "../Components/Timer";
import { useInterview } from "../Hooks/useInterview";
import ProgressBar from "../Components/ProgressBar";
import { Link } from "react-router";
import {Send, ChevronRight , ChevronLeft} from "lucide-react";
import Navbar from "../../Navbar";
import Footer from "../../Footer";


function InterviewPage() {
  const { questions, currentQ, answers, timeLeft, handleAnswer, nextQuestion,prevQuestion, fetchQuestions, submitTest } = useInterview();

  useEffect(() => { fetchQuestions(); }, []);

  if (!questions || questions.length === 0) return (
    <div className="h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
    </div>
  );

  return (
    <div >
      <Navbar />
    <div className="min-h-screen  bg-slate-50 flex flex-col items-center py-12 px-6">
      <div className="w-full max-w-4xl flex flex-col items-center">
        
        {/* Top Header */}
        <div className="w-full flex justify-between items-center mb-12">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white font-black italic">Ji</div>
            <h2 className="text-xl font-black text-slate-800 tracking-tighter uppercase">Assessment</h2>
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
          
          {/* Previous Button - Hidden on first question */}
          <div className="w-1/4">
            {currentQ > 0 && (
              <button 
                onClick={prevQuestion}
                className="flex items-center gap-2 px-6 py-4 text-slate-500 font-bold hover:text-blue-600 transition-all group"
              >
                <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> 
                Back
              </button>
            )}
          </div>

          {/* Indicators */}
          <div className="text-slate-400 text-xs font-bold uppercase tracking-widest">
            {currentQ + 1} / {questions.length}
          </div>

          {/* Next / Submit Button */}
          <div className="w-1/4 flex justify-end">
            {currentQ < questions.length - 1 ? (
              <button 
                onClick={nextQuestion} 
                disabled={!answers[currentQ]}
                className="flex items-center gap-2 px-10 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-blue-600 disabled:opacity-30 disabled:hover:bg-slate-900 transition-all shadow-xl active:scale-95"
              >
                Next <ChevronRight size={20} />
              </button>
            ) : (
              <button 
                onClick={submitTest}
                disabled={!answers[currentQ]}
                className="flex items-center gap-2 px-10 py-4 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-100 active:scale-95"
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
export default InterviewPage;