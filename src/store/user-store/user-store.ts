import { create } from 'zustand';
import { instanceAxios } from '../../axios.ts';
import moment from 'moment';

interface TimeShiftData {
  date?: string | undefined;
  data: any;
}

interface userStore {
  user: IUser
  getData: (id: number | string) => void
  getEmployees: (id: string) => Promise<any>
  getEmployeeNameById: (id: number | string | undefined) => Promise<any>
  getDivisions: (id: number | string) => Promise<any>
  getTimesheetData: (id: number | string) => Promise<void>
  timesheetData: TimeShiftData[],
  loading: boolean
  divisionStore: IDivision[]
  employeeStore: IEmployee[]
}

export interface IUser {
  name: string
  login: string
  email: string
  phone: string
  position: string,
  'last_activity_time': string,

}

export interface IStaffWork {
  employee_id: number;
  date_add?: number | string;
  position?: string;
  status?: number;
}

export interface IDivision {
  id?: number | string;
  comment?: string;
  date_add?: string;
  name?: string;
  parent_id?: number;
  staff?: {
    employee?: object | undefined
    division?: object | undefined

  };
  isEdit?: boolean;
  itemName?: string;
  itemId?: number | string | undefined;
  divisionIds?: string;
  divisionItemId?: number | string | undefined;
  divisionName?: string;


}

export interface IEmployee {
  id?: number | string;
  position?: string;
  name?: string;
  gps_imei?: string;
  image_id?: number;
  is_work?: number;
  division?: IDivision;
  login?: string;
  short_name?: string;
  is_blocked?: number;
  profile_id?: number;
  last_activity_time?: string;
  asterisk_phone?: string;
  email?: string;
  phone?: string;
  messenger_chat_id?: string;
  rights?: unknown;
  access_address_id?: unknown;
  task_allow_assign_address_id?: unknown;
  additional_data?: unknown;
  isEdit?: boolean;
  itemName?: string;
  itemId?: number | string | undefined;
  staff?: {
    employee?: object | undefined
    division?: object | undefined

  };
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
  divisionStore: [],
  employeeStore: [],
  loading: false,
  getData: async (id: number | string) => {
    try {
      set({ loading: true });
      const { data: { data } } = await instanceAxios('/api', {
        params: {
          cat: 'employee',
          action: 'get_data',
          id,
        },
      });
      set({ user: data[id] });

      set({ loading: false });
    } catch (e) {
      set({ loading: false });
      console.log(e);
    }
  },
  getEmployees: async (userId: number | string) => {
    try {
      set({ loading: true });
      const { data } = await instanceAxios('/api', {
        params: {
          cat: 'employee',
          action: 'get_data',
          id: userId,
        },
      });
      set({ loading: false });
      set({employeeStore: Object.values(data?.data ?? {})})
      return Object.values(data?.data ?? {})

    } catch (e) {
      set({ loading: false });
      console.log(e);
    }
  },
  getEmployeeNameById: async (userId: number | string | undefined) => {
    try {
      set({ loading: true });
      const { data } = await instanceAxios('/api', {
        params: {
          cat: 'employee',
          action: 'get_data',
          id: userId,
        },
      });
      set({ loading: false });
      return userId ? data?.data[userId]?.name : null;
    } catch (e) {
      set({ loading: false });
      console.log(e);
    }
  },
  getDivisions: async (divisionIds: string | number) => {
    try {
      set({ loading: true });
      const { data } = await instanceAxios('/api', {
        params: {
          cat: 'employee',
          action: 'get_division',
          id: divisionIds,
        },
      });
      set({ loading: false });
      set({divisionStore: Object.values(data?.data ?? {})})
      return Object.values(data?.data ?? {});

    } catch (e) {
      set({ loading: false });
      console.log(e);
    }
  },
  getTimesheetData: async (id: number | string) => {
    try {
      set({ loading: true });
      const { data: { data } } = await instanceAxios('/api', {
        params: {
          cat: 'employee',
          action: 'get_timesheet_data',
          date_from: moment().startOf('month').format('DD.MM.YYYY'),
          date_to: moment().endOf('month').format('DD.MM.YYYY'),
          employee_id: id,
        },
      });
      const dataArray = Object.keys(data).map((item) => ({
        date: item,
        data: [...Object.values(data[item][id])],
      }));
      set({ timesheetData: dataArray ?? [] });

      set({ loading: false });
    } catch (e) {
      set({ loading: false });
      console.log(e);
    }
  },
}));
