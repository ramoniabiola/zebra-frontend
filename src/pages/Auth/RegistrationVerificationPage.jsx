import { useState, useRef, useEffect } from 'react';
import { Mail, CheckCircle, X, AlertCircle, Loader2, RotateCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useRegisterUser } from "../../hooks/auth";
import { useDispatch } from "react-redux";
import { codeVerificationApi } from '../../api/auth';

const RegistrationVerificationPage = ({formData, sendVerificationCode, sendVerificationCodeError, setSendVerificationCodeError}) => {
  const [code, setCode] = useState(['', '', '', '', '', '']);

  const [verifyCodeLoading, setVerifyCodeLoading] = useState(false)
  const [verifyCodeSuccess, setVerifyCodeSuccess] = useState(false)
  const [verifyCodeError, setVerifyCodeError] = useState(null)

  const [resendCooldown, setResendCooldown] = useState(0);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false)
  const { registerUser, error, setSuccess, success, isLoading } = useRegisterUser();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  

  const inputRefs = useRef([]);

  // Initialize refs
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 6);
  }, []);

  // Handle cooldown timer
  useEffect(() => {
    let timer;
    if (resendCooldown > 0) {
      timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCooldown]);


  const handleInputChange = (index, value) => {
    // Only allow digits
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];

    newCode[index] = value;

    setCode(newCode);

    // Clear error when user starts typing
    if (verifyCodeError) setVerifyCodeError(null);

    // Move to next input if value entered
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };



  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === 'ArrowRight' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };


  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    const newCode = [...code];
    
    for (let i = 0; i < 6; i++) {
      newCode[i] = pastedData[i] || '';
    }
    setCode(newCode);
    
    // Focus on the next empty input or last input
    const nextEmptyIndex = newCode.findIndex(digit => digit === '');
    const focusIndex = nextEmptyIndex === -1 ? 5 : nextEmptyIndex;
    inputRefs.current[focusIndex]?.focus();
  };


  const verifyCode = async () => {
    setVerifyCodeLoading(true);
    setVerifyCodeError(null)
    setShowVerificationModal(true);

    try{
      
      const verificationCode = code.join("");
      const userEmail = formData.email

      const verificationDetails = {
        email: userEmail,
        code: verificationCode
      }

      const response = await codeVerificationApi(verificationDetails);
      if(response.status >= 200 && response.status < 300) {
        setVerifyCodeError(null);
        setVerifyCodeLoading(false);
        setVerifyCodeSuccess(true)
      } else {
        // If the response status is not in the success range, handle the error
        throw new Error(response.data.error);
      }
    }catch(error){
      setVerifyCodeLoading(false)
      console.log(error.response?.data?.error)
      setVerifyCodeError(error.response?.data?.error || "Verification Failure")
    }
  }


  
  const handleSubmit = async () => {
    setShowSubmitModal(true)

    // Perform registerUser action
    await registerUser(dispatch, formData);  
  };


  useEffect(() => {
    if (verifyCodeSuccess) {
      // After 4 seconds, close modal
      const timer = setTimeout(() => {
        setShowVerificationModal(false)
      }, 4000);
    
      return () => clearTimeout(timer);
    }
  }, [verifyCodeSuccess]);



  useEffect(() => {
    if (success) {

      // After 4 seconds, close modal
      const timer = setTimeout(() => {
        setSuccess(false);
        setShowSubmitModal(false)
        navigate('/login');
      }, 4000);
    
      return () => clearTimeout(timer);
    }
  }, [success, navigate]);
  


  const handleResendCode = () => {
    if (resendCooldown > 0) return; 

    setResendCooldown(60);

    //if verification code is invalid, expired or an error occurred, re-call the send-verification-code function
    sendVerificationCode();
  };




 

  const VerificationModal = () => {
    if (!showVerificationModal) return null;

    return (
      <div className="fixed inset-0 bg-black/30 bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 relative">
          {!verifyCodeLoading && (
            <button
              onClick={() => setShowVerificationModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          <div className="text-center">
            {verifyCodeLoading && (
              <>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Verifying Your Code
                </h3>
                <p className="text-gray-600">
                  Please wait while we confirm your verification code...
                </p>
              </>
            )}

            {verifyCodeSuccess && (
              <>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Code Verified Successfully!
                </h3>
                <p className="text-gray-600">
                  🎉 Your verification code has been confirmed. You can now proceed to create an account.
                </p>
              </>
            )} 

            {verifyCodeError && (
              <>
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Verification Failed
                </h3>
                <p className="text-gray-600 mb-4">
                  We couldn't verify your code. Please check it and try again.
                  <br />
                  <span className="text-sm text-gray-500 mt-2 block">
                    Error: <b className="text-gray-700">{verifyCodeError}</b>
                  </span>
                </p>
                <button
                  onClick={handleResendCode}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200 cursor-pointer"
                >
                  Resend Code
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    );
  };




  const SubmitModal = () => {
    if (!showSubmitModal) return null;

    return (
      <div className="fixed inset-0 bg-black/30 bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 relative">
          {!isLoading && (
            <button
              onClick={() => setShowSubmitModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          )}
            
          <div className="text-center">
            {isLoading && (
              <>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Creating Your Account
                </h3>
                <p className="text-gray-600">
                  Please wait while we set up your new account...
                </p>
              </>
            )}

            {success && (
              <>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Account Created Successfully!
                </h3>
                <p className="text-gray-600">
                  🎉 Welcome! Your account has been created successfully. You can now log in with your credentials.
                </p>
              </>
            )}
            

            {error && (
              <>
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Registration Failed
                </h3>
                <p className="text-gray-600 mb-4">
                  We couldn't create your account. Please check your information and try again.
                  <br />
                  <span className="text-sm text-gray-500 mt-2 block">
                    Error:  <b className="text-gray-700">{error}</b>
                  </span>
                </p>
                <button
                  onClick={handleSubmit}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200 cursor-pointer"
                >
                  Try Again
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Error Alert Component
  const ErrorAlert = ({ message, onClose }) => (
    <div className="p-2 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3 animate-in slide-in-from-top-2 duration-300">
      <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
      <div className="flex-1">
        <p className="text-sm text-red-700 font-medium">{message}</p>
      </div>
      {onClose && (
        <button onClick={onClose} className="text-red-400 hover:text-red-600">
          <X className="w-4 h-4" />
        </button>
      )}
    </ div>
  );
  

  // Button style generator
  const baseButtonStyles = (disabled) => `
    w-full py-3.5 rounded-xl text-lg font-semibold transition-all duration-300 transform shadow-lg flex items-center justify-center space-x-2
    ${disabled 
      ? 'bg-gray-400 cursor-not-allowed'
      : 'bg-gradient-to-r from-cyan-400 to-cyan-600 hover:from-cyan-500 hover:to-cyan-700 hover:scale-101 hover:shadow-xl cursor-pointer'}
    text-white 
  `;



  return (
    <>
      <div className="w-full min-h-screen bg-white flex flex-col items-center px-4 py-6">

        {/* App Name / Logo */}
        <h1 
          className="text-[2rem] text-slate-900 font-extrabold cursor-pointer text-center mt-20 mb-2 tracking-tight text-shadow-lg">T
          <span className="text-cyan-600">o-</span>Let
        </h1>
          
        {/* Welcome Message */}
        <h2 className="text-xl font-semibold text-center text-gray-500 tracking-wider mb-1">Verify Your Email</h2>
        <h3 className="text-sm text-center font-normal italic text-gray-400 mb-6">Almost there...</h3>
          
        {/* Email Icon */}
        <div className="w-16 h-16 bg-cyan-100 rounded-2xl border border-cyan-200 flex items-center justify-center mx-auto mb-6 shadow-lg">
          <Mail className="w-8 h-8 text-cyan-600" />
        </div>

        <div className='mb-4'>
          {sendVerificationCodeError && (
            <ErrorAlert
              message={sendVerificationCodeError}
              onClose={() =>  setSendVerificationCodeError(null)} 
            />
          )}
        </div>

        <p className="text-gray-600 text-center text-sm mb-2">
          We've sent a 6-digit verification code to
        </p>
        <p className="text-gray-800 text-center  font-semibold mb-8">
          {formData.email}
        </p>


        {/* Verification Code Inputs */}
        <div className="w-full max-w-md space-y-8">
          <div className="flex justify-center space-x-2">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={el => inputRefs.current[index] = el}
                type="text"
                value={digit}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                disabled={verifyCodeSuccess}
                maxLength={1}
                className={`w-10 h-14 text-center text-xl font-bold border-2 rounded-xl transition-all duration-300 focus:outline-none ${
                  verifyCodeError
                    ? 'border-rose-400 bg-rose-50 text-rose-500 shadow-md shadow-rose-500/20'
                    : verifyCodeSuccess
                      ? 'border-gray-200 bg-gray-50 text-gray-400'
                      : digit
                        ? 'border-cyan-500 bg-cyan-50 text-cyan-700 shadow-lg shadow-cyan-500/20'
                        : 'border-gray-200 bg-gray-50 text-gray-800 hover:border-gray-300 focus:border-cyan-500 focus:bg-white focus:shadow-lg focus:shadow-cyan-500/20'
                }`}
              />
            ))}
          </div>

          <div>
            { !verifyCodeSuccess ? (
                // Verify Email Button
                <button
                  onClick={verifyCode}
                  disabled={verifyCodeLoading || code.join('').length !== 6}
                  className={baseButtonStyles()}
                >
                  {verifyCodeLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 text-white animate-spin" />
                      <span>Verifying...</span>
                    </>
                  ) : (
                    <span>Verify Email</span>
                  )}
                </button>
              ) : (
                // Create Account Button
                <button
                  onClick={handleSubmit}
                  disabled={isLoading || success}
                  className={baseButtonStyles()}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 text-white animate-spin" />
                      <span>Creating Account...</span>
                    </>
                  ) : (
                    <span>Create Account</span>
                  )}
                </button>
              )
            }
          </div>
      
          {/* Resend Section */}
          <div className="text-center space-y-3">
            <p className="text-gray-600 text-sm">Didn't receive the code?</p>
            <button
              onClick={handleResendCode}
              disabled={resendCooldown > 0 || verifyCodeSuccess}
              className={`flex items-center space-x-2 mx-auto text-sm font-semibold transition-colors duration-300 ${
                resendCooldown > 0
                  ? 'text-gray-400 cursor-not-allowed'
                  : verifyCodeSuccess ? 'text-gray-400 cursor-not-allowed'
                  : 'text-cyan-600 hover:text-cyan-700 cursor-pointer'
              }`}
            >
              <RotateCcw className="w-4 h-4" />
              <span>
                {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend Code'}
              </span>
            </button>
          </div>
        </div>



        {/* Help Text */}
        <div className="text-center mt-8 mb-24">
          <p className="text-gray-500 text-xs">
            Having trouble? Check your spam folder or{" "}
            <span className="text-cyan-600 hover:text-cyan-700 transition-colors duration-300 hover:underline cursor-pointer">
              contact support
            </span>
          </p>
        </div>
      </div>

      <VerificationModal />
      <SubmitModal />
    </>
  );
}


export default RegistrationVerificationPage;