import {create} from 'zustand'
import {instanceAxios} from '../../axios.ts'
import moment from "moment"
interface userStore {
    user: Iuser
    getData: () => void
    getUserName: (id: number | string) => Promise<string>
    getDivision: (id: number | string) => Promise<string>
    getTimesheetData: () => Promise<void>
    timesheetData: any[],
    loading: boolean
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

export const useUserStore = create<userStore>()((set, get) => ({
    user: {
        id: localStorage.getItem('userId') || '',
        name: '',
        login: '',
        email: '',
        phone: '',
        position: '',
        'last_activity_time': '',
    },
    timesheetData: [],
    loading: false,
    getData: async () => {
        try {
            set({loading: true})
            const {data: {data}} = await instanceAxios('', {
                params: {
                    cat: 'employee',
                    action: 'get_data',
                    id: get().user.id
                }
            })

            set({user: data[get()?.user?.id]})
            set({loading: false})
        } catch (e) {
            set({loading: false})
            console.log(e)
        }
    },
    getUserName: async (userId: string | number) => {
        try {
            set({loading: true})
            const {data} = await instanceAxios('', {
                params: {
                    cat: 'employee',
                    action: 'get_data',
                    id: userId
                }
            })
            set({loading: false})
            return data.data[userId].name

        } catch (e) {
            set({loading: false})
            console.log(e)
        }
    },
    getDivision: async (divisionId: string | number) => {
        try {
            set({loading: true})
            const {data} = await instanceAxios('', {
                params: {
                    cat: 'employee',
                    action: 'get_division',
                    id: divisionId
                }
            })
            set({loading: false})
            return data.data[divisionId].name

        } catch (e) {
            set({loading: false})
            console.log(e)
        }
    },
    getTimesheetData: async () => {
        try {
            set({loading: true})
            const {data: {data}} = await instanceAxios('', {
                params: {
                    cat: 'employee',
                    action: 'get_timesheet_data',
                    date_from: moment().startOf('month').format('DD.MM.YYYY'),
                    date_to: moment().endOf('month').format('DD.MM.YYYY'),
                    employee_id: get()?.user?.id
                }
            })
            const dataArray = Object.keys(data).map((item) => ({
                date: item,
                data: [...Object.values(data[item][get()?.user?.id])]
            }))
            set({timesheetData: dataArray || []})
            set({loading: false})
        } catch (e) {
            set({loading: false})
            console.log(e)
        }
    }
}))
