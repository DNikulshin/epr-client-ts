import { IDivision } from '../../../store/user-store/user-store.ts';
import { DivisionItemStatus } from './DivisionItemstatus.tsx'

export const DivisionItemIcon = ({ id, itemId, itemName, isEdit }: IDivision) =>
  <DivisionItemStatus
    id={id}
    itemId={itemId}
    itemName={itemName}
    isEdit={isEdit}
  />

