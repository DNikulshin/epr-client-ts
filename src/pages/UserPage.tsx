import {useEffect, FC} from 'react'
import {useUserStore} from '../store/user-store/user-store.ts'
import {Iuser} from '../store/user-store/user-store.ts'

export const UserPage: FC = () => {
    const {id, name, login, last_activity_time, email, phone, position} = useUserStore<Iuser>((state) => state.user)
    const getData = useUserStore((state) => state.getData)

    useEffect(() => {
        getData()
    }, [getData])

    return (
        <>
            <div className="d-flex justify-content-center align-items-center flex-column">
                <h3>
                    UserPage
                </h3>
                <ul className="list-group">
                    <li className="list-group-item">id: {id}</li>
                    <li className="list-group-item">name :{name}</li>
                    <li className="list-group-item">login: {login}</li>
                    <li className="list-group-item">email: {email}</li>
                    <li className="list-group-item">phone: {phone}</li>
                    <li className="list-group-item">{position}</li>
                    <li className="list-group-item">last activity: {last_activity_time}</li>
                </ul>
            </div>
        </>
    )
}
