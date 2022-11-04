import { useContext, useEffect } from "react";

import { Box, Typography } from "@mui/material";

import useKeyPress from "@hooks/useKeyPress";

import stringSchema from "@schemas/stringSchema";

import EnterButton from "@styles/buttons/EnterButton";
import FileField from "@styles/fields/FileField";

import { FormContext } from "@views/self-management/Context";
import SelfManagementBackButton from "@views/self-management/SelfManagementBackButton";
import {
  defaultStepContainerSx,
  questionDescriptionSx,
  questionParagraphSx,
} from "@views/self-management/styles";

import { useFormik } from "formik";

const schema = stringSchema("principalProducts");

const PrincipalProductsStep = () => {
  const { pagination, data } = useContext(FormContext);

  const enterPressed = useKeyPress("Enter");

  const handleBack = () => {
    if (data.body.value?.foreignCurrencyAccounts) {
      pagination?.prevStep();
    } else {
      pagination?.changeStep(pagination.step - 6);
    }
  };

  const handleFileFieldChange = (evt, value) => {
    formik.setFieldValue("principalProducts", value);
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
      principalProducts: data.body.value?.principalProducts || "",
    },
    validationSchema: schema,
    onSubmit: handleNextStep,
  });

  return (
    <Box sx={defaultStepContainerSx}>
      <Box>
        <SelfManagementBackButton onClick={handleBack} />

        <Typography sx={{ ...questionParagraphSx, mt: 5, mb: 1.5 }}>
          Principales productos y servicios
        </Typography>
        <Typography sx={{ ...questionDescriptionSx, mb: 2.5 }}>
          Por favor descargue el formato “Principales productos y/o servicios”
          en el enlace indicado al final. Llénelo y luego cárguelo en el botón
          “Adjuntar archivo”
        </Typography>

        <FileField
          error={Boolean(formik.errors.principalProducts)}
          helperText={formik.errors.principalProducts}
          downloadFileURL="https://smartevolution.s3.amazonaws.com/assets/Principales+productos+y_o+servicios_.xlsx"
          downloadFileName="Principales productos y/o servicios"
          downloadFileText="Descargar archivo “Principales productos y/o servicios”"
          onChange={handleFileFieldChange}
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

export default PrincipalProductsStep;
