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

const schema = stringSchema("principalCompetitors");

const PrincipalCompetitorsStep = () => {
  const { pagination, data } = useContext(FormContext);

  const enterPressed = useKeyPress("Enter");

  const handleFileFieldChange = (evt, value) => {
    formik.setFieldValue("principalCompetitors", value);
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
      principalCompetitors: data.body.value?.principalCompetitors || "",
    },
    validationSchema: schema,
    onSubmit: handleNextStep,
  });

  return (
    <Box sx={defaultStepContainerSx}>
      <Box>
        <SelfManagementBackButton />

        <Typography sx={{ ...questionParagraphSx, mt: 5, mb: 1.5 }}>
          Principales competidores
        </Typography>
        <Typography sx={{ ...questionDescriptionSx, mb: 2.5 }}>
          Por favor descargue el formato “Principales competidores en el enlace
          indicado al final. Llénelo y luego cárguelo en el botón “Adjuntar
          archivo”
        </Typography>

        <FileField
          error={Boolean(formik.errors.principalCompetitors)}
          helperText={formik.errors.principalCompetitors}
          downloadFileURL="https://smartevolution.s3.amazonaws.com/assets/Principales+competidores.xlsx"
          downloadFileName="Principales competidores"
          downloadFileText="Descargar archivo “Principales competidores"
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

export default PrincipalCompetitorsStep;
