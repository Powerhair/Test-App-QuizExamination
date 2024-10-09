// src/components/Question/SingleChoiceQuestion.tsx
import React from 'react';

interface Props {
  question: string;
  options: string[];
  selectedOption: string | null;
  onChange: (option: string) => void;
}

const SingleChoiceQuestion: React.FC<Props> = ({ question, options, selectedOption, onChange }) => (
  <div className="mb-6 p-4 rounded-lg shadow-sm bg-white">
    <h3 className="text-lg font-bold mb-2">{question}</h3>
    <hr className="my-4 border-gray-600" />
    <div className="bg-gray-50 p-3 ">
      {options.map((option) => (
        <div key={option} className="flex items-center mb-2">
          <input
            type="radio"
            name="single-choice"
            value={option}
            checked={selectedOption === option}
            onChange={() => onChange(option)}
            className="mr-2 h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
          />
          <label className="text-gray-700">{option}</label>
        </div>
      ))}
    </div>
  </div>
);

export default SingleChoiceQuestion;
