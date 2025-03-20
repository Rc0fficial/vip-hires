'use client'
import React from 'react';

const InputField = ({ label, placeholder, value, onChange, type,labelClass  }) => {
    return (
        <div className='flex flex-col gap-3 mb-4'>
            <label htmlFor={label} className={`${labelClass} text-525 leading-none`}>{label}</label>
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className='h-12 px-4 rounded-md border-[#BDBDBD] placeholder:text-[#989898] border-[0.5px]'
                id={label}
            />
        </div>
    );
};

export default InputField;