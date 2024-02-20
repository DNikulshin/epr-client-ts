import { useCallback, useState } from 'react'
import { useDataStore } from '../../../store/data-store/data-store.ts'
import { IDivision } from '../../../store/user-store/user-store.ts'
export const DivisionItemStatus = ({id, itemId, itemName, isEdit}: IDivision) => {
  const [isDelete, setIsDelete] = useState(false)
  const divisionDelete = useDataStore(state => state.divisionDelete)

  const deleteDivision =
    useCallback(async (id: number | string | undefined, itemId: number | string | undefined) => {
      if (itemId) {
        const status = await divisionDelete(id, itemId)
        if (status === 'OK')
          setIsDelete(true)
      } else {
        setIsDelete(false)
      }
    }, [divisionDelete])

  return (
    <>
      <small className={`me-1 ${isDelete ? 'text-decoration-line-through' : ''}`}
      >
        {!isDelete && isEdit &&
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor"
               className="bi bi-x text-danger me-1 box-shadow mb-2 me-2 btn-target_remove box-shadow_svg"
               viewBox="0 0 16 16"
               onClick={() => deleteDivision(id, itemId)}
          >
            <path
              d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
          </svg>}
        <span className="user-select-none">{itemName}</span>
      </small>
    </>
  )
}
