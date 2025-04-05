'use client'
import React, { useState } from 'react'
import Modal from '@/components/common/Modal'
import InputField from '@/components/common/InputField'
import AddIcon from '@/components/Icons/AddIcon.svg'
import Link from 'next/link'

const SettingPage = () => {
  const [emails, setEmails] = useState(['']); // Start with one empty email field
  const [phones, setPhones] = useState(['']); // Start with one empty email field
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});

  const [emailModel, setEmailModel] = useState(false)
  const [phoneModel, setPhoneModel] = useState(false)
  const [passwordModel, setPasswordModel] = useState(false)



  const handleEmailChange = (index, value) => {
    const updatedEmails = [...emails];
    updatedEmails[index] = value;
    setEmails(updatedEmails);
  };


  const handlePhoneChange = (index, value) => {
    const updatedPhones = [...emails];
    updatedPhones[index] = value;
    setPhones(updatedPhones);
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }
    if (!formData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = 'Password must be at least 6 characters';
    }
    if (formData.confirmPassword !== formData.newPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('Form submitted:', formData);
      // You can make API call here
    }
  };

  const handleAddEmail = () => {
    setEmails([...emails, '']); // Add a new empty email field
  };
  const handleAddPhone = () => {
    setPhones([...phones, '']); // Add a new empty email field
  };



  const handleOpenEmailModel = () => setEmailModel(true)
  const handleOpenPhoneModel = () => setPhoneModel(true)
  const handleOpenPasswordModel = () => setPasswordModel(true)



  const handleCloseEmailModel = () => setEmailModel(false)
  const handleClosePhoneModel = () => setPhoneModel(false)
  const handleClosePasswordModel = () => setPasswordModel(false)



  const handleSaveEmail = () => handleCloseEmailModel()
  const handleSavePhone = () => handleClosePhoneModel()
  const handleSavePassword = () => handleClosePasswordModel()


  return (
    <>
      <div className={`col-span-2 rounded-3xl py-10 px-12 bg-white shad     `}>
        <h1 className='font-semibold capitalize text-2xl text-3d3'>sign in & security</h1>
        <div className='mt-10'>
          <div onClick={handleOpenEmailModel} className='flex cursor-pointer justify-between pt-4 pb-6 border-b border-dcd'>
            <h1 className='text-525 capitalize text-lg font-semibold'>email address</h1>
            <h3 className='text-989 text-lg'>moha************.com</h3>
          </div>

          <div onClick={handleOpenPhoneModel} className='flex cursor-pointer justify-between pt-4 pb-6 border-b border-dcd'>
            <h1 className='text-525 capitalize text-lg font-semibold'>phone number</h1>
            <h3 className='text-989 text-lg'>01*********9</h3>

          </div>
          <div onClick={handleOpenPasswordModel} className='flex cursor-pointer justify-between pt-4 pb-6 border-b border-dcd'>
            <h1 className='text-525 capitalize text-lg font-semibold'>change password</h1>
            <h3 className='text-989 text-lg'>***********</h3>
          </div>
          <Link href={'/settings/logged-in-devices'}>
          <div className='flex justify-between cursor-pointer pt-4 pb-6 border-b border-dcd'>
            <h1 className='text-525 capitalize text-lg font-semibold'>Logged in Devices</h1>
            <h3 className='text-989 text-lg'>3 devices</h3>

          </div>
          </Link>
          <Link href={'/settings/remember-devices'}>
          <div className='flex justify-between pt-4 pb-6  cursor-pointer border-dcd'>
            <h1 className='text-525 capitalize text-lg font-semibold'>Devices that remember your password </h1>
            <h3 className='text-989 text-lg'>3 devices</h3>

          </div>
          </Link>
        </div>

      </div>

      {/* email address model */}
      <Modal isOpen={emailModel} onClose={handleCloseEmailModel} onSave={handleSaveEmail} id="Email Address">
        <div className=' -mt-6'>


          <h4 className='text-989 mb-6'>Emails you've added</h4>
          <div className='flex flex-col gap-6'>

            {emails.map((email, index) => (
              <InputField
                key={index}
                label={index === 0 ? 'Primary Email' : `Email ${index + 1}`}
                placeholder={`example${index + 1}@gmail.com`}
                type="email"
                value={email}
                onChange={(e) => handleEmailChange(index, e.target.value)}
                name={`email_${index}`}
                error={""}
              />
            ))}
          </div>
          <button
            onClick={handleAddEmail}
            className="px-4 py-2 border border-green flex justify-center items-center gap-2 text-green text-lg font-semibold w-full max-w-[240px] rounded-full mt-8"
          >
            <AddIcon height={24} width={24} color={"#009969"} />
            Add Email address
          </button>
        </div>
      </Modal>
      {/* Phone model */}
      <Modal isOpen={phoneModel} onClose={handleClosePhoneModel} onSave={handleSavePhone} id="Phone Number">
        <div className=' -mt-6'>


          <h4 className='text-989 mb-6'>Phone numbers you've added , your primary number is the one for resetting password .</h4>
          <div className='flex flex-col gap-6'>
            {phones.map((phone, index) => (
              <div key={index} className="flex flex-col gap-3 mb-4">
                <label htmlFor="Phone" className="text-525 text-center leading-none">
                  Phone
                </label>
                <div className="flex gap-4">
                  {/* Country code section */}
                  <div className="h-12 px-4 flex justify-center gap-2 items-center border-[0.5px] border-[#BDBDBD] rounded-md">
                    <img src="/assets/flag.png" alt="flag" />
                    <span className="text-sm text-[#989898]">+02</span>
                  </div>

                  {/* Phone input */}
                  <div className="flex-1 flex flex-col">
                    <input
                      type="text"
                      placeholder="Enter Phone Number"
                      value={phone}
                      onChange={(e) => handlePhoneChange(index, e.target.value)}
                      className={`h-12 px-4 rounded-md border-[#BDBDBD] placeholder:text-[#989898] border-[0.5px] `}
                    />
                    {/* {errors[`phone_${index}`] && (
                <p className="text-red-500 text-sm mt-1">
                  {errors[`phone_${index}`]}
                </p>
              )} */}
                  </div>
                </div>
              </div>
            ))}

          </div>
          <button
            onClick={handleAddPhone}
            className="px-4 py-2 border-2 border-green flex justify-center items-center gap-2 text-green text-lg font-semibold w-full max-w-[260px] rounded-full mt-8"
          >
            <AddIcon height={24} width={24} color={"#009969"} />
            Add Phone Number
          </button>
        </div>
      </Modal>


      {/* Change Password model */}
      <Modal isOpen={passwordModel} onClose={handleClosePasswordModel} onSave={handleSavePassword} id="Change Password">
        <div className=' -mt-6'>


          <h4 className='text-989 mb-6'>Create a new password that is at least 8 characters long.</h4>
          <div className='flex flex-col gap-6'>

            <InputField
              label="Current Password"
              type="password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handlePasswordChange}
              placeholder="Enter current password"
              error={errors.currentPassword}
            />

            <InputField
              label="New Password"
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handlePasswordChange}
              placeholder="Enter new password"
              error={errors.newPassword}
            />

            <InputField
              label="Re-enter New Password"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handlePasswordChange}
              placeholder="Re-enter new password"
              error={errors.confirmPassword}
            />

          </div>
        
        </div>
      </Modal>

    </>
  )
}

export default SettingPage
