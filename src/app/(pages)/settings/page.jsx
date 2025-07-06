'use client'
import React, { useEffect, useState } from 'react'
import Modal from '@/components/common/Modal'
import InputField from '@/components/common/InputField'
import AddIcon from '@/components/Icons/AddIcon.svg'
import Link from 'next/link'
import SecurityModel from './SecurityModel'
import PhoneInputField, { validatePhoneNumber } from '@/components/PhoneInputField'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '@/app/Store/ReduxSlice/loginSlice'
import toast from 'react-hot-toast'
import { updateProfileField } from '@/app/Store/ReduxSlice/updateProfileSlice'
import { checkUserStatus } from '@/app/Store/ReduxSlice/authSlice'
import TrashIcon from '@/components/Icons/TrashIcon.svg'
import axios from 'axios'

const SettingPage = () => {

  const [errors, setErrors] = useState({}) // Start with one empty email field
  const [showEmail, setShowEmail] = useState(false)
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const dispatch = useDispatch();
  // const [errors, setErrors] = useState({});
  const [password, setPassword] = useState("")
  const [emailModel, setEmailModel] = useState(false)
  const [phoneModel, setPhoneModel] = useState(false)
  const [passwordModel, setPasswordModel] = useState(false)
  const [securityModel, setSecurityModel] = useState(false)
  const [pendingAction, setPendingAction] = useState(null) // Track which action to perform after security check
  const { user, isAuthenticated, userProfile } = useSelector((state) => state.auth);
  const router = useRouter()
  const [secondaryEmail, setSecondaryEmail] = useState(userProfile?.secondary_email || ''); // Start with one empty email field
  const [secondaryPhoneNumber, setSecondaryPhoneNumber] = useState(userProfile?.secondary_phone || '');
  const [showPhoneInput, setShowPhoneInput] = useState(false);
  useEffect(() => {
    if (userProfile) {
      setSecondaryEmail(userProfile?.secondary_email)
      setSecondaryPhoneNumber(userProfile?.secondary_phone)
    }
  }, [userProfile])




  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };



  const handleShowEmail = () => {
    setShowEmail(true)
  }



  // Security verification handlers
  const handleSecurityVerified = async () => {
    setSecurityModel(false);
    if (pendingAction) {
      switch (pendingAction) {
        case 'email':
          if (isAuthenticated) {


            const resultAction = await dispatch(loginUser({ email: user?.email, password }));
            if (loginUser.fulfilled.match(resultAction)) {
              setPassword("")
              setEmailModel(true);
            } else {
              toast.error("Invalid Password")
              setPassword("")
            }
          } else {
            router.push('/login')
          }
          break;
        case 'phone':

          if (isAuthenticated) {
            const resultAction = await dispatch(loginUser({ email: user?.email, password }));
            if (loginUser.fulfilled.match(resultAction)) {
              setPassword("")
              setPhoneModel(true);
            } else {
              toast.error("Invalid Password")
              setPassword("")
            }
          } else {
            router.push('/login')
          }
          break;
        case 'password':

          if (isAuthenticated) {
            const resultAction = await dispatch(loginUser({ email: user?.email, password }));
            if (loginUser.fulfilled.match(resultAction)) {
              setPassword("")
              setPasswordModel(true);
            } else {
              toast.error("Invalid Password")
              setPassword("")
            }
          } else {
            router.push('/login')
          }
          break;
        case 'devices':

          if (isAuthenticated) {
            const resultAction = await dispatch(loginUser({ email: user?.email, password }));
            if (loginUser.fulfilled.match(resultAction)) {
              setPassword("")
              router.push('/settings/logged-in-devices')
            } else {
              toast.error("Invalid Password")
              setPassword("")
            }
          } else {
            router.push('/login')
          }
          break;
        case 'remembered-devices':

          // Navigation will be handled by Link component
          if (isAuthenticated) {
            const resultAction = await dispatch(loginUser({ email: user?.email, password }));
            if (loginUser.fulfilled.match(resultAction)) {
              setPassword("")
              router.push('/settings/remember-devices')
            } else {
              toast.error("Invalid Password")
              setPassword("")
            }
          } else {
            router.push('/login')
          }
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

  const handleSaveEmail = async () => {
    try {
      await dispatch(updateProfileField({
        id: userProfile.documentId,
        fieldName: 'secondary_email',
        value: secondaryEmail
      })).unwrap();

      dispatch(checkUserStatus())
      handleCloseEmailModel()
    } catch (error) {
      console.error('Failed to update summary:', error);
    }
  }

  const handleDeleteSecondaryEmail = async () => {
    try {
      await dispatch(updateProfileField({
        id: userProfile.documentId,
        fieldName: 'secondary_email',
        value: null  // Set to null instead of empty string
      })).unwrap();

      dispatch(checkUserStatus());
      setShowEmail(false)
      setSecondaryEmail(''); // Clear local state
    } catch (error) {
      console.error('Failed to delete secondary email:', error);
    }
  };
  // Handle save phone number
  const handleSavePhone = async () => {
    try {
      await dispatch(updateProfileField({
        id: userProfile.documentId,
        fieldName: 'secondary_phone',
        value: secondaryPhoneNumber
      })).unwrap();

      dispatch(checkUserStatus());
      handleClosePhoneModel();
      setShowPhoneInput(false);
    } catch (error) {
      console.error('Failed to update phone:', error);
    }
  };

  // Handle delete secondary phone
  const handleDeletePhone = async () => {
    try {
      await dispatch(updateProfileField({
        id: userProfile.documentId,
        fieldName: 'secondary_phone',
        value: null
      })).unwrap();

      dispatch(checkUserStatus());
      setSecondaryPhoneNumber('');
      setShowPhoneInput(false);
    } catch (error) {
      console.error('Failed to delete phone:', error);
    }
  };
  const changePassword = async (currentPassword, newPassword, confirmPassword) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/auth/change-password`,
        {
          currentPassword,
          password: newPassword,
          passwordConfirmation: confirmPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || error.message;
    }
  };
  const handleSavePassword = async () => {
    // Validate inputs first
    if (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword) {
      setErrors({
        currentPassword: !formData.currentPassword ? 'Current password is required' : '',
        newPassword: !formData.newPassword ? 'New password is required' : '',
        confirmPassword: !formData.confirmPassword ? 'Please confirm your new password' : '',
      });
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setErrors({
        ...errors,
        confirmPassword: 'Passwords do not match',
      });
      return;
    }

    if (formData.newPassword.length < 8) {
      setErrors({
        ...errors,
        newPassword: 'Password must be at least 8 characters',
      });
      return;
    }

    try {
      // Call the change password API
      await changePassword(
        formData.currentPassword,
        formData.newPassword,
        formData.confirmPassword
      );

      // Success handling
      toast.success('Password changed successfully');
      handleClosePasswordModel();
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (error) {
      // Error handling
      toast.error(error.message || 'Failed to change password');
      console.error('Password change error:', error);
    }
  };
  const maskPhoneNumber = (phoneNumber) => {
    if (!phoneNumber || phoneNumber.length < 3) return phoneNumber;

    const firstTwo = phoneNumber.substring(0, 2);
    const lastOne = phoneNumber.substring(phoneNumber.length - 1);
    const stars = '*'.repeat(phoneNumber.length - 3);

    return `${firstTwo}${stars}${lastOne}`;
  };
  return (
    <>
      <div className={`col-span-2 rounded-3xl py-10 px-5 md:px-12  bg-white shad`}>
        <h1 className='font-semibold capitalize md:text-2xl text-3d3'>sign in & security</h1>
        <div className='mt-6 md:mt-10'>
          <div onClick={handleSecureEmailClick} className='flex flex-col md:flex-row gap-2 cursor-pointer justify-between pt-4 pb-6 border-b border-dcd'>
            <h1 className='text-525 capitalize text-sm md:text-lg font-semibold'>email address</h1>
            <h3 className='text-989 text-sm md:text-lg'>{userProfile?.email
              ? maskPhoneNumber(userProfile.email)
              : 'Not provided'}</h3>
          </div>

          <div onClick={handleSecurePhoneClick} className='flex flex-col md:flex-row gap-2 cursor-pointer justify-between pt-4 pb-6 border-b border-dcd'>
            <h1 className='text-525 capitalize text-sm md:text-lg font-semibold'>phone number</h1>
            <h3 className='text-989 text-sm md:text-lg'>{userProfile?.phoneNumber
              ? maskPhoneNumber(userProfile.phoneNumber)
              : 'Not provided'}</h3>
          </div>

          <div onClick={handleSecurePasswordClick} className='flex flex-col md:flex-row gap-2 cursor-pointer justify-between pt-4 pb-6 border-b border-dcd'>
            <h1 className='text-525 capitalize text-sm md:text-lg font-semibold'>change password</h1>
            <h3 className='text-989 text-sm md:text-lg'>***********</h3>
          </div>

          <Link
            href={'/settings/logged-in-devices'}
            onClick={(e) => handleSecureDevicesClick(e, 'devices')}
          >
            <div className='flex justify-between flex-col md:flex-row gap-2 cursor-pointer pt-4 pb-6 border-b border-dcd'>
              <h1 className='text-525 capitalize text-sm md:text-lg font-semibold'>Logged in Devices</h1>
              <h3 className='text-989 text-sm md:text-lg'>
                {[...new Set(user?.devices
                  ?.filter(device => !device.isRemembered)
                  ?.map(device => device.documentId)
                )].length || 0} devices
              </h3>
            </div>
          </Link>

          <Link
            href={'/settings/remember-devices'}
            onClick={(e) => handleSecureDevicesClick(e, 'remembered-devices')}
          >
            <div className='flex justify-between flex-col md:flex-row gap-2 pt-4 pb-6 cursor-pointer border-dcd'>
              <h1 className='text-525 capitalize text-sm md:text-lg font-semibold'>Devices that remember your password</h1>
              <h3 className='text-989 text-sm md:text-lg'>
                {[...new Set(user?.devices
                  ?.filter(device => device.isRemembered)
                  ?.map(device => device.documentId)
                )].length || 0} devices
                
              </h3>
            </div>
          </Link>
        </div>
      </div>


      {/* Email Address Modal */}
      <Modal
        isOpen={emailModel}
        onClose={handleCloseEmailModel}
        onSave={handleSaveEmail}
        id="Email Address"
      >
        <div className="-mt-6">
          <h4 className='text-989 mb-6'>Emails you've added</h4>
          <div className='flex flex-col gap-6'>
            {/* Primary Email */}
            <InputField
              label={'Primary Email'}
              type="email"
              value={user?.email}
              disabled={true}
              error={""}
            />

            {/* Secondary Email Field */}
            {(showEmail || userProfile?.secondary_email) && (
              <div className="relative">
                <InputField
                  label={'Secondary Email'}
                  placeholder={'secondary@gmail.com'}
                  type="email"
                  value={secondaryEmail}
                  onChange={(e) => setSecondaryEmail(e.target.value)}
                  name={'secondaryEmail'}
                  error={""}
                />
                {userProfile?.secondary_email && (
                  <button
                    onClick={handleDeleteSecondaryEmail}
                    className="absolute right-2 top-10 flex items-center text-red-500 hover:text-red-700"
                    title="Delete secondary email"
                  >
                    <TrashIcon color="#707070" height={24} width={24} className="cursor-pointer my-auto" /> {/* Replace with your delete icon component */}
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Add Email Button */}
          {!showEmail && !userProfile?.secondary_email && (
            <button
              onClick={handleShowEmail}
              className="px-4 py-2 border border-green flex justify-center items-center gap-2 text-green text-lg font-semibold w-full max-w-[240px] rounded-full mt-8"
            >
              <AddIcon height={24} width={24} color={"#009969"} />
              Add Email address
            </button>
          )}
        </div>
      </Modal>
      {/* Phone model */}

      <Modal
        isOpen={phoneModel}
        onClose={handleClosePhoneModel}
        onSave={handleSavePhone}
        id="Phone Number"
      >
        <div className="-mt-6">
          <h4 className='text-989 mb-6 text-xs md:text-[16px]'>
            Phone numbers you've added, your primary number is the one for resetting password.
          </h4>

          <div className="flex flex-col gap-6">
            {/* Primary Phone (non-editable) */}
            <PhoneInputField
              value={userProfile?.phoneNumber || ''}
              label="Primary Phone"
              disabled={true}
              error={errors?.primaryPhone}
            />

            {/* Secondary Phone Input (shown when adding or when exists) */}
            {(showPhoneInput || userProfile?.secondary_phone) && (
              <div className="relative">
                <PhoneInputField
                  value={secondaryPhoneNumber}
                  onChange={(value) => setSecondaryPhoneNumber(value)}
                  label="Secondary Phone"
                  error={errors?.secondaryPhone}
                />
                {userProfile?.secondary_phone && (
                  <button
                    type="button"
                    onClick={handleDeletePhone}
                    className="absolute right-2 top-10 flex items-center text-red-500 hover:text-red-700"
                    title="Delete phone number"
                  >
                    <TrashIcon color="#707070" height={24} width={24} className="cursor-pointer my-auto" /> {/* Replace with your delete icon component */}
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Add Phone Button (shown when no secondary phone exists) */}
          {!showPhoneInput && !userProfile?.secondary_phone && (
            <button
              type="button"
              onClick={() => setShowPhoneInput(true)}
              className="px-4 py-2 border-2 border-green flex justify-center items-center gap-2 text-green text-sm md:text-lg font-semibold w-full max-w-[260px] rounded-full mt-8"
            >
              <AddIcon height={24} width={24} color={"#009969"} />
              Add Phone Number
            </button>
          )}

          {/* Save Button (only shown when editing) */}
          {(showPhoneInput || userProfile?.secondary_phone) && (
            <button
              type="button"
              onClick={handleSavePhone}
              className="mt-6 px-6 py-2 md:py-3 bg-green text-xs md:text-[16px] text-white rounded-lg font-semibold"
            >
              Save Changes
            </button>
          )}
        </div>
      </Modal>



      {/* Change Password model */}
      <Modal
        isOpen={passwordModel}
        onClose={handleClosePasswordModel}
        onSave={handleSavePassword}
        id="Change Password"
      // isProcessing={isProcessing} // Add this if you have a loading state
      >
        <div className="-mt-6">
          <h4 className="text-989 mb-6">
            Create a new password that is at least 8 characters long.
          </h4>
          <div className="flex flex-col gap-6">
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
          <form onSubmit={handleSecurityVerified} className='flex flex-col gap-6'>
            <InputField
              label="Password"
              type="password"
              name="password"
              autoFocus={true}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </form>
        </div>
      </SecurityModel>

    </>
  )
}

export default SettingPage
