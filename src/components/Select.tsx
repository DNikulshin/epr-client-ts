import Select from 'react-select'

interface OptionsProps {
    value: string
    label?: string

}

export const CustomSelect = (options: OptionsProps[]) => {
    return (
        <div className="d-select">
            <Select options={options}/>
        </div>
    )
}

export default Select
