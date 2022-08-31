import Axios from "axios";

export const login = async (data) => {
  const res = await Axios.get(
    "https://smart-evolution-api.herokuapp.com/api/city",
    data
  );
  return res.data;
};
