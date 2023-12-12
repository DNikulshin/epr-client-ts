import { useEffect } from 'react'
import { useUserStore } from '../store/user-store'

export const UserPage = () => {
    const user = useUserStore((state) => state.user)
    const getData = useUserStore((state) => state.getData)

    useEffect(() => {
        getData()
    }, [getData])

    return (
        <>
            <div>UserPage</div>
            <div>{user.id}</div>
            <div>{user.name}</div>
            <div>{user.login}</div>
            <div>{user.short_name}</div>
            <div>{user.last_activity_time}</div>
            <div>{user.email}</div>
            <div>{user.phone}</div>
           {/* <div>{user.division.division_id}</div> */}
        </>
    )
}
