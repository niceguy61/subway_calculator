import React from 'react';

const LanguageToggle = ({ currentLanguage, onToggle }) => {
  return (
    <div className="language-toggle">
      <button 
        className={`language-button ${currentLanguage === 'ko' ? 'active' : ''}`}
        onClick={() => onToggle('ko')}
      >
        한국어
      </button>
      <button 
        className={`language-button ${currentLanguage === 'en' ? 'active' : ''}`}
        onClick={() => onToggle('en')}
      >
        English
      </button>
    </div>
  );
};

export default LanguageToggle;