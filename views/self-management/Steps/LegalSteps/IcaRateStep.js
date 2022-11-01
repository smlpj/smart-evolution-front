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

const schema = numberSchema("icaRate");

const IcaRateStep = () => {
  const { pagination, data } = useContext(FormContext);

  const enterPressed = useKeyPress("Enter");

  const handleMaskedChange = (values) => {
    formik.setFieldValue("icaRate", values.floatValue);
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
      icaRate: data.body.value?.icaRate || "",
    },
    validationSchema: schema,
    onSubmit: handleNextStep,
  });

  return (
    <Box sx={defaultStepContainerSx}>
      <Box>
        <SelfManagementBackButton />

        <Typography sx={{ ...questionParagraphSx, mt: 5, mb: 4.5 }}>
          Tarifa ICA
        </Typography>

        <BaseField
          fullWidth
          id="icaRate"
          name="icaRate"
          isMasked
          thousandSeparator="."
          decimalSeparator=","
          decimalScale={2}
          allowNegative={false}
          isAllowed={(values, sourceInfo) => {
            const { floatValue } = values;
            return !floatValue || floatValue <= 100;
          }}
          placeholder="Escriba su respuesta aquí"
          error={Boolean(formik.errors.icaRate)}
          value={formik.values.icaRate}
          onChangeMasked={handleMaskedChange}
          helperText={formik.errors.icaRate}
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

export default IcaRateStep;
