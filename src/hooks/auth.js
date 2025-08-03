import { loginApi, registerUserApi } from "../api/auth";
import {
    loginLoading, loginSuccess, 
    loginFailure, registerUserLoading, 
    registerUserSuccess, registerUserFailure, 
    setLogout
} from "../redux/authSlice";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { useGetUserBookmarks } from "./bookmarks";
import { clearBookmarks } from "../redux/bookmarkSlice";


// LOGIN CUSTOM HOOK 
export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { getUserBookmarks } = useGetUserBookmarks(); 

  
    const login = async (dispatch, credentials) => {
        dispatch(loginLoading());
        setIsLoading(true);
        setError(null)
    
        try {
            const response = await loginApi(credentials);
            if (response.status >= 200 && response.status < 300) {
                dispatch(loginSuccess(response.data));
                setError(null);
                setIsLoading(false);
                navigate('/');
                const userRole = response.data?.role
                if(userRole === "tenant") {
                    await getUserBookmarks(); // Fetch bookmarks immediately after login
                }
            } else { 
                // If the response status is not in the success range, handle the error
                throw new Error(response.data?.error || 'Something went wrong...');
            }
        } catch (error) {
            // If there's an error, set the error state to display 
            setError(error.response?.data?.error || 'Something went wrong...'); 
            setIsLoading(false);
            dispatch(loginFailure(error.response?.data?.error || error.message))
        }      
    };
    
    return { login, error, isLoading };
};


// REGISTER-USER CUSTOM HOOK
export const useRegisterUser = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);


  
    const registerUser = async (dispatch, credentials) => {
        dispatch(registerUserLoading());
        setIsLoading(true);
        setError(null)
    
        try {
            const response = await registerUserApi(credentials);
            if (response.status >= 200 && response.status < 300) {
                dispatch(registerUserSuccess(response.data));
                setError(null);
                setIsLoading(false);
                setSuccess(true);
                
            } else { 
                // If the response status is not in the success range, handle the error
                throw new Error(response.data?.error || 'Something went wrong...');
            }
        } catch (error) {
            // If there's an error, set the error state to display 
            setError(error.response?.data?.error || 'Something went wrong...'); 
            setIsLoading(false);
            dispatch(registerUserFailure(error.response?.data?.error || error.message))
        }      
    };
    
    return { registerUser, success, setSuccess, error, isLoading };
};




// LOGOUT CUSTOM HOOK
export const useLogout = () => {
    const dispatch = useDispatch(); 
    const navigate = useNavigate()

    const handleLogout = async () => {
        dispatch(setLogout());
        dispatch(clearBookmarks())
        navigate('/');
    };

    return { handleLogout };
};