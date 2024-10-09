// src/components/AddQuestion.tsx
import React, { useState } from 'react';

interface AddQuestionProps {
  onAddQuestion: (question: any) => void; 
}

const AddQuestion: React.FC<AddQuestionProps> = ({ onAddQuestion }) => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState<string[]>(['']);
  const [correctAnswers, setCorrectAnswers] = useState<boolean[]>([false]);

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleCorrectAnswerChange = (index: number) => {
    const newCorrectAnswers = [...correctAnswers];
    newCorrectAnswers[index] = !newCorrectAnswers[index];
    setCorrectAnswers(newCorrectAnswers);
  };

  const handleAddOption = () => {
    setOptions([...options, '']);
    setCorrectAnswers([...correctAnswers, false]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newQuestion = {
      id: `q${Math.random()}`,
      type: 'single-choice',
      question,
      options,
      correctAnswers,
    };
    onAddQuestion(newQuestion);
    setQuestion('');
    setOptions(['']);
    setCorrectAnswers([false]);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block">Question:</label>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required
          className="border border-gray-300 rounded-md p-2 w-full"
        />
      </div>
      <div>
        <label className="block">Options:</label>
        {options.map((option, index) => (
          <div key={index} className="flex items-center space-x-2">
            <input
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              required
              className="border border-gray-300 rounded-md p-2 w-full"
            />
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={correctAnswers[index]}
                onChange={() => handleCorrectAnswerChange(index)}
                className="mr-2"
              />
              Correct Answer
            </label>
          </div>
        ))}
        <button type="button" onClick={handleAddOption} className="text-blue-600 hover:underline">
          Add Option
        </button>
      </div>
      <button type="submit" className="bg-blue-500 text-white rounded-md p-2">Add Question</button>
    </form>
  );
};

export default AddQuestion;
