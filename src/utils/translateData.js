/**
 * 데이터 항목을 현재 언어에 맞게 번역하는 유틸리티 함수
 */

// 데이터 항목의 이름을 번역하는 함수
export const translateItemName = (item, translations, language) => {
  if (!item || !translations || !language) return item;
  
  // 아이템 ID에 해당하는 번역이 있는지 확인
  const translatedName = translations[item.id];
  
  // 번역이 있으면 번역된 이름을 반환, 없으면 원래 이름 유지
  return {
    ...item,
    name: translatedName || item.name
  };
};

// 데이터 배열의 모든 항목을 번역하는 함수
export const translateItems = (items, translations, language) => {
  if (!items || !Array.isArray(items) || !translations || !language) return items;
  
  return items.map(item => translateItemName(item, translations, language));
};