import { useContext, useEffect } from "react";

import { Box, Typography } from "@mui/material";

import useKeyPress from "@hooks/useKeyPress";

import stringSchema from "@schemas/stringSchema";

import EnterButton from "@styles/buttons/EnterButton";
import BaseField from "@styles/fields/BaseField";

import { FormContext } from "@views/self-management/Context";
import SelfManagementBackButton from "@views/self-management/SelfManagementBackButton";
import {
  defaultStepContainerSx,
  questionParagraphSx,
} from "@views/self-management/styles";

import { useFormik } from "formik";

const schema = stringSchema("usedCapacityVsInstalledCapacity");

const UsedCapacityVsInstalledCapacityStep = () => {
  const { pagination, data } = useContext(FormContext);

  const enterPressed = useKeyPress("Enter");

  const handleNextStep = (values) => {
    data.body.set({ ...data.body.value, ...values });
    pagination?.nextStep();
  };

  useEffect(() => {
    if (enterPressed) formik.handleSubmit();
  }, [enterPressed]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      usedCapacityVsInstalledCapacity:
        data.body.value?.usedCapacityVsInstalledCapacity || "",
    },
    validationSchema: schema,
    onSubmit: handleNextStep,
  });

  return (
    <Box sx={defaultStepContainerSx}>
      <Box>
        <SelfManagementBackButton />

        <Typography sx={{ ...questionParagraphSx, mt: 5, mb: 4.5 }}>
          Capacidad instalada vs. capacidad utilizada
        </Typography>

        <BaseField
          fullWidth
          id="usedCapacityVsInstalledCapacity"
          name="usedCapacityVsInstalledCapacity"
          placeholder="Escriba su respuesta aquí"
          error={Boolean(formik.errors.usedCapacityVsInstalledCapacity)}
          value={formik.values.usedCapacityVsInstalledCapacity}
          onChange={formik.handleChange}
          helperText={formik.errors.usedCapacityVsInstalledCapacity}
        />

        <EnterButton
          onClick={formik.handleSubmit}
          wrapperSx={{ mt: 3.75 }}
          showPressEnter
        >
          OK
        </EnterButton>
      </Box>
    </Box>
  );
};

export default UsedCapacityVsInstalledCapacityStep;
