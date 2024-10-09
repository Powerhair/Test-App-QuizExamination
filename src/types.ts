export interface Question {
    id: string;
    type: 'single-choice' | 'multiple-choice' | 'short-answer' | 'long-answer';
    question: string;
    options?: string[]; // Опционально, так как не все вопросы имеют варианты ответов
    correctAnswer?: string; // Опционально для вопросов с единственным правильным ответом
    correctAnswers?: string[]; // Опционально для вопросов с множественным выбором
  }
  