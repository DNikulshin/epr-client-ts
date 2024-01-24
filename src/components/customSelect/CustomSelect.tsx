import Select, { GroupBase, Props } from 'react-select'

export const CustomSelect = <
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(props: Props<Option, IsMulti, Group>) => {
  return (
    <Select {...props} theme={(theme) => ({ ...theme})} />
  )
}