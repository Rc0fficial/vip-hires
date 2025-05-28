'use client'
import AddIcon from '@/components/Icons/AddIcon.svg'
import BehanceIcon from '@/components/Icons/BehanceIcon.svg'
import DownloadIcon from '@/components/Icons/DownloadIcon.svg'
import EditIcon from '@/components/Icons/EditIcon.svg'
import EmailIcon from '@/components/Icons/EmailIcon.svg'
import LinkedinIcon from '@/components/Icons/LinkedinIcon.svg'
import LinkIcon from '@/components/Icons/LinkIcon.svg'
import LocationIcon from '@/components/Icons/LocationIcon.svg'
import CameraIcon2 from '@/components/Icons/CameraIcon2.svg'
import MediumIcon from '@/components/Icons/MediumIcon.svg'
import PhoneIcon from '@/components/Icons/PhoneIcon.svg'
import PhotoIcon from '@/components/Icons/PhotoIcon.svg'
import StackOverflowIcon from '@/components/Icons/StackOverflowIcon.svg'
import UploadIcon from '@/components/Icons/UploadIcon.svg'
import ViewIcon from '@/components/Icons/ViewIcon.svg'
import React, { useEffect, useRef, useState } from 'react'
import Summary from './Summery'
import Modal from '@/components/common/Modal'
import Skills from './Skills'
import CloseIcon from '@/components/Icons/CloseIcon.svg'
import Availability from './Availability'
import EmploymentType from './EmploymentType'
import JobType from './JobType'
import Education from './Education'
import PersonalInformation from './PersonalInformation'
import ResumeSection from './Resume'
import InputField from '@/components/common/InputField'
import SelectField from '@/components/common/SelectField'
import DribbbleIcon from '@/components/Icons/DribbbleIcon.svg'
import GithupIcon from '@/components/Icons/GithupIcon.svg'
import KaggleIcon from '@/components/Icons/KaggleIcon.svg'
import UrlIcon from '@/components/Icons/UrlIcon.svg'
import PhoneInputField from '@/components/PhoneInputField'
import { useDispatch, useSelector } from 'react-redux'
import UserInfoForm from './UserInfoForm'
import { updateProfile } from '@/app/Store/ReduxSlice/updateProfileSlice'
import { checkUserStatus } from '@/app/Store/ReduxSlice/authSlice'
import { countryData } from '@/app/utils/countries'
import { uploadFileToStrapi } from '@/app/utils/strapiUpload'
import axios from 'axios'

const ProfilePage = () => {
    const { user, isAuthenticated, userProfile } = useSelector((state) => state.auth);
    const dispatch = useDispatch()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
    const [activeSocialField, setActiveSocialField] = useState(null);
    const [cityOptions, setCityOptions] = useState([]);
     const fileInputRef = useRef(null)
  const [isUploading, setIsUploading] = useState(false)
  const [tempImage, setTempImage] = useState(null)
    const [formData, setFormData] = useState({
        firstName: userProfile?.firstName || '',
        lastName: userProfile?.lastName || '',
        jobTitle: userProfile?.jobTitle || '',
        country: userProfile?.country || '',
        city: userProfile?.city || '',
        email: userProfile?.email || '',
        phoneNumber: userProfile?.phoneNumber || '',
        socialLinks: userProfile?.socialLinks || {
            github: '',
            kaggle: '',
            medium: '',
            behance: '',
            website: '',
            dribbble: '',
            linkedin: '',
            stackoverflow: ''
        }
    });
    console.log(userProfile)

    useEffect(() => {
        if (userProfile) {
            setFormData({
                firstName: userProfile?.firstName || '',
                lastName: userProfile?.lastName || '',
                jobTitle: userProfile?.jobTitle || '',
                country: userProfile?.country || '',
                city: userProfile?.city || '',
                email: userProfile?.email || '',
                phoneNumber: userProfile?.phoneNumber || '',
                socialLinks: userProfile?.socialLinks || {
                    github: '',
                    kaggle: '',
                    medium: '',
                    behance: '',
                    website: '',
                    dribbble: '',
                    linkedin: '',
                    stackoverflow: ''
                }
            });
        }
    }, [userProfile]);
    // Update city options when country changes
    useEffect(() => {
        if (formData.country && countryData[formData.country]) {
            const cities = countryData[formData.country].map(city => ({
                value: city,
                label: city
            }));
            setCityOptions(cities);

            // Reset city if it's not in the new country's cities
            if (formData.city && !countryData[formData.country].includes(formData.city)) {
                setFormData(prev => ({ ...prev, city: '' }));
            }
        } else {
            setCityOptions([]);
            setFormData(prev => ({ ...prev, city: '' }));
        }
    }, [formData.country]);


    // Prepare country options from countryData
    const countryOptions = Object.keys(countryData).map(country => ({
        value: country,
        label: country
    }));

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    const handleSelectChange = (name, value) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSocialLinkChange = (e) => {
        const { value } = e.target;
        setFormData(prev => ({
            ...prev,
            socialLinks: {
                ...prev.socialLinks,
                [activeSocialField]: value
            }
        }));
    };

    const toggleSocialField = (field) => {
        setActiveSocialField(activeSocialField === field ? null : field);
    };

    const getSocialIconColor = (field) => {
        return formData.socialLinks[field] ? '#ffffff' : '#525252';
    };


    const getSocialIconBg = (field) => {
        return formData.socialLinks[field] ? 'bg-green' : 'bg-bdb';
    };


    const handleOpenModal = () => setIsModalOpen(true);
    const handleInfoOpenModal = () => setIsInfoModalOpen(true);
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setIsInfoModalOpen(false);
    }
    const handleSave = async () => {
        try {
            // Prepare the update data object in the format your API expects
            const updateData = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                jobTitle: formData.jobTitle,
                country: formData.country,
                city: formData.city,
                email: formData.email,
                phoneNumber: formData.phoneNumber,
                socialLinks: formData.socialLinks
            };

            // Dispatch the update action
            const resultAction = await dispatch(
                updateProfile({
                    id: userProfile.documentId, // assuming userProfile has the ID
                    updateData
                })
            );

            // Unwrap the result to handle success/failure
            const updatedProfile = resultAction.payload;

            if (updatedProfile) {
                // Close modal on success
                handleCloseModal();
                // Show success notification
                //   toast.success('Profile updated successfully');
                // Optionally refresh user data
                dispatch(checkUserStatus()); // if you have this thunk
            }
        } catch (error) {
            // Handle error
            // toast.error(error.message || 'Failed to update profile');
            console.error('Update error:', error);
        }
    };

    const profileCompletionItems = [
        {
            text: "Add 5+ skills to complete your profile",
            bonus: "+10%",
            flexCol: true // Only the first item has flex-col on mobile
        },
        {
            text: "Add Education information complete your profile",
            bonus: "+10%"
        },
        {
            text: "Certifications & Courses complete your profile",
            bonus: "+10%"
        },
        {
            text: "Upload a resume to increase profile completeness by",
            bonus: "+25%"
        }
    ];


     const handleSaveImage = async () => {
    if (!tempImage) {
      handleCloseModal()
      return
    }

    setIsUploading(true)
    const token = localStorage.getItem('token')

    try {
      // Delete previous image if exists
      if (userProfile?.profileImage?.id) {
        await axios.delete(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/upload/files/${userProfile.profileImage.id}`,
          { headers: { 'Authorization': `Bearer ${token}` } }
        )
      }

      // Upload new image
      const imageId = await uploadFileToStrapi(tempImage, token)

      // Update profile with new image
      await dispatch(updateProfile({
        id: userProfile.documentId,
        updateData: { profileImage: imageId }
      })).unwrap()
      dispatch(checkUserStatus())

      handleCloseModal()
    } catch (error) {
      console.error('Error updating profile image:', error)
    } finally {
      setIsUploading(false)
      setTempImage(null)
    }
  }

  const handleTakePhoto = () => {
    // Implement camera capture functionality if needed
    console.log('Take photo clicked')
  }

  const handleUploadClick = () => {
    fileInputRef.current.click()
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    setTempImage(file)
  }
    return (
        <div className='bg-bggreen relative '>
            <img src="/assets/cover.png" alt="" className='w-screen     z-0  object-center -mt-[120px]' />
            <div className='bg-bggreen   px-4 md:px-10  mx-auto  z-20 -mt-30'>
                <div className='w-full   top-[120px] mx-auto grid grid-cols-1  gap-0 lg:gap-10 lg:grid-cols-3 mb-6'>
                    <PersonalInformation
                        handleOpenModal={handleOpenModal}
                        handleInfoOpenModal={handleInfoOpenModal}
                        user={user} userProfile={userProfile}
                    />
                    <div className='col-span-2  h-fit  flex flex-col gap-6  '>

                        {/* profile completeness score */}
                        <div className='rounded-2xl bg-white p-4 lg:p-10 '>

                            <h1 className='capitalize md:text-[28px]  font-semibold text-3d3 '>profile completeness score</h1>
                            <p className='text-989 text-xs md:text-[16px] mb-6'>Track your progress and complete your profile by adding missing details to increase your chances of getting noticed.</p>
                            <div className='p-4 shad rounded-md mb-8 '>
                                <h1 className='text-5d5 mb-4 '>Your progress</h1>
                                <h3 className='md:text-2xl font-medium text-green mb-3'>70% to complete</h3>

                                <div className="relative w-full h-3 md:h-5 bg-gray-300 rounded-full ">
                                    <div className="absolute top-0 left-0 h-3 md:h-4 bg-green rounded-full" style={{ width: '70%' }}></div>
                                    <div className="absolute top-1/2 left-[10%] w-2 h-2 bg-white border-2 border-green rounded-full transform -translate-y-1/2"></div>
                                    <div className="absolute top-1/2 left-[30%] w-2 h-2 bg-white border-2 border-green rounded-full transform -translate-y-1/2"></div>
                                    <div className="absolute top-1/2 left-[50%] w-2 h-2 bg-white border-2 border-green rounded-full transform -translate-y-1/2"></div>
                                    <div className="absolute top-1/2 left-[70%] w-2 h-2 bg-green rounded-full transform -translate-y-1/2"></div>
                                    <div className="absolute top-1/2 left-[90%] w-2 h-2 bg-[#E0E0E0] rounded-full transform -translate-y-1/2"></div>
                                </div>


                            </div>
                            <ul className='list-disc space-y-5'>
                                {profileCompletionItems.map((item, index) => (
                                    <li
                                        key={index}
                                        className={`flex justify-between gap-2 md:gap-0 flex-col md:flex-row  items-start md:items-center w-full md:text-lg text-5d5`}
                                    >
                                        <span className='flex items-center gap-3'>
                                            <div className='w-1.5 h-1.5 bg-5d5 rounded-full'></div>
                                            {item.text}
                                            <span className='text-green mr-4'>{item.bonus}</span>
                                        </span>
                                        <button className='h-[44px] w-[88px] flex items-center justify-center border border-green rounded-md gap-2 font-semibold md:font-bold'>
                                            <AddIcon color={"#009969"} height={24} width={24} /> Add
                                        </button>
                                    </li>
                                ))}
                            </ul>

                        </div>
                        {/* summery */}
                        <Summary user={user} userProfile={userProfile} />
                        {/* reesume */}
                        <ResumeSection user={user} userProfile={userProfile} />
                        {/* skills */}
                        <Skills user={user} userProfile={userProfile} />
                        {/* availability  */}
                        <Availability user={user} userProfile={userProfile} />
                        {/* employemnt type */}
                        <EmploymentType user={user} userProfile={userProfile} />
                        {/* prefere job type */}
                        <JobType user={user} userProfile={userProfile} />

                        {/* Education */}
                        <Education user={user} userProfile={userProfile} />
                    </div>
                </div>
            </div>

            {/* profile change model */}
            <Modal isOpen={isModalOpen} onClose={handleCloseModal} onSave={handleSaveImage} id="Edit Profile Picture">
                <img 
        src={
          tempImage ? URL.createObjectURL(tempImage) :
          userProfile?.profileImage?.url ? 
            `${process.env.NEXT_PUBLIC_STRAPI_URL}${userProfile.profileImage.url}` : 
            "/assets/profile2.png"
        } 
        alt="Profile" 
        className='mb-10 mx-auto w-[200px] h-[200px] rounded-full object-cover'
        onError={(e) => {
          e.target.src = "/assets/profile2.png"
        }}
      />

      <div className='flex justify-center items-center gap-8 pb-10 border-b border-[#DCDCDC]'>
        <button 
          onClick={handleTakePhoto}
          className='w-full max-w-[160px] px-2.5 py-2.5 text-nowrap flex gap-2 justify-center items-center border-2 border-green rounded-md hover:bg-green hover:text-white transition-colors'
        >
          <CameraIcon2 color={"#525252"} height={20} width={20} />
          Take Photo
        </button>
        
        <button 
          onClick={handleUploadClick}
          className='w-full max-w-[160px] px-2.5 py-2.5 text-nowrap flex gap-2 justify-center items-center border-2 border-green rounded-md hover:bg-green hover:text-white transition-colors'
        >
          <PhotoIcon color={"#525252"} height={20} width={20} />
          Upload Photo
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className='hidden'
          />
        </button>
      </div>
            </Modal>
            <Modal isOpen={isInfoModalOpen} onClose={handleCloseModal} onSave={handleSave} id="Personal Information">

                <UserInfoForm
                    user={user}
                    userProfile={userProfile}
                    formData={formData}
                    setFormData={setFormData}
                    activeSocialField={activeSocialField}
                    setActiveSocialField={setActiveSocialField}
                    cityOptions={cityOptions}
                    setCityOptions={setCityOptions}
                    countryOptions={countryOptions}
                    handleInputChange={handleInputChange}
                    handleSelectChange={handleSelectChange}
                    handleSocialLinkChange={handleSocialLinkChange}
                    toggleSocialField={toggleSocialField}
                    getSocialIconColor={getSocialIconColor}
                    getSocialIconBg={getSocialIconBg}

                />

            </Modal>

        </div>
    )
}

export default ProfilePage
