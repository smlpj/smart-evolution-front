import { useContext, useEffect } from "react";

import { FormContext } from "./Context";
import FormLayout from "./Layout";
import EmailStep from "./Steps/EmailStep";
import StartStep from "./Steps/StartStep";

const stepsComponents = [
  { sectionId: 1, component: StartStep },
  { sectionId: 1, component: EmailStep },
];
const steps = stepsComponents.length;

export const SelfManagement = () => {
  const { pagination } = useContext(FormContext);

  useEffect(() => {
    pagination.steps.set(steps);
  }, []);

  if (!pagination.steps.value) return <></>;

  const showHeaderTitle = pagination.step !== 0;

  const currentStepElement = stepsComponents[pagination.step];
  const currentSectionId = currentStepElement.sectionId;
  const CurrentStepComponent = currentStepElement.component;

  return (
    <FormLayout showHeaderTitle={showHeaderTitle} sectionId={currentSectionId}>
      <CurrentStepComponent />
    </FormLayout>
  );
};
