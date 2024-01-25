import { useCallback, useEffect, useState } from 'react'
import { useAuthStore } from '../../../store/auth-store/auth-store.ts'
import { useDataStore } from '../../../store/data-store/data-store.ts'
import { IDivision, useUserStore } from '../../../store/user-store/user-store.ts'
import { Iitem } from '../../../store/data-store/types.ts'

export const Division = (props: Iitem) => {
  const { staff, isEdit, id } = props
  const userId = useAuthStore(state => state.userId)
  const divisionDelete = useDataStore(state => state.divisionDelete)
  const [division, setDivision] = useState<IDivision[]>([])
  const divisionIds = Object.keys(staff?.division || {}).join(',')
  const getDivision = useUserStore(state => state.getDivision)
  const [isDeleteDivision, setIsDeleteDivision] = useState(false)

  const deleteDivision = useCallback(async (id: number, divisionId: number | string | undefined, userId: number | string | null) => {
    if (divisionId) {
      const status = await divisionDelete(id, divisionId, userId)
      if (status === 'OK')
        setIsDeleteDivision(true)
    } else {
      setIsDeleteDivision(false)
    }
  }, [divisionDelete])

  useEffect(() => {
    if (staff?.division) {
      getDivision(divisionIds).then(data => {
        if (data) {
          setDivision(data)
        }
      })
    }
  }, [divisionIds, getDivision, staff?.division])

  return (
    <div className="d-flex flex-wrap w-100 mt-1">
      {division &&
        division.map(item => <small className={`me-1 ${isDeleteDivision ? 'text-decoration-line-through' : ''}`} key={item?.id}>
            {isEdit && <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor"
                            className="bi bi-x text-danger me-1 box-shadow m-2"
                            viewBox="0 0 16 16"
                            onClick={() => id ? deleteDivision(id, item?.id, userId) : false}
            >
              <path
                d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"
              />
            </svg>}
            {item?.name}
          </small>,
        )}
    </div>

  )
}