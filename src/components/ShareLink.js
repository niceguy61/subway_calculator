import React, { useState } from 'react';

const ShareLink = ({ selectedItems, selectedSize, buttonText = '현재 선택 공유하기', copiedText = '링크가 복사되었습니다!' }) => {
  const [copied, setCopied] = useState(false);
  
  // 공유 URL 생성 함수
  const createShareUrl = () => {
    try {
      const baseUrl = window.location.origin + window.location.pathname;
      const params = [];
      
      // 사이즈
      if (selectedSize) {
        params.push(`size=${selectedSize.id}`);
      }
      
      // 빵
      if (selectedItems.bread && selectedItems.bread.length > 0) {
        params.push(`bread=${selectedItems.bread[0].id}`);
      }
      
      // 메인 재료
      if (selectedItems.meat && selectedItems.meat.length > 0) {
        params.push(`meat=${selectedItems.meat[0].id}`);
      }
      
      // 채소
      if (selectedItems.vegetables && selectedItems.vegetables.length > 0) {
        const vegIds = selectedItems.vegetables.map(v => v.id).join(',');
        params.push(`veg=${vegIds}`);
      }
      
      // 치즈 (no_cheese가 아닌 경우만)
      if (selectedItems.cheese && selectedItems.cheese.length > 0 && selectedItems.cheese[0].id !== 'no_cheese') {
        params.push(`cheese=${selectedItems.cheese[0].id}`);
      }
      
      // 소스 (no_sauce가 아닌 것들만)
      if (selectedItems.sauce && selectedItems.sauce.length > 0) {
        const filteredSauces = selectedItems.sauce.filter(s => s && s.id !== 'no_sauce');
        if (filteredSauces.length > 0) {
          const sauceIds = filteredSauces.map(s => s.id).join(',');
          params.push(`sauce=${sauceIds}`);
        }
      }
      
      // 최종 URL 생성
      return params.length > 0 ? `${baseUrl}?${params.join('&')}` : baseUrl;
    } catch (error) {
      console.error('URL 생성 오류:', error);
      return window.location.href;
    }
  };
  
  const handleCopyLink = () => {
    // 현재 시점에서 URL 생성
    const url = createShareUrl();
    
    // 클립보드에 복사
    navigator.clipboard.writeText(url)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => {
        console.error('링크 복사 실패:', err);
        alert('링크 복사에 실패했습니다.');
      });
  };
  
  return (
    <div className="share-link">
      <button onClick={handleCopyLink} className="share-button">
        {copied ? copiedText : buttonText}
      </button>
    </div>
  );
};

export default ShareLink;