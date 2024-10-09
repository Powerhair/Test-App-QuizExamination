import React from 'react';

interface StepperProps {
  steps: React.ReactNode[];
  currentStep: number;
  onStepChange: () => void; // Изменено, чтобы не принимать аргумент
  isNextEnabled: boolean; // Изменено на boolean
  handlePreviousStep: () => void; // Изменено, чтобы не принимать аргумент
}

const Stepper: React.FC<StepperProps> = ({
  steps,
  currentStep,
  onStepChange,
  isNextEnabled,
  handlePreviousStep,
}) => {
  return (
    <div className="mt-6">
      <div className="mb-6">{steps[currentStep]}</div>
      <div className="flex justify-between mt-4">
        <button
          className="bg-gray-400 text-white py-2 px-4 rounded hover:bg-gray-500"
          onClick={handlePreviousStep} // Здесь мы просто вызываем функцию
          disabled={currentStep === 0}
        >
          Назад
        </button>
        <button
          className={`bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 ${!isNextEnabled ? 'opacity-50 cursor-not-allowed' : ''}`} // Здесь используем isNextEnabled как булевое значение
          onClick={onStepChange} // Здесь мы просто вызываем функцию
          disabled={!isNextEnabled}
        >
          Далее
        </button>
      </div>
    </div>
  );
};

export default Stepper;
