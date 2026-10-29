

import SalaryCard from "./SalaryCard";

const SalaryResult = ({ result }) => {
  if (!result) return null;

  return (
    <SalaryCard
      min={result.min}
      max={result.max}
      confidence={result.confidence}
    />
  );
};

export default SalaryResult;