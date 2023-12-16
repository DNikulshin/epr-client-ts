import {create} from 'zustand'
import {instanceAxios} from '../axios'
import {toast} from "react-toastify";

///import loading = toast.loading;

interface authStore {
    isAuth: boolean
    responseResult: string | null
    userName: string | null
    userId: number | null
    checkAuth: (login: string, password: string) => Promise<boolean>
    getUserId: () => void
    logout: () => void
    loading: boolean
    error: string | null
}

interface responseAuth {
    Result: string | null
}
interface responseUserId {
    id: number | null
}

export const useAuthStore = create<authStore>((set, get) => ({
    isAuth: false,
    responseResult: null,
    userName: localStorage.getItem('UserName'),
    userId: JSON.parse(localStorage.getItem('userId') || '{}'),
    loading: false,
    error: null,
    checkAuth: async (login: string, pass: string) => {
        try {
            toast(null)
            set({error: null})
            set({loading: true})
            const {data: {Result}} = await instanceAxios<responseAuth>('', {
                params: {
                    cat: 'employee',
                    action: 'check_pass',
                    login,
                    pass
                }
            })
            if (Result === 'OK') {
                set({isAuth: true})
                set({userName: login})
                localStorage.setItem('UserName', login)

                const {userName} = get()
                const {data: {id}} = await instanceAxios<responseUserId>('', {
                    params: {
                        cat: 'employee',
                        action: 'get_employee_id',
                        'data_typer': 'login',
                        'data_value': userName
                    }
                })
                set({userId: id})
                localStorage.setItem('userId', JSON.stringify(id))
            }
            set({loading: false})
            const {isAuth} = get()
            return isAuth

        } catch (e) {
            if (e instanceof Error) {
                console.log(e)
                set({error: e.message})
                toast(e.message)
                set({loading: false})
            }
        }
    },
    logout: () => {
        set({isAuth: false})
        localStorage.removeItem('userId')
        localStorage.removeItem('UserName')
    }
}))