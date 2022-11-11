import * as Yup from "yup";

const nitSchema = (key) =>
  Yup.object({
    [key]: Yup.number()
      .required("Campo obligatorio")
      .test(
        "len",
        "Formato de NIT inválido",
        (val) => val?.toString()?.length === 10
      ),
  });

export default nitSchema;
