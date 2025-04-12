'use client';
import DownloadIcon from '@/components/Icons/DownloadIcon.svg'
import UploadIcon from '@/components/Icons/UploadIcon.svg'
import ViewIcon from '@/components/Icons/ViewIcon.svg'
import { useState, useRef } from 'react';


const ResumeSection = () => {
  const [resumeFile, setResumeFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('/assets/resume.png');
  const fileInputRef = useRef(null);

  // Handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setResumeFile(file);
      
      // Create preview for image files
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => setPreviewUrl(e.target.result);
        reader.readAsDataURL(file);
      } else {
        // For non-image files, use a generic icon
        setPreviewUrl('/assets/resume.png');
      }
    }
  };

  // Trigger file input click
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  // Download resume
  const handleDownload = () => {
    if (!resumeFile) return;
    
    const url = URL.createObjectURL(resumeFile);
    const a = document.createElement('a');
    a.href = url;
    a.download = resumeFile.name || 'resume';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // View resume (opens in new tab)
  const handleView = () => {
    if (!resumeFile) return;
    
    if (resumeFile.type.startsWith('image/')) {
      // For images, open directly
      const url = URL.createObjectURL(resumeFile);
      window.open(url, '_blank');
      URL.revokeObjectURL(url);
    } else if (resumeFile.type === 'application/pdf') {
      // For PDFs, use PDF.js or open in new tab
      const url = URL.createObjectURL(resumeFile);
      window.open(url, '_blank');
      URL.revokeObjectURL(url);
    } else {
      // For other file types, download instead
      handleDownload();
    }
  };

  return (
    <div className='rounded-2xl bg-white p-4 lg:p-10'>
      <h1 className='capitalize text-[28px] font-semibold text-3d3'>Resume</h1>
      <div className='flex justify-between'>
        <p className='text-989 mb-6'>
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
              <h1 className='capitalize text-[28px] font-semibold text-3d3'>
                {resumeFile ? resumeFile.name : 'Resume'}
              </h1>
              <p className='text-989'>
                {resumeFile ? `${(resumeFile.size / 1024).toFixed(2)} KB` : '154.03 KB'}
              </p>
            </div>
            <p className='text-989'>
              {resumeFile ? new Date(resumeFile.lastModified).toLocaleDateString() : '31/5/2023'}
            </p>
          </div>
          
          <div className='flex items-center flex-wrap gap-4'>
            <button 
              onClick={handleView}
              disabled={!resumeFile}
              className={`flex w-full justify-center items-center rounded-full border border-green text-green py-2 px-6 gap-3 ${
                !resumeFile ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green hover:text-white'
              }`}
            >
              <ViewIcon color={!resumeFile ? "#999" : "#009969"} height={24} width={24} />
              Preview
            </button>
            
            <button 
              onClick={handleDownload}
              disabled={!resumeFile}
              className={`flex w-full justify-center items-center rounded-full border border-green text-green py-2 px-6 gap-3 ${
                !resumeFile ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green hover:text-white'
              }`}
            >
              <DownloadIcon color={!resumeFile ? "#999" : "#009969"} height={24} width={24} />
              Download
            </button>
            
            <button 
              onClick={handleUploadClick}
              className='flex w-full justify-center items-center rounded-full border border-green text-green py-2 px-6 gap-3 hover:bg-green hover:text-white'
            >
              <UploadIcon color="#009969" height={24} width={24} />
              Upload
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                className='hidden'
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeSection;