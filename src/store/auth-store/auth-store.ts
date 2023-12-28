import {create} from 'zustand'
import {instanceAxios} from '../../axios.ts'
import {toast} from 'react-toastify'

interface authStore {
    isAuth: boolean
    responseResult: string | null
    userName: string | null
    userId: number | string | null
    divisionId: number | string | null
    checkAuth: (formData: IformData) => Promise<boolean | undefined>
    logout: () => void
    loading: boolean
    error: string | null
}

export interface IformData {
    login: string,
    pass: string
}

export const useAuthStore = create<authStore>() ((set, get) => ({
    isAuth: false,
    responseResult: null,
    userName: '',
    userId: localStorage.getItem('userId'),
    divisionId: '',
    loading: false,
    error: null,
    checkAuth: async (formData: IformData): Promise<boolean | undefined> => {
        try {
            toast(null)
            set({error: null})
            set({loading: true})
            const {data: {Result}} = await instanceAxios('', {
                data: formData,
                params: {
                    cat: 'employee',
                    action: 'check_pass'
                },
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            if (Result === 'OK') {
                set({isAuth: true})
                set({userName: formData.login})
                localStorage.setItem('userName', formData.login)

                const {userName} = get()
                if (!localStorage.getItem('userId')) {
                    const {data: {id}} = await instanceAxios('', {
                        params: {
                            cat: 'employee',
                            action: 'get_employee_id',
                            'data_typer': 'login',
                            'data_value': userName
                        }
                    })
                    set({userId: id})
                    localStorage.setItem('userId', id)
                }
                if (!localStorage.getItem('divisionId')) {
                    const {data: {data}} = await instanceAxios('', {
                        params: {
                            cat: 'employee',
                            action: 'get_data',
                            id: get().userId
                        }

                    })
                    const {userId} = get()
                    if (userId) {
                        localStorage.setItem('divisionId', Object.keys(data[userId]['division'])[0] || '')
                    }

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
        set({userId: null})
        set({userName: null})
        set({divisionId: null})
        localStorage.removeItem('userId')
        localStorage.removeItem('userName')
        localStorage.removeItem('divisionId')
    }
}))