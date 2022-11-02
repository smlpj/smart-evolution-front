import { useContext, useEffect } from "react";
import { useState } from "react";

import { Box, Typography } from "@mui/material";

import { useFetch } from "@hooks/useFetch";
import useKeyPress from "@hooks/useKeyPress";

import stringSchema from "@schemas/stringSchema";

import EnterButton from "@styles/buttons/EnterButton";
import FileField from "@styles/fields/FileField";

import { FormContext } from "@views/self-management/Context";
import SelfManagementBackButton from "@views/self-management/SelfManagementBackButton";
import SelfManagementModalLoading from "@views/self-management/SelfManagementModalLoading";
import { CreateClientSelfManagement } from "@views/self-management/queries";
import {
  defaultStepContainerSx,
  questionDescriptionSx,
  questionParagraphSx,
} from "@views/self-management/styles";

import { useFormik } from "formik";

const schema = stringSchema("actionaryComposition");

const ActionaryCompositionStep = () => {
  const [open, setOpen] = useState(false);

  const { data } = useContext(FormContext);

  const enterPressed = useKeyPress("Enter");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleFileFieldChange = (evt, value) => {
    formik.setFieldValue("actionaryComposition", value);
  };

  const handleNextStep = (values) => {
    handleOpen();

    data.body.set({ ...data.body.value, ...values });

    clientSelfManagement({
      ...data.body.value,
      typeDocument: "6b1a9326-00c6-4b72-a8b4-4453b889fbb7",
      country: data.body.value.country.value,
      departmentLC: data.body.value.departmentLC.value,
      cityLC: data.body.value.cityLC.value,
      ciiu: data.body.value.ciiu.value,
      legalRepresentativeDocumentType:
        data.body.value.legalRepresentativeDocumentType.value,
      legalRepresentativeCitizenship:
        data.body.value.legalRepresentativeCitizenship.value,
      legalRepresentativeDepartment:
        data.body.value.legalRepresentativeDepartment.value,
      legalRepresentativeCity: data.body.value.legalRepresentativeCity.value,
    });
  };

  useEffect(() => {
    if (enterPressed) formik.handleSubmit();
  }, [enterPressed]);

  const {
    fetch: clientSelfManagement,
    data: fetchData,
    error: error,
    loading: loading,
  } = useFetch({ service: CreateClientSelfManagement, init: false });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      actionaryComposition: data.body.value?.actionaryComposition || "",
    },
    validationSchema: schema,
    onSubmit: handleNextStep,
  });

  return (
    <Box sx={defaultStepContainerSx}>
      <Box>
        <SelfManagementBackButton />

        <Typography sx={{ ...questionParagraphSx, mt: 5, mb: 1.5 }}>
          Composición accionaria en la cual se relacionen los socios con
          propiedad accionaria mayor al 5%
        </Typography>
        <Typography sx={{ ...questionDescriptionSx, mb: 2.5 }}>
          Esta composición debe estar certificada por el revisor fiscal. (Aplica
          para las personas jurídicas que sean S.A.S o S.A.)
        </Typography>

        <FileField
          hideDownload
          error={Boolean(formik.errors.actionaryComposition)}
          helperText={formik.errors.actionaryComposition}
          downloadFileText="Descargar archivo “Principales competidores"
          onChange={handleFileFieldChange}
        />

        <EnterButton
          onClick={formik.handleSubmit}
          wrapperSx={{ mt: 3.75 }}
          showPressEnter
        >
          Enviar formulario
        </EnterButton>
      </Box>

      <SelfManagementModalLoading
        loading={loading}
        error={error}
        open={open}
        handleClose={handleClose}
      />
    </Box>
  );
};

export default ActionaryCompositionStep;
