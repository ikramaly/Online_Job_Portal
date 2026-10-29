


import { SCORING } from "../Constants/scoringRules";
import { keywordMatcher } from "./keywordMatcher";

export const calculateScore = (text) => {
  // Safety check: if text is empty, return 0 immediately
  if (!text || typeof text !== "string") return { score: 0, matched: [] };

  let score = 0;
  const lowerText = text.toLowerCase();

  // 🔹 Keyword Score
  const { matched } = keywordMatcher(text);
  const matchedCount = matched?.length || 0; // Prevent undefined
  
  let keywordScore = matchedCount * (SCORING.KEYWORD_WEIGHT || 5);
  if (keywordScore > (SCORING.MAX_KEYWORD_SCORE || 40)) {
    keywordScore = SCORING.MAX_KEYWORD_SCORE;
  }
  score += keywordScore;

  // 🔹 Section Score (Checks normalized text)
  if (SCORING.SECTION_SCORE) {
    Object.keys(SCORING.SECTION_SCORE).forEach((section) => {
      if (lowerText.includes(section.toLowerCase())) {
        score += SCORING.SECTION_SCORE[section];
      }
    });
  }

  // 🔹 Length Score
  if (lowerText.length > 1000) {
    score += (SCORING.LENGTH_BONUS || 10);
  } else {
    score += (SCORING.LENGTH_PENALTY || -5);
  }

  // Final Clamp: Ensures a number between 0 and 100
  const finalScore = isNaN(score) ? 0 : Math.min(Math.max(score, 0), 100);

  return { score: finalScore, matched };
};