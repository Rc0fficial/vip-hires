'use client'
import CheckboxButton from '@/components/common/CheckBoxButton';
import InputField from '@/components/common/InputField';
import Modal from '@/components/common/Modal';
import SelectField from '@/components/common/SelectField';
import AddIcon from '@/components/Icons/AddIcon.svg';
import EditIcon from '@/components/Icons/EditIcon.svg'
import React, { useState } from 'react'

const Education = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentEditId, setCurrentEditId] = useState(null);
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

    const countryOptions = [
        { value: 'accounting', label: 'Accounting' },
        { value: 'computer_science', label: 'Computer Science' },
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
            const educationToEdit = educations.find(edu => edu.id === editId);
            setFormData({
                university: educationToEdit.university,
                fieldOfStudy: educationToEdit.degree.split(',')[1]?.trim() || '',
                degree: educationToEdit.degree.split('-')[0]?.trim() || '',
                grade: educationToEdit.grade,
                startYear: educationToEdit.years.split(' - ')[0],
                endYear: educationToEdit.years.split(' - ')[1]
            });
            setIsEditing(true);
            setCurrentEditId(editId);
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

    const handleSelectChange = (name, value) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = () => {
        const newEducation = {
            id: isEditing ? currentEditId : Date.now(),
            university: formData.university,
            degree: `${formData.degree} - ${formData.fieldOfStudy}`,
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

        handleCloseModal();
    };

    const handleDelete = (id) => {
        setEducations(educations.filter(edu => edu.id !== id));
    };

    return (
        <div className='rounded-2xl bg-white p-10'>
            <div className='flex justify-between gap-6 items-start'>
                <div>
                    <h1 className='capitalize text-[28px] font-semibold text-3d3'>Education</h1>
                    <p className='text-989 mb-6'>
                        Showcase your academic background, degrees, and achievements to strengthen your profile.
                    </p>
                </div>
                <div className='flex items-center gap-4'>
                    <button onClick={() => handleOpenModal()}>
                        <AddIcon color="#707070" height={24} width={24} className="cursor-pointer" />
                    </button>
                </div>
            </div>
{/* 
            {educations.map((education) => (
                <div key={education.id} className='flex justify-between items-center mb-6 group relative'>
                    <div className='flex items-center gap-6'>
                        <div className='h-[108px] shad flex justify-center items-center w-[108px] rounded-full'>
                            <img src={education.logo} alt="University logo" className="max-w-[80%] max-h-[80%]" />
                        </div>
                        <div>
                            <h1 className='capitalize text-lg leading-[36px] text-525 font-medium'>
                                {education.university}
                            </h1>
                            <p className='text-989 text-sm capitalize leading-[36px]'>
                                {education.degree}
                            </p>
                            <p className='capitalize text-989 text-sm leading-[36px]'>
                                Grade: {education.grade}
                            </p>
                        </div>
                    </div>
                    <div className='flex items-center gap-4'>
                        <h1 className='capitalize text-989 text-sm leading-[36px]'>
                            ({education.years})
                        </h1>
                        <button 
                            onClick={() => handleOpenModal(education.id)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <EditIcon color="#707070" height={24} width={24} className="cursor-pointer" />
                        </button>
                    </div>
                </div>
            ))} */}
  <img src="/assets/education.png" alt="" className="h-[190px] w-[214px] mx-auto" />
      <h1 className='text-center ant text-[32px] text-green'>Add Your Education</h1>
      <p className='text-gray mt-2 text-center '>Showcase your qualifications and stand out to top employers. Add your education details now to unlock better job opportunities</p>
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
                    />

                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                        <SelectField
                            label="Field of Study"
                            value={formData.fieldOfStudy}
                            onChange={(value) => handleSelectChange('fieldOfStudy', value)}
                            options={countryOptions}
                            name="fieldOfStudy"
                        />
                        <SelectField
                            label="Degree"
                            value={formData.degree}
                            onChange={(value) => handleSelectChange('degree', value)}
                            options={degreeOptions}
                            name="degree"
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
                        />
                        <InputField
                            label="End Year (or expected)"
                            placeholder="YYYY"
                            value={formData.endYear}
                            onChange={handleInputChange}
                            type="text"
                            name="endYear"
                        />
                    </div>

                    <InputField
                        label="Grade"
                        placeholder="Enter your grade"
                        value={formData.grade}
                        onChange={handleInputChange}
                        type="text"
                        name="grade"
                    />
                </div>
            </Modal>
        </div>
    )
}

export default Education;