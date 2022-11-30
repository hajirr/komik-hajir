import axios from "axios";

const url = process.env.REACT_APP_BASE_API_URL;

export const getHome = async () => {
  return axios.get(`${url}/api/home`);
};

export const getRilisanTerbaru = async () => {
  return axios.get(`${url}/api/rilisan-terbaru`);
};

export const getHotKomikUpdate = async () => {
  return axios.get(`${url}/api/hot-komik-update`);
};

export const getPopularManga = async () => {
  return axios.get(`${url}/api/popular-manga`);
};

export const postRegister = async (data) => {
  return axios.post(`${url}/api/register`, data);
};
