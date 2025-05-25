import React from 'react';

const RandomSelector = ({ subwayData, onRandomSelect }) => {
  const generateRandomCombination = () => {
    // 랜덤 선택 로직
    const randomSize = subwayData.sizes[Math.floor(Math.random() * subwayData.sizes.length)];
    const randomBread = subwayData.breads[Math.floor(Math.random() * subwayData.breads.length)];
    const randomMeat = subwayData.meats[Math.floor(Math.random() * subwayData.meats.length)];
    
    // 채소는 0~5개 랜덤 선택
    const vegCount = Math.floor(Math.random() * 6);
    const shuffledVegetables = [...subwayData.vegetables].sort(() => 0.5 - Math.random());
    const randomVegetables = shuffledVegetables.slice(0, vegCount);
    
    // 치즈는 선택 안함 포함해서 랜덤 선택
    const randomCheese = subwayData.cheeses[Math.floor(Math.random() * subwayData.cheeses.length)];
    
    // 소스는 0~3개 랜덤 선택
    const sauceCount = Math.floor(Math.random() * 4);
    const shuffledSauces = [...subwayData.sauces]
      .filter(sauce => sauce.id !== 'no_sauce') // '선택 안함' 옵션 제외
      .sort(() => 0.5 - Math.random());
    
    // 소스를 선택하지 않을 확률 30%
    const randomSauces = Math.random() < 0.3 
      ? [subwayData.sauces.find(sauce => sauce.id === 'no_sauce')] 
      : shuffledSauces.slice(0, sauceCount);
    
    return {
      size: randomSize,
      bread: [randomBread],
      meat: [randomMeat],
      vegetables: randomVegetables,
      cheese: [randomCheese],
      sauce: randomSauces.length > 0 ? randomSauces : [subwayData.sauces.find(sauce => sauce.id === 'no_sauce')]
    };
  };

  return (
    <div className="random-selector">
      <button 
        className="random-button"
        onClick={() => onRandomSelect(generateRandomCombination())}
      >
        랜덤 조합 만들기
      </button>
    </div>
  );
};

export default RandomSelector;