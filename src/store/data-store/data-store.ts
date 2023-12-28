import {create} from 'zustand'
import {instanceAxios} from '../../axios.ts'
import {Iitem} from './types.ts'
import {toast} from 'react-toastify'

interface useDataStoreProps {
    listItems: Iitem[]
    getItems: (d: dateDoProps) => void
    userId: number | string,
    countItems: number
    listItemsId: string
    loading: boolean
    error: string | null
    getCoordinates: (id: number) => Promise<Coordinates>
}


interface Coordinates {
    lat: number
    lon: number
}

interface dateDoProps {
    dateDoFrom: number | string | undefined
    dateDoTo: number | string | undefined
}


export const useDataStore = create<useDataStoreProps>()((set, get) => ({
    listItems: [],
    userId: localStorage.getItem('userId') || '',
    countItems: 0,
    listItemsId: '',
    loading: false,
    error: null,
    getItems: async (dateDo: dateDoProps) => {
        try {
            toast(null)
            set({error: null})
            set({loading: true})
            const data = await instanceAxios('', {
                params: {
                    cat: 'task',
                    action: 'get_list',
                    'date_do_from': dateDo?.dateDoFrom,
                    'date_do_to': dateDo?.dateDoTo,
                    //'employee_id': get().userId
                    'division_id': localStorage.getItem('divisionId'),
                    'order_by ': 'date_change'
                }
            })
            set({countItems: data.data.count})
            set({listItemsId: data.data.list})

            const showItems = await instanceAxios('', {
                params: {
                    cat: 'task',
                    action: 'show',
                    id: get().listItemsId
                }
            })

            if (get().countItems > 1) {
                set({listItems: Object.values(showItems.data.data)})
            } else {
                set({listItems: [showItems.data.data]})
            }
            set({loading: false})

        } catch (e) {
            if (e instanceof Error) {
                console.log(e)
                set({error: e.message})
                toast(e.message)
                set({loading: false})
            }

        }

    },

    getCoordinates: async (id: number) => {
        try {

           // const getBuildingId = await instanceAxios('', {
               // params: {
               //     cat: 'address',
                   // action: 'get',
              //      id
             //   }
           // })
           // console.log(Object.keys(getBuildingId.data?.Data)[0], 'getBuildingId')
           // const  billingId = Object.keys(data.data)[0]

            const {data} = await instanceAxios('', {
                params: {
                    cat: 'node',
                    action: 'get',
                    'address_id': id
                }
            })

          return data.data[Object.keys(data.data)[0]]['coordinates']

        } catch (e) {
            if (e instanceof Error) {
                console.log(e)
                toast(e.message)
                set({loading: false})
            }
        }
    },

}))