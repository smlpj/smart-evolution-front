import Head from "next/head";
import * as React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { SignUpClient } from "./components";
import { useFetch } from "../../shared/hooks/useFetch";
import {
  RegisterClientQuery,
  ModifyClientQuery,
  GetClientByID,
} from "./queries";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function RegisterClient() {
  const [option, setOption] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (router && router.query) {
      setOption(Object.values(router.query)[0]);
      console.log(option);
    }
  }, [router.query]);

  const {
    fetch: fetch,
    loading: loading,
    error: error,
    data: data,
  } = useFetch({ service: RegisterClientQuery, init: false });

  const {
    fetch: fetch2,
    loading: loading2,
    error: error2,
    data: data2,
  } = useFetch({ service: GetClientByID, init: false });

  const {
    fetch: fetch3,
    loading: loading3,
    error: error3,
    data: data3,
  } = useFetch({ service: ModifyClientQuery, init: false });

  useEffect(() => {
    if (option !== "register" && option !== "" && option !== undefined) {
      fetch2(option).then((data) => {
        formik.setValues({
          id: data?.data?.id,
          type_identity: data?.data?.type_identity,
          document_number: data?.data?.document_number,
          department: data?.data?.department,
          first_name: data?.data?.first_name,
          last_name: data?.data?.last_name,
          email: data?.data?.email,
          address: data?.data?.address,
          phone_number: data?.data?.phone_number,
          city: data?.data?.city,
          type_client: data?.data?.type_client,
          broker: data?.data?.broker,
          ciiu: data?.data?.ciiu,
          citizenship: data?.data?.citizenship,
          social_reason: data?.data?.social_reason,
        });
        console.log(data);
      });
    }
  }, [option]);

  const validationSchema = yup.object({
    type_identity: yup
      .string("Ingresa el tipo de identificación del corredor")
      .nullable(true)
      .required("El tipo de identificación es requerido"),

    document_number: yup
      .string("Ingresa un número de documento")
      .matches(/^[0-9]+$/, "Ingresa un número de documento válido")
      .required("El número de documento es requerido"),

    first_name: yup
      .string("Ingresa un nombre")
      .matches(/[a-zA-Z]+/, "Ingresa un nombre válido")
      .nullable(true),
    /* .required("El nombre es requerido") */
    last_name: yup
      .string("Ingresa un apellido")
      .matches(/^[a-zA-Z]+$/, "Ingresa un apellido válido")
      .nullable(true),
    /* .required("El apellido es requerido") */
    email: yup
      .string("Ingresa un email")
      .matches(
        /^[a-zA-Z]+[a-zA-Z0-9_.]+@[a-zA-Z.]+[a-zA-Z]$/,
        "Ingresa un email válido"
      )
      .required("El email es requerido"),

    address: yup
      .string("Ingresa una dirección")
      .required("La dirección es requerida"),

    phone_number: yup
      .string("Ingresa un número de teléfono")
      .matches(/^[0-9]+$/, "Ingresa un número de teléfono válido")
      .required("El número de teléfono es requerido"),

    city: yup
      .string("Selecciona una ciudad")
      .nullable(true)
      .required("La ciudad es requerida"),

    type_client: yup
      .string("Selecciona un tipo de cliente")
      .nullable(true)
      .required("El tipo de cliente es requerido"),

    broker: yup
      .string("Selecciona un corredor")
      .nullable(true)
      .required("El corredor es requerido"),

    ciiu: yup
      .string("Selecciona un CIIU")
      .nullable(true)
      .required("El CIIU es requerido"),

    citizenship: yup
      .string("Selecciona una nacionalidad")
      .nullable(true)
      .required("La nacionalidad es requerida"),

    social_reason: yup.string("Ingresa una razón social").nullable(true),
    /* .required("La razón social es requerida") */
  });

  const initualValues = {
    type_identity: null,
    document_number: "",
    first_name: null,
    last_name: null,
    email: "",
    address: "",
    phone_number: "",
    city: null,
    type_client: null,
    department: null,
    broker: null,
    ciiu: null,
    citizenship: null,
    social_reason: null,
  };

  const formik = useFormik({
    initialValues: initualValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (option === "register") {
        console.log("Registrado el cliente");
        fetch(values);
        router.push("/customers/customerList");
      } else {
        console.log("Actualizado el cliente");
        fetch3(values);
        router.push("/customers/customerList");
      }
    },
  });

  return (
    <>
      <Head>
        <title>
          {option !== "register" && option !== "" && option !== undefined
            ? "Modificación del cliente"
            : "Registro de clientes"}
        </title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/assets/Icono Smart.svg" />
      </Head>
      <SignUpClient formik={formik} option={option} />
    </>
  );
}
