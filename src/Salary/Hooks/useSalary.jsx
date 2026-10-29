

import { useState } from "react";
import { calculateSalary } from "../Utils/salaryUtils";

export const useSalary = () => {
  const [result, setResult] = useState(null);

  const getSalary = (data) => {
    const res = calculateSalary(data);
    setResult(res);
  };

  return { result, getSalary };
};