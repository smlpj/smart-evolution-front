import Axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export const GetRefund = async (url, page=null) => {
    const setUrl = page ? `${API_URL}/refund/?page=${page}` : url
    const res = await Axios.get(`${setUrl}`, {
      headers: {
        authorization: "Bearer " + localStorage.getItem("access-token"),
      },
    });
    return res.data;
}