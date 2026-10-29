// export const SCORING = {
//   KEYWORD_WEIGHT: 5,     // each keyword
//   MAX_KEYWORD_SCORE: 40,

//   SECTION_SCORE: {
//     education: 10,
//     skills: 10,
//     projects: 5,
//     experience: 5,
//   },

//   LENGTH_BONUS: 10,
//   LENGTH_PENALTY: -5,
// };

export const SCORING = {
  KEYWORD_WEIGHT: 8,
  MAX_KEYWORD_SCORE: 50,
  SECTION_SCORE: {
    experience: 15,
    education: 10,
    projects: 15,
    skills: 10,
    contact: 5,
  },
  FORMATTING_BONUS: 5,
};

export const KEYWORDS = [
  "React", "Node.js", "MongoDB", "Express", "TypeScript", 
  "Full Stack", "REST API", "Git", "Docker", "AWS", "Agile"
];