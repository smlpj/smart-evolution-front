import * as Yup from "yup";

const phoneNumberSchema = (key) =>
  Yup.object({
    [key]: Yup.number()
      .required("Campo obligatorio")
      .test(
        "len",
        "Formato de número inválido",
        (val) => val?.toString()?.length === 10
      ),
  });

export default phoneNumberSchema;
