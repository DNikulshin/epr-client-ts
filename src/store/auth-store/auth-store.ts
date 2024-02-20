import {create} from 'zustand'
import {instanceAxios} from '../../axios.ts'
import {toast} from 'react-toastify'
import {AxiosError} from "axios";
import ErrorStatusText from '../../components/error/errorStatus.ts';

interface authStore {
    isAuth: boolean
    responseResult: number | string | null
    userName: string | null
    userId: number | string | null
    divisionId: number | string | null
    checkAuth: (formData: IformData) => Promise<string | undefined>
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
    userId: localStorage.getItem('userId') || '',
    divisionId: localStorage.getItem('divisionId') || '',
    loading: false,
    error: null,
    checkAuth: async (formData: IformData): Promise<string | undefined> => {
        try {
            toast(null)
            set({error: null})
            set({loading: true})
            const {data: {Result}} = await instanceAxios('/api', {
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
                    const {data: {id}} = await instanceAxios('/api', {
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

                const { userId: id} = get()

                if (!localStorage.getItem('divisionId')) {
                    const {data: {data}} = await instanceAxios('/api', {
                        params: {
                            cat: 'employee',
                            action: 'get_data',
                            id
                        }
                    })

                    if (id) localStorage.setItem('divisionId', Object.keys(data[id]['division'])[0] || '')
                }
            }

            set({loading: false})
            return Result

        } catch (e) {
            if (e instanceof AxiosError) {
                set({error: e.code})
                e.response?.statusText
                  ?
                  toast(ErrorStatusText[e.response?.statusText])
                  : toast(e.code);
                set({loading: false})
            } else {
                set({loading: false})
                throw e
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