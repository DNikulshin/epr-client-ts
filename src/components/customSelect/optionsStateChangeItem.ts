export const optionsChangeItem = () =>  {
  return  [
    {
      label: 'Не выполнено',
      value: 1,
      color: 'brown'
    },
    {
      label: 'Выполнено',
      value: 2,
      color: 'green'
    },
    {
      label: 'Выполняется',
      color: 'green',
      value: 3
    },
    {
      label: 'Отложено',
      value: 4,
      color: 'blue'
    },
    {
      label: 'Архив',
      value: 5,
      color: 'gray'
    },
  ]
}