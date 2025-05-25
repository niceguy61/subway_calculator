import React from 'react';

const CalorieCounter = ({ selectedItems, selectedSize }) => {
  // 총 칼로리 계산
  const calculateTotalCalories = () => {
    let total = 0;
    const multiplier = selectedSize ? selectedSize.multiplier : 1;
    
    selectedItems.forEach(item => {
      // 빵과 메인 재료는 사이즈에 따라 배율 적용
      const itemMultiplier = 
        (item.category === 'bread' || item.category === 'meat') ? multiplier : 1;
      total += (item.calories || 0) * itemMultiplier;
    });
    
    return Math.round(total);
  };
  
  const totalCalories = calculateTotalCalories();
  
  // 칼로리 수준에 따른 색상 결정
  const getCalorieColor = () => {
    if (totalCalories < 300) return 'low-calorie';
    if (totalCalories < 600) return 'medium-calorie';
    return 'high-calorie';
  };
  
  return (
    <div className="calorie-counter">
      <span className="calorie-label">현재 칼로리:</span>
      <span className={`calorie-value ${getCalorieColor()}`}>
        {totalCalories} kcal
      </span>
    </div>
  );
};

export default CalorieCounter;