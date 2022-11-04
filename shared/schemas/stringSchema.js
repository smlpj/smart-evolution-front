import * as Yup from "yup";

const stringSchema = (key) =>
  Yup.object({
    [key]: Yup.string().required("Campo obligatorio"),
  });

export default stringSchema;
