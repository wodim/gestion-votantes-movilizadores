import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080',
   // timeout: 1000,
   // headers: {
   //     'Content-Type': 'application/json',
   //     'Accept': 'application/json'
   // }
});
