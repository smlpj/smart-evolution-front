import Axios from "axios";
const token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjY2NTc4MDY2LCJpYXQiOjE2NjM5NTAwNjYsImp0aSI6IjgwNzc0NTY4ZTZlYTQ5YzRiZjMyOTc3MzQwOTllOWU1IiwidXNlcl9pZCI6ImIxNTU0ZDdhLThlMzAtNGQ5ZC1hMTEwLTk2YTZkMTc5Zjc2NiIsIm5hbWUiOiJhbmRlcnNvbiBzYW5jaGV6Iiwicm9sZXMiOlsic3VwZXJ1c2VyIl0sInBlcm1pc3Npb25zIjpbXSwiaXNfc3VwZXJ1c2VyIjp0cnVlfQ.PQSW90jcIoEirNESUjcUztM70kUtgIlvoX8VaOPsfzU";

// Get Financial Profile by ID
export const GetFinancialProfileById = async (id) => {
  const res = await Axios.get(
    `https://smart-evolution-api2.herokuapp.com/api/financial_profile/${id}`,
    {
      headers: {
        authorization: "Bearer " + token,
      },
    }
  );
  return res.data;
};

// Get Customer By ID
export const GetCustomerById = async (id) => {
  const res = await Axios.get(
    `https://smart-evolution-api2.herokuapp.com/api/client/${id}`,
    {
      headers: {
        authorization: "Bearer " + token,
      },
    }
  );
  return res.data;
};
