import Axios from "axios";


export const login = async (data) => {

    const res = await Axios.post("https://smart-evolution-api.herokuapp.com/api/auth/login", data)
    return res.data
}