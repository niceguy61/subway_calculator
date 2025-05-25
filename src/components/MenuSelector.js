import React, { useState } from 'react';
import './MenuSelector.css';

const MenuSelector = ({ title, items, selectedItems, onChange }) => {
  const [tooltipItem, setTooltipItem] = useState(null);

  const handleChange = (item) => {
    // 소스와 채소는 다중 선택 가능, 나머지는 단일 선택
    if (title === 'sauce' || title === 'vegetables') {
      // 소스와 채소는 다중 선택 가능
      const isSelected = selectedItems.some(selected => selected.id === item.id);
      if (isSelected) {
        onChange(selectedItems.filter(selected => selected.id !== item.id));
      } else {
        // 소스에서 '선택 안함'을 선택한 경우 다른 모든 소스 해제
        if (title === 'sauce' && item.id === 'no_sauce') {
          onChange([item]);
        } 
        // 다른 소스를 선택한 경우 '선택 안함' 옵션 해제
        else if (title === 'sauce' && selectedItems.some(selected => selected.id === 'no_sauce')) {
          onChange([...selectedItems.filter(selected => selected.id !== 'no_sauce'), item]);
        } 
        else {
          onChange([...selectedItems, item]);
        }
      }
    } else {
      // 소스와 채소를 제외한 나머지는 단일 선택
      const isSelected = selectedItems.some(selected => selected.id === item.id);
      if (isSelected) {
        onChange([]);
      } else {
        onChange([item]);
      }
    }
  };

  const handleMouseEnter = (item) => {
    setTooltipItem(item);
  };

  const handleMouseLeave = () => {
    setTooltipItem(null);
  };

  return (
    <div className="menu-selector">
      <h3>{title}</h3>
      <div className="items-container">
        {items.map(item => (
          <div 
            key={item.id} 
            className={`menu-item ${selectedItems.some(selected => selected.id === item.id) ? 'selected' : ''}`}
            onClick={() => handleChange(item)}
            onMouseEnter={() => handleMouseEnter(item)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="item-name">
              {item.name}
              {title === 'meat' && item.description && <span className="info-icon">!</span>}
            </div>
            <div className="item-calories">{item.calories} kcal</div>
            {tooltipItem === item && item.description && (
              <div className="tooltip">{item.description}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuSelector;