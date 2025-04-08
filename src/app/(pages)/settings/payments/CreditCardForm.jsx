'use client';
import React from 'react';
import TrashIcon from '@/components/Icons/TrashIcon.svg';
import InputField from '@/components/common/InputField';

const CreditCardForm = ({
  formData,
  onChange,
  onDelete,
  errors = {}
}) => {
  return (
    <div className=" py-6 rounded-xl w-full  space-y-4">
      <InputField
        label="Cardholder Name"
        placeholder="Mohamed Ali"
        value={formData.holderName}
        onChange={onChange}
        name="holderName"
        error={errors.holderName}
      />
      <InputField
        label="Card Number"
        placeholder="6508 8234 3354 7832"
        value={formData.cardNumber}
        onChange={onChange}
        name="cardNumber"
        error={errors.cardNumber}
      />
      <div className="grid grid-cols-2 gap-4">
        <InputField
          label="Expired Date"
          placeholder="21/04"
          value={formData.exp}
          onChange={onChange}
          name="exp"
          error={errors.exp}
        />
        <InputField
          label="Cvv Number"
          placeholder="786"
          value={formData.cvv}
          onChange={onChange}
          name="cvv"
          error={errors.cvv}
        />
      </div>

      <button
        className="flex items-center justify-center ml-auto w-full max-w-[280px] gap-8 bg-ff6 text-white font-medium px-6 py-2 rounded-md mt-4"
        onClick={onDelete}
      >
        <TrashIcon height={24} width={24} color={"#ffffff"} />
        Delete
      </button>
    </div>
  );
};

export default CreditCardForm;
