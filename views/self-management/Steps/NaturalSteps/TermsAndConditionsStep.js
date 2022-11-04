import { useContext, useEffect } from "react";
import { useState } from "react";

import { Box, Typography } from "@mui/material";

import RadioGroup, { Element } from "@components/RadioGroup";

import { useFetch } from "@hooks/useFetch";
import useKeyPress from "@hooks/useKeyPress";

import radioGroupSchema from "@schemas/radioGroupSchema";

import EnterButton from "@styles/buttons/EnterButton";

import { FormContext } from "@views/self-management/Context";
import SelfManagementBackButton from "@views/self-management/SelfManagementBackButton";
import SelfManagementModalLoading from "@views/self-management/SelfManagementModalLoading";
import SelfManagementTermsAndConditionsModal from "@views/self-management/SelfManagementTermsAndConditionsModal";
import { CreateClientSelfManagement } from "@views/self-management/queries";
import {
  defaultStepContainerSx,
  questionDescriptionSx,
  questionParagraphSx,
} from "@views/self-management/styles";

import { useFormik } from "formik";

const schema = radioGroupSchema("termsAndConditions", "bool");

const TermsAndConditionsStep = () => {
  const [open, setOpen] = useState(false);
  const [openTerms, setOpenTerms] = useState(false);

  const { pagination, data } = useContext(FormContext);

  const enterPressed = useKeyPress("Enter");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenTerms = () => setOpenTerms(true);
  const handleCloseTerms = () => setOpenTerms(false);

  const handleGroupSelect = (evt, value) => {
    formik.setFieldValue("termsAndConditions", value === "true");
  };

  const handleNextStep = (values) => {
    if (!formik.values.termsAndConditions) return;

    handleOpen();

    data.body.set({ ...data.body.value, ...values });

    clientSelfManagement({
      ...data.body.value,
      typeDocument: data.body.value.typeDocument.value,
      country: data.body.value.country.value,
      department: data.body.value.department.value,
      city: data.body.value.city.value,
      ciiu: data.body.value.ciiu.value,
      referenceDepartment: data.body.value.referenceDepartment.value,
      referenceCity: data.body.value.referenceCity.value,
      bankReferenceDepartment: data.body.value.bankReferenceDepartment.value,
      bankReferenceCity: data.body.value.bankReferenceCity.value,

      ...(data.body.value.typeActivity === 0 && {
        companyDepartment: data.body.value.companyDepartment.value,
        companyCity: data.body.value.companyCity.value,
      }),
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
      termsAndConditions: data.body.value?.termsAndConditions ?? null,
    },
    validationSchema: schema,
    onSubmit: handleNextStep,
  });

  return (
    <Box sx={defaultStepContainerSx}>
      <Box>
        <SelfManagementBackButton />

        <Typography sx={{ ...questionParagraphSx, mt: 5, mb: 1.5 }}>
          Términos y condiciones
        </Typography>
        <Typography sx={{ ...questionDescriptionSx, mb: 2.5 }}>
          Lea los{" "}
          <Box
            component="span"
            sx={{
              color: "#4f7ea6",
              textDecoration: "underline",
              cursor: "pointer",
            }}
            onClick={handleOpenTerms}
          >
            términos y condiciones
          </Box>{" "}
          y envíe el formulario
        </Typography>

        <RadioGroup
          value={formik.values.termsAndConditions}
          error={Boolean(formik.errors.termsAndConditions)}
          helperText={formik.errors.termsAndConditions}
          handleChange={handleGroupSelect}
        >
          <Element label="Acepto" value={true} />
          <Element label="No acepto" value={false} />
        </RadioGroup>

        <EnterButton
          disabled={!formik.values.termsAndConditions}
          onClick={formik.handleSubmit}
          wrapperSx={{ mt: 3.75 }}
          showPressEnter
        >
          Enviar formulario
        </EnterButton>
      </Box>

      <SelfManagementTermsAndConditionsModal
        open={openTerms}
        handleClose={handleCloseTerms}
      />

      <SelfManagementModalLoading
        loading={loading}
        error={error}
        open={open}
        handleClose={handleClose}
      />
    </Box>
  );
};

export default TermsAndConditionsStep;
