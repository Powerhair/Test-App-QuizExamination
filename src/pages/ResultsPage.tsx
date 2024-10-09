import React from 'react';
import { Question } from '../types';
import { useNavigate, useLocation } from 'react-router-dom';

const ResultsPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Получаем данные из location.state, если они переданы, иначе используем значения по умолчанию
  const { questions = [], answers = {} } = location.state || {};

  const handleRestart = () => {
    // При нажатии кнопки, перенаправляем на тест и сбрасываем localStorage
    localStorage.removeItem('quizProgress'); // Удаляем сохраненные данные
    localStorage.removeItem('quizTimeLeft'); // Удаляем сохраненные данные из localStorage

    navigate('/'); // Переходим на страницу теста
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Результаты теста</h2>
        <ul className="space-y-4">
          {questions.map((question: Question) => {
            const userAnswer = answers[question.id];

            // Проверка правильности ответа, нечувствительная к регистру
            const isCorrect =
              question.type === 'multiple-choice'
                ? Array.isArray(userAnswer) &&
                  Array.isArray(question.correctAnswers) &&
                  userAnswer.map((ans: string) => ans.toLowerCase()).sort().join(',') ===
                  question.correctAnswers.map((ca: string) => ca.toLowerCase()).sort().join(',')
                : userAnswer?.toLowerCase().trim() === question.correctAnswer?.toLowerCase().trim(); // Добавлено ?

            return (
              <li
                key={question.id}
                className={`border-b pb-2 ${
                  isCorrect ? 'bg-green-200' : 'bg-red-200'
                } p-4 rounded`}
              >
                <p className="font-bold">{question.question}</p>
                <p>
                  Ваш ответ: {Array.isArray(userAnswer) ? userAnswer.join(', ') : userAnswer || 'Нет ответа'}
                </p>
                {isCorrect ? (
                  <p className="text-green-700 font-bold">Верно!</p>
                ) : (
                  <p className="text-red-700 font-bold">
                    Неправильно! Правильный ответ: {Array.isArray(question.correctAnswers) ? question.correctAnswers.join(', ') : question.correctAnswer}
                  </p>
                )}
              </li>
            );
          })}
        </ul>
        <button
          className="mt-6 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300"
          onClick={handleRestart}
        >
          Начать заново
        </button>
      </div>
    </div>
  );
};

export default ResultsPage;
