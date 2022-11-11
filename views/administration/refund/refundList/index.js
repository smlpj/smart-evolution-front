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
  const [nextPage, setNextPage] = useState(null);
  const [previousPage, setPreviousPage] = useState(null);
  const [currentPage, setCurrentPage] = useState(
    "https://smart-evolution-api2.herokuapp.com/api/refund/"
  );

  // Queries
  const {
    fetch: fetch,
    loading: loading,
    error: error,
    data: data,
  } = useFetch({ service: GetRefund, init: false });

  useEffect(() => {
    fetch(currentPage);
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
      setNextPage(data.next);
      setPreviousPage(data.previous);
    }
  }, [loading, error, data]);

  const getRefundData = (page, action) => {
    if (action === "next" && nextPage) fetch(nextPage)
    else if (action === 'previous' && previousPage) fetch(previousPage)
  }

  return (
    <RefundListC
      data={refund}
      nextPage={nextPage}
      previousPage={previousPage}
      getRefundData={getRefundData}
      loading={loading}
    />
  );
};
