import axios from "axios";

export const customAxios = axios.create({
  baseURL: "http://192.168.1.39:4000/api",
});
