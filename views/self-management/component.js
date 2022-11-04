import { useContext, useEffect } from "react";

import { FormContext } from "./Context";
import FormLayout from "./Layout";

export const SelfManagement = (props) => {
  const { stepsComponents, ...rest } = props;

  const { pagination } = useContext(FormContext);

  useEffect(() => {
    pagination.steps.set(stepsComponents.length);
  }, [stepsComponents]);

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
