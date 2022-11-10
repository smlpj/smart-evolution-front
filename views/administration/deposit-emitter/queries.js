import Axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const RegisterDepositQuery = async (data) => {
  const res = await Axios.post(`${API_URL}/emitter-deposit/`, data, {
    headers: {
      authorization: "Bearer " + localStorage.getItem("access-token"),
    },
  });
  return res.data;
};

export const GetDepositByID = async (id) => {
  const res = await Axios.get(`${API_URL}/emitter-deposit/${id}`, {
    headers: {
      authorization: "Bearer " + localStorage.getItem("access-token"),
    },
  });
  return res.data;
};

export const ModifyDepositQuery = async (data) => {
  const res = await Axios.patch(`${API_URL}/emitter-deposit/${data.id}`, data, {
    headers: {
      authorization: "Bearer " + localStorage.getItem("access-token"),
    },
  });
  return res.data;
};
