import { useContext, useEffect } from "react";

import { Box, Typography } from "@mui/material";

import useKeyPress from "@hooks/useKeyPress";

import stringSchema from "@schemas/stringSchema";

import EnterButton from "@styles/buttons/EnterButton";
import DatePicker from "@styles/fields/DatePicker";

import { FormContext } from "@views/self-management/Context";
import SelfManagementBackButton from "@views/self-management/SelfManagementBackButton";
import {
  defaultStepContainerSx,
  questionParagraphSx,
} from "@views/self-management/styles";

import { useFormik } from "formik";

const schema = stringSchema("legalRepresentativeDateBirth");

const LegalRepBirthDateStep = () => {
  const { pagination, data } = useContext(FormContext);

  const enterPressed = useKeyPress("Enter");

  const handleDateSelect = (date) => {
    formik.setFieldValue(
      "legalRepresentativeDateBirth",
      date?.format("YYYY-MM-DD")
    );
  };

  const handleNextStep = (values) => {
    data.body.set({ ...data.body.value, ...values });
    pagination?.nextStep();
  };

  useEffect(() => {
    if (enterPressed) handleNextStep();
  }, [enterPressed]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      legalRepresentativeDateBirth:
        data.body.value?.legalRepresentativeDateBirth || null,
    },
    validationSchema: schema,
    onSubmit: handleNextStep,
  });

  return (
    <Box sx={defaultStepContainerSx}>
      <Box>
        <SelfManagementBackButton />

        <Typography sx={{ ...questionParagraphSx, mt: 5, mb: 4.5 }}>
          Fecha de nacimiento del representante legal
        </Typography>

        <DatePicker
          value={formik.values.legalRepresentativeDateBirth}
          onChange={handleDateSelect}
          error={Boolean(formik.errors.legalRepresentativeDateBirth)}
          helperText={formik.errors.legalRepresentativeDateBirth}
          fullWidth
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

export default LegalRepBirthDateStep;
