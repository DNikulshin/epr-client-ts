import moment from 'moment/moment'
import { ChangeEvent, useCallback, useState } from 'react'
import { useDataStore } from '../../store/data-store/data-store.ts'
import { IItem } from '../../store/data-store/types.ts'

export const DateTime = (props: IItem) => {
  const { id, date } = props
  const changeDateWork = useDataStore(state => state.changeDateWork)
  const [selectedDate, setSelectedDate] = useState(moment(date?.todo).format('YYYY-MM-DD'))
  const [selectedTime, setSelectedTime] = useState(date?.todo.split(' ')[1].slice(0, -3))
  //const [currentTime, setCurrentTime] = useState(moment().format("HH:mm"))
  //const [currentDate, setCurrentDate] = useState(moment().format('YYYY-MM-DD'))

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentTime(moment().format("HH:mm"))
  //     setCurrentDate(moment().format('YYYY-MM-DD'))
  //   }, 1000)
  //
  //   return () => {
  //     clearInterval(interval)
  //   };
  // }, [])

  // if(selectedDate === currentDate && selectedTime === currentTime) {
  //   new Notification(
  //     id.toString(), {
  //       body: `${address?.text} \n Назначено: ${moment(currentDate).format('DD.MM.YYYY')} ${currentTime}`,
  //       tag: 'notification'
  //     }
  //   )
  // }

  const handleDateChange = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target?.value) {
      setSelectedDate(moment(e.target?.value).format('YYYY-MM-DD'))
      if(id) await changeDateWork (id, `${moment(e.target?.value)
        .format('YYYY-MM-DD')} ${date?.todo.split(' ')[1].slice(0, -3)}`)
    }
  }, [changeDateWork, date?.todo, id])

  const handleTimeChange = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target?.value) {
      setSelectedTime(e.target?.value)
      if(id) await changeDateWork(id, `${moment(selectedDate)
        .format('YYYY-MM-DD')} ${e.target?.value}`)
    }

  }, [changeDateWork, id, selectedDate])

  return (
    <div className="my-2 box-shadow p-1 bg-light d-flex justify-content-center align-items-center me-1">
      <strong className="mx-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-alarm box-shadow_svg"
             viewBox="0 0 16 16">
          <path d="M8.5 5.5a.5.5 0 0 0-1 0v3.362l-1.429 2.38a.5.5 0 1 0 .858.515l1.5-2.5A.5.5 0 0 0 8.5 9z" />
          <path
            d="M6.5 0a.5.5 0 0 0 0 1H7v1.07a7.001 7.001 0 0 0-3.273 12.474l-.602.602a.5.5 0 0 0 .707.708l.746-.746A6.97 6.97 0 0 0 8 16a6.97 6.97 0 0 0 3.422-.892l.746.746a.5.5 0 0 0 .707-.708l-.601-.602A7.001 7.001 0 0 0 9 2.07V1h.5a.5.5 0 0 0 0-1zm1.038 3.018a6 6 0 0 1 .924 0 6 6 0 1 1-.924 0M0 3.5c0 .753.333 1.429.86 1.887A8.04 8.04 0 0 1 4.387 1.86 2.5 2.5 0 0 0 0 3.5M13.5 1c-.753 0-1.429.333-1.887.86a8.04 8.04 0 0 1 3.527 3.527A2.5 2.5 0 0 0 13.5 1" />
        </svg>
      </strong>
      <span
        className="text-primary fw-bold p-1">
                                      <input
                                        className="text-primary fw-bold p-1"
                                        type="date"
                                        value={selectedDate}
                                        onChange={data => handleDateChange(data)}
                                        style={{
                                          maxWidth: '135px',
                                        }}
                                      />
                            </span>
      <span
        className="text-danger fw-bold p-1">
                    <input
                      className="text-danger fw-bold p-1"
                      type="time"
                      value={selectedTime}
                      onChange={(data) => handleTimeChange(data)}
                      style={{
                        maxWidth: '85px',
                      }}

                    />
                </span>
    </div>
  )
}
