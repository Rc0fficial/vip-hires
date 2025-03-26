'use client'
import Button from '@/components/common/Button';
import SearchIcon from '@/components/Icons/SearchIcon.svg';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

const ThirdStep = ({ setStep }) => {
    const router = useRouter();
    const allSkills = [
        "wireframing",
        "react",
        "product management",
        "ui/ux design",
        "digital marketing",
        "node js",
        "data analysis",
        "java script",
        "angular",
        "python",
        "C#",
        ".net",
        "DevOps",
        "Next",
    ];

    const [selectedSkills, setSelectedSkills] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredSkills, setFilteredSkills] = useState(allSkills);
    const [isValid, setIsValid] = useState(false);

    // Filter skills based on search term
    useEffect(() => {
        const filtered = allSkills.filter(skill =>
            skill.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredSkills(filtered);
    }, [searchTerm]);

    // Validate that at least 3 skills are selected
    useEffect(() => {
        setIsValid(selectedSkills.length >= 3);
    }, [selectedSkills]);

    const handleSkillClick = (skill) => {
        setSelectedSkills(prev =>
            prev.includes(skill)
                ? prev.filter(s => s !== skill) // Remove if already selected
                : [...prev, skill] // Add if not selected
        );
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSubmit = () => {
        if (isValid) {
            console.log("Selected Skills:", selectedSkills);
            router.push('/');
        }
    };

    return (
        <>
            <div>
                <h1 className='text-xl font-medium mb-2 text-3d3'>Professional Information</h1>
                <p className='capitalize text-525 mb-10'>Select at least 3 skills</p>
            </div>
            
            {/* Search Bar */}
            <div className='border-[#0000001A] border py-3 px-4 flex items-center gap-2 rounded-md mb-6'>
                <SearchIcon />
                <input 
                    type="text" 
                    className='border-none outline-0 focus:outline-0 placeholder:text-[#939393] flex-1' 
                    placeholder='Search' 
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>

            {/* Skills Grid */}
            <div className='border border-[#BDBDBD] rounded-md p-6 grid grid-cols-1 lg:grid-cols-2 gap-6 h-full max-h-[484px] overflow-y-auto'>
                {filteredSkills.map((skill, i) => (
                    <div 
                        key={i}
                        className={`border border-[#BDBDBD] p-4 rounded-md mont text-sm cursor-pointer transition-colors ${
                            selectedSkills.includes(skill)
                                ? 'bg-green text-white'
                                : 'bg-[#FAFAFA] text-[#888888] hover:bg-gray-100'
                        }`}
                        onClick={() => handleSkillClick(skill)}
                    >
                        {skill}
                    </div>
                ))}
            </div>

            {/* Selected Skills Count */}
            <div className='mt-4 text-sm text-[#888888]'>
                {selectedSkills.length} skills selected (Minimum 3 required)
            </div>

            {/* Navigation Buttons */}
            <div className='flex justify-between items-center mt-4'>
                <Button
                    label="Back"
                    onClick={() => setStep("second")}
                    className="border-green bg-white border text-green"
                />
                <Button
                    label="Start"
                    onClick={handleSubmit}
                    disabled={!isValid}
                    className={`${isValid ? 'bg-green' : 'bg-gray-300'} text-white`}
                />
            </div>
        </>
    );
};

export default ThirdStep;