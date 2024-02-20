import { useEffect, useState } from 'react';
// import { useDataStore } from '../../../store/data-store/data-store.ts';
import { IDivision, useUserStore } from '../../../store/user-store/user-store.ts'
import { DivisionItem } from './DivisionItem.tsx'

export const Division = (props: IDivision) => {
  const { staff, isEdit, id } = props
 const [divisions, setDivisions] = useState<IDivision[]>([])
  const divisionIds = Object.keys(staff?.division || {}).join(',')
  const getDivision = useUserStore(state => state.getDivisions)
 // const divisionsStore = useUserStore(state => state.divisionStore)


  useEffect(() => {
    if(staff?.division)
      getDivision(divisionIds)
        .then(data => {
          if (data) setDivisions(data)
        })


  }, [divisionIds, getDivision, staff?.division])
 // console.log(divisionsStore, 'divisionsStore');
  return (
    <div className="d-flex flex-wrap mt-1">
      {divisions &&
        divisions
          .map(item =>
            <DivisionItem
              id={id}
              key={item?.id}
              itemId={item?.id}
              divisionIds={divisionIds}
              itemName={item?.name}
              isEdit={isEdit}
            />
          )}
    </div>
  )
}