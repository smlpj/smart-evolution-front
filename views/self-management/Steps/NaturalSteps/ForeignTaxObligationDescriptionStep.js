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
  questionDescriptionSx,
  questionParagraphSx,
} from "@views/self-management/styles";

import { useFormik } from "formik";

const schema = stringSchema("foreignTaxObligationDescription");

const ForeignTaxObligationDescriptionStep = () => {
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
      foreignTaxObligationDescription:
        data.body.value?.foreignTaxObligationDescription || "No Aplica",
    },
    validationSchema: schema,
    onSubmit: handleNextStep,
  });

  return (
    <Box sx={defaultStepContainerSx}>
      <Box>
        <SelfManagementBackButton />

        <Typography sx={{ ...questionParagraphSx, mt: 5, mb: 1.5 }}>
          Si respondió afirmativamente a la pregunta anterior, por favor ofrezca
          mayor detalle de la obligación tributaria
        </Typography>
        <Typography sx={{ ...questionDescriptionSx, mb: 2.5 }}>
          En caso de haber contestado negativamente, por favor escriba{" "}
          {`"No Aplica"`}.
        </Typography>

        <BaseField
          fullWidth
          id="foreignTaxObligationDescription"
          name="foreignTaxObligationDescription"
          placeholder="Escriba su respuesta aquí"
          error={Boolean(formik.errors.foreignTaxObligationDescription)}
          value={formik.values.foreignTaxObligationDescription}
          onChange={formik.handleChange}
          helperText={formik.errors.foreignTaxObligationDescription}
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

export default ForeignTaxObligationDescriptionStep;
