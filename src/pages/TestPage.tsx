import React, { useState, useEffect } from 'react';
import SingleChoiceQuestion from '../components/Question/SingleChoiceQuestion';
import MultipleChoiceQuestion from '../components/Question/MultipleChoiceQuestion';
import ShortAnswerQuestion from '../components/Question/ShortAnswerQuestion';
import LongAnswerQuestion from '../components/Question/LongAnswerQuestion';
import Stepper from '../components/Stepper';
import ProgressBar from './ProgressBar';
import Modal from './Modal';
import useTestProgress from '../hooks/useTestProgress';
import {
  saveProgressToLocalStorage,
  loadProgressFromLocalStorage,
  saveTimeToLocalStorage,
  loadTimeFromLocalStorage
} from '../utils/localStorageHelper';
import { questions } from '../utils/questionsData';
import { useNavigate } from 'react-router-dom';

const LOCAL_STORAGE_KEY = 'quizProgress';
const TIME_LEFT_KEY = 'quizTimeLeft';

const TestPage: React.FC = () => {
  const { currentStep, setCurrentStep } = useTestProgress(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [timeLeft, setTimeLeft] = useState(5 * 60);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  // Загружаем сохраненный прогресс из localStorage
  useEffect(() => {
    const savedProgress = loadProgressFromLocalStorage(LOCAL_STORAGE_KEY);
    if (savedProgress) {
      const { currentStep, answers } = savedProgress;
      setCurrentStep(currentStep);
      setAnswers(answers);
    }
  }, [setCurrentStep]);

  // Сохраняем прогресс в localStorage при изменении текущего шага или ответов
  useEffect(() => {
    const savedTimeLeft = loadTimeFromLocalStorage(TIME_LEFT_KEY);
    if (savedTimeLeft !== null) {
      setTimeLeft(savedTimeLeft); // Восстанавливаем оставшееся время
    }

    saveProgressToLocalStorage(LOCAL_STORAGE_KEY, { currentStep, answers });
  }, [setCurrentStep, answers]);

  // Используем эффект для отслеживания времени теста
  useEffect(() => {
    if (timeLeft <= 0) {
      setIsModalOpen(true); // Открываем модальное окно, когда время истекает
    }

    const timerId = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime > 0) {
          const newTime = prevTime - 1;
          saveTimeToLocalStorage(TIME_LEFT_KEY, newTime); // Сохраняем оставшееся время
          return newTime; // Уменьшаем время на 1 секунду
        } else {
          clearInterval(timerId); // Останавливаем таймер, если время истекло
          return 0; // Устанавливаем время в 0, чтобы не было отрицательных значений
        }
      });
    }, 1000);

    return () => clearInterval(timerId); // Очищаем таймер при размонтировании компонента
  }, [timeLeft]);

  // Функция для форматирования времени в минуты и секунды
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  // Вычисляем прогресс теста
  const progress = Math.round(((currentStep + 1) / questions.length) * 100);

  // Функция для изменения ответа на вопрос
  const handleAnswerChange = (questionId: string, answer: any) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer, // Обновляем ответ для конкретного вопроса
    }));
  };

  // Проверяем, можно ли перейти к следующему шагу
  const isNextEnabled = () => {
    const currentQuestion = questions[currentStep];
    const answer = answers[currentQuestion.id];

    if (currentQuestion.type === 'long-answer' || currentQuestion.type === 'short-answer') {
      return answer && answer.trim().length > 0; // Проверяем, что ответ не пустой
    } else if (currentQuestion.type === 'single-choice') {
      return answer !== undefined && answer !== ''; // Проверяем, что выбранный вариант не пустой
    } else if (currentQuestion.type === 'multiple-choice') {
      return answer && answer.length > 0; // Проверяем, что есть выбранные варианты
    }
    return false; // Если тип вопроса не поддерживается
  };

  // Обработка перехода к следующему шагу
  const handleNextStep = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1); // Переходим к следующему шагу
    } else {
      navigate('/results', { state: { questions, answers } }); // Перенаправляем на страницу результатов
    }
  };

  // Обработка перехода к предыдущему шагу
  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1); // Возвращаемся к предыдущему шагу
    }
  };

  // Функция для перезапуска теста
  const handleRestart = () => {
    // Сброс состояния теста и закрытие модального окна
    setIsModalOpen(false);
    setCurrentStep(0); // Сбрасываем текущий шаг на 0
    setAnswers({}); // Сбрасываем ответы
    setTimeLeft(5 * 60); // Сбрасываем время на 5 минут
    localStorage.removeItem(LOCAL_STORAGE_KEY); // Удаляем сохраненные данные из localStorage
    localStorage.removeItem(TIME_LEFT_KEY); // Удаляем сохраненные данные из localStorage
  };

  // Функция для рендеринга вопросов на основе их типа
  const renderQuestion = (question: any) => {
    switch (question.type) {
      case 'single-choice':
        return (
          <SingleChoiceQuestion
            question={question.question}
            options={question.options}
            selectedOption={answers[question.id] || ''}
            onChange={(option) => handleAnswerChange(question.id, option)} // Обработка изменения выбранного варианта
          />
        );
      case 'multiple-choice':
        return (
          <MultipleChoiceQuestion
            question={question.question}
            options={question.options}
            selectedOptions={answers[question.id] || []}
            onChange={(option) => {
              const selected = answers[question.id] || [];
              const newSelected = selected.includes(option)
                ? selected.filter((opt: string) => opt !== option) // Убираем вариант из выбранных
                : [...selected, option]; // Добавляем вариант в выбранные
              handleAnswerChange(question.id, newSelected); // Обновляем выбранные варианты
            }}
          />
        );
      case 'short-answer':
        return (
          <ShortAnswerQuestion
            question={question.question}
            answer={answers[question.id] || ''}
            onChange={(answer) => handleAnswerChange(question.id, answer)} // Обработка изменения короткого ответа
          />
        );
      case 'long-answer':
        return (
          <LongAnswerQuestion
            question={question.question}
            answer={answers[question.id] || ''}
            onChange={(answer) => handleAnswerChange(question.id, answer)} // Обработка изменения длинного ответа
          />
        );
      default:
        return null; // Если тип вопроса не поддерживается
    }
  };

  // Основная часть компонента
  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Оставшееся время: {formatTime(timeLeft)}</h2>
        </div>
        <ProgressBar
            currentStep={currentStep}
        />


        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold text-center mb-4">Тест</h1>
          <Stepper
            steps={questions.map(renderQuestion)} // Отображаем вопросы в компоненте Stepper
            currentStep={currentStep}
            onStepChange={handleNextStep}
            isNextEnabled={isNextEnabled()} // Проверяем возможность перехода на следующий шаг
            handlePreviousStep={handlePreviousStep}
          />
        </div>
      </div>

      {/* Модальное окно для времени */}
      {isModalOpen && (
        <Modal
        handleRestart={handleRestart}
        />
      )}
    </div>
  );
};

export default TestPage;
