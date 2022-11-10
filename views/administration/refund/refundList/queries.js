import Axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export const GetRefund = async () => {
    const res = await Axios.get(`${API_URL}/refund/`, {
      headers: {
        authorization: "Bearer " + localStorage.getItem("access-token"),
      },
    });
    return res.data;
  };