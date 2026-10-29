

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UploadCloud, FileText, CheckCircle2, X, AlertCircle } from "lucide-react";

const FileUpload = ({ onUpload, loading }) => {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState(null);
  const inputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (selectedFile) => {
    if (selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      onUpload(selectedFile);
    } else {
      alert("Please upload a professional PDF document.");
    }
  };

  const removeFile = () => {
    setFile(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="w-full">
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        accept=".pdf"
        onChange={handleChange}
      />

      <AnimatePresence mode="wait">
        {!file ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
            className={`relative group cursor-pointer border-2 border-dashed rounded-[2rem] p-10 transition-all flex flex-col items-center justify-center gap-4 ${
              dragActive 
                ? "border-blue-500 bg-blue-50/50" 
                : "border-slate-200 bg-slate-50 hover:bg-white hover:border-slate-300 hover:shadow-xl hover:shadow-slate-200/50"
            }`}
          >
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110 ${
              dragActive ? "bg-blue-500 text-white" : "bg-white text-slate-400 shadow-sm"
            }`}>
              <UploadCloud size={32} />
            </div>

            <div className="text-center">
              <p className="text-lg font-bold text-slate-900">
                {dragActive ? "Drop your resume here" : "Click or drag resume"}
              </p>
              <p className="text-sm font-medium text-slate-500 mt-1">
                Supports professional PDF files (Max 5MB)
              </p>
            </div>

            {/* Decorative Pulse (Visible when dragging) */}
            {dragActive && (
              <motion.div 
                layoutId="pulse"
                className="absolute inset-0 border-2 border-blue-500 rounded-[2rem] animate-pulse"
              />
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white border border-slate-200 rounded-[2rem] p-6 shadow-lg flex items-center justify-between"
          >
            <div className="flex items-center md:gap-4 gap-1">
              <div className="md:w-12 md:h-12 h-10 w-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
                <FileText size={24} />
              </div>
              <div>
                <p className="font-bold md:text-[15px] text-[10px] text-slate-900 truncate max-w-[200px]">
                  {file.name}
                </p>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={12} className="text-emerald-500" />
                  <span className="md:text-[10px] text-[8px] font-black text-slate-400 uppercase tracking-widest">
                    Ready for Analysis
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                removeFile();
              }}
              className="p-2 hover:bg-rose-50 text-slate-400 hover:text-rose-500 rounded-xl transition-colors"
            >
              <X size={20} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {loading && (
        <div className="mt-4 flex items-center justify-center gap-2 text-blue-600 font-bold text-sm">
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          Processing with JiViKa AI...
        </div>
      )}
    </div>
  );
};

export default FileUpload;