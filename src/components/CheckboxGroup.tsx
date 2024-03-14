import React, { ChangeEvent } from 'react';

interface CheckboxGroupProps {
  options: string[];
  selectedOptions: string[];
  onChange: (selectedThemes: string[]) => void;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({ options, selectedOptions, onChange }) => {
  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedTheme = e.target.value;
    let updatedThemes;
    if (selectedOptions.includes(selectedTheme)) {
      updatedThemes = selectedOptions.filter(theme => theme !== selectedTheme);
    } else {
      updatedThemes = [...selectedOptions, selectedTheme];
    }
    onChange(updatedThemes);
  };

  return (
    <>
      {options.map((option) => (
        <div key={option} className="theme-checkbox">
          <label htmlFor={option}>{option}</label>
          <input
            type="checkbox"
            id={option}
            value={option}
            checked={selectedOptions.includes(option)}
            onChange={handleCheckboxChange}
          />
        </div>
      ))}
    </>
  );
};

export default CheckboxGroup;
