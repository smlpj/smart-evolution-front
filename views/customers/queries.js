import Axios from "axios";

export const Cities = async (data) => {
  const res = await Axios.get(
    "https://smart-evolution-api.herokuapp.com/api/city",
    data
  );
  return res.data;
};