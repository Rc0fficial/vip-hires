'use client'
import React from 'react';

const Button = ({ label, onClick, className, disabled  }) => {
    return (
        <button
            className={`h-12 min-w-[160px] text-center text-xl font-semibold  flex justify-center items-center  w-fit  rounded-md ${className}`}
            onClick={onClick}
            disabled={disabled}
        >
            {label}
        </button>
    );
};

export default Button;