import { create } from 'zustand'
import { instanceAxios } from '../../axios.ts'
import { getLocalStorage } from '../../hooks/interactionLocalStorage.ts'
import { Iitem } from './types.ts'
import { toast } from 'react-toastify'
import { AxiosError } from 'axios'

interface ChangeStateItemReturn {
  status: string
  color: string,
  id: number
}

interface useDataStoreProps {
  listItems: Iitem[]
  getItems: (d: dateDoProps) => void
  userId: number | string,
  countItems: number
  listItemsId: string
  loading: boolean
  error: string | null
  getCoordinates: (id: number) => Promise<Coordinates>
  getOwners: () => Promise<void>
  getDevises: () => Promise<void>
  getNotepadChapter: () => Promise<void>
  getNotepadByChapterId: (id: number) => Promise<void>
  getAllowStaff: (id: number) => Promise<any>
  changeStateItem: (params: {
    id: number;
    state_id: number | null | undefined;
    userId: number | string | null
  }) => Promise<ChangeStateItemReturn | undefined>
  changeDateWork: (id: number, value: string) => Promise<void>
  employeeAdd:  (id: number, division_id: number) => Promise<void>
  employeeDelete:  (id: number, division_id: number | string, employee_id: number | string | null) => Promise<string>
  divisionAdd: (id: number, division_id: number) => Promise<void>
  divisionDelete: (id: number, division_id: number | string, employee_id: number | string | null) => Promise<string>
  owners: Owner[]
  devices: Device[]
  notepad: any[]
  chapter: any[],
  currentStatusStateItem: ChangeStateItemReturn
}


interface Coordinates {
  lat: number
  lon: number
}

interface dateDoProps {
  dateDoFrom: number | string | undefined
  dateDoTo: number | string | undefined,
  typeRequest?: string
}

interface Owner {
  address?: string
  name?: string
  phone?: string
}

interface Device {
  code: number
  LOCATION?: string
}


export const useDataStore = create<useDataStoreProps>()((set, get) => ({
  listItems: [],
  userId: getLocalStorage('userId'),
  countItems: 0,
  listItemsId: '',
  loading: false,
  error: null,
  owners: [],
  devices: [],
  notepad: [],
  chapter: [],
  currentStatusStateItem: getLocalStorage('statusChangeItem'),
  // #132402 - Спецзадание РЕМ - ТЕСТОВАЯ заявка
  getItems: async (dateDo: dateDoProps) => {
    try {
      toast(null)
      set({ error: null })
      set({ loading: true })

      const paramsRequestEmployee = {
        cat: 'task',
        action: 'get_list',
        // 'date_do_from': '01.01.2024',
        // 'date_do_to': '25.01.2024',
        'date_do_from': dateDo?.dateDoFrom,
        'date_do_to': dateDo?.dateDoTo,
        'employee_id': localStorage.getItem('userId'),
        // 'division_id': localStorage.getItem('divisionId'),
        'state_id ': '1,3,4,5',
      }

      const paramsRequestDivision = {
        cat: 'task',
        action: 'get_list',
        'date_do_from': dateDo?.dateDoFrom,
        'date_do_to': dateDo?.dateDoTo,
        'division_id_with_staff': localStorage.getItem('divisionId'),
        'state_id ': '1,3,4,5',
      }
      const data = await instanceAxios('', {
        params: dateDo?.typeRequest === 'division'
          ? paramsRequestDivision
          : paramsRequestEmployee,
      })
      set({ countItems: data.data.count })
      set({ listItemsId: data.data.list })

      const showItems = await instanceAxios('', {
        params: {
          cat: 'task',
          action: 'show',
          id: get().listItemsId,
        },
      })

      if (get().countItems > 1) {
        set({ listItems: Object.values(showItems.data.data) })
      } else {
        set({ listItems: [showItems.data.data] })
      }
      set({ loading: false })

    } catch (e) {
      if (e instanceof AxiosError) {
        set({ error: e.code })
        toast(e.code)
        set({ loading: false })
      } else {
        throw e
      }
    }

  },
  changeStateItem: async ({ id, state_id, userId }) => {
    console.log(state_id)
    try {
      console.log(id, state_id)
      const { data } = await instanceAxios('', {
        params: {
          cat: 'task',
          action: 'change_state',
          id,
          state_id,
          'employee_id': userId,
        },
        transformResponse: [(data) => Object.assign(data, { state_id })],
      })
      // console.log(data)
      return data

    } catch (e) {
      if (e instanceof AxiosError) {
        set({ error: e.code })
        toast(e.code)
        set({ loading: false })
      } else {
        set({ loading: false })
        throw e
      }
    }
  },
  changeDateWork: async (id, value) => {
    console.log(id, value)
    try {
      await instanceAxios('', {
        params: {
          cat: 'task',
          action: 'change_date_work',
          id,
          value,
        },
      })

    } catch (e) {
      if (e instanceof AxiosError) {
        set({ error: e.code })
        toast(e.code)
        set({ loading: false })
      } else {
        set({ loading: false })
        throw e
      }
    }
  },
  employeeAdd: async ({ id, employee_id, userId }: any) => {
    console.log(id, employee_id, userId)
    try {
      await instanceAxios('', {
        params: {
          cat: 'task',
          action: 'employee_add',
          id,
          employee_id,
        },
      })

    } catch (e) {
      if (e instanceof AxiosError) {
        set({ error: e.code })
        toast(e.code)
        set({ loading: false })
      } else {
        set({ loading: false })
        throw e
      }
    }
  },
  employeeDelete: async (id,employee_id, userId) => {
    console.log(id, employee_id, userId)
    try {
      const { data } = await instanceAxios('', {
        params: {
          cat: 'task',
          action: 'employee_delete',
          id,
          employee_id,
          author_employee_id: userId,
        },
      })
      return data?.Result
    } catch (e) {
      if (e instanceof AxiosError) {
        set({ error: e.code })
        toast(e.code)
        set({ loading: false })
      } else {
        set({ loading: false })
        throw e
      }
    }
  },
  divisionAdd: async ({ id, division_id, userId }: any) => {
    console.log(id, division_id, userId)
    try {
      await instanceAxios('', {
        params: {
          cat: 'task',
          action: 'division_add',
          id,
          division_id,
        },
      })

    } catch (e) {
      if (e instanceof AxiosError) {
        set({ error: e.code })
        toast(e.code)
        set({ loading: false })
      } else {
        set({ loading: false })
        throw e
      }
    }
  },
  divisionDelete: async (id, division_id, userId) => {
    console.log(id, division_id, userId)
    try {
      const { data } = await instanceAxios('', {
        params: {
          cat: 'task',
          action: 'division_delete',
          id,
          division_id,
          employee_id: userId,
        },
      })
      return data?.Result
    } catch (e) {
      if (e instanceof AxiosError) {
        set({ error: e.code })
        toast(e.code)
        set({ loading: false })
      } else {
        set({ loading: false })
        throw e
      }
    }
  },
  getAllowStaff: async (id) => {
    console.log(id)
    try {
      const { data } = await instanceAxios('', {
        params: {
          cat: 'task',
          action: 'get_allow_staff',
          id,
        },
      })
      return data?.Data

    } catch (e) {
      if (e instanceof AxiosError) {
        set({ error: e.code })
        toast(e.code)
        set({ loading: false })
      } else {
        set({ loading: false })
        throw e
      }
    }
  },
  getCoordinates: async (id: number) => {
    try {
      const { data } = await instanceAxios('', {
        params: {
          cat: 'node',
          action: 'get',
          'address_id': id,
        },
      })

      return data.data[Object.keys(data.data)[0]]['coordinates']

    } catch (e) {
      if (e instanceof AxiosError) {
        set({ error: e.code })
        toast(e.code)
        set({ loading: false })
      } else {
        set({ loading: false })
        throw e
      }
    }
  },
  getOwners: async () => {
    try {
      const { data: { data } } = await instanceAxios('', {
        params: {
          cat: 'owner',
          action: 'get',
        },
      })
      set({ owners: Object.values(data) })

    } catch (e) {
      if (e instanceof AxiosError) {
        set({ error: e.code })
        toast(e.code)
        set({ loading: false })
      } else {
        set({ loading: false })
        throw e
      }
    }
  },
  getDevises: async () => {
    try {
      const { data: { data } } = await instanceAxios('', {
        params: {
          cat: 'device',
          action: 'get_data',
          'object_type': 'all',
          'is_online': '-1',
        },
      })
      set({ devices: Object.values(data) })

    } catch (e) {
      if (e instanceof AxiosError) {
        set({ error: e.code })
        toast(e.code)
        set({ loading: false })
      } else {
        set({ loading: false })
        throw e
      }
    }
  },
  getNotepadChapter: async () => {
    try {
      const { data: { data } } = await instanceAxios('', {
        params: {
          cat: 'notepad',
          action: 'get_chapter',
        },
      })
      console.log(Object.values(data))
      set({ chapter: Object.values(data) })

    } catch (e) {
      if (e instanceof AxiosError) {
        set({ error: e.code })
        toast(e.code)
        set({ loading: false })
      } else {
        set({ loading: false })
        throw e
      }
    }
  },
  getNotepadByChapterId: async (id: number) => {
    try {
      const { data: { data } } = await instanceAxios('', {
        params: {
          cat: 'notepad',
          action: 'get_note',
          'chapter_id': id,
        },
      })
      console.log('data', Object.values(data))
      set({ notepad: Object.values(data) })

    } catch (e) {
      if (e instanceof AxiosError) {
        set({ error: e.code })
        toast(e.code)
        set({ loading: false })
      } else {
        set({ loading: false })
        throw e
      }
    }
  },
}))
