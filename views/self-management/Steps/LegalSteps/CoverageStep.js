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

const schema = stringSchema("coverageInOtherCities");

const CoverageStep = () => {
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
      coverageInOtherCities: data.body.value?.coverageInOtherCities || "",
    },
    validationSchema: schema,
    onSubmit: handleNextStep,
  });

  return (
    <Box sx={defaultStepContainerSx}>
      <Box>
        <SelfManagementBackButton />

        <Typography sx={{ ...questionParagraphSx, mt: 5, mb: 4.5 }}>
          Cobertura, sedes y presencia en otras ciudades
        </Typography>

        <BaseField
          fullWidth
          id="coverageInOtherCities"
          name="coverageInOtherCities"
          placeholder="Escriba su respuesta aquí"
          error={Boolean(formik.errors.coverageInOtherCities)}
          value={formik.values.coverageInOtherCities}
          onChange={formik.handleChange}
          helperText={formik.errors.coverageInOtherCities}
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

export default CoverageStep;
