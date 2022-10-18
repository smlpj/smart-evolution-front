import Axios from "axios";
export const RegisterDepositQuery = async (data) => {
  const res = await Axios.post(
    "https://smart-evolution-api2.herokuapp.com/api/deposit-emitter/",
    data,
    {
      headers: {
        authorization: "Bearer " + localStorage.getItem("access-token"),
      },
    }
  );
  return res.data;
};

export const GetDepositByID = async (id) => {
  const res = await Axios.get(
    `https://smart-evolution-api2.herokuapp.com/api/deposit-emitter/${id}`,
    {
      headers: {
        authorization: "Bearer " + localStorage.getItem("access-token"),
      },
    }
  );
  console.log(res.data);
  return res.data;
};

export const ModifyDepositQuery = async (data) => {
  const res = await Axios.patch(
    `https://smart-evolution-api2.herokuapp.com/api/deposit-emitter/${data.id}`,
    data,
    {
      headers: {
        authorization: "Bearer " + localStorage.getItem("access-token"),
      },
    }
  );
  return res.data;
};