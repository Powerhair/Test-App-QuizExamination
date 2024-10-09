// src/components/Question/LongAnswerQuestion.tsx
import React from 'react';

interface LongAnswerQuestionProps {
  question: string;
  answer: string;
  onChange: (answer: string) => void;
}

const LongAnswerQuestion: React.FC<LongAnswerQuestionProps> = ({ question, answer, onChange }) => {
  return (
    <div className="mb-6 p-4  shadow-sm bg-white">
      <h2 className="text-lg font-bold mb-2">{question}</h2>
     
      <div className="bg-gray-50 p-3 rounded-lg">
        <textarea
          value={answer}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Напишите свой ответ..."
          rows={5}
          className="w-full p-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
        />
      </div>
    </div>
  );
};

export default LongAnswerQuestion;
