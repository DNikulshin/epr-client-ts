import { IDivision, IEmployee } from '../../../store/user-store/user-store.ts';
import { AllowStaff } from './AllowStaff.tsx';
import { AllowDivisionItem } from './AllowDivisionItem.tsx'

interface AllowStaffAndDivisionListProps {
  staffNames: IEmployee[]
  divisionsNames: IDivision[]
  id: number
}

export const AllowStaffAndDivisionList = ({ id, staffNames, divisionsNames }: AllowStaffAndDivisionListProps)  => {

  return (
    <>
      {<div className="flex flex-column mt-2 justify-content-between">
        <div className="list-group"
        >
          {divisionsNames
            && divisionsNames
              .map((divisionItem: IDivision) =>
                <AllowDivisionItem
                  id={id}
                  key={divisionItem?.id}
                  divisionItemId={divisionItem?.id}
                  divisionName={divisionItem?.name}
                />
              )
          }
        </div>
        <AllowStaff staffNames={staffNames} id={id} />
      </div>}
    </>
  )
}