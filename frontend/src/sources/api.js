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
  return axios.get(`${url}/api/anime/op_home`);
};

export const postAnimeNewPagination = async (data) => {
  return axios.post(`${url}/api/anime/op_home`, data);
};

export const postAnimeDetailEpisode = async (data) => {
  return axios.post(`${url}/api/anime/op_episode`, data);
};

export const postAnimeDetail = async (data) => {
  return axios.post(`${url}/api/anime/op_detail`, data);
};
