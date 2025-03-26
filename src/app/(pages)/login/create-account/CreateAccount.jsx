"use client";
import Button from "@/components/common/Button";
import InputField from "@/components/common/InputField";
import SelectField from "@/components/common/SelectField";
import CameraIcon from "@/components/Icons/Camera.svg";
import SearchIcon from "@/components/Icons/SearchIcon.svg";
import UploadIcon from "@/components/Icons/UploadIcon.svg";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Validation Schemas
const FirstStepSchema = z.object({
    firstName: z.string()
      .min(1, { message: "First name is required" })
      .min(2, { message: "First name must be at least 2 characters" }),
    lastName: z.string()
      .min(1, { message: "Last name is required" })
      .min(2, { message: "Last name must be at least 2 characters" }),
    country: z.string({ required_error: "Country is required" }).min(1, "Country is required"),
    city: z.string({ required_error: "City is required" }).min(1, "City is required"),
    email: z.string()
      .min(1, { message: "Email is required" })
      .email({ message: "Invalid email address" }),
    phoneNumber: z.string()
      .min(1, { message: "Phone number is required" })
      .regex(/^\d{10}$/, { message: "Phone number must be 10 digits" })
  });
  const SecondStepSchema = z.object({
    jobTitle: z.string()
      .min(1, { message: "Job title is required" })
      .min(2, { message: "Job title must be at least 2 characters" }),
    yearsOfExperience: z.string()
      .min(1, { message: "Years of experience is required" })
      .regex(/^\d+$/, { message: "Years of experience must be a number" })
      .refine(val => parseInt(val) >= 0 && parseInt(val) <= 50, { message: "Years of experience must be between 0 and 50" }),
    jobCategory: z.string({ required_error: "Job category is required" }).min(1, "Job category is required"),
    subCategory: z.string({ required_error: "Sub category is required" }).min(1, "Sub category is required"),
    availability: z.enum(["immediately", "within_a_month", "partially_available"], {
      errorMap: () => ({ message: "Availability selection is required" })
    }),
    employmentType: z.enum(["full_time", "part_time", "freelancing"], {
      errorMap: () => ({ message: "Employment type selection is required" })
    })
  });
  
  const ThirdStepSchema = z.object({
    selectedSkills: z.array(z.string()).min(3, { message: "Select at least 3 skills" })
  });

const CreateAccount = () => {
  const [step, setStep] = useState("first");
  const [formData, setFormData] = useState({});
  const [completedSteps, setCompletedSteps] = useState([]);

  const countryOptions = [
    { value: "us", label: "United States" },
    { value: "ca", label: "Canada" },
    { value: "uk", label: "United Kingdom" },
    { value: "au", label: "Australia" },
  ];

  const skills = [
    "wireframing", "react", "product management", "ui/ux design", 
    "digital marketing", "node js", "data analysis", "java script", 
    "angular", "python", "C#", ".net", "DevOps", "Next"
  ];

  const FirstStep = () => {
    const { 
      control, 
      handleSubmit, 
      formState: { errors, isValid } 
    } = useForm({
      resolver: zodResolver(FirstStepSchema),
      mode: 'onBlur', // Validate fields when they lose focus
      defaultValues: {
        firstName: "",
        lastName: "",
        country: "",
        city: "",
        email: "",
        phoneNumber: ""
      }
    });

    const onSubmit = (data) => {
      setFormData(prev => ({ ...prev, ...data }));
      setCompletedSteps(prev => [...prev, "first"]);
      setStep("second");
    };

    return (
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <h1 className="text-xl font-medium mb-8 text-3d3">
          Personal Information
        </h1>
        <div className="grid grid-cols-4 gap-6">
          <div className="col-span-1">
            <div className="flex justify-center mb-2 items-center bg-f2f h-[124px] rounded-lg">
              <CameraIcon />
            </div>
            <div className="border border-[#D7D7D7] rounded-lg h-[37px] flex justify-center items-center text-center mont text-sm text-[#A0A0A0]">
              Upload Image
            </div>
          </div>
          <div className="col-span-3 flex flex-col gap-4">
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <InputField
                  {...field}
                  label="First Name"
                  placeholder="Enter First Name"
                  error={errors.firstName?.message}
                  onBlur={field.onBlur}
                />
              )}
            />
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <InputField
                  {...field}
                  label="Last Name"
                  placeholder="Enter Last Name"
                  error={errors.lastName?.message}
                  onBlur={field.onBlur}
                />
              )}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Controller
            name="country"
            control={control}
            render={({ field }) => (
              <SelectField
                {...field}
                label="Country"
                options={countryOptions}
                error={errors.country?.message}
                onBlur={field.onBlur}
              />
            )}
          />
          <Controller
            name="city"
            control={control}
            render={({ field }) => (
              <SelectField
                {...field}
                label="City"
                options={countryOptions}
                error={errors.city?.message}
                onBlur={field.onBlur}
              />
            )}
          />
        </div>

        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <InputField
              {...field}
              label="Email"
              placeholder="Enter Email"
              error={errors.email?.message}
              onBlur={field.onBlur}
            />
          )}
        />

        <div className="flex flex-col gap-3">
          <label htmlFor="Phone" className="text-525 text-center leading-none">
            Phone
          </label>
          <div className="flex gap-4">
            <div className="h-12 px-4 flex justify-center gap-2 items-center border-[0.5px] border-[#BDBDBD] rounded-md">
              <img src="/assets/flag.png" alt="" />{" "}
              <span className="text-sm text-[#989898]">+02</span>
            </div>
            <Controller
              name="phoneNumber"
              control={control}
              render={({ field: { ref, ...field } }) => (
                <div className="flex-1 flex flex-col">
                  <input
                    {...field}
                    type="text"
                    placeholder="Enter Phone Number"
                    ref={ref}
                    onBlur={field.onBlur}
                    className={`h-12 px-4 rounded-md border-[#BDBDBD] placeholder:text-[#989898] border-[0.5px] ${
                      errors.phoneNumber ? 'border-red-500' : ''
                    }`}
                  />
                  {errors.phoneNumber && (
                    <p className="text-red-500 text-sm mt-1">{errors.phoneNumber.message}</p>
                  )}
                </div>
              )}
            />
          </div>
        </div>
        <Button
          type="submit"
          label="Next"
          className="self-end bg-green text-white"
          disabled={!isValid}
        />
      </form>
    );
  };

  const SecondStep = () => {
    const { 
      control, 
      handleSubmit, 
      formState: { errors, isValid } 
    } = useForm({
      resolver: zodResolver(SecondStepSchema),
      mode: 'onBlur', // Validate fields when they lose focus
      defaultValues: {
        jobTitle: "",
        yearsOfExperience: "",
        jobCategory: "",
        subCategory: "",
        availability: undefined,
        employmentType: undefined
      }
    });

    const onSubmit = (data) => {
      setFormData(prev => ({ ...prev, ...data }));
      setCompletedSteps(prev => [...prev, "second"]);
      setStep("third");
    };

    return (
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <h1 className="text-xl font-medium mb-8 text-3d3">
          Professional Information
        </h1>
        <div className="flex flex-col gap-3">
          <label htmlFor="Phone" className="text-525 leading-none">
            Add Resume
          </label>
          <div className="h-[56px] px-3 bg-[#F6F6F6] rounded-md flex justify-center gap-2 items-center">
            <div className="h-10 px-4 flex justify-center gap-2 bg-white items-center border-[0.5px] border-[#BDBDBD] rounded-md">
              <UploadIcon />{" "}
              <span className="text-sm text-[#989898]">Upload CV</span>
            </div>
            <input
              type="text"
              placeholder="No File Chosen"
              className="h-12 px-4 flex-1 rounded-md placeholder:text-[#989898]"
              disabled
            />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Controller
            name="jobTitle"
            control={control}
            render={({ field }) => (
              <InputField
                {...field}
                label="Job Title"
                placeholder="Enter Job Title"
                error={errors.jobTitle?.message}
                onBlur={field.onBlur}
              />
            )}
          />
          <Controller
            name="yearsOfExperience"
            control={control}
            render={({ field }) => (
              <InputField
                {...field}
                label="Years of Experience"
                placeholder="Enter Years of Experience"
                error={errors.yearsOfExperience?.message}
                onBlur={field.onBlur}
              />
            )}
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Controller
            name="jobCategory"
            control={control}
            render={({ field }) => (
              <SelectField
                {...field}
                label="Job Category"
                options={countryOptions}
                error={errors.jobCategory?.message}
                onBlur={field.onBlur}
              />
            )}
          />
          <Controller
            name="subCategory"
            control={control}
            render={({ field }) => (
              <SelectField
                {...field}
                label="Sub Category"
                options={countryOptions}
                error={errors.subCategory?.message}
                onBlur={field.onBlur}
              />
            )}
          />
        </div>

        <div className="flex flex-col gap-3">
          <h1 className="text-525 leading-none capitalize">
            When are you available to work?
          </h1>
          <Controller
            name="availability"
            control={control}
            render={({ field }) => (
              <>
                <div className="flex gap-2.5">
                  {["immediately", "within_a_month", "partially_available"].map((option) => (
                    <div 
                      key={option}
                      onClick={() => field.onChange(option)}
                      onBlur={field.onBlur}
                      className={`h-[44px] px-4 rounded-full border flex justify-center items-center cursor-pointer ${
                        field.value === option 
                          ? 'bg-green text-white' 
                          : 'text-[#989898] border-[#BDBDBD]'
                      }`}
                    >
                      {option.replace('_', ' ')}
                    </div>
                  ))}
                </div>
                {errors.availability && (
                  <p className="text-red-500 text-sm mt-1">{errors.availability.message}</p>
                )}
              </>
            )}
          />
        </div>
        <div className="flex flex-col gap-3">
          <h1 className="text-525 leading-none capitalize">
            What employment type do you prefer?
          </h1>
          <Controller
            name="employmentType"
            control={control}
            render={({ field }) => (
              <>
                <div className="flex gap-2.5">
                  {["full_time", "part_time", "freelancing"].map((option) => (
                    <div 
                      key={option}
                      onClick={() => field.onChange(option)}
                      onBlur={field.onBlur}
                      className={`h-[44px] px-4 rounded-full border flex justify-center items-center cursor-pointer ${
                        field.value === option 
                          ? 'bg-green text-white' 
                          : 'text-[#989898] border-[#BDBDBD]'
                      }`}
                    >
                      {option.replace('_', ' ')}
                    </div>
                  ))}
                </div>
                {errors.employmentType && (
                  <p className="text-red-500 text-sm mt-1">{errors.employmentType.message}</p>
                )}
              </>
            )}
          />
        </div>
        <div className="flex justify-between items-center mt-4">
          <Button
            type="button"
            label="Back"
            onClick={() => setStep("first")}
            className="border-green bg-white border text-green"
          />
          <Button
            type="submit"
            label="Next"
            className="bg-green text-white"
            disabled={!isValid}
          />
        </div>
      </form>
    );
  };

  const ThirdStep = () => {
    const { 
      control, 
      handleSubmit, 
      formState: { errors, isValid } 
    } = useForm({
      resolver: zodResolver(ThirdStepSchema),
      mode: 'onChange',
      defaultValues: { 
        selectedSkills: [] 
      }
    });

    const router = useRouter();

    const onSubmit = (data) => {
      // Final form submission logic
      const completeFormData = { ...formData, ...data };
      console.log('Complete Form Data:', completeFormData);
      setCompletedSteps(prev => [...prev, "third"]);
      router.push("/");
    };

    return (
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div>
          <h1 className="text-xl font-medium mb-2 text-3d3">
            Professional Information
          </h1>
          <p className="capitalize text-525 mb-10">select at least 3 skills</p>
        </div>
        <div className="border-[#0000001A] border py-3 px-4 flex items-center gap-2 rounded-md">
          <SearchIcon />
          <input
            type="text"
            className="border-none outline-0 focus:outline-0 placeholder:text-[#939393] flex-1"
            placeholder="Search"
          />
        </div>
        <Controller
          name="selectedSkills"
          control={control}
          render={({ field }) => (
            <>
              <div className="border border-[#BDBDBD] rounded-md p-6 grid grid-cols-1 lg:grid-cols-2 gap-6 h-full max-h-[484px] overflow-y-auto">
                {skills.map((skill) => (
                  <div 
                    key={skill}
                    onClick={() => {
                      const currentSkills = field.value || [];
                      const newSkills = currentSkills.includes(skill)
                        ? currentSkills.filter(s => s !== skill)
                        : [...currentSkills, skill];
                      field.onChange(newSkills);
                    }}
                    onBlur={field.onBlur}
                    className={`border border-[#BDBDBD] p-4 rounded-md mont text-sm cursor-pointer ${
                      field.value?.includes(skill) 
                        ? 'bg-green text-white' 
                        : 'bg-[#FAFAFA] text-[#888888]'
                    }`}
                  >
                    {skill}
                  </div>
                ))}
              </div>
              {errors.selectedSkills && (
                <p className="text-red-500 text-sm mt-1">{errors.selectedSkills.message}</p>
              )}
            </>
          )}
        />
        <div className="flex justify-between items-center mt-4">
          <Button
            type="button"
            label="Back"
            onClick={() => setStep("second")}
            className="border-green bg-white border text-green"
          />
          <Button
            type="submit"
            label="Start"
            className="bg-green text-white"
            disabled={!isValid}
          />
        </div>
      </form>
    );
  };

  return (
    <div className="bg-bggreen overflow-y-auto py-12 px-6">
      <div className="w-full max-w-[862px] mx-auto flex flex-col justify-center items-center">
        <div className="flex items-center">
          <div
            onClick={() => setStep("first")}
            className={`cursor-pointer h-12 w-12 rounded-full flex items-center justify-center mont text-2xl font-medium ${
              step === "first" || completedSteps.includes("first") 
                ? "bg-green text-white" 
                : "bg-e5e text-525"
            }`}
          >
            1
          </div>
          <hr
            className={`${
              completedSteps.includes("first") ? "border-green" : "border-e5e"
            } border-t-6 w-[100px]`}
          />
          <div
            onClick={() => (completedSteps.includes("first") || step !== "first") && setStep("second")}
            className={`cursor-pointer h-12 w-12 rounded-full flex items-center justify-center mont text-2xl font-medium ${
              step === "second" || completedSteps.includes("second") || step === "third"
                ? "bg-green text-white"
                : "bg-e5e text-525"
            } ${!(completedSteps.includes("first") || step !== "first") ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            2
          </div>
          <hr
            className={`border-t-6 ${
              completedSteps.includes("second") ? "border-green" : "border-e5e"
            } w-[100px]`}
          />
          <div
            onClick={() => (completedSteps.includes("second") || step === "third") && setStep("third")}
            className={`cursor-pointer h-12 w-12 rounded-full flex items-center justify-center mont text-2xl font-medium ${
              step === "third" || completedSteps.includes("third")
                ? "bg-green text-white" 
                : "bg-e5e text-525"
            } ${!(completedSteps.includes("second") || step === "third") ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            3
          </div>
        </div>

        <div className="pt-8 pb-8 bg-white mt-6 px-10 rounded-3xl shad w-full flex flex-col gap-4">
          {step === "first" && <FirstStep />}
          {step === "second" && <SecondStep />}
          {step === "third" && <ThirdStep />}
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;