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

const schema = radioGroupSchema("verificationAuthorization", "bool");

const VerificationAuthorizationStep = () => {
  const { pagination, data } = useContext(FormContext);

  const enterPressed = useKeyPress("Enter");

  const handleGroupSelect = (evt, value) => {
    formik.setFieldValue("verificationAuthorization", value === "true");
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
      verificationAuthorization: data.body.value?.verificationAuthorization,
    },
    validationSchema: schema,
    onSubmit: handleNextStep,
  });

  return (
    <Box sx={defaultStepContainerSx}>
      <Box>
        <SelfManagementBackButton />

        <Typography sx={{ ...questionParagraphSx, mt: 5, mb: 1.5 }}>
          Autorización de visita, verificación de información, consulta y
          reporte
        </Typography>
        <Typography sx={{ ...questionDescriptionSx, mb: 2.5 }}>
          Autorizamos a SMART EVOLUTION S.A.S. para que: 1) Directamente o a
          través de quien ella designe, mediante consulta en bases de datos o
          visita a nuestras instalaciones verifique los datos que entregamos en
          este documento y sus anexos; 2) Realice toda clase de consultas y
          reportes a las centrales de riesgos y cualquier otra fuente de
          información de antecedentes disciplinarios, penales, contractuales,
          fiscales, comerciales, financieros y de cualquier otra naturaleza, de
          la empresa, sus administradores, representantes legales o socios con
          más del 5% de participación en el capital social; 3) El tratamiento de
          los datos personales aportados en este formulario para los fines de la
          relación comercial con SMART EVOLUTION S.A.S. y conforme a la Política
          de Tratamiento de Datos de SMART EVOLUTION S.A.S.
        </Typography>

        <RadioGroup
          value={formik.values.verificationAuthorization}
          error={Boolean(formik.errors.verificationAuthorization)}
          helperText={formik.errors.verificationAuthorization}
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

export default VerificationAuthorizationStep;
