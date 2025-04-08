import React from "react";

const SelectField = ({ label, value, onChange, options, error, onBlur,name }) => {
  return (
    <div className="flex flex-col gap-3">
      <label htmlFor={label} className="text-525 leading-none text-start">
        {label}
      </label>
      <select
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        name={name}
        className={`h-12 bg-[rgb(250,250,250)] px-4 rounded-md text-[#989898] border-[#BDBDBD] placeholder:text-[#989898] border-[0.5px] ${
          error ? "border-red-500" : ""
        }`}
        id={label}
      >
        <option value="">Select {label}</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default SelectField;
