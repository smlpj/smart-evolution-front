import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

import Head from "next/head";
import { useRouter } from "next/router";

import { Toast } from "@components/toast";

import { useFetch } from "@hooks/useFetch";

import { SignUpClient } from "./components";
import {
  GetClientByID,
  ModifyClientQuery,
  RegisterClientQuery,
} from "./queries";

import { useFormik } from "formik";
import { object, string } from "yup";

export default function RegisterClient() {
  const [option, setOption] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (router && router.query) {
      setOption(Object.values(router.query)[0]);
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
      });
    }
  }, [option]);

  const validationSchema = object({
    type_identity: string("Ingresa el tipo de identificaci??n del corredor")
      .nullable(true)
      .required("El tipo de identificaci??n es requerido"),

    document_number: string("Ingresa un n??mero de documento")
      .matches(/^[0-9]+$/, "Ingresa un n??mero de documento v??lido")
      .required("El n??mero de documento es requerido"),

    first_name: string("Ingresa un nombre")
      .matches(/[a-zA-Z]+/, "Ingresa un nombre v??lido")
      .nullable(true),
    last_name: string("Ingresa un apellido")
      .matches(/^[a-zA-Z]+$/, "Ingresa un apellido v??lido")
      .nullable(true),
    email: string("Ingresa un email")
      .matches(
        /^[a-zA-Z]+[a-zA-Z0-9_.]+@[a-zA-Z.]+[a-zA-Z]$/,
        "Ingresa un email v??lido"
      )
      .required("El email es requerido"),

    address: string("Ingresa una direcci??n").required(
      "La direcci??n es requerida"
    ),

    phone_number: string("Ingresa un n??mero de tel??fono")
      .matches(/^[0-9]+$/, "Ingresa un n??mero de tel??fono v??lido")
      .required("El n??mero de tel??fono es requerido"),

    city: string("Selecciona una ciudad")
      .nullable(true)
      .required("La ciudad es requerida"),

    type_client: string("Selecciona un tipo de cliente")
      .nullable(true)
      .required("El tipo de cliente es requerido"),

    broker: string("Selecciona un corredor")
      .nullable(true)
      .required("El corredor es requerido"),

    ciiu: string("Selecciona un CIIU")
      .nullable(true)
      .required("El CIIU es requerido"),

    citizenship: string("Selecciona una nacionalidad")
      .nullable(true)
      .required("La nacionalidad es requerida"),

    social_reason: string("Ingresa una raz??n social").nullable(true),
  });

  const initialValues = {
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
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (option === "register") {
        fetch(values);
      } else {
        fetch3(values);
      }
    },
  });

  useEffect(() => {
    if (loading3) Toast("Cargando...", "loading");

    if (error3) Toast("Error al actualizar el cliente", "error");

    if (data3) {
      Toast("Cliente actualizado correctamente", "success");
      setTimeout(() => {
        router.push("customers/customerList");
      }, 2000);
    }
  }, [loading3, data3, error3]);

  useEffect(() => {
    if (loading == true) {
      Toast("Cargando..", "loading");
    }

    if (error) {
      Toast(`${Object.values(error.message)[0]}`, "error");
    }

    if (data) {
      Toast("Cliente creado correctamente", "success");
      setTimeout(() => {
        router.push("customers/customerList");
      }, 2000);
    }
  }, [loading, data, error]);

  return (
    <>
      <Head>
        <title>
          {option !== "register" && option !== "" && option !== undefined
            ? "Modificaci??n del cliente"
            : "Registro de clientes"}
        </title>
        <meta name="description" content="Generated by create next app" />
      </Head>
      <SignUpClient
        formik={formik}
        option={option}
        ToastContainer={ToastContainer}
        loading={loading2}
      />
    </>
  );
}
