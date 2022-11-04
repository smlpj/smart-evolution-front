import { useContext, useEffect } from "react";

import { Box, Typography } from "@mui/material";

import RadioGroup, { Element } from "@components/RadioGroup";
import { ClientType } from "@components/selects/queries";

import { useFetch } from "@hooks/useFetch";
import useKeyPress from "@hooks/useKeyPress";

import radioGroupSchema from "@schemas/radioGroupSchema";

import EnterButton from "@styles/buttons/EnterButton";

import { FormContext } from "../Context";
import SelfManagementBackButton from "../SelfManagementBackButton";
import { defaultStepContainerSx, questionParagraphSx } from "../styles";

import { useFormik } from "formik";

const schema = radioGroupSchema("typeClient", "string");

const ClientTypeStep = () => {
  const { pagination, data } = useContext(FormContext);

  const {
    loading: loading,
    data: requestData,
    error,
  } = useFetch({
    service: ClientType,
    init: true,
  });
  const clientTypes = requestData?.data || [];

  const enterPressed = useKeyPress("Enter");

  const handleGroupSelect = (evt, value) => {
    formik.setFieldValue("typeClient", value);
  };

  const handleNextStep = (values) => {
    if (values.typeClient !== data.body.value.typeClient)
      data.body.set({
        email: data.body.value.email,
        typeVinculation: data.body.value.typeVinculation,
        typeClient: values.typeClient,
      });
    pagination?.nextStep();
  };

  useEffect(() => {
    if (enterPressed) formik.handleSubmit();
  }, [enterPressed]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      typeClient: data.body.value?.typeClient,
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
          value={formik.values.typeClient}
          error={Boolean(formik.errors.typeClient)}
          helperText={formik.errors.typeClient}
          handleChange={handleGroupSelect}
        >
          {loading
            ? "Cargando..."
            : clientTypes.map((type, i) => (
                <Element
                  key={`type-${type.id}`}
                  label={type.description}
                  value={type.id}
                />
              ))}
        </RadioGroup>

        {error && JSON.stringify(error)}

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

export default ClientTypeStep;
