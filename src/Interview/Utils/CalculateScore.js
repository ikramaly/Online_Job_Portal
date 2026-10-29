const calculateScore = (questions, answers) => {
  let score = 0;

  questions.forEach((q, i) => {
    if (q.correctAnswer === answers[i]) {
      score++;
    }
  });

  return score;
};

export default calculateScore;