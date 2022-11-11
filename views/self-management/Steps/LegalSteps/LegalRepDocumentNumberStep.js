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

const schema = numberSchema("legalRepresentativeDocumentNumber");

const LegalRepDocumentNumberStep = () => {
  const { pagination, data } = useContext(FormContext);

  const enterPressed = useKeyPress("Enter");

  const handleMaskedChange = (values) => {
    formik.setFieldValue(
      "legalRepresentativeDocumentNumber",
      values.floatValue
    );
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
      legalRepresentativeDocumentNumber:
        data.body.value?.legalRepresentativeDocumentNumber || "",
    },
    validationSchema: schema,
    onSubmit: handleNextStep,
  });

  return (
    <Box sx={defaultStepContainerSx}>
      <Box>
        <SelfManagementBackButton />

        <Typography sx={{ ...questionParagraphSx, mt: 5, mb: 4.5 }}>
          Número de{" "}
          {data.body.value.legalRepresentativeDocumentType.label.toLowerCase()}{" "}
          del representante legal
        </Typography>

        <BaseField
          fullWidth
          id="legalRepresentativeDocumentNumber"
          name="legalRepresentativeDocumentNumber"
          isMasked
          thousandSeparator="."
          decimalSeparator=","
          decimalScale={0}
          allowNegative={false}
          placeholder="Escriba su respuesta aquí"
          error={Boolean(formik.errors.legalRepresentativeDocumentNumber)}
          value={formik.values.legalRepresentativeDocumentNumber}
          onChangeMasked={handleMaskedChange}
          helperText={formik.errors.legalRepresentativeDocumentNumber}
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

export default LegalRepDocumentNumberStep;
