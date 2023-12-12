import axios from 'axios'

export const instanceAxios = axios.create({
    baseURL: import.meta.env.API_URL || 'http://localhost:3000',
    params: {
        key: import.meta.env.API_KEY || null
    }

})