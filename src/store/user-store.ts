import { create } from 'zustand'
//import {persist} from 'zustand/middleware'
import axios from 'axios'

const instanceAxios = axios.create({
    baseURL: 'http://localhost:3000/get_data',
    // params: {
    //     key: import.meta.env.API_KEY
    // }

})

const userId = 180
//console.log(import.meta.env)
interface userStore {
    user: object
    //dataArray: any[]
    getData: () => void
}

interface userResponse {
    data: {
        [userId]: {
            id: number,
            name: string
        }
    }


}

interface Iuser {
    id: number
}

export const useUserStore = create<userStore>((set) => ({
    //dataArray: [],
    user: {
        id: null,
        name: ''
    },
    getData: async () => {
        try {
            const { data: { data } } = await instanceAxios<userResponse>('', {
                // params: {
                //     cat: 'employee',
                //     action: 'get_data',
                //     id: 180
                // }
            })
            console.dir(data)

            set({ user: data[userId]})
       
        } catch (e) {
            console.log(e)
        }
    }
}))