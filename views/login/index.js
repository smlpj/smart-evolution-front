/* eslint-disable react-hooks/exhaustive-deps */
// hooks
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useFetch } from "../../shared/hooks/useFetch";
//queries
import { login } from "./queries";
// validations
import { string, object } from "yup";
// views
import { InputAdornments } from "./components";
// alerts and notifications
import { Toast } from "../../shared/components/toast";
import { ToastContainer } from "react-toastify";
// router
import { useRouter } from "next/router";

export const InputV = () => {
  // Hooks
  const {
    fetch: loginFetch,
    loading: Loading,
    error: Error,
    data: data,
  } = useFetch({ service: login, init: false });

  const router = useRouter();

  // Effects
  useEffect(() => {
    if (Error) {
      Toast("Usuario y/o Contraseña incorrectos", "error");
    }

    if (data !== undefined) {
      localStorage.setItem("access-token", data.access);
      localStorage.setItem("refresh-token", data.refresh);
      Toast("Bienvenido", "success");
      router.push("/dashboard");
    }
  }, [data, Error]);

  const validationSchema = object({
    email: string("Ingresa un email")
      .matches(
        /^[a-zA-Z]+[a-zA-Z0-9_.]+@[a-zA-Z.]+[a-zA-Z]$/,
        "Ingresa un email válido"
      )
      .required("El email es requerido"),

    password: string("Ingresa una contraseña")
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
      loginFetch(values);
    },
  });

  const [values, setValues] = useState({
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
        ToastContainer={ToastContainer}
      />
    </>
  );
};
