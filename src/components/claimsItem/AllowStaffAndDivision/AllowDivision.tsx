import { useCallback, useState } from 'react'
import { useDataStore } from '../../../store/data-store/data-store.ts'
import { IDivision } from '../../../store/user-store/user-store.ts'

export const AllowDivision = ({ id, divisionItemId, divisionName }: IDivision) => {
  const [isAdd, setIsAdd] = useState(false)
  const divisionAdd = useDataStore(state => state.divisionAdd)
  const divisionDelete = useDataStore(state => state.divisionDelete)

  const addDivisionHandler = useCallback(async (id: number | string | undefined, divisionItemId: number | string | undefined) => {
    if (divisionItemId) {
      const status = await divisionAdd(id, divisionItemId)
      if (status === 'OK') {
        setIsAdd(true)
      }
    }
  }, [divisionAdd])

  const deleteDivisionHandler = useCallback(async (id: number | string | undefined, divisionItemId: number | string | undefined) => {
    if (divisionItemId) {
      const status = await divisionDelete(id, divisionItemId)
      if (status === 'OK') {
        setIsAdd(false)
      }
    }
  }, [divisionDelete])
  return (
    <div className="d-flex justify-conten-around align-items-center mb-2">
      {!isAdd
        ? <svg xmlns="http://www.w3.org/2000/svg"
               width="28"
               height="28"
               fill="currentColor"
               className="bi bi-plus-square box-shadowp me-2 text-success box-shadow_svg"
               viewBox="0 0 16 16"
               onClick={() => addDivisionHandler(id, divisionItemId)}
        >
          <path
            d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
          <path
            d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
        </svg>
        :
        <svg xmlns="http://www.w3.org/2000/svg"
             width="28"
             height="28"
             fill="currentColor"
             className="bi bi-dash-square  box-shadow btn-target me-2 text-danger box-shadow_svg"
             viewBox="0 0 16 16"
             onClick={() => deleteDivisionHandler(id, divisionItemId)}
        >
          <path
            d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
          <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
        </svg>
      }

      <div
        className="list-group-item justify-content-center align-items-center align-self-end"
        key={divisionItemId}
      >
        <small>{divisionName}</small>
      </div>
    </div>
  )
}