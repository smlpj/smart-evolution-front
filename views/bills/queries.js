import Axios from "axios";

export const ReadBills = async (data) => {
  const res = await Axios.post(
    "https://smart-evolution-api2.herokuapp.com/api/bill/read",
    data,
    {
      headers: {
        authorization: "Bearer " + localStorage.getItem("access-token"),
      },
    }
  );
  return res.data;
};

export const ReadCreditNotes = async (data) => {
  const res = await Axios.post(
    "https://smart-evolution-api2.herokuapp.com/api/bill/read/credit-note",
    data,
    {
      headers: {
        authorization: "Bearer " + localStorage.getItem("access-token"),
      },
    }
  );
  return res.data;
};
