// src/components/Question/ShortAnswerQuestion.tsx
import React from 'react';

interface Props {
  question: string;
  answer: string;
  onChange: (answer: string) => void;
}

const ShortAnswerQuestion: React.FC<Props> = ({ question, answer, onChange }) => (
  <div className="mb-6">
    <h3 className="text-lg font-bold mb-2">{question}</h3>
    <input
      type="text"
      value={answer}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Напишите свой ответ..."
      className="w-full p-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
    />
  </div>
);

export default ShortAnswerQuestion;
