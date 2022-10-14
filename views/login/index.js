import * as React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { InputAdornments } from "./components";
import { useFetch } from "../../shared/hooks/useFetch";

import { login } from "./queries";

export const InputV = () => {
  // Hooks
  const {
    fetch: loginAux,
    loading: loginLoading,
    error: loginError,
    data: dataLogin,
  } = useFetch({ service: login, init: false });

  // Effects

  React.useEffect(() => {
    if (loginError) {
      alert("Usuario o contraseña incorrectos");
    }

    if (dataLogin !== undefined) {
      localStorage.setItem("access-token", dataLogin.access);
      localStorage.setItem("refresh-token", dataLogin.refresh);
    }

    if (loginLoading) {
    }
  }, [dataLogin, loginError, loginLoading]);

  const validationSchema = yup.object({
    email: yup
      .string("Ingresa un email")
      .matches(
        /^[a-zA-Z]+[a-zA-Z0-9_.]+@[a-zA-Z.]+[a-zA-Z]$/,
        "Ingresa un email válido"
      )
      .required("El email es requerido"),
    password: yup
      .string("Ingresa una contraseña")
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .required("La contraseña es requerida"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      loginAux(values);
    },
  });

  const [values, setValues] = React.useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };



  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <InputAdornments
        formik={formik}
        values={values}
        setValues={setValues}
        handleClickShowPassword={handleClickShowPassword}
        handleMouseDownPassword={handleMouseDownPassword}
      />
    </>
  );
};
