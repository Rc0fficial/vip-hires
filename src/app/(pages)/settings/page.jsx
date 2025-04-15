'use client'
import React, { useState } from 'react'
import Modal from '@/components/common/Modal'
import InputField from '@/components/common/InputField'
import AddIcon from '@/components/Icons/AddIcon.svg'
import Link from 'next/link'
import SecurityModel from './SecurityModel'
import PhoneInputField, { validatePhoneNumber } from '@/components/PhoneInputField'
import { useRouter } from 'next/navigation'

const SettingPage = () => {
  const [emails, setEmails] = useState(['']); // Start with one empty email field
  const [phones, setPhones] = useState([{ number: '' }])
  const [errors, setErrors] = useState({}) // Start with one empty email field
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  // const [errors, setErrors] = useState({});

  const [emailModel, setEmailModel] = useState(false)
  const [phoneModel, setPhoneModel] = useState(false)
  const [passwordModel, setPasswordModel] = useState(false)
  const [securityModel, setSecurityModel] = useState(false)
  const [pendingAction, setPendingAction] = useState(null) // Track which action to perform after security check
const router = useRouter()
  const handleEmailChange = (index, value) => {
    const updatedEmails = [...emails];
    updatedEmails[index] = value;
    setEmails(updatedEmails);
  };

  const handlePhoneChange = (index, value) => {
    const updatedPhones = [...phones]
    updatedPhones[index] = { number: value }
    setPhones(updatedPhones)
    
    // Clear error when changing
    if (errors[`phone_${index}`]) {
      const newErrors = {...errors}
      delete newErrors[`phone_${index}`]
      setErrors(newErrors)
    }
  }


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
    setPhones([...phones, { number: '' }])
  }
  const validatePhones = () => {
    const newErrors = {}
    let isValid = true
    
    phones.forEach((phone, index) => {
      if (!phone.number) {
        newErrors[`phone_${index}`] = 'Phone number is required'
        isValid = false
      } else if (!validatePhoneNumber(phone.number)) {
        newErrors[`phone_${index}`] = 'Invalid phone number'
        isValid = false
      }
    })
    
    setErrors(newErrors)
    return isValid
  }

  // Security verification handlers
  const handleSecurityVerified = () => {
    setSecurityModel(false);
    if (pendingAction) {
      switch(pendingAction) {
        case 'email':
          setEmailModel(true);
          break;
        case 'phone':
          setPhoneModel(true);
          break;
        case 'password':
          setPasswordModel(true);
          break;
        case 'devices':
          router.push('/settings/logged-in-devices')
          break;
          case 'remembered-devices':
          router.push('/settings/remember-devices')
          // Navigation will be handled by Link component
          break;
        default:
          break;
      }
      setPendingAction(null);
    }
  };

  // Wrapper functions that first show security modal
  const handleSecureEmailClick = () => {
    setPendingAction('email');
    setSecurityModel(true);
  };

  const handleSecurePhoneClick = () => {
    setPendingAction('phone');
    setSecurityModel(true);
  };

  const handleSecurePasswordClick = () => {
    setPendingAction('password');
    setSecurityModel(true);
  };

  const handleSecureDevicesClick = (e, action) => {
    e.preventDefault(); // Prevent immediate navigation
    setPendingAction(action);
    setSecurityModel(true);
  };

  const handleCloseEmailModel = () => setEmailModel(false)
  const handleClosePhoneModel = () => setPhoneModel(false)
  const handleClosePasswordModel = () => setPasswordModel(false)
  const handleCloseSecurityModel = () => {
    setSecurityModel(false);
    setPendingAction(null);
  }

  const handleSaveEmail = () => handleCloseEmailModel()
  const handleSavePhone = () => handleClosePhoneModel()
  const handleSavePassword = () => handleClosePasswordModel()
  const handleSubmit = (e) => {
    e.preventDefault()
    if (validatePhones()) {
      // Submit logic here
      console.log('Valid phone numbers:', phones)
    }
  }
  return (
    <>
      <div className={`col-span-2 rounded-3xl py-10 px-5 md:px-12  bg-white shad`}>
        <h1 className='font-semibold capitalize md:text-2xl text-3d3'>sign in & security</h1>
        <div className='mt-10'>
          <div onClick={handleSecureEmailClick} className='flex cursor-pointer justify-between pt-4 pb-6 border-b border-dcd'>
            <h1 className='text-525 capitalize text-sm md:text-lg font-semibold'>email address</h1>
            <h3 className='text-989 text-sm md:text-lg'>moha************.com</h3>
          </div>

          <div onClick={handleSecurePhoneClick} className='flex cursor-pointer justify-between pt-4 pb-6 border-b border-dcd'>
            <h1 className='text-525 capitalize text-sm md:text-lg font-semibold'>phone number</h1>
            <h3 className='text-989 text-sm md:text-lg'>01*********9</h3>
          </div>

          <div onClick={handleSecurePasswordClick} className='flex cursor-pointer justify-between pt-4 pb-6 border-b border-dcd'>
            <h1 className='text-525 capitalize text-sm md:text-lg font-semibold'>change password</h1>
            <h3 className='text-989 text-sm md:text-lg'>***********</h3>
          </div>

          <Link 
            href={'/settings/logged-in-devices'} 
            onClick={(e) => handleSecureDevicesClick(e, 'devices')}
          >
            <div className='flex justify-between cursor-pointer pt-4 pb-6 border-b border-dcd'>
              <h1 className='text-525 capitalize text-sm md:text-lg font-semibold'>Logged in Devices</h1>
              <h3 className='text-989  text-sm md:text-lg'>3 devices</h3>
            </div>
          </Link>

          <Link 
            href={'/settings/remember-devices'} 
            onClick={(e) => handleSecureDevicesClick(e, 'remembered-devices')}
          >
            <div className='flex justify-between pt-4 pb-6 cursor-pointer border-dcd'>
              <h1 className='text-525 capitalize text-sm md:text-lg font-semibold'>Devices that remember your password</h1>
              <h3 className='text-989 text-sm md:text-lg'>3 devices</h3>
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


          <h4 className='text-989 mb-6 text-xs md:text-[16px]'>Phone numbers you've added , your primary number is the one for resetting password .</h4>
          <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-6">
          {phones.map((phone, index) => (
            <PhoneInputField
              key={index}
              value={phone.number}
              onChange={(value) => handlePhoneChange(index, value)}
              label={`Phone ${index + 1}`}
              error={errors[`phone_${index}`]}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={handleAddPhone}
          className="px-4 py-2 border-2 border-green flex justify-center items-center gap-2 text-green text-sm md:text-lg font-semibold w-full max-w-[260px] rounded-full mt-8"
        >
          <AddIcon height={24} width={24} color={"#009969"} />
          Add Phone Number
        </button>

        <button
          type="submit"
          className="mt-6 px-6 py-2 md:py-3 bg-green text-xs md:text-[16px] text-white rounded-lg font-semibold"
        >
          Save Changes
        </button>
      </form>
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

 {/* Security Model - shown first when accessing sensitive info */}
 <SecurityModel 
        isOpen={securityModel} 
        onClose={handleCloseSecurityModel} 
        onSave={handleSecurityVerified} 
        id="Enter Password"
      >
        <div className='-mt-6'>
          <h4 className='text-989 text-xs md:text-[16px] mb-6'>For security reasons, please enter your password to continue.</h4>
          <div className='flex flex-col gap-6'>
            <InputField
              label="Password"
              type="password"
              name="password"
              placeholder="Enter your password"
            />
          </div>
        </div>
      </SecurityModel>

    </>
  )
}

export default SettingPage
