import axios from 'axios'

export const instanceAxios = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL,
    params: {
        key: import.meta.env.VITE_APP_API_KEY || null
    }

})
