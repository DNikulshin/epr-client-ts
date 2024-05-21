import {IEmployee } from '../user-store/user-store.ts';

export interface IItem {
    id: number
    parentTaskId?: number
    priority?: number
    type?: Type
    date?: any
    attach?: Attach
    state?: State
    customer?: Customer
    address?: Address
    node?: NodeItem[]
    description?: string
    description_short?: string
    author_employee_id?: number
    employee?: IEmployee[]
    priceCustom?: string
    volumeCustom?: string
    comments?: Comment[]
    additional_data?: additionalDate[]
    staff?: {
        division?: object | undefined
        employee?: object | undefined
    } | undefined
    history?: History[],
    setOpen?: (bool: boolean) => void,
    handleClickItem?: () => void,
    open?: boolean,
    isEdit?: boolean
    numberItem?: number
}

export interface Attach {
    id: number
    fileName: string
    dateAdd: string
}
export interface NodeItem {
    id?: number
    name?: string
    number?: string
}

export interface Type {
    id: number
    name: string | undefined
}

export interface Date {
    create?: string
    todo?: string
    update?: string
    complete?: string
    deadline_individual_hour?: string
    runtime_individual_hour?: number
}

export interface State {
    id: number
    name: string
    systemRole: number
}

export interface Customer {
    id: number
    fullName: string
    login: string
    dateActivity: string
}

export interface Address {
    text: string
    addressId: number
    apartament: string
}

export interface History {
    type: number
    date: string
    employee_id: number
    param1: number
    comment: string
}

export interface Comment {
    id?: number
    dateAdd?: string
    employee_id?: number | string
    comment?: string
    itemId?: number | undefined
    key?: number | undefined
}

export interface additionalDate {
    id: number
    caption: string,
    value: string
}
