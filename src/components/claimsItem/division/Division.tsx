import { useEffect, useState } from 'react'
import { Iitem } from '../../../store/data-store/types.ts'
import { IDivision, useUserStore } from '../../../store/user-store/user-store.ts'

export const Division = (props: Iitem) => {
  const { staff } = props
  const [division, setDivision] = useState<IDivision[]>([])
  const divisionIds = Object.keys(staff?.division || {}).join(',')
  const getDivision = useUserStore(state => state.getDivision)

  // const divisionAdd = useDataStore(state => state.divisionAdd)
  // const divisionDelete = useDataStore(state => state.divisionDelete)
  // const addDivision = useCallback( async () => {
  //  await divisionAdd(id, 1)
  // }, [divisionAdd, id])
  // const deleteDivision = useCallback(async () => {
  //   await divisionDelete(id, 1)
  // }, [divisionDelete, id])


  useEffect(() => {
      if (staff?.division) {
        getDivision(divisionIds).then( data => {
          if(data) {
            setDivision(data)
          }
        })
      }
    }, [divisionIds, getDivision, staff?.division])

    return (
      <div className="d-flex flex-wrap">
        {division &&
          division.map( item => <small key={item.id}>{item?.name}</small>
      )}
      </div>

    )
  }