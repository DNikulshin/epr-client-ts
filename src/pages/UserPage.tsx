import { useEffect, FC } from 'react'
import { useUserStore } from '../store/user-store/user-store.ts'
import { Iuser } from '../store/user-store/user-store.ts'

export const UserPage: FC = () => {
    const {id, name, login, last_activity_time, email, phone, position} = useUserStore<Iuser>((state) => state.user)
    const getData = useUserStore((state) => state.getData)

    useEffect(() => {
        getData()
    }, [getData])

    return (
        <>
            <div>UserPage</div>
            <div>{id}</div>
            <div>{name}</div>
            <div>{login}</div>
            <div>{last_activity_time}</div>
            <div>{email}</div>
            <div>{phone}</div>
           <div>{position}</div>
        </>
    )
}
