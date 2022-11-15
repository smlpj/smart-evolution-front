// React
import { useEffect, useState } from "react";

// Hooks
import { useFetch } from "@hooks/useFetch";

// Components
import { RefundListC } from "./components";
// Queries
import { GetRefund } from "./queries";

export const RefundListV = () => {
  // State
  const [refund, setRefund] = useState([]);
  const initPage =
    "https://smartevolution-production.up.railway.app/api/refund/";
  const [page, setPage] = useState(1);

  // Queries
  const {
    fetch: fetch,
    loading: loading,
    error: error,
    data: data,
  } = useFetch({ service: GetRefund, init: false });

  useEffect(() => {
    fetch(initPage);
  }, []);

  useEffect(() => {
    if (data) {
      const parsed = data.results.map((item) => {
        return {
          ...item,
          account: item?.account?.account_number,
          accountType: item?.accountType?.description,
          bank: item?.bank?.description,
          client: item?.client?.social_reason
            ? item?.client?.social_reason
            : `${item?.client?.first_name} ${item.client.last_name}`,
        };
      });
      setRefund(parsed);
    }
  }, [loading, error, data]);

  const getRefundData = (action) => {
    if (action === "next" && data.next !== null) {
      setPage(page + 1);
      fetch("url", page + 1);
    } else if (action === "previous" && data.previous !== null) {
      setPage(page - 1);
      fetch("url", page - 1);
    } 
  };

  return (
    <RefundListC
      data={refund}
      getRefundData={getRefundData}
      loading={loading}
    />
  );
};
