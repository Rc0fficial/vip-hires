// utils/strapiUpload.js
import axios from 'axios';

export const uploadFileToStrapi = async (file, token) => {
  if (!file) return null;

  const formData = new FormData();
  formData.append('files', file);

  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/upload`,
      formData,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    
    return response.data[0].id;
  } catch (error) {
    if (error.response?.data?.error?.message?.includes('upload_folders_path_id_index')) {
      // Retry with a slightly modified filename to avoid path_id conflict
      const modifiedFile = new File(
        [file],
        `${Date.now()}-${file.name}`,
        { type: file.type }
      );
      
      formData.delete('files');
      formData.append('files', modifiedFile);
      
      const retryResponse = await axios.post(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/upload`,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      
      return retryResponse.data[0].id;
    }
    console.error('Error uploading file:', error);
    throw error;
  }
};