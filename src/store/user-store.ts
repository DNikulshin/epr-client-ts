import { create } from 'zustand'
import { instanceAxios } from '../axios'
const userId = 180

interface userStore {
    user: Iuser
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
            const { data: { data } } = await instanceAxios<userReaponse>('/get_data', {
                // params: {
                //     cat: 'employee',
                //     action: 'get_data',
                //     id: 180
                // }
            })

            set({ user: data[userId] })

        } catch (e) {
            console.log(e)
        }
    }
}))