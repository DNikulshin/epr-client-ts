import { create } from 'zustand'
import { instanceAxios } from '../axios'

console.log(import.meta.env)


interface authStore {
    isAuth: boolean
    responseResult: string | null
    userName: string | null
    userId: number | null
    checkAuth: (login: string, password: string) => void
    getEmployeeId: () => void
}

interface responseAuth {
    Result: string | null
}


export const useAuthStore = create<authStore>((set, get) => ({
    isAuth: false,
    responseResult: null,
    userName: null,
    userId: null,
    checkAuth: async (login: string, pass: string) => {
        try {

            const {data: {Result}} = await instanceAxios('/check_pass', {
                // params: {
                //     cat: 'employee',
                //     action: 'check_pass',
                //     login,
                //     pass
                // }
            })
           if(Result === 'OK') {
            set({isAuth: true})
           }
        
        } catch (e) {
            console.log(e)

        }

    },
    getEmployeeId: async () => {
        try {
            const responseGetUserId = await instanceAxios('/get_employee_id', {
                // params: {
                //     cat: 'employee',
                //     action: 'get_employee_id',
                //     'data_typer': 'login',
                //     'data_value': login
                // }
            })

            console.log(responseGetUserId.data)

        } catch (e) {
            console.log(e)

        }
    }

}))