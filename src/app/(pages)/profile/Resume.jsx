'use client';
import DownloadIcon from '@/components/Icons/DownloadIcon.svg';
import UploadIcon from '@/components/Icons/UploadIcon.svg';
import ViewIcon from '@/components/Icons/ViewIcon.svg';
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { updateProfile } from '@/app/Store/ReduxSlice/updateProfileSlice';
import { useDispatch } from 'react-redux';

const ResumeSection = ({ userProfile }) => {
  const dispatch = useDispatch();
  const [resumeFile, setResumeFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('/assets/resume.png');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  // Initialize with user's current resume
  useEffect(() => {
    if (userProfile?.resume?.url) {
      setPreviewUrl(`${process.env.NEXT_PUBLIC_STRAPI_URL}${userProfile.resume.url}` || '/assets/resume.png');
    }
  }, [userProfile]);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('files', file);
    formData.append('ref', 'api::profile.profile');
    formData.append('refId', userProfile.id);
    formData.append('field', 'resume');

    try {
      // Delete previous resume if exists
      if (userProfile?.resume?.id) {
        await axios.delete(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/upload/files/${userProfile.resume.id}`,
          {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          }
        );
      }

      // Upload new resume
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/upload`,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      // Update profile with new resume data
      const updateData = {
        resume: data[0].id // Strapi expects the file ID for relational fields
      };

      await dispatch(updateProfile({
        id: userProfile.documentId,
        updateData
      })).unwrap();

      // Update local state
      setResumeFile(file);
      setPreviewUrl(`${process.env.NEXT_PUBLIC_STRAPI_URL}${data[0].url}`);
      
    } catch (error) {
      console.error('Error uploading resume:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleDownload = () => {
    if (!userProfile?.resume?.url) return;
    
    const link = document.createElement('a');
    link.href = `${process.env.NEXT_PUBLIC_STRAPI_URL}${userProfile.resume.url}`;
    link.download = userProfile.resume.name || 'resume';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleView = () => {
    if (!userProfile?.resume?.url) return;
    
    window.open(`${process.env.NEXT_PUBLIC_STRAPI_URL}${userProfile.resume.url}`, '_blank');
  };

  return (
    <div className='rounded-2xl bg-white p-4 lg:p-10'>
      <h1 className='capitalize md:text-[28px] font-semibold text-3d3'>Resume</h1>
      <div className='flex justify-between'>
        <p className='text-989 mb-6 text-xs md:text-[16px]'>
          Upload your CV to help recruiters understand your background and qualifications at a glance.
        </p>
      </div>
      
      <div className='rounded-md shad flex flex-col md:flex-row py-4 md:py-0 items-center'>
        <div className='w-[200px] h-[197px] bg-bdb flex items-center justify-center'>
          <img 
            src={previewUrl} 
            alt="Resume preview" 
            className='mx-auto max-h-full max-w-full object-contain'
          />
        </div>
        
        <div className='flex-1 py-6 px-4 flex justify-between flex-col h-full'>
          <div className='flex justify-between mb-9'>
            <div>
              <h1 className='capitalize md:text-[28px] font-semibold text-3d3'>
                {(userProfile?.resume?.name?.slice(0, 10) || 'Resume'.slice(0, 10)) + '...'}
              </h1>
              <p className='text-989 text-xs md:text-[16px]'>
                {userProfile?.resume?.size ? `${(userProfile.resume.size / 1024).toFixed(2)} KB` : 'No file uploaded'}
              </p>
            </div>
            <p className='text-989 text-xs md:text-[16px]'>
              {userProfile?.resume?.createdAt ? new Date(userProfile.resume.createdAt).toLocaleDateString() : ''}
            </p>
          </div>
          
          <div className='flex items-center flex-wrap gap-4'>
            <button 
              onClick={handleView}
              disabled={!userProfile?.resume}
              className={`flex w-full justify-center text-sm md:text-[16px] items-center rounded-full border border-green text-green py-2 px-6 gap-3 ${
                !userProfile?.resume ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green hover:text-white'
              }`}
            >
              <ViewIcon color={!userProfile?.resume ? "#999" : "#009969"} height={24} width={24} />
              Preview
            </button>
            
            <button 
              onClick={handleDownload}
              disabled={!userProfile?.resume}
              className={`flex w-full justify-center text-sm md:text-[16px] items-center rounded-full border border-green text-green py-2 px-6 gap-3 ${
                !userProfile?.resume ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green hover:text-white'
              }`}
            >
              <DownloadIcon color={!userProfile?.resume ? "#999" : "#009969"} height={24} width={24} />
              Download
            </button>
            
            <button 
              onClick={handleUploadClick}
              disabled={isUploading}
              className={`flex w-full justify-center text-sm md:text-[16px] items-center rounded-full border border-green text-green py-2 px-6 gap-3 ${
                isUploading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green hover:text-white'
              }`}
            >
              <UploadIcon color="#009969" height={24} width={24} />
              {isUploading ? 'Uploading...' : 'Upload'}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                className='hidden'
                disabled={isUploading}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeSection;