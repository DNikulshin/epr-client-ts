import { IOptionsStateChangeItem } from '../claimsItem/types.ts';
export const customSelectStyles = (selectedOption :  IOptionsStateChangeItem[]) => {
  return {
    control: (provided: any, state: { isFocused: boolean, isDisabled: boolean }) => ({
      ...provided,
      borderColor: selectedOption[0].color,
      '&:hover': {
        borderColor: state.isFocused ? 'blue' : (state.isDisabled ? 'gray' : 'red')
      }
    }),
    singleValue: (defaultStyles: any) => ({ ...defaultStyles, color: selectedOption[0].color }),
    option: (provided: any, state: { data: { color: string }; isSelected: boolean }) => ({
      ...provided,
      color: state.data.color,
      borderColor: state.isSelected ? state.data.color : ''
    }),
  }
}