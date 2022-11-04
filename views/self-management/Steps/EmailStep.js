import { useContext, useEffect } from "react";

import { Box, Typography } from "@mui/material";

import useKeyPress from "@hooks/useKeyPress";

import emailSchema from "@schemas/emailSchema";

import EnterButton from "@styles/buttons/EnterButton";
import BaseField from "@styles/fields/BaseField";

import { FormContext } from "../Context";
import SelfManagementBackButton from "../SelfManagementBackButton";
import { defaultStepContainerSx, questionParagraphSx } from "../styles";

import { useFormik } from "formik";

const schema = emailSchema();

const EmailStep = () => {
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
      email: data.body.value?.email || "",
    },
    validationSchema: schema,
    onSubmit: handleNextStep,
  });

  return (
    <Box sx={defaultStepContainerSx}>
      <Box>
        <SelfManagementBackButton />

        <Typography sx={{ ...questionParagraphSx, mt: 5, mb: 4.5 }}>
          Escriba su correo electrónico
        </Typography>

        <BaseField
          fullWidth
          id="email"
          name="email"
          placeholder="Escriba su respuesta aquí"
          error={Boolean(formik.errors.email)}
          value={formik.values.email}
          onChange={formik.handleChange}
          helperText={formik.errors.email}
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

export default EmailStep;
