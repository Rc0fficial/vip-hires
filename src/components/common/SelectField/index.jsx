import React from 'react';

const SelectField = ({ label, value, onChange, options, name }) => {
    return (
        <div className='flex flex-col gap-3'>
            <label htmlFor={label} className='text-525 leading-none '>{label}</label>
            <select
                value={value}
                onChange={onChange}
                className='h-12 bg-[rgb(250,250,250)] px-4 rounded-md text-[#989898] border-[#BDBDBD] placeholder:text-[#989898] border-[0.5px]'
                id={label}
                name={name} // Add this line
            >
                <option value="">Select {label}</option>
                {options.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SelectField;