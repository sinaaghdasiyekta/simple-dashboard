import axios from 'axios';
import { apiBaseURL } from '../config';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  baseURL: apiBaseURL,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;
