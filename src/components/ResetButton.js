import React from 'react';

const ResetButton = ({ onReset, buttonText = '모든 선택 초기화' }) => {
  return (
    <button 
      className="reset-button"
      onClick={onReset}
    >
      {buttonText}
    </button>
  );
};

export default ResetButton;