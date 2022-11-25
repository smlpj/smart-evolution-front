import { useEffect, useState } from "react";

import { useFetch } from "@hooks/useFetch";

import { ManageOperationC } from "./components";
// Queries
import { CreateOperation, GetLastOperationId } from "./queries";

// Hooks
import { Formik, useFormik } from "formik";

export const ManageOperationV = () => {
  const [created, setCreated] = useState(0);
  const [updated, setUpdated] = useState(0);
  const [opId, setOpId] = useState(null);

  const {
    fetch: getLastId,
    loading: loadingGetLastId,
    error: errorGetLastId,
    data: dataGetLastId,
  } = useFetch({ service: GetLastOperationId, init: true });

  const {
    fetch: createOperationFetch,
    loading: loadingCreateOperation,
    error: errorCreateOperation,
    data: dataCreateOperation,
  } = useFetch({ service: CreateOperation, init: false });

  const formik = useFormik({
    initialValues: {
      id: "",
      opType: "",
      opId: null,
      applyGm: false,
      opDate: `${new Date().toISOString().substring(0, 10)}`,
      opId: null,
      emitter: "",
      investor: "",
      bill: "",
      amount: 0,
      discountTax: 0,
      payedAmount: 0,
      payer: "",
      clientAccount: "",
      client: "",
      DateBill: `${new Date().toISOString().substring(0, 10)}`,
      probableDate: `${new Date().toISOString().substring(0, 10)}`,
      billFraction: 0,
      emitterBroker: "",
      investorProfit: 0,
    },

    onSubmit: (values) => {
      console.log(values);
    },
  });

  useEffect(() => {
    formik.setFieldValue("client", formik.values.investor);
  }, [formik.values.investor]);

  // Effects
  useEffect(() => {
    if (dataGetLastId) {
      setOpId(dataGetLastId.data);
      formik.setFieldValue("opId", dataGetLastId.data);
    }
  }, [loadingGetLastId, errorGetLastId, dataGetLastId]);

  useEffect(() => {
    if (formik.values.opId !== null && created === 0) {
      createOperationFetch(formik.values, opId);
      setCreated(1);
    }
  }, [formik.values.opId]);


  useEffect(()=> {
    window.addEventListener("beforeunload", function(event) {
      console.log("UNLOAD:1");
      alert('asasas')
      //event.preventDefault();
      //event.returnValue = null; //"Any text"; //true; //false;
      //return null; //"Any text"; //true; //false;
    });
  }, [])


  
  return (
    <>
      <ManageOperationC formik={formik} />
    </>
  );
};
