import React from 'react';

const NutritionFacts = ({ selectedItems, selectedSize }) => {
  // 모든 선택된 항목의 영양 정보를 합산
  const calculateTotalNutrition = () => {
    const totals = {
      calories: 0,
      carbs: 0,
      protein: 0,
      fat: 0,
      sodium: 0
    };

    // 사이즈 배율 적용 (기본값은 1)
    const multiplier = selectedSize ? selectedSize.multiplier : 1;

    selectedItems.forEach(item => {
      // 빵과 메인 재료는 사이즈에 따라 배율 적용
      const itemMultiplier = 
        (item.category === 'bread' || item.category === 'meat') ? multiplier : 1;
      
      totals.calories += (item.calories || 0) * itemMultiplier;
      totals.carbs += (item.carbs || 0) * itemMultiplier;
      totals.protein += (item.protein || 0) * itemMultiplier;
      totals.fat += (item.fat || 0) * itemMultiplier;
      totals.sodium += (item.sodium || 0) * itemMultiplier;
    });

    // 소수점 첫째 자리까지 반올림
    return {
      calories: Math.round(totals.calories),
      carbs: Math.round(totals.carbs * 10) / 10,
      protein: Math.round(totals.protein * 10) / 10,
      fat: Math.round(totals.fat * 10) / 10,
      sodium: Math.round(totals.sodium)
    };
  };

  const totals = calculateTotalNutrition();

  return (
    <div className="nutrition-facts">
      <h3>영양 정보</h3>
      <div className="nutrition-table">
        <div className="nutrition-row header">
          <div className="nutrition-cell">영양소</div>
          <div className="nutrition-cell">함량</div>
        </div>
        <div className="nutrition-row">
          <div className="nutrition-cell">칼로리</div>
          <div className="nutrition-cell">{totals.calories} kcal</div>
        </div>
        <div className="nutrition-row">
          <div className="nutrition-cell">탄수화물</div>
          <div className="nutrition-cell">{totals.carbs} g</div>
        </div>
        <div className="nutrition-row">
          <div className="nutrition-cell">단백질</div>
          <div className="nutrition-cell">{totals.protein} g</div>
        </div>
        <div className="nutrition-row">
          <div className="nutrition-cell">지방</div>
          <div className="nutrition-cell">{totals.fat} g</div>
        </div>
        <div className="nutrition-row">
          <div className="nutrition-cell">나트륨</div>
          <div className="nutrition-cell">{totals.sodium} mg</div>
        </div>
      </div>
      {selectedSize && (
        <div className="size-info">
          <p>* {selectedSize.name} 기준</p>
        </div>
      )}
    </div>
  );
};

export default NutritionFacts;