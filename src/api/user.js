import API from "./index";


export const updateUserApi = (userEmail, credentials) => API.put(`/user/${userEmail}`, credentials)

// Fixed uploadUserImageApi function
export const uploadUserImageApi = (image) => {
  const formData = new FormData();
  formData.append('image', image);

  return API.post('/user/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    // Add timeout and size limits
    timeout: 30000, // 30 seconds
    maxContentLength: 10 * 1024 * 1024, // 10MB
    maxBodyLength: 10 * 1024 * 1024, // 10MB
  });
};