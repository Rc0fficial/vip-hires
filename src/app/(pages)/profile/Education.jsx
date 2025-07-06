'use client'
import { checkUserStatus } from '@/app/Store/ReduxSlice/authSlice';
import { getAuthHeaders } from '@/app/utils/authHeader';
import CheckboxButton from '@/components/common/CheckBoxButton';
import InputField from '@/components/common/InputField';
import Modal from '@/components/common/Modal';
import SelectField from '@/components/common/SelectField';
import AddIcon from '@/components/Icons/AddIcon.svg';
import EditIcon from '@/components/Icons/EditIcon.svg'
import TrashIcon from '@/components/Icons/TrashIcon.svg';
import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';

const Education = ({ user, userProfile }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentEditId, setCurrentEditId] = useState(null);
    const dispatch = useDispatch()
    const [educations, setEducations] = useState([
        {
            id: 1,
            university: 'Ain Shams University',
            degree: 'Bachelor of Commerce - BCom, Accounting',
            grade: 'good',
            years: '2018 - 2021',
            logo: '/assets/uniLogo.png'
        }
    ]);

    const [formData, setFormData] = useState({
        university: '',
        fieldOfStudy: '',
        degree: '',
        grade: '',
        startYear: '',
        endYear: ''
    });
    const [errors, setErrors] = useState({
        university: false,
        fieldOfStudy: false,
        degree: false,
        grade: false,
        startYear: false,
        endYear: false
    });
    const countryOptions = [
        { value: 'accounting', label: 'Accounting' },
        { value: 'computer science', label: 'Computer Science' },
        { value: 'business', label: 'Business Administration' },
        { value: 'engineering', label: 'Engineering' },
    ];

    const degreeOptions = [
        { value: 'bachelor', label: 'Bachelor' },
        { value: 'master', label: 'Master' },
        { value: 'phd', label: 'PhD' },
        { value: 'diploma', label: 'Diploma' },
    ];
    const handleOpenModal = (editId = null) => {
        if (editId) {
            // Find the education in userProfile.user_educations
            const educationToEdit = userProfile.user_educations.find(edu => edu.documentId === editId);
            if (educationToEdit) {
                setFormData({
                    university: educationToEdit.universityName || '',
                    fieldOfStudy: educationToEdit.fieldOfStudy || '',
                    degree: educationToEdit.degree || '',
                    grade: educationToEdit.grades || '',
                    startYear: educationToEdit.startYear || '',
                    endYear: educationToEdit.endYear || ''
                });
                setIsEditing(true);
                setCurrentEditId(editId);
            }
        } else {
            setFormData({
                university: '',
                fieldOfStudy: '',
                degree: '',
                grade: '',
                startYear: '',
                endYear: ''
            });
            setIsEditing(false);
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };



    const handleSave = async () => {
        // Validate all fields
        const newErrors = {
            university: !formData.university,
            fieldOfStudy: !formData.fieldOfStudy,
            degree: !formData.degree,
            grade: !formData.grade,
            startYear: !formData.startYear,
            endYear: !formData.endYear
        };

        setErrors(newErrors);

        if (Object.values(newErrors).some(error => error)) {
            return;
        }

        const payload = {
            universityName: formData.university,
            fieldOfStudy: formData.fieldOfStudy,
            degree: formData.degree,
            startYear: formData.startYear,
            endYear: formData.endYear,
            grades: formData.grade,
            profile: user?.profile?.id
        };

        try {
            if (isEditing) {
                // Update existing education
                const response = await axios.put(
                    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/user-educations/${currentEditId}`,
                    { data: payload },
                    getAuthHeaders()
                );
                console.log('Update response:', response);
            } else {
                // Create new education
                const response = await axios.post(
                    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/user-educations`,
                    { data: payload },
                    getAuthHeaders()
                );
                console.log('Create response:', response);
            }

            // Update local state
            const newEducation = {
                id: isEditing ? currentEditId : Date.now(),
                university: formData.university,
                degree: formData.degree,
                fieldOfStudy: formData.fieldOfStudy,
                grade: formData.grade,
                years: `${formData.startYear} - ${formData.endYear}`,
                logo: '/assets/uniLogo.png'
            };

            if (isEditing) {
                setEducations(educations.map(edu =>
                    edu.id === currentEditId ? newEducation : edu
                ));
            } else {
                setEducations([...educations, newEducation]);
            }
            dispatch(checkUserStatus())
            handleCloseModal();
        } catch (error) {
            console.error('Error saving education:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(
                `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/user-educations/${id}`,
                getAuthHeaders()
            );
            dispatch(checkUserStatus())
            setEducations(educations.filter(edu => edu.id !== id));
        } catch (error) {
            console.error('Error deleting education:', error);
        }
    };

    return (
        <div className='rounded-2xl bg-white p-4 lg:p-10'>
            <div className='flex justify-between gap-6 items-start'>
                <div>
                    <h1 className='capitalize md:text-[28px] font-semibold text-3d3'>Education</h1>
                    <p className='text-989 mb-6 text-xs md:text-[16px]'>
                        Showcase your academic background, degrees, and achievements to strengthen your profile.
                    </p>
                </div>
                <div className='flex flex-1 items-center gap-4'>
                    <button onClick={() => handleOpenModal()}>
                        <AddIcon color="#707070" height={24} width={24} className="cursor-pointer" />
                    </button>
                </div>
            </div>
            {userProfile?.user_educations?.length > 0 ?

                <>

                    {userProfile?.user_educations?.map((education) => (
                        <div key={education.id} className='flex justify-between items-center mb-6 group relative'>
                            <div className='flex items-center gap-6'>
                                <div className='h-[108px] shad flex justify-center items-center w-[108px] rounded-full'>
                                    <img src='/assets/uniLogo.png' alt="University logo" className="max-w-[80%] max-h-[80%]" />
                                </div>
                                <div>
                                    <h1 className='capitalize text-lg leading-[36px] text-525 font-medium'>
                                        {education?.universityName}
                                    </h1>
                                    <p className='text-989 text-sm capitalize leading-[36px]'>
                                        {education?.degree} {education?.fieldOfStudy}
                                    </p>
                                    <p className='capitalize text-989 text-sm leading-[36px]'>
                                        Grade: {education?.grades}
                                    </p>
                                </div>
                            </div>
                            <div className='flex items-center gap-4'>
                                <h1 className='capitalize text-989 text-sm leading-[36px]'>
                                    ({education?.startYear}-{education?.endYear})
                                </h1>
                                <button
                                    onClick={() => handleOpenModal(education.documentId)}
                                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <EditIcon color="#707070" height={24} width={24} className="cursor-pointer" />
                                </button>
                                <button
                                    onClick={() => handleDelete(education.documentId)}
                                    className="opacity-0 group-hover:opacity-100 transition-opacity "
                                >
                                    <TrashIcon color="#707070" height={24} width={24} className="cursor-pointer" />

                                </button>
                            </div>
                        </div>
                    ))}

                </> :
                <div onClick={() => handleOpenModal()}>
                    <img src="/assets/education.png" alt="" className="h-[190px] w-[214px] mx-auto" />
                    <h1 className='text-center ant md:text-[32px] text-green'>Add Your Education</h1>
                    <p className='text-gray mt-2 text-center text-xs md:text-[16px] '>Showcase your qualifications and stand out to top employers. Add your education details now to unlock better job opportunities</p>
                </div>
            }
            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSave={handleSave}
                id="education-modal"
                title={isEditing ? "Edit Education" : "Add Education"}
            >
                <div className='flex flex-col gap-6'>
                    <InputField
                        label="University/Institution Name"
                        placeholder="Enter university name"
                        value={formData.university}
                        onChange={handleInputChange}
                        type="text"
                        name="university"
                        required
                        error={errors.university ? "University name is required" : ""}
                    />

                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                        <SelectField
                            label="Field of Study"
                            value={formData.fieldOfStudy}
                            options={countryOptions}
                            name="fieldOfStudy"
                            onChange={(e) => handleInputChange(e)}
                            error={errors.fieldOfStudy ? "Field of study is required" : ""}
                        />
                        <SelectField
                            label="Degree"
                            value={formData.degree}
                            options={degreeOptions}
                            name="degree"
                            onChange={(e) => handleInputChange(e)}
                            error={errors.degree ? "Degree is required" : ""}
                        />
                    </div>

                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                        <InputField
                            label="Start Year"
                            placeholder="YYYY"
                            value={formData.startYear}
                            onChange={handleInputChange}
                            type="text"
                            name="startYear"
                            required
                            error={errors.startYear ? "Start year is required" : ""}
                        />
                        <InputField
                            label="End Year (or expected)"
                            placeholder="YYYY"
                            value={formData.endYear}
                            onChange={handleInputChange}
                            type="text"
                            name="endYear"
                            required
                            error={errors.endYear ? "End year is required" : ""}
                        />
                    </div>

                    <InputField
                        label="Grade"
                        placeholder="Enter your grade"
                        value={formData.grade}
                        onChange={handleInputChange}
                        type="text"
                        name="grade"
                        required
                        error={errors.grade ? "Grade is required" : ""}
                    />
                </div>
            </Modal>
        </div>
    )
}

export default Education;