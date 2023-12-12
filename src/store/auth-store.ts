import {create} from 'zustand'
//  import shallow from 'zustand/shallow'
import {persist} from 'zustand/middleware'
import axios from 'axios'

const instanceAxios = axios.create({
    baseURL: import.meta.env.API_URL,
    params: {
        key: import.meta.env.API_KEY
    }

})

console.log(import.meta.env)


interface authStore {
    isAuth: boolean
    responseResult: {
        Result: string | null
    }
    userName: string | null
    userId: number | null
    checkAuth: (login: string, password: string) => void
    cat?: string
    action?: string

}

export const useAuthStore = create<authStore>()
persist(
    (set, get) => ({
        isAuth: false,
        responseResult: {
            Result: ''
        },
        userName: null,
        userId: null,
        checkAuth: async (login: string, pass: string) => {
            try {
                const responseCheckAuth = await instanceAxios('', {
                        params: {
                            cat: 'employee',
                            action: 'check_pass',
                            login,
                            pass
                        }
                    })
             
                if (responseCheckAuth.status !== 200) throw new Error('Что-то пошло не так')
                const {Result} = get().res
                if (Result === 'OK') {
                    set({res: responseCheckAuth.data})
                    set({userName: login})
                    set({isAuth: true})
                }

                const responseGetUserId = await instanceAxios('', {
                    params: {
                        cat: 'employee',
                        action: 'get_employee_id',
                        'data_typer': 'login',
                        'data_value': login
                    }
                })
                const {id} = responseGetUserId.data
                set({userId: id})
            } catch (e) {
                console.log(e)
            }
        },
    }), {name: 'authStore'})