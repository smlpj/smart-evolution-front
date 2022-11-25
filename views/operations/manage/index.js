import { useEffect, useState } from "react";

import { useRouter } from "next/router";

import { useFetch } from "@hooks/useFetch";

import { ManageOperationC } from "./components";
// Queries
import { CreateOperation, GetLastOperationId, GetBillFraction, DeleteOperation } from "./queries";

// Hooks
import { Formik, useFormik } from "formik";

export const ManageOperationV = () => {

  // States
  const [created, setCreated] = useState(0);
  const [updated, setUpdated] = useState(0);
  const [opId, setOpId] = useState(null);

  // Router
  const router = useRouter();

  // Queries
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

  const {
    fetch: getBillFractionFetch,
    loading: loadingGetBillFraction,
    error: errorGetBillFraction,
    data: dataGetBillFraction,
  } = useFetch({ service: GetBillFraction, init: false });
  
  const {
    fetch: deleteOperationFetch,
    loading: loadingDeleteOperation,
    error: errorDeleteOperation,
    data: dataDeleteOperation,
  } = useFetch({ service: DeleteOperation, init: false });

  // Formik

  const initialValues = {
    amount: 0,
    applyGm: false,
    bill: "",
    billFraction: 0,
    client: "",
    clientAccount: "",
    DateBill: `${new Date().toISOString().substring(0, 10)}`,
    discountTax: 0,
    emitter: "",
    emitterBroker: "",
    id: "",
    investor: "",
    investorProfit: 0,
    investorTax:0,
    opDate: `${new Date().toISOString().substring(0, 10)}`,
    dateExpiration:"",
    opId: null,
    opType: "",
    payedAmount: 0,
    payer: "",
    probableDate: `${new Date().toISOString().substring(0, 10)}`,
    discountTax: 0
  }

  const formik = useFormik({
    initialValues: initialValues,

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

  // detect when the user refresh the page
  useEffect(() => {
    window.addEventListener("beforeunload", function (event) {
      if (updated === 0) {
        console.log(dataCreateOperation.data.opId, 'eliminaaaaaaaar');
        deleteOperationFetch(formik.values.opId);
      } else {
        console.log("no eliminar operacion");
      }
    });
  }, [dataCreateOperation]);

  // detect when a user switch to another page
  useEffect(() => {
    const handleRouteChange = () => {
      if (updated === 0) {
        console.log(formik.values)
        if (dataCreateOperation) deleteOperationFetch(dataCreateOperation.data.opId);
      } else {
        console.log("no eliminar operacion");
      }
    };
    router.events.on("routeChangeStart", handleRouteChange);

  }, [dataCreateOperation]);

  // detect when a bill is selected
  useEffect(() => {
    if (formik.values.bill !== "") {
      getBillFractionFetch(formik.values.bill);
    }
  }, [formik.values.bill]);


  useEffect(() => {
    if (dataCreateOperation) {
      formik.setFieldValue("id", dataCreateOperation.data.id);
      formik.setFieldValue("DateBill", "");
      formik.setFieldValue("probableDate", "");
    }
  }, [dataCreateOperation]);


  useEffect(() => {

    if (dataGetBillFraction) {
      formik.setFieldValue("billFraction", dataGetBillFraction.data.fraction);
      formik.setFieldValue("amount", dataGetBillFraction.data.billValue);
      formik.setFieldValue("DateBill", dataGetBillFraction.data.dateBill);
      formik.setFieldValue("opDate", dataGetBillFraction.data.opDate);
      formik.setFieldValue("dateExpiration", dataGetBillFraction.data.expirationDate);
    }

  }, [dataGetBillFraction])

  return (
    <>
      <ManageOperationC formik={formik} />
    </>
  );
};
