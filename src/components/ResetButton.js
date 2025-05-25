import React from 'react';

const ResetButton = ({ onReset }) => {
  return (
    <button 
      className="reset-button"
      onClick={onReset}
    >
      모든 선택 초기화
    </button>
  );
};

export default ResetButton;