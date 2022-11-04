import * as Yup from "yup";

const selectObjectSchema = (key) =>
  Yup.object({
    [key]: Yup.object({
      label: Yup.string(),
      value: Yup.string(),
    })
      .defined()
      .required("Campo obligatorio"),
  });

export default selectObjectSchema;
