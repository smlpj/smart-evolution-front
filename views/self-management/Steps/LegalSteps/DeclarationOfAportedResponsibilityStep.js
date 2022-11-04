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

const schema = radioGroupSchema("declarationOfAportedResponsibility", "bool");

const DeclarationOfAportedResponsibilityStep = () => {
  const { pagination, data } = useContext(FormContext);

  const enterPressed = useKeyPress("Enter");

  const handleGroupSelect = (evt, value) => {
    formik.setFieldValue(
      "declarationOfAportedResponsibility",
      value === "true"
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
      declarationOfAportedResponsibility:
        data.body.value?.declarationOfAportedResponsibility ?? null,
    },
    validationSchema: schema,
    onSubmit: handleNextStep,
  });

  return (
    <Box sx={defaultStepContainerSx}>
      <Box>
        <SelfManagementBackButton />

        <Typography sx={{ ...questionParagraphSx, mt: 5, mb: 1.5 }}>
          Declaración de responsabilidad por la información aportada
        </Typography>
        <Typography sx={{ ...questionDescriptionSx, mb: 2.5 }}>
          Certificamos que la información presentada en este formulario y los
          documentos anexos es verídica y corresponde a la realidad. En caso de
          inexactitud, falsedad o inconsistencia en la información aportada, la
          entidad que represento será civilmente responsable ante SMART
          EVOLUTION S.A.S. y terceros afectados, por los perjuicios que esta
          circunstancia pudiera ocasionarles.Acepto que en el evento en que la
          empresa, los socios o el representante legal se encuentren reportados
          en algunas de las listas restrictivas definidas por SMART EVOLUTION
          S.A.S. , al momento de la vinculación o durante la relación
          contractual, SMART EVOLUTION S.A.S. podrá para dar por terminado
          unilateralmente el contrato en cualquier momento y sin previo aviso,
          por configurarse una causal objetiva de terminación del
          mismo.Aceptamos y damos por entendido que cualquier irregularidad en
          el proceso de vinculación, hará que este no continúe y constituirá una
          causal de terminación anticipada del vínculo contractual que se
          llegara a tener con SMART EVOLUTION S.A.S. ., sin que por ello se
          genere el reconocimiento de indemnizaciones o pagos de perjuicios.
        </Typography>

        <RadioGroup
          value={formik.values.declarationOfAportedResponsibility}
          error={Boolean(formik.errors.declarationOfAportedResponsibility)}
          helperText={formik.errors.declarationOfAportedResponsibility}
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

export default DeclarationOfAportedResponsibilityStep;
