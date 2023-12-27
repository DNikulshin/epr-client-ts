import {create} from 'zustand'
import {instanceAxios} from '../../axios.ts'

interface userStore {
    user: Iuser
    getData: () => void
    getUserName: (id: number | string) => Promise<string>
}

export interface Iuser {
    id: string,
    name: string
    login: string
    email: string
    phone: string
    position: string,
    'last_activity_time': string,

}

export const useUserStore = create<userStore>() ((set, get) => ({
    user: {
        id: localStorage.getItem('userId') || '',
        name: '',
        login: '',
        email: '',
        phone: '',
        position: '',
        'last_activity_time': ''
    },
    getData: async () => {
        try {
            const {data: {data}} = await instanceAxios('', {
                params: {
                    cat: 'employee',
                    action: 'get_data',
                    id: get().user.id
                }
            })
            const {id} = get().user
            set({user: data[id]})
        } catch (e) {
            console.log(e)
        }
    },
    getUserName: async (userId: string | number) => {
        try {
            const {data} = await instanceAxios('', {
                params: {
                    cat: 'employee',
                    action: 'get_data',
                    id: userId
                }
            })
            return data.data[userId].name

        } catch (e) {
            console.log(e)
        }
    }
}))
