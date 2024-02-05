import { useEffect, useState } from 'react';
import { IEmployee, useUserStore } from '../../../store/user-store/user-store.ts'
import { EmployeeItem } from './EmployeeItem.tsx'

export const Employee = (props: IEmployee) => {
  const { staff, isEdit, id } = props
  const [employees, setEmployees] = useState<IEmployee[]>([])
  const employeeIds = Object.keys(staff?.employee ?? {}).join(',')
  const getEmployees = useUserStore(state => state.getEmployees)
 // const employeeStore = useUserStore(state => state.employeeStore)

  useEffect(() => {
    if(staff?.employee)
    getEmployees(employeeIds)
      .then((data) => {
        if (data) setEmployees(data)
      })
  }, [employeeIds, getEmployees, staff?.employee])

  return (
    <div className="d-flex flex-wrap mt-1">
      {employees &&
        employees
          .map(item =>
            <EmployeeItem
              id={id}
              key={item?.id}
              isEdit={isEdit}
              itemId={item?.id}
              itemName={item?.name}
              />
          )}
    </div>
  )
}