import Axios from "axios";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjY3Nzg4MDg5LCJpYXQiOjE2NjUxNjAwODksImp0aSI6IjE5N2E1MDVjYWU0MDQyNGNiOTlhY2YyYWFkOTliYWI4IiwidXNlcl9pZCI6IjFiNzZkNTEwLTBjODgtNDY4Yi05YzE1LWNiMTdhMjZlODM0MSIsIm5hbWUiOiJwcm9kdWN0aW9uIHVzZXIiLCJyb2xlcyI6WyJzdXBlcnVzZXIiXSwiaXNfc3VwZXJ1c2VyIjp0cnVlfQ.7e1R6qx1nRcVbrYgxPPnlTpYx35nvN-fP_5GOgu2DtU";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const RegisterBrokerQuery = async (data) => {
  const res = await Axios.post(`${API_URL}/broker/`, data, {
    headers: {
      authorization: "Bearer " + localStorage.getItem("access-token"),
    },
  });
  return res.data;
};

export const GetBrokerByID = async (id) => {
  const res = await Axios.get(`${API_URL}/broker/${id}`, {
    headers: {
      authorization: "Bearer " + localStorage.getItem("access-token"),
    },
  });
  return res.data;
};

export const ModifyBrokerQuery = async (data) => {
  const res = await Axios.patch(`${API_URL}/broker/${data.id}`, data, {
    headers: {
      authorization: "Bearer " + localStorage.getItem("access-token"),
    },
  });
  return res.data;
};
