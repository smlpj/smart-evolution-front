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
  questionParagraphSx,
} from "@views/self-management/styles";

import { useFormik } from "formik";

const schema = radioGroupSchema("publicPersonRelation", "bool");

const PublicPersonRelationStep = () => {
  const { pagination, data } = useContext(FormContext);

  const enterPressed = useKeyPress("Enter");

  const handleGroupSelect = (evt, value) => {
    formik.setFieldValue("publicPersonRelation", value === "true");
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
      publicPersonRelation: data.body.value?.publicPersonRelation ?? null,
    },
    validationSchema: schema,
    onSubmit: handleNextStep,
  });

  return (
    <Box sx={defaultStepContainerSx}>
      <Box>
        <SelfManagementBackButton />

        <Typography sx={{ ...questionParagraphSx, mt: 5, mb: 4.5 }}>
          ¿Existe algún vínculo entre usted y una persona considerada
          públicamente?
        </Typography>

        <RadioGroup
          value={formik.values.publicPersonRelation}
          error={Boolean(formik.errors.publicPersonRelation)}
          helperText={formik.errors.publicPersonRelation}
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

export default PublicPersonRelationStep;
