import { useContext, useEffect } from "react";

import { Box, Typography } from "@mui/material";

import useKeyPress from "@hooks/useKeyPress";

import stringSchema from "@schemas/stringSchema";

import EnterButton from "@styles/buttons/EnterButton";
import BaseField from "@styles/fields/BaseField";

import { FormContext } from "@views/self-management/Context";
import SelfManagementBackButton from "@views/self-management/SelfManagementBackButton";
import {
  defaultStepContainerSx,
  questionDescriptionSx,
  questionParagraphSx,
} from "@views/self-management/styles";

import { useFormik } from "formik";

const schema = stringSchema("publicPersonRelationDescription");

const PublicPersonRelationDescriptionStep = () => {
  const { pagination, data } = useContext(FormContext);

  const enterPressed = useKeyPress("Enter");

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
      publicPersonRelationDescription:
        data.body.value?.publicPersonRelationDescription || "No Aplica",
    },
    validationSchema: schema,
    onSubmit: handleNextStep,
  });

  return (
    <Box sx={defaultStepContainerSx}>
      <Box>
        <SelfManagementBackButton />

        <Typography sx={{ ...questionParagraphSx, mt: 5, mb: 1.5 }}>
          Si respondió afirmativamente a la pregunta anterior, por favor ofrezca
          mayor detalle del vínculo
        </Typography>
        <Typography sx={{ ...questionDescriptionSx, mb: 2.5 }}>
          En caso de haber contestado negativamente, por favor escriba{" "}
          {`"No Aplica"`}.
        </Typography>

        <BaseField
          fullWidth
          id="publicPersonRelationDescription"
          name="publicPersonRelationDescription"
          placeholder="Escriba su respuesta aquí"
          error={Boolean(formik.errors.publicPersonRelationDescription)}
          value={formik.values.publicPersonRelationDescription}
          onChange={formik.handleChange}
          helperText={formik.errors.publicPersonRelationDescription}
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

export default PublicPersonRelationDescriptionStep;
