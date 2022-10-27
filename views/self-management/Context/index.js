import { createContext, useCallback, useEffect, useState } from "react";

import indexOutBounds from "@lib/indexOutBounds";

const FormContext = createContext();

const FormProvider = ({ children }) => {
  const [body, setBody] = useState({});
  const [step, setStep] = useState(0);
  const [stepsCount, setStepsCount] = useState(0);

  const changeStep = useCallback(
    (targetStep) => {
      const outBoundType = indexOutBounds(targetStep, stepsCount);

      const upperBound = outBoundType === 1 && stepsCount - 1;
      const lowerBound = outBoundType === -1;

      const safeStep = lowerBound ? 0 : upperBound || targetStep;

      setStep(safeStep);
    },
    [stepsCount]
  );

  const nextStep = () => {
    changeStep(step + 1);
  };

  const prevStep = () => {
    changeStep(step - 1);
  };

  const data = {
    body: {
      value: body,
      set: setBody,
    },
  };

  const pagination = {
    steps: { value: stepsCount, set: setStepsCount },
    step,
    changeStep,
    nextStep,
    prevStep,
  };

  return (
    <FormContext.Provider value={{ pagination, data }}>
      {children}
    </FormContext.Provider>
  );
};

export { FormContext, FormProvider };
