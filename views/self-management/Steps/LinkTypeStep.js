import { useContext, useEffect } from "react";

import { Box, Typography } from "@mui/material";

import RadioGroup, { Element } from "@components/RadioGroup";

import useKeyPress from "@hooks/useKeyPress";

import radioGroupSchema from "@schemas/radioGroupSchema";

import EnterButton from "@styles/buttons/EnterButton";

import { FormContext } from "../Context";
import SelfManagementBackButton from "../SelfManagementBackButton";
import { defaultStepContainerSx, questionParagraphSx } from "../styles";

import { useFormik } from "formik";

const schema = radioGroupSchema("typeVinculation");

const LinkTypeStep = () => {
  const { pagination, data } = useContext(FormContext);

  const enterPressed = useKeyPress("Enter");

  const handleGroupSelect = (evt, value) => {
    formik.setFieldValue("typeVinculation", value);
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
      typeVinculation: data.body.value?.typeVinculation ?? null,
    },
    validationSchema: schema,
    onSubmit: handleNextStep,
  });

  return (
    <Box sx={defaultStepContainerSx}>
      <Box>
        <SelfManagementBackButton />

        <Typography sx={{ ...questionParagraphSx, mt: 5, mb: 4.5 }}>
          Escoja su tipo de vinculación
        </Typography>

        <RadioGroup
          value={formik.values.typeVinculation}
          error={Boolean(formik.errors.typeVinculation)}
          helperText={formik.errors.typeVinculation}
          handleChange={handleGroupSelect}
        >
          <Element label="Emisor" value={0} />
          <Element label="Comprador" value={1} />
          <Element label="Pagador" value={2} />
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

export default LinkTypeStep;
