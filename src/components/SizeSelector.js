import React from 'react';

const SizeSelector = ({ sizes, selectedSize, onChange, translations }) => {
  // 번역 텍스트 또는 기본값 사용
  const sizeSelectionText = translations?.sizeSelection || '사이즈 선택';
  
  return (
    <div className="size-selector">
      <h3>{sizeSelectionText}</h3>
      <div className="size-options">
        {sizes.map(size => (
          <div
            key={size.id}
            className={`size-option ${selectedSize.id === size.id ? 'selected' : ''}`}
            onClick={() => onChange(size)}
          >
            <span className="size-name">{size.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SizeSelector;