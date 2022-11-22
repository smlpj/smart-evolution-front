import { ManageOperationC } from "./components";

import { useFormik } from "formik";
import { useEffect } from "react";


export const ManageOperationV = () => {

  const formik = useFormik({
    initialValues: {
      opType: "",
      opId: "",
      opDate: `${new Date().toISOString().substring(0,10)}`,
      opId: 1,
      emitter:"",
      payer:"",
      clientAccount:"",
      client:""
    },

    onSubmit: (values) => {
      console.log(values);
    }
  })

  useEffect(() => {
    formik.setFieldValue("client", formik.values.investor)
  }, [formik.values.investor]);
  return (
    <>
      <ManageOperationC formik={formik} />
    </>
  );
};
