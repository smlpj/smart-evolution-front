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

const schema = stringSchema("foreignCurrencyOperationsDescription");

const ForeignCurrencyOperationsDescriptionStep = () => {
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
      foreignCurrencyOperationsDescription:
        data.body.value?.foreignCurrencyOperationsDescription || "No Aplica",
    },
    validationSchema: schema,
    onSubmit: handleNextStep,
  });

  return (
    <Box sx={defaultStepContainerSx}>
      <Box>
        <SelfManagementBackButton />

        <Typography sx={{ ...questionParagraphSx, mt: 5, mb: 1.5 }}>
          Describa el tipo de operaciones en moneda extranjera que realiza
        </Typography>
        <Typography sx={{ ...questionDescriptionSx, mb: 2.5 }}>
          En caso de haber contestado que no realiza operaciones en la pregunta
          anterior, por favor escriba {`"No Aplica"`}.
        </Typography>

        <BaseField
          fullWidth
          id="foreignCurrencyOperationsDescription"
          name="foreignCurrencyOperationsDescription"
          placeholder="Escriba su respuesta aquí"
          error={Boolean(formik.errors.foreignCurrencyOperationsDescription)}
          value={formik.values.foreignCurrencyOperationsDescription}
          onChange={formik.handleChange}
          helperText={formik.errors.foreignCurrencyOperationsDescription}
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

export default ForeignCurrencyOperationsDescriptionStep;
