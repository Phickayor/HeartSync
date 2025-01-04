import React from 'react';

const PopupModal = ({ message, onClose, type }) => {
  const modalStyles = {
    success: 'bg-black-500',
    error: 'bg-black-500',
    info: 'bg-black-500',
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className={`w-4/5 md:w-1/3 bg-[#202020] p-5 rounded-lg shadow-md ${modalStyles[type]}`}>
        <div className="text-center text-white text-lg">
          <p>{message}</p>
        </div>
        <div className="mt-4 flex justify-center">
          <button 
            className="bg-[#444444] text-white py-2 px-4 rounded-md"
            onClick={onClose}
          >
            Ok
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupModal;
