import {create} from 'zustand'
import {instanceAxios} from '../axios'
import {toast} from 'react-toastify'

///import loading = toast.loading;

interface authStore {
    isAuth: boolean
    responseResult: string | null
    userName: string | null
    userId: number | string | null
    checkAuth: (login: string, password: string) => Promise<boolean | undefined>
    logout: () => void
    loading: boolean
    error: string | null
}

export const useAuthStore = create<authStore>((set, get) => ({
    isAuth: false,
    responseResult: null,
    userName: localStorage.getItem('UserName'),
    userId: localStorage.getItem('userId') || '',
    loading: false,
    error: null,
    checkAuth: async (login: string = '', pass: string = ''): Promise<boolean | undefined> => {
        try {
            toast(null)
            set({error: null})
            set({loading: true})
            const {data: {Result}} = await instanceAxios('', {
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
                if(!localStorage.getItem('userId')) {
                    const {data: {id}} = await instanceAxios('', {
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
            }

            set({loading: false})
            return Result

        } catch (e) {
            set({isAuth: false})
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
        localStorage.removeItem('divisionId')
    }
}))