import { useContext, useEffect } from "react";

import { Box, Typography } from "@mui/material";

import AccountTypesSelect from "@components/selects/AccountTypesSelect";
import DepartmentSelect from "@components/selects/DepartmentsSelect";

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

const schema = selectObjectSchema("typeForeignCurrencyAccount");

const TypeForeignCurrencyAccountStep = () => {
  const { pagination, data } = useContext(FormContext);

  const enterPressed = useKeyPress("Enter");

  const handleTypeChange = (evt, value) => {
    formik.setFieldValue("typeForeignCurrencyAccount", value);
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
      typeForeignCurrencyAccount:
        data.body.value?.typeForeignCurrencyAccount || "",
    },
    validationSchema: schema,
    onSubmit: handleNextStep,
  });

  return (
    <Box sx={defaultStepContainerSx}>
      <Box>
        <SelfManagementBackButton />

        <Typography sx={{ ...questionParagraphSx, mt: 5, mb: 4.5 }}>
          Tipo de cuenta extranjera
        </Typography>

        <AccountTypesSelect
          fullWidth
          id="typeForeignCurrencyAccount"
          name="typeForeignCurrencyAccount"
          placeholder="Escriba su respuesta aquí"
          error={Boolean(formik.errors.typeForeignCurrencyAccount)}
          value={formik.values.typeForeignCurrencyAccount}
          onChange={handleTypeChange}
          helperText={formik.errors.typeForeignCurrencyAccount}
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

export default TypeForeignCurrencyAccountStep;
