import { useContext, useEffect } from "react";

import { Box, Typography } from "@mui/material";

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

const schema = selectObjectSchema("bankReferenceDepartment");

const BankReferenceDepartmentStep = () => {
  const { pagination, data } = useContext(FormContext);

  const enterPressed = useKeyPress("Enter");

  const handleDepartmentChange = (evt, value) => {
    formik.setFieldValue("bankReferenceDepartment", value);
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
      bankReferenceDepartment: data.body.value?.bankReferenceDepartment || "",
    },
    validationSchema: schema,
    onSubmit: handleNextStep,
  });

  return (
    <Box sx={defaultStepContainerSx}>
      <Box>
        <SelfManagementBackButton />

        <Typography sx={{ ...questionParagraphSx, mt: 5, mb: 4.5 }}>
          Departamento de la entidad bancaria de la referencia
        </Typography>

        <DepartmentSelect
          fullWidth
          id="bankReferenceDepartment"
          name="bankReferenceDepartment"
          placeholder="Escriba su respuesta aquí"
          error={Boolean(formik.errors.bankReferenceDepartment)}
          value={formik.values.bankReferenceDepartment}
          onChange={handleDepartmentChange}
          helperText={formik.errors.bankReferenceDepartment}
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

export default BankReferenceDepartmentStep;
