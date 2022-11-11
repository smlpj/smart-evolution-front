import Axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export const GetRefund = async (url) => {
    const res = await Axios.get(`${url}`, {
      headers: {
        authorization: "Bearer " + localStorage.getItem("access-token"),
      },
    });
    return res.data;
}