import Axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const GetBillList = async (data) => {
  const res = await Axios.get(`${API_URL}/bill/`, {
    headers: {
      authorization: "Bearer " + localStorage.getItem("access-token"),
    },
  });
  return res.data;
};

export const GetBillListByQuery = async (page) => {
  const res = await Axios.get(`${API_URL}/bill/?page=${page}`, {
    headers: {
      authorization: "Bearer " + localStorage.getItem("access-token"),
    },
  });
  return res.data;
};

export const DeleteBillById = async (id) => {
  const res = await Axios.delete(`${API_URL}/bill/${id}`, {
    headers: {
      authorization: "Bearer " + localStorage.getItem("access-token"),
    },
  });
  return res.data;
};
