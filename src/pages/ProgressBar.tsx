import React from 'react';
import { questions } from '../utils/questionsData';

interface ProgressBarProps {
    currentStep: number;
}


const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep }) => {

   return (
    <div className="flex w-full max-w-md  mb-4">
    {questions.map((_, index) => (
      <div
        key={index}
        className={`flex-1 h-4 mx-1 ${index < currentStep ? 'bg-red-500' : 'bg-white'} rounded-lg`}
        style={{ margin: '0 5px', transition: 'background-color 0.3s' }} // Применение стиля отступа и плавного перехода цвета
      />
    ))}
  </div>
   )

    
}

export default ProgressBar;
