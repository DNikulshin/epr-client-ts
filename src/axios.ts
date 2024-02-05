import axios from 'axios';

export const instanceAxios = axios.create({
  // proxy: {
  //   protocol: 'https',
  //   host: import.meta.env.VITE_APP_MIDDLEWARE_API_URL,
  //   port: 443,
  // },
  method: 'POST',
  baseURL: import.meta.env.VITE_APP_MIDDLEWARE_API_URL,
  params: {
    key: import.meta.env.VITE_APP_API_KEY || null,
  },
});
