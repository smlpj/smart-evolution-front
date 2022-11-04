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

const schema = stringSchema("shareHoldersAndAssociates");

const ShareHoldersAndAssociatesStep = () => {
  const { pagination, data } = useContext(FormContext);

  const enterPressed = useKeyPress("Enter");

  const handleFileFieldChange = (evt, value) => {
    formik.setFieldValue("shareHoldersAndAssociates", value);
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
      shareHoldersAndAssociates:
        data.body.value?.shareHoldersAndAssociates || "",
    },
    validationSchema: schema,
    onSubmit: handleNextStep,
  });

  return (
    <Box sx={defaultStepContainerSx}>
      <Box>
        <SelfManagementBackButton />

        <Typography sx={{ ...questionParagraphSx, mt: 5, mb: 1.5 }}>
          Identificación de accionistas y asociados
        </Typography>
        <Typography sx={{ ...questionDescriptionSx, mb: 2.5 }}>
          Por favor descargue el formato “Accionistas y/o asociados” en el
          enlace indicado al final. Llénelo y luego cárguelo en el botón
          “Adjuntar archivo”
        </Typography>

        <FileField
          error={Boolean(formik.errors.shareHoldersAndAssociates)}
          helperText={formik.errors.shareHoldersAndAssociates}
          downloadFileURL="https://smartevolution.s3.amazonaws.com/assets/Accionistas+y_o+Asociados.xlsx"
          downloadFileName="Accionistas y/o asociados"
          downloadFileText="Descargar archivo “Accionistas y/o Asociados”"
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

export default ShareHoldersAndAssociatesStep;
