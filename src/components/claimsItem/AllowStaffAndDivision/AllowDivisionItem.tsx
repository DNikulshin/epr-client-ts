import { IDivision } from '../../../store/user-store/user-store.ts';
import { AllowDivision } from './AllowDivision.tsx'

export const AllowDivisionItem = ({id, divisionItemId, divisionName }: IDivision) => {
  return (
    <>
      <AllowDivision
        id={id}
        divisionItemId={divisionItemId}
        divisionName={divisionName}
      />
    </>
  )
}