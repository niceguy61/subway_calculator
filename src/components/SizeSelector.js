import React from 'react';

const SizeSelector = ({ sizes, selectedSize, onChange }) => {
  return (
    <div className="size-selector">
      <h3>사이즈 선택</h3>
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