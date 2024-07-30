import {ChangeEventHandler} from 'react'

interface SelectInputProps {
  items: string[];
  onChange: ChangeEventHandler<HTMLSelectElement>;
}

export const SelectInput = ({ items, onChange }: SelectInputProps) => {
  return (
    <select name="breeds" onChange={onChange}>
      {items.map((item) => {
        return (
          <option key={item} value={item}>
            {item}
          </option>
        );
      })}
    </select>
  );
};
