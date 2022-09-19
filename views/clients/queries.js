import Axios from "axios";

export const RegisterClientQuery = async (data) => {
  const res = await Axios.post(
    "https://smart-evolution-api.herokuapp.com/api/client/",
    data
  );
  return res.data;
};
