import React, { ChangeEvent } from 'react';

interface DropdownProps {
  options: string[];
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  name: string;
}

const Dropdown: React.FC<DropdownProps> = ({ options, value, onChange, name }) => {
  return (
    <select name={name} value={value} onChange={onChange}>
      <option value="">Select Option</option>
      {options.map((option) => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
  );
};

export default Dropdown;
