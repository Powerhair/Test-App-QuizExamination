import { Question } from "../types";

export const questions: Question[] = [
    {
      id: 'q1',
      type: 'single-choice',
      question: 'Какой оператор используется для сравнения значений в JavaScript?',
      options: ['=', '==', '===', '!='],
      correctAnswer: '===',
    },
    {
      id: 'q2',
      type: 'multiple-choice',
      question: 'Какие из следующих типов данных существуют в JavaScript?',
      options: ['String', 'Number', 'Boolean', 'Character'],
      correctAnswers: ['String', 'Number', 'Boolean'], 
    },
    {
        id: 'q3',
        type: 'short-answer',
        question: 'Что такое замыкание в JavaScript?',
        correctAnswer: 'Функция', 
    },
    {
        id: 'q4',
        type: 'long-answer',
        question: 'Объясните, как работает "this" в JavaScript.',
        correctAnswer: 'Ссылается на объект', 
    },
];