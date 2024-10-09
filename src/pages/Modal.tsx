import React from 'react';

interface ModalProps {
    handleRestart: () => void;
}


const Modal: React.FC<ModalProps> = ({ handleRestart }) => {

   return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white rounded-lg shadow-lg p-6 text-center">
      <h2 className="text-lg font-bold mb-4">Увы, время вышло!</h2>
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
        onClick={handleRestart} // Обработка нажатия на кнопку для перезапуска
      >
        Начать заново
      </button>
    </div>
  </div>
   )

    
}

export default Modal;
