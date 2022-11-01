import { useContext, useEffect } from "react";

import { Box, Typography } from "@mui/material";

import useKeyPress from "@hooks/useKeyPress";

import phoneNumberSchema from "@schemas/phoneNumberSchema";

import EnterButton from "@styles/buttons/EnterButton";
import BaseField from "@styles/fields/BaseField";

import { FormContext } from "@views/self-management/Context";
import SelfManagementBackButton from "@views/self-management/SelfManagementBackButton";
import {
  defaultStepContainerSx,
  questionParagraphSx,
} from "@views/self-management/styles";

import { useFormik } from "formik";

const schema = phoneNumberSchema("phone_number");

const PhoneNumberStep = () => {
  const { pagination, data } = useContext(FormContext);

  const enterPressed = useKeyPress("Enter");

  const handleMaskedChange = (values) => {
    formik.setFieldValue("phone_number", values.floatValue);
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
      phone_number: data.body.value?.phone_number || "",
    },
    validationSchema: schema,
    onSubmit: handleNextStep,
  });

  return (
    <Box sx={defaultStepContainerSx}>
      <Box>
        <SelfManagementBackButton />

        <Typography sx={{ ...questionParagraphSx, mt: 5, mb: 4.5 }}>
          Número celular de la empresa
        </Typography>

        <BaseField
          fullWidth
          id="phone_number"
          name="phone_number"
          isPatterned
          format="### ### ####"
          mask="X"
          placeholder="Escriba su respuesta aquí"
          error={Boolean(formik.errors.phone_number)}
          value={formik.values.phone_number}
          onChangeMasked={handleMaskedChange}
          helperText={formik.errors.phone_number}
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

export default PhoneNumberStep;
