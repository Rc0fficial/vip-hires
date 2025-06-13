"use client";
import React from "react";

const InputField = ({
  label,
  placeholder,
  value,
  onChange,
  type,
  labelClass,
  error,
  onBlur,
  name,
  disabled,
  className,
  autoFocus
}) => {
  return (
    <div className="flex flex-col gap-3">
      <label
        htmlFor={label}
        className={`${labelClass} capitalize text-xs md:text-[16px] text-525 leading-none`}
      >
        {label}
      </label>
      <input
      name={name}
        type={type || "text"}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        autoFocus={autoFocus}
        className={` ${className}  h-10 md:h-12 px-4 rounded-md border-[#BDBDBD] placeholder:text-[#989898] border-[0.5px] ${
          error ? "border-red-500" : ""
        }`}
        id={label}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default InputField;
