import { useContext, useEffect } from "react";

import { Box, Typography } from "@mui/material";

import CIIUsSelect from "@components/selects/CIIUsSelect";

import useKeyPress from "@hooks/useKeyPress";

import selectObjectSchema from "@schemas/selectObjectSchema";

import EnterButton from "@styles/buttons/EnterButton";

import { FormContext } from "@views/self-management/Context";
import SelfManagementBackButton from "@views/self-management/SelfManagementBackButton";
import {
  defaultStepContainerSx,
  questionParagraphSx,
} from "@views/self-management/styles";

import { useFormik } from "formik";

const schema = selectObjectSchema("ciiu");

const CIIUStep = () => {
  const { pagination, data } = useContext(FormContext);

  const enterPressed = useKeyPress("Enter");

  const handleBack = () => {
    pagination?.changeStep(pagination.step - 8);
  };

  const handleCiiuChange = (evt, value) => {
    formik.setFieldValue("ciiu", value);
  };

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
      ciiu: data.body.value?.ciiu || "",
    },
    validationSchema: schema,
    onSubmit: handleNextStep,
  });

  return (
    <Box sx={defaultStepContainerSx}>
      <Box>
        <SelfManagementBackButton onClick={handleBack} />

        <Typography sx={{ ...questionParagraphSx, mt: 5, mb: 4.5 }}>
          CIIU
        </Typography>

        <CIIUsSelect
          fullWidth
          id="ciiu"
          name="ciiu"
          placeholder="Escriba su respuesta aquí"
          error={Boolean(formik.errors.ciiu)}
          value={formik.values.ciiu}
          onChange={handleCiiuChange}
          helperText={formik.errors.ciiu}
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

export default CIIUStep;
