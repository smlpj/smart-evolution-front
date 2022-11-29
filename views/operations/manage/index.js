import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

import { useRouter } from "next/router";

import { Toast } from "@components/toast";

import { useFetch } from "@hooks/useFetch";

import { ManageOperationC } from "./components";
// Queries
import {
  CreateOperation,
  DeleteOperation,
  GetBillFraction,
  GetLastOperationId,
  GetRiskProfile,
  UpdateOperation,
  GetOperationById
} from "./queries";

// Utils
import { PV } from "@formulajs/formulajs";
// Hooks
import { Formik, useFormik } from "formik";

export const ManageOperationV = () => {
  // States
  const [created, setCreated] = useState(0);
  const [updated, setUpdated] = useState(0);
  const [opId, setOpId] = useState(null);
  const [id, setId] = useState(null);

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
    fetch: getOperationByIdFetch,
    loading: loadingGetOperationById,
    error: errorGetOperationById,
    data: dataGetOperationById,
  } = useFetch({ service: GetOperationById, init: false });

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

  const {
    fetch: riskProfileFetch,
    loading: loadingRiskProfile,
    error: errorRiskProfile,
    data: dataRiskProfile,
  } = useFetch({ service: GetRiskProfile, init: false });

  const {
    fetch: updateOperationFetch,
    loading: loadingUpdateOperation,
    error: errorUpdateOperation,
    data: dataUpdateOperation,
  } = useFetch({ service: UpdateOperation, init: false });

  // Formik

  const initialValues = {
    amount: 0,
    applyGm: false,
    bill: "",
    billFraction: 0,
    client: "",
    clientAccount: "",
    commissionSF: 0,
    DateBill: `${new Date().toISOString().substring(0, 10)}`,
    dateExpiration: "",
    discountTax: 0,
    discountTax: 0,
    emitter: "",
    emitterBroker: "",
    GM: 0,
    id: "",
    investor: "",
    investorProfit: 0,
    investorTax: 0,
    opDate: `${new Date().toISOString().substring(0, 10)}`,
    operationDays: 0,
    opId: null,
    opType: "",
    payedAmount: 0,
    payedPercent: 0,
    payer: "",
    presentValueInvestor: 0,
    presentValueSF: 0,
    probableDate: `${new Date().toISOString().substring(0, 10)}`,
    status: 0,
  };

  const formik = useFormik({
    initialValues: initialValues,

    onSubmit: (values) => {
      updateOperationFetch(values);
      setUpdated(1);
    },
  });

  useEffect(() => {
    formik.setFieldValue("client", formik.values.investor);
    riskProfileFetch(formik.values.investor);
  }, [formik.values.investor]);

  // Effects

  useEffect(() => {
    if (router && router.query) {
      setId(Object.values(router.query)[0]);
    }
  }, [router.query]);

  useEffect(() => {
    if (id) {
      getOperationByIdFetch(id);
    }
  }, [id]);

  useEffect(() => {
    if (dataGetLastId) {
      setOpId(dataGetLastId.data);
      formik.setFieldValue("opId", dataGetLastId.data);
    }
  }, [loadingGetLastId, errorGetLastId, dataGetLastId]);

  useEffect(() => {
    if (formik.values.opId !== null && created === 0 && id === undefined) {
      createOperationFetch(formik.values, opId);
      setCreated(1);
    } else if (id !== undefined && id !== null) {
      console.log("actualizando");
    }
  }, [formik.values.opId, id]);

  // detect when the user refresh the page
  useEffect(() => {
    window.addEventListener("beforeunload", function (event) {
      if (updated === 0 && (id === null || id === undefined)) {
        deleteOperationFetch(formik.values.opId);
      }
    });
  }, [dataCreateOperation]);

  // detect when a user switch to another page
  useEffect(() => {
    const handleRouteChange = () => {
      if (updated === 0 && (id === null || id === undefined)) {
        if (dataCreateOperation)
          deleteOperationFetch(dataCreateOperation.data.opId);
      }
    };
    router.events.on("routeChangeStart", handleRouteChange);
  }, [dataCreateOperation]);

  // detect when a bill is selected
  useEffect(() => {
    if (formik.values.bill !== "") {
      if (id === null || ( dataGetBillFraction?.data?.bill !== formik.values.bill)) {
        getBillFractionFetch(formik.values.bill);
      }
    }
  }, [formik.values.bill, dataGetOperationById]);

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
      formik.setFieldValue(
        "dateExpiration",
        dataGetBillFraction.data.expirationDate
      );
    }
  }, [dataGetBillFraction]);

  useEffect(() => {
    if (dataRiskProfile) {
      formik.setFieldValue("discountTax", dataRiskProfile.data.discount_rate);
      // 58% of the discount rate
      formik.setFieldValue(
        "investorTax",
        dataRiskProfile.data.discount_rate * 0.58
      );
    }
  }, [dataRiskProfile]);

  useEffect(() => {
    if (formik.values.payedAmount > formik.values.amount) {
      alert("El monto pagado no puede ser mayor al monto de la operación");
      formik.setFieldValue("payedAmount", 0);
      formik.setFieldValue("payedPercent", 0);
    }

    if (formik.values.payedAmount !== 0) {
      formik.setFieldValue(
        "payedPercent",
        ((formik.values.payedAmount / formik.values.amount) * 100).toFixed(2)
      );
    }
  }, [formik.values.payedAmount]);

  useEffect(() => {
    if (formik.values.operationDays > 0 && formik.values.payedAmount > 0) {
      formik.setFieldValue(
        "presentValueInvestor",
        Math.round(
          PV(
            formik.values.investorTax / 100,
            formik.values.operationDays / 100,
            0,
            formik.values.payedAmount,
            0
          ) * -1
        )
      );

      formik.setFieldValue(
        "presentValueSF",
        Math.round(
          PV(
            formik.values.discountTax / 100,
            formik.values.operationDays / 100,
            0,
            formik.values.payedAmount,
            0
          ) * -1
        )
      );
    }
  }, [formik.values.operationDays, formik.values.payedAmount]);

  useEffect(() => {
    formik.setFieldValue(
      "investorProfit",
      formik.values.presentValueInvestor * -1 + formik.values.payedAmount
    );

    formik.setFieldValue(
      "commissionSF",
      formik.values.presentValueInvestor - formik.values.presentValueSF
    );
  }, [formik.values.presentValueInvestor]);


  useEffect(() => {

    if(dataGetOperationById) {
      formik.setValues(dataGetOperationById.data);
      formik.setFieldValue("billFraction", dataGetOperationById.data.billFraction);
      formik.setFieldValue("bill", dataGetOperationById.data.bill);
    }

  },[dataGetOperationById, loadingGetOperationById, errorGetOperationById])

  return (
    <>
      <ManageOperationC
        formik={formik}
        updated={updated}
        ToastContainer={ToastContainer}
      />
    </>
  );
};
