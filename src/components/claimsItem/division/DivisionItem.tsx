import { IDivision } from '../../../store/user-store/user-store.ts';
import { DivisionItemIcon } from './DivisionItemIcon.tsx'
// interface DivisionItemProps {
//   itemId: number
//   id: number
//   itemName: string
//   isEdit: boolean
// }
export const DivisionItem = ({id, itemId, itemName, isEdit}: IDivision) => {
  return <DivisionItemIcon  id={id} itemId={itemId} itemName={itemName} isEdit={isEdit}/>
}