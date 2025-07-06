export const getAuthHeaders = () => {
    const authToken = localStorage.getItem('token');
    
    if (!authToken) {
      throw new Error('No auth token found');
    }
  
    return {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    };
  };