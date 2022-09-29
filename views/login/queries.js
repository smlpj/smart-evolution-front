import Axios from "axios";

export const login = async (data) => {
  const res = await Axios.post(
    "https://smart-evolution-api2.herokuapp.com/api/auth/login",
    data
  );
  return res.data;
};
