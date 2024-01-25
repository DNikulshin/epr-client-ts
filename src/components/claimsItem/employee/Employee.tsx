import { useCallback, useEffect, useState } from 'react'
import { useAuthStore } from '../../../store/auth-store/auth-store.ts'
import { useDataStore } from '../../../store/data-store/data-store.ts'
import { Iitem } from '../../../store/data-store/types.ts';
import { IEmployee, useUserStore } from '../../../store/user-store/user-store.ts'

export const Employee = (props: Iitem) => {
  const { staff, isEdit, id } = props
  const userId = useAuthStore(state => state.userId)
  const employeeDelete = useDataStore(state => state.employeeDelete)
  const employeeIds = Object.keys(staff?.employee || {}).join(',')
  const [employee, setEmployee] = useState<IEmployee[]>([])
  const getUserName = useUserStore(state => state.getUserNames)
  const [isDeleteEmployee, setIsDeleteEmployee] = useState(false)

  const deleteEmployee = useCallback(async (id: number, employeeIds: number | string | undefined, userId: number | string | null) => {
    if (employeeIds) {
      const status = await employeeDelete(id, employeeIds, userId)
      if (status === 'OK')
        setIsDeleteEmployee(true)
    } else {
      setIsDeleteEmployee(false)
    }
  }, [employeeDelete])

  console.log(id)
  useEffect(() => {
    if (staff?.employee) {
      getUserName(employeeIds)
        .then((data) => {
          if (data) setEmployee(data)
        })
    }
  }, [employeeIds, getUserName, staff?.employee])
  return (
    <div className="d-flex flex-wrap w-100 mt-1">
      {employee &&
        employee.map(item => <small className={`me-1 ${isDeleteEmployee ? 'text-decoration-line-through' : ''}`}
                                    key={item?.id}>
            {isEdit && <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor"
                            className="bi bi-x text-danger me-1 box-shadow mb-2 me-2"
                            viewBox="0 0 16 16"
                            onClick={() => id ? deleteEmployee(id, item?.id, userId) : false}
            >
              <path
                d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
            </svg>}
            {item?.name}
          </small>,
        )}
    </div>
  )
}