import { useContext, useEffect } from "react";

import { Box, Typography } from "@mui/material";

import RadioGroup, { Element } from "@components/RadioGroup";

import useKeyPress from "@hooks/useKeyPress";

import radioGroupSchema from "@schemas/radioGroupSchema";

import EnterButton from "@styles/buttons/EnterButton";

import { FormContext } from "@views/self-management/Context";
import SelfManagementBackButton from "@views/self-management/SelfManagementBackButton";
import {
  defaultStepContainerSx,
  questionDescriptionSx,
  questionParagraphSx,
} from "@views/self-management/styles";

import { useFormik } from "formik";

const schema = radioGroupSchema("declarationOfRiskPrevention", "bool");

const DeclarationOfRiskPreventionStep = () => {
  const { pagination, data } = useContext(FormContext);

  const enterPressed = useKeyPress("Enter");

  const handleGroupSelect = (evt, value) => {
    formik.setFieldValue("declarationOfRiskPrevention", value === "true");
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
      declarationOfRiskPrevention: data.body.value?.declarationOfRiskPrevention,
    },
    validationSchema: schema,
    onSubmit: handleNextStep,
  });

  return (
    <Box sx={defaultStepContainerSx}>
      <Box>
        <SelfManagementBackButton />

        <Typography sx={{ ...questionParagraphSx, mt: 5, mb: 1.5 }}>
          Declaración de prevención de riesgos de LA/FT
        </Typography>
        <Typography sx={{ ...questionDescriptionSx, mb: 2.5 }}>
          Manifestamos que nuestros dineros provienen de actividades lícitas y
          que en ningún caso utilizaremos dineros provenientes de cualquier
          forma con el tráfico de estupefacientes, lavado de activos y/o
          cualquier otra actividad penalizada por la legislación Nacional o
          Internacional. Igualmente, adoptaremos integralmente las políticas y
          procedimientos que SMART EVOLUTION S.A.S. defina para la
          administración y prevención de los riesgos asociados al LA/FT.
        </Typography>

        <RadioGroup
          value={formik.values.declarationOfRiskPrevention}
          error={Boolean(formik.errors.declarationOfRiskPrevention)}
          helperText={formik.errors.declarationOfRiskPrevention}
          handleChange={handleGroupSelect}
        >
          <Element label="Sí" value={true} />
          <Element label="No" value={false} />
        </RadioGroup>

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

export default DeclarationOfRiskPreventionStep;
