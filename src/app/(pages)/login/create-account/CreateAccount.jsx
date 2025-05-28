"use client";
import Button from "@/components/common/Button";
import InputField from "@/components/common/InputField";
import SelectField from "@/components/common/SelectField";
import CameraIcon from "@/components/Icons/Camera.svg";
import SearchIcon from "@/components/Icons/SearchIcon.svg";
import UploadIcon from "@/components/Icons/UploadIcon.svg";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import LinkedinIcon from "@/components/Icons/LinkedinIcon.svg";
import BehanceIcon from "@/components/Icons/BehanceIcon.svg";
import DribbbleIcon from "@/components/Icons/DribbbleIcon.svg";
import MediumIcon from "@/components/Icons/MediumIcon.svg";
import GithupIcon from "@/components/Icons/GithupIcon.svg";
import StackOverflowIcon from "@/components/Icons/StackOverflowIcon.svg";
import KaggleIcon from "@/components/Icons/KaggleIcon.svg";
import UrlIcon from "@/components/Icons/UrlIcon.svg";
import PhoneInputField from "@/components/PhoneInputField";
import { countryData } from "@/app/utils/countries";
import { useDispatch, useSelector } from "react-redux";
import { checkUserStatus } from "@/app/Store/ReduxSlice/authSlice";
import axios from "axios";
import { uploadFileToStrapi } from "@/app/utils/strapiUpload";
import { fetchCategories, getCategoriesStatus, selectAllCategories } from "@/app/Store/ReduxSlice/categoriesSlice";

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
    .regex(/^\+?[0-9\s\-\(\)]{10,}$/, {
      message: "Invalid phone number format"
    }),
  profileImage: z.instanceof(File, { message: "Profile image is required" })
    .refine(file => file.size <= 5 * 1024 * 1024, {
      message: "Image must be less than 5MB"
    })
    .refine(file => ['image/jpeg', 'image/png', 'image/gif'].includes(file.type), {
      message: "Only .jpg, .png, and .gif formats are supported"
    })
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
  // jobCategoryId: z.string().optional(), // Add this field to store the category ID
  subCategory: z.string({ required_error: "Sub category is required" }).min(1, "Sub category is required"),
  availability: z.enum(["immediately", "within_a_month", "partially_available"], {
    errorMap: () => ({ message: "Availability selection is required" })
  }),
  employmentType: z.enum(["full_time", "part_time", "freelancing"], {
    errorMap: () => ({ message: "Employment type selection is required" })
  }),
  preferedWork: z.enum(["Remotely", "on_site", "Hybrid"], {
    errorMap: () => ({ message: "Prefer work selection is required" })
  }),
  resume: z.instanceof(File).optional()
    .refine(file => !file || (file && ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type)),
      { message: "Only PDF, DOC, and DOCX files are allowed" }),
  socialLinks: z.record(z.string().url().or(z.literal(''))).optional()
});

const ThirdStepSchema = z.object({
  selectedSkills: z.array(z.string()).min(3, { message: "Select at least 3 skills" })
});

const CreateAccount = () => {
  const [step, setStep] = useState("first");
  const [formData, setFormData] = useState({});
  const [completedSteps, setCompletedSteps] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  // Convert country data to options format
  const countryOptions = Object.keys(countryData).map(country => ({
    value: country,
    label: country
  }));


  const skills = [
    "wireframing", "react", "product management", "ui/ux design",
    "digital marketing", "node js", "data analysis", "java script",
    "angular", "python", "C#", ".net", "DevOps", "Next"
  ];

  const FirstStep = () => {
    const {
      control,
      handleSubmit,
      formState: { errors, isValid },
      setValue,
      watch
    } = useForm({
      resolver: zodResolver(FirstStepSchema),
      mode: 'onBlur',
      defaultValues: {
        firstName: "",
        lastName: "",
        country: "",
        city: "",
        email: "",
        phoneNumber: "",
        profileImage: null // Add profileImage to form data
      }
    });
    const [previewImage, setPreviewImage] = useState(null);
    const profileImage = watch("profileImage");
    const { user, isAuthenticated } = useSelector((state) => state.auth);
    // console.log(user, isAuthenticated)
    const dispatch = useDispatch()
    useEffect(() => {
      dispatch(checkUserStatus())

    }, [])
    const handleImageUpload = (e) => {
      const file = e.target.files[0];
      if (file) {
        // Set the actual File object for validation
        setValue("profileImage", file, { shouldValidate: true });

        // Create preview URL separately (store in state if needed)
        const reader = new FileReader();
        reader.onloadend = () => {
          // Use this for preview only
          setPreviewImage(reader.result); // You'll need a state for this
        };
        reader.readAsDataURL(file);
      }
    };
    // Watch country value to update cities
    const selectedCountry = watch("country");

    // Memoize city options to prevent unnecessary recalculations
    const cityOptions = useMemo(() => {
      if (!selectedCountry) return [];
      const cities = countryData[selectedCountry] || [];
      return cities.map(city => ({
        value: city,
        label: city
      }));
    }, [selectedCountry]);

    // Update city field when country changes
    useEffect(() => {
      if (selectedCountry) {
        setValue("city", "");
      }
    }, [selectedCountry, setValue]);

    const onSubmit = (data) => {
      console.log("Form data before submission:", data);
      setFormData(prev => ({ ...prev, ...data }));
      setCompletedSteps(prev => [...prev, "first"]);
      setStep("second");
    };
    console.log(errors)

    return (
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <h1 className="md:text-xl font-medium mb-8 text-3d3">
          Personal Information
        </h1>
        <div className="grid grid-cols-4 gap-6">
          <div className="col-span-4 md:col-span-1">
            <label htmlFor="profileImageUpload" className="cursor-pointer">
              <div className="flex justify-center mb-2 items-center bg-f2f h-[124px] rounded-lg overflow-hidden">
                {previewImage || profileImage ? (
                  <img
                    src={previewImage || profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <CameraIcon />
                )}
              </div>
              <div className="border border-[#D7D7D7] rounded-lg h-[37px] flex justify-center items-center text-center mont text-sm text-[#A0A0A0]">
                Upload Image
              </div>
              <input
                id="profileImageUpload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>
          <div className="col-span-4 md:col-span-3 flex flex-col gap-4">
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
                options={cityOptions}
                isDisabled={!selectedCountry}
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
          <Controller
            name="phoneNumber"
            control={control}
            rules={{
              required: 'Phone number is required',
              validate: (value) => validatePhoneNumber(value) || 'Invalid phone number'
            }}
            render={({ field: { onChange, value } }) => (
              <PhoneInputField
                value={value}
                onChange={onChange}
                label="Phone"
                error={errors.phoneNumber?.message}
                className="w-full"
              />
            )}
          />
        </div>
        <Button
          type="submit"
          label="Next"
          className="self-end bg-green text-white"
        // disabled={!isValid}
        />
      </form>
    );
  };

  const SecondStep = () => {
    const dispatch = useDispatch();
    const categories = useSelector(selectAllCategories);
    const status = useSelector(getCategoriesStatus);

    // Fetch categories on component mount
    useEffect(() => {
      if (status === 'idle') {
        dispatch(fetchCategories());
      }
    }, [status, dispatch]);
    const {
      control,
      handleSubmit,
      formState: { errors, isValid },
      setValue,
      watch
    } = useForm({
      resolver: zodResolver(SecondStepSchema),
      mode: 'onBlur',
      defaultValues: {
        jobTitle: "",
        yearsOfExperience: "",
        jobCategory: "",
        // jobCategoryId: "",
        subCategory: "",
        availability: undefined,
        employmentType: undefined,
        preferedWork: undefined,
        resume: null,
        socialLinks: {
          linkedin: '',
          behance: '',
          dribbble: '',
          medium: '',
          github: '',
          stackoverflow: '',
          kaggle: '',
          website: ''
        }
      }
    });
    // Dummy data for job categories and sub-categories
    const jobCategoriesData = {
      "Technology": ["Frontend Development", "Backend Development", "Full Stack", "DevOps"],
      "Design": ["UI/UX Design", "Graphic Design", "Product Design", "Motion Design"],
      "Marketing": ["Digital Marketing", "Content Marketing", "Social Media", "SEO"],
      "Business": ["Project Management", "Product Management", "Business Analysis", "Consulting"]
    };
    const socialPlatforms = [
      { name: 'linkedin', icon: LinkedinIcon, label: 'LinkedIn' },
      { name: 'behance', icon: BehanceIcon, label: 'Behance' },
      { name: 'dribbble', icon: DribbbleIcon, label: 'Dribbble' },
      { name: 'medium', icon: MediumIcon, label: 'Medium' },
      { name: 'github', icon: GithupIcon, label: 'GitHub' },
      { name: 'stackoverflow', icon: StackOverflowIcon, label: 'Stack Overflow' },
      { name: 'kaggle', icon: KaggleIcon, label: 'Kaggle' },
      { name: 'website', icon: UrlIcon, label: 'Website' }
    ];
    // Convert categories to options format
    const jobCategoryOptions = useMemo(() => {
      return categories.map(category => ({
        value: category.id,
        label: category.categoryName,
        id: category.id // Include the ID in the option
      }));
    }, [categories]);
    console.log(jobCategoryOptions)
    const resumeFile = watch("resume");
    const [activeSocialPlatform, setActiveSocialPlatform] = useState(null);
    const socialLinks = watch("socialLinks");

    const handleSocialIconClick = (platform) => {
      setActiveSocialPlatform(activeSocialPlatform === platform ? null : platform);
    };

    const handleSocialLinkChange = (platform, value) => {
      setValue(`socialLinks.${platform}`, value, { shouldValidate: true });
    };

    const handleResumeUpload = (e) => {
      const file = e.target.files[0];
      if (file) {
        setValue("resume", file, { shouldValidate: true });
      }
    };

    const selectedJobCategory = watch("jobCategory");
    console.log(selectedJobCategory)
    // Memoize sub-category options based on selected category
    const subCategoryOptions = useMemo(() => {
      if (!selectedJobCategory) return [];

      const selectedCategory = categories.find(
        cat => cat.id === Number(selectedJobCategory)
      );
      console.log(selectedCategory)
      if (!selectedCategory) return [];

      return selectedCategory.subCategories.map(subCat => ({
        value: subCat,
        label: subCat
      }));
    }, [selectedJobCategory, categories]);

    // Reset sub-category when job category changes
    useEffect(() => {
      if (selectedJobCategory) {
        setValue("subCategory", "");
      }
    }, [selectedJobCategory, setValue]);

    const onSubmit = (data) => {
      setFormData(prev => ({ ...prev, ...data }));
      setCompletedSteps(prev => [...prev, "second"]);
      console.log(data)
      setStep("third");
    };

    return (
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <h1 className="md:text-xl font-medium mb-8 text-3d3">
          Professional Information
        </h1>
        <div className="flex flex-col gap-3">
          <label htmlFor="resumeUpload" className="text-525 leading-none">
            Add Resume
          </label>
          <div className="sm:h-[56px] h-18 px-3 py-2 sm:py-0 bg-[#F6F6F6] rounded-md flex justify-center flex-col sm:flex-row items-start  gap-2 sm:items-center">
            <label
              htmlFor="resumeUpload"
              className="h-10 px-4 flex justify-center gap-2 bg-white items-center border-[0.5px] border-[#BDBDBD] rounded-md cursor-pointer"
            >
              <UploadIcon />
              <span className="text-sm text-[#989898]">Upload CV</span>
              <input
                id="resumeUpload"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleResumeUpload}
                className="hidden"
              />
            </label>
            <input
              type="text"
              placeholder={resumeFile?.name || "No File Chosen"}
              className="h-12 px-4 flex-1 rounded-md placeholder:text-[#989898] bg-transparent"
              disabled
            />
          </div>
          {errors.resume && (
            <p className="text-red-500 text-sm mt-1">{errors.resume.message}</p>
          )}
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
                options={jobCategoryOptions}
                error={errors.jobCategory?.message}
                // onChange={(selectedOption) => handleCategoryChange(selectedOption, field)}
                // value={jobCategoryOptions.find(option => option.value === field.value) || null}
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
                options={subCategoryOptions}
                isDisabled={!selectedJobCategory || status === 'loading'}
                error={errors.subCategory?.message}
                onBlur={field.onBlur}
                key={selectedJobCategory} // Important for proper reset
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
                <div className="flex flex-wrap gap-2.5">
                  {["immediately", "within_a_month", "partially_available"].map((option) => (
                    <div
                      key={option}
                      onClick={() => field.onChange(option)}
                      onBlur={field.onBlur}
                      className={`h-[44px] px-4 rounded-full border flex justify-center items-center cursor-pointer ${field.value === option
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
                <div className="flex flex-wrap gap-2.5">
                  {["full_time", "part_time", "freelancing"].map((option) => (
                    <div
                      key={option}
                      onClick={() => field.onChange(option)}
                      onBlur={field.onBlur}
                      className={`h-[44px] px-4 rounded-full border flex justify-center items-center cursor-pointer ${field.value === option
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
        <div className="flex flex-col gap-3">
          <h1 className="text-525 leading-none capitalize">
            Do You Prefer Work
          </h1>
          <Controller
            name="preferedWork"
            control={control}
            render={({ field }) => (
              <>
                <div className="flex flex-wrap gap-2.5">
                  {["Remotely", "on_site", "Hybrid"].map((option) => (
                    <div
                      key={option}
                      onClick={() => field.onChange(option)}
                      onBlur={field.onBlur}
                      className={`h-[44px] px-4 rounded-full border flex justify-center items-center cursor-pointer ${field.value === option
                        ? 'bg-green text-white'
                        : 'text-[#989898] border-[#BDBDBD]'
                        }`}
                    >
                      {option.replace('_', ' ')}
                    </div>
                  ))}
                </div>
                {errors.preferedWork && (
                  <p className="text-red-500 text-sm mt-1">{errors.preferedWork.message}</p>
                )}
              </>
            )}
          />

        </div>
        {/* Social Links Section - Matching your working example */}
        <div className="flex flex-col gap-3">
          <div className='flex justify-between flex-col md:flex-row items-start md:items-center'>
            <h1 className='text-525 text-lg capitalize text-left mb-2 md:mb-0'>Account Link</h1>
            <div className='flex items-center flex-wrap gap-4'>
              {socialPlatforms.map((platform) => (
                <div
                  key={platform.name}
                  className={`h-8 w-8 rounded-full flex justify-center items-center cursor-pointer ${socialLinks[platform.name] || activeSocialPlatform === platform.name
                    ? 'bg-green'
                    : 'bg-bdb'
                    }`}
                  onClick={() => handleSocialIconClick(platform.name)}
                >
                  <platform.icon color="#ffffff" height={20} width={20} />
                </div>
              ))}
            </div>
          </div>

          {activeSocialPlatform && (
            <InputField
              label={socialPlatforms.find(p => p.name === activeSocialPlatform)?.label || 'Social Link'}
              placeholder={`Enter ${socialPlatforms.find(p => p.name === activeSocialPlatform)?.label || ''} link`}
              type="url"
              value={socialLinks[activeSocialPlatform] || ''}
              onChange={(e) => handleSocialLinkChange(activeSocialPlatform, e.target.value)}
              name={`socialLink_${activeSocialPlatform}`}
              error={errors.socialLinks?.[activeSocialPlatform]?.message}
            />
          )}
        </div>

        <div className="flex justify-between  gap-4 items-center mt-4">
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
    const { user, isAuthenticated } = useSelector((state) => state.auth);


    const onSubmit = async (data) => {
      // Merge formData and new data
      const mergedData = { ...formData, ...data };

      // Extract fields needed for processing
      const { selectedSkills, profileImage, resume, jobCategory, availability, preferedWork, employmentType, ...rest } = mergedData;
      const processedData = {
        ...rest,
        job_category: Number(jobCategory), // Convert to number and rename
        skills: selectedSkills,
        availability: [availability],
        employmentType: [employmentType],
        preferedWork: [preferedWork],
        users_permissions_user: user?.id
      };

      const token = localStorage.getItem("token");

      try {
        // Upload files first (if they exist)
        const uploadPromises = [];

        if (profileImage) {
          uploadPromises.push(
            uploadFileToStrapi(profileImage, token)
              .then(id => ({ profileImage: id }))
          );
        }

        if (resume) {
          uploadPromises.push(
            uploadFileToStrapi(resume, token)
              .then(id => ({ resume: id }))
          );
        }

        // Wait for all uploads to complete
        const uploadResults = await Promise.all(uploadPromises);
        const uploadedFiles = uploadResults.reduce((acc, curr) => ({ ...acc, ...curr }), {});

        // Create final payload
        const completeFormData = {
          ...processedData,

          ...uploadedFiles
        };

        console.log("Complete Form Data:", completeFormData);

        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/profiles`,
          { data: completeFormData },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Response Data:", response.data);
        setCompletedSteps((prev) => [...prev, "third"]);
        router.push("/");
      } catch (error) {
        console.error("Error submitting form:", error?.response?.data || error);
        // Add user-friendly error handling here
      }
    };



    return (
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div>
          <h1 className="md:text-xl font-medium mb-2 text-3d3">
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
              <div className="border border-[#BDBDBD] rounded-md p-3 md:p-6 grid grid-cols-1 lg:grid-cols-2 gap-6 h-full max-h-[484px] overflow-y-auto">
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
                    className={`border border-[#BDBDBD] p-4 rounded-md mont text-sm cursor-pointer ${field.value?.includes(skill)
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
        <div className="flex justify-between gap-4  items-center mt-4">
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
            className={`cursor-pointer h-12 w-12 rounded-full flex items-center justify-center mont text-2xl font-medium ${step === "first" || completedSteps.includes("first")
              ? "bg-green text-white"
              : "bg-e5e text-525"
              }`}
          >
            1
          </div>
          <hr
            className={`${completedSteps.includes("first") ? "border-green" : "border-e5e"
              } border-t-6 w-18 md:w-[100px]`}
          />
          <div
            onClick={() => (completedSteps.includes("first") || step !== "first") && setStep("second")}
            className={`cursor-pointer h-12 w-12 rounded-full flex items-center justify-center mont text-2xl font-medium ${step === "second" || completedSteps.includes("second") || step === "third"
              ? "bg-green text-white"
              : "bg-e5e text-525"
              } ${!(completedSteps.includes("first") || step !== "first") ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            2
          </div>
          <hr
            className={`border-t-6 ${completedSteps.includes("second") ? "border-green" : "border-e5e"
              } w-18 md:w-[100px]`}
          />
          <div
            onClick={() => (completedSteps.includes("second") || step === "third") && setStep("third")}
            className={`cursor-pointer h-12 w-12 rounded-full flex items-center justify-center mont text-2xl font-medium ${step === "third" || completedSteps.includes("third")
              ? "bg-green text-white"
              : "bg-e5e text-525"
              } ${!(completedSteps.includes("second") || step === "third") ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            3
          </div>
        </div>

        <div className="pt-8 pb-8 bg-white mt-6 px-4 md:px-10 rounded-3xl shad w-full flex flex-col gap-4">
          {step === "first" && <FirstStep />}
          {step === "second" && <SecondStep />}
          {step === "third" && <ThirdStep />}
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;