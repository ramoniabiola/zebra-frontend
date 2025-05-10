import React from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

const steps = [
  'Apartment Details',
  'Pricing & Duration',
  'Contact & Amenities',
  'Upload Images',
];

const StepIndicator = ({ currentStep }) => {
  return (
    <div className="w-full mb-4 mt-2 flex flex-col items-center justify-center">

      {/* Step Circles & Lines */}
      <div className="flex justify-between items-center w-full">
        {steps.map((_, index) => {
          const stepIndex = index + 1;
          const isCompleted = currentStep > stepIndex;
          const isActive = currentStep === stepIndex;
          return (
            <div key={index} className="relative flex-1 flex justify-center">
 
              {/* Circle */}
              <div
                className={`z-10 w-9 h-9 flex items-center justify-center rounded-full text-white text-sm font-bold
                  transition-all duration-300 shadow border-4 border-white
                `}
                style={{
                  backgroundColor: isCompleted
                  ? '#06b6d4'
                  : isActive
                  ? '#0e7490'
                  : '#d1d5db',
                }}
              >
                {isCompleted ? (
                  <CheckCircleIcon className="w-5 h-5" />
                  ) : (
                  stepIndex
                )}  
              </div>
                
              {/* Connecting line */}
              {index < steps.length - 1 && (
                <div className="absolute top-1/2 left-1/2 w-full h-[3px] bg-gray-300 -z-10">
                  <div
                    className="h-[3px] bg-cyan-500 transition-all duration-300"
                    style={{
                      width: currentStep > stepIndex ? '100%' : '0%',
                    }}
                  ></div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      {/* Step Labels */}
      <div className="flex justify-between mt-4 px-1">
        {steps.map((label, index) => (
          <div
            key={index}
            className="flex-1 text-center text-[14px] font-semibold text-gray-600"
          >
            {label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepIndicator;
