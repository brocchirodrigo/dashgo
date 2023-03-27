import axios from "axios";

const setUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/api"
    : !process.env.BASE_URL
    ? "http://localhost:3000/api"
    : process.env.BASE_URL;

export const api = axios.create({
  baseURL: setUrl,
});
