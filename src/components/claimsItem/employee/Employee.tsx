import { useEffect, useState } from 'react'
import { Iitem } from '../../../store/data-store/types.ts';
import { IEmployee, useUserStore } from '../../../store/user-store/user-store.ts'

export const Employee = (props: Iitem) => {
  const {staff} = props
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

  console.log(employee)
  console.log(employeeId, 'employeeIdS')

  return (
    <div className="d-flex flex-wrap">
      {employee &&
        employee.map(item => <small key={item.id}>{item?.name}</small>
        )}
    </div>
  )
}