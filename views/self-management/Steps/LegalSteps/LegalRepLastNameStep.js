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

const schema = stringSchema("legalRepresentativeLastName");

const LegalRepLastNameStep = () => {
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
      legalRepresentativeLastName:
        data.body.value?.legalRepresentativeLastName || "",
    },
    validationSchema: schema,
    onSubmit: handleNextStep,
  });

  return (
    <Box sx={defaultStepContainerSx}>
      <Box>
        <SelfManagementBackButton />

        <Typography sx={{ ...questionParagraphSx, mt: 5, mb: 4.5 }}>
          Apellidos del representante legal
        </Typography>

        <BaseField
          fullWidth
          id="legalRepresentativeLastName"
          name="legalRepresentativeLastName"
          placeholder="Escriba su respuesta aquí"
          error={Boolean(formik.errors.legalRepresentativeLastName)}
          value={formik.values.legalRepresentativeLastName}
          onChange={formik.handleChange}
          helperText={formik.errors.legalRepresentativeLastName}
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

export default LegalRepLastNameStep;
