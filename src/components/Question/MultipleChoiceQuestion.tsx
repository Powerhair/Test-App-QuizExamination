// src/components/Question/MultipleChoiceQuestion.tsx
import React from 'react';

interface Props {
  question: string;
  options: string[];
  selectedOptions: string[];
  onChange: (option: string) => void;
}

const MultipleChoiceQuestion: React.FC<Props> = ({ question, options, selectedOptions, onChange }) => (
  <div className="mb-6">
    <h3 className="text-lg font-bold mb-2">{question}</h3>
    <p className="text-lg font-semibold mb-2">Выберите несколько вариантов ответа</p>
    <hr className="my-4 border-gray-600" />
    {options.map((option) => (
      <div key={option} className="flex items-center mb-2">
        <input
          type="checkbox"
          name="multiple-choice"
          value={option}
          checked={selectedOptions.includes(option)}
          onChange={() => onChange(option)}
          className="mr-2 h-4 w-4  border-gray-500 rounded cursor-pointer "
        />
        <label className="text-gray-700">{option}</label>
      </div>
    ))}
  </div>
);

export default MultipleChoiceQuestion;
