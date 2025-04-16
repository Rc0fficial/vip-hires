'use client'
import StarIcon from '@/components/Icons/StarIcon'
import React, { useState } from "react";
import { IoCheckbox, IoCheckboxOutline } from "react-icons/io5";
const options = [
    { label: "Copy The Exact Content" },
    { label: "Use The Same Tone & Writing Style", checked: true },
    { label: "Follow The Same Structure & Format" },
    { label: "Use Similar Visuals/Media Elements", checked: true },
    { label: "Include The Same Hashtags" },
    { label: "Take Inspiration (Completely New Content)" },
];
const CreatePost = () => {
    const [selected, setSelected] = useState(
        options.map((option) => option.checked || false)
    );

    const toggleOption = (index) => {
        setSelected((prev) => {
            const newSelection = [...prev];
            newSelection[index] = !newSelection[index];
            return newSelection;
        });
    };
    return (
        <div className="bg-bggreen relative">
            <div className="bg-bggreen overflow-y-auto px-4 md:px-16  mx-auto ">
                <div className="col-span-2 rounded-3xl shad bg-white py-10 my-10 px-4 md:px-12 h-fit">
                    <h1 className='flex items-center gap-3 md:text-2xl mb-10  font-semibold'><StarIcon height={24} width={24} color={"#000000"} /> Create Similar Post</h1>

                    <h1 className='md:text-xl font-semibold text-525'>Add Reference Post</h1>
                    <p className='text-989 text-sm md:text-[16px] mt-2'>Upload an image, paste a link, or add the text of the post you want us to recreate. </p>

                    <textarea name="" className='border mt-6 mb-10 border-[#EFEFEF] text-sm md:text-[16px] p-3 md:p-6 rounded-md h-[251px] w-full placeholder:text-989' placeholder='Enter Post Body' id=""></textarea>


                    <h1 className='md:text-xl font-semibold text-525'>Customize Your New Post: Choose What to Keep from the Reference</h1>
                    <p className='text-989 text-sm md:text-[16px] mt-2 mb-6'>Choose which elements of the reference post you want to keep or modify. Select the options that best match your preferences to guide the post creation process. </p>
                    <div className='border border-[#EFEFEF] p-3 md:p-6 rounded-md'>

                        <div>
                            <h1 className='md:text-lg font-semibold text-525'>Customize Your New Post: Choose What to Keep from the Reference</h1>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6  md:p-4 border-b border-[#EFEFEF]">
                                {options.map((option, index) => (
                                    <button
                                        key={index}
                                        className={`flex items-center gap-2 text-xs md:text-sm font-medium px-4 py-2  rounded-md transition-all duration-200  ${selected[index] ? "text-green " : "text-gray-500 "
                                            }`}
                                        onClick={() => toggleOption(index)}
                                    >
                                        {selected[index] ? (
                                            <IoCheckbox className="min-w-5 min-h-5 text-green" />
                                        ) : (
                                            <IoCheckboxOutline className="min-w-5 min-h-5 text-989" />
                                        )}
                                        {option.label}
                                    </button>
                                ))}
                            </div>

                            <h1 className='md:text-lg font-semibold text-525'>Customization Text Field</h1>
                            <textarea name="" className='border mt-6 text-sm md:text-[16px] border-[#EFEFEF] p-3 md:p-6 rounded-md h-[251px] w-full placeholder:text-989' placeholder='Anything specific you`d like to change' id=""></textarea>
                        </div>

                    </div>
                    <div className="flex justify-between gap-2 mt-8">
                        <button
                            className="px-4 py-1.5 md:py-2 border text-nowrap border-green text-green text-sm  md:text-lg font-semibold w-full max-w-[200px] rounded-md"

                        >
                            Save Draft
                        </button>
                        <button
                            className="px-4 py-1.5 md:py-2.5 text-nowrap bg-green text-white w-full max-w-[200px] rounded-md text-sm  md:text-lg font-semibold"

                        >
                            Submit Request
                        </button>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default CreatePost
