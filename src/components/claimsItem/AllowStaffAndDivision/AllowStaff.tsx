import { IEmployee } from '../../../store/user-store/user-store.ts';
import { AllowStaffIcon } from './AllowStaffIcon.tsx'
interface AllowStaffProps {
  staffNames: IEmployee[]
  id: number
}
export const AllowStaff = ({ staffNames, id }: AllowStaffProps) => {

  return (
    <>
      {<div
        className="d-flex flex-wrap gap-2" tabIndex={0}>
        {staffNames && staffNames.map(item =>
          <div key={item.id}
               className="d-flex justify-content-between align-items-center"
          >
            <AllowStaffIcon id={id} itemId={item.id}/>
            <small
            >
              {item.name}
            </small>
          </div>
        )
        }
      </div>
      }
    </>
  )
}
