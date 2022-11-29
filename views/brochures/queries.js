import Axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const GetBrochureList = async (type) => {
  const res = await Axios.get(`${API_URL}/selfManagement/${type}`, {
    headers: {
      authorization: "Bearer " + localStorage.getItem("access-token"),
    },
  });
  return res.data;
};

export const GetBrochureListByQuery = async (type, page) => {
  const res = await Axios.get(
    `${API_URL}/selfManagement/${type}?page=${page}`,
    {
      headers: {
        authorization: "Bearer " + localStorage.getItem("access-token"),
      },
    }
  );
  return res.data;
};

export const DeleteBrochureById = async (type, id) => {
  const res = await Axios.delete(`${API_URL}/selfManagement/${type}${id}`, {
    headers: {
      authorization: "Bearer " + localStorage.getItem("access-token"),
    },
  });
  return res.data;
};
