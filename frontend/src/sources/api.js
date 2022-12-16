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

export const getAnimeNew = async () => {
  return axios.get(`${url}/api/anime/new`);
};

export const postAnimeNewPagination = async (data) => {
  return axios.post(`${url}/api/anime/new`, data);
};

export const postAnimeDetail = async (data) => {
  return axios.post(`${url}/api/anime/detail`, data);
};
