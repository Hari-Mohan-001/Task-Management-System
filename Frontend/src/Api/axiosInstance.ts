import axios from "axios";
import { Base_Url } from "../Constants/urls";

const axiosInstance = axios.create({
    baseURL:Base_Url,
    withCredentials:true,
    headers:{
        "Content-Type": "application/json"
    }
})

export default axiosInstance