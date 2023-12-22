import {create} from 'zustand'
import {instanceAxios} from '../../axios.ts'
import {Iitem} from './types.ts'
import {toast} from 'react-toastify'

interface useDataStoreProps {
    listItems: Iitem[]
    getItems: () => void
    userId: number,
    countItems: number
    listItemsId: string
    loading: boolean
    error: string | null
    getDataNode: (id: number) => Promise<any>
}

export const useDataStore = create<useDataStoreProps>((set, get) => ({
    listItems: [],
    userId: JSON.parse(localStorage.getItem('userId') || '{}'),
    countItems: 0,
    listItemsId: '',
    loading: false,
    error: null,
    getItems: async () => {
        try {
            toast(null)
            set({error: null})
            set({loading: true})
            const data = await instanceAxios('', {
                params: {
                    cat: 'task',
                    action: 'get_list',
                    'date_do_from': new Date().toLocaleDateString(),
                    'date_do_to': new Date().toLocaleDateString(),
                    //'employee_id': get().userId
                    'division_id': localStorage.getItem('divisionId'),
                }
            })
            set({countItems: data.data.count})
            set({listItemsId: data.data.list})
            set({})
            const showItems = await instanceAxios('', {
                params: {
                    cat: 'task',
                    action: 'show',
                    id: get().listItemsId
                }
            })
            console.log(showItems.data.data, 'showItems')
            set({listItems: Object.values(showItems.data.data)})

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

    getDataNode: async (id: number) => {
        try {
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
            }
        }
    },

}))