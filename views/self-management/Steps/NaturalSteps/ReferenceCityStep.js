import { useContext, useEffect } from "react";

import { Box, Typography } from "@mui/material";

import CitiesSelect from "@components/selects/CitiesSelect";

import useKeyPress from "@hooks/useKeyPress";

import selectObjectSchema from "@schemas/selectObjectSchema";

import EnterButton from "@styles/buttons/EnterButton";

import { FormContext } from "@views/self-management/Context";
import SelfManagementBackButton from "@views/self-management/SelfManagementBackButton";
import {
  defaultStepContainerSx,
  questionParagraphSx,
} from "@views/self-management/styles";

import { useFormik } from "formik";

const schema = selectObjectSchema("referenceCity");

const ReferenceCityStep = () => {
  const { pagination, data } = useContext(FormContext);

  const enterPressed = useKeyPress("Enter");

  const handleCityChange = (evt, value) => {
    formik.setFieldValue("referenceCity", value);
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
      referenceCity: data.body.value?.referenceCity || null,
    },
    validationSchema: schema,
    onSubmit: handleNextStep,
  });

  return (
    <Box sx={defaultStepContainerSx}>
      <Box>
        <SelfManagementBackButton />

        <Typography sx={{ ...questionParagraphSx, mt: 5, mb: 4.5 }}>
          Ciudad de la referencia personal
        </Typography>

        <CitiesSelect
          fullWidth
          id="referenceCity"
          name="referenceCity"
          placeholder="Escriba su respuesta aquí"
          departmentdId={data.body.value.referenceDepartment.value}
          error={Boolean(formik.errors.referenceCity)}
          value={formik.values.referenceCity}
          onChange={handleCityChange}
          helperText={formik.errors.referenceCity}
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

export default ReferenceCityStep;
