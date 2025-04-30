'use client'
import React from 'react';

const Button = ({ label, onClick, className, disabled  }) => {
    return (
        <button
            className={`h-12 min-w-[110px] sm:min-w-[160px] cursor-pointer text-center md:text-xl font-semibold  flex justify-center items-center  w-fit  rounded-md ${className}`}
            onClick={onClick}
            disabled={disabled}
        >
            {label}
        </button>
    );
};

export default Button;