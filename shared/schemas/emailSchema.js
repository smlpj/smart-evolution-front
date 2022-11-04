import * as Yup from "yup";

const emailSchema = (key = "email") =>
  Yup.object({
    [key]: Yup.string()
      .email("Ingresa un email válido")
      .required("Email obligatorio"),
  });

export default emailSchema;
