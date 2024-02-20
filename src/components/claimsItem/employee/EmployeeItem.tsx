import { useCallback, useState } from 'react'
import { useDataStore } from '../../../store/data-store/data-store.ts'
import { IEmployee } from '../../../store/user-store/user-store.ts'

export const EmployeeItem = ({id, itemId, itemName, isEdit}: IEmployee) => {
  const [isDeleteEmployee, setIsDeleteEmployee] = useState(false)
  const employeeDelete = useDataStore(state => state.employeeDelete)
  const deleteEmployee = useCallback(async (id: number | string, employeeIds: number | string | undefined) => {
    if (employeeIds) {
      const status = await employeeDelete(id, employeeIds)
      if (status === 'OK')
        setIsDeleteEmployee(true)
    } else {
      setIsDeleteEmployee(false)
    }
  }, [employeeDelete])
  return (
    <>
      <small className={`me-1 ${isDeleteEmployee ? 'text-decoration-line-through' : ''}`}
            >
        {!isDeleteEmployee && isEdit &&
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor"
               className="bi bi-x text-danger me-1 box-shadow mb-2 me-2 btn-target_remove box-shadow_svg"
               viewBox="0 0 16 16"
               onClick={() => id ? deleteEmployee(id, itemId) : false}
          >
            <path
              d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
          </svg>}
        <span className="user-select-none">{itemName}</span>
      </small>
    </>
  )
}

