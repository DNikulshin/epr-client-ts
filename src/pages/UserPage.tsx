import {useEffect, FC} from 'react'
import {useUserStore} from '../store/user-store/user-store.ts'
import {Iuser} from '../store/user-store/user-store.ts'

export const UserPage: FC = () => {
    const {id, name, login, last_activity_time, email, phone, position} = useUserStore<Iuser>((state) => state.user)
    const getData = useUserStore((state) => state.getData)
    const timesheetData = useUserStore((state) => state.timesheetData)
    const getTimesheetData = useUserStore((state) => state.getTimesheetData)

    useEffect(() => {
        getData()
        getTimesheetData()
    }, [getData, getTimesheetData])

    return (
        <>
            <div className="d-flex justify-content-center align-items-center flex-column">
                <h3>
                    UserPage
                </h3>
                <ul className="list-group mb-3">
                    <li className="list-group-item">id: {id}</li>
                    <li className="list-group-item">ФИО: {name}</li>
                    <li className="list-group-item">логин: {login}</li>
                    <li className="list-group-item">email: {email}</li>
                    <li className="list-group-item">тел: {phone}</li>
                    <li className="list-group-item">{position}</li>
                    <li className="list-group-item">последняя активность: {last_activity_time}</li>
                </ul>

                <h3>Смены в этом месяце</h3>
                <p>B - выходной, D - деружство.</p>
                <div className='d-flex flex-wrap w-100 justify-content-around align-items-center'>

                    {timesheetData && timesheetData.sort((a, b) => a?.date.localeCompare(b?.date)).map(item => {
                        return (
                            <p className="border bg-light mx-2 p-1" key={item?.date}>
                                <span>{item?.data.join('') === '997' ?
                                    <span className="text-secondary">  {item?.date} (B)</span> :
                                    <span className="text-primary">  {item?.date} (D)</span>}
                                </span>
                            </p>
                        )
                    })}
                </div>


            </div>
        </>
    )
}
