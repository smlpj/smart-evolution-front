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

const schema = stringSchema("activityDescription");

const ActivityDescriptionStep = () => {
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
      activityDescription: data.body.value?.activityDescription || "",
    },
    validationSchema: schema,
    onSubmit: handleNextStep,
  });

  return (
    <Box sx={defaultStepContainerSx}>
      <Box>
        <SelfManagementBackButton />

        <Typography sx={{ ...questionParagraphSx, mt: 5, mb: 1.5 }}>
          Describa su actividad económica
        </Typography>
        <Typography sx={{ ...questionDescriptionSx, mb: 2.5 }}>
          Declaro bajo la gravedad del juramento que mi patrimonio y los
          recursos con los que realizo mis actividades económicas, así como con
          los que realizo las operaciones por intermedio de SMART EVOLUTION
          SAS., provienen de actividades licitas, en especial de las siguientes
          fuentes:
        </Typography>

        <BaseField
          fullWidth
          id="activityDescription"
          name="activityDescription"
          placeholder="Escriba su respuesta aquí"
          error={Boolean(formik.errors.activityDescription)}
          value={formik.values.activityDescription}
          onChange={formik.handleChange}
          helperText={formik.errors.activityDescription}
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

export default ActivityDescriptionStep;
