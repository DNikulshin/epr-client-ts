import {useEffect, FC, useState} from 'react'
import {useUserStore} from '../store/user-store/user-store.ts'
import {Iuser} from '../store/user-store/user-store.ts'
import {useDataStore} from "../store/data-store/data-store.ts";
import moment from "moment"

const currentDate = moment().format('YYYY-MM-DD')

export const UserPage: FC = () => {
    const {
        id,
        name,
        login,
        last_activity_time,
        email,
        phone,
        position
    } = useUserStore<Iuser>((state) => state.user)
    const getData = useUserStore((state) => state.getData)
    const timesheetData = useUserStore((state) => state.timesheetData)
    const getTimesheetData = useUserStore((state) => state.getTimesheetData)
   // const getDevises = useDataStore((state) => state.getDevises)
  //  const devices = useDataStore((state) => state.devices)
    const loading = useUserStore(state => state.loading)
    const error = useDataStore(state => state.error)
    const [openDetail, setOpenDetail] = useState(false)

    useEffect(() => {
        getData()
        getTimesheetData()
       // getDevises()
    }, [getData, getTimesheetData])

    if (error === 'ERR_NETWORK') {
        return <>

            <h3 className="text-danger text-center mt-5">
                <br/>
                Неполадки в сети...!
            </h3>
        </>
    }

    if (loading) {
        return <div className='text-center mt-5 position-relative' style={{
            transform: 'translateX(40%)'
        }}>
            <span className="loader"></span>
        </div>
    }

    return (
        <>

            {id && <div className="d-flex justify-content-center align-items-center flex-column w-100">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <strong className="mx-2">ФИО: {name}</strong>
                    <button className="btn btn-outline-primary btn-sm"
                            onClick={() => setOpenDetail(prevState => !prevState)}>
                        {!openDetail ? 'Подробнее...' : 'Скрыть'}
                    </button>
                </div>

                {openDetail && <ul className="list-group mb-3 w-100">
                    <li className="list-group-item">id: {id}</li>
                    <li className="list-group-item">ФИО: {name}</li>
                    <li className="list-group-item">логин: {login}</li>
                    <li className="list-group-item">email: {email}</li>
                    <li className="list-group-item">тел: {phone}</li>
                    <li className="list-group-item">{position}</li>
                    <li className="list-group-item">последняя активность: {last_activity_time}</li>
                </ul>}

                <h3 className="mb-3">Смены в этом месяце</h3>
                <div className='d-flex flex-wrap w-100 justify-content-between align-items-center gap-2 mb-5'>

                    {timesheetData && timesheetData.sort((a, b) => a?.date.localeCompare(b?.date)).map(item => {
                        return (
                            <div className="border bg-light d-flex" key={item?.date}>
                                {
                                    item?.data.join('').includes('994')
                                        ? <span
                                            className={currentDate === item?.date ? 'text-bg-danger p-1' : 'text-bg-primary p-1'}>{item?.date}</span>
                                        : <span
                                            className={currentDate === item?.date ? 'text-danger p-1' : 'text-secondary p-1'}>{item?.date}</span>
                                }
                            </div>
                        )
                    })}
                </div>
                { /*<ul className="list-group mb-3 w-100 d-flex flex-column gap-1">
                    {devices && devices.map(item => {
                        return (<li className="list-group-item" key={item.code}>{item.LOCATION}</li>)
                    })}
                </ul> */}
            </div>
            }
        </>
    )
}
