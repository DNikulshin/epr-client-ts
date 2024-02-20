import { useEffect, FC, useState } from 'react'
import { useUserStore } from '../store/user-store/user-store.ts'
import { IUser } from '../store/user-store/user-store.ts'
import { useDataStore } from '../store/data-store/data-store.ts'
import moment from 'moment'
import 'moment/locale/ru'
import { useAuthStore } from '../store/auth-store/auth-store.ts'
import { ErrorItem } from '../components/error/ErrorItem.tsx'

const currentDate = moment().format('YYYY-MM-DD')
export const UserPage: FC = () => {
  const id = useAuthStore(state => state.userId)
  const {
    name,
    login,
    last_activity_time,
    email,
    phone,
    position,
  } = useUserStore<IUser>((state) => state.user)
  const getData = useUserStore((state) => state.getData)
  const timesheetData = useUserStore((state) => state.timesheetData)
  const getTimesheetData = useUserStore((state) => state.getTimesheetData)
  const loading = useUserStore(state => state.loading)
  const error = useDataStore(state => state.error)
  const [openDetail, setOpenDetail] = useState(false)

  useEffect(() => {
    if (id) {
      getData(id)
      getTimesheetData(id)
    }

  }, [getData, getTimesheetData, id])

  if (error === 'ERR_NETWORK') return <ErrorItem text={'Неполадки в сети...!'} />

  if (loading) {
    return <div className="text-center mt-5 position-relative" style={{
      transform: 'translateX(40%)',
    }}>
      <span className="loader"></span>
    </div>
  }

  return (
    <>

      <div className="d-flex justify-content-center align-items-center flex-column w-100">
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

        <h3 className="mb-3">График в этом месяце</h3>
        <div className="d-flex flex-wrap w-100 justify-content-between align-items-center gap-2 mb-5 box-shadow p-3">

          {timesheetData && timesheetData
            .sort((a, b) => {
              if (a?.date && b?.date) {
                return a?.date > b?.date
                  ? 1 :
                  a?.date < b?.date
                    ? -1 : 0
              }
              return 0
            })
            .map(item => {
              return (
                <div
                  className="border bg-light d-flex"
                  key={item?.date}
                >
                  {
                    item?.data.join('').includes('994') ||  item?.data.join('').includes('8')
                      ? <span
                        className={currentDate === item?.date
                          ? 'text-bg-danger p-1'
                          : 'text-bg-primary p-1'}
                      >
                        {/*<small className=''>{getCurrentDay(item?.date)}</small>*/}
                        {item?.date}
                                    </span>
                      : <span
                        className={currentDate === item?.date
                          ? 'text-danger p-1'
                          : 'text-secondary p-1'}
                      >
                       {/*<small className=''>{getCurrentDay(item?.date)}</small>*/}
                        {item?.date}
                                        </span>
                  }
                </div>
              )
            })}
        </div>
      </div>
    </>
  )
}
