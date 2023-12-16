import { create } from 'zustand'

interface useDataStoreProps {
    listItems: never[]
    setListItems: (data: any) => void
}

export const useDataStore = create<useDataStoreProps>((set) => ({
    listItems: [],
    setListItems: (data) => {
        set({listItems: data})
    }
}))