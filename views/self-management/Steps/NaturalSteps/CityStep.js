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

const schema = selectObjectSchema("city");

const CityStep = () => {
  const { pagination, data } = useContext(FormContext);

  const enterPressed = useKeyPress("Enter");

  const handleCityChange = (evt, value) => {
    formik.setFieldValue("city", value);
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
      city: data.body.value?.city || "",
    },
    validationSchema: schema,
    onSubmit: handleNextStep,
  });

  return (
    <Box sx={defaultStepContainerSx}>
      <Box>
        <SelfManagementBackButton />

        <Typography sx={{ ...questionParagraphSx, mt: 5, mb: 4.5 }}>
          Ciudad
        </Typography>

        <CitiesSelect
          fullWidth
          id="city"
          name="city"
          placeholder="Escriba su respuesta aquí"
          departmentdId={data.body.value.department.value}
          error={Boolean(formik.errors.city)}
          value={formik.values.city}
          onChange={handleCityChange}
          helperText={formik.errors.city}
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

export default CityStep;
