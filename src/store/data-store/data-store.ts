import {create} from 'zustand'
import {instanceAxios} from '../../axios.ts'

interface useDataStoreProps {
    listItems: never[]
    setListItems: (data: any) => void,
    getItems: () => void
    userId: number,
    countItems: number
    listItemsId: string
}

export const useDataStore = create<useDataStoreProps>((set, get) => ({
    listItems: [],
    userId: JSON.parse(localStorage.getItem('userId') || '{}'),
    setListItems: (data) => {
        set({listItems: data})
    },
    countItems: 0,
    listItemsId: '',
    getItems: async () => {
        const data = await instanceAxios('', {
            params: {
                cat: 'task',
                action: 'get_list',
                'date_do_from': new Date().toLocaleDateString(),
                'date_do_to': new Date().toLocaleDateString(),
                //'employee_id': get().userId
                'division_id': localStorage.getItem('divisionId'),
                'order_by': 'date_do',
                'state_id': 3
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

        set({listItems: Object.values(showItems.data.data)})
        console.log(Object.values(showItems.data.data), 'showItems')
    }
}))