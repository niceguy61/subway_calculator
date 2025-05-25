import React from 'react';

const MenuSelector = ({ title, items, selectedItems, onChange }) => {
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

  return (
    <div className="menu-selector">
      <h3>{title}</h3>
      <div className="items-container">
        {items.map(item => (
          <div 
            key={item.id} 
            className={`menu-item ${selectedItems.some(selected => selected.id === item.id) ? 'selected' : ''}`}
            onClick={() => handleChange(item)}
          >
            <div className="item-name">{item.name}</div>
            <div className="item-calories">{item.calories} kcal</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuSelector;