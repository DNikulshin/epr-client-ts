import { useEffect, useState } from 'react'
import { Iitem } from '../../../store/data-store/types.ts';
import { IEmployee, useUserStore } from '../../../store/user-store/user-store.ts'

export const Employee = ( props: Iitem) => {
  const { staff, isEdit } = props
  const employeeId = Object.keys(staff?.employee || {}).join(',')
  const [employee, setEmployee] = useState<IEmployee[]>([])
  const getUserName = useUserStore(state => state.getUserNames)

  useEffect(() => {
    if (staff?.employee) {
        getUserName(employeeId)
          .then((data) => {
            if(data) setEmployee(data)
          })
      }

  }, [employeeId, getUserName, staff?.employee])
  return (
    <div className="d-flex flex-wrap w-100">
      {employee &&
        employee.map(item => <small className="me-1" key={item?.id}>
            {isEdit && <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-x text-danger me-1 box-shadow mb-2 m-2"
                            viewBox="0 0 16 16">
              <path
                d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
            </svg>}
          {item?.name}
        </small>
        )}
    </div>
  )
}