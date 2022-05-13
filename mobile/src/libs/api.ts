import axios from "axios";

export const api = axios.create({
  baseURL: "http:172.31.192.1:3333",
});
