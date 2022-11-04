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

const schema = selectObjectSchema("companyCity");

const CompanyCityStep = () => {
  const { pagination, data } = useContext(FormContext);

  const enterPressed = useKeyPress("Enter");

  const handleCityChange = (evt, value) => {
    formik.setFieldValue("companyCity", value);
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
      companyCity: data.body.value?.companyCity || null,
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
          id="companyCity"
          name="companyCity"
          placeholder="Escriba su respuesta aquí"
          departmentdId={data.body.value.companyDepartment.value}
          error={Boolean(formik.errors.companyCity)}
          value={formik.values.companyCity}
          onChange={handleCityChange}
          helperText={formik.errors.companyCity}
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

export default CompanyCityStep;
