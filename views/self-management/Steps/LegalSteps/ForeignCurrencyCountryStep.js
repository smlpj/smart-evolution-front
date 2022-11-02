import { useContext, useEffect } from "react";

import { Box, Typography } from "@mui/material";

import CountriesSelect from "@components/selects/CountriesSelect";

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

const schema = selectObjectSchema("foreignCurrencyCountry");

const ForeignCurrencyCountryStep = () => {
  const { pagination, data } = useContext(FormContext);

  const enterPressed = useKeyPress("Enter");

  const handleCountryChange = (evt, value) => {
    formik.setFieldValue("foreignCurrencyCountry", value);
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
      foreignCurrencyCountry: data.body.value?.foreignCurrencyCountry || "",
    },
    validationSchema: schema,
    onSubmit: handleNextStep,
  });

  return (
    <Box sx={defaultStepContainerSx}>
      <Box>
        <SelfManagementBackButton />

        <Typography sx={{ ...questionParagraphSx, mt: 5, mb: 4.5 }}>
          País de cuenta bancaria extranjera
        </Typography>

        <CountriesSelect
          fullWidth
          id="foreignCurrencyCountry"
          name="foreignCurrencyCountry"
          placeholder="Escriba su respuesta aquí"
          error={Boolean(formik.errors.foreignCurrencyCountry)}
          value={formik.values.foreignCurrencyCountry}
          onChange={handleCountryChange}
          helperText={formik.errors.foreignCurrencyCountry}
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

export default ForeignCurrencyCountryStep;
