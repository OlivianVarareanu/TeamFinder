import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const api = axios.create({
  baseURL:'https://teamfinderapp.azurewebsites.net/' , 
});


api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        
        const response = await axios.get(`api/user/refresh`, { withCredentials:true });
        console.log(response);
        const { accessToken } = response.data;
        
        localStorage.setItem('accessToken', accessToken);
        
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axios(originalRequest);
      } catch (error) {

        console.log(error);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
