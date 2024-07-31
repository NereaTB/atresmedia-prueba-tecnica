import { ChangeEventHandler } from "react";
import "./SelectInput.scss";

interface SelectInputProps {
  items: string[];
  onChange: ChangeEventHandler<HTMLSelectElement>;
}

export const SelectInput = ({ items, onChange }: SelectInputProps) => {
  return (
    <div className="selectInput">
      <label className="selectInput__label">Select your favorite breed:</label>
      <select name="breeds" onChange={onChange} className="selectInput__input">
        {items.map((item) => {
          return (
            <option key={item} value={item}>
              {item}
            </option>
          );
        })}
      </select>
    </div>
  );
};
