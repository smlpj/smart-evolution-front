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
  questionParagraphSx,
} from "@views/self-management/styles";

import { useFormik } from "formik";

const schema = stringSchema("rentDeclaration");

const RentDeclarationStep = () => {
  const { pagination, data } = useContext(FormContext);

  const enterPressed = useKeyPress("Enter");

  const handleFileFieldChange = (evt, value) => {
    formik.setFieldValue("rentDeclaration", value);
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
      rentDeclaration: data.body.value?.rentDeclaration || "",
    },
    validationSchema: schema,
    onSubmit: handleNextStep,
  });

  return (
    <Box sx={defaultStepContainerSx}>
      <Box>
        <SelfManagementBackButton />

        <Typography sx={{ ...questionParagraphSx, mt: 5, mb: 4.5 }}>
          Declaración de Renta de los últimos dos periodos
        </Typography>

        <FileField
          hideDownload
          error={Boolean(formik.errors.rentDeclaration)}
          helperText={formik.errors.rentDeclaration}
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

export default RentDeclarationStep;
