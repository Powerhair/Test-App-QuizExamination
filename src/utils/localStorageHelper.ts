// src/utils/localStorageHelper.ts

// Функция для сохранения прогресса теста
export const saveProgressToLocalStorage = (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
    console.log(key)
  };

  
  
  // Функция для загрузки прогресса теста
  export const loadProgressFromLocalStorage = (key: string) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  };
  
  // Функция для сохранения оставшегося времени в localStorage
  export const saveTimeToLocalStorage = (key: string, timeLeft: number) => {
    localStorage.setItem(key, String(timeLeft));
  };
  
  // Функция для загрузки оставшегося времени из localStorage
  export const loadTimeFromLocalStorage = (key: string): number | null => {
    const time = localStorage.getItem(key);
    return time ? Number(time) : null;
  };
  