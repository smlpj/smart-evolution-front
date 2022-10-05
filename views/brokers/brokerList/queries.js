import Axios from "axios";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjY3MTA4MTkxLCJpYXQiOjE2NjQ0ODAxOTEsImp0aSI6IjA0NzAxNjMyYWFkNzRiNDBhZGUwZWUzYzA4MzQ2OTg0IiwidXNlcl9pZCI6ImQxM2QwZGQ1LTcxZmItNDM4ZC05OTIwLWYyYjVmNTEzNzE4ZSIsIm5hbWUiOiJwcm9kdWN0aW9uIHVzZXIiLCJyb2xlcyI6WyJzdXBlcnVzZXIiXSwiaXNfc3VwZXJ1c2VyIjp0cnVlfQ.8DGchR4wdf3Y7c3TH_xaEzCwcZBQ22mMjIeYrC0as9s";

export const GetBrokerList = async (data) => {
  const res = await Axios.get(
    "https://smart-evolution-api2.herokuapp.com/api/broker/",
    {
      headers: {
        authorization: "Bearer " + token,
      },
    }
  );
  return res.data;
};

export const GetBrokerListByQuery = async (page) => {
  const res = await Axios.get(
    `https://smart-evolution-api2.herokuapp.com/api/broker/?page=${page}`,
    {
      headers: {
        authorization: "Bearer " + token,
      },
    }
  );
  return res.data;
};

export const DeleteBrokerById = async (id) => {
  const res = await Axios.delete(
    `https://smart-evolution-api2.herokuapp.com/api/broker/${id}`,
    {
      headers: {
        authorization: "Bearer " + token,
      },
    }
  );
  return res.data;
};

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
