import {create} from 'zustand'
import {instanceAxios} from '../../axios.ts'
import moment from 'moment'

interface userStore {
    user: Iuser
    getData: (id: number | string) => void
    getUserNames: (id: number | string) => Promise<IEmployee[] | undefined>
    getUserNameById: (id: number | string) => Promise<IEmployee | undefined>
    getDivision: (id: number | string) => Promise<IDivision[] | undefined>
    getTimesheetData: (id: number | string) => Promise<void>
    timesheetData: any[],
    loading: boolean
}

export interface Iuser {
    name: string
    login: string
    email: string
    phone: string
    position: string,
    'last_activity_time': string,

}

export interface IstaffEx {
    employee_id: number
    date_add?: number | string
    date_out?: number | string
    position?: string
    status?: number
}

export interface IStaffWork {
    employee_id: number
    date_add?: number | string
    position?: string
    status?: number
}

export interface IDivision {
    id: number | string
    comment?: string
    date_add?: string
    name?: string
    parent_id: number
    staff: {
        ex: IstaffEx[]
        work: IStaffWork[]
    }
}

export interface IEmployee {
    id?: number | string
    position?: string
    name?: string
    gps_imei?: string
    image_id?: number
    is_work?: number
    division?: any[]
    login?: string
    short_name?: string
    is_blocked?: number
    profile_id?: number
    last_activity_time?: string
    asterisk_phone?: string
    email?: string
    phone?: string
    messenger_chat_id?: string
    rights?: any
    access_address_id?: any
    task_allow_assign_address_id?: any
    additional_data?: any
}

    export const useUserStore = create<userStore>()((set) => ({
    user: {
        name: '',
        login: '',
        email: '',
        phone: '',
        position: '',
        'last_activity_time': '',
    },
    timesheetData: [],
    loading: false,
    getData: async (id: number | string) => {
        try {
            set({loading: true})
            const {data: {data}} = await instanceAxios('', {
                params: {
                    cat: 'employee',
                    action: 'get_data',
                    id
                }
            })
            set({user: data[id]})

            set({loading: false})
        } catch (e) {
            set({loading: false})
            console.log(e)
        }
    },
    getUserNames: async (userId: number | string) => {
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
            return Object.values(data?.data)

        } catch (e) {
            set({loading: false})
            console.log(e)
        }
    },
        getUserNameById: async (userId: number | string) => {
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
                console.log(data?.data[userId],'data getUserNameById')
                return data?.data[userId]?.name

            } catch (e) {
                set({loading: false})
                console.log(e)
            }
        },
    getDivision: async (divisionIds: string | number) => {
        try {
            set({loading: true})
            const {data} = await instanceAxios('', {
                params: {
                    cat: 'employee',
                    action: 'get_division',
                    id: divisionIds
                }
            })
            set({loading: false})
             return Object.values(data?.data)

        } catch (e) {
            set({loading: false})
            console.log(e)
        }
    },
    getTimesheetData: async (id: number | string) => {
        try {
            set({loading: true})
            const {data: {data}} = await instanceAxios('', {
                params: {
                    cat: 'employee',
                    action: 'get_timesheet_data',
                    date_from: moment().startOf('month').format('DD.MM.YYYY'),
                    date_to: moment().endOf('month').format('DD.MM.YYYY'),
                    employee_id: id
                }
            })
            const dataArray = Object.keys(data).map((item) => ({
                date: item,
                data: [...Object.values(data[item][id])]
            }))
            set({timesheetData: dataArray || []})

            set({loading: false})
        } catch (e) {
            set({loading: false})
            console.log(e)
        }
    }
}))
