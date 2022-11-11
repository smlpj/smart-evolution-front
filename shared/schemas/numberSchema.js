import * as Yup from "yup";

const numberSchema = (key) =>
  Yup.object({
    [key]: Yup.number().required("Campo obligatorio"),
  });

export default numberSchema;
