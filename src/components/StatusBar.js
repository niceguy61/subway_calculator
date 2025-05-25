import React from 'react';

const StatusBar = ({ selectedItems, onItemClick }) => {
  const categories = [
    { key: 'size', name: '사이즈', required: true },
    { key: 'bread', name: '빵', required: true },
    { key: 'meat', name: '메인', required: true },
    { key: 'vegetables', name: '채소', required: false },
    { key: 'cheese', name: '치즈', required: false },
    { key: 'sauce', name: '소스', required: false }
  ];

  const getStatus = (category) => {
    const items = selectedItems[category.key];
    if (!items || items.length === 0) return 'empty';
    
    // 치즈와 소스는 '선택 안함' 옵션이 있음
    if (category.key === 'cheese' && items[0].id === 'no_cheese') return 'empty';
    if (category.key === 'sauce' && items.length === 1 && items[0].id === 'no_sauce') return 'empty';
    
    return 'selected';
  };

  return (
    <div className="status-bar">
      {categories.map((category, index) => (
        <React.Fragment key={category.key}>
          <div
            className={`status-item ${getStatus(category)}`}
            onClick={() => onItemClick(category.key)}
          >
            <span className="status-name">{category.name}</span>
            <span className="status-indicator">
              {category.required && getStatus(category) === 'empty' ? '필수' : 
               getStatus(category) === 'selected' ? '완료' : '선택'}
            </span>
          </div>
          {index < categories.length - 1 && <div className="status-separator">›</div>}
        </React.Fragment>
      ))}
    </div>
  );
};

export default StatusBar;