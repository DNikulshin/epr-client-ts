import moment from 'moment'
import { create } from 'zustand'
import { instanceAxios } from '../../axios.ts'
import { getLocalStorage } from '../../hooks/interactionLocalStorage.ts'
import { IDivision, IEmployee } from '../user-store/user-store.ts'
import { IItem } from './types.ts'
import { toast } from 'react-toastify'
import { AxiosError } from 'axios'

interface ChangeStateItemReturn {
  status: string
  color: string,
  id: number
}

interface useDataStoreProps {
  listItems: IItem[]
  getItems: (d: dateDoProps) => void
  userId: number | null,
  countItems: number
  listItemsId: string
  loading: boolean
  error: string | null
  getCoordinates: (id: number) => Promise<Coordinates>
  getOwners: () => Promise<void>
  getDevises: () => Promise<void>
  getNotepadChapter: () => Promise<void>
  getNotepadByChapterId: (id: number) => Promise<void>
  getAllowStaff: (id: number) => Promise<{division: number[], staff: number[]}>
  changeStateItem: (params: {
    id: number;
    state_id: number | null | undefined
  }) => Promise<ChangeStateItemReturn | undefined>
  changeDateWork: (id: number, value: string) => Promise<void>
  employeeAdd: (id: number, division_id: number | string | undefined) => Promise<string>
  employeeDelete: (id: number | string, division_id: number | string | undefined) => Promise<string>
  divisionAdd: (id: number | string | undefined, division_id: number | string) => Promise<string>
  divisionDelete: (id: number | string | undefined, division_id: number | string) => Promise<string>
  owners: Owner[]
  devices: Device[]
  notepad: never[]
  chapter: number[],
  currentStatusStateItem: ChangeStateItemReturn
  isDeleteDivision: boolean
  setIsDeleteDivision: (bool: boolean) =>  void
  divisions: IDivision[]
  employees: IEmployee[]
  setDivisions: (data: any) => any
  setEmployees: (data: any) => any
  commentAdd: ({itemId, commentText}: commentAddProps) => Promise<string>
  commentEdit:({id, itemId, commentText}: commentEditProps) => Promise<string>
}

interface commentEditProps {
  id?: number
  itemId?: number
  commentText?: string
}


interface commentAddProps {
  itemId?: number
  commentText?: string
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

const userId = localStorage.getItem('userId')
const divisionId = localStorage.getItem('divisionId')

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
  divisions: [],
  employees: [],
  isDeleteDivision: false,
  currentStatusStateItem: getLocalStorage('statusChangeItem'),
  // #132402 - Спецзадание РЕМ - ТЕСТОВАЯ заявка
  setDivisions: (data) => {
    set({divisions: data})
    console.log(data, 'setDivision data-store')
  },
  setEmployees: (data) => {
    set({employees: data})
    console.log(data, 'setDivision data-store')
  },
  setIsDeleteDivision:  (status: boolean) => {
    set({isDeleteDivision: status})
},
  getItems: async (dateDo: dateDoProps) => {
    try {
      toast(null)
      set({ error: null })
      set({ loading: true })

      const paramsRequestEmployee = {
        cat: 'task',
        action: 'get_list',
        'date_do_from': '01.01.2024',
        'date_do_to': '31.01.2024',
        // 'date_do_from': dateDo?.dateDoFrom,
        // 'date_do_to': dateDo?.dateDoTo,
       'employee_id': userId,
       // 'division_id_with_staff': localStorage.getItem('divisionId'),
        'state_id ': '1,3,4,5',
        // 'state_id ': '1,2,3,4,5'
      }

      const paramsRequestDivision = {
        cat: 'task',
        action: 'get_list',
        'date_do_from': dateDo?.dateDoFrom,
        'date_do_to': dateDo?.dateDoTo,
        'division_id_with_staff': divisionId,
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
  changeStateItem: async ({ id, state_id }) => {
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
    try {
      await instanceAxios('', {
        params: {
          cat: 'task',
          action: 'change_date_work',
          id,
          value,
          employee_id: userId
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
  employeeAdd: async ( id, employee_id ) => {
    try {
    const { data } =  await instanceAxios('', {
        params: {
          cat: 'task',
          action: 'employee_add',
          id,
          employee_id,
          author_employee_id: userId
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
  employeeDelete: async (id,employee_id) => {
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
  divisionAdd: async (id, division_id ) => {
    try {
      const {data} = await instanceAxios('', {
        params: {
          cat: 'task',
          action: 'division_add',
          id,
          division_id,
          employee_id: userId
        }
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
  divisionDelete: async (id, division_id) => {
    try {
      const { data } = await instanceAxios('', {
        params: {
          cat: 'task',
          action: 'division_delete',
          id,
          division_id,
          employee_id: userId
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
  commentAdd: async ({itemId, commentText}) => {
    try {
      const { data } = await instanceAxios('', {
        params: {
          cat: 'task',
          action: 'comment_add',
          id: itemId,
          dateadd:  moment().format('DD.MM.YYYY'),
          comment: commentText,
          employee_id: userId
        },
      })
      console.log('commentAdd', data)
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
  commentEdit: async ({id, itemId, commentText}) => {
    try {
      const { data } = await instanceAxios('', {
        params: {
          cat: 'task',
          action: 'comment_edit',
          id,
          task_id: itemId,
          body: commentText
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
  }
}))
