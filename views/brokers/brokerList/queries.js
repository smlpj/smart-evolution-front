import Axios from "axios";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjY3Nzg4MDg5LCJpYXQiOjE2NjUxNjAwODksImp0aSI6IjE5N2E1MDVjYWU0MDQyNGNiOTlhY2YyYWFkOTliYWI4IiwidXNlcl9pZCI6IjFiNzZkNTEwLTBjODgtNDY4Yi05YzE1LWNiMTdhMjZlODM0MSIsIm5hbWUiOiJwcm9kdWN0aW9uIHVzZXIiLCJyb2xlcyI6WyJzdXBlcnVzZXIiXSwiaXNfc3VwZXJ1c2VyIjp0cnVlfQ.7e1R6qx1nRcVbrYgxPPnlTpYx35nvN-fP_5GOgu2DtU";

export const GetBrokerList = async (data) => {
  const res = await Axios.get(
    "https://smart-evolution-api2.herokuapp.com/api/broker/",
    {
      headers: {
        authorization: "Bearer " + localStorage.getItem("access-token"),
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
        authorization: "Bearer " + localStorage.getItem("access-token"),
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
        authorization: "Bearer " + localStorage.getItem("access-token"),
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
        authorization: "Bearer " + localStorage.getItem("access-token"),
      },
    }
  );
  return res.data;
};
