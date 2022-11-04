import Axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const CreateClientSelfManagement = async (data) => {
  const res = await Axios.post(`${API_URL}/selfManagement/`, data);
  return res.data;
};
