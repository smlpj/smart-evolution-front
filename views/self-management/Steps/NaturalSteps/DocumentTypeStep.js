import { useContext, useEffect } from "react";

import { Box, Typography } from "@mui/material";

import DocumentTypesSelect from "@components/selects/DocumentTypesSelect";

import useKeyPress from "@hooks/useKeyPress";

import selectObjectSchema from "@schemas/selectObjectSchema";

import EnterButton from "@styles/buttons/EnterButton";

import { FormContext } from "@views/self-management/Context";
import SelfManagementBackButton from "@views/self-management/SelfManagementBackButton";
import {
  defaultStepContainerSx,
  questionParagraphSx,
} from "@views/self-management/styles";

import { useFormik } from "formik";

const schema = selectObjectSchema("typeDocument");

const DocumentTypeStep = () => {
  const { pagination, data } = useContext(FormContext);

  const enterPressed = useKeyPress("Enter");

  const handleDocumentTypeChange = (evt, value) => {
    formik.setFieldValue("typeDocument", value);
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
      typeDocument: data.body.value?.typeDocument || null,
    },
    validationSchema: schema,
    onSubmit: handleNextStep,
  });

  return (
    <Box sx={defaultStepContainerSx}>
      <Box>
        <SelfManagementBackButton />

        <Typography sx={{ ...questionParagraphSx, mt: 5, mb: 4.5 }}>
          Tipo de documento
        </Typography>

        <DocumentTypesSelect
          fullWidth
          id="typeDocument"
          name="typeDocument"
          placeholder="Escriba su respuesta aquí"
          error={Boolean(formik.errors.typeDocument)}
          value={formik.values.typeDocument}
          onChange={handleDocumentTypeChange}
          helperText={formik.errors.typeDocument}
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

export default DocumentTypeStep;
