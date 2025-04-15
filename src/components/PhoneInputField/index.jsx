'use client'
import React from 'react'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { isValidPhoneNumber } from 'react-phone-number-input'

const PhoneInputField = ({
  value,
  onChange,
  label,
  error,
  className = '',
  ...props
}) => {
  return (
    <div className={`flex flex-col ${className}`}>
      {label && (
        <label className="text-525 text-xs md:text-[16px] text-left leading-none mb-2">
          {label}
        </label>
      )}
      
      <div className={`phone-input-container ${error ? 'error' : ''}`}>
        <PhoneInput
          international
          defaultCountry="US"
          value={value}
          onChange={onChange}
          placeholder="Enter phone number"
          className={`phone-input w-full p-2 md:p-3 border-[0.5px] border-[#bdbdbd] rounded-md`}
          {...props}
        />
      </div>
      
      {error && (
        <p className="text-red-500 text-sm mt-1">
          {error}
        </p>
      )}

<style jsx global>{`
  .phone-input-container {
    padding: 1px;
    border-radius: 6px;
    transition: all 0.2s;
  }

  .phone-input-container.error {
    box-shadow: 0 0 0 1px #ff0000;
  }



  .phone-input:focus {
    outline: none; /* removes default browser outline */
    box-shadow: none; /* optional: removes shadow if applied */
    border-color: #009969; /* green border on focus */
  }

  .react-phone-number-input__icon {
    border-radius: 3px;
  }

  .react-phone-number-input__icon-image {
    width: 20px;
    height: 15px;
  }

  .react-phone-number-input__country-select {
    padding-right: 10px;
  }
`}</style>

    </div>
  )
}

export default PhoneInputField

export const validatePhoneNumber = (phoneNumber) => {
  return phoneNumber ? isValidPhoneNumber(phoneNumber) : false
}