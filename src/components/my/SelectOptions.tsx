import { FC } from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'

interface Options<T> {
  placeholder: string
  items: Item[]
  onChange: (selectedOption: T) => void
}

export interface Item {
  propValue: string
  value: string
}

const SelectOptions: FC<Options<string>> = ({ placeholder, items, onChange }) => {
  const handleOptionChange = (selectedOption: string) => {
    onChange(selectedOption)
  }

  return (
    <Select>
      <SelectTrigger className='w-[220px]'>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {items.map((elem, i) => (
            <SelectItem
              key={i}
              value={elem.propValue}
              onClick={() => handleOptionChange(elem.value)}
            >
              {elem.value}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default SelectOptions
