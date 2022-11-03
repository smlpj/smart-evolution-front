import Axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Get Customer By ID
export const GetCustomerById = async (id) => {
    const res = await Axios.get(`${API_URL}/client/${id}`, {
    headers: {
        authorization: "Bearer " + localStorage.getItem("access-token"),
    },
    });
    return res.data;
};