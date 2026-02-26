import {  CheckCircle, Home, DollarSign, User, Camera } from 'lucide-react';




const StepIndicator = ({ currentStep }) => {
  const steps = [
    { label: 'Apartment Details', icon: Home },
    { label: 'Pricing & Duration', icon: DollarSign },
    { label: 'Contact & Amenities', icon: User },
    { label: 'Upload Images', icon: Camera },
  ];


  return (
    <div className="w-full mb-8 px-1 md:px-10 lg:px-20">
      <div className="flex justify-between items-center relative">
        {/* Progress Line */}
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 -z-10">
          <div 
            className="h-full bg-gradient-to-r from-cyan-500 to-cyan-600 transition-all duration-500 ease-out"
            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          />
        </div>
        
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = currentStep > stepNumber;
          const isActive = currentStep === stepNumber;
          const Icon = step.icon;
          
          return (
            <div key={index} className="flex flex-col items-center">
              <div className={`
                w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 shadow-lg border-2
                ${isCompleted 
                  ? 'bg-gradient-to-r from-cyan-600 to-cyan-700 border-cyan-600 text-white' 
                  : isActive 
                    ? 'bg-gradient-to-r from-cyan-500 to-cyan-600 border-cyan-500 text-white shadow-cyan-200' 
                    : 'bg-white border-gray-200 text-gray-400'
                }
              `}>
                {isCompleted ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <Icon className="w-4 h-4" />
                )}
              </div>
              <span className={`
                mt-2 text-xs font-medium text-center max-w-20
                ${isActive ? 'text-cyan-600' : 'text-gray-500'}
              `}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepIndicator;
