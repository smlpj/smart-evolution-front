import { useContext, useEffect } from "react";

import { Box, Typography } from "@mui/material";

import useKeyPress from "@hooks/useKeyPress";

import numberSchema from "@schemas/numberSchema";

import EnterButton from "@styles/buttons/EnterButton";
import BaseField from "@styles/fields/BaseField";

import { FormContext } from "@views/self-management/Context";
import SelfManagementBackButton from "@views/self-management/SelfManagementBackButton";
import {
  defaultStepContainerSx,
  questionParagraphSx,
} from "@views/self-management/styles";

import { useFormik } from "formik";

const schema = numberSchema("mensualIncome");

const MensualIncomeStep = () => {
  const { pagination, data } = useContext(FormContext);

  const enterPressed = useKeyPress("Enter");

  const handleBack = () => {
    if (data.body.value.typeActivity === 1) {
      pagination?.prevStep();
    } else {
      pagination?.changeStep(pagination.step - 3);
    }
  };

  const handleMaskedChange = (values) => {
    formik.setFieldValue("mensualIncome", values.floatValue);
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
      mensualIncome: data.body.value?.mensualIncome || "",
    },
    validationSchema: schema,
    onSubmit: handleNextStep,
  });

  return (
    <Box sx={defaultStepContainerSx}>
      <Box>
        <SelfManagementBackButton onClick={handleBack} />

        <Typography sx={{ ...questionParagraphSx, mt: 5, mb: 4.5 }}>
          Ingresos mensuales
        </Typography>

        <BaseField
          fullWidth
          id="mensualIncome"
          name="mensualIncome"
          isMasked
          thousandSeparator="."
          decimalSeparator=","
          decimalScale={0}
          allowNegative={false}
          placeholder="Escriba su respuesta aquí"
          error={Boolean(formik.errors.mensualIncome)}
          value={formik.values.mensualIncome}
          onChangeMasked={handleMaskedChange}
          helperText={formik.errors.mensualIncome}
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

export default MensualIncomeStep;
