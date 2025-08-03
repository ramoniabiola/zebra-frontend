import {  updateUserApi, uploadUserImageApi } from "../api/user";
import {
    updateUserLoading, updateUserSuccess, updateUserFailure, clearUpdateStatus
} from "../redux/authSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";



// Updated useUpdateUser hook
export const useUpdateUser = () => {
    const dispatch = useDispatch();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const updateUser = async (userEmail, userData, profileImage = null) => {
        dispatch(updateUserLoading());
        setIsLoading(true);

        try {
            let updatedUserData = { ...userData };

            // Upload profile image to Cloudinary if provided
            if (profileImage) {
                try {
                    const imageResponse = await uploadUserImageApi(profileImage);
                    updatedUserData.profile_picture = imageResponse.data.imageUrl;
                } catch (imageError) {
                    // Handle image upload specific errors
                    if (imageError.response?.status === 413) {
                        throw new Error('Image file is too large. Please choose a smaller image (max 5MB).');
                    }
                    throw new Error('Failed to upload image. Please try again.');
                }
            }

            // Call API to update user
            const response = await updateUserApi(userEmail, updatedUserData);
            if (response.status >= 200 && response.status < 300) {
                dispatch(updateUserSuccess(response.data));
                setError(null);
                setIsLoading(false);
                setSuccess(true);
            } else {
                throw new Error(response.data?.error || 'Something went wrong...');
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || 'Failed to update user';
            setError(errorMessage);
            dispatch(updateUserFailure(errorMessage));
            setIsLoading(false);
        }
    };

    const clearStatus = () => {
        dispatch(clearUpdateStatus());
    };

    return {
        updateUser,
        isLoading,
        error,
        success,
        setSuccess,
        clearStatus
    };
};