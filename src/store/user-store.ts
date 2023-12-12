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
    user: Iuser
    //dataArray: any[]
    getData: () => void
}

 interface userReaponse {
    data: {
        [userId]: Iuser
        
    }


}

export interface Iuser {
        id: number | null,
        name: string
        login: string
        email: string
        phone: string
        position: string,
        'last_activity_time': string
    
}

export const useUserStore = create<userStore>((set, get) => ({
    //dataArray: [],
    user: {
        id: null,
        name: '',
        login: '',
        email: '',
        phone: '',
        position: '',
        'last_activity_time': ''
    },
    getData: async () => {
        try {
            const { data: { data } } = await instanceAxios<userReaponse>('', {
                // params: {
                //     cat: 'employee',
                //     action: 'get_data',
                //     id: 180
                // }
            })
        
            set({ user: data[userId]})

        } catch (e) {
            console.log(e)
        }
    }
}))