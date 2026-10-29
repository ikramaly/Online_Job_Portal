
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getQuestions } from "../Services/InterviewAPI";
import calculateScore from "../Utils/CalculateScore.js";

export const useInterview = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(1500); 
  const navigate = useNavigate();

  // 1. Define submitTest first so useEffect can use it
  // Using useCallback ensures the function is stable
  const submitTest = useCallback(() => {
    const score = calculateScore(questions, answers);
    navigate("/services/guidence/result", { state: { score } });
  }, [questions, answers, navigate]);

  // 2. Timer Logic with Auto-Submit
  useEffect(() => {
    // If time reaches zero, trigger the result page immediately
    if (timeLeft <= 0) {
      submitTest();
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, submitTest]);

  const fetchQuestions = async () => {
    const data = await getQuestions();
    setQuestions(data);
  };

  const handleAnswer = (answer) => {
    // Prevent answering if time is already up
    if (timeLeft <= 0) return;

    const updated = [...answers];
    updated[currentQ] = answer;
    setAnswers(updated);
  };

  const prevQuestion = () => {
    if (currentQ > 0) {
      setCurrentQ(currentQ - 1);
    }
  };

  const nextQuestion = () => {
    // Prevent navigation if time is up
    if (timeLeft <= 0) return;

    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    }
  };

  return {
    questions,
    currentQ,
    answers,
    timeLeft,
    handleAnswer,
    nextQuestion,
    prevQuestion,
    fetchQuestions,
    submitTest,
  };
};