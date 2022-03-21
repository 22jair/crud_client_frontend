
import axios from 'axios';

const axiosClient = axios.create();
// const URL = 'http://localhost:3030/api/';
const URL = 'https://mdpbackend.herokuapp.com/api/';

axiosClient.defaults.baseURL = URL;

axiosClient.defaults.headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json'
};

export default axiosClient;