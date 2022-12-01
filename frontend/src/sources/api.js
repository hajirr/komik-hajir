import axios from "axios";

const url = process.env.REACT_APP_BASE_API_URL;

export const getHome = async () => {
  return axios.get(`${url}/api/home`);
};

export const postDetailKomik = (data) => {
  return axios.post(`${url}/api/komik`, data);
};

export const postBacaKomik = (data) => {
  return axios.post(`${url}/api/chapter`, data);
};

export const postSearch = (data) => {
  return axios.post(`${url}/api/search`, data);
};
