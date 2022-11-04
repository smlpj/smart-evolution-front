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

const schema = selectObjectSchema("legalRepresentativeCity");

const LegalRepCityStep = () => {
  const { pagination, data } = useContext(FormContext);

  const enterPressed = useKeyPress("Enter");

  const handleCityChange = (evt, value) => {
    formik.setFieldValue("legalRepresentativeCity", value);
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
      legalRepresentativeCity: data.body.value?.legalRepresentativeCity || null,
    },
    validationSchema: schema,
    onSubmit: handleNextStep,
  });

  return (
    <Box sx={defaultStepContainerSx}>
      <Box>
        <SelfManagementBackButton />

        <Typography sx={{ ...questionParagraphSx, mt: 5, mb: 4.5 }}>
          Ciudad del representante legal
        </Typography>

        <CitiesSelect
          fullWidth
          id="legalRepresentativeCity"
          name="legalRepresentativeCity"
          placeholder="Escriba su respuesta aquí"
          departmentdId={data.body.value.legalRepresentativeDepartment.value}
          error={Boolean(formik.errors.legalRepresentativeCity)}
          value={formik.values.legalRepresentativeCity}
          onChange={handleCityChange}
          helperText={formik.errors.legalRepresentativeCity}
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

export default LegalRepCityStep;
