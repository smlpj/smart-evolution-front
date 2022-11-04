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

const schema = radioGroupSchema("typeActivity");

const TypeActivityStep = () => {
  const { pagination, data } = useContext(FormContext);

  const enterPressed = useKeyPress("Enter");

  const handleGroupSelect = (evt, value) => {
    formik.setFieldValue("typeActivity", value);
  };

  const handleNextStep = (values) => {
    const activity = Number(values.typeActivity);

    data.body.set({ ...data.body.value, typeActivity: activity });

    if (activity === 0) {
      pagination?.nextStep();
    } else {
      pagination?.changeStep(pagination.step + 8);
    }
  };

  useEffect(() => {
    if (enterPressed) formik.handleSubmit();
  }, [enterPressed]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      typeActivity: data.body.value?.typeActivity ?? null,
    },
    validationSchema: schema,
    onSubmit: handleNextStep,
  });

  return (
    <Box sx={defaultStepContainerSx}>
      <Box>
        <SelfManagementBackButton />

        <Typography sx={{ ...questionParagraphSx, mt: 5, mb: 4.5 }}>
          Tipo de actividad
        </Typography>

        <RadioGroup
          value={formik.values.typeActivity}
          error={Boolean(formik.errors.typeActivity)}
          helperText={formik.errors.typeActivity}
          handleChange={handleGroupSelect}
        >
          <Element label="Empleado" value={0} />
          <Element label="Independiente" value={1} />
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

export default TypeActivityStep;
