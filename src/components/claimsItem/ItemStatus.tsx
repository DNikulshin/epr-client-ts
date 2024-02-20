import { useCallback, useEffect, useState } from 'react'
import { OnChangeValue} from 'react-select'
import { useDataStore } from '../../store/data-store/data-store.ts'
import { IItem } from '../../store/data-store/types.ts'
import { CustomSelect } from '../customSelect/CustomSelect.tsx'
import { customSelectStyles } from '../customSelect/customSelectStyles.ts'
import { optionsChangeItem } from '../customSelect/optionsStateChangeItem.ts'
import { IOptionsStateChangeItem } from './types.ts'

const setColor = (id: number | undefined) => {
  switch (id) {
    case 1:
      return 'brown'
    case 2:
    case 3:
      return 'green'
    case 4:
      return 'blue'
    case 5:
      return 'gray'
  }
}

export const ItemStatus = (props: IItem) => {
  const { state, id } = props
  const [colorStateItem, setColorStateItem] = useState(setColor(state?.id))
  const [selectedOption, setSelectedOption] = useState<any[]>([{
    label: state?.name,
    value: state?.id,
    color: colorStateItem
  }])

  const changeStateItem = useDataStore(state => state.changeStateItem)
  const changeStateItemSelect = useCallback(async (id: number, current: OnChangeValue<IOptionsStateChangeItem, false>) => {
    await changeStateItem({ id, state_id: current?.value})
    setColorStateItem(current?.color)
    setSelectedOption([{ label: state?.name, value: current?.value, color:  current?.color}])
  }, [changeStateItem, state?.name])

  useEffect(() => {
    if(state?.id)
    setColorStateItem(setColor(state?.id))
  }, [state?.id])

  return (
    <div className="d-flex justify-content-center align-items-center mb-1 me-1"><strong className="me-1">Статус:</strong>
      <CustomSelect
        defaultValue={selectedOption}
        onChange={(newValue) => {
          if(id) changeStateItemSelect(id, newValue)
        }}
        options={optionsChangeItem()}
        autoFocus={false}
        isSearchable={false}
        classNamePrefix="custom-select"
        styles={customSelectStyles(selectedOption)}
      />

    </div>
  )
}
