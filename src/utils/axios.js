import axios from "axios";

export  const axiosInstance=axios.create({
    baseURL:'https://links-manager-api.herokuapp.com/api'
})