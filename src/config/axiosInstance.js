import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL: 'https://backgestionvotantes.com.ar/api',
   // timeout: 1000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'x-role': 'movilizador'
    }
});


