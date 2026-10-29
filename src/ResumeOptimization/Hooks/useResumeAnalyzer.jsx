import { useState } from "react";
import { parsePdf } from "../Utils/parsePdf.js";
import { calculateScore } from "../Utils/calculateScore";

export const useResumeAnalyzer = () => {
  const [score, setScore] = useState(null);
  const [matchedKeywords, setMatchedKeywords] = useState([]);
  const [loading, setLoading] = useState(false);

  const analyzeResume = async (file) => {
    try {
      setLoading(true);

      const text = await parsePdf(file);
      const result = calculateScore(text);

      setScore(result.score);
      setMatchedKeywords(result.matched);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    score,
    matchedKeywords,
    loading,
    analyzeResume,
  };
};
