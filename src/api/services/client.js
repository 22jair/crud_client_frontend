
import axios from './../axios';

const URL = '/client';

export const getAllClients = () => {
  return axios.get(URL);  
}

export const saveClient = (data) => {
  return axios.post(URL, data);
}

export const updateClient = (id, data) => {
  return axios.put(`${URL}/${id}`, data);
}

export const setInactiveClient = (id) => {
  return axios.delete(`${URL}/${id}`);  
}

export const setActiveClient = (id) => {
  return axios.put(`${URL}/restore/${id}`);  
}

export const getStatistics = () => {
  return axios.get(`${URL}/statistics`);  
}